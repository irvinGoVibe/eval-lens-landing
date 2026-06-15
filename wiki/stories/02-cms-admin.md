---
status: locked
version: 0.3
updated: 2026-06-15
linear_project:
linear_parent_issue:
linear_issues:
---

# Story 02 - CMS Admin (админка редактирования блога под паролем)

Status: Done
Owner:
Team: —
Priority:
Linear Mapping: Project + child issues

> **CMS как инструмент поверх бэкенда Story 01.** Story 01 завела данные блога в Supabase и чтение фронтом. Story 02 даёт интерфейс редактирования: вход под одним паролем, страницы создания/правки статей и loop-постов, загрузку медиа, запись под `service_role`, инвалидацию кэша. Сюда же входит перевод тела статьи на Markdown (данные + рендер) — без него редактировать тело нечем. **Story 02 не реализуется без Story 01.**

## Summary

- **Что меняем.** Поверх бэкенда Story 01 поднимаем admin под паролем (`CMS_PASSWORD`, server-side): CRUD статей и loop-постов, `status` draft↔published, загрузку медиа в Storage, запись под `service_role`, инвалидацию после save/publish. Тело статьи переводим на Markdown — хранение (`body` JSONB→text) и рендер (`remark` + `remark-directive` для `::video`/`:::gallery`). Админка структурирована в две папки — **Блог** (Статьи, Репосты) и **Главная** (Блок «Блог»: выбор и порядок статей в блоке на главной).
- **Зачем.** Story 01 сделала контент данными, но редактировать нечем. Story 02 делает CMS реальным инструментом без участия разработки.
- **Эффект.** Редактор входит по паролю, ведёт контент, грузит медиа, публикует; изменения видны без ре-деплоя. Публичная часть пароля не требует. Секреты — только server-side.

## Problem

- После Story 01 контент в Supabase, но интерфейса нет: в `web/` ни `middleware.ts`, ни `app/api/`, ни server actions, ни auth.
- `service_role` (запись) отложен из Story 01 сюда и не заведён.
- Тело хранится как `Block[]` (JSONB), целевой авторинг — Markdown; пока тело не Markdown, редактировать нечем.
- Без админки невозможны последующие стори (рубрики 6→3, deep-link, блок на главной) — но эта стори их не делает.

## Goal

- Admin-маршруты под паролем; публичные страницы пароля не требуют.
- CRUD статей и loop-постов + `status` draft↔published; черновики публично не видны.
- Тело пишется в Markdown, хранится как text, рендерится `remark` на `article-*` + директивы; сырой HTML off.
- Медиа грузится из админки в Storage.
- Запись под `service_role` строго server-side; после save/publish — инвалидация.
- Админка разбита на две папки: **Блог** (вложенные **Статьи** и **Репосты**) и **Главная** (раздел **Блок «Блог»**).
- На главной редактор управляет блоком блога — выбирает и упорядочивает показываемые статьи; остальные секции главной не редактируются.
- `CMS_PASSWORD`, `SUPABASE_SERVICE_ROLE_KEY` — только server-side.

## Scope

