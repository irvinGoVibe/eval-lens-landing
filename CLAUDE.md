# EvalLense landing

Two surfaces live in this repo:

- `index.html` + `serve.py` — original standalone landing page (kept as visual reference)
- `web/` — Next.js 16 app (App Router, TS, Tailwind v4); the live target

## Running the dev server — do NOT use `pnpm dev` / `npm run dev` directly

Use the Claude Code preview tool (`preview_start` with name `web`) which is wired
through [.claude/launch.json](.claude/launch.json). Reasons:

- The preview tool tracks the server, exposes `preview_logs` / `preview_console_logs`
  / `preview_screenshot` for verification, and survives across turns. Running
  `pnpm dev` from Bash leaves a detached process that ties up port 3000 and
  isn't reachable from the preview MCP.
- If you have to inspect the running app, prefer `preview_eval` over launching
  a parallel browser instance.

The legacy static page has its own preview config (`name: static`, port 5173) — use
that when verifying against the original HTML.

## Conventions for `web/`

- All scroll/animation orchestration lives in
  [web/src/components/ScrollOrchestrator.tsx](web/src/components/ScrollOrchestrator.tsx)
  — a single client component that ports the original `<script>` block. Don't
  fragment animations into per-section `useEffect`s; cross-section scrub /
  parallax / progress need one shared rAF loop.
- Sections are Server Components under `web/src/components/sections/`.
- Global styles live in `web/src/app/globals.css` (legacy CSS extracted from
  `index.html`). Tailwind v4 is installed and tokens exposed via `@theme inline`
  for incremental migration — new code can use either Tailwind utilities or
  the legacy class names.
- `<html>` carries `suppressHydrationWarning` because the `safari-detect`
  `beforeInteractive` script adds `ua-safari` before React hydrates — that
  mismatch is intentional.
