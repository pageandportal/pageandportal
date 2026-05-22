# Owner supply folder

Use this folder to give agents copy, images, and legal text without editing site code.

## Quick start

1. **Copy the template app folder** (rename when you copy):
   - From: `supply/apps/_template/`
   - To: `supply/apps/<your-app-slug>/`  
     Example: `supply/apps/page-and-portal-demo/`
2. Fill in `app.md`, add images under `graphics/`, and edit `legal/privacy.md`.
3. For site-wide content, use `supply/site/` (about blurb, donate link, logo).
4. Tell the agent when a folder is ready (e.g. “pilot app pack is in `supply/apps/my-app/`”).

See **Your tasks** in `PROJECT_PLAN.md` for the full checklist.

**GitHub:** [github.com/pageandportal/pageandportal](https://github.com/pageandportal/pageandportal) — push this folder’s contents to that repo (or clone it and copy `supply/` in).

## Folder map

```
supply/
├── README.md                 ← you are here
├── site/                     ← studio-wide (one copy)
│   ├── about.md
│   ├── donate.md
│   └── branding/             ← Page and Portal logo, favicon, avatar
└── apps/
    ├── commander-vault/        ← coming soon
    ├── portal-pages-times-tables/  ← coming soon
    └── _template/            ← duplicate for future apps (do not edit in place)
        ├── app.md
        ├── graphics/
        └── legal/
            ├── privacy.md
            └── terms.md      ← optional; delete if unused
```