### In scope
- **Авторизация:** `CMS_PASSWORD` из env, сверка только server-side. **Middleware-гейт** (проверяет сессионную куку, редиректит неавторизованные `/admin/*` на вход) + **route handler логина** (сверяет `CMS_PASSWORD`, ставит httpOnly-куку). Публичная часть пароля не требует. Сверить API с Next 16 docs.
- **Информационная архитектура админки** — верхний уровень две папки: **Блог** (вложенные разделы **Статьи** и **Репосты**) и **Главная** (раздел **Блок «Блог»**). Внутри Статей и Репостов — навигация `список ↔ форма`. Структура повторяет области контента из [[cms]] §«Что редактирует CMS».
- **Admin-страницы** — сегмент `app/admin/…` (URL-префикс `/admin`): списки + create/update/delete статей и loop-постов; переключатель `status` draft/published. Без превью черновика (Draft Mode — позже, не в этой стори).
- **Главная → Блок «Блог»:** в админке редактор выбирает, какие статьи показываются в блоке блога на главной, и задаёт их порядок (featured-выборка + порядок). Хранение выборки/порядка — schema-элемент (поля на `articles` либо отдельный конфиг; конкретика — в Open Questions, заводится миграцией Story 02). Остальные секции главной (Hero/Problem/OrangeGlow/Workflow/Decisions/Bento) из CMS не редактируются.
- **Markdown-тело (этап 6 blog.md):** миграция 16 тел `Block[]`→Markdown, `body` JSONB→text; в форме статьи — **лёгкий Markdown-редактор** (textarea + живое превью, без тяжёлого WYSIWYG); новый рендер `[slug]/page.tsx` через **`react-markdown` + `remark-directive` (+`remark-gfm`)** с маппингом `##→article-h2`, абзац→`article-p`, `>`→`article-quote`, списки→`article-list`, `![]()`→картинка, сырой HTML OFF; директивы `::video`→`<video>`, `:::gallery`→клиентская галерея (логика `PopupGallery`).
- **Медиа:** загрузка обложек/картинок/видео из админки в Supabase Storage.
- **Запись + ревалидация:** под `service_role` server-side; после save/publish — `/api/revalidate` или `revalidateTag`.
- **Env:** `CMS_PASSWORD`, `SUPABASE_SERVICE_ROLE_KEY` в `.env.example`.

### Out of scope
- Сокращение рубрик 6→3 и перекатегоризация — отдельная стори (рубрики остаются как из Story 01).
- Deep-link репостов (`?loop=<id>`); редактирование статичных секций главной (Hero/Problem/OrangeGlow/Workflow/Decisions/Bento — остаются захардкоженными).
- Редактирование текста/вёрстки самого блока блога на главной (заголовок секции, оформление) — в скоупе только выбор и порядок статей в нём.
- Многопользовательская модель, роли, личные кабинеты (один общий пароль).
- Правки публичных файлов блога сверх рендера тела: `app/blog/page.tsx`, `app/blog/all/page.tsx`, `app/blog/layout.tsx`, `components/blog/*` не трогаются.

## Users / Actors

- primary: редактор контента — вход по паролю, ведёт статьи и репосты, грузит медиа, публикует.
- secondary: посетитель блога — видит только `published`, визуально без изменений (тело теперь из Markdown, пиксельно эквивалентно).
- system: Next.js server (проверка пароля/сессия/запись под `service_role`/инвалидация); Supabase Storage; `/api/revalidate` из Story 01.

## Source of Truth

### Wiki
- [[cms]] §Доступ и авторизация (один пароль `CMS_PASSWORD`, server-side, httpOnly-сессия), §Создание тела (Markdown-редактор, `remark-directive` `::video`/`:::gallery`, сырой HTML off), §Что редактирует CMS.
- [[blog]] §CMS-слой — этап 6 (Markdown-рендерер, маппинг на `article-*`, директивы, `PopupGallery`, `body` как text, ревалидация, Draft Mode).
- [[01-blog-supabase-backend|Story 01]] — таблицы `articles`/`loop_posts` со `status`, слой `web/src/lib/cms/` + фасад `lib/blog.ts`, Storage-бакеты, `/api/revalidate` + `REVALIDATE_SECRET`, `cacheComponents: true` + `images.remotePatterns`; `service_role` отложен сюда.
- [[newsroom]] — поля статьи и репоста, рубрики.

### Notes
- (не зафиксировано)

