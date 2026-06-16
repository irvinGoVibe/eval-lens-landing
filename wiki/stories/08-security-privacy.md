---
status: draft
version: 0.1
updated: 2026-06-16
linear_project:
linear_parent_issue:
linear_issues:
---

# Story 08 - Security & Privacy page (/trust/security-privacy)

Status: Draft
Owner:
Team:
Priority:
Linear Mapping: Project by default

## Summary

Коротко:
- что меняем — добавляем внутреннюю Next.js-страницу `/trust/security-privacy`
  как Apple-grade scroll-страницу по образцу `/trust/prompt-injection-safety` и
  `/trust/consistency-reliability`.
- зачем меняем — Trust-раздел должен объяснять, как EvalLense обращается с
  питч-деками, заявками, отчётами и review-данными как с чувствительной
  информацией: приватная обработка, контролируемый доступ, решения за человеком.
- ожидаемый эффект — фонды, акселераторы и корпоративные команды уверенно
  загружают конфиденциальные деки и запускают приватные batch-оценки, видя
  controlled access и human-owned decisions как trust-слой.

## Problem

- Trust-раздел покрывает methodology, consistency и prompt injection, но нет
  страницы про приватность и контроль доступа.
- Аудитория, работающая с чувствительными деками, финансами и founder-данными,
  не видит, как изолируются проекты и где живут секреты.
- Footer-колонка Trust ведёт пункт `Security & privacy` на заглушку `/#trust`,
  а не на отдельную страницу.

## Goal

После завершения:
- страница `/trust/security-privacy` доступна, обёрнута в `SiteHeader light`
  + `Footer`, собрана по 8 секциям брифа, со scroll-driven движением через
  `ScrollFX`.
- footer-nav (колонка Trust) ведёт на новую страницу.
- использованы реальные подтверждённые архитектурные факты (Supabase Auth +
  httpOnly cookies, RLS `organizer_id = auth.uid()`, роли user/admin/participant,
  server-only secrets + `requireAdmin()`, published-gate `/e/<slug>`, один
  организатор на проект MVP, human Final Score) — без overclaim'а и draft-заглушек.

## Scope

### In scope
- `web/src/app/trust/security-privacy/page.tsx` (Server Component + metadata).
- page-scoped CSS под обёрткой `.security …` в конце `web/src/app/globals.css`.
- footer-ссылка в `web/src/components/Footer.tsx` (колонка Trust) — замена
  заглушки `/#trust` на `/trust/security-privacy`.
- story-файл `wiki/stories/08-security-privacy.md`.

### Out of scope
- генерация реальных ассетов (используются видимые `.media-ph`).
- правки `ScrollOrchestrator`/`ScrollFX`, секций главной, других trust-страниц.
- header-nav (бриф: `in_header_nav: false`).
- новые токены/цвета/тени/радиусы; новые пакеты.
- security-заявления сверх брифа (SOC2 / ISO / шифрование-at-rest / retention) —
  это open questions.

## Users / Actors

- primary user: фонды, акселераторы и корпоративные команды, которым важна
  приватность деков, финансов и founder-данных.
- system actor: статический рендер Next.js (страница без backend/process.env).

## Source of Truth

### Wiki
- [[wiki/product/security-privacy.md]] — продуктовый бриф (8 секций, факты,
  изображения, SEO) — первичный источник.
- [[wiki/architecture/page-design-patterns.md]] — архетипы, ритм, движок, QA.
- [[wiki/architecture/design-system.md]] — токены и классы.
- `web/src/app/trust/prompt-injection-safety/page.tsx` — структурный эталон (pin,
  bento, human-in-the-loop узлы).
- `web/src/app/trust/consistency-reliability/page.tsx` — второй образец.

### Notes
- блоки `.injection` и `.consistency` в `web/src/app/globals.css` — образец
  page-scoped CSS.

### Chat / Working Context
- батч-сборка внутренних страниц по skill `build-pages`.

## Main Flow

