---
status: done
version: 0.3
updated: 2026-06-15
linear_project:
linear_parent_issue:
linear_issues:
---

# Story 01 - Blog Supabase Backend (контент-бэкенд блога)

Status: Done
Owner:
Team: —
Priority:
Linear Mapping: Project + child issues

> **Это бэкенд/данные, не сам CMS.** Story 01 = контент-бэкенд на Supabase
> (Postgres + Storage) и чтение фронтом из БД. Интерфейса редактирования здесь
> нет. CMS как инструмент (админка под паролем, создание/правка статей) — это
> следующая, отдельная история, которая сядет на этот бэкенд.

## Summary

- **Что меняем.** Переносим контент Newsroom (16 статей + 6 loop-постов + медиа) из статического `web/src/lib/blog.ts` в Supabase (Postgres + Storage); фронт читает данные оттуда на сервере. Слой данных переезжает в `web/src/lib/cms/`, `lib/blog.ts` — тонкий фасад с прежними сигнатурами.
- **Зачем.** Контент перестаёт быть кодом в git — это бэкенд-фундамент, на который потом сядет CMS (редактирование — отдельная история).
- **Эффект.** UX блога неизменен; 7 файлов-потребителей `@/lib/blog` не трогаются; обновление контента инвалидирует кэш без ре-деплоя (Database Webhook → `revalidateTag`).

## Problem

- Единственный источник контента — статический массив в `web/src/lib/blog.ts`: любое изменение = правка кода + коммит + деплой.
- В `wiki/architecture/blog.md` §CMS-слой и `cms.md` направление на Supabase зафиксировано, но проект не создан, схема не заведена, контент не залит.
- Без этого фундамента невозможны последующие стори (админка, Markdown-тело, deep-link, блок на главной).

## Goal

- Контент блога (статьи, loop-посты, медиа) — в Supabase, не в коде.
- Фронт читает из Supabase на сервере через прежний контракт `lib/blog.ts`.
- Публичное чтение — RLS «только `published`» под anon-ключом; секреты server-side.
- Вид и поведение блога идентичны; 7 файлов-потребителей не изменены.

## Scope

### In scope
- Проект Supabase; публичные Storage-бакеты.
- Схема (миграции): `articles`, `loop_posts` + служебные поля (`id`, `status`, `created_at`/`updated_at`).
- RLS: публичный read только `published` (anon); `service_role` — под будущую запись.
- Перенос данных: 16 статей + 6 loop-постов; медиа (`/assets/bento/*.png`, `hero-intro-2.mp4`, `section2-scroll-2.mp4`) в Storage; ссылки в записях.
- Слой данных: `lib/cms/client.ts` (supabase-js), `lib/cms/map.ts` (маппинг в `Post`/`LoopPost`/`Block`), `lib/blog.ts` — фасад с сохранёнными сигнатурами `getAllPosts/getPostBySlug/getRelatedPosts/getLoopPosts/formatDate`.
- Cache Components: `cacheComponents: true`; `'use cache'` + `cacheTag('blog')`/`cacheTag('post:'+slug)`; `generateStaticParams` из Supabase.
- Route handler `/api/revalidate` (сверяет `REVALIDATE_SECRET` из заголовка) + Database Webhook Supabase, который его дёргает.
- `images.remotePatterns` под Storage; обновить корневой `.env.example` (Supabase URL + anon-ключ; `service_role` — в стори админки; `REVALIDATE_SECRET`).
- На время миграции `POSTS`/`LOOP_POSTS` держим **за фиче-флагом** (переключение источника Supabase ↔ статика), удаляем после успешной сборки.

### Out of scope
- Рубрики 6→3 и перекатегоризация — `Category` переносится как есть (6 значений).
- Тело на Markdown + `remark-directive` — тело как есть (`Block[]`→JSONB), `BlockContent` не трогаем.
- Админка/пароль (`CMS_PASSWORD`).
- Deep-link репостов, медиа-блоки, блок блога на главной.
- Любые изменения UX/вёрстки/анимаций.

## Users / Actors

- primary: посетитель блога — визуально без изменений.
- secondary: редактор — данные уже в Supabase (полноценная админка — отдельная стори).
- system: Next.js Server Components (читают под anon+RLS); Supabase Database Webhook (дёргает route handler ревалидации).

## Source of Truth

### Wiki
- [[blog]] §CMS-слой (v2.3) — фасад-адаптер `lib/cms/*`, таблицы, RLS, Cache Components, Webhook, этапы 1–5 + удаление массивов = эта стори; этап 6 (Markdown/рубрики) — вне scope.
- [[cms]] (v1.6) — функции CMS; доступ/авторизация — вне scope.
- [[newsroom]] (v1.7), [[system]] (v1.3).

### Notes
- (не зафиксировано)

### Chat / Working Context
- Отчёт repo-reader: единственный контент-файл `web/src/lib/blog.ts`, 7 потребителей через `@/lib/blog`, `next.config.ts` пустой, `.env.example` только в корне, `@supabase/*` не установлен, 0 `process.env`/`use cache` в `web/src`.

