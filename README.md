# Regina Martinelli — Website

A plain, multi-page static website (HTML + CSS + a touch of vanilla JS) built
on top of the **Regina Martinelli design system**. No build step, no
dependencies — open the files, or serve the folder, and deploy to Vercel as-is.

A faithful 1:1 rebuild of the live Squarespace site at
[reginamartinelli.com](https://www.reginamartinelli.com), reconstructed as a
clean codebase we can build upon.

## Structure

```
Regina/
├── index.html                     ← Home (long-form scroll narrative)
├── your-magical-self.html         ← Program: Your Magical Self (sales page)
├── your-wealthy-self-course.html  ← Program: Your Wealthy Self Course
├── css/
│   └── site.css                   ← Site layer (layout, nav, components)
├── js/
│   └── site.js                    ← Mobile menu, opt-in forms, scroll reveal
├── partials/
│   ├── header.html                ← Canonical nav (source of truth)
│   └── footer.html                ← Canonical footer (source of truth)
└── design-system/                 ← The brand foundation (unchanged)
    ├── colors_and_type.css        ← Tokens + base element styles
    ├── assets/                    ← Logos, gradients, gold sacred-geometry
    └── …                          ← README, SKILL, preview, ui_kits
```

## How it works

- Every page links **two** stylesheets: `design-system/colors_and_type.css`
  (the brand tokens + base type) and `css/site.css` (the site layer). Component
  class names mirror the design system's UI kit (`rm-*`) so the two stay in sync.
- All imagery is referenced directly from `design-system/assets/` — edit a token
  or swap an asset and every page updates.
- `js/site.js` is progressive enhancement only. With JS off, the whole site is
  still fully readable (content is never hidden without JS).

## Adding a page

1. Copy an existing page as a starting point.
2. Keep the `<header>` / mobile-menu / `<footer>` blocks **identical** to
   `partials/header.html` and `partials/footer.html` (single source of truth).
   Set `aria-current="page"` on the matching nav link.
3. Compose the body from the `rm-*` section components already in `css/site.css`
   (`rm-section` + a `wash-*`, `rm-prose`, `rm-list`, `rm-program`,
   `rm-testimonial`, `rm-pullquote`, `rm-method`, `rm-sparkle`, etc.).

## Scope / status

- **Built:** Home + both **Programs** pages (Your Magical Self, Your Wealthy
  Self Course).
- **Stubbed (not built yet):** the **About** pages — Meet Regina, Let's Talk
  Money, TV Show. The nav and footer still link to them
  (`/meet-regina.html`, `/lets-talk-money.html`, `/yws-tv-show.html`) as
  placeholders for a later phase, so those links 404 until the pages are added.

## Fonts

Headlines use **Orpheus Pro** (Adobe Fonts / Typekit). It isn't bundled, so the
fallback is **Cormorant Garamond** (loaded in `colors_and_type.css`). To render
real Orpheus Pro, paste your Typekit kit `<link>` into each page's `<head>`
(there's a comment marker in `index.html`).

## Run locally

```bash
python3 -m http.server 8799   # then open http://localhost:8799/
```

## Deploy

The folder is already Vercel-linked (`.vercel/`). Deploy with `vercel --prod`.
