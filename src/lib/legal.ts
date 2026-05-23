import type { CollectionEntry } from 'astro:content';

export type LegalEntry = CollectionEntry<'legal'>;

/** Last path segment of a glob-loaded legal entry id (e.g. `portal-pages-times-tables/privacy` → `privacy`). */
export function legalSlugFromEntry(entry: LegalEntry): string {
  const parts = entry.id.split('/');
  return parts[parts.length - 1] ?? entry.id;
}
