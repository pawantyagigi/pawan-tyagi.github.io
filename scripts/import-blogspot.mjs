/**
 * Import all posts from Insights With Pawan Tyagi Blogger feed
 * into content/blogs as markdown.
 *
 * Run: node scripts/import-blogspot.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import TurndownService from "turndown";
import { createHash } from "crypto";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const blogsDir = path.join(root, "content", "blogs");
const uploadsDir = path.join(root, "public", "uploads", "blogspot");
const feedCache = path.join(root, "scripts", ".blogspot-feed.json");

const FEED_URL =
  "https://insightswithpawantyagi.blogspot.com/feeds/posts/default?alt=json&max-results=500";

const turndown = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
  bulletListMarker: "-",
  emDelimiter: "*",
});

turndown.addRule("preservePre", {
  filter: ["pre"],
  replacement(_content, node) {
    const text = node.textContent || "";
    return `\n\n\`\`\`\n${text.trim()}\n\`\`\`\n\n`;
  },
});

function slugify(title) {
  return title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

function titleFromUrl(url) {
  try {
    const base = path.basename(new URL(url).pathname, ".html");
    return base
      .split("-")
      .map((w) => (w.length ? w[0].toUpperCase() + w.slice(1) : w))
      .join(" ");
  } catch {
    return "";
  }
}

function yamlQuote(value) {
  const s = String(value ?? "")
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\n/g, " ")
    .trim();
  return `"${s}"`;
}

function formatDate(iso) {
  const d = new Date(iso);
  // Stable en-US without "at" locale quirks for parsing
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let h = d.getHours();
  const m = String(d.getMinutes()).padStart(2, "0");
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()} ${h}:${m} ${ampm}`;
}

function extractDescription(text, title) {
  const cleaned = text
    .replace(/^#+\s.*$/gm, "")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
    .replace(/\[[^\]]*\]\(([^)]+)\)/g, "")
    .replace(/https?:\/\/\S+/g, "")
    .replace(/[`*_>#|-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const snippet = cleaned.slice(0, 220).replace(/\s+\S*$/, "");
  return snippet || title;
}

function tagSlug(term) {
  return term
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function downloadBinary(url) {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
        Referer: "https://insightswithpawantyagi.blogspot.com/",
      },
      redirect: "follow",
    });
    if (!res.ok) {
      console.warn(`  image fail ${res.status}: ${url.slice(0, 80)}`);
      return null;
    }
    const ct = res.headers.get("content-type") || "";
    const buf = Buffer.from(await res.arrayBuffer());
    return { buf, contentType: ct };
  } catch (err) {
    console.warn(`  image error: ${url.slice(0, 80)} (${err.message})`);
    return null;
  }
}

function extFromContentType(ct, fallback = ".jpg") {
  if (!ct) return fallback;
  if (ct.includes("png")) return ".png";
  if (ct.includes("gif")) return ".gif";
  if (ct.includes("webp")) return ".webp";
  if (ct.includes("svg")) return ".svg";
  if (ct.includes("jpeg") || ct.includes("jpg")) return ".jpg";
  return fallback;
}

function extFromUrl(url) {
  try {
    const u = new URL(url.split("?")[0]);
    const ext = path.extname(u.pathname).toLowerCase();
    if ([".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"].includes(ext)) {
      return ext === ".jpeg" ? ".jpg" : ext;
    }
  } catch {
    /* ignore */
  }
  return ".jpg";
}

function saveBuffer(buf, slug, index, ext) {
  const filename = `${slug}-${index}${ext}`;
  const dest = path.join(uploadsDir, filename);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, buf);
  return `/uploads/blogspot/${filename}`;
}

async function localizeImages(markdown, slug) {
  let out = markdown;
  let i = 0;

  // data:image/...;base64,...
  const dataRe = /!\[([^\]]*)\]\((data:image\/[a-zA-Z0-9.+-]+;base64,[^)]+)\)/g;
  const dataMatches = [...markdown.matchAll(dataRe)];
  for (const m of dataMatches) {
    const alt = m[1];
    const dataUrl = m[2];
    const match = dataUrl.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);
    if (!match) continue;
    i += 1;
    const ext = extFromContentType(match[1], ".png");
    const buf = Buffer.from(match[2], "base64");
    // Skip tiny spacers
    if (buf.length < 200) {
      out = out.replace(m[0], "");
      continue;
    }
    const local = saveBuffer(buf, slug, i, ext);
    out = out.replace(m[0], `![${alt}](${local})`);
  }

  // remote http(s) images
  const httpRe = /!\[([^\]]*)\]\((https?:\/\/[^)\s]+)\)/g;
  const httpMatches = [...out.matchAll(httpRe)];
  for (const m of httpMatches) {
    const alt = m[1];
    const url = m[2];
    i += 1;
    const downloaded = await downloadBinary(url);
    if (!downloaded) continue;
    const ext = extFromContentType(
      downloaded.contentType,
      extFromUrl(url)
    );
    const local = saveBuffer(downloaded.buf, slug, i, ext);
    out = out.replace(m[0], `![${alt}](${local})`);
  }

  return out.replace(/\n{3,}/g, "\n\n").trim();
}