## Main Flow

1. Создаётся проект Supabase + публичные Storage-бакеты.
2. Миграции: таблицы + служебные поля + RLS «только `published`».
3. Перенос 16 статей + 6 loop (поля один-в-один, `body`→JSONB, `accent` сохранён, `LoopPost.id` стабилен); медиа в Storage, ссылки в записях.
4. Слой `lib/cms/` (`client`+`map`); `lib/blog.ts` → фасад, читает из Supabase на сервере.
5. `cacheComponents: true`; теги; `generateStaticParams` из Supabase; route handler + Webhook; `images.remotePatterns`; `.env.example`.
6. (По подтверждению) удалить массивы или фиче-флаг.
7. Сборка `cd web && pnpm build` — **по явной просьбе** — подтверждает рендер из Supabase.

## Business Rules

- Контракт хелперов неизменен (сигнатуры + сортировка: статьи по `date` desc, loop — без сортировки).
- Доменная модель сохраняется; `Category` = 6 значений; `accent` у всех; `LoopPost.id` = ключ будущего deep-link `?loop=<id>`.
- Тело — `Block[]`→JSONB, рендер прежним `BlockContent`.
- Чтение только на сервере; `InTheLoop`/`AllNewsGrid` получают данные пропсами.
- RLS: публичный read только `published`; `service_role` только server-side, в клиентский бандл не попадает.
- Секреты только в `.env` (в `.gitignore`); в `.env.example` — пустые имена; в клиентский бандл не попадают (CLAUDE.md §Запреты).
- Только pnpm; `package-lock.json` не создавать; `@supabase/supabase-js` — после согласования.

## Edge Cases

- Удаление массивов vs фиче-флаг (простота отката).
- `cover` не уникальны — допустимо (одна ссылка на объект Storage).
- Loop-видео (`kind: "video"`) обязан иметь `video`; галерея (`kind: "photo"`) — `photos` 2+.
- `cacheComponents: true` глобален — проверить, что остальные страницы (главная и т.д.) собираются без регрессий.
- Пустой/недоступный ответ Supabase на сборке — детерминированное поведение (не падать build молча с пустым блогом).
- Webhook ревалидации — route handler проверяет секрет/подпись, иначе любой может инвалидировать кэш.

## Technical Impact

- **frontend:** новый `web/src/lib/cms/` (`client.ts`, `map.ts`); `web/src/lib/blog.ts` → фасад (сигнатуры сохранены); `generateStaticParams` в `web/src/app/blog/[slug]/page.tsx` из Supabase. 7 файлов-потребителей (`app/blog/page.tsx`, `app/blog/all/page.tsx`, `app/blog/[slug]/page.tsx`, `components/blog/ArticleCard.tsx`, `CategoryTag.tsx`, `InTheLoop.tsx`, `AllNewsGrid.tsx`) — не меняются (кроме `generateStaticParams`).
- **backend:** route handler ревалидации (единственный новый эндпоинт).
- **database:** проект Supabase; таблицы `articles`, `loop_posts`; RLS-политики; служебные поля.
- **infrastructure:** публичные Storage-бакеты + залитое медиа; `images.remotePatterns` + `cacheComponents: true` в `web/next.config.ts`; env Supabase (`.env` + `.env.example` + Vercel); Database Webhook → route handler.

## Dependencies

### Depends on
- Проект Supabase создаёт владелец вручную в дашборде и передаёт **URL + anon-ключ** (+ host Storage). `service_role` в этой стори не нужен — заводится в стори админки.
- Согласование новой зависимости `@supabase/supabase-js` (CLAUDE.md «новые зависимости только по согласованию»).
- Сверка сигнатур `'use cache'` / `cacheLife` / `cacheTag` / `revalidateTag` с `node_modules/next/dist/docs/` (нестандартный Next 16, `web/AGENTS.md`).

### Blocks
- Стори «Админка/редактирование под паролем» (`CMS_PASSWORD`).
- Стори «Перевод тела на Markdown + `remark-directive`».
- Стори «Сокращение рубрик 6→3 и перекатегоризация».
- Стори «Deep-link репостов / медиа-блоки / блок блога на главной».

## Deliverables

- Проект Supabase: таблицы `articles` + `loop_posts`, RLS «только `published`», публичные Storage-бакеты.
- Залитый контент: 16 статей + 6 loop-постов + всё медиа в Storage, ссылки в записях.
- `web/src/lib/cms/client.ts`, `web/src/lib/cms/map.ts`, `web/src/lib/blog.ts` (фасад).
- `web/next.config.ts` с `cacheComponents: true` и `images.remotePatterns` под Storage.
- Route handler ревалидации + настроенный Database Webhook.
- Обновлённый корневой `.env.example` (Supabase URL/ключи).
- Решение по массивам `POSTS`/`LOOP_POSTS` (удалены или за фиче-флагом).
- Патч документации: отметить в `blog.md`/`cms.md`, что этапы 1–5 миграции выполнены.