### Chat / Working Context
- repo-reader: в `web/` нет `middleware.ts`, `app/api/`, server actions, `cookies()`/`headers()`, auth/админки; 0 `process.env`/`use cache` в `web/src`. Не установлены `@supabase/supabase-js`, markdown-стек (`react-markdown`/`remark`/`remark-directive`/`unified`), markdown-редактор — новые зависимости (согласование, pnpm-only, `package-lock.json` не создавать). Тело — `BlockContent` switch (`p/h2/quote/list`), классы `.article-*` в `globals.css` (~стр. 2760). `.env.example` только в корне; `next.config.ts` пустой (заполняет Story 01). Next 16 нестандартный (`web/AGENTS.md`) — middleware/route-handler/server actions/`use cache` сверять с `node_modules/next/dist/docs/`.

## Main Flow

1. Заводится `service_role` (владелец в дашборде Supabase); `SUPABASE_SERVICE_ROLE_KEY`+`CMS_PASSWORD` в `.env`/`.env.example`/Vercel.
2. Auth-гейт: вход, server-side сверка `CMS_PASSWORD`, httpOnly-сессия, защита admin-маршрутов; публичная часть не затрагивается.
3. Admin-страницы (`(admin)`/`admin` — по решению): списки статей и loop-постов, формы create/update/delete, переключатель `status`.
4. Server-side слой записи под `service_role` (отдельно от anon-клиента; admin-клиент не импортируется в клиент).
5. Загрузка медиа из админки в Storage; URL в запись/Markdown.
6. Миграция тел `Block[]`→Markdown, `body`→text; рендер `[slug]/page.tsx` → `remark` + `remark-directive`, сырой HTML off.
7. Markdown-редактор тела в форме статьи.
8. После save/publish — инвалидация (`/api/revalidate` или `revalidateTag`).
9. Проверка статикой/диффом; `cd web && pnpm build` — **только по явной просьбе user**.

## Business Rules

- Доступ — один общий пароль, без аккаунтов/ролей; в env, только server-side, в клиентский бандл не попадает.
- Проверка пароля только на сервере; в клиент пароль не уходит; после входа httpOnly-сессия.
- Запись в Supabase — только под `service_role` и только server-side; клиентский импорт admin-клиента нарушает инвариант секретов.
- Защита эндпоинтов: `/api/revalidate` — по `REVALIDATE_SECRET` (вызов вебхука, machine-to-machine, без сессии); upload медиа — под admin-сессией (действие редактора).
- Публичная часть read-only, пароля не требует; `draft` публично не виден (фильтр из Story 01, anon+RLS).
- Тело — Markdown-исходник (text); рендер только поддерживаемый Markdown + директивы (`::video`, `:::gallery`); сырой HTML отключён (нет XSS); директивы — allowlist-маппинг на компоненты.
- Markdown маппится на существующие `article-p/h2/quote/list`; видео `<video>`; галерея — логика `PopupGallery`; медиа — объекты Storage (публичные бакеты из Story 01).
- Блок блога на главной показывает выбранные редактором статьи в заданном порядке; в выборку попадают только `published`; при пустой выборке — детерминированный фолбэк (свежие по `date`, как сейчас).
- Только pnpm; `package-lock.json` не создавать; новые зависимости (`@supabase/supabase-js`, remark+`remark-directive`, markdown-редактор) — после согласования.
- Публичные файлы блога не меняются сверх рендера тела. Анимации — через `ScrollOrchestrator` (не per-section useEffect). Порт dev 3005 не менять.

## Edge Cases

- Неверный пароль на входе — отказ без утечки `CMS_PASSWORD`.
- Истёкшая/отсутствующая сессия на admin-маршруте — редирект на вход.
- `cacheComponents: true` (из Story 01) vs динамическая админка с `cookies()` — admin динамический/некэшируемый; публичная статика не ломается и не кэширует админку.
- Двойная миграция тела: данные (16 тел `Block[]`→Markdown) и рендер выкатываются согласованно с типом `body` (JSONB→text), иначе старые статьи не рендерятся.
- Неподдерживаемый Markdown / директива вне allowlist — безопасный фолбэк, не сырой HTML.
- Большой/неподдерживаемый медиафайл — понятная ошибка, без частичной записи.
- Удаление записи с медиа в Storage — поведение осиротевших объектов фиксируется при реализации.
- Markdown-редактор может тянуть тяжёлый клиентский бандл — держать в admin-зоне, не утекать в публичный бандл.
- Инвалидация: published → `blog`+`post:slug`; остался draft → публично без изменений.
- Блок «Блог» на главной: выбрана статья, которую затем сняли с публикации (`draft`) или удалили — она исчезает из блока без битой ссылки; пустая выборка → фолбэк на свежие по `date`; после правки выборки кэш главной инвалидируется.

