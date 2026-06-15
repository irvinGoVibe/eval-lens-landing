---
title: System
status: approved
version: 1.3
updated: 2026-06-15
---

# System

← [[index|Wiki]]

Как устроен сайт технически: поверхности, стек, маршруты, модель данных,
интеграции и операционка. Собрано из фактического кода репозитория.

## Поверхности

- **`web/`** — Next.js 16 приложение (App Router), live-таргет.
- **`index.html` + `assets/`** — оригинальный standalone-лендинг, держится как
  визуальный референс. CSS из него вынесен в `web/src/app/globals.css`.

## Стек

- Next.js 16.2.7, React 19, TypeScript 5, App Router.
- Tailwind v4 (`@tailwindcss/postcss`); токены через `@theme inline` в
  `globals.css` для инкрементальной миграции с legacy-классов.
- 3D: `three` + `@react-three/fiber`, `@react-three/drei`,
  `@react-three/postprocessing` (сцена-«единорог», модели в
  `web/public/assets/models`).

## Маршруты

- `/` — главная: одностраничный скролл (Hero → Problem → OrangeGlow → MistBridge
  → Workflow → Decisions → EvalLenseBentoSection → Footer).
- `/bento` — визуальная витрина (демо-страница).
- `/blog`, `/blog/all`, `/blog/[slug]` — Newsroom (хаб, полный список, статья).

## Рендеринг и анимации

- Секции — Server Components под `web/src/components/sections/`.
- Вся скролл/анимационная оркестрация — в одном клиентском компоненте
  `web/src/components/ScrollOrchestrator.tsx` (единый rAF-цикл; кросс-секционные
  scrub / parallax / progress не дробятся на per-section `useEffect`).
- `<html>` несёт `suppressHydrationWarning` — намеренно, из-за
  `safari-detect` (`beforeInteractive`), добавляющего `ua-safari` до гидрации.

## Данные

- **Сейчас:** внешней БД нет. Контент блога — статическая in-repo модель: типы
  `Post` / `LoopPost` и массивы в `web/src/lib/blog.ts` (хаб и `/blog/[slug]`
  подхватывают автоматически, новые сверху по `date`).
- **Целевое:** контент блога переезжает в **Supabase** — записи статей и
  loop-постов в Postgres, картинки/видео в Supabase Storage. Фронт читает данные
  на сервере; ключи Supabase — только server-side. Полное описание сущностей и
  CMS-слоя — [[blog|Blog (Newsroom)]], функции CMS — [[cms|CMS]].

## Интеграции

В коде сейчас интеграций нет (ни одного `process.env` в `web/src`). Планируются:

- **Supabase** — БД (Postgres) + Storage для контента блога (см. [[blog|Blog]],
  [[cms|CMS]]); ключи server-side в `.env`.
- **Аналитика** (веб-аналитика; провайдер не выбран).
- **Форма → почта/CRM** (заявка/waitlist уходит в email или CRM).
- **Ссылка на основной продукт/app** — CTA ведёт во внешнее приложение EvalLense.

## Auth

Публичная часть сайта — без аутентификации, ролей и личного кабинета. Планируемая
**admin-страница CMS** закрывается **одним паролем** из env (`CMS_PASSWORD`),
проверка только server-side; аккаунтов и ролей нет (см. [[cms|CMS]] §Доступ).

## Операционка

- **Сборка:** `cd web && pnpm build`. Dev-сервер автоматически не запускается;
  порт dev/start закреплён за 3005.
- **Деплой:** Vercel (целевая платформа; конфигурации в репо пока нет).
- **Менеджер пакетов:** pnpm (`pnpm-lock.yaml`).

## Связанное

- [[scope|Scope]] — границы первой версии
- [[vision|Vision]] — продуктовая ценность

## Открытые вопросы

- **`serve.py`**: `CLAUDE.md` описывает legacy-страницу как «`index.html` +
  `serve.py`», но файла `serve.py` в репозитории нет — нужно либо вернуть скрипт,
  либо поправить формулировку в `CLAUDE.md`.
- Конкретные провайдеры аналитики и CRM/почты для формы не выбраны.
- Решение по деплою на Vercel не закреплено конфигом (`vercel.json` / CI).
