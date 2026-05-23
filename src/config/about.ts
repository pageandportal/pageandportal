/** Shared developer blurb — sync with supply/site/about.md when owner supplies copy. */
export const ABOUT = {
  headline: null as string | null,
  bio: null as string | null,
  displayName: null as string | null,
} as const;

export function hasAboutContent(): boolean {
  return Boolean(ABOUT.headline || ABOUT.bio);
}
