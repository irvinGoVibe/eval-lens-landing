---
status: draft
updated: 2026-06-16
linear_project:
linear_parent_issue:
linear_issues:
---

# Story 18 - Pricing page

Status: Draft
Owner:
Team:
Priority:
Linear Mapping: Project by default

## Summary

- **Что меняем:** добавляем новую публичную страницу `/pricing` — тарифы,
  сравнение фич по тарифам, named-сравнение с конкурентами, сетка возможностей,
  FAQ; регистрируем маршрут в header (homepage `SiteHeader`) и footer.
- **Зачем:** снять ценовые возражения и дать организаторам сравнить тарифы и
  альтернативы; вернуть прайсинг, ранее помеченный post-MVP.
- **Эффект:** конверсионная страница «pay per event», цены USD из финмодели v0.4.

## Problem

- На сайте нет страницы цен — покупатель (VC-фонд, акселератор, конкурс) не видит
  модель монетизации и не может сравнить тарифы.
- В header `SiteHeader` есть пункт «Pricing», ведущий на якорь `#pricing`, но
  целевой страницы не существует — «осиротевшая» ссылка.

## Goal

Доступная по `/pricing` страница с 4 публичными тарифами (Free · Стандартный ⭐ ·
Профессиональный · Корпоративный), полной матрицей фич по всем 6 уровням,
честным named-сравнением с конкурентами (✓/✗, без чужих цен), сеткой
возможностей и FAQ — Apple-grade по design-system, на канонических токенах.

## Scope

### In scope
- `web/src/app/pricing/page.tsx` (Server Component, scope-класс `.pricing`).
- Per-page CSS-блок в конце `web/src/app/globals.css` (только токены `:root`).
- Новые **layout-паттерны на токенах**: pricing-cards, comparison-table, faq
  (в каноническом editorial-наборе их нет — осознанное отклонение).
- Регистрация nav: `SiteHeader.tsx` (`#pricing` → `/pricing`), `Footer.tsx`
  (Pricing в колонку Product).
- `.media-ph` плейсхолдеры для визуальных слотов (генератор images не подключён).

### Out of scope
- Биллинг/чекаут/подписки (бэкенда нет; все CTA → `/company/contact`).
- Добавление новых паттернов в `design-system.md`/`page-design-patterns.md`
  (зафиксировано как follow-up open question, не блокирует страницу).
- Локализация валют (только USD).
- Реальная генерация изображений (нет подключённого MCP-генератора).

## Users / Actors

- primary user: организатор-покупатель (VC-фонд, акселератор, конкурс, хакатон).
- system actor: нет (чистая статика).

## Source of Truth

### Wiki
- [[wiki/product/pricing.md]] — продуктовый бриф страницы (первичный источник)
- [[wiki/product/overview.md]] — workflow, 6 судей, модули
- [[wiki/product/sitemap.md]] — маршрут/структура (прайсинг был post-MVP)
- [[wiki/architecture/design-system.md]] / [[wiki/architecture/page-design-patterns.md]]

### Notes
- `ai-jury-prod/notes/research/competitor-landscape.md` — конкуренты/фичи (draft v0.2)

### Chat / Working Context
- Цены/лимиты/доп-пакеты — финмодель `ai_jury_financial_model_v0_7_2_ru` лист
  «Тарифы» (v0.4); решения user по раскладке 4 карточек, named-матрице без цен,
  «от $15 000» для Корпоративного, валюте USD (диалог 2026-06-16).

## Main Flow

1. Hero (statement, light): «Pay per event, not per seat» + Start Free / Book a Demo.
2. 4 pricing-карточки (light): Free · Стандартный ⭐ · Pro · Корп; строка smaller
   plans (Стартовый/Пилотный).
3. Матрица фич × 6 уровней (comparison-table): лимиты, сроки, доп-пакеты, оценка,
   отчёты, review, admin, поддержка.
4. EvalLense vs конкуренты (comparison-table, ink): YouNoodle/Evalato/PitchBob VC
   + EvalLense, ✓/✗, без цен + positioning-строки.
