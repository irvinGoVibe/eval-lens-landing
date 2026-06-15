---
status: draft
version: 0.1
updated: 2026-06-15
linear_project:
linear_parent_issue:
linear_issues:
---

# Story 03 - Доработки блога (рубрики, deep-link репостов, блок на главной)

Status: Draft
Owner:
Team: —
Priority:
Linear Mapping: Project + child issues

## Summary

- **Что меняем** — три независимые доработки блога одной story (каждая = отдельный issue/PR): (A) рубрики 6→3 + перекатегоризация; (B) deep-link репостов `/blog?loop=<id>`; (C) лента последних статей блоком на главной.
- **Зачем** — рубрики к минимально достаточному набору (`newsroom.md`); deep-link даёт расшариваемую ссылку на репост без отдельной страницы (`blog.md`); блок на главной — единственное динамическое на главной (`cms.md` §3).
- **Эффект** — навигация по 3 рубрикам, рабочие прямые ссылки на репосты, выход в блог с главной; работает и на static, и на Supabase.

## Problem

- **A.** `Category` в коде всё ещё 6 значений (`cms/types.ts`), хотя продукт/архитектура зафиксировали 3; плитка «Photos & Brand» устарела.
- **B.** `blog.md` §Маршруты описывает `/blog?loop=<id>`, но `InTheLoop` не читает URL — поведения нет.
- **C.** `cms.md` §3 описывает блок блога на главной, но в `app/page.tsx` его нет.

## Goal

- `Category` = 3 значения, все посты перекатегоризированы, сборка проходит; плитки `MoreFromNewsroom` выровнены.
- `/blog?loop=<id>` открывает попап на маунте; open/close/листание синхронизируют URL; вся навигация попапа цела; прод-сборка не падает.
- На главной — лента последних статей из тех же данных, что `/blog`, без отдельной сущности и без вмешательства в scroll-оркестрацию.

## Scope

### In scope
- **(A)** Сузить `Category` в `web/src/lib/cms/types.ts` до `"Press Release" | "Product" | "Research"`.
- **(A)** Перекатегоризировать все уходящие посты (13) атомарно с правкой типа; цель — активный `BLOG_SOURCE` (static → `POSTS`; supabase → строки + enum/CHECK).
- **(A)** Выровнять лейблы плиток `MoreFromNewsroom` (убрать «Photos & Brand»), ссылки на `/blog/all`; проверить грид `blog-more-grid`.
- **(B)** В `InTheLoop.tsx` читать `?loop=<id>` (`useSearchParams`) на маунте → открыть попап нужного `LoopPost.id`; open/close/листание → `router.replace({scroll:false})`.
- **(B)** Обернуть `InTheLoop` (searchParams-часть) в `<Suspense>` в `app/blog/page.tsx`.
- **(C)** В `app/page.tsx` блок-лента последних статей из `getAllPosts()` + `ArticleCard`.

### Out of scope
- Фильтр плиток по рубрике — не делаем (ведут на `/blog/all`).
- Отдельная страница под репост; отдельная контент-сущность под блок главной.
- Правка `ScrollOrchestrator.tsx` и `components/sections/*`.
- Изменение сигнатур `getAllPosts`/`getLoopPosts`, `CategoryTag.tsx`, кнопки «Share ↗».
- Миграция в Supabase (Story 01), админка (Story 02). Новые npm-пакеты не требуются.

## Users / Actors

- primary: читатель Newsroom (3 рубрики, репост по прямой ссылке, выход в блог с главной).
- system: контент-слой `lib/blog.ts`/`lib/cms/*` (источник под `BLOG_SOURCE`); Next.js рендер (SC главной и `/blog`, CC `InTheLoop`).

## Source of Truth

### Wiki
- [[blog]] — §Маршруты (deep-link), §Category (6→3), §Компоненты, §Открытые вопросы (More не фильтрует), §CMS-слой.
- [[newsroom]] — §Рубрики (правило свёртки), §In the Loop (deep-link), §More.
- [[cms]] — §3 (блок на главной = единственное динамическое).
- [[01-blog-supabase-backend|Story 01]], [[02-cms-admin|Story 02]] — смежные стори (не блокеры).

### Notes
- (не зафиксировано)

### Chat / Working Context
- repo-reader: `Category` в `cms/types.ts:7-13`; `blog.ts` — фасад `BLOG_SOURCE`; `MoreFromNewsroom` 4 плитки на `/blog/all`; `InTheLoop` без `useSearchParams`; `map.ts:45` слепой `as Category`; требование `<Suspense>` (Next 16).

## Main Flow

