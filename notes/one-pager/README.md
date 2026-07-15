# One-pagers — printed A4

Printed A4 one-pagers for EvalLens outreach. Format — 2 pages A4, brand style
(lens-gradient accents, SF/Helvetica, ink peak "AI prepares — humans decide").

## Files

- `one-pager-en.html` / `one-pager-en.pdf` — English, **VC funds** (ICP:
  ongoing inbound dealflow screening). Mirrors the live `/one-pager` route copy.
- `one-pager-ru.html` / `one-pager-ru.pdf` — Russian, same VC-fund audience,
  plain literary language (no VC jargon — written for a reader outside the
  industry).
- `one-pager-pitch-competitions-en.html` / `.pdf` — English, **pitch
  competitions & accelerators** (ICP: a panel of judges scoring one batch
  against a deadline, with public reputational stakes on a fair call).
  Positioning angle: *fair judging at scale* — one bar across every judge,
  a defensible ranking, no room for a favoritism story to spread through the
  applicant community. Same section skeleton as the VC one-pager (hero →
  problem → workflow → output → trust → use-cases → CTA), content rewritten
  for this ICP — not a copy-paste with find/replace.
- `gradtext.mjs` — shared print-safe glyph-gradient helper (see below).

Both `.html` files are **self-contained**: inline CSS, logo as a data-URI,
`@page { size:A4 }`. Open with no server.

The same English content is also rendered as a site page — route `/one-pager`
(`web/src/app/one-pager/page.tsx`, live). The Russian print one-pager has a
matching site route at `/one-pager/ru` (`robots: noindex`, not published
anywhere yet). Keep copy edits synced between the HTML source and the route
when either changes.

## Regenerating a PDF

No dev server needed — via the Chromium cached by Playwright:

```sh
CHROME="$HOME/Library/Caches/ms-playwright/chromium-*/chrome-mac/Chromium.app/Contents/MacOS/Chromium"
"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="one-pager-en.pdf" \
  --allow-file-access-from-files "file://$PWD/one-pager-en.html"
```

Check: the PDF must be exactly **2 pages**. If content overflows, tighten the
vertical rhythm in `<style>` (`.page` height is hard-locked to `297mm;
overflow:hidden`).

## Print-safe gradient text (`gradtext.mjs`)

**Do not use `background-clip:text` / `color:transparent`** for gradient
accents in a PDF source. Adobe renders it fine, but macOS Preview/Quartz can
show solid color blocks instead of the gradient text.

Instead, `gradtext.mjs` exports `gradSpan(text)`, which interpolates each
character's color across the EvalLens lens palette (violet → lavender → cyan
→ aqua, matching the `--lens` gradient's 0/32/68/100% stops) and wraps each
glyph in its own `<span style="color:#hex">`. No `background-clip`, no
`color:transparent` — safe in every PDF viewer.

Usage in a generator script:

```js
import { gradSpan } from "./gradtext.mjs";
// ... `<h1>Don't let a skim cost you the ${gradSpan("unicorn")}.</h1>`
```

If you build a new one-pager (or regenerate these), reuse this helper rather
than reintroducing `background-clip:text` in the print source.
