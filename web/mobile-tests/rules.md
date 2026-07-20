# Mobile QA rules

- Default mode is audit-only: finish all captures before changing product code.
- Use two boundary viewports first: 375x812 and 430x932.
- Scroll by 75% of the viewport and capture every checkpoint.
- Stabilize fonts, skeletons, motion, locale, timezone, and test state before capture.
- Deduplicate findings across checkpoints by category and selector.
- Record screenshots and selectors for every issue.
- Group symptoms by probable root cause before proposing a plan.
- Do not use global overflow hiding, transform/zoom shrinking, or desktop regressions as fixes.
- Retest the exact URL, viewport, state, and scroll positions after each approved root-cause group.
- Chrome is a pre-check. Playwright WebKit is mandatory; physical iPhone Safari is final evidence for Safari-sensitive changes.
- Pixel diff is valid only for identical browser/viewport/state baselines. Compare desktop/mobile semantically.
- Protected routes require the existing approved auth fixture or are skipped with a reason.
