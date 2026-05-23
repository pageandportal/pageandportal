/** Global donate settings — sync with supply/site/donate.md when owner supplies URL. */
export const DONATE = {
  url: null as string | null,
  label: 'Support development',
  thankYou: null as string | null,
} as const;

export function resolveDonateUrl(appUrl?: string, useGlobal = true): string | null {
  if (appUrl) return appUrl;
  if (useGlobal && DONATE.url) return DONATE.url;
  return null;
}
