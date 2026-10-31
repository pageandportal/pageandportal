import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { listedSlugs } from '../lib/inventory';
import { legalSlugFromEntry } from '../lib/legal';
import { siteUrl } from '../lib/seo';

/** Public pages only: unlisted briefings (/r/) and hidden apps are left out. */
export const GET: APIRoute = async ({ site }) => {
  if (!site) throw new Error('sitemap.xml needs `site` in astro.config.mjs');

  const apps = (await getCollection('apps')).filter((entry) => listedSlugs.has(entry.id));
  const legal = await getCollection('legal');

  const paths = [''];
  for (const app of apps) {
    paths.push(`apps/${app.id}/`);
    const routedLegal = new Set(app.data.legalPages.map((page) => page.slug));
    for (const entry of legal) {
      const slug = legalSlugFromEntry(entry);
      if (entry.data.app === app.id && routedLegal.has(slug)) {
        paths.push(`apps/${app.id}/${slug}/`);
      }
    }
  }

  const urls = paths.map((path) => `  <url><loc>${siteUrl(path, site)}</loc></url>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