**(A)** 1) определить `BLOG_SOURCE`; 2) перекатегоризировать 13 постов по маппингу; 3) атомарно сузить `Category`; 4) выровнять плитки + грид.
**(B)** 1) `/blog?loop=<id>`; 2) `InTheLoop` на маунте читает `?loop`, открывает попап; 3) open/close/листание → `router.replace({scroll:false})`; 4) «Share ↗» → `href`.
**(C)** 1) `app/page.tsx` вызывает `getAllPosts()`; 2) рендерит ленту через `ArticleCard`; 3) карточки под тёмный фон.

## Business Rules

- Рубрики на старте — ровно 3: `Press Release`, `Product`, `Research`.
- Правило свёртки (`newsroom.md`): Update/Feature/Quick Read → Product (или Research если объяснительный); Photos → обычный пост.
- **Рекомендуемый per-slug маппинг (требует подтверждения user — точного в wiki нет):**

  | Текущая рубрика | slug | Рекомендуемая рубрика |
  | --- | --- | --- |
  | Press Release | evallense-launches-ai-jury, security-soc2-type-ii | Press Release (без изменений) |
  | Research | prompt-injection-defenses, calibrating-the-jury | Research (без изменений) |
  | Update | deck-vault-secure-pipeline, scoring-matrix-redesign, exporting-reports-to-notion, rubric-templates-by-stage | Product |
  | Feature | explainable-reports-every-score, inside-the-deck-vault | Product |
  | Feature | rubric-design-principles, what-a-strong-deck-looks-like | Research |
  | Quick Read | batch-review-in-one-afternoon | Product |
  | Quick Read | human-in-the-loop-decisions, the-cost-of-a-missed-deal | Research |
  | Quick Read | founding-story | Press Release |
  | Photos | behind-the-lens-photos | Press Release |

  Итог ≈ Press Release 4 / Product 7 / Research 6 — пересчитать после подтверждения.
- **Проверить общее число постов:** доки/Story 01 говорят «16», фактический подсчёт даёт **17** (PR 2 + Update 4 + Quick Read 4 + Feature 4 + Research 2 + Photos 1). Свериться при реализации и поправить счёт в `blog.md`/Story 01.
- Атомарность: тип `Category` + данные в одном PR (иначе TS-ошибка сборки).
- Deep-link: ключ `LoopPost.id`; `router.replace` без скролла; «Share ↗» — на `href` соцсети, не на внутренний URL.
- More-плитки не фильтруют, ведут на `/blog/all`. Блок главной — те же данные, что `/blog`, статичный, без собственных scroll-`useEffect`.

## Edge Cases

- **A:** в данных остался пост с уходящей рубрикой → TS-ошибка сборки (атомарность нарушена). Грид `blog-more-grid` рассчитан на 4 плитки → при 3 проверить раскладку. `map.ts:45` (`as Category`) не валидирует рубрику из БД в рантайме.
- **B:** `/blog?loop=<несуществующий id>` → попап не открывать (graceful no-op). Отсутствие `<Suspense>` вокруг `useSearchParams` → прод-сборка падает (`missing-suspense-with-csr-bailout`), в dev не воспроизводится. Синхронизация URL не должна ломать Esc/←/→/клик-закрытие, lock body-scroll и не ремоунтить (потеря `activeIndex`).
- **C:** блок не должен сдвинуть scroll-якоря/прогресс `ScrollOrchestrator`; карточки `blog-*` под светлый Newsroom — на тёмной главной нужна адаптация; `getAllPosts()` пуст → блок не рендерить.

## Technical Impact

- **frontend:** `web/src/lib/cms/types.ts` (Category 6→3); `web/src/lib/blog.ts` (`POSTS` при static); `web/src/components/blog/MoreFromNewsroom.tsx` (лейблы) + возможно `globals.css` (грид `blog-more-grid`); `web/src/components/blog/InTheLoop.tsx` (deep-link, синхронизация URL); `web/src/app/blog/page.tsx` (`<Suspense>`); `web/src/app/page.tsx` (блок-лента) + возможная адаптация `blog-*` под тёмный фон.
- **backend:** нет.
- **database:** только при `BLOG_SOURCE=supabase` — строки `articles` (перекатегоризация) + enum/CHECK рубрик(3); опционально рантайм-валидация / CHECK против слепого `as Category`.
- **infrastructure:** новых пакетов нет; `pnpm build` запускать только по явной просьбе user (CLAUDE.md).

## Dependencies

### Depends on
- В основном **независима** от Story 01/02: код (тип, deep-link, блок главной) работает и на статическом источнике.
- Точка зависимости — **перекатегоризация данных (A)**: нацелена на активный `BLOG_SOURCE`. При `static` правится `POSTS` в `blog.ts`; при `supabase` (после Story 01) — строки + enum в БД. Какой источник активен на момент реализации — open question.

