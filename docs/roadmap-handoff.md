# Roadmap & app content — agent handoff

Handoff summary for agents updating **Page and Portal** app pages, roadmaps, and release status.

**Repo:** [pageandportal/pageandportal](https://github.com/pageandportal/pageandportal)  
**Live site:** https://pageandportal.github.io/pageandportal/  
**Workflow rules:** Read `PROJECT_PLAN.md` and `.cursor/rules/agent-workflow.mdc` before substantial work.

---

## Quick answer: what drives the live site?

The **live roadmap** is **not** read from `supply/`. It comes from:

```
src/content/apps/<slug>.md   ← YAML frontmatter (this is what Astro renders)
```

Owner/planning copy lives in:

```
supply/apps/<slug>/app.md    ← Markdown tables (human-friendly; NOT auto-synced to site)
```

**Critical:** Roadmap, features, app status, and most app copy must be updated in **both** places manually (or by an agent keeping them aligned). Only **legal pages** and some **site config** auto-sync from `supply/`.

---

## File map

| File | Role | Feeds live site? |
|------|------|------------------|
| `src/content/apps/<slug>.md` | App page data (features, roadmap, status, links) | **Yes** |
| `supply/apps/<slug>/app.md` | Owner supply sheet / planning notes | No (reference) |
| `apps.inventory.json` | Home page app list (name, tagline, status) | **Yes** (home grid) |
| `PROJECT_PLAN.md` | Agent tasks, decisions, test checklist | No |
| `version.properties` | Website release version + optional build counter | No (deploy meta) |
| `src/content.config.ts` | Schema validation for app content | N/A |
| `src/components/Roadmap.astro` | Renders roadmap lanes on app pages | N/A |
| `src/lib/apps.ts` | Roadmap lane helpers, icon URLs | N/A |

**Sync scripts (do not sync roadmap):**

- `npm run sync:content` — legal pages + about/donate config only
- `npm run sync:assets` — graphics only (`supply/` → `public/`)

See also: `docs/adding-an-app.md`, `scripts/sync-content.mjs` (line 10 documents manual app frontmatter).

---

## Roadmap structure (site)

Defined in `src/content.config.ts`. Each app has **exactly three lanes**:

| Lane `id` | Default label if `label` omitted | Typical use |
|-----------|-----------------------------------|-------------|
| `now` | Now | Current release / beta work |
| `next` | Next | Next version |
| `later` | Later | Future / backlog |

Custom lane labels are supported, e.g. `V1.0 closed beta`.

Each roadmap **item** can have:

| Field | Required | Values |
|-------|----------|--------|
| `title` | Yes | Short feature name |
| `description` | No | One-line detail |
| `status` | No | `planned`, `in-progress`, `ready`, `shipped` |

Items titled `TODO` are filtered out at render time (`src/lib/apps.ts`).

### Example (Commander Vault)

```yaml
roadmap:
  - id: now
    label: V1.0 closed beta
    items:
      - title: 32-slot Commander challenge tracker
        description: Core 32 Deck Challenge grid — one slot per colour identity.
        status: in-progress
  - id: next
    label: v1.1
    items:
      - title: Smarter commander search
        status: planned
  - id: later
    label: v1.2+ and iOS
    items:
      - title: Settings menu
        status: planned
```

---

## App status vs roadmap (two different things)

| Concept | Field | Where | Shown on site |
|---------|-------|-------|---------------|
| **App badge** | `status` | `src/content/apps/<slug>.md` + `apps.inventory.json` | Hero badge, home app card |
| **Roadmap lane** | `roadmap[].label` | `src/content/apps/<slug>.md` only | Roadmap column header |
| **Roadmap item state** | `roadmap[].items[].status` | `src/content/apps/<slug>.md` only | Status chip on each card |

**Allowed app statuses:** `coming-soon`, `beta`, `live`

These can differ intentionally. Example (current Commander Vault):

- App badge: `beta`
- Roadmap lane label: `V1.0 closed beta`
- V1.0 items: `in-progress`
- v1.1 / later items: `planned`

---

## Supply sheet format (`supply/apps/<slug>/app.md`)

Roadmap is Markdown tables under `## Roadmap`, grouped by lane heading:

```markdown
## Roadmap

*Site lanes: **V1.0 closed beta** = ...; **Next** = v1.1; **Later** = v1.2+ and iOS.*

### V1.0 closed beta

| Feature | Notes |
|---------|--------|
| 32-slot Commander challenge tracker | Core 32 Deck Challenge grid |
```

Supply sheets also hold identity, features, links, graphics notes, and monetization architecture. When roadmap changes, update the matching YAML in `src/content/apps/<slug>.md`.

---

## Commander Vault — current product context (2026-05-30)

Use this when interpreting roadmap/status updates:

| Topic | Current state |
|-------|---------------|
| App badge | `beta` |
| Public store | Not live — footer shows `Coming soon to Google Play` (non-clickable placeholder) |
| Roadmap lane | `V1.0 closed beta` |
| Monetization | Free: 5 editable mono-colour slots; non-mono slots visible but locked; one-time purchase unlocks full 32-slot grid |
| V1.0 roadmap items | All `in-progress` |
| Post-V1.0 | v1.1 and v1.2+ / iOS items remain `planned` |

**Do not confuse with Android app versioning:** `version.properties` and `build=` in this repo are **website only**. Android `versionCode` / signed APK builds live in the Commander Vault app repo.

---

## How to update the roadmap (checklist)

When the owner requests a roadmap or release-state change:

1. Read `PROJECT_PLAN.md` and pick/create a task row if work is substantial.
2. Update **`supply/apps/<slug>/app.md`** (planning copy).
3. Update **`src/content/apps/<slug>.md`** (live site data — must match intent).
4. If app badge changed, update **`apps.inventory.json`** (`status` field).
5. Update **`PROJECT_PLAN.md`**: decisions log, Done row, To Test Checklist if relevant.
6. Run **`npm run build`** to verify schema/render.
7. Bump **`version.properties`** when shipping user-visible changes (`VERSIONING.md`).
8. Commit only when the owner asks.

---

## Rendering pipeline

```
src/content/apps/<slug>.md
        ↓  (Astro content collection + schema in src/content.config.ts)
src/pages/apps/[slug].astro
        ↓
src/layouts/AppPage.astro
        ↓
src/components/Roadmap.astro  ← uses roadmapLanes() from src/lib/apps.ts
```

Home page app cards read from the `apps` collection + `apps.inventory.json` ordering.

---

## Status chip styling

`src/components/Roadmap.astro` CSS classes:

| Status | Class | Visual intent |
|--------|-------|---------------|
| `planned` | default | Muted |
| `in-progress` | `.status-in-progress` | Accent / gold |
| `ready` | `.status-ready` | Blue (complete but not public release) |
| `shipped` | `.status-shipped` | Green |

---

## Common mistakes to avoid

1. **Updating only `supply/app.md`** — site will not change until `src/content/apps/<slug>.md` is updated.
2. **Running `sync:content` expecting roadmap sync** — it only syncs legal + about/donate.
3. **Using a fourth roadmap lane** — schema allows only `now`, `next`, `later`. Combine extras into `later` with a descriptive label (e.g. `v1.2+ and iOS`).
4. **Mixing app `status` and roadmap item `status`** — they are independent fields for different UI areas.
5. **Forgetting `apps.inventory.json`** — home card badge won't match app page if only frontmatter changes.

---

## Related docs

| Doc | Purpose |
|-----|---------|
| `PROJECT_PLAN.md` | Tasks, Done history, test checklist, product decisions |
| `docs/adding-an-app.md` | Adding a new app end-to-end |
| `VERSIONING.md` | When/how to bump `version.properties` |
| `supply/apps/_template/app.md` | Blank app supply template |
| `src/content/apps/commander-vault.md` | Reference implementation (pilot app) |

---

## Verification after changes

- [ ] `npm run build` passes
- [ ] App page shows correct badge, roadmap lane labels, and item statuses
- [ ] Home app card status matches if changed
- [ ] `supply/app.md` and `src/content/apps/<slug>.md` agree on roadmap content
- [ ] `PROJECT_PLAN.md` updated if this was agent work
- [ ] `version.properties` bumped if user-visible work ships
