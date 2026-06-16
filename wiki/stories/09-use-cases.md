---
status: draft
version: 0.1
updated: 2026-06-16
linear_project:
linear_parent_issue:
linear_issues:
---

# Story 09 - Use Cases page (/trust/use-cases)

Status: Draft
Owner:
Team:
Priority:
Linear Mapping: Project by default

## Summary

Коротко:
- что меняем — добавляем внутреннюю Next.js-страницу `/trust/use-cases` как
  Apple-grade scroll-страницу по образцу `/trust/security-privacy` и
  `/trust/consistency-reliability`.
- зачем меняем — Trust-раздел должен показывать, где применяется EvalLense и
  что получает каждый сегмент, чтобы посетитель узнал свой рабочий сценарий.
- ожидаемый эффект — VC-фонды, акселераторы, ангелы, корпоративные команды,
  организаторы конкурсов/хакатонов, грант-программы и университеты видят, что
  один batch-review закрывает их сценарий: единые критерии, evidence-отчёты,
  leaderboard и человек в финале.

## Problem

- Trust-раздел покрывает methodology, consistency, prompt injection и security,
  но нет страницы про сегменты применения.
- Посетитель не видит, что продукт полезен именно в его сценарии (dealflow,
  cohort selection, конкурс, грант-раунд) и что все сегменты получают один и тот
  же набор инструментов.
- Footer-колонка Trust не содержит пункта `Use cases`.

## Goal

После завершения:
- страница `/trust/use-cases` доступна, обёрнута в `SiteHeader light` + `Footer`,
  собрана по 7 секциям брифа, со scroll-driven движением через `ScrollFX`.
- footer-nav (колонка Trust) ведёт на новую страницу.
- использованы реальные подтверждённые факты (8 сегментов, Pitch mode P1–P6,
  6 независимых судей J-P1…J-P6, ранжирование по human Final Score, 400+
  внутренних прогонов) — без выдуманных кейсов, логотипов и метрик внедрений.

## Scope

### In scope
- `web/src/app/trust/use-cases/page.tsx` (Server Component + metadata).
- page-scoped CSS под обёрткой `.usecases …` в конце `web/src/app/globals.css`.
- footer-ссылка в `web/src/components/Footer.tsx` (колонка Trust) —
  `/trust/use-cases`.
- story-файл `wiki/stories/09-use-cases.md`.

### Out of scope
- генерация реальных ассетов (используются видимые `.media-ph`).
- правки `ScrollOrchestrator`/`ScrollFX`, секций главной, других trust-страниц.
- header-nav (бриф: `in_header_nav: false`).
- новые токены/цвета/тени/радиусы; новые пакеты.
- реальные client-кейсы/логотипы/цифры внедрений (Case Studies — отдельно).
- секция «граница MVP» — удалена пользователем из брифа, не восстанавливать.
- обещания Hackathon mode (H1–H6 / code review) — post-MVP.

## Users / Actors

- primary user: VC-фонды, акселераторы, ангелы, корпоративные инноваторы,
  организаторы конкурсов/хакатонов, грант-программы, университеты.
- system actor: статический рендер Next.js (страница без backend/process.env).

## Source of Truth

### Wiki
- [[wiki/product/use-cases.md]] — продуктовый бриф (7 секций, факты,
  изображения, SEO) — первичный источник.
- [[wiki/architecture/page-design-patterns.md]] — архетипы, ритм, движок, QA
  (особое внимание horizontal-gallery).
- [[wiki/architecture/design-system.md]] — токены и классы.
- `web/src/app/trust/security-privacy/page.tsx` — структурный эталон.
- `web/src/app/trust/consistency-reliability/page.tsx` — второй образец.

### Notes
- блоки `.security` / `.consistency` в `web/src/app/globals.css` — образец
  page-scoped CSS; `.methodology .judge-lane` / `.report-lane` — образец
  горизонтальной scroll-snap галереи.

### Chat / Working Context
- батч-сборка внутренних страниц по skill `build-pages`.

## Main Flow

