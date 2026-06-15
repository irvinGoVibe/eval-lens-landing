---
status: draft
---
# PROJECT ENTRYPOINT — EvalLense Landing

Технический entrypoint для AI-агентов, работающих с проектом. Каждый AI обязан прочитать этот файл первым.

Документ — **router**: он говорит, какой файл является источником правды по какому вопросу, и не дублирует их содержимое.

Файл рассчитан на загрузку во внешнюю память AI (ChatGPT, Claude Projects и т.п.) как самостоятельный ориентирующий документ: без секретов, без персональных данных, без эфемерного состояния.

---

## Project

- **Name:** EvalLense Landing
- **What it does:** Фронтэнд сайт Эвэнс с лендингом с блогом с методологией полноценный корпоративный сайт.
- **Language:** Русский
- **Repository:** irvinGoVibe/eval-lens-landing (https://github.com/irvinGoVibe/eval-lens-landing)
- **Default branch:** eval-lens-landing
- **Stack (summary):** Next.js 16 (App Router, TS, Tailwind v4, React 19, react-three-fiber) в web/ + legacy статика index.html/serve.py
- **Linear:** не подключён
- **Created:** 2026-06-15

Стек, правила кода и запреты — в `CLAUDE.md`.

---

## Documentation layers

```txt
notes → wiki → Linear → src
```

- `notes/` — сырой capture: дневные заметки (`notes/daily/`), дневные отчёты (`notes/done/`)
- `wiki/` — источник правды: product, architecture, stories, decisions, processes
- `Linear` — execution tracking (опционально; если не подключён — трекинг живёт в `wiki/stories/`)
- `src/` — реализация

Полная карта слоёв и правила — `wiki/processes/process.md`.

---

## Mandatory read order for AI agents

1. `PROJECT-ENTRYPOINT.md` (этот файл) — routing и инварианты
2. `CLAUDE.md` — правила кода, стек, запреты
3. `wiki/processes/process.md` — слои, статусы документов, рабочий ритм, правила AI
4. `.claude/commands/` — промпты slash-команд (перед выполнением команды читать её промпт)

Остальное подгружается по запросу через таблицу ниже.

---

## Canonical sources of truth

| Вопрос | Источник |
|---|---|
| Правила кода, стек, запреты | `CLAUDE.md` |
| Продуктовая логика, vision, scope | `wiki/product/` |
| Устройство системы, данные, домен | `wiki/architecture/` |
| Story-спеки (раскладка фич, acceptance criteria) | `wiki/stories/` |
| Принятые решения (ADR) | `wiki/decisions/` |
| Слои, статусы документов, workflow, правила AI | `wiki/processes/process.md` |
| Агентский контур разработки | `wiki/processes/agent-workflow.md` + `.claude/agents/` |
| Работа с Linear | `wiki/processes/linear-workflow.md` |
| Шаблон wiki-документа | `wiki/_template.md` |
| Шаблон story | `wiki/stories/_template.md` |
| Шаблон ADR | `wiki/decisions/_template.md` |
| Шаблон дневного отчёта | `notes/done/_template.md` |
| Типы сигналов в notes | `notes/README.md` |
| Промпты slash-команд | `.claude/commands/` |

---

## Technical invariants

Не меняются без явного решения.

- **Секреты.** Ключи и секреты живут только на сервере и в `.env` (не коммитится). В клиентский код секреты не попадают.
- **Document status.** Новые документы создаются со `status: draft`. AI при создании или содержательной правке ставит `status: generated`. `approved` и `locked` ставит только человек после ревью. AI никогда не повышает статус сам.
- **Версии документов.** Только формат `x.y`. Minor — правки внутри структуры, major — переписывание или смена смысла.
- **`locked` документы.** AI не правит без явного подтверждения пользователя.
- **Проверка сборки.** `cd web && pnpm build`. Dev-сервер автоматически не запускается.
- **Зависимости.** Новые пакеты — только по согласованию.
- **Стек-инварианты.** Дополняются при bootstrap под Next.js 16 (App Router, TS, Tailwind v4, React 19, react-three-fiber) в web/ + legacy статика index.html/serve.py — см. `CLAUDE.md`.

---

## Slash commands (operational interface)

Поведение каждой команды определяется её промптом в `.claude/commands/`.

| Команда | Назначение |
|---|---|
| `/bootstrap-project "Name"` | Развернуть новый проект из шаблона (GitHub + Linear). Протокол — `.claude/commands/bootstrap-project.md` |
| `/init-docs` | Интервью о продукте и архитектуре → первичная документация в `wiki/product/`, `wiki/architecture/` + стек-секции CLAUDE.md. Skill — `.claude/skills/init-docs/` |
| `/note [prefix:] <text>` | Запись в `notes/daily/<YYYY-MM-DD>.md`. Префиксы `bug:` / `task:` / `idea:` — предложение создать Linear Issue |
| `/done [текст]` | Дневной отчёт в `notes/done/<YYYY-MM-DD>.md` |
| `/task <text>` | Quick capture задачи сразу в Linear (без записи в notes) |
| `/curate` | Прочитать свежие `notes/` и предложить перенос дозревших тем в `wiki/` |
| `/story-draft <task>` | Черновик story в чат; после подтверждения — файл `wiki/stories/<NN>-<slug>.md` со `status: draft` |
| `/linear-publish <story-path>` | Опубликовать story как Linear Project / Issues (после подтверждения плана) |
| `/implement-story <story-path>` | Оркестрация plan → code → qa → fix-loop → report для одобренной story |
| `/finish-story <story-path>` | Закрыть реализованную story: отчёт, merge, очистка, запись в `notes/done/` |

Правила:

- AI читает промпт команды перед выполнением и следует ему без отклонений.
- AI не создаёт новых slash-команд без явного решения пользователя.
- Команды с внешними write (Linear, git push) требуют явного подтверждения пользователя.
- Если Linear не подключён — Linear-шаги команд пропускаются.

---

## Repository behavior rules

- Смотреть фактическое дерево файлов перед ссылкой или предложением изменений.
- Не угадывать пути — проверять перед записью.
- Сохранять текущую архитектуру, пока пользователь явно не попросил её менять.
- Предпочитать правку существующих файлов созданию новых.
- Не создавать документацию без запроса пользователя.

---

## When to update this file

Обновлять `PROJECT-ENTRYPOINT.md`, когда:

- появляется новый слой (рядом с `notes / wiki / Linear / src`)
- канонический source-of-truth файл переименован, перемещён или разделён
- добавлен, удалён или существенно изменён инвариант
- добавлена/удалена slash-команда или изменилось её внешнее write-поведение
- подключён или отключён Linear

Правки внутри уже указанных файлов обновления этого entrypoint не требуют.
