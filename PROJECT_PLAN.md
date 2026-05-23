# Page and Portal — Developer Website

**Brand:** Page and Portal  
**Purpose:** Clean, modern developer hub with a dedicated page per app  
**Hosting:** GitHub Pages (static site)  
**Repository:** [github.com/pageandportal/pageandportal](https://github.com/pageandportal/pageandportal)  
**Last updated:** 2026-05-23

---

## Repository & GitHub Pages

| Field | Value |
|-------|--------|
| **GitHub org** | `pageandportal` |
| **Repository** | `pageandportal` |
| **Repo URL** | https://github.com/pageandportal/pageandportal |
| **Pages type** | Project site |
| **Live URL (after deploy)** | https://pageandportal.github.io/pageandportal/ |
| **Astro `site`** | `https://pageandportal.github.io` |
| **Astro `base`** | `/pageandportal/` |

Machine-readable copy: [`site.properties`](site.properties). Agents must use these values in `astro.config.mjs` and GitHub Actions deploy.

**Git:** Owner delegates all Git work to agents. See `.cursor/rules/git.mdc`. Remote: `https://github.com/pageandportal/pageandportal.git`, branch `main`.

App list: [`apps.inventory.json`](apps.inventory.json) and `supply/apps/<slug>/`.

---

## App inventory

| Display name | URL slug | Tagline | Status | Supply folder |
|--------------|----------|---------|--------|---------------|
| Commander Vault | `commander-vault` | Track all 32 Commander color identities — one deck at a time. | coming soon | [`supply/apps/commander-vault/`](supply/apps/commander-vault/) |
| Portal Pages Times Tables | `portal-pages-times-tables` | Learn and practise times tables 2–12 — calm, offline, and free. | coming soon | [`supply/apps/portal-pages-times-tables/`](supply/apps/portal-pages-times-tables/) |

**Pilot app:** **Commander Vault** — content migrated from [Google Sites](https://sites.google.com/view/commander-vault/home) into `supply/apps/commander-vault/` (2026-05-23). Still needed: roadmap, graphics, store links, donate.

**Site routes (when built):**

- `/apps/commander-vault/`
- `/apps/portal-pages-times-tables/`

---

## Vision

A dark-mode-first, minimal developer site that introduces **Page and Portal**, routes visitors to each app, and on every app page showcases **features**, a **visual roadmap** of upcoming work, a short **about-the-developer** blurb, and a clear **donate** call-to-action. Legal content (privacy policies, etc.) lives on linked subpages where you already have copy.

---

## Recommended technical approach

| Choice | Recommendation | Why |
|--------|----------------|-----|
| **Stack** | [Astro](https://astro.build) 5.x, static output | Fast static HTML, Markdown for policies, reusable layouts per app, easy GitHub Actions deploy |
| **Styling** | CSS custom properties + one global theme | No runtime theme flash; graphics drive accent colors per app |
| **Content** | `src/content/apps/*.md` + `src/content/legal/*.md` | You edit copy without touching layout code |
| **Deploy** | GitHub Actions → `gh-pages` branch (or `docs/`) | Works for project sites (`username.github.io/repo-name`) and user/org sites |
| **Fallback** | Plain HTML/CSS if you prefer zero build | Possible, but worse for many apps + Markdown legal pages |

### GitHub Pages (confirmed)

This repo is a **project site** under the `pageandportal` org:

- **Published URL:** https://pageandportal.github.io/pageandportal/
- **`astro.config.mjs`:** `site: 'https://pageandportal.github.io'`, `base: '/pageandportal/'`

Enable Pages in the repo: **Settings → Pages → Source:** GitHub Actions (after Phase 0 adds the deploy workflow) or deploy branch as documented in the workflow.

---

## Information architecture

```
/                          Home — Page and Portal brand, app cards, global donate
/about                     Optional full “who I am” (can mirror blurb on app pages)
/apps/<app-slug>/          Per-app landing (template below)
/apps/<app-slug>/privacy   Privacy policy (Markdown → HTML)
/apps/<app-slug>/…         Other legal pages as needed (terms, etc.)
/donate                    Optional on-site donate explainer; button still links out
```

### Per-app page template (every app)

1. **Hero** — App name, one-line pitch, key art (your graphic or placeholder)
2. **Features** — 3–8 items: icon or screenshot, title, short description
3. **Roadmap** — Visual timeline / status lanes: *Now · Next · Later* (or quarters)
4. **About the developer** — Shared blurb (same component site-wide; configurable override per app if you want)
5. **Donate** — Prominent button → external donation URL (Ko-fi, PayPal, GitHub Sponsors, etc.)
6. **Footer** — Links to privacy/legal, store listing (if any), back to home

### Home page

- Page and Portal logo/wordmark
- Short studio tagline
- Grid of app cards (art, name, one line, link)
- Global donate + about snippet

---

## Visual & UX direction

- **Default:** Dark background (`#0d0f12` range), high-contrast text, restrained accent from each app’s artwork
- **Typography:** One readable sans (e.g. system stack or [Inter](https://rsms.me/inter/)) + optional display face for headings if assets suggest it
- **Layout:** Generous whitespace, max-width ~1100px, mobile-first
- **Roadmap:** Horizontal scroll on mobile; cards or nodes with status chips (`Planned`, `In progress`, `Shipped`)
- **Accessibility:** Semantic landmarks, focus states, `prefers-reduced-motion`, alt text on all supplied images
- **Apps without graphics:** Neutral gradient placeholder + monogram until assets arrive

---

## Build phases (agent work)

| Phase | Scope | Depends on |
|-------|--------|------------|
| **0 — Bootstrap** | Astro, theme tokens, layout shell, GitHub Actions, `version.properties` | `site.properties` (confirmed) |
| **1 — Home** | Branding, app grid (placeholder apps OK) | App list, any global logo |
| **2 — App template** | Reusable `AppPage.astro` + content schema | One app’s copy as pilot |
| **3 — Content ingest** | All apps + legal Markdown | Your tasks below |
| **4 — Asset pass** | Wire graphics, favicon, OG images | Asset pack per app |
| **5 — Polish** | Animations, SEO, 404, lighthouse pass | Your review |
| **6 — Launch** | Enable Pages, custom domain (optional), smoke test | Domain DNS if used |

---

## Repository layout (target)

```
/
├── PROJECT_PLAN.md          ← This file (tasks, rules, checklist)
├── VERSIONING.md
├── version.properties
├── .cursor/rules/
│   ├── agent-workflow.mdc
│   └── versioning.mdc
├── .github/workflows/deploy.yml
├── public/                  Static assets (favicon, robots.txt)
├── src/
│   ├── assets/              Per-app images you supply
│   ├── components/          Feature grid, Roadmap, DonateButton, AboutBlurb
│   ├── content/
│   │   ├── apps/            One .md per app (frontmatter + body)
│   │   └── legal/
│   ├── layouts/
│   └── pages/
└── docs/                    Owner reference (not deployed): adding-an-app, app-ideas
```

---

## Agent update rules

**Agents:** Read this file at the start of any substantial work. Task state lives here — not only in Cursor’s in-chat todo tool.

### Workflow

| When | Action |
|------|--------|
| **Start of substantial work** | Read `PROJECT_PLAN.md`. Pick the next item from **Cursor agent tasks → In progress (agents)**, or promote/create one as needed. |
| **When starting** | Move the item to **In progress (agents)**. |
| **When finishing** | Move to **Done** with date `YYYY-MM-DD` and a short note. |
| **New agent work** | Add under **Cursor agent tasks**; do not rely only on in-chat todo tools. |
| **Owner completes something** | Move from **Your tasks** to **Done** (agents may do this when the owner confirms). |
| **Polish / post-launch ideas** | Keep in **Polish backlog** until the owner promotes an item into **Cursor agent tasks** or **Your tasks**. |
| **Do not remove history** | Keep **Done** entries (newest first). |

### To Test Checklist

Keep **To Test Checklist** in sync with the site (below). Same file, same maintenance discipline as tasks and backlog.

### Versioning (agents)

Agents own bumps in `version.properties` when user-visible work ships or a Play build is prepared. See `.cursor/rules/versioning.mdc` and `VERSIONING.md`. Note `→ vX.Y.Z` in **Done** rows.

---

## Your tasks

*Things only you can supply. Check off here; tell the agent when an item is ready.*

### Required before first real app page

- [x] **GitHub setup** — [pageandportal/pageandportal](https://github.com/pageandportal/pageandportal); project site → https://pageandportal.github.io/pageandportal/
- [x] **App inventory** — Commander Vault, Portal Pages Times Tables (both coming soon); see **App inventory** above
- [x] **Pilot app pack** — Commander Vault (features + legal from Google Sites); roadmap, graphics, store links still TODO
- [ ] **Developer blurb** — 2–4 short paragraphs (or bullet bio): who you are, what Page and Portal is, tone (casual / professional)
- [ ] **Donation** — URL for donate button(s): one global link or per-app links
- [x] **Privacy (and other legal)** — Commander Vault: privacy, terms, credits in `supply/apps/commander-vault/legal/`; Times Tables privacy in `supply/apps/portal-pages-times-tables/legal/privacy.md` (+ `docs/Portal-Pages-Times-Tables-PRIVACY_POLICY.md`)

### Per app (repeat for each)

**Commander Vault** (`supply/apps/commander-vault/`)

- [x] **Features** — 4 items from legacy site (in `app.md`)
- [ ] **Roadmap** — not on Google Site; owner to supply
- [x] **Links** — support email; store URLs TODO
- [x] **Graphics** — `logo-icon.png`, `hero-banner.png`, `logo-lockup.png`; in-app feature screenshots still TODO
- [x] **Brand hints** — Cinzel/Inter, gold/purple accents, fan content disclaimer (see `app.md`, `legal/credits.md`)

**Portal Pages Times Tables** (`supply/apps/portal-pages-times-tables/`)

- [ ] **Features** — 3–8 items
- [ ] **Roadmap**
- [ ] **Links**
- [ ] **Graphics**
- [ ] **Brand hints**

### Site-wide optional (recommended)

- [x] **Global logo** — Tier A set in `supply/site/branding/` (`tier-a-1` nav icon, `tier-a-2` header, `tier-a-3` optional hero); see `TIER-A.md`
- [ ] **Avatar** — Photo or illustration for about section
- [ ] **Social links** — GitHub, X, Mastodon, Discord, etc. (URLs or “none”)
- [ ] **SEO** — Default site description; per-app descriptions if different
- [ ] **Custom domain** — e.g. `pageandportal.dev` + whether you want agents to document DNS
- [ ] **Analytics** — Plausible / GA / none
- [ ] **404 copy** — Friendly message or use default

### Delivery format (helps agents)

Put assets in a folder you can drop into the repo, e.g.:

```
supply/
  README.md              ← your notes
  apps/
    my-app-slug/
      app.yaml or app.md ← features + roadmap as structured text
      graphics/
      legal/
        privacy.md
```

Plain text, YAML, or Markdown is ideal. Word docs are fine if you paste content into chat or convert to `.md`.

---

## Cursor agent tasks

### In progress (agents)

*(empty)*

### Backlog (agents)

1. **Phase 1 — Home** — Refine copy when owner supplies blurb / donate; optional tier-a-3 hero
3. **Phase 3 — Pilot app** — Sync `supply/` → `src/content/apps/`; wire donate/about config from owner supply
5. **Phase 4 — Remaining apps** — Roll out after each **Your tasks** per-app block is done
6. **Phase 5 — Legal routes** — Privacy/terms from Markdown
7. **Phase 6 — Launch** — Pages config, smoke test, update **To Test Checklist**

### Done (agents)

*(newest first)*

| Date | Task | Note |
|------|------|------|
| 2026-05-23 | Phase 2 — App template (content schema, AppPage, components) | Commander Vault pilot data in collection; hero in public → v0.2.0 |
| 2026-05-23 | Phase 0 — Astro bootstrap, minimal home, GitHub Pages deploy | → v0.1.0 |
| 2026-05-23 | Project plan + agent rules + versioning stubs | → v0.0.1 |

---

## Polish backlog

- Subtle scroll animations for roadmap
- Per-app OG images auto-generated from hero art
- Light mode toggle (only if you want it; default remains dark)
- RSS / “what’s new” from roadmap changes
- i18n

---

## To Test Checklist

*Sync when the site exists. Check on each release.*

### Global

- [ ] Home loads at https://pageandportal.github.io/pageandportal/ (`base: /pageandportal/`) — verify after Actions deploy
- [ ] Dark theme readable; focus visible on links and donate button
- [ ] Mobile layout: nav, app cards, footer
- [ ] Donate button opens correct external URL in new tab (`rel="noopener"`)

### Per app

- [ ] App page hero shows correct art or placeholder
- [ ] All feature items render with alt text on images
- [ ] Roadmap order and status labels match your intent
- [ ] About blurb displays; links work
- [ ] Privacy (and other legal) pages linked and readable
- [ ] Store/repo links work

### Deploy & meta

- [ ] `version.properties` matches shipped user-visible version
- [ ] Favicon and page `<title>` / description present
- [ ] 404 page works
- [ ] Lighthouse: no critical a11y failures on home + one app page

---

## Decisions log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-05-23 | Astro + static deploy | Markdown legal copy, multi-app template, GitHub Actions |
| 2026-05-23 | Single `PROJECT_PLAN.md` for tasks + test checklist | Owner-requested agent workflow |
| 2026-05-23 | GitHub repo `pageandportal/pageandportalweb` | Initial repo; superseded by rename |
| 2026-05-23 | Renamed repo → `pageandportal/pageandportal` | Pages URL `/pageandportal/`; `site.properties` updated |
| 2026-05-23 | App inventory (2 apps, coming soon) | `apps.inventory.json` + starter `supply/apps/*` |
| 2026-05-23 | Commander Vault pilot content | Migrated from Google Sites; legal + features in `supply/` |
| 2026-05-23 | Git repo init + initial push | Agent-controlled Git; supply graphics + Tier A branding |

---

## Quick reference for owners

- **App ideas (private, not on site):** [`docs/app-ideas.md`](docs/app-ideas.md)

1. Fill **Your tasks** (start with pilot app; GitHub repo is set).
2. Drop files under `supply/` or tell the agent paths in this repo.
3. Say “start Phase 0” (or pick a backlog item) when ready to build.
4. Confirm in chat when an owner task is done so agents can move it to **Done**.
