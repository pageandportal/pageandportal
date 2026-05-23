/** Absolute URL for Open Graph / canonical (GitHub Pages project site). */
export function siteUrl(path: string, site: URL): string {
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const base = import.meta.env.BASE_URL;
  const joined = `${base}${path.replace(/^\//, '')}`;
  return new URL(joined, site).href;
}
