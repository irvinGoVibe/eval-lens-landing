---
status: draft
version: 0.1
updated: 2026-06-16
linear_project:
linear_parent_issue:
linear_issues:
---

# Story 14 - About page (/company/about)

Status: Draft
Owner:
Team:
Priority:
Linear Mapping: Project by default

## Summary

Коротко:
- что меняем — добавляем внутреннюю Next.js-страницу `/company/about` (About)
  как Apple-grade scroll-страницу по образцу `/product`,
  `/trust/use-cases` и `/trust/consistency-reliability` (statement-hero,
  editorial-split, pinned-multi-screen, bento, horizontal-gallery, quiet-cta).
- зачем меняем — нужна company-страница, которая снимает «безличность»
  AI-инструмента: показывает миссию, проблему рынка, путь от **AI Jury** к
  EvalLense, принципы, **команду** (центральный креативный pinned team-блок) и
  сегменты аудитории; ведёт к Book a Demo.
- ожидаемый эффект — организаторы, партнёры и потенциальные сотрудники видят
  людей и философию за продуктом («We are not building an artificial jury. We
  are building a better lens for human judgment.»), а не безличный сервис.

## Problem

- Footer-колонка Company ведёт `About` на пустой якорь `#`; отдельной
  About-страницы нет.
- Продукт воспринимается как безличный AI-инструмент; нет места, где честно
  показать миссию, происхождение (AI Jury / Amazon Nova hackathon / hundreds of
  internal runs), принципы и команду.
- Нужен центр доверия: креативный team-блок с полноростовыми портретами и
  историей перехода от «коллекции AI-агентов» к controlled evaluation system.

## Goal

После завершения:
- страница `/company/about` доступна, обёрнута в `SiteHeader light` + `Footer`,
  собрана по 7 секциям брифа, со scroll-driven движением через `ScrollFX`.
- центральный креативный team-блок (секция 5): тёмная pinned-сцена, 3 участника
  (Yaroslav → Vladislav → Arseniy), имя-подложка за спиной, полноростовой
  портрет `.media-ph` 3:4, текст сбоку; reduced-motion / mobile — статичные
  вертикальные editorial-блоки, весь контент виден.
- footer-nav (колонка Company) ведёт `About` на `/company/about` (замена
  пустого `#`).
- использованы только авторские формулировки из брифа (миссия, проблема,
  story, принципы, био команды, сегменты) — без выдуманных фактов.

## Scope

### In scope
- `web/src/app/company/about/page.tsx` (Server Component + metadata).
- page-scoped CSS под обёрткой `.about …` в конце `web/src/app/globals.css`
  (вкл. `.about .team-*` для креативного блока).
- footer-ссылка в `web/src/components/Footer.tsx` (колонка Company) —
  `<a href="#">About</a>` → `<Link href="/company/about">About</Link>`
  (только эта строка).
- story-файл `wiki/stories/14-about.md`.

### Out of scope
- генерация реальных ассетов / фото команды (используются видимые `.media-ph`).
- правки `ScrollOrchestrator` / `ScrollFX`, секций главной, других
  страниц/секций.
- header-nav (бриф: `in_header_nav: false`).
- новые токены/цвета/тени/радиусы; новые пакеты.
- сборка `/company/contact` (CTA временно ведёт на `/#demo`).

## Users / Actors

- primary user: организаторы (фонды, акселераторы, конкурсы), партнёры,
  потенциальные сотрудники — те, кому важно понять, кто и зачем строит EvalLense.
- system actor: статический рендер Next.js (страница без backend/process.env).

## Source of Truth

### Wiki
- [[wiki/product/about.md]] — продуктовый бриф (7 секций, авторские тексты,
  изображения, SEO) — первичный источник.
- [[wiki/architecture/page-design-patterns.md]] — архетипы, ритм, движок, QA.
- [[wiki/architecture/design-system.md]] — токены и классы.
- `web/src/app/product/page.tsx` — структурный эталон (pin, horizontal gallery).
- `web/src/app/trust/use-cases/page.tsx` — образец `.seg-lane` галереи.
- `web/src/app/trust/consistency-reliability/page.tsx` — образец pinned
  multi-screen + full-bleed statement.

### Notes
- блоки `.product-overview`/`.consistency`/`.usecases` в
  `web/src/app/globals.css` — образцы; `.methodology .pipe-*` для pinned
  multi-screen; `.seg-lane` для галереи.

### Chat / Working Context
- Контент About (миссия, story, принципы, био команды, сегменты) и идея
  креативного team-блока (референс assudamal.com/about) — предоставлены user'ом
  в диалоге. Батч-сборка по skill `build-pages`.

## Main Flow