## Acceptance Criteria

- [ ] **Given** проект Supabase создан, **when** смотрим схему, **then** существуют таблицы `articles` и `loop_posts` со служебными полями (`id`, `status` `draft`/`published`, `created_at`/`updated_at`) и доменными полями один-в-один (статья: `slug, category, accent, title, excerpt, date, read_minutes, cover, author, role, body`(jsonb); loop: `id, kind, author, initials, accent, caption, cover, video?, photos?, date, href`).
- [ ] **Given** RLS включён, **when** запрос под anon-ключом, **then** видны только `status = 'published'`; черновики недоступны; запись под anon невозможна.
- [ ] **Given** контент залит, **when** считаем записи, **then** в `articles` 16 статей, в `loop_posts` 6 репостов; `accent` заполнен у всех; `LoopPost.id` сохранён как в исходном массиве.
- [ ] **Given** медиа залито, **when** открываем ссылки из записей, **then** все обложки, оба видео (`hero-intro-2`, `section2-scroll-2`) и фото доступны по публичным URL.
- [ ] **Given** новый слой данных, **when** смотрим публичный API `lib/blog.ts`, **then** экспортируются ровно `getAllPosts()`, `getPostBySlug(slug)`, `getRelatedPosts(slug, limit = 3)`, `getLoopPosts()`, `formatDate(iso)` с прежними сигнатурами и сортировкой.
- [ ] **Given** git-дифф, **when** проверяем 7 файлов-потребителей, **then** в них нет изменений логики потребления данных (кроме `generateStaticParams` в `[slug]/page.tsx`).
- [ ] **Given** `web/next.config.ts`, **when** смотрим конфиг, **then** включён `cacheComponents: true` и заданы `images.remotePatterns` под host Supabase Storage.
- [ ] **Given** хелперы-выборки, **when** читаем код, **then** они помечены `'use cache'` и тегированы `cacheTag('blog')` + `cacheTag('post:'+slug)`; `generateStaticParams` берёт slug'и из Supabase.
- [ ] **Given** Database Webhook настроен на `/api/revalidate`, **when** запись меняется, **then** handler сверяет `REVALIDATE_SECRET` из заголовка и вызывает `revalidateTag('blog')`/`revalidateTag('post:'+slug)`; запрос без верного секрета отклоняется.
- [ ] **Given** `.env.example` (корень), **when** смотрим секцию Database, **then** в ней имена `NEXT_PUBLIC`-URL + anon-ключ + `REVALIDATE_SECRET` с пустыми значениями (без `service_role` — он в стори админки); реальных значений нет; `package-lock.json` в `web/` не создан.
- [ ] **Given** пользователь запустил сборку (`cd web && pnpm build`), **when** билд проходит, **then** `/blog`, `/blog/all`, `/blog/[slug]` рендерятся из Supabase, визуально и поведенчески идентичны; остальные страницы без регрессий.
- [ ] **Given** миграция, **when** смотрим `lib/blog.ts`, **then** на время перехода `POSTS`/`LOOP_POSTS` живут за фиче-флагом (переключение источника без правок компонентов), и удалены после успешной сборки.

## Open Questions

Решено (2026-06-15):
- **Проект Supabase** создаёт владелец вручную в дашборде, передаёт URL + anon-ключ (см. Dependencies).
- **`service_role`** в этой стори не заводим — только чтение (URL + anon). service_role появится в стори админки.
- **Массивы `POSTS`/`LOOP_POSTS`** — на время миграции за фиче-флагом, удаляем после успешной сборки.
- **Ревалидация** — route handler `/api/revalidate`, секрет `REVALIDATE_SECRET` в заголовке; Database Webhook шлёт его, handler сверяет.

Остаётся (не блокер):
- `images.remotePatterns` — точный host Storage пропишем после создания проекта (следствие создания проекта, не решение).

## Linear Publish Plan

(Linear не подключён — раздел не заполняется; story-файл служит трекингом)

### Publish Mode
- [ ] Project + child issues
- [ ] Issues only

### Issues
- [ ] (Linear не подключён)

## Definition of Done

- [ ] source logic зафиксирована в wiki (`blog.md` §CMS-слой, `cms.md`) — отметить выполнение этапов 1–5 миграции
- [ ] реализация завершена
- [ ] acceptance criteria подтверждены (включая сборку по запросу пользователя)
- [ ] изменения отражены в relevant docs (`blog.md`, `cms.md`, `.env.example`)

## Change Log

- 2026-06-15 - created
- 2026-06-15 - переименована в Blog Supabase Backend (бэкенд, не CMS); закрыты open questions (создание проекта — вручную; service_role отложен; массивы за фиче-флагом; ревалидация `/api/revalidate` + секрет)
- 2026-06-15 - closed: бэкенд блога на Supabase (схема+сид live), реализация подтверждена
