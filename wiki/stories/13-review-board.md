---
status: draft
version: 0.1
updated: 2026-06-16
linear_project:
linear_parent_issue:
linear_issues:
---

# Story 13 - Review Board page (/product/review-board)

Status: Draft
Owner:
Team:
Priority:
Linear Mapping: Project by default

## Summary

Коротко:
- что меняем — добавляем внутреннюю Next.js-страницу `/product/review-board`
  (Review Board) как Apple-grade scroll-страницу по образцу `/product`,
  `/product/entry-hub` и `/trust/security-privacy` (pin, bento, full-bleed,
  HITL-узлы).
- зачем меняем — нужна product-страница, объясняющая Review Board как
  **decision workspace**: где после AI-оценки команда сравнивает оценённые
  стартапы, строит shortlist и принимает финальное решение — человек владеет
  итогом.
- ожидаемый эффект — review-команды и program owners видят переход от отдельных
  отчётов к batch-level решению (startup list со статусами, advisory AI Total
  Score, human Jury Score, leaderboard по Final Score, decision trail), а не
  чёрный ящик; ведёт к Book a Demo.

## Problem

- Footer-колонка Product ведёт `Batch results` на якорь `/#results` главной;
  отдельной страницы про доску сравнения и решения нет.
- После генерации оценок появляется операционная боль: много отчётов трудно
  сравнивать вручную, баллам нужен контекст, ревьюерам нужен один общий вид, а
  финальные решения нужно фиксировать и уметь объяснить позже.
- Нет места, где честно показать human-in-the-loop (AI готовит — человек
  финализирует) и audit trail (AI score + human score видны вместе) без
  обещаний пока-не-готовых фич.

## Goal

После завершения:
- страница `/product/review-board` доступна, обёрнута в `SiteHeader light` +
  `Footer`, собрана по 7 секциям брифа, со scroll-driven движением через
  `ScrollFX`.
- footer-nav (колонка Product) ведёт `Review board` на `/product/review-board`
  (замена строки `Batch results`).
- использованы подтверждённые факты (Jury Score 0.0–10.0 per P1–P6; 6 измерений
  P1–P6; ранжирование по human Final Score; 5 статусов участника AI Report
  Ready / In Review / Scored / Not Scored / Error; AI Total Score advisory;
  audit trail AI+human score вместе; spread `<1.5` / `1.5–2.99` / `≥3.0`; один
  организатор в MVP) — без выдуманных цифр.
- НЕ обещать multi-organizer / blind voting / deliberation; НЕ выводить
  WINNER / TOP-3 / compare-with-#1 бейджи; разлочка/версионирование
  leaderboard и публичные ссылки на отчёты — post-MVP.

## Scope

### In scope
- `web/src/app/product/review-board/page.tsx` (Server Component + metadata).
- page-scoped CSS под обёрткой `.review-board …` в конце
  `web/src/app/globals.css`.
- footer-ссылка в `web/src/components/Footer.tsx` (колонка Product) —
  `Batch results` → `Review board` `/product/review-board` (только эта строка).
- story-файл `wiki/stories/13-review-board.md`.

### Out of scope
- генерация реальных ассетов (используются видимые `.media-ph`).
- правки `ScrollOrchestrator` / `ScrollFX`, секций главной, других
  страниц/секций.
- header-nav (бриф: `in_header_nav: false`).
- новые токены/цвета/тени/радиусы; новые пакеты.
- multi-organizer / blind voting / deliberation; WINNER / TOP-3 /
  compare-with-#1 бейджи; разлочка leaderboard; публичные ссылки на отчёты.

## Users / Actors

- primary user: review-команды и program owners, которым нужно перейти от
  отдельных отчётов к batch-level решениям.
- system actor: статический рендер Next.js (страница без backend/process.env).

## Source of Truth

### Wiki
- [[wiki/product/review-board.md]] — продуктовый бриф (7 секций, факты,
  изображения, SEO) — первичный источник.
- [[wiki/architecture/page-design-patterns.md]] — архетипы, ритм, движок, QA.
- [[wiki/architecture/design-system.md]] — токены и классы.
- `web/src/app/product/page.tsx` — структурный эталон (pin, bento).
- `web/src/app/product/entry-hub/page.tsx` — образец full-bleed statement и
  pinned multi-screen.
- `web/src/app/trust/security-privacy/page.tsx` — образец bento (workspace) и
  HITL-узлов (`.hitl-*`).

### Notes
- блоки `.security`/`.entry-hub`/`.product-overview` в
  `web/src/app/globals.css` — образцы bento/pin/full-bleed; `.methodology
  .pipe-*` для pinned, `.methodology .hitl-*` для AI→Human узлов.

### Chat / Working Context
- батч-сборка внутренних страниц по skill `build-pages`.

## Main Flow

