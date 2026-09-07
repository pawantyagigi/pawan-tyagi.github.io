/** Next.js / GitHub Pages project-site base path (no trailing slash). */
export function getBasePath(): string {
  return (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");
}

/**
 * Prefix a site-root path with `basePath` so static assets work on GitHub Pages
 * project sites (e.g. `/uploads/x.png` → `/pawan-tyagi.github.io/uploads/x.png`).
 * Absolute http(s)/data/blob URLs are returned unchanged.
 */
export function withBasePath(path: string | undefined | null): string {
  if (path == null || path === "") return "";
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("data:") ||
    path.startsWith("blob:") ||
    path.startsWith("//")
  ) {
    return path;
  }

  const base = getBasePath();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (!base) return normalized;
  if (normalized === base || normalized.startsWith(`${base}/`)) {
    return normalized;
  }
  return `${base}${normalized}`;
}
