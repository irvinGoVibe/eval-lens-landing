---
status: draft
version: 0.1
updated: 2026-06-16
linear_project:
linear_parent_issue:
linear_issues:
---

# Story 06 - Consistency & Reliability page (/trust/consistency-reliability)

Status: Draft
Owner:
Team:
Priority:
Linear Mapping: Project by default

## Summary

Коротко:
- что меняем — добавляем внутреннюю Next.js-страницу `/trust/consistency-reliability`
  как Apple-grade scroll-страницу по образцу `/trust/methodology`.
- зачем меняем — Trust-раздел должен объяснять, как EvalLense делает стабильность
  оценки видимой: детерминированная математика, spread судей, контроль смещений,
  benchmark-проверка и эскалация к человеку.
- ожидаемый эффект — VC-фонды, акселераторы и организаторы конкурсов видят, что
  балл подаётся вместе с мерой его устойчивости, а не вместо неё.

## Problem

- Trust-раздел сейчас покрывает только methodology; нет страницы, объясняющей
  consistency / variance / repeatability.
- Ключевое сообщение бренда (балл полезен, только если известно, насколько он
  устойчив) нигде не раскрыто на сайте.
- Footer-колонка Trust ссылается на разделы главной (`/#trust`), а отдельной
  reliability-страницы нет.

## Goal

После завершения:
- страница `/trust/consistency-reliability` доступна, обёрнута в `SiteHeader` +
  `Footer`, собрана по 9 секциям брифа, со scroll-driven движением через `ScrollFX`.
- footer-nav (колонка Trust) ведёт на новую страницу.
- использованы реальные подтверждённые числа (формула A(d), confidence-веса,
  spread-пороги, benchmark-метрики) — без draft-заглушек.

## Scope

### In scope
- `web/src/app/trust/consistency-reliability/page.tsx` (Server Component + metadata).
- page-scoped CSS под обёрткой `.consistency …` в конце `web/src/app/globals.css`.
- footer-ссылка в `web/src/components/Footer.tsx` (колонка Trust).
- story-файл `wiki/stories/06-consistency-reliability.md`.

### Out of scope
- генерация реальных ассетов (используются видимые `.media-ph`).
- правки `ScrollOrchestrator`, секций главной (`#workflow`, `#decisions`, `#trust`).
- header-nav (бриф: `in_header_nav: false`).
- новые токены/цвета/тени/радиусы; новые пакеты.

## Users / Actors

- primary user: VC-фонды, акселераторы, организаторы конкурсов — те, кто
  принимает решения по результатам и кому важна устойчивость балла.
- system actor: статический рендер Next.js (страница без backend/process.env).

## Source of Truth

### Wiki
- [[wiki/product/consistency-reliability.md]] — продуктовый бриф (9 секций, числа,
  изображения, SEO) — первичный источник.
- [[wiki/architecture/page-design-patterns.md]] — архетипы, ритм, движок, QA.
- [[wiki/architecture/design-system.md]] — токены и классы.
- `web/src/app/trust/methodology/page.tsx` — структурный эталон.

### Notes
- блок `.methodology` в `web/src/app/globals.css` — образец page-scoped CSS.

### Chat / Working Context
- батч-сборка внутренних страниц по skill `build-pages`.

## Main Flow

1. Пользователь приходит из footer-колонки Trust → `/trust/consistency-reliability`.
2. Hero задаёт тезис «Reliability you can inspect, not just trust».
3. Скролл проводит через 9 секций: почему усреднение опасно → механизмы →
   детерминированная математика → spread (pinned) → контроль смещений →
   benchmark → граница надёжности → final CTA.
4. CTA `Book a Demo` (`/#demo`).

## Business Rules

- Движение — только через data-атрибуты (`data-reveal` / `data-scrub` / `data-pin`)
  и смонтированный `<ScrollFX/>` (после `<Footer/>`). Никаких per-section
  `useEffect`, никаких правок `ScrollOrchestrator`.
- Только канонические токены `:root` и существующие глобальные классы.
- Benchmark-метрики подаются как «целевые пороги на контролируемом dataset», не
  как гарантии на любых данных.
- Math/Function 1 — детерминированно: тот же вход → тот же балл (tolerance <1%).
- `prefers-reduced-motion` тих: контент гейтится на `.is-active`, не на
  `.is-current` (для pin-секции есть reduced-motion-оверрайд).

## Edge Cases

- Узкие экраны: pinned spread-секция снимает pin (`max-width:880px`) и раскрывает
  все шаги; split-секции схлопываются в один столбец; bento/feature-гриды → 1–2
  колонки.
- Reduced-motion: reveal/scrub/pin статичны, spread-описания видимы.
- Горизонтальный скролл запрещён: flex/grid-дети `min-width:0`, медиа без
  фикс-ширин, `media-ph` держит `aspect-ratio`.

## Technical Impact

- frontend: новая страница + page-scoped CSS + footer-ссылка.
- backend: нет.
- database: нет.
- infrastructure: нет (статический рендер на Vercel).

## Dependencies

### Depends on
- generic scroll-FX примитивы и `ScrollFX` (Story 04).
- `.media-ph` примитив; `SiteHeader light`, `Footer`.

### Blocks
- генерацию реальных ассетов для слотов hero / spread / benchmark.

## Deliverables

- `web/src/app/trust/consistency-reliability/page.tsx`
- CSS-блок `.consistency …` в `web/src/app/globals.css`
- footer-ссылка в `web/src/components/Footer.tsx`
- `wiki/stories/06-consistency-reliability.md`

## Acceptance Criteria

- [ ] маршрут `/trust/consistency-reliability` доступен и рендерится
- [ ] страница обёрнута в `SiteHeader light` + `Footer`; `<ScrollFX/>` смонтирован
      после `<Footer/>`
- [ ] собраны ровно 9 секций из «Структура секций» брифа
- [ ] таблицы механизмов (7), spread-порогов (3), bias-контроля (6) и benchmark
      stat-band присутствуют с реальными числами (A(d), 0.55/0.70/0.85,
      <1.5/1.5–2.99/≥3.0, stddev ≤3 и т.д.)
- [ ] добавлена footer-ссылка (колонка Trust)
- [ ] использованы только канонические токены/классы (нет `--wf-*` / `--sd-*`,
      новых цветов/теней/радиусов)
- [ ] ≥5 разных архетипов; ≥1 pinned-секция; ≥1 тёмный statement; ≥1
      горизонтальная/бенто-визуальная плотность; ≥ несколько визуальных слотов
- [ ] движение через data-атрибуты + `ScrollFX`, без per-section `useEffect`
- [ ] `prefers-reduced-motion` тих (контент виден)
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
- Можно ли публиковать точные пороги метрик (stddev ≤3 и т.д.) на внешнем сайте,
  или давать их как «контролируемый benchmark» без чисел. На странице сейчас они
  поданы с дисклеймером «targets on a controlled set» — финальное решение за
  продуктом/маркетингом.
- Публичная подача «400+ прогонов» — это продуктовая история, не метрика точности;
  подтвердить формулировку из утверждённых материалов.
- Живые цифры variance на реальных питчах (не benchmark) — есть ли утверждённые
  к показу.

## Change Log

- 2026-06-16 - created
