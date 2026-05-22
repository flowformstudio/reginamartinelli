# Regina Martinelli — Design System

Design system extracted from the live Squarespace 7.1 website
[reginamartinelli.com](https://www.reginamartinelli.com). Built to be imported
into **Claude Design** (link this folder, or its GitHub repo, on the
"Set up your design system" screen).

## What's in here

| File | Purpose |
|------|---------|
| `tokens.css` | All design tokens as CSS custom properties (colors, type, spacing, radii, buttons). |
| `tokens.json` | The same tokens as structured JSON, for tools that prefer data over CSS. |
| `styles.css` | Base styles + component classes (headings, buttons, cards, sections) built from the tokens. |
| `components.html` | Visual reference page — renders every token and component. Open in a browser. |
| `assets/mandala-gold.png` | Gold sacred-geometry mandala motif used as a brand ornament on the site. |

## Brand at a glance

Regina Martinelli is a transformational / money-mindset coach and founder of
**Money Beliefs by Design**. The brand is feminine, warm, and spiritual but
grounded — elegant serif headlines over airy sans-serif body copy, on a
purple-to-pink palette with occasional gold ornamentation.

## Colors

| Token | Hex | Use |
|-------|-----|-----|
| Primary | `#642875` | Deep purple — primary text & dark UI |
| Accent | `#A86DDF` | Violet — buttons, links, highlights |
| Light Accent | `#F5A6E4` | Soft pink — backgrounds, gentle accents |
| Dark Accent | `#290033` | Near-black purple — deep-contrast sections |
| White | `#FFFFFF` | Backgrounds |
| Gold | `#C6A24B` | Logo / sacred-geometry motif accent |

## Typography

- **Headings:** `orpheus-pro` — an elegant serif from **Adobe Fonts (Typekit)**.
  Weight 400, line-height 1.4.
- **Body:** `Inter Tight` — sans-serif from **Google Fonts**. Weights 400 / 500 / 700,
  line-height 1.84.
- **Scale:** H1 6.5rem · H2 4.2rem · H3 2.9rem · H4 2rem (responsive `clamp()`
  equivalents are provided in the tokens for real landing pages).

### Font licensing note

`orpheus-pro` is served through Adobe Fonts and is licensed to the Squarespace
site. It is **already loaded site-wide** on reginamartinelli.com, so pages
placed back on that site inherit it automatically. When previewing this system
anywhere else, a serif fallback (Georgia) is used.

## Buttons

- **Primary** — filled violet (`#A86DDF`), white text, Inter Tight 500, 1.23rem,
  padding 1.5rem × 2.2rem, border-radius ~6.8px.
- **Secondary** — outlined in primary purple, transparent fill, Inter Tight 500, 1.47rem.

## Brand voice (for the "Any other notes?" field in Claude Design)

> Warm, feminine, and empowering. Speaks directly to the reader in second person
> ("you"). Spiritual but grounded — blends emotional/transformational language
> with practical credibility (25+ years coaching). Elegant serif headlines,
> generous white space, soft purple/pink palette with gold sacred-geometry
> ornament. Tone is reassuring and certain, never pushy.

## Source

All tokens were read directly from the site's published CSS
(`site.css`) and page markup on the Squarespace 7.1 platform.