## Technical Impact

- **frontend:** новые admin-страницы, сгруппированные в две папки — **Блог** (списки/формы статей и loop, форма входа, Markdown-редактор, UI загрузки медиа) и **Главная** (UI выбора/порядка статей для блока блога); вынужденная правка рендера тела в `app/blog/[slug]/page.tsx` (`BlockContent` switch → `remark`-рендерер + директивы + клиентская галерея на логике `PopupGallery`); секция блога на главной (`components/sections/*`) начинает читать выборку/порядок вместо «свежие по date»; `app/blog/page.tsx`, `all/page.tsx`, `layout.tsx`, `components/blog/*` — не меняются.
- **backend:** auth (вход + server-side сверка + httpOnly-сессия + защита admin); server-side слой записи под `service_role` (CRUD статей/loop + сохранение выборки/порядка для главной); upload в Storage; инвалидация через `/api/revalidate` или `revalidateTag` (включая тег главной при правке выборки).
- **database:** тип поля `body` в `articles`: JSONB → text (согласованная миграция со схемой Story 01); перегенерённые Markdown-тела 16 статей; schema-элемент под выборку/порядок статей для блока на главной (поля на `articles` либо отдельный конфиг — см. Open Questions), миграцией Story 02.
- **infrastructure:** `SUPABASE_SERVICE_ROLE_KEY` (server-side) и `CMS_PASSWORD` в `.env`/`.env.example`/Vercel; новые зависимости (`@supabase/supabase-js`, remark-пайплайн + `remark-directive`, markdown-редактор) по согласованию, pnpm-only.

## Dependencies

### Depends on
- **Story 01** (`01-blog-supabase-backend`) — обязательна: таблицы `articles`/`loop_posts` со `status`, слой `web/src/lib/cms/` + фасад `lib/blog.ts`, Storage-бакеты, `/api/revalidate` + `REVALIDATE_SECRET`, `cacheComponents: true` + `images.remotePatterns`. `service_role` намеренно отложен из Story 01 сюда.
- Владелец заводит `service_role`-ключ в дашборде Supabase и передаёт его; выбирает `CMS_PASSWORD`.
- Согласование трёх наборов новых зависимостей (CLAUDE.md «новые зависимости только по согласованию»).
- Сверка middleware / route handler / server actions / `use cache` / `cookies()` с `node_modules/next/dist/docs/` (нестандартный Next 16, `web/AGENTS.md`).

### Blocks
- Стори «Сокращение рубрик 6→3 и перекатегоризация».
- Стори «Deep-link репостов».
- (Выбор/порядок статей для блока на главной теперь внутри этой стори; отдельной стори под него не нужно.)

## Deliverables

