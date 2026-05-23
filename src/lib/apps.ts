import type { CollectionEntry } from 'astro:content';

export type AppEntry = CollectionEntry<'apps'>;

const LANE_LABELS: Record<'now' | 'next' | 'later', string> = {
  now: 'Now',
  next: 'Next',
  later: 'Later',
};

export function appIconUrl(slug: string, iconPath?: string): string | undefined {
  const base = import.meta.env.BASE_URL;
  if (iconPath) return `${base}${iconPath.replace(/^\//, '')}`;
  return `${base}apps/${slug}/icon.png`;
}

export function appAssetUrl(path?: string): string | undefined {
  if (!path) return undefined;
  const base = import.meta.env.BASE_URL;
  return `${base}${path.replace(/^\//, '')}`;
}

export function statusLabel(status: string): string {
  return status.replace(/-/g, ' ');
}

export function roadmapLanes(entry: AppEntry) {
  return entry.data.roadmap.map((lane) => ({
    ...lane,
    label: lane.label ?? LANE_LABELS[lane.id],
    items: lane.items.filter((item) => !/^TODO$/i.test(item.title.trim())),
  }));
}

export function hasRoadmapItems(entry: AppEntry): boolean {
  return roadmapLanes(entry).some((lane) => lane.items.length > 0);
}
