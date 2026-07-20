---
name: mobile-qa-loop
description: "Run a reproducible evidence-first mobile QA loop for this project: crawl configured pages at deterministic iPhone viewports and states, capture checkpoint screenshots and DOM geometry, classify and deduplicate defects, group root causes, propose an implementation plan, apply only approved fixes, and repeat the exact scenarios in Chromium, Playwright WebKit, desktop regression, and a physical iPhone. Use for mobile audits, responsive QA, iPhone/Safari bugs, page-by-page bug discovery, audit-only requests, audit-and-fix requests, screenshot-based mobile review, or proving that a mobile defect was fixed without regressions."
---

# Mobile QA Loop

Treat mobile QA as a closed, reproducible loop rather than ad-hoc scrolling. Use Chrome only as a fast pre-check. Treat Playwright WebKit and a real iPhone Safari run as the compatibility evidence layers.

## Prepare

1. Read `PROJECT-ENTRYPOINT.md`, `CLAUDE.md`, `AGENTS.md`, and `wiki/processes/process.md`.
2. Read `.agents/skills/safari-compatibility-audit/SKILL.md` for browser rules.
3. Read `.agents/skills/debug-physical-iphone/SKILL.md` before using a real iPhone.
4. Read `web/mobile-tests/pages.yaml` and `web/mobile-tests/rules.md`.
5. Do not touch the user-owned server on 3005 or use port 3000. Use the isolated test target.

## Choose the mode

- Default to **audit-only**. Complete all checkpoints and report every finding before editing.
- Use **audit-and-fix** only when the user explicitly requested fixes or approved the grouped plan.
- Never fix the first finding while the audit is incomplete.
- Keep product logic, desktop design, CMS, credentials, and test data unchanged unless explicitly in scope.

## Run audit-only

1. Build the fixed revision and start/reuse the isolated test server according to repository rules.
2. Run the deterministic crawler:

   ```sh
   cd web && pnpm test:mobile:qa:audit
   ```

3. Inspect the generated `web/mobile-tests/runs/<run-id>/` reports and every checkpoint screenshot.
4. Add visual findings only when screenshot evidence shows a real hierarchy, composition, wrapping, visibility, density, or brand problem.
5. Compare mobile and desktop semantically, not with an absolute cross-layout pixel diff.
6. Merge duplicate symptoms under the same probable root cause before proposing changes.

Read [references/issue-contract.md](references/issue-contract.md) for severity, evidence, grouping, and acceptance rules.

## Plan and fix

1. Present the complete atomic bug list and root-cause groups.
2. Order the plan: global layout → typography → components → interaction → Safari-specific.
3. In audit-only mode, stop before editing and request approval.
4. In audit-and-fix mode, change one logical root-cause group per iteration.
5. Reuse existing tokens and breakpoints. Do not hide overflow globally, shrink the UI with `transform/zoom`, or add symptom-level hacks without parent-layout analysis.

## Retest

1. Rebuild the same revision target.
2. Run:

   ```sh
   cd web && pnpm test:mobile:qa:retest
   ```

3. Compare the same URL, viewport, state, scroll checkpoints, locale, timezone, motion setting, and test data.
4. Run desktop Chromium regression and console/network diagnostics.
5. Verify Safari-sensitive changes in Playwright WebKit.
6. Use `$debug-physical-iphone` for the final real-iPhone scenario and release automation before handoff.
7. Mark a defect fixed only when its acceptance checks pass and no new higher/equal-severity regression appears.

## Report

Return:

- tested revision, URLs, viewports, states, and critical flows;
- passed/failed/skipped checkpoints;
- atomic issues with screenshot and selector;
- root-cause groups and implementation order;
- before/after evidence for fixed issues;
- desktop, Chromium, WebKit, and physical-iPhone status;
- unresolved findings and reasons.

Record precision observations during the first 10–20 audit-only pages. Do not enable autonomous broad fixes until false positives and duplicate rates are reviewed by the user.
