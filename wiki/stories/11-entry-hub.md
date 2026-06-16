---
status: draft
version: 0.1
updated: 2026-06-16
linear_project:
linear_parent_issue:
linear_issues:
---

# Story 11 - Entry Hub page (/product/entry-hub)

Status: Draft
Owner:
Team:
Priority:
Linear Mapping: Project by default

## Summary

Коротко:
- что меняем — добавляем внутреннюю Next.js-страницу `/product/entry-hub`
  (Entry Hub) как Apple-grade scroll-страницу по образцу `/product` и
  `/trust/prompt-injection-safety`.
- зачем меняем — нужна страница, объясняющая, как EvalLense собирает заявки и
  pitch decks в одну контролируемую точку входа вместо разрозненного intake.
- ожидаемый эффект — program owners, фонды, акселераторы и организаторы
  конкурсов видят Entry Hub как замену хаотичному приёму заявок: один приёмный
  поток, публичная submission-страница `/e/<slug>`, чистый batch-workspace до
  старта оценки.

## Problem

- Footer-колонка Product ведёт `Entry hub` на якорь `/#workflow` главной;
  отдельной страницы Entry Hub нет.
- Посетитель не видит сквозной intake-flow одним местом — какие каналы он
  заменяет, как устроен сбор и из чего собирается заявка.
- Нет страницы, где можно показать pinned-flow сбора (6 шагов) и два режима
  приёма (Manual / Self-upload) с published-gate.

## Goal

После завершения:
- страница `/product/entry-hub` доступна, обёрнута в `SiteHeader light` +
  `Footer`, собрана по 7 секциям брифа, со scroll-driven движением через
  `ScrollFX`.
- footer-nav (колонка Product) ведёт `Entry hub` на `/product/entry-hub`.
- использованы реальные подтверждённые факты (2 способа сбора Manual /
  Self-upload, публичная страница `/e/<slug>` с published-gate, форматы дека
  PDF / PPT / PPTX / Google Slides, wizard 5 шагов, старт при ≥1 `ready`) — без
  выдуманных метрик; CSV-импорт и email-уведомления как доступные не обещать,
  лимит 50 MB подавать аккуратно.

## Scope

### In scope
- `web/src/app/product/entry-hub/page.tsx` (Server Component + metadata).
- page-scoped CSS под обёрткой `.entry-hub …` в конце
  `web/src/app/globals.css`.
- footer-ссылка в `web/src/components/Footer.tsx` (колонка Product) — `Entry hub`
  → `/product/entry-hub` (только эта строка).
- story-файл `wiki/stories/11-entry-hub.md`.

### Out of scope
- генерация реальных ассетов (используются видимые `.media-ph`).
- правки `ScrollOrchestrator`/`ScrollFX`, секций главной, других страниц/секций.
- header-nav (бриф: `in_header_nav: false`).
- новые токены/цвета/тени/радиусы; новые пакеты.
- обещание CSV-импорта участников и email-уведомлений (post-MVP).
- фиксация точного списка обязательных полей публичной формы (scope.md OQ5).

## Users / Actors

- primary user: program owners, фонды, акселераторы, организаторы конкурсов —
  те, кто собирает поток заявок и теряет время на сортировку.
- system actor: статический рендер Next.js (страница без backend/process.env).

## Source of Truth

### Wiki
- [[wiki/product/entry-hub.md]] — продуктовый бриф (7 секций, факты, изображения,
  SEO) — первичный источник.
- [[wiki/architecture/page-design-patterns.md]] — архетипы, ритм, движок, QA.
- [[wiki/architecture/design-system.md]] — токены и классы.
- `web/src/app/product/page.tsx` — структурный эталон.
- `web/src/app/trust/prompt-injection-safety/page.tsx` — второй образец.

### Notes
- блоки `.product-overview` / `.injection` / `.consistency` в
  `web/src/app/globals.css` — образец page-scoped CSS; `.methodology .pipe-*` /
  `.product-overview .po-path` — образец pinned-multi-screen.

### Chat / Working Context
- батч-сборка внутренних страниц по skill `build-pages`.

## Main Flow

1. Пользователь приходит из footer-колонки Product → `/product/entry-hub`.
2. Hero задаёт тезис «One entry point for every evaluation batch».
3. Скролл проводит через 7 секций: hero (light) → проблема intake
   (full-bleed-statement, dark) → как работает Entry Hub (pinned, light, 6
   шагов) → что собирается (feature-grid, light) → два способа сбора
   (editorial-split, dark) → ценность (editorial-split, light) → final CTA
   (dark).
4. CTA `Book a Demo` (`/#demo`).

## Business Rules

- Движение — только через data-атрибуты (`data-reveal` / `data-scrub` /
  `data-pin`) и смонтированный `<ScrollFX/>` (после `<Footer/>`). Никаких
  per-section `useEffect`, никаких правок `ScrollOrchestrator`/`ScrollFX`.
