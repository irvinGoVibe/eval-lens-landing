# EvalLense Design System

The brand and UI system for **EvalLense** — structured, evidence-based pitch-deck
evaluation where **AI prepares the analysis and a human makes the final call**.
This bundle gives design agents the tokens, type roles, components, and screen
recreations to produce on-brand mockups and prototypes that match the live site.

**Visual signature:** Apple structural grammar (neutral foundation, dramatic
whitespace, statement typography, long cinematic scroll) + an EvalLense "lens"
gradient accent (violet → lavender → cyan → aqua), with a warm orange glow used
only as a bridge surface.

## Sources of truth

Extracted from the live product repository (read the code, not screenshots):
- **Tokens / classes:** `web/src/app/globals.css` (`:root` + type roles + component classes).
- **Components:** `web/src/components/ui/Button.tsx`, `web/src/components/sections/*`.
- **Visual reference:** the live homepage (`/`) and Newsroom (`/blog`) on the dev server.
- Narrative/voice canon lives in the product repo `ai-jury-prod` and the landing `wiki/`.

## CONTENT FUNDAMENTALS

- **Product name is always "EvalLense"** in outward copy. ("AI Jury" is the
  internal origin story — only ever on /company/about.)
- **Core promise, in every claim about evaluation:** *AI scores and prepares the
  evidence — people decide.* Human-in-the-loop; "the final call is always yours."
  **Never** write "AI judges / decides / delivers a verdict."
- **Voice:** Apple-minimalism. Statement-first headlines, concise data-forward
  subtext, no hyperbole, no AI-slop ("leverage / seamless / unlock / supercharge").
- **Headlines** are short statements; one accent phrase carries the lens gradient
  (e.g. "Lens Your **Next Unicorn**", "Trusted, Explainable, **Human-Controlled**").
- **CTAs** are exactly two: primary **"Book a demo"**, secondary **"Try live demo"**.
  Don't invent new CTA labels.
- **Numbers travel with a source** — never a bare stat for decoration.
- Casing: sentence/Title case headlines; eyebrows are UPPERCASE mono.

## VISUAL FOUNDATIONS

- **Foundation:** Apple-neutral. Light surfaces are `--bg` #fff / `--bg-soft`
  #f5f5f7 with `--fg` #1d1d1f; dark "ink" surfaces are `--ink`/#000 / `--panel`
  with on-dark text tokens.
- **Surfaces:** every section is either **light** or **ink**. Alternation is NOT
  mandatory — a page may run several light or several ink sections in a row; the
  craft is in seamless joins between same-surface blocks. At least one cinematic
  ink statement per long page.
- **Type:** SF Pro Display for headlines (weight 600, tracking ≈ -.02 to -.03em,
  `text-wrap:balance`), SF Pro Text for body, SF Mono for eyebrows/tags. Fluid
  `clamp()` sizing. No webfonts — platform stack only.
- **Color use:** neutral base + the **lens** gradient as the single accent, on one
  word/element per block. Semantic green (ready) / amber (attention) carry meaning,
  never decoration. The warm **fire** orange is reserved for the bridge surface.
- **Radii:** 8/12/18/24px scale + 980px pills; cards on the landing use 22px
  (`--radius-card`), stages 28px.
- **Elevation:** soft and **violet-tinted** (`--sh-1..3`) — never a grey drop shadow.
- **Motion:** subtle, scroll-driven (reveal / scrub / pinned multi-screen), one
  Apple easing `--ease` (cubic-bezier(.22,.61,.36,1)). No bounces or decorative loops.
- **Imagery:** dark, cinematic, lens-lit product scenes (glowing panels, floating
  pitch-deck cards, vault); blur/backdrop-filter on glass surfaces.
- **Glass:** a shared "liquid glass" material (Hero/header/footer/CTA buttons) —
  translucent with backdrop blur, not a flat fill.

## Index

- **`styles.css`** — global entry (links the four token files).
- **`tokens/`** — `colors.css`, `typography.css`, `radii-elevation.css`, `gradients-surfaces.css`.
- **`guidelines/`** — foundation specimen cards (colors, type, radii, elevation, surfaces, gradients).
- **`components/`** — `Button`, `Chip`, `Eyebrow`, `Tile` (reusable primitives).
- **`ui_kits/`** — `homepage/` and `newsroom/` cosmetic screen recreations.
- Generated (do not hand-edit): `_ds_bundle.js`, `_ds_manifest.json`,
  `_adherence.oxlintrc.json`, `preview.html`.