1. Пользователь приходит из footer-колонки Company → `About`.
2. Hero задаёт миссию «We built EvalLense to help people make better decisions».
3. Скролл проводит через 7 секций: hero/миссия (light) → проблема
   (editorial-split, light) → From AI Jury to EvalLense (pinned-multi-screen,
   dark) → принципы (bento, light) → команда (креативный pinned team-блок,
   dark) → для кого мы строим (horizontal-gallery, light) → final CTA (dark).
4. CTA `Book a Demo` (`/#demo`).

## Business Rules

- Движение — только через data-атрибуты (`data-reveal` / `data-scrub` /
  `data-pin` / `data-pin-stage` / `data-pin-step`) и смонтированный `<ScrollFX/>`
  (после `<Footer/>`). Никаких per-section `useEffect`, никаких правок
  `ScrollOrchestrator` / `ScrollFX`.
- Только канонические токены `:root` и существующие глобальные классы; без
  новых цветов/теней/радиусов, без `--wf-*` / `--sd-*`.
- Тексты — авторские, дословно из брифа; факты не выдумывать.
- Креативный team-блок гейтит контент так, чтобы reduced-motion/mobile показали
  всех трёх участников целиком (портрет + имя + роль + био).
- `prefers-reduced-motion` тих: контент виден (reveal статичны, pin расжат,
  team-блок — вертикальный стек).

## Edge Cases

- Узкие экраны (`max-width:880px`): pinned-секции (3 и 5) расжимаются в
  вертикальный стек; split-секции схлопываются в один столбец; галерея
  `.seg-lane` остаётся горизонтальной внутри своего overflow-контейнера.
- Reduced-motion: reveal статичны, pin-шаги все видны, team-блок —
  вертикальные editorial-блоки, весь контент доступен.
- Горизонтальный скролл страницы запрещён: flex/grid-дети `min-width:0`; медиа
  без фикс-ширин (`max-width:100%`); `media-ph` держит `aspect-ratio`; галерея
  скроллится внутри `overflow-x:auto`; без `100vw`.

## Technical Impact

Какие зоны затрагиваются:
- frontend: новая страница + page-scoped CSS + footer-ссылка.
- backend: нет.
- database: нет.
- infrastructure: нет (статический рендер на Vercel).

## Dependencies

### Depends on
- generic scroll-FX примитивы и `ScrollFX` (Story 04).
- `.media-ph` примитив; `.pipe-*` / `.seg-lane` паттерны; `SiteHeader light`,
  `Footer`.

### Blocks
- генерацию реальных ассетов для слотов hero / story / 3 портретов / segments.

## Deliverables

- `web/src/app/company/about/page.tsx`
- CSS-блок `.about …` в `web/src/app/globals.css`
- footer-ссылка в `web/src/components/Footer.tsx` (колонка Company)
- `wiki/stories/14-about.md`

## Acceptance Criteria

- [ ] маршрут `/company/about` доступен и рендерится
- [ ] страница обёрнута в `SiteHeader light` + `Footer`; `<ScrollFX/>`
      смонтирован после `<Footer/>`
- [ ] собраны ровно 7 секций из «Структура секций» брифа (последняя — Final CTA)
- [ ] **креативный team-блок** (секция 5): pinned-сцена, 3 участника, портреты
      `.media-ph` 3:4, имя-подложка за спиной, био сбоку; reduced-motion / mobile
      — статичные editorial-блоки, контент виден
- [ ] есть ≥2 pinned-multi-screen (секции 3 и 5) + горизонтальная галерея
      (секция 6); чередование light/.ink
- [ ] тексты дословно авторские (миссия, проблема, story, принципы, био,
      сегменты, финальный statement) — без выдуманных фактов
- [ ] обёртка `<main className="about">`
- [ ] media-ph: hero + story + 3 портрета 3:4 + segments; без горизонтального
      скролла страницы
- [ ] использованы только канонические токены/классы (нет `--wf-*` / `--sd-*`,
      новых цветов/теней/радиусов)
- [ ] footer-ссылка (колонка Company) `About` → `/company/about`; остальные
      company-ссылки не тронуты
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

- [ ] source logic зафиксирована в wiki (бриф)
- [ ] реализация завершена
- [ ] acceptance criteria подтверждены
- [ ] изменения отражены в relevant docs

## Open Questions

(перенесено из брифа §Открытые вопросы)
- **Фото команды** — нужны реальные полноростовые cut-out портреты (3:4) для
  креативного блока; пока `.media-ph`.
- **Фамилия Arseniy** — в тексте только имя; уточнить, показывать ли фамилию
  (имя-подложка для Arseniy пока использует имя).
- **«hundreds» vs «400+»** — в About-копии «hundreds of runs», в homepage-
  нарративе «400+»; по умолчанию оставлено авторское «hundreds».
- **Контакт CTA** — Book a Demo ведёт на `/#demo` временно; целевой
  `/company/contact` ещё не собран.

## Change Log

- 2026-06-16 - created
</content>
</invoke>
