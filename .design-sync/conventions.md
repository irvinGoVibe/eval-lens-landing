# EvalLense — how to build with this design system

EvalLense is an AI-jury product for investment decks: **AI prepares the analysis, a human decides.** The visual language is calm Apple-grade neutrals + a single signature "lens" gradient (violet → lavender → cyan → aqua) used as one accent per block. Elevation is always soft and violet-tinted, never a grey drop shadow.

## Setup — no provider needed

Components are self-contained: they style themselves with inline styles that read CSS custom properties. **There is no theme provider or context to wrap.** The only requirement is that `styles.css` is loaded (it `@import`s the token files and `_ds_bundle.css`) — every `var(--*)` below resolves from it. Components render correctly mounted directly.

There is **no utility-class framework** (no Tailwind). You style your own layout glue two ways:
1. **CSS custom properties** — `var(--token)` in inline styles or your CSS.
2. **Role + surface helper classes** shipped in the token CSS (below) for hand-built text and panels.

## Light vs dark surfaces

The system is surface-aware. On dark ("ink") surfaces, pass the component's own dark switch — `onDark` (Eyebrow, Chip, Heading, MediaPlaceholder) or `surface="ink"` (Tile) — and put it on a dark background. Use the dark surface tokens for that background:

- Dark backgrounds: `--ink` (#000), `--panel` (#0a0a0d), `--panel-2` (#121218), or `--ink-grad`.
- On-dark text: `--fg-on-dark`, `--body-on-dark`, `--muted-on-dark`. Eyebrows/accents shift to `--lavender`.
- Light backgrounds: `--bg`, `--bg-soft`. Text: `--fg`, `--muted`.

## The styling vocabulary (real names)

**Color** — `--violet` `--violet-2` `--lavender` `--cyan` `--aqua` (lens accents); `--bg` `--bg-soft` `--fg` `--muted` `--border` `--border-2` (light neutrals); `--ink` `--panel` `--panel-2` `--fg-on-dark` `--body-on-dark` `--muted-on-dark` `--border-on-dark` (dark); `--green` `--amber` (semantic — ready / attention, one job each); `--orange-hot` `--orange-core` `--orange-soft` (warm bridge surface only).

**Gradients** — `--lens` (the signature; paint it on ONE accent phrase per block, never a paragraph), `--lens-soft` (low-glare wash), `--lens-deep` (dark surfaces), `--fire` (orange bridge only), `--grad-cta` (filled purple→blue CTA), `--ink-grad`.

**Type** — fonts `--font-display` (headlines), `--font-ui` / `--font-text` (body), `--font-mono` (eyebrows, tags). Platform Apple stack — no webfonts ship; non-Apple devices fall back to the stack's generics. Role classes for hand-built text: `.t-heading` `.t-title` `.t-body` `.t-body-strong` `.t-eyebrow` `.t-tag` `.t-sub`. Lens-text helper: `.lens-text` (and `.fire-text`).

**Radius / elevation** — `--r-xs` `--r-sm` `--r-md` `--r-lg` `--r-pill` (pills/chips), `--radius-card` (22px) `--radius-stage` (28px); shadows `--sh-1` `--sh-2` `--sh-3` `--shadow-soft` (all violet-tinted). Easing `--ease`. Layout: `--maxw` (1180px), `--gutter`.

**Surface helpers** — `.surface-light` `.surface-soft` `.surface-ink` `.surface-panel`.

## The components

`Button` (variants `primary` / `ghost` / `glass` / `dark` / `gradient`, sizes `md` / `sm`, `arrow`, `href`) · `Chip` (`checked`, `onDark`) · `Eyebrow` (`dot`, `onDark`) · `Heading` (`accent`, `level`, `size`, `onDark`, `align`) · `Tile` (`eyebrow` / `title` / `titleAccent` / `body` / `surface` / children) · `MediaPlaceholder` (`ratio`, `label`, `hint`, `onDark`). The `glass` Button is the shared "liquid glass" material — use it only on dark/cinematic surfaces.

## Where the truth lives

Read `tokens/colors.css`, `tokens/typography.css`, `tokens/radii-elevation.css`, `tokens/gradients-surfaces.css`, and `styles/components.css` before styling, and each component's `.d.ts` (API) + `.prompt.md` (usage).

## One idiomatic block

```jsx
<section style={{ background: "var(--bg-soft)", padding: "64px var(--gutter)", maxWidth: "var(--maxw)" }}>
  <Eyebrow>How it works</Eyebrow>
  <Heading accent="decides." style={{ marginTop: 12 }}>
    AI prepares the analysis — a human
  </Heading>
  <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
    <Chip checked>Seed</Chip>
    <Chip>Series A</Chip>
  </div>
  <Button variant="primary" arrow style={{ marginTop: 24 }}>Start a review</Button>
</section>
```
