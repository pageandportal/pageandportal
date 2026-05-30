# Roadmap & app content — agent handoff

**Commander Vault owns the product roadmap.** The Page and Portal Website repo **publishes** it to the live site.

---

## Source of truth (Commander Vault repo)

| File | Role |
|------|------|
| **`E:/App Projects/Commander_Vault/docs/public-roadmap.yaml`** | **Canonical** public roadmap — app badge, lanes, items, statuses, backlog cross-refs |
| `E:/App Projects/Commander_Vault/docs/PROJECT_TODO.md` | Internal execution backlog (`A*` / `U*` tasks) |
| `E:/App Projects/Commander_Vault/docs/roadmap-handoff.md` | Full ownership rules and maintenance workflow |

**Website agents:** Read Commander Vault `docs/public-roadmap.yaml` before editing Commander Vault roadmap content. Copy **user-centric headlines** verbatim — no task IDs or engineering detail on the site. See Commander Vault `docs/roadmap-handoff.md` § Editorial rules.

---

## What drives the live site?

The **live roadmap** is rendered from:

```
src/content/apps/commander-vault.md   ← YAML frontmatter (Astro renders this)
```

Publish from Commander Vault source:

```
E:/App Projects/Commander_Vault/docs/public-roadmap.yaml
        ↓  (website agent copies roadmap + status)
src/content/apps/commander-vault.md
supply/apps/commander-vault/app.md    ← human-friendly tables (keep aligned)
apps.inventory.json                   ← home card badge when status changes
```

**Critical:** Roadmap changes start in **Commander Vault** `docs/public-roadmap.yaml`. This website repo applies them to frontmatter and supply sheets.

Only **legal pages** and some **site config** auto-sync from `supply/` via `npm run sync:content` — **roadmap is not synced by script**.

---

## Website publish checklist

When publishing Commander Vault roadmap updates:

1. Read **`E:/App Projects/Commander_Vault/docs/public-roadmap.yaml`** and **`docs/roadmap-handoff.md`** (Commander Vault).
2. Update **`src/content/apps/commander-vault.md`** (`status`, `roadmap` frontmatter).
3. Update **`supply/apps/commander-vault/app.md`** roadmap tables to match.
4. If app badge changed, update **`apps.inventory.json`**.
5. Run **`npm run build`**.
6. Bump **`version.properties`** when shipping user-visible site changes.
7. Record in **`PROJECT_PLAN.md`** *Done* when substantial.

**Do not edit Commander Vault `docs/public-roadmap.yaml` from this repo** unless the owner explicitly assigns a cross-repo fix — note discrepancies for Commander Vault agents.

---

## Roadmap structure (site schema)

Defined in `src/content.config.ts`. Each app has **exactly three lanes**:

| Lane `id` | Typical use |
|-----------|-------------|
| `now` | Current release / beta work |
| `next` | Next version |
| `later` | Future / backlog |

Custom lane labels supported (e.g. `V1.0 closed beta`, `v1.2+ and iOS`).

Each item: `title` (required), `description` (optional), `status` (`planned` | `in-progress` | `ready` | `shipped`).

App badge (`coming-soon` | `beta` | `live`) is separate from item statuses.

See Commander Vault `docs/public-roadmap.yaml` for current Commander Vault content and `backlogIds` mapping.

---

## File map (this repo)

| File | Role | Feeds live site? |
|------|------|------------------|
| `src/content/apps/commander-vault.md` | App page data (features, roadmap, status, links) | **Yes** |
| `supply/apps/commander-vault/app.md` | Planning copy mirror (not authoritative for roadmap) | No |
| `apps.inventory.json` | Home page app list | **Yes** (home grid) |
| `PROJECT_PLAN.md` | Website agent tasks, decisions, test checklist | No |

**Sync scripts (do not sync roadmap):**

- `npm run sync:content` — legal + about/donate only
- `npm run sync:assets` — graphics only

---

## Related docs

| Doc | Repo |
|-----|------|
| [`docs/public-roadmap.yaml`](../../Commander_Vault/docs/public-roadmap.yaml) | Commander Vault — **roadmap source** |
| [`docs/roadmap-handoff.md`](../../Commander_Vault/docs/roadmap-handoff.md) | Commander Vault — ownership + rules |
| [`docs/PROJECT_TODO.md`](../../Commander_Vault/docs/PROJECT_TODO.md) | Commander Vault — internal backlog |
| `PROJECT_PLAN.md` | This repo — website tasks |
| `docs/adding-an-app.md` | This repo — adding a new app |
| `src/content/apps/commander-vault.md` | This repo — live frontmatter |

---

## Verification after publish

- [ ] Commander Vault `docs/public-roadmap.yaml` matches published frontmatter
- [ ] `npm run build` passes
- [ ] App page badge, lane labels, and item chips are correct
- [ ] Home app card status matches if changed
- [ ] `supply/apps/commander-vault/app.md` agrees with frontmatter
