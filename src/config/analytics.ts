/**
 * Website analytics — Plausible (privacy-friendly, no cookies).
 *
 * Set PUBLIC_PLAUSIBLE_DOMAIN at build time (see docs/analytics.md).
 * Disabled in `astro dev` so local previews are not counted.
 */
const domain = import.meta.env.PUBLIC_PLAUSIBLE_DOMAIN?.trim() ?? '';

export const ANALYTICS = {
  plausibleDomain: domain || null,
} as const;

export function isAnalyticsEnabled(): boolean {
  return Boolean(ANALYTICS.plausibleDomain) && !import.meta.env.DEV;
}
