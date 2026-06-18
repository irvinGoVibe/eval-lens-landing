# design-sync notes — EvalLense Design System

## What this sync is
This repo is a Next.js landing app (`web/`), NOT a publishable component package, and has no Storybook or component `dist/`. The standard converter path can't consume it directly, so the sync source is a **synthetic, committed source package at `ds-src/`** assembled by hand from the live design system:
- **Button, Chip, Eyebrow, Tile** — lifted from the baoyu bundle `.claude/designs/evallense/components/*` (`window.React` rewritten to `import React`).
- **Heading, MediaPlaceholder** — authored fresh, inline-styled with tokens (extracted from `_kit.tsx` `LabTitle` / `MediaPlaceholder`).
- Tokens (`ds-src/tokens/*.css`) + component CSS (`ds-src/styles/components.css`) mirror `web/src/app/globals.css` `:root`. Reconciled vs live canon: added `--lens-deep` and `--ink-grad` (missing from the baoyu copy).

`ds-src/` is committed — it IS the source a re-sync rebuilds from. Do not gitignore it.

## Build setup (fresh clone)
- Stage scripts: `cp -r <skill>/package-build.mjs … lib storybook .ds-sync/` then `cd .ds-sync && npm i esbuild ts-morph @types/react react@18 react-dom@18`.
- **React 18, not 19**: `vendorReact` needs UMD builds, which React 19 dropped. The 6 atoms only use `createElement`/`Fragment`, so the vendored version is render-safe.
- **Recreate the package symlink** so the DS resolves as `evallense-ds`: `ln -sfn ../../ds-src .ds-sync/node_modules/evallense-ds`. This is what makes `tokensPkg: "evallense-ds"` + `cssEntry`/`tokensGlob` resolve.
- Build: `node .ds-sync/package-build.mjs --config .design-sync/config.json --node-modules .ds-sync/node_modules --entry .ds-sync/node_modules/evallense-ds/index.jsx --out ./ds-bundle`

## Fonts
Platform Apple stack only — the DS ships NO webfonts by design (see `tokens/typography.css`). `cfg.runtimeFontPrefixes: ["SF Pro", "JetBrains Mono"]` suppresses `[FONT_MISSING]`; non-Apple devices fall back to the generic stack. This is intended, not a defect.

## Known render warns
- `[RENDER_SKIPPED]` — render check intentionally skipped (no playwright installed; user reviews `.review.html` in their own browser). Re-sync will show this again unless playwright is installed.

## Re-sync risks (watch-list)
- **Source is synthetic.** If the live DS changes (globals.css tokens, Button CSS, new primitives), `ds-src/` does NOT auto-update — re-reconcile by hand. The baoyu bundle it derived from can itself drift from globals.css.
- **Scope is deliberately narrow.** Only 6 standalone-renderable atoms are synced. `Lab*` sections (LabBento, LabPinnedSteps, etc.) are Server Components coupled to globals.css + ScrollOrchestrator + three.js — they can't render as isolated bundle components and are intentionally excluded. Adding them means extracting each into a standalone-renderable component first.
- **Dark-theme tokens not shipped.** `--nebula-*` and `--fg-secondary-dark` (Ink Refined / Nebula Deep themes) are out of scope for this primitive bundle.
- Render previews were verified by human eyeball (`.review.html`), not machine render-check.