1. Пользователь приходит из footer-колонки Product → `Review board`.
2. Hero задаёт тезис «Where AI analysis becomes a human decision».
3. Скролл проводит через 7 секций: hero (light) → зачем команде доска
   (editorial-split, light) → что на доске (bento, dark) → human-in-the-loop
   (pinned-multi-screen, light) → сравнение и leaderboard (editorial-split,
   dark) → decision trail (full-bleed-statement, light) → final CTA (dark).
4. CTA `Book a Demo` (`/#demo`).

## Business Rules

- Движение — только через data-атрибуты (`data-reveal` / `data-pin`) и
  смонтированный `<ScrollFX/>` (после `<Footer/>`). Никаких per-section
  `useEffect`, никаких правок `ScrollOrchestrator` / `ScrollFX`.
- Только канонические токены `:root` и существующие глобальные классы; без
  новых цветов/теней/радиусов, без `--wf-*` / `--sd-*`.
- Jury Score — 0.0–10.0 per dimension по P1–P6 (human); виден Δ между AI и
  human score.
- Leaderboard ранжирует по human `Final Score` (веса критериев применены к
  Jury Score); `AI Total Score` — advisory baseline, не ранжирует.
- Статусы участника — 5: AI Report Ready / In Review / Scored / Not Scored /
  Error.
- Audit trail — AI score и human score видны вместе (объяснимость позже).
- Spread судей — `<1.5` / `1.5–2.99` / `≥3.0` (сигнал borderline-кейсов).
- Один организатор на проект в MVP.
- НЕ обещать multi-organizer / blind voting / deliberation; НЕ выводить
  WINNER / TOP-3 / compare-with-#1 бейджи; разлочка leaderboard и публичные
  ссылки — post-MVP.
- `prefers-reduced-motion` тих: контент виден (reveal статичны, pin расжат).

## Edge Cases

- Узкие экраны: split-секции схлопываются в один столбец; bento → 1 колонка;
  pin расжимается на mobile (media-query), медиа уходит в `order:-1`;
  HITL-flow вертикальный, стрелка поворачивается на 90°.
- Reduced-motion: reveal статичны, pin-шаги все видны, весь контент доступен.
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
- `.media-ph` примитив; `.pipe-*` / `.hitl-*` паттерны; `SiteHeader light`,
  `Footer`.

### Blocks
- генерацию реальных ассетов для слотов hero / board / hitl.

## Deliverables

- `web/src/app/product/review-board/page.tsx`
- CSS-блок `.review-board …` в `web/src/app/globals.css`
- footer-ссылка в `web/src/components/Footer.tsx` (колонка Product)
- `wiki/stories/13-review-board.md`

## Acceptance Criteria

- [ ] маршрут `/product/review-board` доступен и рендерится
- [ ] страница обёрнута в `SiteHeader light` + `Footer`; `<ScrollFX/>`
      смонтирован после `<Footer/>`
- [ ] собраны ровно 7 секций из «Структура секций» брифа (последняя — Final CTA)
- [ ] есть pinned-multi-screen HITL (секция 4) и светлый full-bleed statement
      (секция 6); ≥1 тёмная полоса; ≥5 разных архетипов; чередование light/.ink
- [ ] использованы реальные факты (Jury Score 0.0–10.0 per P1–P6; ранжирование
      по human Final Score; 5 статусов участника; AI Total Score advisory;
      audit trail AI+human вместе; spread `<1.5`/`1.5–2.99`/`≥3.0`; один
      организатор MVP) — без выдуманных цифр
- [ ] обёртка `<main className="review-board">`
- [ ] НЕ обещаны multi-organizer / blind / deliberation; нет WINNER / TOP-3 /
      compare-with-#1 бейджей; разлочка leaderboard и публичные ссылки не
      обещаны как готовые
- [ ] footer-ссылка (колонка Product) `Batch results` → `Review board`
      `/product/review-board`; остальные product/trust-ссылки не тронуты
- [ ] использованы только канонические токены/классы (нет `--wf-*` / `--sd-*`,
      новых цветов/теней/радиусов)
- [ ] media-ph в hero + доске + треке; без горизонтального скролла страницы
- [ ] движение через data-атрибуты + `ScrollFX`, без per-section `useEffect`
- [ ] `prefers-reduced-motion` тих (контент виден); split на mobile в один
      столбец; pin расжат
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
- Multi-organizer / blind voting / deliberation mode — post-MVP; не обещать.
- Compare-with-#1 и WINNER/TOP-3 бейджи — в UI MVP не выводятся (scope.md
  AC8.7); сравнение подаётся без этих ярлыков.
- Разлочка/версионирование leaderboard — post-MVP.
- Публичные ссылки на отчёты для участников — post-MVP.

## Change Log

- 2026-06-16 - created
</content>
</invoke>
