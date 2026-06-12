# Regina Martinelli — Website UI Kit

A click-through recreation of the marketing website at
[reginamartinelli.com](https://www.reginamartinelli.com). The kit covers the
core surface area used across the home page, the two program pages, and the
"Meet Regina" about page.

## Files

| File | What it is |
|------|------------|
| `index.html` | The runnable prototype. Open it to see the kit in action. |
| `components.jsx` | All React components, exported to `window`. |
| `app.jsx` | Top-level app: route switch + content for each "page". |
| `kit.css` | Kit-only styles layered on top of `../../colors_and_type.css`. |

The kit deliberately copies the live site's visual language. It does **not**
reinvent the design.

## Components (in `components.jsx`)

| Component | Purpose |
|-----------|---------|
| `TopNav` | Sticky header with wordmark, primary nav, primary CTA |
| `MobileMenu` | Slide-down full-width menu for narrow viewports |
| `Hero` | Full-bleed gradient hero with "Welcome…" / "I'm Regina" treatment |
| `IntroBlock` | Photo-placeholder + intro paragraph + gold sacred-geometry mark |
| `PullQuote` | Italic serif pull-quote with attribution |
| `PrincipleCard` | Single principle (Your Worth / Patterns / Money) with bullet list |
| `PrinciplesRow` | 3-up arrangement of `PrincipleCard` |
| `MethodologySteps` | The I / II / III roman-numeral methodology block |
| `ProgramCard` | One of the two flagship programs, with mark + sub + CTA |
| `ProgramsTwoUp` | Two-up arrangement of `ProgramCard` |
| `QuoteBand` | Dark full-bleed quote section ("The world is a mirror…") |
| `SparkleList` | The "On the other side" benefit list with ✨ bullets |
| `SignatureClose` | "With love & certainty," + Regina + sacred-geo mark |
| `OptInForm` | Email capture: name + email → "Thank you" state |
| `Footer` | Wordmark, socials, copyright |
| `SectionWash` | Full-bleed gradient wrapper used between sections |
| `Eyebrow`, `SerifH2`, `BodyP` | Type primitives that wire to the design tokens |

## Interaction

The prototype switches between four "pages" via the nav and inline CTAs:

1. **Home** — long-scroll narrative (default)
2. **Your Magical Self** — program detail
3. **Your Wealthy Self** — program detail
4. **Meet Regina** — story / bio

Plus a working opt-in form on Home that flips to a "Thank you" state.

## Caveats

- No real portrait photography of Regina is bundled — we render a soft
  gradient placeholder where photos belong. Drop a portrait into
  `../../assets/` and point `IntroBlock` and `SignatureClose` at it.
- Squarespace's actual nav has cart icon, login state, and folder
  navigation — we keep just the public surface area.
- Course-platform / member-portal UI is not part of the public site and
  therefore not part of this kit.