- Auth-гейт: страница входа, server-side сверка `CMS_PASSWORD`, httpOnly-сессия, защита admin-маршрутов.
- Навигация админки в две папки: **Блог** (Статьи, Репосты — `список ↔ форма`) и **Главная** (Блок «Блог»).
- Admin-страницы: списки + create/update/delete статей и loop-постов, переключатель `status`, загрузка медиа в Storage.
- Раздел «Главная → Блок «Блог»»: UI выбора и порядка статей + schema-элемент хранения выборки; секция блога на главной читает эту выборку (фолбэк — свежие по `date`).
- Server-side слой записи под `service_role` (не утекает в клиент) + инвалидация после save/publish.
- Markdown-редактор тела статьи в форме.
- Миграция: 16 тел `Block[]`→Markdown; `body` JSONB→text; новый рендер `app/blog/[slug]/page.tsx` через `remark` + `remark-directive`, сырой HTML off, компонент галереи на логике `PopupGallery`.
- Обновлённый корневой `.env.example` (`CMS_PASSWORD`, `SUPABASE_SERVICE_ROLE_KEY`).
- Патч документации: отметить в `cms.md`/`blog.md`, что админка и этап 6 (Markdown) выполнены.

## Acceptance Criteria

- [ ] **Given** не выполнен вход, **when** открываем admin-маршрут, **then** доступ закрыт (редирект/отказ), а публичные страницы (`/`, `/blog`, `/blog/all`, `/blog/[slug]`) открываются без пароля как раньше.
- [ ] **Given** форма входа, **when** отправляем верный `CMS_PASSWORD`, **then** ставится httpOnly-сессия и открыт доступ к админке; неверный — доступ не даётся.
- [ ] **Given** клиентский бандл, **when** грепаем сборку/исходники, **then** `CMS_PASSWORD`, `SUPABASE_SERVICE_ROLE_KEY` и admin-клиент Supabase отсутствуют в клиентском коде (только server-side).
- [ ] **Given** вход выполнен, **when** открываем `/admin`, **then** навигация состоит из двух папок — **Блог** (с вложенными разделами **Статьи** и **Репосты**) и **Главная** (раздел **Блок «Блог»**); из Статей и Репостов доступны список и форма create/update/delete.
- [ ] **Given** вход выполнен, **when** create/update/delete статьи и переключаем `status` draft↔published, **then** запись в `articles` меняется под `service_role`; `draft` публично не виден, `published` — виден.
- [ ] **Given** вход выполнен, **when** create/update/delete loop-поста и переключаем `status`, **then** запись в `loop_posts` меняется под `service_role`; draft не виден публично.
- [ ] **Given** форма статьи, **when** загружаем обложку/картинку тела/видео, **then** файл попадает в Supabase Storage и его публичный URL подставляется в запись/Markdown.
- [ ] **Given** миграция тела, **when** смотрим схему, **then** поле `body` в `articles` имеет тип text (Markdown), и тела всех 16 статей перегенерены в Markdown.
- [ ] **Given** новый рендер, **when** открываем `/blog/[slug]`, **then** тело рендерится из Markdown через `remark` с маппингом `##→.article-h2`, абзац→`.article-p`, `>`→`.article-quote`, списки→`.article-list`; визуально эквивалентно прежнему.
- [ ] **Given** директивы, **when** в теле есть `::video{src= poster=}` и `:::gallery … :::`, **then** видео рендерится тегом `<video>`, галерея — клиентским листаемым компонентом (логика `PopupGallery`).
- [ ] **Given** рендер тела, **when** в Markdown встречается сырой HTML, **then** он не исполняется (нет `rehype-raw`/`allowDangerousHtml`); рендерятся только поддерживаемый Markdown + allowlist-директивы.
- [ ] **Given** раздел «Главная → Блок «Блог»», **when** редактор выбирает статьи и задаёт порядок, **then** выборка сохраняется (под `service_role`, server-side), блок блога на главной показывает именно эти `published`-статьи в заданном порядке, а при пустой выборке — фолбэк на свежие по `date`; после правки кэш главной инвалидируется.
- [ ] **Given** save/publish, **when** запись изменилась, **then** кэш инвалидируется (`/api/revalidate` или `revalidateTag('blog')`/`revalidateTag('post:'+slug)`) и изменение видно без ре-деплоя.
- [ ] **Given** `cacheComponents: true` (из Story 01), **when** проверяем admin-маршруты, **then** они динамические и не кэшируются, а публичная статика блога/главной без регрессий.
- [ ] **Given** `.env.example` (корень), **when** смотрим секцию, **then** добавлены `CMS_PASSWORD` и `SUPABASE_SERVICE_ROLE_KEY` с пустыми значениями; реальных значений нет; `package-lock.json` в `web/` не создан.
- [ ] **Given** git-дифф, **when** проверяем публичные файлы блога, **then** `app/blog/page.tsx`, `all/page.tsx`, `layout.tsx`, `components/blog/*` не изменены (правка только рендера тела в `[slug]/page.tsx`).
- [ ] **Given** пользователь запустил сборку (`cd web && pnpm build`) по явной просьбе, **when** билд проходит, **then** admin-маршруты и публичный блог (рендер тела из Markdown) собираются и работают; остальные страницы без регрессий.

