import inventory from '../../apps.inventory.json';

/**
 * Apps shown on the home grid and in the sitemap. `"hidden": true` in
 * apps.inventory.json keeps an app's page built (reachable by direct link) but unlisted.
 */
export const listedApps = inventory.apps.filter((app) => !('hidden' in app && app.hidden));

export const listedSlugs = new Set(listedApps.map((app) => app.slug));
