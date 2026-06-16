---
status: draft
version: 0.1
updated: 2026-06-16
linear_project:
linear_parent_issue:
linear_issues:
---

# Story 16 - Product section hub (/product)

Status: Draft
Owner:
Team:
Priority:
Linear Mapping: Project by default

## Summary

- Собрать разводящую (hub) страницу раздела Product по маршруту `/product`.
- Освободившийся после переноса Overview (`/product/overview`) маршрут `/product`
  становится точкой входа в раздел: открыл — понял, что умеет продукт, и за один
  клик ушёл на любую внутреннюю страницу (Overview, Entry Hub, Evidence-Based
  Reports, Review Board).
- Эффект: «Product» в шапке/навигации ведёт на осмысленный лендинг раздела, а не
  в 404; внутренние страницы получают общий вход.

## Problem

- После переноса Product Overview на `/product/overview` маршрут `/product`
  отдаёт 404, хотя `sectionHref` внутренних страниц и хедер указывают на него.
- У раздела нет точки, где посетитель видит структуру и быстро выбирает страницу.

## Goal

`/product` — живая Apple-grade разводящая страница: роль раздела + карта из
4 внутренних страниц со ссылками + проход «как складывается workflow» + CTA.

## Scope

### In scope
- `web/src/app/product/page.tsx` (новый), обёртка `PageHeader` + `Footer` + `ScrollFX`.
- Общий hub-layout CSS (`.hub …`) в конце `globals.css` (переиспользуется story 17).
- Карта раздела со ссылками на `/product/overview`, `/product/entry-hub`,
  `/product/evidence-based-reports`, `/product/review-board`.
- Footer: заголовок колонки «Product» → ссылка на `/product`; sitemap: узел
  «Product» получает `path: "/product"` (нет осиротевшего маршрута).

### Out of scope
- Контент/правки внутренних страниц раздела.
- Генерация реальных изображений (ставим размеченные `.media-ph`).
- PageHeader-миграция остальных страниц (отдельный поток).

## Users / Actors

- primary user: организатор (VC/акселератор/конкурс), пришедший из хедера «Product».
- system actor: нет (чистая статика).

## Source of Truth

### Wiki
- [[product|Product hub brief]] (`wiki/product/product.md`) — первичный контент.
- [[sitemap|Карта сайта]] §Product — маршруты и состав раздела.
- [[design-system|Design System]] / [[page-design-patterns|Page Design Patterns]].

### Chat / Working Context
- Диалог 2026-06-16: запрос собрать разводящие страницы Product и Trust скиллом
  build-pages.

## Main Flow

1. Hero (statement-hero, light) — «Everything EvalLense does, in one place» + CTA.
2. Full-bleed statement (ink) — роль раздела: workflow от заявки до решения человека.
3. Карта раздела (bento, light) — 4 тайла-ссылки, Overview как feature-тайл.
4. Pinned multi-screen (ink) — «как складывается workflow», 3 шага загораются.
5. Horizontal gallery (light) — «загляните в каждую страницу», 4 карточки-ссылки.
6. Final CTA (ink) — Book a Demo.

## Business Rules

- Контент только из брифа `product.md` / sitemap; чисел продукта не дублируем
  (живут на Overview).
- Один lens-акцент на экран; только канонические токены/классы.

## Edge Cases

- `/product` хаб не должен дублировать глубину Overview — лёгкий wayfinding.
- reduced-motion: контент pin-секции виден без скролла.

## Technical Impact

- frontend: новый route + секции инлайн; общий `.hub` CSS; правки Footer/sitemap.
- backend / database / infrastructure: нет.

## Dependencies

### Depends on
- Существующие внутренние страницы раздела (ссылки карты).

### Blocks
- Ничего.

## Deliverables

- `web/src/app/product/page.tsx`
- `.hub …` блок в `web/src/app/globals.css`
- правки `Footer.tsx` (колонка Product → /product) и `sitemap/page.tsx` (path Product)
- этот story-файл

## Acceptance Criteria

- [ ] страница доступна по `/product`, обёрнута в `PageHeader` + `Footer`, смонтирован `<ScrollFX/>`
- [ ] карта раздела ведёт на все 4 внутренние страницы, ссылки рабочие
- [ ] ≥5 разных архетипов; ≥1 pinned multi-screen; ≥1 тёмный full-bleed statement; ≥1 горизонтальная галерея
- [ ] только токены/классы из design-system; новых цветов/теней/радиусов нет
- [ ] нет горизонтального скролла на mobile/tablet/desktop; заголовки на `clamp()`
- [ ] нет осиротевшего маршрута (footer/sitemap ссылаются на `/product`)
- [ ] `cd web && pnpm build` зелёный; `prefers-reduced-motion` уважается

## Definition of Done

- [ ] source logic зафиксирована в wiki (`product.md`)
- [ ] реализация завершена
- [ ] acceptance criteria подтверждены
- [ ] изменения отражены в relevant docs

## Change Log

- 2026-06-16 - created (build-pages batch)