- Только канонические токены `:root` и существующие глобальные классы; без
  новых цветов/теней/радиусов, без `--wf-*` / `--sd-*`.
- Flow сбора — ровно 6 шагов (create → configure → share link → upload →
  workspace → start).
- Способов сбора — 2 (Manual · Self-upload).
- Self-upload — публичная страница `/e/<slug>`, доступна только при
  `is_published=true`, иначе 404; late-submit после старта оценки закрыт.
- Форматы дека — PDF / PPT / PPTX / Google Slides; лимит файла подавать
  аккуратно (placeholder, scope.md OQ3) — без жёсткого числа в основном тексте.
- Старт оценки — при ≥1 участнике со статусом `ready`.
- Wizard до сбора — 5 шагов.
- CSV-импорт и email-уведомления — post-MVP; как доступные не подавать.
- `prefers-reduced-motion` тих: контент виден (reveal статичны, pin landed).

## Edge Cases

- Узкие экраны: split-секции схлопываются в один столбец; feature-grid → 2 / 1
  колонки; pinned-секция расжимается (position:static, min-height:0); шаги
  остаются раскрытыми; media уходит в `order:-1`.
- Reduced-motion: reveal статичны, pin-шаги видны, весь контент доступен.
- Горизонтальный скролл страницы запрещён: flex/grid-дети `min-width:0`; медиа
  без фикс-ширин; `media-ph` держит `aspect-ratio`; без `100vw`.

## Technical Impact

Какие зоны затрагиваются:
- frontend: новая страница + page-scoped CSS + footer-ссылка.
- backend: нет.
- database: нет.
- infrastructure: нет (статический рендер на Vercel).

## Dependencies

### Depends on
- generic scroll-FX примитивы и `ScrollFX` (Story 04).
- `.media-ph` примитив; `SiteHeader light`, `Footer`.

### Blocks
- генерацию реальных ассетов для слотов hero / flow / upload.

## Deliverables

- `web/src/app/product/entry-hub/page.tsx`
- CSS-блок `.entry-hub …` в `web/src/app/globals.css`
- footer-ссылка в `web/src/components/Footer.tsx` (колонка Product)
- `wiki/stories/11-entry-hub.md`

## Acceptance Criteria

- [ ] маршрут `/product/entry-hub` доступен и рендерится
- [ ] страница обёрнута в `SiteHeader light` + `Footer`; `<ScrollFX/>`
      смонтирован после `<Footer/>`
- [ ] собраны ровно 7 секций из «Структура секций» брифа (последняя — Final CTA)
- [ ] есть тёмный full-bleed statement (секция 2 «проблема intake») и
      pinned-multi-screen flow (секция 3, 6 шагов)
- [ ] ≥5 разных архетипов на 7 секций; чередование light/.ink (≥2 тёмные полосы)
- [ ] использованы реальные факты (2 способа сбора, `/e/<slug>` + published-gate,
      форматы PDF/PPT/PPTX/Slides, wizard 5 шагов, старт при ≥1 `ready`) — без
      выдуманных цифр; CSV-импорт/email как доступные не обещаны
- [ ] обёртка `<main className="entry-hub">`
- [ ] footer-ссылка (колонка Product) `Entry hub` → `/product/entry-hub`;
      остальные product/trust-ссылки не тронуты
- [ ] использованы только канонические токены/классы (нет `--wf-*` / `--sd-*`,
      новых цветов/теней/радиусов)
- [ ] media-ph в hero + трек шагов + upload-странице; без горизонтального скролла
- [ ] движение через data-атрибуты + `ScrollFX`, без per-section `useEffect`
- [ ] `prefers-reduced-motion` тих (контент виден); pinned-секция на mobile
      расжимается
- [ ] `cd web && pnpm build` зелёный

## Linear Publish Plan

(заполняется, только если Linear подключён)

### Publish Mode
- [ ] Project + child issues
- [ ] Issues only

### Issues
- [ ]

## Definition of Done

- [ ] source logic зафиксирована в wiki (бриф approved)
- [ ] реализация завершена
- [ ] acceptance criteria подтверждены
- [ ] изменения отражены в relevant docs

## Open Questions

(перенесено из брифа §Открытые вопросы)
- CSV-импорт участников — post-MVP; не обещать.
- Точный список обязательных полей публичной формы — открытый вопрос
  (scope.md OQ5); не фиксировать выдуманный список.
- Email-уведомления (submit confirmation, deadline reminders) — post-MVP.
- Лимит 50 MB — placeholder (scope.md OQ3); подавать аккуратно, без жёсткого
  числа в основном тексте.

## Change Log

- 2026-06-16 - created
