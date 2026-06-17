---
title: Wiki Index
status: draft
version: 1.0
updated: 2026-06-15
---

# Wiki Index

← [[Home]]

Навигация по `wiki/`. Правила слоёв и документов — [[process|Process]].

## Разделы

- **Product** (`product/`) — что строим, для кого, как работает
  - [[vision|Vision]] — продукт, аудитория, боль, ценность
  - [[scope|Scope]] — главный сценарий и границы v1
  - [[newsroom|Newsroom]] — блог: зачем он, для кого, какой контент
  - [[sitemap|Карта сайта]] — структура сайта: conversion page, product, trust, company
- **Architecture** (`architecture/`) — устройство системы, данные, доменные правила
  - [[system|System]] — поверхности, стек, маршруты, данные, интеграции
  - [[design-system|Design System]] — токены, цвет, типографика, компоненты; опора для внутренних страниц
  - [[page-design-patterns|Page Design Patterns]] — как собирать внутренние страницы: архетипы, ритм, scroll-движок, QA
  - [[section-types|Section Types]] — визуальный каталог типов секций со скриншотами (что реально используется)
  - [[component-forge|Component Forge]] — агент-оркестратор переработки архетипов Section Lab в переиспользуемые блоки (фазы, гейты, агенты, demo-медиа)
  - [[component-forge-batch|Component Forge Batch]] — автономный batch-оркестратор над forge: пачка архетипов одной командой, параллельный дизайн + сериализованная запись, locks, resume, один отчёт
  - [[component-library|Component Library]] — реестр выкованных блоков + слои (атомы/каркасы/секции)
  - [[footer|Footer]] — подвал сайта: варианты light/dark, раскладка, соцсети, свечение
  - [[cta-band|CTA Band]] — переиспользуемый CTA-блок: пропы, кнопки, CSS-анора/видеофон, заход на футер
  - [[blog|Blog (Newsroom)]] — контент-модель блога: `Post`, `Block`, `LoopPost` и репосты In the Loop
  - [[cms|CMS]] — что редактирует CMS: статьи, репосты, блоки контента на главной
- **Stories** (`stories/`) — story-спеки для разработки; шаблон — `stories/_template.md`
- **[[decisions/_template|Decisions]]** (`decisions/`) — ADR; шаблон — `decisions/_template.md`
- **Processes** (`processes/`) — [[process|Process]], [[agent-workflow|Agent Workflow]], [[linear-workflow|Linear Workflow]]

## Команды

Слэш-команды проекта (промпты — в `.claude/commands/`):

- **`/note [prefix:] <текст>`** — запись в `notes/daily/<сегодня>.md`; префиксы `bug:` / `task:` / `idea:` предлагают Linear Issue
- **`/done [текст]`** — дневной отчёт в `notes/done/<сегодня>.md`
- **`/task <текст>`** — quick capture задачи сразу в Linear
- **`/curate`** — предлагает перенос дозревших тем из `notes/` в `wiki/`
- **`/story-draft <task>`** — черновик story; после подтверждения — файл в `wiki/stories/`
- **`/linear-publish <story>`** — публикация story в Linear (Project + Issues)
- **`/implement-story <story>`** — оркестрация plan → code → qa → fix-loop → report
- **`/finish-story <story>`** — закрытие story: отчёт, merge, очистка
- **`/bootstrap-project "Name"`** — развернуть новый проект из шаблона
- **`/init-docs`** — интервью о проекте → первичная документация в `wiki/product/` и `wiki/architecture/`

## Агенты

Субагенты Claude Code (определения — `.claude/agents/`, оркестрация — [[agent-workflow|Agent Workflow]]):

- **`repo-reader`** — read-only анализ репозитория
- **`story-writer`** — черновик story по шаблону
- **`linear-drafter`** — план публикации story в Linear
- **`implementation-planner`** — маппинг acceptance criteria на файлы и зоны кода
- **`developer-agent`** — единственный агент с правом редактировать код
- **`data-security-reviewer`** — read-only ревью данных, auth, storage, секретов
- **`domain-logic-reviewer`** — read-only ревью доменной логики
- **`ui-reviewer`** — read-only ревью frontend
- **`qa-acceptance-reviewer`** — acceptance-матрица, сборка, агрегация ревью
- **`release-reporter`** — финальный отчёт после QA pass

## Куда идти за чем

- логика продукта → `product/`
- устройство системы → `architecture/`
- спеки задач → `stories/`
- почему так решили → `decisions/`
- правила работы → `processes/`
