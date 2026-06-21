# EvalLense landing

Two surfaces live in this repo:

- `index.html` + `serve.py` — original standalone landing page (kept as visual reference)
- `web/` — Next.js 16 app (App Router, TS, Tailwind v4); the live target

## Dev server / preview — do NOT start it on your own

The user runs their own dev server in their IDE — opening the in-IDE preview
panel from Codex gets in the way. **Do not call `preview_start`,
`pnpm dev`, `pnpm build`, or any other long-running command unless the user
explicitly asks** ("запусти превью", "подними сервер", "посмотри визуально"
or similar). If you need to verify a change, ask first.

When the user does ask:

- Use the Codex preview tool (`preview_start` with name `web`), which
  is wired through [.Codex/launch.json](.Codex/launch.json). The preview
  tool tracks the server, exposes `preview_logs` / `preview_console_logs` /
  `preview_screenshot` / `preview_eval` for inspection, and survives across
  turns. Running `pnpm dev` from Bash leaves a detached process.
- The dev server is pinned to **port 3005** (both `package.json` scripts and
  the launch config) so it doesn't collide with the user's other project on
  3000. Do not change the port without asking.
- The legacy static page has its own preview config (`name: static`,
  port 5173) — use that when verifying against the original HTML.

## Conventions for `web/`

- All scroll/animation orchestration lives in
  [web/src/components/ScrollOrchestrator.tsx](web/src/components/ScrollOrchestrator.tsx)
  — a single client component that ports the original `<script>` block. Don't
  fragment animations into per-section `useEffect`s; cross-section scrub /
  parallax / progress need one shared rAF loop.
- Sections are Server Components under `web/src/components/sections/`.
- **`Lab*` section styles are scoped under `.section-lab`** — virtually all
  `.lab-*` layout/typography rules in `globals.css` are written as
  `.section-lab .lab-*` (~500+ rules). **Any page that renders `Lab*` components
  (or `.lab-*` markup) MUST put `section-lab` on its container** (e.g.
  `<main className="<page> section-lab">`), otherwise the section styles don't
  apply — headings collapse to default (~17px), no centering, no background
  pattern. This bit `/dev/visual-lab` and `/dev/vivid-demo`; `build-pages` /
  `page-composer` and any engineer composing `Lab*` into a page must include it.
- Global styles live in `web/src/app/globals.css` (legacy CSS extracted from
  `index.html`). Tailwind v4 is installed and tokens exposed via `@theme inline`
  for incremental migration — new code can use either Tailwind utilities or
  the legacy class names.
- `<html>` carries `suppressHydrationWarning` because the `safari-detect`
  `beforeInteractive` script adds `ua-safari` before React hydrates — that
  mismatch is intentional.
- **The glass button (`<Button variant="glass">`) must always render the
  shared "liquid glass" material** — the exact look used in the Hero CTA row
  and the dark footer (not the flat base `.btn-glass`). That treatment is one
  multi-selector group in `globals.css` (search `liquid glass` / `.btn-glass`):
  Hero, header, footer, bento horse, CTA band. When a new surface uses a glass
  button, **add its selector to that group** instead of restyling it locally —
  never invent a one-off glass look.

## Стек (по факту)

- **Frontend:** Next.js 16.2.7 (App Router), React 19, TypeScript 5.
- **Стили:** Tailwind v4 (`@tailwindcss/postcss`) + legacy CSS в `globals.css`
  (токены через `@theme inline`).
- **3D:** `three` + `@react-three/fiber` / `drei` / `postprocessing`.
- **Данные:** статический контент блога в `web/src/lib/blog.ts` — БД/CMS нет.
- **Backend / auth:** нет. Сайт — чистая статика (ни одного `process.env`
  в `web/src`).
- **Деплой:** Vercel (целевая платформа).

Полное устройство — `wiki/architecture/system.md`. Продукт и scope —
`wiki/product/`.

## Сборка и пакеты

- **Сборка/проверка:** `cd web && pnpm build`. Dev-сервер сам не запускается
  (см. правило про preview выше).
- **Менеджер пакетов — только pnpm** (`pnpm-lock.yaml`). `package-lock.json`
  не коммитить и не создавать `npm install` в `web/`.
- Новые зависимости — только по согласованию.

## Запреты

- Секреты только в `.env` (в `.gitignore`) и только server-side; в клиентский
  бандл секреты не попадают.
- Не дробить скролл/анимации на per-section `useEffect` — всё в
  `ScrollOrchestrator.tsx` (единый rAF-цикл).
- Не менять порт dev-сервера (3005) без согласования.
- Контент блога добавляется записью в `posts` (`lib/blog.ts`), без внешней CMS.
