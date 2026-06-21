# Публикация статьи в Supabase (через админку)

Как готовая статья попадает на сайт и становится редактируемой в `/admin`.

## Главный факт: админка = таблица `articles`

Админка (`/admin/blog/articles`) — это **тонкий CRUD прямо над таблицей
`articles`** в Supabase (пишет `service_role`-ключом, в обход RLS). Никакой
отдельной «сущности статьи» нет: **любая корректная строка в `articles`
автоматически появляется в списке админки и редактируется там** по адресу
`/admin/blog/articles/<slug>`.

Поэтому **«опубликовать через админку» = вставить строку в `articles`**.
Браузер/логин/запущенный dev-сервер не нужны — пишем по REST тем же
`service_role`-ключом, что использует сама админка.

Код-референс (не править, только понимать):
`web/src/lib/cms/admin-queries.ts`, `web/src/app/admin/blog/articles/actions.ts`,
`web/src/lib/cms/storage.ts`, схема — `supabase/migrations/2026061500000*.sql`.

## Схема `articles` (что пишем)

| колонка | значение | ограничение |
|---|---|---|
| `slug` | = имя файла, kebab-case | UNIQUE (ключ маршрута `/blog/<slug>`) |
| `category` | рубрика | **строго** `Press Release` · `Product` · `Research` |
| `accent` | тинт тега | `violet` · `cyan` · `aqua` · `orange` |
| `title` | заголовок | |
| `excerpt` | дек (1 предложение) | nullable |
| `date` | `YYYY-MM-DD` | |
| `read_minutes` | int (из `readMinutes`) | nullable |
| `cover` | **полный public-URL** Storage | bucket `media`, папка `bento/` |
| `author` | подпись | всегда `Anonymous Unicorn` |
| `role` | роль автора | nullable (напр. `Builder notes`) |
| `body` | **Markdown-текст** (не Block[]) | рендер react-markdown + `:::gallery` |
| `status` | `draft` · `published` | по умолчанию скрипта — `published` |

`home_featured` / `home_position` (блок «Блог» на главной) **скрипт не трогает** —
их выбирают отдельно в `/admin/home/featured`. При republish эти поля и
`created_at` сохраняются (upsert обновляет только переданные колонки).

## Медиа: bucket `media` (public)

- Один публичный bucket `media`, папки: `bento/` (обложки), `photos/` (инлайн),
  `video/`. В колонках/`body` хранится **полный public-URL** объекта.
- Скрипт оптимизирует каждое изображение через `sharp` → **WebP** (q80, обложка
  ≤1600px, инлайн ≤1400px, без апскейла), кладёт в `media/<folder>/<short>/<name>.webp`
  и переписывает локальные пути `/assets/blog/...` в статье на public-URL.
- SVG-исходники растеризуются (density 200) — поэтому фирменные визуалы удобно
  делать как **SVG** (см. ниже).

## Доступ к Supabase — через CLI

Креды в репозиторий не коммитятся. Скрипт берёт `service_role`-ключ и URL
**из Supabase CLI** в рантайме (`supabase projects api-keys`), на диск ничего
секретного не пишет. CLI должен быть залогинен (`supabase login`).

- Проект сайта: **`evallense-site`**, ref `wlnkmhxeuwvnyojiksfu`
  (URL `https://wlnkmhxeuwvnyojiksfu.supabase.co`). Это дефолт скрипта.
- Запись идёт по **PostgREST + Storage REST** на глобальном `fetch` (Node 18+).
  `@supabase/supabase-js` намеренно не используется: на Node < 22 его realtime
  падает с «Node.js 20 detected without native WebSocket support».

## Картинки: правило выбора (важно)

1. **Юзер приложил изображение для слота** (лежит в
   `notes/blog/_assets-src/<short>/<name>.<png|jpg|webp|…>`) → используем его.
2. **Не приложил** → **генерируем сами**: фирменный визуал как **SVG** в
   `notes/blog/_assets-src/<short>/<name>.svg` (стиль: lens-градиент
   `118° violet→lavender→cyan→aqua` как единственный акцент, hairline, бел/чёрн
   фон; без щитов/3D-хрома/стоковых людей/чужих логотипов/единорога — см.
   `references/visuals.md`).
3. **Всегда оптимизируем** (скрипт сам → WebP) ради скорости загрузки.

Имя SVG-исходника = basename пути из статьи (`/assets/blog/<short>/pipeline.png`
→ ищется `…/_assets-src/<short>/pipeline.svg|png|…`). Растровый файл юзера
выигрывает у одноимённого `.svg`-исходника.

## Запуск

```bash
# из корня репо (eval-lens-landing), статья уже лежит в notes/blog/<slug>.md
node .claude/skills/blog-creator/scripts/publish.mjs <slug>

# полезные флаги:
#   --dry-run        распарсить + оптимизировать, показать строку, НИЧЕГО не писать
#   --status=draft   положить черновиком (по умолчанию published)
#   --project-ref=…  другой проект (дефолт evallense-site)
#   --assets=<dir>   нестандартная папка исходников картинок
node .claude/skills/blog-creator/scripts/publish.mjs <slug> --dry-run
```

Скрипт **идемпотентен**: повторный запуск — upsert по `slug` (та же строка
обновляется, дубликата нет), картинки перезаливаются по детерминированным путям.
Если для слота нет исходника — путь оставляется как есть и слот выводится в
список «⚠ No source image» (сгенерируй/попроси картинку и запусти снова).

## Кэш и видимость на сайте

- Прямая запись в БД не сбрасывает Next-кэш автоматически (в отличие от
  server actions админки, которые зовут `revalidateTag`). Прод обычно
  ревалидируется Supabase Database Webhook → `POST /api/revalidate`
  (заголовок `x-revalidate-secret`). Для локального превью достаточно
  перезапросить страницу.
- ⚠ **`BLOG_SOURCE`**: в `web/.env.local` может стоять `BLOG_SOURCE=static` —
  тогда сайт читает блог из in-repo фоллбэка (`web/src/lib/blog-static.ts`), а
  **не из Supabase**, и опубликованная строка на сайте не появится (в админку
  попадёт всегда — админка читает таблицу напрямую). Чтобы сайт читал Supabase,
  убери флаг или поставь `BLOG_SOURCE=supabase`.
