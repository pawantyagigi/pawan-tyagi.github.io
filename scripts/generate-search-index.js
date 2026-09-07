/**
 * Builds public/search-index.json for client-side site search.
 * Run: node scripts/generate-search-index.js
 */
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const removeMd = require("remove-markdown");

const root = path.join(__dirname, "..");
const blogsDir = path.join(root, "content", "blogs");
const outPath = path.join(root, "public", "search-index.json");

function tagSlugs(tags) {
  if (!Array.isArray(tags)) return [];
  return tags.map((t) => (typeof t === "object" && t ? t.tag : t)).filter(Boolean);
}

const posts = fs
  .readdirSync(blogsDir)
  .filter((f) => f.endsWith(".md"))
  .map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(blogsDir, filename), "utf8");
    const { data, content } = matter(raw);
    const plain = removeMd(content || "")
      .replace(/\s+/g, " ")
      .trim();
    const tags = tagSlugs(data.tags);
    const keywords = String(data.keywords || "")
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean);

    return {
      type: "post",
      title: data.title || slug,
      slug,
      url: `/blogs/${slug}`,
      excerpt: (data.description || data.metaDescription || plain.slice(0, 160)).trim(),
      body: plain.slice(0, 4000),
      tags,
      keywords,
      date: data.date || "",
      featuredImage: data.featuredImage || "",
    };
  })
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

const pages = [
  {
    type: "page",
    title: "About Pawan Tyagi",
    slug: "about",
    url: "/about",
    excerpt: "Technical Lead at Altudo — Sitecore XM Cloud certified developer.",
    body: "About Pawan Tyagi Altudo Sitecore XM Cloud Azure certification Helix",
    tags: [],
    keywords: ["about", "pawan tyagi"],
    date: "",
    featuredImage: "",
  },
  {
    type: "page",
    title: "Contact",
    slug: "contact",
    url: "/contact",
    excerpt: "Send a message or connect on LinkedIn and GitHub.",
    body: "Contact form email LinkedIn GitHub reach out",
    tags: [],
    keywords: ["contact"],
    date: "",
    featuredImage: "",
  },
  {
    type: "page",
    title: "Portfolio",
    slug: "portfolio",
    url: "/portfolio",
    excerpt: "Experience, certifications, skills, and publications.",
    body: "Portfolio experience certifications skills Altudo Sitecore",
    tags: [],
    keywords: ["portfolio"],
    date: "",
    featuredImage: "",
  },
  {
    type: "page",
    title: "Blog Categories",
    slug: "categories",
    url: "/categories",
    excerpt: "Browse Sitecore, XM Cloud, Search, and more by category.",
    body: "Categories Sitecore XM Cloud Search Content Hub Forms",
    tags: [],
    keywords: ["categories"],
    date: "",
    featuredImage: "",
  },
  {
    type: "page",
    title: "All Blogs",
    slug: "blogs",
    url: "/blogs",
    excerpt: "Full list of technical Sitecore and XM Cloud articles.",
    body: "Blogs articles Sitecore tutorials",
    tags: [],
    keywords: ["blogs"],
    date: "",
    featuredImage: "",
  },
];

const index = {
  generatedAt: new Date().toISOString(),
  items: [...posts, ...pages],
};

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(index));
console.log(
  `Wrote ${index.items.length} search items → public/search-index.json`
);
