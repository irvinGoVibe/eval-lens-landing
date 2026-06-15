---
description: Добавить запись в notes/daily и при необходимости создать Linear Backlog Issue
argument-hint: [prefix:] <текст заметки>
---

Ты — исполнитель команды `/note` из EvalLense Landing. Полный контекст проекта — `PROJECT-ENTRYPOINT.md`. Маршрутизация Linear — `wiki/processes/linear-workflow.md`.

**Linear-guard:** если в `PROJECT-ENTRYPOINT.md` секция Linear помечена как «не подключён» — пропусти все Linear-шаги (4–7 в части Issue), выполни остальную логику (запись в notes) и явно сообщи об этом пользователю.

## Что делаешь

1. Определи сегодняшнюю дату в формате `YYYY-MM-DD`.
2. Проверь существование файла `notes/daily/<YYYY-MM-DD>.md`. Если его нет — создай минимальную структуру:

   ```markdown
   # <YYYY-MM-DD>
   ```

3. В конец файла добавь новую строку:

   ```
   - <HH:MM> — <текст из $ARGUMENTS>
   ```

   Не переписывай существующие строки. `notes/` работает в режиме append-only (см. `notes/README.md`).

4. Разбери префикс в начале `$ARGUMENTS` и определи маршрут Linear:

   | Префикс | Команда | Стартовый статус | Тип |
   |---|---|---|---|
   | `bug:` | — | `Backlog` | Bug |
   | `task:` | — | `Backlog` | Task |
   | `idea:` | — | `Inbox` | Idea |
   | (нет префикса) | — | — | только notes, Linear не трогаем |

5. Если есть префикс — покажи user короткий план: «Создам Issue в `<команда>` со статусом `<статус>`. Title: `<очищенный текст без префикса>`. Description: ссылка-цитата на заметку в `notes/daily/<YYYY-MM-DD>.md`.». **Жди явного «да»**.

6. После подтверждения создай Issue через `mcp__*__save_issue`:
   - `team` — — для `bug:` / `task:`, — для `idea:`
   - `state` — `Backlog` (—) или `Inbox` (—). Если статус с таким именем не найден в Linear — спроси user, какой использовать, не угадывай
   - `description` — содержит блок-цитату с записью из daily-файла и явную ссылку `notes/daily/<YYYY-MM-DD>.md`
   - после создания верни user `identifier` Issue и URL

7. Если запись из notes планирует превратиться в story — предложи user следующий шаг `/story-draft "<текст>"` и явно скажи: «после `/story-draft` я смогу перевести этот Issue из Backlog в Todo, если впишешь его ID в frontmatter story в поле `linear_issues`».

## Чего не делаешь

- не редактируешь старые строки в daily-файле
- не удаляешь daily-файл
- не создаёшь Linear Issue без явного подтверждения
- не двигаешь Issue в `Todo` / `In Progress` / `In Review` (это делают `/story-draft` и `/implement-story`)
- не ставишь Issue в `Done` — `Done` ставит **только** user вручную
- не ставишь заметке статус «done» или что-то подобное — `notes/` не трекает состояние

## Аргументы

`$ARGUMENTS` — полный текст заметки, включая возможный префикс.
