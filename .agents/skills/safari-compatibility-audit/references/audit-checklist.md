# Audit checklist and finding schema

## Layout and viewport

- Check `documentElement.scrollWidth <= window.innerWidth` and list visible elements whose bounds exceed the viewport.
- Inspect `100vh`, `h-screen`, and `min-h-screen`; decide whether `svh`, `dvh`, or `lvh` matches the intended behavior.
- Verify viewport metadata and `viewport-fit=cover`; inspect safe-area padding at fixed headers, footers, sheets, and CTAs.
- Inspect fixed or sticky elements, including fixed descendants of `transform`, `filter`, `backdrop-filter`, or `perspective` stacking contexts.
- Review `overflow: hidden`, `auto`, and `clip`; identify the originating element before proposing containment.
- Find flex children lacking `min-width: 0`, grid tracks using bare `1fr` where `minmax(0, 1fr)` is required, and fixed pixel widths that exceed mobile viewports.
- Exercise tables, tabs, chips, long labels, word wrapping, images, SVG, masks, gradients, and backdrop blur.
- Record layout shift after fonts, images, videos, and client hydration settle.

## Input and interaction

- Check input, select, date, textarea, autofill, validation, and virtual-keyboard-sensitive layouts.
- Flag focused iOS inputs below 16px font size unless zoom is explicitly intended.
- Verify touch targets are at least 44 by 44 CSS pixels where practical.
- Find hover-only controls and ensure keyboard, focus, and touch alternatives exist.
- Exercise scroll locking, modals, drawers, dropdowns, tooltips, Escape handling, focus return, and z-index/stacking contexts.
- Check fixed headers and footers while a drawer or virtual keyboard changes the visual viewport.

## Rendering and diagnostics

- Verify font fallback and requested font weights.
- Compare CSS masks, gradients, filters, backdrop blur, images, and SVG rendering in paired Chromium/WebKit screenshots.
- Capture console errors, page errors, hydration errors, failed requests, and request URLs without leaking secrets.
- Keep route, viewport, locale, timezone, reduced motion, and page state identical across paired screenshots.

## Required viewports

| Profile | CSS viewport | Engine |
|---|---:|---|
| iPhone SE | 375x667 | WebKit |
| iPhone 12/13/14 class | 390x844 | Chromium + WebKit pair |
| iPhone 14 Pro | 393x852 | WebKit |
| iPhone 14 Pro Max | 430x932 | WebKit |
| iPad Mini portrait | Playwright device profile | WebKit |
| iPad portrait | Playwright iPad gen 11 profile | WebKit |

## Finding schema

Record one object or table row per distinct issue:

```json
{
  "route": "/product/overview",
  "viewport": "390x844",
  "browser": "webkit",
  "severity": "high",
  "component": "PageHeader",
  "selector": ".page-header",
  "screenshot": "path/to/evidence.png",
  "rootCause": "Fixed child is anchored to a transformed ancestor",
  "recommendedFix": "Move the fixed layer outside the transformed container",
  "confidence": "high",
  "regressionRisk": "medium"
}
```

Use severity `critical`, `high`, `medium`, or `low`; confidence `high`, `medium`, or `low`. State when a selector is generated or unstable.
