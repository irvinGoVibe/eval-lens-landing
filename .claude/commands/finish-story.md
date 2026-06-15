---
description: Закрыть одобренную story — release-отчёт, merge worktree → eval-lens-landing, удаление worktree+ветки, запись в дневной done. Все destructive шаги — через AskUserQuestion.
argument-hint: <путь к story-файлу>
---

Ты — исполнитель команды `/finish-story` из EvalLense Landing. Закрываешь story после успешного `/implement-story` (QA pass): прогоняешь release-отчёт, делаешь merge worktree-ветки в `eval-lens-landing`, удаляешь worktree и ветку, добавляешь буллет в `notes/done/<сегодня>.md`. Полный контекст — `PROJECT-ENTRYPOINT.md` и `CLAUDE.md` («Конвейер sub-агентов: handoff через кнопку»).

**Linear-guard:** если в `PROJECT-ENTRYPOINT.md` секция Linear помечена как «не подключён» — пропусти все упоминания и проверки Linear Issues (Фаза 1 шаг 3, Фаза 4 шаг 4, Фаза 5), выполни остальную логику и сообщи об этом пользователю.

## Вход

`$ARGUMENTS` — путь к story в `wiki/stories/`, например `wiki/stories/07-report-export.md`.

Если аргумент пустой — **остановись**, выведи `argument-hint` и попроси путь.

## Принципы

- **Никакого свободного текста для подтверждений.** Любой гейт user → через `AskUserQuestion` с готовыми кнопками. Это правило CLAUDE.md, не нарушай.
- **Destructive шаги (merge, worktree remove, branch delete) — только после нажатия кнопки «Merge & cleanup».**
- **Запускается из главного репо**, не из worktree. Если ты внутри worktree, удалить его не получится — остановись и попроси переключиться.
- **Если QA не прошло** или story не финализирована — не запускайся, верни user причину.

## Фазы

### Фаза 0 — Preflight

1. Прочитай story по пути `$ARGUMENTS`. Если файла нет — остановись.
2. Проверь `Status:` story: должен быть `Approved` или `Done` (после `/implement-story` оркестратор переводит в `Done` либо оставляет `Approved` — допустимы оба). Если `Draft` или `Generated` — остановись, скажи user сначала прогнать `/implement-story`.
3. Запусти параллельно:
   - `git rev-parse --show-toplevel` — убедись, что это **главный** репо, а не worktree. Если путь содержит `.claude/worktrees/` — остановись с сообщением: «Запусти из корня главного репозитория».
   - `git status --porcelain` — должен быть пустым. Если есть незакоммиченные изменения в `eval-lens-landing` — остановись, попроси user разобраться.
   - `git worktree list` — найди worktree, ветка которого содержит коммиты по story.
   - `git branch --show-current` — текущая ветка должна быть `eval-lens-landing`.
4. Определи **target worktree**:
   - если worktree один (кроме главного) — берёшь его
   - если несколько — `AskUserQuestion` с вариантами по списку worktree (label = имя папки, description = ветка + последний коммит)
   - если worktrees нет — остановись, скажи user, что закрывать нечего

### Фаза 1 — Release report

1. Запусти `release-reporter` с входом: story, текущий git diff `eval-lens-landing..<branch>`, последний build status.
2. Покажи user отчёт в чате (как обычно делает release-reporter).
3. Из отчёта возьми Linear Issues (если есть в story frontmatter `linear_issues:`) — упомянуть в финальном напоминании.

### Фаза 2 — Гейт подтверждения (AskUserQuestion)

Перед любым git-действием **обязательно** покажи план и спроси через `AskUserQuestion`.

План показываешь как plain-текст в чате до вопроса:

```
Будут выполнены команды:
  git merge --no-ff <branch> -m "merge(<story-slug>): <story title>"
  git worktree remove <worktree-path>
  git branch -d <branch>

После этого:
  - буллет в notes/done/<YYYY-MM-DD>.md (секция «Что сделано»)
  - напоминание перевести Linear Issues <list> в Done вручную (если Linear подключён)

Diff stat (eval-lens-landing..<branch>):
<вывод git diff --stat eval-lens-landing..<branch>>
```

