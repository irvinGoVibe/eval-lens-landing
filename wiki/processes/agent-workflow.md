---
title: Agent Workflow
status: draft
version: 1.0
updated: 2026-06-15
---

# Agent Workflow

← [[index|Wiki]]

Описывает, как Claude Code агенты в `.claude/agents/` совмещаются со slash-командами `.claude/commands/` для контролируемого цикла разработки EvalLense Landing: от сырого сигнала до финального отчёта.

Агентский flow **дополняет**, а не замещает базовый процесс и slash-команды из [[process|Process]]. `/note`, `/curate`, `/linear-publish` остаются единственным интерфейсом записи во внешние слои; агенты — это вспомогательные исполнители, которые оркестрируются командами.

## Зачем

Дать единую цепочку для нетривиальных изменений:

- задача формулируется как story, а не как «сразу код»
- каждый переход фаз требует явного подтверждения user
- code, данные, доменная логика и UI ревьюятся независимо
- QA сверяется с acceptance criteria, а не с «выглядит готово»
- fix loop ограничен (3 итерации) и не превращается в бесконечную доработку

## Контракты слоёв

Без изменений по сравнению с [[process|Process]] §1:

- `notes/` — сырой сигнал
- `wiki/` — оформленный смысл, стандарты и stories (`wiki/stories/`)
- `Linear` — execution tracking (опционален, см. [[linear-workflow|Linear Workflow]])
- `src/` — реализация

Агенты пишут только в `wiki/stories/` (через `story-writer`) и в `src/` + миграции схемы данных (через `developer-agent`). Linear-запись остаётся за `/linear-publish` после явного подтверждения user.

## Цепочка фаз

```
Сигнал
   │
   ▼
[1] /story-draft <task>
       repo-reader   (read-only инспекция)
       story-writer  (черновик в чат)
   │  ← подтверждение user
   ▼
[2] story-writer пишет wiki/stories/<NN>-<slug>.md (status: generated)
   │
   ▼  (опционально, если Linear подключён)
[3] /linear-publish <story-path>
       linear-drafter  (план Project + Issues)
       └─ MCP save_project / save_issue только после подтверждения user
   │
   ▼
[4] /implement-story <story-path>
       implementation-planner   (план; ждёт подтверждения)
       developer-agent          (минимальные правки; cd web && pnpm build)
       qa-acceptance-reviewer   (acceptance-матрица, build, тесты)
         + data-security-reviewer  (если затронуты данные / auth / storage)
         + domain-logic-reviewer   (если затронута доменная логика)
         + ui-reviewer             (если затронут UI)
       fix loop                 (до 3 итераций; узкий scope провалов)
       release-reporter         (только если QA pass)
   │
   ▼  ← подтверждение user (кнопка через AskUserQuestion)
[5] /finish-story <story-path>
       release-reporter снова   (если нужно, чтобы отчёт был свежий)
       merge --no-ff <branch> → eval-lens-landing
       worktree remove + branch -d
       append буллет в notes/done/<сегодня>.md
   │
   ▼
Ручное действие user → Linear Issues: In Review → Done (вручную в UI)
```

## Агенты

Все агенты живут в `.claude/agents/`. У каждого жёсткие границы tools и явный список запретов. Полный текст — в самих файлах.

| Агент | Назначение | Пишет файлы |
|---|---|---|
| `repo-reader` | read-only анализ репо, конфликты wiki vs code | нет |
| `story-writer` | черновик story по `wiki/stories/_template.md` | только в `wiki/stories/` после подтверждения |
| `linear-drafter` | план публикации в Linear; MCP не дёргает | нет |
| `implementation-planner` | mapping acceptance → код, миграции, проверки | нет |
| `developer-agent` | минимальные правки кода | да (только файлы из плана) |
| `data-security-reviewer` | данные / auth / storage / секреты review | нет |
| `domain-logic-reviewer` | ревью доменной/бизнес-логики | нет |
| `ui-reviewer` | frontend review | нет |
| `qa-acceptance-reviewer` | acceptance-матрица, build, тесты | нет |
| `release-reporter` | финальный отчёт после QA pass | нет |

