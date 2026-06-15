# /bootstrap-project "Project Name"

Развернуть новый проект из `project-os-template`: GitHub repo + локальный клон + замена плейсхолдеров + (опционально) Linear Project. Основная логика — в глобальном skill `~/.claude/skills/project-bootstrap/` (config, скрипт, шаблоны issues); эта команда задаёт протокол.

## Жёсткие правила

- НИКАКИХ write-действий (GitHub, Linear, git push) до явного подтверждения пользователя в Phase B.
- Все вопросы — только через `AskUserQuestion` с готовыми вариантами.
- Команда НЕ задаёт продуктовых вопросов, НЕ генерирует MVP scope, НЕ создаёт feature backlog. Только пустой проектный контейнер.
- При ошибке на любом шаге Phase C — остановиться, выдать отчёт «сделано / не сделано / как откатить вручную». Авто-rollback запрещён (удаление repo — только руками пользователя).

## Phase A — Questionnaire + Preflight (read-only)

1. Опросник через `AskUserQuestion`:
   - **Q0 (первый вопрос): новый проект или существующий?** Greenfield — создание repo из template (флоу ниже). Brownfield — пользователь присылает **ссылку на существующий репозиторий** (любой owner/организация); из URL парсятся owner/name, клон при необходимости, затем overlay project OS (`bootstrap_project.py overlay`: существующие файлы не перезаписываются, CLAUDE.md при конфликте → CLAUDE.os-proposed.md)
   - название проекта (если не передано аргументом)
   - язык проекта (документация и общение)
   - стек проекта (краткое описание: фреймворк, БД, хостинг — пойдёт в `Next.js 16 (App Router, TS, Tailwind v4, React 19, react-three-fiber) в web/ + legacy статика index.html/serve.py`, команду сборки — в `cd web && pnpm build`, и в настройку стек-зависимых агентов)
   - подключать ли Linear; если да — имена команд (product team, engineering team)
   - папка: куда создавать проект — `<projects_dir>/<slug>` из config по умолчанию + «Other» для произвольного пути
   - Obsidian: подключить папку проекта как vault сразу после создания
2. Normalize: название → slug (lowercase, kebab-case, транслитерация).
3. Проверки (все read-only):
   - `gh auth status` — GitHub auth
   - repo `<owner>/<slug>` не существует (`gh repo view`)
   - локальная папка `<projects_dir>/<slug>` свободна
   - если Linear: MCP доступен, указанные команды существуют (`list_teams`), project с таким именем не существует (`list_projects`)
4. Если найден `.bootstrap-state.json` от прерванного запуска — предложить resume с последнего успешного шага.

## Phase B — Dry-run + Approval

Показать таблицу плана: repo (owner/name/visibility/template), локальный путь, значения всех плейсхолдеров, Linear project (team, name) и список setup issues (1–3, из `templates/initial-issues.json` — только setup, никакого продуктового backlog), либо пометку «Linear: не подключается».

Затем `AskUserQuestion`: «Создать?» / «Изменить параметры» / «Отмена». Write-действия — только после явного «Создать».

## Phase C — Execute (с чекпойнтами в .bootstrap-state.json после каждого шага)

1. `gh repo create <owner>/<slug> --template <template_repo> --private`
2. `git clone` в `<projects_dir>/<slug>`
3. Замена плейсхолдеров скриптом skill (`scripts/bootstrap_project.py`) — все `{{…}}` из списка в README шаблона
4. Если Linear: создать Project (описание из `templates/linear-project-description.md`), создать setup issues
4a. Если выбран Obsidian: `bootstrap_project.py obsidian-register --dir <path>` (регистрация vault в реестре Obsidian с бэкапом; при запущенном Obsidian подхватится после перезапуска), затем `open "obsidian://open?path=<abs path>"`
5. Вписать ссылки GitHub/Linear в `PROJECT-ENTRYPOINT.md` (секция Project); если Linear не подключён — пометить «Linear: не подключён»
6. Self-check: `bootstrap_project.py check --dir <path>` → `{"status": "ok"}` (незаполненных официальных плейсхолдеров не осталось; намеренные токены вроде `{{NN}}` в шаблоне story не считаются)
7. Commit: `chore: bootstrap from project-os-template`; удалить `.bootstrap-state.json`
8. `git push` — отдельный явный вопрос пользователю
9. Вывести итоговые ссылки: repo, локальный путь, Linear project (если есть)