function firstImage(markdown) {
  const m = markdown.match(/!\[[^\]]*\]\(([^)]+)\)/);
  return m ? m[1] : "";
}

function htmlToMarkdown(html) {
  if (!html) return "";
  const cleaned = html
    .replace(/\s+style="[^"]*"/gi, "")
    .replace(/\s+class="[^"]*"/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "");
  return turndown
    .turndown(cleaned)
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

async function fetchFeed() {
  console.log("Fetching Blogger feed...");
  const res = await fetch(FEED_URL, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    },
  });
  if (!res.ok) throw new Error(`Feed fetch failed: ${res.status}`);
  const json = await res.json();
  fs.writeFileSync(feedCache, JSON.stringify(json, null, 2));
  return json;
}

async function main() {
  const feed = await fetchFeed();
  const entries = feed.feed?.entry || [];
  console.log(`Found ${entries.length} posts`);

  fs.mkdirSync(blogsDir, { recursive: true });
  fs.mkdirSync(uploadsDir, { recursive: true });

  // Clear previous import outputs
  for (const f of fs.readdirSync(blogsDir)) {
    if (f.endsWith(".md")) fs.unlinkSync(path.join(blogsDir, f));
  }
  for (const f of fs.readdirSync(uploadsDir)) {
    fs.unlinkSync(path.join(uploadsDir, f));
  }

  const usedSlugs = new Set();
  let written = 0;

  for (const entry of entries) {
    const originalUrl =
      (entry.link || []).find((l) => l.rel === "alternate")?.href || "";
    let title = (entry.title?.$t || "").trim();
    if (!title) {
      title =
        titleFromUrl(originalUrl) ||
        "Community Contributions Highlights 2025";
    }

    const published = entry.published?.$t;
    const updated = entry.updated?.$t || published;
    const html = entry.content?.$t || entry.summary?.$t || "";
    const categories = (entry.category || [])
      .map((c) => c.term)
      .filter(Boolean)
      .filter((t) => !/^http/i.test(t));

    let slug = slugify(title);
    if (!slug) slug = slugify(titleFromUrl(originalUrl)) || `post-${written}`;
    if (usedSlugs.has(slug)) {
      const hash = createHash("md5").update(originalUrl).digest("hex").slice(0, 6);
      slug = `${slug}-${hash}`;
    }
    usedSlugs.add(slug);

    let body = htmlToMarkdown(html);
    body = await localizeImages(body, slug);

    const description = extractDescription(body, title);
    const featuredImage = firstImage(body);
    const tagsYaml =
      categories.length > 0
        ? categories.map((t) => `  - tag: ${tagSlug(t)}`).join("\n")
        : "  - tag: sitecore\n  - tag: sitecore-xm-cloud";

    const keywords = categories.length
      ? categories.join(", ")
      : "Sitecore, XM Cloud, Sitecore XP, Web Development";

    const md = `---
title: ${yamlQuote(title)}
description: ${yamlQuote(description)}
keywords: ${yamlQuote(keywords)}
metaDescription: ${yamlQuote(description)}
featuredImage: ${yamlQuote(featuredImage)}
slug: ${slug}
date: ${formatDate(published)}
modifiedDate: ${formatDate(updated)}
author: "Pawan Tyagi"
source: "Insights With Me"
originalUrl: ${yamlQuote(originalUrl)}
tags:
${tagsYaml}
---
${body}
`;

    fs.writeFileSync(path.join(blogsDir, `${slug}.md`), md, "utf8");
    written += 1;
    const sizeKb = Math.round(Buffer.byteLength(md, "utf8") / 1024);
    console.log(`✓ ${slug} (${sizeKb} KB)`);
  }

  const imgCount = fs.readdirSync(uploadsDir).length;
  console.log(`\nImported ${written} posts, ${imgCount} images`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