## Slash-команды

Команды агентского цикла:

- **`/story-draft <task>`** — запускает `repo-reader` + `story-writer`, возвращает черновик в чат, после подтверждения сохраняет файл в `wiki/stories/`. Промпт — `.claude/commands/story-draft.md`.
- **`/implement-story <story-path>`** — оркестрирует фазы plan → code → qa → fix-loop → final report. Каждая фаза — явный гейт подтверждения user. Промпт — `.claude/commands/implement-story.md`.
- **`/finish-story <story-path>`** — закрывает реализованную story: повторный release-отчёт (если нужен), merge worktree-ветки в `eval-lens-landing`, удаление worktree и ветки, буллет в `notes/done/<сегодня>.md`. Все destructive шаги — через `AskUserQuestion` (кнопки), `git push` и Linear → Done остаются ручными. Промпт — `.claude/commands/finish-story.md`.

Остальные команды проекта:

- `/note`, `/done`, `/task`, `/curate` — capture и продвижение по слоям
- `/linear-publish` — публикация story в Linear (после `/story-draft`; спит, если Linear не подключён)
- `/bootstrap-project` — первичная настройка шаблона под конкретный проект и стек

## Правило подтверждений

Агенты и команды не переходят между фазами без явного подтверждения user.

Подтверждение — одно из: `да`, `ок`, `подтверждаю`, `approved`, `публикуй`, `создавай`, `code`, `qa`, `retry`, `done`. Молчаливое продолжение — **не** подтверждение.

Это касается:
- сохранения story-файла после `/story-draft`
- публикации Linear через `/linear-publish`
- перехода plan → code в `/implement-story`
- перехода code → qa
- каждой итерации fix loop
- запуска `release-reporter`
- запуска `git merge` / `git worktree remove` / `git branch -d` в `/finish-story` (всегда через `AskUserQuestion` с кнопкой «Merge & cleanup»)

## Граница fix loop

`qa-acceptance-reviewer` отслеживает счётчик итераций. Лимит — **3**. После третьей провальной итерации команда `/implement-story` **останавливается** и отдаёт user полный список проваленных пунктов. Дальше — ручное решение: править story, расширить scope, отложить часть acceptance в новую story.

Каждая итерация — только проваленные пункты. Никаких новых правок «заодно».

## Что агенты не делают

Сводка запретов, общая для всего агентского флоу:

- не правят `.env*`, `wiki/archive/`, директории зависимостей
- не правят документы со статусом `locked` без явного подтверждения user
- не повышают `status` документа до `approved` или `locked`
- не запускают dev-сервер, установку новых пакетов, deploy-команды, CLI инструментов данных с записью
- не делают `git commit`, `git push`, `git reset`, `git rebase`
- не меняют схему данных вне новой пронумерованной миграции
- соблюдают стандарты кода проекта из CLAUDE.md (заполняются при bootstrap под Next.js 16 (App Router, TS, Tailwind v4, React 19, react-three-fiber) в web/ + legacy статика index.html/serve.py)
- не вызывают внешних провайдеров из клиентского кода
- не дёргают Linear MCP без явного подтверждения user (это путь `/linear-publish`); ни один субагент не вызывает Linear MCP write напрямую — переходы делает оркестратор-команда

## Когда не использовать агентский flow

- сырая мысль, ещё не дозревшая до story → `/note`, потом при необходимости `/curate`
- косметика в одной wiki-странице → прямая правка по правилу AI-edit (status → generated, bump version, updated)
- разовая правка одного компонента без acceptance → обычная правка, без story; но `cd web && pnpm build` всё равно прогнать
- discovery / исследование без решения → product issue в Linear через `/note bug:` / `/note idea:` (если Linear подключён)

Агентский flow оправдан, когда:
- задача затрагивает несколько слоёв (данные + доменная логика + UI)
- нужны проверяемые acceptance criteria
- есть риск регрессии в смежной логике
- нужен handoff между — и —

## Связанное

- [[process|Process]]
- [[linear-workflow|Linear Workflow]]
