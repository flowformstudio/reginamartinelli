---
name: reginamartinelli-design
description: Use this skill to generate well-branded interfaces and assets for Regina Martinelli — transformational coach and founder of Money Beliefs by Design — including marketing pages, sales pages, lead magnets, social tiles, slide decks, and email content. Contains essential design guidelines, color tokens, typography, brand assets (logos, gold sacred-geometry, gradient washes), copy voice rules, and a click-through website UI kit. Suitable for both production code and throwaway prototypes / mocks.
user-invocable: true
---

# Regina Martinelli — Design Skill

Read [`README.md`](./README.md) for the full system: brand context, voice
fundamentals, visual foundations, asset inventory, and folder index.

## Quick orientation

- **Foundations:** [`colors_and_type.css`](./colors_and_type.css) — drop this
  one file into any HTML artifact and every color / type token is wired up.
- **Visual assets:** [`assets/`](./assets/) — logos, gold sacred-geometry
  PNGs, gradient backgrounds, cosmic-cream textures. Copy these in; never
  redraw them.
- **UI kit:** [`ui_kits/website/`](./ui_kits/website/) — click-through React
  prototype of the marketing site with `TopNav`, `Hero`, `IntroBlock`,
  `PullQuote`, `PrinciplesRow`, `MethodologySteps`, `ProgramsTwoUp`,
  `QuoteBand`, `SparkleList`, `OptInForm`, `SignatureClose`, `Footer`.
  Lift components from `components.jsx`.
- **Preview cards:** [`preview/`](./preview/) — small specimens that mirror
  what shows up in the Design System tab. Useful as reference patterns.

## When using this skill

If creating a **visual artifact** (slide, landing page, mock, throwaway
prototype):

1. Read `README.md` first — voice rules are stricter than visual rules.
2. Copy needed assets out of `assets/` into your output project.
3. Reference `colors_and_type.css` (or inline the tokens you need).
4. Compose using the patterns shown in `preview/` and `ui_kits/website/`.
5. Always pair a deep purple anchor with soft pink and a touch of gold —
   never any one of those alone.
6. Use serif for headlines, sans for body, generous line-height (1.84) for
   body, and big-jump display sizes for hero copy.

If working on **production code**, mirror the structure in
`ui_kits/website/components.jsx` — small, well-factored React components
that read from CSS custom properties.

## When the user invokes this skill without further guidance

Ask them what they want to build — a landing page, a sales section, a lead
magnet, a slide for the Your Wealthy Self TV show, a social tile. Then ask
a handful of targeted questions:

- What's the offer or moment in the funnel?
- Who is "you" in this piece — what's their pain point in one sentence?
- Tone-check: more "warm reassurance" or more "loving certainty"?
- Length / surface — full page, single section, post, slide, email?
- Imagery — gradient wash, cosmic cream, dark purple, or photo-led?

Then act as an expert designer in this brand. Output HTML artifacts (with
`colors_and_type.css` linked, assets copied) or production code, depending
on the need.

## Voice cheatsheet (do not skip)

- Second person ("you"), warm but certain.
- Spiritual + clinical paired in the same sentence ("nervous system" +
  "quantum field"; "25 years" + "sacred").
- Bold the operative phrase; italicize inner-voice asides.
- Em dashes — heavily — and real ellipses (…).
- No emoji except ✨ in "on the other side" sparkle lists.
- Three-beat lists. Roman numerals (I / II / III) for methodology.
- Close on certainty: *"Because you are. You always have been."* /
  *"With love & certainty, Regina."*

## Sources

- Live site: <https://www.reginamartinelli.com>
- Tokens repo: <https://github.com/flowformstudio/reginamartinelli>
