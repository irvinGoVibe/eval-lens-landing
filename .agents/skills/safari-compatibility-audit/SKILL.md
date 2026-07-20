---
name: safari-compatibility-audit
description: Audit and verify EvalLens Safari compatibility with Playwright Chromium/WebKit, deterministic mobile profiles, overflow diagnostics, screenshots, console/network checks, touch/form checks, accessibility, and guarded real-Safari or BrowserStack follow-up. Use for Safari, iOS, WebKit, mobile viewport, horizontal overflow, visual regression, responsive QA, accessibility, browser console, failed request, or cross-browser regression work in this repository.
---

# Safari Compatibility Audit

Run a reproducible Chromium/WebKit audit without touching the user-owned dev server or hiding layout defects. Treat Playwright WebKit as the primary automation layer and real Safari or BrowserStack as a separate verification layer.

## Prepare

1. Read `PROJECT-ENTRYPOINT.md`, `CLAUDE.md`, `AGENTS.md`, `web/AGENTS.md`, and `wiki/processes/process.md`.
2. Do not start, restart, or stop the dev server on 3005. Never use port 3000.
3. Run `node .agents/skills/safari-compatibility-audit/scripts/discover-routes.mjs` from the repository root. Compare its output with `web/tests/support/routes.ts`; update the manifest only when source routes changed.
4. Classify `/admin/login` as public auth UI and other `/admin` pages as protected. Do not invent credentials or bypass the `CMS_PASSWORD` flow. Skip authenticated scenarios when no approved storage state or test credential exists.
5. Confirm browser bundles with `cd web && pnpm exec playwright install --dry-run`. Install only through `pnpm test:browsers:install` when missing.

## Run the audit

1. Build the canonical production target with `cd web && pnpm test:build`. The current static blog fallback is empty, so do not force `BLOG_SOURCE=static` unless that existing build limitation is resolved separately.
2. Use the isolated Playwright server on 3405; never redirect the audit to 3000 or replace the server on 3005.
3. Run Chromium and WebKit smoke tests before broader work:
   - `pnpm test:smoke:chromium`
   - `pnpm test:smoke:webkit`
4. Run focused checks:
   - mobile/device matrix: `pnpm test:mobile`
   - overflow: `pnpm test:overflow`
   - paired baselines: `pnpm test:visual`
   - accessibility: `pnpm test:a11y`
5. Run the complete WebKit matrix with `pnpm audit:safari`. After fixes, repeat with `pnpm audit:recheck` and also rerun the same scenario in Chromium.
6. Open the HTML report only on request with `pnpm test:report` because it starts a report server.

## Inspect and report

1. Read [references/audit-checklist.md](references/audit-checklist.md) before a full audit or any CSS compatibility fix.
2. Keep paired Chromium/WebKit screenshots at the same route, viewport, locale, timezone, reduced-motion setting, and page state.
3. Record each issue with route, viewport, browser, severity, component, selector, screenshot, root cause, recommended fix, confidence, and regression risk.
4. Attach raw browser diagnostics and overflow findings to Playwright results. Distinguish a browser-engine difference from a general responsive defect.
5. Do not apply a global `overflow-x: hidden` or `clip` as a substitute for finding the overflowing element.
6. Do not make mass visual changes without a reproduced browser-specific difference.
7. After every fix, rerun the smallest reproducer in Chromium and WebKit, then the affected mobile project.

## Use real Safari and BrowserStack

Read [references/real-safari-and-browserstack.md](references/real-safari-and-browserstack.md) only when the task requires shipping Safari, Safari Web Inspector, physical iPhone, or BrowserStack evidence. Do not call WebKit identical to Safari. Do not install a community Safari MCP. Do not activate BrowserStack without environment-provided credentials and explicit authorization to use the account.
