---
status: draft
version: 0.1
updated: 2026-06-16
linear_project:
linear_parent_issue:
linear_issues:
---

# Story 17 - Trust section hub (/trust)

Status: Draft
Owner:
Team:
Priority:
Linear Mapping: Project by default

## Summary

- Собрать разводящую (hub) страницу раздела Trust по маршруту `/trust`.
- Открыл — понял, почему результатам EvalLense можно доверять, и за один клик
  ушёл на любую trust-страницу (Methodology, Consistency & Reliability, Prompt
  Injection Safety, Security & Privacy, Use Cases).
- Эффект: «Trust» в навигации ведёт на лендинг раздела, а не в 404.

## Problem

- У раздела Trust нет индекс-страницы: `/trust` отдаёт 404, хотя хедер
  (`sectionHref`) на него указывает.
- Нет точки, где видны слои доверия и удобно выбрать нужную страницу.

## Goal

`/trust` — живая Apple-grade разводящая страница: роль раздела + карта из
5 trust-страниц со ссылками + проход «слои доверия» + сегменты применения + CTA.

## Scope

### In scope
- `web/src/app/trust/page.tsx` (новый), обёртка `PageHeader` + `Footer` + `ScrollFX`.
- Переиспользование общего hub-layout CSS (`.hub …`, заведён в story 16).
- Карта раздела со ссылками на `/trust/methodology`,
  `/trust/consistency-reliability`, `/trust/prompt-injection-safety`,
  `/trust/security-privacy`, `/trust/use-cases`.
- Footer: заголовок колонки «Trust» → ссылка на `/trust`; sitemap: узел «Trust»
  получает `path: "/trust"`. `sectionHref` trust-страниц → `/trust`.

### Out of scope
- Контент/правки внутренних trust-страниц (кроме `sectionHref`).
- Генерация реальных изображений (ставим `.media-ph`).
- Числовые гарантии стабильности без проверенного источника.

## Users / Actors

- primary user: организатор, обосновывающий решение перед фондом/командой/заявителями.
- system actor: нет.

## Source of Truth

### Wiki
- [[trust|Trust hub brief]] (`wiki/product/trust.md`) — первичный контент.
- [[sitemap|Карта сайта]] §Trust — маршруты и состав раздела.
- [[design-system|Design System]] / [[page-design-patterns|Page Design Patterns]].

### Chat / Working Context
- Диалог 2026-06-16: запрос собрать разводящие страницы Product и Trust скиллом
  build-pages.

## Main Flow

1. Hero (statement-hero, light) — «Why you can trust the results» + CTA.
2. Full-bleed statement (ink) — оценка по структурным правилам, решение за человеком.
3. Карта раздела (bento, light) — 5 тайлов-ссылок, Methodology как feature-тайл.
4. Pinned multi-screen (ink) — «слои доверия», 4 шага загораются.
5. Horizontal gallery (light) — «где применяют», 8 сегментов → /trust/use-cases.
6. Final CTA (ink) — Book a Demo.

## Business Rules

- Контент только из брифа `trust.md` / sitemap; числовые гарантии стабильности —
  только с источником, иначе качественные формулировки.
- Один lens-акцент на экран; только канонические токены/классы.

## Edge Cases

- Хаб не дублирует содержание trust-страниц — лёгкий wayfinding.
- reduced-motion: контент pin-секции виден без скролла.

## Technical Impact

- frontend: новый route + секции инлайн; переиспользует `.hub` CSS; правки
  Footer/sitemap + `sectionHref` trust-страниц.
- backend / database / infrastructure: нет.

## Dependencies

### Depends on
- Story 16 (общий `.hub` CSS-блок).
- Существующие trust-страницы (ссылки карты).

### Blocks
- Ничего.

## Deliverables

- `web/src/app/trust/page.tsx`
- правки `Footer.tsx` (колонка Trust → /trust), `sitemap/page.tsx` (path Trust),
  `sectionHref` trust-страниц → `/trust`
- этот story-файл

## Acceptance Criteria

- [ ] страница доступна по `/trust`, обёрнута в `PageHeader` + `Footer`, смонтирован `<ScrollFX/>`
- [ ] карта раздела ведёт на все 5 trust-страниц, ссылки рабочие
- [ ] ≥5 разных архетипов; ≥1 pinned multi-screen; ≥1 тёмный full-bleed statement; ≥1 горизонтальная галерея
- [ ] только токены/классы из design-system; новых цветов/теней/радиусов нет
- [ ] нет горизонтального скролла на mobile/tablet/desktop; заголовки на `clamp()`
- [ ] нет осиротевшего маршрута (footer/sitemap/sectionHref ссылаются на `/trust`)
- [ ] `cd web && pnpm build` зелёный; `prefers-reduced-motion` уважается

## Definition of Done

- [ ] source logic зафиксирована в wiki (`trust.md`)
- [ ] реализация завершена
- [ ] acceptance criteria подтверждены
- [ ] изменения отражены в relevant docs

## Change Log

- 2026-06-16 - created (build-pages batch)