1. Пользователь приходит из footer-колонки Trust → `/trust/use-cases`.
2. Hero задаёт тезис «One batch review system, many evaluation workflows».
3. Скролл проводит через 7 секций: общий паттерн (dark full-bleed) → сегменты
   (горизонтальная галерея) → VC + Accelerators (split) → что общего получает
   каждый (dark bento) → прозрачность и обратная связь (split) → final CTA.
4. CTA `Book a Demo` (`/#demo`).

## Business Rules

- Движение — только через data-атрибуты (`data-reveal` / `data-scrub` /
  `data-pin`) и смонтированный `<ScrollFX/>` (после `<Footer/>`). Никаких
  per-section `useEffect`, никаких правок `ScrollOrchestrator`/`ScrollFX`.
- Только канонические токены `:root` и существующие глобальные классы.
- Сегментов применения — 8 (VC, accelerators, angels, corporate, competitions,
  grants, hackathons, universities); галерея показывает 6 карточек-групп.
- Текущий режим — Pitch Competition (P1–P6); хакатоны/конкурсы идут через
  Pitch-методологию (Hackathon/Custom mode post-MVP).
- Панель — 6 независимых судей J-P1…J-P6 по измерениям P1–P6.
- Ранжирование — по human Final Score; AI-оценка не ранжирует.
- 400+ внутренних прогонов — продуктовая история.
- Без выдуманных фактов: никаких реальных кейсов, логотипов, метрик внедрений
  или сегмент-специфичных цифр экономии (нет в доках — open questions).
- `prefers-reduced-motion` тих: контент виден (reveal статичны).

## Edge Cases

- Узкие экраны: split-секции схлопываются в один столбец; bento-грид → 2 / 1
  колонки; горизонтальная галерея остаётся скроллящейся внутри контейнера.
- Reduced-motion: reveal статичны, весь контент виден.
- Горизонтальный скролл страницы запрещён: галерея скроллится только внутри
  `.seg-lane` (`overflow-x:auto`); flex/grid-дети `min-width:0`; медиа без
  фикс-ширин; `media-ph` держит `aspect-ratio`; без `100vw`/фикс-ширин.

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
- генерацию реальных ассетов для слотов hero / segments.

## Deliverables

- `web/src/app/trust/use-cases/page.tsx`
- CSS-блок `.usecases …` в `web/src/app/globals.css`
- footer-ссылка в `web/src/components/Footer.tsx`
- `wiki/stories/09-use-cases.md`

## Acceptance Criteria

- [ ] маршрут `/trust/use-cases` доступен и рендерится
- [ ] страница обёрнута в `SiteHeader light` + `Footer`; `<ScrollFX/>` смонтирован
      после `<Footer/>`
- [ ] собраны ровно 7 секций из текущей «Структура секций» брифа (последняя —
      Final CTA; секция «граница MVP» не восстанавливается)
- [ ] есть горизонтальная scroll-snap галерея сегментов (секция 3) и тёмный
      full-bleed statement (секция 2)
- [ ] ≥5 разных архетипов на 7 секций; чередование light/.ink
- [ ] использованы реальные факты (8 сегментов, Pitch mode P1–P6, 6 судей
      J-P1…J-P6, human Final Score) — без выдуманных кейсов/логотипов/метрик
- [ ] добавлена footer-ссылка (колонка Trust) `/trust/use-cases`; существующие
      ссылки не сломаны
- [ ] использованы только канонические токены/классы (нет `--wf-*` / `--sd-*`,
      новых цветов/теней/радиусов)
- [ ] media-ph в hero; галерея скроллится внутри контейнера, не двигает страницу
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
- Хакатоны/конкурсы как сегмент vs Hackathon mode — mode post-MVP; на странице
  не обещать H1–H6/code review, подавать как Pitch-методологию.
- Кейсы и логотипы — реальных клиент-кейсов/пилотов в доках нет (Case Studies
  вынесены отдельно); не выдумывать логотипы и цифры внедрений.
- Сегмент-специфичные метрики (сколько часов экономит и т.п.) — нет
  подтверждённых; оставлены качественные формулировки.

## Change Log

- 2026-06-16 - created
