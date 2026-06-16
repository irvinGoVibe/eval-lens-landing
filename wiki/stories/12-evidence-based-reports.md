---
status: draft
version: 0.1
updated: 2026-06-16
linear_project:
linear_parent_issue:
linear_issues:
---

# Story 12 - Evidence-Based Reports page (/product/evidence-based-reports)

Status: Draft
Owner:
Team:
Priority:
Linear Mapping: Project by default

## Summary

Коротко:
- что меняем — добавляем внутреннюю Next.js-страницу
  `/product/evidence-based-reports` (Evidence-Based Reports) как Apple-grade
  scroll-страницу по образцу `/product`, `/trust/use-cases` (horizontal-gallery)
  и `/trust/consistency-reliability` (scrubbed ring).
- зачем меняем — нужна product-страница, объясняющая главный output EvalLense:
  структурированный explainable-отчёт, где каждый score объясним, а важные
  выводы привязаны к содержимому дека — а не «голый» AI-балл.
- ожидаемый эффект — review-команды, program owners и инвесткомитеты видят
  отчёт как обоснование (anatomy слоёв, детерминированный scoring, привязка к
  слайдам, deck-completeness), а не как чёрный ящик; ведёт к Book a Demo.

## Problem

- Footer-колонка Product ведёт `Reports` на якорь `/#decisions` главной;
  отдельной страницы про отчёты нет.
- Посетитель не видит, из чего состоит отчёт (Project Summary · AI Score
  Report · Questions), как считается score и почему ему можно доверять.
- Нет места, где честно показать explainability (привязка к слайдам,
  deck-completeness) без обещаний пока-не-готовых фич (SourceRefs в UI, export
  PDF).

## Goal

После завершения:
- страница `/product/evidence-based-reports` доступна, обёрнута в
  `SiteHeader light` + `Footer`, собрана по 7 секциям брифа, со
  scroll-driven движением через `ScrollFX`.
- footer-nav (колонка Product) ведёт `Reports` на
  `/product/evidence-based-reports`.
- использованы подтверждённые факты (слои отчёта Project Summary / AI Score
  Report / Questions; формула A(d)=R(d)·[1−0.15·(1−C(d))]; confidence-веса
  0.55 / 0.70 / 0.85; AI Total Score=Σ w(d)·A(d); шкала 0.0–10.0; advisory;
  Judge Contribution Matrix Primary / Secondary / Advisory; 10 секций
  deck-completeness info / warning / critical) — без выдуманных цифр.
- НЕ называть «gap analysis / due diligence»; SourceRefs подавать как «привязка
  к слайдам» (в UI пока не отображается); export PDF — post-MVP («shareable для
  внутреннего ревью», не «exportable»).

## Scope

### In scope
- `web/src/app/product/evidence-based-reports/page.tsx` (Server Component +
  metadata).
- page-scoped CSS под обёрткой `.ev-reports …` в конце
  `web/src/app/globals.css`.
- footer-ссылка в `web/src/components/Footer.tsx` (колонка Product) — `Reports`
  → `/product/evidence-based-reports` (только эта строка).
- story-файл `wiki/stories/12-evidence-based-reports.md`.

### Out of scope
- генерация реальных ассетов (используются видимые `.media-ph`).
- правки `ScrollOrchestrator` / `ScrollFX`, секций главной, других
  страниц/секций.
- header-nav (бриф: `in_header_nav: false`).
- новые токены/цвета/тени/радиусы; новые пакеты.
- обещание SourceRefs-UI и export PDF как готовых фич (post-MVP / open).
- View Sample Report как рабочий маршрут (нет примера; вторичный путь).

## Users / Actors

- primary user: review-команды, program owners, инвесткомитеты — те, кому
  отчёт нужен для ревью, shortlist и решения.
- system actor: статический рендер Next.js (страница без backend/process.env).

## Source of Truth

### Wiki
- [[wiki/product/evidence-based-reports.md]] — продуктовый бриф (7 секций,
  факты, изображения, SEO) — первичный источник.
- [[wiki/architecture/page-design-patterns.md]] — архетипы, ритм, движок, QA.
- [[wiki/architecture/design-system.md]] — токены и классы.
- `web/src/app/product/page.tsx` — структурный эталон.
- `web/src/app/trust/use-cases/page.tsx` — образец horizontal-gallery
  (`.seg-lane`).
- `web/src/app/trust/consistency-reliability/page.tsx` — образец scrubbed ring
  (`.conf-ring` + `data-scrub`) и формулы A(d).

### Notes
- блоки `.usecases .seg-lane` / `.methodology .report-lane` в
  `web/src/app/globals.css` — образец horizontal-gallery; `.consistency
  .math-*` / `.conf-ring` — образец editorial-split + scrubbed ring.

### Chat / Working Context
- батч-сборка внутренних страниц по skill `build-pages`.

## Main Flow

1. Пользователь приходит из footer-колонки Product → `Reports`.
2. Hero задаёт тезис «Every score, explained — back to the deck».
3. Скролл проводит через 7 секций: hero (light) → почему голого балла мало
   (full-bleed-statement, dark) → анатомия отчёта (horizontal-gallery, light) →
   как считается score (editorial-split + scrubbed ring, dark) → привязка к
   evidence (editorial-split, light) → где используется отчёт (feature-grid,
   light) → final CTA (dark).
4. CTA `Book a Demo` (`/#demo`).

