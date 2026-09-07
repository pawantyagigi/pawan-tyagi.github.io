export type SearchItem = {
  type: "post" | "page";
  title: string;
  slug: string;
  url: string;
  excerpt: string;
  body: string;
  tags: string[];
  keywords: string[];
  date?: string;
  featuredImage?: string;
};

export type SearchHit = SearchItem & { score: number };

function tokenize(q: string): string[] {
  return q
    .toLowerCase()
    .split(/[^a-z0-9+#.-]+/i)
    .map((t) => t.trim())
    .filter((t) => t.length > 1);
}

/** Rank items for a query. Higher score = better match. */
export function searchItems(
  items: SearchItem[],
  query: string,
  limit = 20
): SearchHit[] {
  const tokens = tokenize(query);
  if (!tokens.length) return [];

  const hits: SearchHit[] = [];

  for (const item of items) {
    const title = item.title.toLowerCase();
    const excerpt = (item.excerpt || "").toLowerCase();
    const body = (item.body || "").toLowerCase();
    const tags = (item.tags || []).join(" ").toLowerCase();
    const keywords = (item.keywords || []).join(" ").toLowerCase();
    const haystack = `${title} ${excerpt} ${tags} ${keywords} ${body}`;

    let score = 0;
    let matchedAll = true;

    for (const token of tokens) {
      if (!haystack.includes(token)) {
        matchedAll = false;
        break;
      }
      if (title.includes(token)) score += 12;
      if (title.split(/\s+/).some((w) => w.startsWith(token))) score += 6;
      if (tags.includes(token) || keywords.includes(token)) score += 5;
      if (excerpt.includes(token)) score += 3;
      if (body.includes(token)) score += 1;
    }

    if (!matchedAll || score <= 0) continue;
    if (item.type === "post") score += 1;
    hits.push({ ...item, score });
  }

  return hits.sort((a, b) => b.score - a.score).slice(0, limit);
}
