# EvalLens agent instructions

Read `PROJECT-ENTRYPOINT.md`, `CLAUDE.md`, and `wiki/processes/process.md` before changing the project. More specific `AGENTS.md` files apply within their directories.

## Repository rules

- Treat `web/` as the live Next.js application; keep `index.html` and `designs/` unchanged unless explicitly requested.
- Use pnpm only. The project is pinned to pnpm 11.13.1; never create an npm lockfile.
- Do not start, stop, or restart the user's dev server. Never occupy port 3000. The user-owned dev server is on 3005.
- Cross-browser tests use a production build on the isolated test port 3405. Build with `cd web && pnpm test:build` before Playwright commands that need the test server.
- Do not add secrets, production credentials, BrowserStack keys, or auth storage state to the repository.
- Admin routes require the existing `CMS_PASSWORD` session flow. Do not bypass it or invent test credentials.

## Safari compatibility

- Use `.agents/skills/mobile-qa-loop` for reproducible page audits, bug classification, approved mobile fixes, and exact checkpoint retests.
- Use `.agents/skills/safari-compatibility-audit` for Safari/WebKit, mobile viewport, overflow, accessibility, or cross-browser audit work.
- Use `.agents/skills/debug-physical-iphone` when opening the local app on a real iPhone over Wi-Fi or switching between user-controlled Safari and Apple WebDriver automation.
- Treat Playwright WebKit as the automated compatibility layer, not as proof of identical behavior in shipping Safari or iOS Safari.
- Do not hide overflow globally with `overflow-x: hidden`; identify the originating element and record evidence first.
- Do not make broad visual changes without a reproduced Chromium/WebKit difference.
- Re-run the affected scenario in both Chromium and WebKit after every compatibility fix.

## Validation commands

- Lint: `cd web && pnpm lint`
- Build: `cd web && pnpm test:build`
- Chromium smoke: `cd web && pnpm test:smoke:chromium`
- WebKit smoke: `cd web && pnpm test:smoke:webkit`
- Full Safari/WebKit audit: `cd web && pnpm audit:safari`
- Repeat after fixes: `cd web && pnpm audit:recheck`