5. Возможности по категориям (bento/gallery, light): Intake · AI Evaluation ·
   Reports · Review · Security · Admin.
6. FAQ (light): что такое заявка, срок, доп-пакеты, подписка ли, пилот, данные.
7. Final CTA (ink): Book a Demo · Start Free.

## Business Rules

- Цены/лимиты — **строго из финмодели v0.4** (Free $0/3, Стартовый $199/15,
  Пилотный $500/40, Стандартный $1500/150, Профессиональный $3900/500,
  Корпоративный от $15000/1000). Не округлять, не выдумывать.
- Безопасность/доверие (prompt-injection safety, privacy, evidence-linked
  scoring, human-in-the-loop) — на всех тарифах, не дифференциатор.
- Сравнение с конкурентами — **без их цен**; только наличие фич (✓/✗/частично).
- Все CTA ведут на `/company/contact` (нет платёжного backend).

## Edge Cases

- Узкая матрица 6 колонок на мобайле → горизонтальный скролл-лейн (scroll-snap),
  без горизонтального скролла страницы целиком.
- `prefers-reduced-motion` → reveal-анимации тихие (примитивы это уважают).
- Длинные заголовки тарифов → `clamp()` + `min-width:0`, без ломки раскладки.

## Technical Impact

- frontend: новая страница + per-page CSS в `globals.css`; правки `SiteHeader.tsx`,
  `Footer.tsx`. Движение — только `data-reveal` через смонтированный `<ScrollFX/>`.
- backend: нет.
- database: нет.
- infrastructure: нет (новые пакеты не вводим).

## Dependencies

### Depends on
- Контент `wiki/product/pricing.md` v0.2 (готов).

### Blocks
- Обновление `sitemap.md` (прайсинг был post-MVP) — follow-up, не блокирует код.

## Deliverables

- `web/src/app/pricing/page.tsx`
- per-page CSS-блок `.pricing { … }` в конце `globals.css`
- правки `SiteHeader.tsx` + `Footer.tsx`
- `.media-ph` слоты + промпты в шапке `page.tsx`
- эта story

## Acceptance Criteria

- [ ] страница доступна по `/pricing`, обёрнута в `PageHeader` + `Footer`, смонтирован `<ScrollFX/>`
- [ ] 4 публичные карточки с ценами USD из финмодели; Стандартный выделен как recommended; Корпоративный = «от $15 000» + Talk to Sales
- [ ] строка smaller plans (Стартовый $199 / Пилотный $500) присутствует
- [ ] матрица фич × 6 уровней; named-сравнение конкурентов (✓/✗, без цен) + positioning-строки; bento возможностей; FAQ
- [ ] `SiteHeader` Pricing → `/pricing` (не якорь); Pricing добавлен в footer (колонка Product) — нет осиротевшего маршрута
- [ ] только канонические токены/классы из design-system; никаких новых цветов/теней/радиусов/шрифтов; lens-акцент ≤1 на экран
- [ ] Apple-grade ритм: чередование light/ink полос, ≥5 разных архетипов, визуальные слоты `.media-ph` где нет ассета (не пустые div)
- [ ] нет горизонтального скролла (mobile/tablet/desktop); заголовки на `clamp()`; flex/grid-дети `min-width:0`; слоты с `aspect-ratio`
- [ ] `cd web && pnpm build` зелёный; `prefers-reduced-motion` уважается
- [ ] (follow-up, не блок) значения фич конкурентов верифицировать перед публикацией; новые паттарны добавить в design-system

## Linear Publish Plan

### Publish Mode
- [ ] Project + child issues
- [ ] Issues only

### Issues
- [ ]

## Definition of Done

- [ ] source logic зафиксирована в wiki (pricing.md)
- [ ] реализация завершена
- [ ] acceptance criteria подтверждены
- [ ] изменения отражены в relevant docs (sitemap follow-up отмечен)

## Change Log

- 2026-06-16 - created (build-pages batch)