Затем `AskUserQuestion`:
- `question`: `"Запустить merge и удалить worktree?"`
- `options`:
  - `{ label: "Merge & cleanup", description: "Выполнить merge в eval-lens-landing, удалить worktree, добавить буллет в done (Recommended)" }`
  - `{ label: "Только отчёт", description: "Записать буллет в notes/done, merge не делать — закрою руками" }`
  - `{ label: "Отмена", description: "Ничего не менять, выйти" }`

### Фаза 3 — Execute (по выбору user)

**«Merge & cleanup»:**
1. `git merge --no-ff <branch> -m "merge(<story-slug>): <story title>"` — если merge упал на конфликте, **остановись**, верни вывод, не пытайся резолвить автоматически. User разруливает руками.
2. `git worktree remove <worktree-path>` — если упало (например, грязный worktree), верни ошибку, не делай `--force` без явного подтверждения через `AskUserQuestion`.
3. `git branch -d <branch>` — если ветка не сливается, **не** используй `-D`, остановись и спроси через `AskUserQuestion`.
4. Перейди в Фазу 4.

**«Только отчёт»:**
1. Пропусти все git-команды.
2. Перейди в Фазу 4 (только notes/done буллет).

**«Отмена»:**
1. Ничего не делай, верни «Отменено user, состояние не изменилось».

### Фаза 4 — notes/done append

1. Определи сегодняшнюю дату `YYYY-MM-DD`.
2. Если `notes/done/<сегодня>.md` нет — создай по `notes/done/_template.md` (как делает `/done`).
3. В секцию **«Что сделано»** добавь буллет вида:
   `- <story slug>: <story title> — merge → eval-lens-landing, worktree удалён. story: wiki/stories/<file>.md`
   (если выбрано «Только отчёт» — без «merge → eval-lens-landing, worktree удалён»)
4. В секцию **«Ссылки»** добавь: `- story: wiki/stories/<file>.md`, и если есть `linear_issues:` — Linear ID списком.
5. Покажи user diff до записи, **жди подтверждения через `AskUserQuestion`** (опции: «Записать», «Пропустить»).

### Фаза 5 — Final summary

Верни user короткий итог:
- что замержено (или нет)
- какие worktree/ветки удалены (или нет)
- путь к `notes/done/<сегодня>.md` (если правился)
- список Linear Issues, которые user сам переводит в Done вручную (если Linear подключён)

## Чего не делаешь

- не делаешь `git push` — push остаётся за user
- не делаешь `git merge --abort` автоматически на конфликте — отдаёшь user разбираться
- не используешь `git worktree remove --force` или `git branch -D` без явного `AskUserQuestion` подтверждения
- не правишь story-файл (Change Log, статус) — это либо вручную user, либо отдельная команда
- не дёргаешь Linear MCP — переход в Done только user в UI
- не запускаешь dev-сервер и не деплоишь
- не правишь `wiki/` (кроме чтения story), `notes/` (кроме `notes/done/`)
- **не запускаешься, если QA по этой story не прошло** — формально проверить нельзя, но если в чате выше был `qa-acceptance-reviewer` с `blocked`, остановись и спроси через `AskUserQuestion`, действительно ли user хочет финишить без QA pass

## Whitelist Bash

- `git status`, `git branch`, `git worktree list`, `git diff`, `git log`, `git rev-parse`, `git show`
- `git merge --no-ff` (только в Фазе 3 после подтверждения)
- `git worktree remove` (только в Фазе 3 после подтверждения)
- `git branch -d` (только в Фазе 3 после подтверждения)
- `ls`, `cat`, `find`

## Если что-то пошло не так

В любой момент при ошибке (merge conflict, dirty worktree, отсутствие ветки) — **остановись**, верни состояние и спроси user через `AskUserQuestion`. Не «проталкивай» цикл вперёд.
