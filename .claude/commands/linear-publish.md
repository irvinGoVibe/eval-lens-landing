---
description: Из wiki/stories/<story> создать или обновить Linear Project + Issues
argument-hint: <путь к story-файлу>
---

Ты — исполнитель команды `/linear-publish` из EvalLense Landing. Публикуешь story в Linear или синхронизируешь существующие Issues. Полный контекст — `PROJECT-ENTRYPOINT.md`, правила Linear — `wiki/processes/linear-workflow.md` (особенно правило «— без жаргона — железное»).

**Linear-guard:** если в `PROJECT-ENTRYPOINT.md` секция Linear помечена как «не подключён» — публиковать некуда. Остановись, сообщи об этом пользователю и предложи либо подключить Linear (заполнить секцию в `PROJECT-ENTRYPOINT.md`), либо работать дальше без него (`/implement-story` работает и без Linear).

## Вход

`$ARGUMENTS` — путь к story-файлу, например `wiki/stories/04-feedback-form.md`.

## Что делаешь

1. **Прочитай story.** Убедись, что файл существует и оформлен по шаблону `wiki/stories/_template.md` (цель, acceptance criteria, затрагиваемые файлы, статусы, открытые вопросы). Считай поля frontmatter:
   - `linear_project` — ID существующего Linear Project (или пусто)
   - `linear_issues` — список ID уже привязанных Issues (или пусто)

2. **Определи команду Linear.** По содержанию story:
   - продуктовая работа, discovery, новый экран без глубокой инфраструктуры → **—**
   - инфраструктура, миграции, инженерный долг, backend-механика → **—**

   Если не очевидно — **спроси user**. Не угадывай.

3. **Определи режим публикации:**

   | Условие | Режим | Действие |
   |---|---|---|
   | story маркирована `Linear Mapping: Project + child issues` И `linear_project` пусто | **новый Project** | создать Linear Project + child Issues |
   | story маркирована `Linear Mapping: Project + child issues` И `linear_project` задан | **child Issues в существующем Project** | новый Project не создаём, child Issues привязываются к указанному `linear_project` (например, общий контейнер «Личный кабинет») |
   | story маркирована `Issues only` И `linear_issues` пусто | **новые Issues без Project** | создать набор Issues |
   | `linear_issues` задан | **синхронизация** | дубликаты не создаём, обновляем title/description/labels существующих Issues. Перевод в `Todo` (если ещё в `Backlog`). Если родительский Project нужен и `linear_project` пуст — спроси user, привязать ли существующие Issues к существующему/новому Project |

4. **Сформируй план публикации.** Покажи user в виде markdown-таблицы:

   ```
   ## Mode
   <new project | child issues in existing project | issues only | sync existing>

   ## Project
   - id: <если новый — «—», если используем существующий — `linear_project`>
   - title: ...
   - team: — | —
   - описание (summary story целиком)
   - milestone / cycle (если применимо)

   ## Issues

   | # | Action | Existing ID | Title | Description | Labels | Estimate | Target state |
   |---|---|---|---|---|---|---|---|

   `Action` — `create` | `update` | `transition`. `Target state` — `Backlog` (если ещё рано) или `Todo` (если story оформлена и можно брать в работу).

   ## Frontmatter update
   - linear_project: <ID после публикации>
   - linear_issues: [<ID-ы>]
   ```

5. **Жди явного подтверждения.** Формат ответа user — «опубликовать», «поправить X», «отмена».

6. **После подтверждения:**
   - если режим `new project` — создай Linear Project через `mcp__*__save_project` с указанной командой
   - **перед каждым `save_issue` в team —** — пропусти title и description через фильтр «без жаргона» из `wiki/processes/linear-workflow.md`. Если в тексте встречаются имена таблиц/колонок, SQL, route-paths, файловые пути, англоязычные технические аббревиатуры и термины, ID других Linear issues в основном тексте, ссылки на ADR/wiki/migration-файлы — переписываешь на продуктовый язык до публикации, не после. Инженерные формулировки из story не копируются дословно в продуктовый issue.
   - для каждой строки таблицы Issues:
     - `create` → `mcp__*__save_issue` с `projectId` (из `linear_project` или нового) и `state` = target state
     - `update` → `mcp__*__save_issue` с существующим `id`, обновляя содержимое
     - `transition` → `mcp__*__save_issue` с существующим `id` и новым `state`
   - собери URL-ы созданных и обновлённых ресурсов

7. **Обновление frontmatter story — автоматически, без отдельного подтверждения.** Сразу после публикации:
   - открой story-файл, переданный в `$ARGUMENTS`
   - впиши/обнови во frontmatter:
     - `linear_project: <ID Project>` (если режим создал/использовал Project)
     - `linear_parent_issue: <ID parent issue>` (если используется pattern Story-as-parent-issue из `linear-workflow.md` и parent issue был создан/использован)
     - `linear_issues: [<ID-ы child issues>]` (все привязанные Issues)
   - **`status` не менять.** Никакого `draft → review`, никакого `approved → review` и т.д. Frontmatter `status` остаётся ровно тем, что был до публикации.
   - **`updated` не менять.** Это структурный update (link to Linear), а не содержательная AI-правка story.
   - тело story (Summary, Scope, Acceptance Criteria и т.д.) **не трогать** — правишь только три поля frontmatter выше.
   - если поле уже заполнено и значения совпадают — пропускаешь без шума. Если ID отличается от уже записанного — перезаписываешь свежим значением из публикации.

8. **Отчёт user.** После публикации и автоматического обновления frontmatter верни:
   - ссылку на Project (если применимо)
   - таблицу Issues: `id | title | state | url`
   - явно: какие поля frontmatter дописаны (`linear_project`, `linear_parent_issue`, `linear_issues`) и что `status` оставлен без изменений
   - предложение запустить `/implement-story <путь>` (если story готова к реализации)

## Чего не делаешь

- не публикуешь без явного подтверждения user
- не создаёшь Project, если не определена команда (— vs —)
- не создаёшь дубликат Issue, если в `linear_issues` уже есть привязанный ID на ту же зону
- не двигаешь Issue в `In Progress` / `In Review` (это `/implement-story`)
- не ставишь Issue в `Done` — только user вручную в Linear UI
- не правишь тело story в `wiki/stories/` (Summary, Scope, AC и т.д.) — единственное исключение, разрешённое без отдельного подтверждения: автоматическая дописка `linear_project`, `linear_parent_issue`, `linear_issues` во frontmatter сразу после публикации (шаг 7).
- не меняешь `status` и `updated` во frontmatter при дописке Linear-полей
- **не публикуешь issue в — с техническими терминами** — правило «без жаргона» из `wiki/processes/linear-workflow.md`. Никаких имён таблиц/колонок, SQL, route-paths, файловых путей, ID других Linear issues в теле, ссылок на ADR/wiki/migration. Инженерные формулировки переводятся на продуктовый язык **до** `save_issue`, не после.

## Если story не готова

Если в story не заполнены acceptance criteria или не ясны границы — **останови публикацию**. Скажи user, чего не хватает в story, и предложи сначала дооформить её, потом запустить `/linear-publish` снова.
