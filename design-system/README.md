# Regina Martinelli — Design System

A design system extracted from the live Squarespace 7.1 site at
[reginamartinelli.com](https://www.reginamartinelli.com) and the
[`flowformstudio/reginamartinelli`](https://github.com/flowformstudio/reginamartinelli)
token repository.

This system lets Claude Design (or any agent) produce on-brand artifacts —
landing pages, sales pages, lead magnets, slide decks, social tiles — for
**Regina Martinelli** and her flagship offer, **Money Beliefs by Design**.

> If you have access to the source repo, you can explore it directly:
> <https://github.com/flowformstudio/reginamartinelli>. The repo holds the
> canonical `tokens.css` / `tokens.json` that this folder is derived from,
> plus the brand mandala. Anything the agent missed can be added by
> dropping additional assets into `assets/` or extending `colors_and_type.css`.

---

## Brand context

**Who:** Regina Martinelli — transformational / money-mindset coach with 25+
years of practice. Founder & CEO of **Money Beliefs by Design**.

**What:** 1:1 work and two flagship 8-week programs — **Your Magical Self**
(transforming overwhelm and people-pleasing) and **Your Wealthy Self**
(transforming money patterns).

**Promise:** *"Stop hiding your light and holding yourself back so Your
Wealthy Self can finally be Alchemized."* The work is positioned as deep
somatic, subconscious-level pattern transformation — not therapy, not
ordinary coaching.

**Vibe:** Warm, feminine, empowering. Spiritual but grounded. Elegant serif
headlines, generous white space, soft purple/pink palette with gold
sacred-geometry ornament. Reassuring and certain, never pushy.

**Adjacent surfaces:**
- Instagram: [@yourwealthyself](https://www.instagram.com/yourwealthyself/)
- YouTube: [@reginamartinelli7666](https://www.youtube.com/@reginamartinelli7666)
- Facebook: [reginamartinelli415](https://www.facebook.com/reginamartinelli415)
- LinkedIn: [regina-martinelli](https://www.linkedin.com/in/regina-martinelli-785a765/)
- TV: *Your Wealthy Self* on 360tv

The single product surface in this system is **the marketing website**. There
is no app, no SaaS dashboard — opt-in pages, sales pages, and content pages
are the whole game.

---

## Content fundamentals

The copy is the soul of the brand. Match it precisely — voice deviations are
more jarring here than visual ones.

### Voice
- **Second-person, direct.** "*You*'re drowning in overwhelm." "I help **you**
  transform the deep patterns…". Never "users", "clients", "people".
- **First-person memoir on long pages.** Regina narrates her own story to
  earn credibility — *"Twenty-five years ago, someone asked me…"*. The
  story is always anchored to a specific moment, never abstract.
- **Warm but certain.** Reassures the reader they're not broken, then states
  the work with conviction: *"I'm 100% certain your patterns can be
  transformed too."* No hedging. No "might".
- **Spiritual + clinical.** Pairs words like *quantum field*, *creational
  authority*, *sacred*, *alchemized* with practical anchors like *nervous
  system*, *neuroscience*, *somatic*, *25 years*, *Master's in Change
  Management*. Always both. Never one without the other.
- **Knows the reader's pain by name.** "Right when success showed up, I'd
  sabotage it. Right when love got close, I'd push it away." Always
  specific scenarios, never generic "stress".

### Casing & punctuation
- **Title Case** for headlines and section labels, with a serif treatment.
  *Your Magical Self. The Truth Nobody Says. What Changed.*
- **Sentence case** inside long-form body copy.
- **No oxford comma enforcement** — site is inconsistent; either is fine.
- **Em dashes** are used heavily for asides — like this — never spaced
  hyphens.
- **Ellipses** ("…") appear in headline transitions: *"Welcome…", "My Life
  Today…", "Here's what I discovered…"*. Use a real ellipsis character.
- **Bold inline** for emphasis on the operative phrase — usually inside a
  longer sentence. *"**Money is a spiritual highlighter.**"* The bold IS the
  hook.
- **Italics** for inner-voice asides and self-quotation — *I'd sabotage it*,
  *Transform them*. Often only one or two words.
- **Quoted questions as a section title** — *"How good can you stand it?"* —
  used to crack the page open.

### Rhythm
- **Short, hard sentences after long flowing ones.** "**I get it. Because I
  lived it.**" "I didn't fight or shame her. I updated her software."
- **Three-beat lists** are everywhere — three sabotage patterns, three
  process steps (I / II / III in roman), three "truths" of the work.
- **Numbered roman lists** for the methodology: "I. First we find the
  original wound. II. Then we transform it at the root. III. Finally, we
  integrate."

### Tone-checks (do NOT do)
- ❌ No bro-marketing urgency ("Don't miss out!", countdown timers, scarcity).
- ❌ No corporate hedging ("might help", "could potentially", "we believe").
- ❌ No clinical detachment ("clients report a 40% reduction in…").
- ❌ No emojis in body copy. Sparkle ✨ is the *only* tolerated glyph and only
  in short feature lists (see Iconography). Even then, use sparingly.
- ❌ No buzzword-stacking without a grounded counterweight ("quantum
  manifestation activation" with nothing practical attached).

### Specific reusable copy patterns
- **The qualifying question:** *"Let me guess… You're [pain], [pain] and
  [pain] trying to prove you deserve… X; Y; To simply Z."*
- **The reframe:** *"This isn't [conventional thing]. It's not [other
  conventional thing]. It's [Regina's framing]."*
- **The certainty close:** *"Because you are. You always have been."* /
  *"With love & certainty, Regina."*
- **The sparkle list:** four to six lines, each beginning with ✨, describing
  the after-state ("Money becomes your ally instead of your stress.").

---

## Visual foundations

### Palette
The brand is built on **purple → pink with gold ornament**, never on its own
purple or its own pink. Pair a deep purple anchor with a soft pink or
gradient wash, and dot gold sacred-geometry on top.

| Role          | Hex      | Notes                                          |
|---------------|----------|------------------------------------------------|
| Primary       | `#642875`| Deep purple. Body text on light, dark sections |
| Accent        | `#A86DDF`| Violet. Buttons, links, focused accents        |
| Light Accent  | `#F5A6E4`| Soft pink. Backgrounds, supportive sections    |
| Dark Accent   | `#290033`| Near-black purple. Deepest sections, footers   |
| Gold          | `#C6A24B`| Sacred-geometry, dividers, sparkle highlights  |
| Cream         | `#FAF5F0`| Warm off-white that pairs with gradients       |
| White         | `#FFFFFF`| Backgrounds                                    |

**Gradient washes** (always vertical, watercolor-soft) move through four
stops: peach `#FDE9DC` → pink `#F7C9DC` → lavender `#C8B6F0` → aqua
`#BFE3E3`. These are the *signature backgrounds* of the site — full-bleed,
no hard edges. See `assets/gradient-*.png`.

### Typography
- **Serif headline:** `orpheus-pro` (Adobe Fonts / Typekit) — high-contrast,
  classical, narrow apertures, slightly old-style. Weight 400 only. Tight
  line-height (1.4) so display sizes still feel held together.
- **Sans body:** `Inter Tight` (Google Fonts). Weights 400 / 500 / 700.
  *Generous* line-height of **1.84** — this is what creates the airy,
  spacious feel. Never collapse it under ~1.6.
- **No mono.** No condensed sans. No script font (italics handle the
  signature voice).

**Scale uses big-jump display sizes** — H1 ~104px, H2 ~67px on desktop.
Don't be timid. Headlines are meant to fill the screen.

> ⚠️ **Font substitution flag:** `orpheus-pro` is licensed via Adobe Fonts
> (Typekit). The family handle alone is not enough to load the font — we
> need either the **Typekit kit `<link>` tag** (from Adobe Fonts → Web
> Projects → kit → Embed code) or a separately licensed `.woff2`. Until
> then the fallback chain resolves to **Cormorant Garamond** (loaded via
> Google Fonts in `colors_and_type.css`), then Georgia. Once you paste the
> kit `<link>` into any page's `<head>`, every `var(--font-serif)` rule
> picks up real Orpheus Pro automatically.

### Spacing & layout
- **Section padding-y:** `6rem` top and bottom. Long pages breathe.
- **Content max-width:** `1200px` (text columns often narrower, ~720px).
- **Spacing scale:** `0.5 / 1 / 2 / 4 / 8 / 12 rem`. Use the bigger end.
- **Vertical rhythm dominates** — pages are tall scroll-narratives with one
  thought per screen, separated by gradient washes.

### Backgrounds
The brand uses **layered, full-bleed image backgrounds** — almost no flat
color sections.
1. **Soft gradient washes** (peach/pink/lavender/aqua) for most sections.
2. **Cream cosmic / starfield** textures for "magical" moments
   (`assets/bg-cream-*.png`).
3. **Dark purple** (`#290033`) for hero / footer moments where the white
   wordmark appears.
4. Sacred-geometry mandalas in gold sit *on top* of those backgrounds,
   centered, ~30–50% width, with low opacity (60–80%).

Avoid: flat grey backgrounds, hard-edged solid color blocks, bluish
gradients, dark-mode panels, brutalist or editorial grids.

### Borders, radii, shadows
- **Corner radii:** buttons are **full pills** (`999px`) — a deliberate
  break from the original Squarespace template token. Cards `12px`. Soft
  chips `20px+`.
- **Borders:** rare. Where used, a faint purple hairline
  `rgba(100, 40, 117, 0.12)` or a `1.5px` solid `#642875` on secondary
  buttons. **Never** colored left-border accent strips.
- **Shadows:** low, soft, purple-tinted (`rgba(41,0,51,0.08–0.14)`). The
  brand never uses sharp / large drop shadows or neumorphism.
- **Inner shadows / glass:** not used.

### Iconography
The brand has **no icon system** in the conventional sense. Instead:

- **Gold sacred-geometry PNGs** are the "icons" — mandala, eight-pointed
  star, sun-burst, dotted compass. They are illustrations, not glyphs.
  See `assets/sacred-geo-*.png` and `assets/gold-*.png`. Use them as
  decorative section markers, not as inline-with-text icons.
- **Sparkle ✨** as a list bullet is the *only* emoji in the body copy. Use
  inside the "On the other side / sparkle list" pattern only.
- **No icon font, no Lucide/Heroicons/Feather**. If a utility icon is
  genuinely needed (e.g. a hamburger menu, a chevron, an X close), draw it
  as a thin 1.5px purple stroke SVG — never filled, never colored.
- **Unicode arrows** `→` and `↓` appear in CTAs ("Discover Your Magical
  Self →"). Use the real character, not a chevron icon.

> If you need a utility icon set for any reason (e.g. social proof tiles
> with checkmarks), substitute **Lucide** at 1.5px stroke in `#642875` and
> flag the substitution to the user.

### Imagery
- **Photography** of Regina: warm, soft daylight, often head-and-shoulders or
  on-camera. Skin tones true, never desaturated. Hair/wardrobe in earth +
  jewel tones (burgundy, gold, cream).
- **Brand visuals:** gradient washes + gold sacred-geometry layered as
  collage. No stock illustration. No 3D renders. No abstract corporate art.
- **No grain / film overlay** required, though gradients sometimes have a
  slight watercolor texture baked in.

### Motion
The live site is essentially static — Squarespace's default behavior.
Mimic that restraint in any new artifact:

- **Fades only.** No bounce, no spring overshoot, no parallax.
- **Long durations** for hero fades (`600–900ms`) and short for hovers
  (`160–240ms`). Easing is `cubic-bezier(0.22, 1, 0.36, 1)` (slow out).
- **Hover states:** primary buttons fade to ~90% opacity and lift `-1px`.
  Links drop to ~75% opacity. Cards may lift ~`-2px` with shadow softening.
- **Press states:** simply lose the lift (`translateY(0)`); no shrink, no
  color change.

### Transparency & blur
- Used sparingly. Mandala motifs may sit at 60–80% opacity over gradients.
- **No glassmorphism / backdrop-blur** panels.

### Layout rules
- Hero blocks are **centered, narrow** (~720px column, generous side
  margins) with one large headline + one sub-line.
- **Two-up program cards** (Your Magical Self / Your Wealthy Self) are the
  only common two-column block. Otherwise the site is a single column.
- **Sticky / fixed elements:** the live site uses a standard Squarespace
  fixed nav. Keep nav simple, no announcement bar, no sticky CTA.

### Tokens at a glance
All of the above is encoded in [`colors_and_type.css`](./colors_and_type.css)
as CSS custom properties and base element styles. Import that one file and
you have the foundations.

---

## Iconography (deep dive)

See "Iconography" under Visual foundations above. Summary:

- **No icon font is in use** on the live site.
- **No SVG icon set** is shipped — the closest the brand has to "icons" are
  the gold sacred-geometry PNGs in `assets/`.
- **Emoji:** only sparkle ✨, only in "what you'll get" sparkle lists.
- **Unicode arrows:** `→`, `↓` for CTAs.
- **Substitution policy:** if a utility icon set is required, use Lucide
  CDN at 1.5px stroke in `var(--rm-primary)`, and flag.

---

## Folder index

| Path | What's there |
|------|---------------|
| `README.md` | This file — context, voice, visual foundations, manifest |
| `SKILL.md` | Cross-compatible skill manifest (for Claude / Claude Code) |
| `colors_and_type.css` | CSS custom properties + base element styles |
| `assets/` | Logos, mandalas, sacred-geometry PNGs, gradient backgrounds |
| `preview/` | Small HTML cards that populate the Design System tab |
| `ui_kits/website/` | Marketing-site UI kit: `index.html` + JSX components |

### Assets index

| File | Use |
|------|-----|
| `assets/logo-wordmark.png` | "Regina Martinelli" full wordmark, white. Use on dark / gradient backgrounds. |
| `assets/logo-footer.png` | Footer-sized wordmark, dark on light. |
| `assets/logo-mark-gold.png` | Compact gold monogram. |
| `assets/logo-mark-large.png` | Large gold sacred-geometry mark, transparent. |
| `assets/mandala-gold.png` | Primary mandala motif. |
| `assets/sacred-geo-{15,22,23,45,62}.png` | Sacred-geometry variations — section dividers, decorative anchors. |
| `assets/gold-sparkle-sun.png` | Gold burst — pairs with "what's possible" moments. |
| `assets/gold-frame.png` | Ornament corner-piece. |
| `assets/gold-highlighter.png` | Gold glitter highlighter wash. |
| `assets/gradient-peach.png` | Peach → pink → lavender → aqua, vertical. |
| `assets/gradient-purple-pink.png` | Lavender → pink → peach, vertical. |
| `assets/gradient-sunrise.png` | Warm sunrise gradient. |
| `assets/gradient-tall-portrait.png` | Tall hero gradient (2160×3840). |
| `assets/bg-cream-1.png` | Cosmic / starfield cream + pink. |
| `assets/bg-cream-2.png` | Cosmic / starfield cream + lavender. |

### UI kits

- [`ui_kits/website/`](./ui_kits/website/) — marketing site components +
  click-through prototype: nav, hero, intro, story block, methodology block,
  program cards, quote band, sparkle list, signature close, footer.

---

## Sources

- Live site: <https://www.reginamartinelli.com>
- Token repo: <https://github.com/flowformstudio/reginamartinelli>
  (`tokens.css`, `tokens.json`, `styles.css`, `components.html`)
- Brand mandala asset (`mandala-gold.png`) pulled from that repo
- All other imagery pulled from the live Squarespace CDN
  (`images.squarespace-cdn.com/.../64d317fbd04bce6f97c9df08/…`)

If you're using this design system inside Claude Design and want to update
or refine it, the simplest workflow is to edit the source repo, then re-link
it — every artifact downstream picks up the change.

---

## Open items & caveats

- **Orpheus Pro is not bundled** (Adobe Fonts license). Cormorant Garamond
  is substituted. Send the Typekit kit ID or font files for a tighter match.
- **No live photography of Regina is bundled** — the live site loads
  portraits from the Squarespace CDN. If you'd like portraits available to
  Claude offline, drop them into `assets/` and reference them from the kit.
- **No real product UI (app, dashboard) exists** — only the marketing site
  is reproduced. If a course-platform UI or member portal is added later,
  spin up `ui_kits/portal/` and replicate it from source.
