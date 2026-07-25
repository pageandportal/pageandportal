# Page and Portal — Developer Website

**Brand:** Page and Portal  
**Purpose:** Clean, modern developer hub with a dedicated page per app  
**Hosting:** GitHub Pages (static site)  
**Repository:** [github.com/pageandportal/pageandportal](https://github.com/pageandportal/pageandportal)  
**Last updated:** 2026-07-25

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
| Commander Vault | `commander-vault` | Track all 32 Commander color identities — one deck at a time. | live (Google Play) | [`supply/apps/commander-vault/`](supply/apps/commander-vault/) |
| SparkClass | `sparkclass` | Class-centred practice for NZ electrical learners — from pre-trade through apprenticeship. | coming soon | [`supply/apps/sparkclass/`](supply/apps/sparkclass/) |
| Portal Pages Times Tables | `portal-pages-times-tables` | Learn and practise times tables 2–12 — calm, offline, and free. | coming soon | [`supply/apps/portal-pages-times-tables/`](supply/apps/portal-pages-times-tables/) |

**Pilot app:** **Commander Vault** — content migrated from [Google Sites](https://sites.google.com/view/commander-vault/home) into `supply/apps/commander-vault/` (2026-05-23). V1.0 is **live on Google Play**; donate link still pending.

**SparkClass:** NZ electrical learning web app (Next.js + Supabase) for pre-trade and apprenticeship programmes. Site section added 2026-07-24. **Do not publish the live app URL** until the owner says it is ready for visitors. Product name still interim (`U20` in SparkClass plan); privacy/consent copy needs owner review.

**Site routes:**

- `/apps/commander-vault/`
- `/apps/sparkclass/`
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
4. **About the developer** — On the home page (`/#about`); app pages link back via studio credit in the footer
5. **Donate** — Prominent button → external donation URL (Ko-fi, PayPal, GitHub Sponsors, etc.)
6. **Footer** — Links to privacy/legal, store listing (if any), back to home

### Home page

- Page and Portal logo/wordmark
- Short studio tagline
- Grid of app cards (art, name, one line, link)
- About the developer (`#about`)

---

## Visual & UX direction

- **Default:** Dark background (`#0d0f12` range), high-contrast text, restrained accent from each app’s artwork
- **Typography:** One readable sans (e.g. system stack or [Inter](https://rsms.me/inter/)) + optional display face for headings if assets suggest it
- **Layout:** Generous whitespace, max-width ~1100px, mobile-first
- **Roadmap:** Horizontal scroll on mobile; cards or nodes with status chips (`Planned`, `In progress`, `Ready`, `Shipped`)
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
- [x] **App inventory** — Commander Vault (closed beta V1.0), Portal Pages Times Tables (coming soon); see **App inventory** above
- [x] **Pilot app pack** — Commander Vault features, graphics, legal, and `V1.0 closed beta` roadmap synced from `supply/`; public Google Play listing URL and donate still pending
- [x] **Roadmap ownership** — Commander Vault `docs/public-roadmap.yaml` is source of truth (2026-05-30); website publishes via `docs/roadmap-handoff.md`
- [x] **Developer blurb** — James; Nelson region; Page & Portal copy in `supply/site/about.md` (2026-05-23)
- [ ] **Donation** — URL for donate button(s): one global link or per-app links *(UI hidden via `DONATE.enabled` until ready)*
- [x] **Privacy (and other legal)** — Commander Vault: privacy, terms, credits in `supply/apps/commander-vault/legal/`; Times Tables privacy in `supply/apps/portal-pages-times-tables/legal/privacy.md` (+ `docs/Portal-Pages-Times-Tables-PRIVACY_POLICY.md`)

### Post-launch (owner)

*(none)*

### Per app (repeat for each)

**Commander Vault** (`supply/apps/commander-vault/`)

- [x] **Features** — 4 items from legacy site (in `app.md`)
- [x] **Roadmap** — `V1.0 closed beta` lane plus v1.1, v1.2+, and iOS plan in `app.md` (updated 2026-05-30)
- [x] **Monetization architecture** — Start free with 5 editable mono-colour slots; non-mono slots remain visible but locked; a one-time purchase unlocks the full 32-slot challenge; shared progress pages keep a watermark until unlock (2026-05-25)
- [x] **Links** — support email live; site shows `Coming soon to Google Play` until the public listing goes live
- [x] **Graphics** — `logo-icon.png`, `hero-banner.png`; feature screenshots + Play assets when store listing ships
- [x] **Brand hints** — Cinzel/Inter, gold/purple accents, fan content disclaimer (see `app.md`, `legal/credits.md`)

**Portal Pages Times Tables** (`supply/apps/portal-pages-times-tables/`)

- [x] **Features** — 7 items in `app.md`
- [x] **Roadmap** — Release 2–4+ plan in `app.md` (2026-05-23)
- [x] **Links** — support email; store URLs when listings go live (with feature screenshots)
- [x] **Graphics** — `logo-icon.png`, `hero-banner.png`; feature screenshots + Play assets when store listing ships
- [x] **Brand hints** — orange/green accents (see `app.md`, `graphics/README.md`)

**SparkClass** (`supply/apps/sparkclass/`)

- [ ] **Final product name** — still interim `SparkClass` (shortlist in SparkClass `notes/product-plan.md` / `U20`)
- [ ] **Privacy / terms owner review** — drafts in `legal/`; confirm under-18 consent, retention, and third-party wording
- [ ] **Graphics** — official wordmark (transparent) live; optional: replace workshop hero, product screenshots; page accents `#3465C1` / `#F7D024`
- [ ] **Custom domain** — when a public hostname is ready, update site Open CTA + Auth URLs
- [ ] **Public roadmap source** — optional `public-roadmap.yaml` in SparkClass (like Commander Vault) for ongoing sync
- [x] **Features / roadmap / links** — drafted from SparkClass product plan (2026-07-24); **app URL withheld** from public site until ready
- [ ] **Public app URL** — add Open CTA only when owner confirms visitors may use the hosted app
- [x] **Support email** — `pageandportal@gmail.com` (same studio address unless owner specifies otherwise)

### Site-wide optional (recommended)

- [x] **Global logo** — Tier A set in `supply/site/branding/` (`tier-a-1` nav icon, `tier-a-2` header, `tier-a-3` optional hero); see `TIER-A.md`
- [x] **Avatar** — `supply/site/branding/avatar.png` (2026-05-23)
- [x] **Social links** — none (owner decision 2026-05-23; recorded in `supply/site/about.md`)
- [x] **SEO** — default site title/description in `src/config/site.ts`; per-app meta from taglines
- [x] **Custom domain** — not planned (stay on `pageandportal.github.io/pageandportal/`)
- [x] **Analytics** — Google Analytics 4 on the website (`G-48L1CF97DY`), loaded in production only and disabled in local dev
- [x] **404 copy** — custom page at `/404.html`; `<base>` fix for nested bad URLs on GitHub Pages

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

*(none)*

### Backlog (agents)

1. **Phase 1 — Home** — Optional tier-a-3 hero; donate when owner supplies URL
5. **Phase 4 — Asset polish** — Feature screenshots + Play graphics when store listings ship

### Done (agents)

*(newest first)*

| Date | Task | Note |
|------|------|------|
| 2026-07-25 | GA4 page title (not set) fix | Move `<title>` before gtag; send explicit `page_title` in config so page_view cannot race empty document.title → v0.7.4 |
| 2026-07-24 | SparkClass drop Kahoot wording | Live quiz sessions only — avoid third-party brand risk → v0.7.3 |
| 2026-07-24 | SparkClass wordmark on white | Logo tile matches other app marks; rounded white plate → v0.7.2 |
| 2026-07-24 | SparkClass status and scope copy | Home/app: coming soon; pre-trade → apprenticeship wording → v0.7.1 |
| 2026-07-24 | SparkClass app section | Home card, `/apps/sparkclass/`, privacy/terms drafts, web Open CTA, interim brand art from product teal → v0.7.0 |
| 2026-07-22 | Commander Vault v1.1 shipped on site | All v1.1 roadmap items **shipped** after Play publish → v0.6.6 |
| 2026-07-22 | Commander Vault v1.1 rollout roadmap | Synced from CV `public-roadmap.yaml`: v1.1 items **ready**/shipped for Play rollout; stale reminders + in-app updates added → v0.6.5 |
| 2026-06-15 | Commander Vault v1.1 roadmap sync | Full v1.1 copy from CV `public-roadmap.yaml`; all v1.1 **in progress** on site except **U22** shipped; added suggest-slot headline → v0.6.4 |
| 2026-06-15 | Commander Vault homepage feedback (U22) | `AppFeedbackSection` with `#feedback` + mailto; roadmap item shipped |
| 2026-06-15 | Commander Vault v1.1 roadmap publish | Published live status + v1.1 in-progress lanes from CV `public-roadmap.yaml` → v0.6.3 |
| 2026-05-31 | Commander Vault v1.1 deck links copy | Published auto-fill commander from linked deck list on Better deck links → v0.6.2 |
| 2026-05-30 | Commander Vault roadmap publish | Published refined user-centric roadmap from CV `public-roadmap.yaml`; V1.0 ready items + v1.1 deck links/nicknames → v0.6.1 |
| 2026-05-30 | Roadmap ownership → Commander Vault | `docs/public-roadmap.yaml` in Commander Vault repo is canonical; website publishes from handoff doc → v0.6.0 build 1 |
| 2026-05-30 | Roadmap agent handoff doc | Added `docs/roadmap-handoff.md` for app content and roadmap update workflow → v0.6.0 build 1 |
| 2026-05-30 | Commander Vault signed build prep | Website release `v0.6.0` build `1` for V1.0 closed beta signed build → v0.6.0 build 1 |
| 2026-05-30 | Commander Vault V1.0 closed beta | App status `beta`; roadmap lane `V1.0 closed beta` with in-progress V1.0 items → v0.5.13 |
| 2026-05-27 | Website analytics privacy note | Added a short footer note that the website uses Google Analytics → v0.5.12 |
| 2026-05-27 | Google Analytics 4 setup | Added GA4 site-wide in `BaseLayout`; production only, disabled in local dev → v0.5.11 |
| 2026-05-25 | Commander Vault icon update | Replaced the small app icon with newly supplied artwork and synced it to public assets → v0.5.10 |
| 2026-05-25 | Commander Vault roadmap lane rename | Renamed the current roadmap lane to `V1.0 coming soon` → v0.5.9 |
| 2026-05-25 | Commander Vault roadmap trim | Removed the free-tier watermark item from the `V1.0 ready` roadmap → v0.5.8 |
| 2026-05-25 | Commander Vault hero copy alignment | Updated the intro wording and center-aligned the top descriptive text → v0.5.7 |
| 2026-05-25 | App hero intro width polish | Top descriptive text now spans the same content width as features and roadmap sections → v0.5.6 |
| 2026-05-25 | Commander Vault V1.0-ready refresh | Freemium copy, `V1.0 ready` roadmap state, Google Play placeholder, and purchase legal wording aligned → v0.5.5 |
| 2026-05-23 | Remove website analytics | Plausible removed; no tracking scripts → v0.5.4 |
| 2026-05-23 | Lighthouse / a11y polish | Skip link, OG meta, contrast, LCP hints → v0.5.3 |
| 2026-05-23 | Post-launch owner decisions + 404 fix | Social/domain none; 404 `<base>` + `.nojekyll` → v0.5.1 |
| 2026-05-23 | Phase 6 — Launch | Public repo; Pages + Actions; owner live smoke test passed → v0.5.0 |
| 2026-05-23 | Phase 3 — Content ingest | Both apps + legal + about in collections; supply sync scripts |
| 2026-05-23 | Commander Vault roadmap on site | v1.0–v1.2+ and iOS → `commander-vault` collection → v0.4.4 |
| 2026-05-23 | About on home only | Moved `AboutBlurb` to home `#about`; studio credit on app pages → v0.5.0 |
| 2026-05-23 | Times Tables roadmap on site | Release 2–4+ from owner → `portal-pages-times-tables` collection → v0.4.3 |
| 2026-05-23 | Site assets sync + 404 page | `sync:assets` supply→public; favicon/nav icons; 404 → v0.4.2 |
| 2026-05-23 | Hide donate UI until owner ready | `DONATE.enabled: false` on app pages → v0.4.1 |
| 2026-05-23 | Phase 5 — Legal routes (Commander Vault) | Privacy, terms, credits from `supply/` → v0.4.0 |
| 2026-05-23 | Phase 5 — Legal routes (Times Tables privacy) | `legal` collection + `/apps/portal-pages-times-tables/privacy` from supply → v0.3.0 |
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

- [x] Home loads at https://pageandportal.github.io/pageandportal/ (`base: /pageandportal/`) — owner verified 2026-05-23
- [x] Dark theme readable; focus visible on links — owner verified 2026-05-23
- [x] Mobile layout: nav, app cards, footer — owner verified 2026-05-23
- [x] Donate button — N/A (UI hidden via `DONATE.enabled`)
- [ ] Footer includes a short note that the website uses Google Analytics
- [ ] Google Analytics 4 loads on deployed pages with measurement ID `G-48L1CF97DY`
- [ ] Google Analytics 4 does not load during local `npm run dev`
- [ ] Pages and screens report shows real page titles (e.g. Portal Pages Times Tables), not a large `(not set)` bucket after deploy

### Per app

- [x] App page hero shows correct art — owner verified 2026-05-23
- [x] Feature items render (text-only; no feature screenshots yet) — owner verified 2026-05-23
- [ ] Commander Vault — status badge shows `beta` while roadmap lane is **V1.0 Play launch**
- [ ] Commander Vault — roadmap shows **ready** V1.0 items and **in-progress** Google Play launch
- [ ] Commander Vault — free-to-start copy matches the approved one-time unlock wording
- [ ] Commander Vault — support link works and `Coming soon to Google Play` renders as non-clickable placeholder text
- [ ] Commander Vault — privacy and terms mention Google Play purchase handling and the one-time unlock
- [x] About on home `#about`; studio credit on app pages — owner verified 2026-05-23
- [x] Privacy (and other legal) pages linked and readable — owner verified 2026-05-23
- [x] Portal Pages Times Tables — privacy at `/apps/portal-pages-times-tables/privacy`
- [x] Commander Vault — privacy, terms, credits at `/apps/commander-vault/{privacy,terms,credits}`
- [ ] SparkClass — app page hero, features, roadmap, and Open app CTA
- [ ] SparkClass — privacy and terms at `/apps/sparkclass/{privacy,terms}`
- [ ] SparkClass — status badge shows `coming soon`; no public app URL / Open CTA until owner ready
- [ ] SparkClass — footer shows “Coming soon” as non-link placeholder
- [ ] Store/repo links work — pending Play/App Store URLs (support email only today); SparkClass web URL live

### Deploy & meta

- [ ] `version.properties` v0.6.0 build 1 matches the next shipped site
- [x] Favicon and page `<title>` / description — owner verified on deploy 2026-05-23
- [x] 404 page works (`/404.html` and nested bad URLs — owner verified; `<base>` fix v0.5.1)
- [x] Lighthouse / a11y polish — skip link (owner verified Tab 2026-05-23), SEO meta, focus/touch targets, semantic roadmap lists, perf tweaks; re-run 2026-05-23: home 95/100/100/100, Commander Vault 94/100/100/100, Times Tables 88/100/100/100 (perf/a11y/bp/seo)

---

## Decisions log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-07-24 | SparkClass added to website inventory | Beta web app section; interim name; legal drafts pending owner review |
| 2026-05-23 | Astro + static deploy | Markdown legal copy, multi-app template, GitHub Actions |
| 2026-05-23 | Single `PROJECT_PLAN.md` for tasks + test checklist | Owner-requested agent workflow |
| 2026-05-23 | GitHub repo `pageandportal/pageandportalweb` | Initial repo; superseded by rename |
| 2026-05-23 | Renamed repo → `pageandportal/pageandportal` | Pages URL `/pageandportal/`; `site.properties` updated |
| 2026-05-23 | App inventory (2 apps, coming soon) | `apps.inventory.json` + starter `supply/apps/*` |
| 2026-05-23 | Commander Vault pilot content | Migrated from Google Sites; legal + features in `supply/` |
| 2026-05-30 | Commander Vault V1.0 in closed beta | Site badge `beta`; roadmap lane renamed to `V1.0 closed beta`; not yet public on Google Play |
| 2026-05-25 | Commander Vault uses free-to-start unlock model | 5 editable mono-colour slots are free, non-mono slots stay visible but locked, full 32-slot access is a one-time Google Play unlock |
| 2026-05-23 | Repo public + GitHub Pages live | Free plan requires public repo; Actions deploy |
| 2026-05-27 | Google Analytics 4 enabled on the website | Use measurement ID `G-48L1CF97DY`; tracking loads on deployed pages only and stays off in local development |
| 2026-05-23 | Analytics: none | No website tracking; app privacy unchanged |
| 2026-05-23 | Social links: none | No profiles linked from site |
| 2026-05-23 | Custom domain: deferred | GitHub Pages URL is canonical for now |

---

## Quick reference for owners

- **App ideas (private, not on site):** [`docs/app-ideas.md`](docs/app-ideas.md)

1. Fill **Your tasks** (start with pilot app; GitHub repo is set).
2. Drop files under `supply/` or tell the agent paths in this repo.
3. Say “start Phase 0” (or pick a backlog item) when ready to build.
4. Confirm in chat when an owner task is done so agents can move it to **Done**.