### Blocks
- (не зафиксировано)

## Deliverables

- **Issue/PR A — Рубрики 6→3:** `Category` сужен до 3; все посты в активном источнике с валидной рубрикой; `MoreFromNewsroom` без «Photos & Brand»; `blog-more-grid` корректен при 3 плитках; сборка проходит.
- **Issue/PR B — Deep-link репостов:** `/blog?loop=<id>` открывает попап на маунте; URL синхронизируется при open/close/листании; `<Suspense>` вокруг `InTheLoop`; навигация попапа и lock body-scroll целы; прод-сборка не падает.
- **Issue/PR C — Блок блога на главной:** лента последних статей на `/` из `getAllPosts()` + `ArticleCard`; без новой контент-сущности; без правок `ScrollOrchestrator`/секций; scroll-якоря не сдвинуты.
- Патч документации при решении open questions (маппинг рубрик, валидация в `map.ts`).

## Acceptance Criteria

**(A) Рубрики 6→3**
- [ ] **Given** тип `Category` в `types.ts`, **when** открыть файл, **then** значений ровно 3: `"Press Release" | "Product" | "Research"`.
- [ ] **Given** активный `BLOG_SOURCE`, **when** перечислить рубрики всех постов, **then** каждая ∈ {Press Release, Product, Research} (нет Update/Quick Read/Feature/Photos).
- [ ] **Given** изменение типа и данных, **when** `pnpm build` (по явной просьбе user), **then** сборка проходит без TS-ошибок.
- [ ] **Given** плитки `MoreFromNewsroom`, **when** открыть `/blog`, **then** ни одна не «Photos & Brand»; лейблы под 3 рубрики; все ведут на `/blog/all`.
- [ ] **Given** `blog-more-grid`, **when** отрендерено 3 плитки, **then** раскладка не сломана.

**(B) Deep-link репостов**
- [ ] **Given** `/blog?loop=<существующий id>`, **when** страница загружается, **then** попап нужного `LoopPost` открыт сразу.
- [ ] **Given** открытый попап, **when** открыть/закрыть/перелистнуть, **then** URL обновляется через `router.replace` без скролла.
- [ ] **Given** `/blog?loop=<несуществующий id>`, **when** загрузка, **then** попап не открывается, ошибки нет.
- [ ] **Given** открытый попап, **when** Esc / ← / → / клик вне, **then** навигация и закрытие работают; body-scroll лочится/разлочивается; `activeIndex` не теряется.
- [ ] **Given** «Share ↗», **when** клик, **then** ведёт на `href` соцсети (не на `/blog?loop=`).
- [ ] **Given** `useSearchParams` в `InTheLoop`, **when** `pnpm build` (по просьбе), **then** нет `missing-suspense-with-csr-bailout` (есть `<Suspense>`).

**(C) Блок на главной**
- [ ] **Given** главная `/`, **when** открыть, **then** виден блок ленты статей из `getAllPosts()` + `ArticleCard`.
- [ ] **Given** данные блока, **when** сравнить с `/blog`, **then** источник тот же (без отдельной сущности).
- [ ] **Given** добавленный блок, **when** diff, **then** `ScrollOrchestrator.tsx` и `components/sections/*` не изменены; нет scroll-`useEffect` в блоке.
- [ ] **Given** прокрутка главной, **when** блок добавлен, **then** scroll-якоря/прогресс не сдвинуты (визуально, по просьбе user).

## Open Questions

- Per-slug маппинг 13 постов (см. Business Rules) — подтвердить рекомендованный или скорректировать.
- Актуальный `BLOG_SOURCE` на момент реализации (static → `POSTS`; supabase → строки + enum) — куда вносить перекатегоризацию.
- Место (после Bento? своя секция?) и тема (карточки `blog-*` под светлый Newsroom, главная тёмная) блока на главной.
- Нужна ли рантайм-валидация рубрики в `lib/cms/map.ts` / CHECK в БД (сейчас слепой `as Category`).
- Сверить общее число постов (16 в доках vs 17 по факту).

## Linear Publish Plan

(Linear не подключён — раздел не заполняется; трекинг в story-файле)

### Publish Mode
- [ ] Project + child issues
- [ ] Issues only

### Issues
- [ ] (Linear не подключён)

## Definition of Done

- [ ] source logic зафиксирована в wiki (рубрики/deep-link/блок — уже в `blog.md`/`newsroom.md`/`cms.md`; маппинг и решение по валидации дописаны при подтверждении)
- [ ] реализация завершена (A, B, C — три PR)
- [ ] acceptance criteria подтверждены
- [ ] изменения отражены в relevant docs (снять пункт «расхождение 6 значений» в `blog.md` §Category после A)

## Change Log

- 2026-06-15 - created