1. Пользователь приходит из footer-колонки Trust → `/trust/security-privacy`.
2. Hero задаёт тезис «Private by design, decided by humans».
3. Скролл проводит через 8 секций: почему приватность важна → приватное рабочее
   пространство (dark bento) → контроль доступа → как защищён доступ под капотом
   (pinned) → доставка отчётов → решения под контролем человека → final CTA.
4. CTA `Book a Demo` (`/#demo`); вторичный `Contact Us`.

## Business Rules

- Движение — только через data-атрибуты (`data-reveal` / `data-scrub` / `data-pin`)
  и смонтированный `<ScrollFX/>` (после `<Footer/>`). Никаких per-section
  `useEffect`, никаких правок `ScrollOrchestrator`/`ScrollFX`.
- Только канонические токены `:root` и существующие глобальные классы.
- Auth-слой: Supabase Auth + `@supabase/ssr`, сессия в httpOnly cookies.
- Изоляция данных: Postgres RLS, `organizer_id = auth.uid()` на каждый запрос.
- Роли user / admin / participant; один пользователь может иметь несколько.
- Секреты (service-role, AI Gateway) — только server-side; admin-операции после
  `requireAdmin()`; в клиентский бандл секреты не попадают.
- Публичная форма `/e/<slug>` доступна только при `is_published=true`, иначе 404.
- Один организатор на проект (MVP); participant-facing share отчётов — post-MVP.
- AI Total Score — advisory, не ранжирует; финальное решение и Final Score — за
  человеком.
- Без overclaim'а: никаких SOC2 / ISO / шифрования-at-rest / retention-политик —
  их нет в доках (open questions).
- `prefers-reduced-motion` тих: контент гейтится, для pin-секции есть
  reduced-motion-оверрайд.

## Edge Cases

- Узкие экраны: pinned flow-секция снимает pin (`max-width:880px`) и раскрывает
  все шаги; split-секции схлопываются в один столбец; bento/feature-грид → 1–2
  колонки.
- Reduced-motion: reveal/pin статичны, описания шагов видимы.
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
- генерацию реальных ассетов для слотов hero / access-flow.

## Deliverables

- `web/src/app/trust/security-privacy/page.tsx`
- CSS-блок `.security …` в `web/src/app/globals.css`
- footer-ссылка в `web/src/components/Footer.tsx`
- `wiki/stories/08-security-privacy.md`

## Acceptance Criteria

- [ ] маршрут `/trust/security-privacy` доступен и рендерится
- [ ] страница обёрнута в `SiteHeader light` + `Footer`; `<ScrollFX/>` смонтирован
      после `<Footer/>`
- [ ] собраны ровно 8 секций из «Структура секций» брифа
- [ ] есть тёмный bento-statement (секция 3) и pinned-multi-screen «под капотом»
      (секция 5), плюс человек-в-контуре (секция 7)
- [ ] использованы реальные факты (Supabase Auth + httpOnly cookies, RLS
      `auth.uid()`, роли user/admin/participant, server-only secrets +
      `requireAdmin()`, published-gate `/e/<slug>`, один организатор/проект,
      human Final Score) — без overclaim'а и draft-заглушек
- [ ] добавлена footer-ссылка (колонка Trust) `/trust/security-privacy`;
      существующие ссылки не сломаны
- [ ] использованы только канонические токены/классы (нет `--wf-*` / `--sd-*`,
      новых цветов/теней/радиусов)
- [ ] чередование light/.ink; media-ph в hero и потоке секции 5
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
- Сертификации и шифрование-at-rest: в доках не зафиксировано — не заявлять
  SOC2/ISO/at-rest-encryption, пока не подтверждено. Кандидат в отдельную
  страницу `/security` (Legal/Technical).
- Data retention / удаление деков: политика хранения и удаления не описана —
  уточнить до публичных формулировок.
- Что публично говорить про инфраструктуру (Supabase/Postgres/Vercel) —
  согласовать уровень раскрытия стека на внешнем сайте.
- Share отчётов наружу — post-MVP; на странице подаётся как «осознанная
  доставка», без обещания готовой фичи.

## Change Log

- 2026-06-16 - created