## Open Questions

Решено (2026-06-15):
- **Декомпозиция** — Markdown-тело + миграция `body` остаются внутри Story 02 (админка сразу редактирует тело).
- **Размещение** — сегмент `app/admin/…` (URL `/admin`, гейт по пути в middleware).
- **Auth** — middleware-гейт + route handler логина (httpOnly-кука, сверка `CMS_PASSWORD`). API сверить с Next 16 docs.
- **Markdown-стек** — `react-markdown` + `remark-directive` (+`remark-gfm`), маппинг на `article-*` и компоненты директив, сырой HTML off. Редактор — лёгкий (textarea + превью).
- **Публикация** — переключатель `status` draft/published; превью черновика (Draft Mode) — НЕ в этой стори.
- **Защита эндпоинтов** — `/api/revalidate` по `REVALIDATE_SECRET` (без сессии); upload — под admin-сессией.
- **ИА админки** — две папки: **Блог** (Статьи, Репосты) и **Главная** (Блок «Блог»).
- **Блок «Блог» на главной** — в скоупе Story 02; редактируется выбор и порядок показываемых статей (не текст/вёрстка секции).

Остаётся (не блокер):
- `images.remotePatterns` host Storage — наследуется из Story 01.
- **Хранение выборки/порядка для главной** — поля на `articles` (`home_featured` + `home_position`) против отдельного singleton-конфига; выбрать при реализации миграции (на acceptance не влияет).
- `cms.md` §3 + сводная таблица сейчас говорят «главная не редактируется» — обновить под «редактируется выбор/порядок статей в блоке» (docs-патч в Definition of Done).

## Linear Publish Plan

(Linear не подключён — раздел не заполняется; story-файл служит трекингом)

### Publish Mode
- [ ] Project + child issues
- [ ] Issues only

### Issues
- [ ] (Linear не подключён)

## Definition of Done

- [ ] source logic зафиксирована в wiki (`cms.md` §Доступ + §Создание тела; `blog.md` §этап 6)
- [ ] реализация завершена
- [ ] acceptance criteria подтверждены (включая сборку по запросу пользователя)
- [ ] изменения отражены в relevant docs (`cms.md` §«Что редактирует CMS» — главная редактируема через выбор/порядок; `blog.md`, `.env.example`)

## Change Log

- 2026-06-15 - created
- 2026-06-15 - закрыты open questions: Markdown-тело остаётся в Story 02; админка — сегмент `app/admin`; auth — middleware+route handler логина; стек — react-markdown+remark-directive, лёгкий редактор; без Draft Mode; `/api/revalidate` по секрету, upload под сессией
- 2026-06-15 - добавлена ИА админки (папки **Блог** [Статьи, Репосты] и **Главная** [Блок «Блог»]); раздел «Главная → Блок «Блог»» введён в скоуп (выбор и порядок статей в блоке на главной) — Scope, Goal, Business Rules, Edge Cases, Technical Impact, Deliverables, Acceptance Criteria, Open Questions
- 2026-06-15 - closed: CMS admin реализован, QA 17/17 pass, миграции 0003/0004 применены