## Business Rules

- Движение — только через data-атрибуты (`data-reveal` / `data-scrub`) и
  смонтированный `<ScrollFX/>` (после `<Footer/>`). Никаких per-section
  `useEffect`, никаких правок `ScrollOrchestrator` / `ScrollFX`.
- Только канонические токены `:root` и существующие глобальные классы; без
  новых цветов/теней/радиусов, без `--wf-*` / `--sd-*`.
- Слои отчёта — Project Summary · AI Score Report · Questions for Participants
  (+ dimension scores / judge assessments / evidence references).
- Score детерминированный: A(d)=R(d)·[1−0.15·(1−C(d))]; AI Total Score=Σ
  w(d)·A(d); шкала 0.0–10.0 (0–100 — только UI); AI Total Score — advisory
  (rank по human Jury Score).
- Confidence-веса low/medium/high = 0.55 / 0.70 / 0.85.
- Judge Contribution Matrix — роли Primary / Secondary / Advisory по P1–P6 +
  подсветка сильных расхождений.
- Deck completeness — 10 секций (problem · solution · market · business model ·
  traction · team · roadmap · financials · ask · other), severity
  info / warning / critical; это НЕ Truth Check (сигнал о пробеле, не вердикт).
- SourceRefs — подавать как «привязка к слайдам» (slide number + title + note),
  в UI пока не как готовая фича.
- Export PDF — post-MVP; подавать «shareable для внутреннего ревью», не
  «exportable». View Sample Report — вторичный/ghost.
- НЕ называть «gap analysis / due diligence».
- `prefers-reduced-motion` тих: контент виден (reveal статичны, ring landed).

## Edge Cases

- Узкие экраны: split-секции схлопываются в один столбец; feature-grid → 2 / 1
  колонки; horizontal-gallery остаётся горизонтальной, но скроллится ВНУТРИ
  своего overflow-контейнера, не двигая страницу; media уходит в `order:-1`.
- Reduced-motion: reveal статичны, confidence-ring приземлён в полное
  состояние, весь контент доступен.
- Горизонтальный скролл страницы запрещён: flex/grid-дети `min-width:0`; медиа
  без фикс-ширин (`max-width:100%`); `media-ph` держит `aspect-ratio`; без
  `100vw`.

## Technical Impact

Какие зоны затрагиваются:
- frontend: новая страница + page-scoped CSS + footer-ссылка.
- backend: нет.
- database: нет.
- infrastructure: нет (статический рендер на Vercel).

## Dependencies

### Depends on
- generic scroll-FX примитивы и `ScrollFX` (Story 04).
- `.media-ph` примитив; `.seg-lane` / `.conf-ring` паттерны; `SiteHeader
  light`, `Footer`.

### Blocks
- генерацию реальных ассетов для слотов hero / anatomy / evidence.

## Deliverables

- `web/src/app/product/evidence-based-reports/page.tsx`
- CSS-блок `.ev-reports …` в `web/src/app/globals.css`
- footer-ссылка в `web/src/components/Footer.tsx` (колонка Product)
- `wiki/stories/12-evidence-based-reports.md`

## Acceptance Criteria

- [ ] маршрут `/product/evidence-based-reports` доступен и рендерится
- [ ] страница обёрнута в `SiteHeader light` + `Footer`; `<ScrollFX/>`
      смонтирован после `<Footer/>`
- [ ] собраны ровно 7 секций из «Структура секций» брифа (последняя — Final CTA)
- [ ] есть тёмный full-bleed statement (секция 2) и horizontal-gallery анатомии
      (секция 3), скроллится ВНУТРИ контейнера
- [ ] есть scrubbed confidence-ring в секции 4 (как в consistency)
- [ ] ≥5 разных архетипов на 7 секций; чередование light/.ink (≥2 тёмные полосы)
- [ ] использованы реальные факты (слои отчёта; A(d); веса 0.55/0.70/0.85;
      Σ w(d)·A(d); шкала 0.0–10.0; advisory; matrix Primary/Secondary/Advisory;
      10 секций completeness info/warning/critical) — без выдуманных цифр
- [ ] обёртка `<main className="ev-reports">`
- [ ] SourceRefs поданы как «привязка к слайдам» (не как готовая UI-фича);
      export PDF не обещан (shareable для внутреннего ревью); нет терминов
      «gap analysis / due diligence»; completeness не назван Truth Check
- [ ] footer-ссылка (колонка Product) `Reports` → `/product/evidence-based-reports`;
      остальные product/trust-ссылки не тронуты
- [ ] использованы только канонические токены/классы (нет `--wf-*` / `--sd-*`,
      новых цветов/теней/радиусов)
- [ ] media-ph в hero + анатомии + evidence; без горизонтального скролла страницы
- [ ] движение через data-атрибуты + `ScrollFX`, без per-section `useEffect`
- [ ] `prefers-reduced-motion` тих (контент виден); split на mobile в один столбец
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
- SourceRefs в UI — данные собираются, но в UI пока не отображаются
  (report.md §9); не обещать как готовую фичу — «привязка к слайдам».
- Export отчёта (PDF) — post-MVP (report.md §14); подавать как «shareable для
  внутреннего ревью», export — открытый вопрос.
- View Sample Report — нужен реальный пример/маршрут; пока CTA вторичный.
- Не называть «gap analysis / due diligence» (правило raw-брифа).

## Change Log

- 2026-06-16 - created
