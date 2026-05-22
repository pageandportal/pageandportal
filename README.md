# Page and Portal — Developer Website

Public developer hub for **Page and Portal** apps: features, roadmaps, about, donate links, and legal pages. Built for [GitHub Pages](https://pages.github.com/).

| | |
|---|---|
| **Repository** | [github.com/pageandportal/pageandportal](https://github.com/pageandportal/pageandportal) |
| **Live site (when deployed)** | [pageandportal.github.io/pageandportal/](https://pageandportal.github.io/pageandportal/) |

## Status

**v0.1.0** — Astro site bootstrapped; minimal home + app stubs. Live after GitHub Actions deploy: [pageandportal.github.io/pageandportal/](https://pageandportal.github.io/pageandportal/)

```bash
npm install
npm run dev    # local preview at http://localhost:4321/pageandportal/
npm run build
```

See [`PROJECT_PLAN.md`](PROJECT_PLAN.md) for phases and tasks.

## Owner content

Add copy and assets under [`supply/`](supply/README.md). Copy `supply/apps/_template/` for each app.

## Clone

```bash
git clone https://github.com/pageandportal/pageandportal.git
cd pageandportal
```

SSH:

```bash
git clone git@github.com:pageandportal/pageandportal.git
```

## Config

Deployment URLs and Astro `base` path: [`site.properties`](site.properties).

## Agents

Read `PROJECT_PLAN.md` and `.cursor/rules/agent-workflow.mdc` before substantial work.
