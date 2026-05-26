export const ANALYTICS = {
  googleAnalyticsMeasurementId: 'G-48L1CF97DY',
} as const;

export function hasGoogleAnalytics(): boolean {
  return Boolean(ANALYTICS.googleAnalyticsMeasurementId);
}
