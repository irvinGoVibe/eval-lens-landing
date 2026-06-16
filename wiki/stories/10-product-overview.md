---
status: draft
version: 0.1
updated: 2026-06-16
linear_project:
linear_parent_issue:
linear_issues:
---

# Story 10 - Product Overview page (/product)

Status: Draft
Owner:
Team:
Priority:
Linear Mapping: Project by default

## Summary

Коротко:
- что меняем — добавляем внутреннюю Next.js-страницу `/product` (Product
  Overview) как Apple-grade scroll-страницу по образцу `/trust/security-privacy`
  и `/trust/consistency-reliability`.
- зачем меняем — нужна одна страница, объясняющая весь рабочий процесс
  EvalLense: что делает продукт, как устроен workflow организатора и какие
  модули задействованы при оценке.
- ожидаемый эффект — организаторы (VC-фонды, акселераторы, конкурсы) видят
  EvalLense как operating layer для пакетной оценки питч-деков: сбор заявок,
  оценка 6 AI-судьями, evidence-отчёты, Review Board с leaderboard — и человек
  в финале.

## Problem

- Product-раздела нет: footer-колонка Product ведёт `Overview` на якорь
  `/#problem` главной, отдельной страницы-обзора продукта нет.
- Посетитель не видит сквозной workflow одним местом — что входит, как идёт
  pipeline оценки и из каких модулей собран продукт.
- Нет страницы, на которой можно показать pinned путь организатора (7 шагов) и
  горизонтальную галерею 6 AI-судей.

## Goal

После завершения:
- страница `/product` доступна, обёрнута в `SiteHeader light` + `Footer`,
  собрана по 8 секциям брифа, со scroll-driven движением через `ScrollFX`.
- footer-nav (колонка Product) ведёт `Overview` на `/product`.
- использованы реальные подтверждённые факты (7-шаговый путь организатора,
  pipeline Decoder→Judges→Summarizer→Scoring→Report, 6 независимых судей
  J-P1…J-P6, 3 модуля, шкала 0.0–10.0, ранжирование по human Final Score) —
  без выдуманных метрик; Hackathon/Custom как доступные режимы не обещать.

## Scope

### In scope
- `web/src/app/product/page.tsx` (Server Component + metadata).
- page-scoped CSS под обёрткой `.product-overview …` в конце
  `web/src/app/globals.css`.
- footer-ссылка в `web/src/components/Footer.tsx` (колонка Product) — `Overview`
  → `/product` (только эта строка).
- story-файл `wiki/stories/10-product-overview.md`.

### Out of scope
- генерация реальных ассетов (используются видимые `.media-ph`).
- правки `ScrollOrchestrator`/`ScrollFX`, секций главной, других страниц/секций.
- header-nav (бриф: `in_header_nav: false`).
- новые токены/цвета/тени/радиусы; новые пакеты.
- обещание Hackathon/Custom режимов (post-MVP).
- Debug Mode и внутренние инструменты.

## Users / Actors

- primary user: организаторы — VC-фонды, акселераторы, конкурсы; те, кто решает,
  стоит ли внедрять продукт.
- system actor: статический рендер Next.js (страница без backend/process.env).

## Source of Truth

### Wiki
- [[wiki/product/product.md]] — продуктовый бриф (8 секций, факты, изображения,
  SEO) — первичный источник.
- [[wiki/architecture/page-design-patterns.md]] — архетипы, ритм, движок, QA.
- [[wiki/architecture/design-system.md]] — токены и классы.
- `web/src/app/trust/security-privacy/page.tsx` — структурный эталон.
- `web/src/app/trust/consistency-reliability/page.tsx` — второй образец.

### Notes
- блоки `.security` / `.consistency` / `.usecases` в `web/src/app/globals.css` —
  образец page-scoped CSS; `.methodology .pipe-*` — образец pinned-multi-screen;
  `.methodology .judge-lane` / `.usecases .seg-lane` — образец горизонтальной
  scroll-snap галереи.

### Chat / Working Context
- батч-сборка внутренних страниц по skill `build-pages`.

## Main Flow

1. Пользователь приходит из footer-колонки Product → `/product`.
2. Hero задаёт тезис «The operating layer for structured pitch evaluation».
3. Скролл проводит через 8 секций: hero (light) → путь организатора (pinned,
   dark, 7 шагов) → конвейер оценки (split + scrub, light) → три модуля (bento,
   dark) → AI-жюри (horizontal-gallery, light, 6 судей) → почему это важно
   (split, light) → что вы получаете (bento/stat, dark) → final CTA (dark).
4. CTA `Book a Demo` (`/#demo`).

## Business Rules

- Движение — только через data-атрибуты (`data-reveal` / `data-scrub` /
  `data-pin`) и смонтированный `<ScrollFX/>` (после `<Footer/>`). Никаких
  per-section `useEffect`, никаких правок `ScrollOrchestrator`/`ScrollFX`.
- Только канонические токены `:root` и существующие глобальные классы; без
  новых цветов/теней/радиусов, без `--wf-*` / `--sd-*`.
- Путь организатора — ровно 7 шагов (Login → Dashboard → Wizard → Collect →
  Judge → Review → Leaderboard).
- Pipeline оценки — 5 стадий (Decoder → Judges → Summarizer → Scoring → Report).
- Модулей продукта — 3 (Entry Hub · Evidence-Based Reports · Review Board).
- Жюри — 6 независимых судей J-P1…J-P6 по измерениям P1–P6; судьи не видят
  оценок друг друга.
- Шкала оценки 0.0–10.0; ранжирование — по human Final Score, не по AI.
- Текущий режим — Pitch Competition (P1–P6); Hackathon/Custom — post-MVP, как
  доступные не подавать.
- Без выдуманных публичных цифр (число прогонов, экономия времени) — нет в
  доках → open questions.
- `prefers-reduced-motion` тих: контент виден (reveal статичны, pin landed).

## Edge Cases

- Узкие экраны: split-секции схлопываются в один столбец; bento-грид → 2 / 1
  колонки; pinned-секция расжимается (position:static, min-height:0); шаги
  остаются раскрытыми.
- Reduced-motion: reveal статичны, pin-шаги видны, весь контент доступен.
- Горизонтальный скролл страницы запрещён: галерея судей скроллится только
  внутри `.judges-lane` (`overflow-x:auto`); flex/grid-дети `min-width:0`;
  медиа без фикс-ширин; `media-ph` держит `aspect-ratio`; без `100vw`.

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
- генерацию реальных ассетов для слотов hero / flow / pipeline / modules.

## Deliverables

- `web/src/app/product/page.tsx`
- CSS-блок `.product-overview …` в `web/src/app/globals.css`
- footer-ссылка в `web/src/components/Footer.tsx` (колонка Product)
- `wiki/stories/10-product-overview.md`

## Acceptance Criteria

- [ ] маршрут `/product` доступен и рендерится
- [ ] страница обёрнута в `SiteHeader light` + `Footer`; `<ScrollFX/>`
      смонтирован после `<Footer/>`
- [ ] собраны ровно 8 секций из «Структура секций» брифа (последняя — Final CTA)
- [ ] есть pinned-multi-screen «путь организатора» (7 шагов, секция 2) и
      horizontal-gallery 6 судей (секция 5)
- [ ] ≥5 разных архетипов на 8 секций; чередование light/.ink (≥1 тёмная полоса)
- [ ] использованы реальные факты (7 шагов, pipeline из 5 стадий, 6 судей
      J-P1…J-P6, 3 модуля, human Final Score) — без выдуманных цифр; Hackathon/
      Custom как доступные не обещаны
- [ ] обёртка `<main className="product-overview">` (не `.product`)
- [ ] footer-ссылка (колонка Product) `Overview` → `/product`; остальные
      product/trust-ссылки не тронуты
- [ ] использованы только канонические токены/классы (нет `--wf-*` / `--sd-*`,
      новых цветов/теней/радиусов)
- [ ] media-ph в hero + трек шагов + pipeline; галерея судей скроллится внутри
      контейнера, не двигает страницу
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
- Hackathon/Custom режимы — post-MVP; на странице не обещать как доступные.
- Публичные цифры (число прогонов, экономия времени) — брать только из
  утверждённых материалов; не выдумывать.
- Tagline hero — из утверждённых маркетинг-материалов.
- Debug Mode — внутренний инструмент; на публичной странице не показывать.

## Change Log

- 2026-06-16 - created
