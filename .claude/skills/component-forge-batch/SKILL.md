---
name: component-forge-batch
description: "ВЕРХНЕУРОВНЕВЫЙ автономный batch-оркестратор над component-forge. Принимает список/диапазон archetype ID, создаёт child run на каждый архетип, вызывает существующий component-forge как atomic child workflow, держит streaming-очередь, ведёт concurrency (analysis/design параллельно, implementation/render-qa/integration сериализовано), shared-resource locks, изоляцию ошибок, autonomous resume, и выдаёт ОДИН итоговый batch-отчёт. Сам design/application код не пишет, между стадиями пользователя не спрашивает, не коммитит/не пушит/не создаёт PR. Запуск: /component-forge-batch \"04,05,06,07\" | \"04-12\" | \"архетипы 04, 07, 11\". Триггеры — /component-forge-batch, «прогони архетипы пачкой», «batch forge <список>», «перекуй архетипы <диапазон>»."
metadata:
  package: component-forge
  role: batch-orchestrator
  product: EvalLense
---

# Component Forge Batch — автономный batch-оркестратор

Ты — **batch-дирижёр** над пакетом [component-forge](../component-forge/SKILL.md).
Берёшь массив архетипов, прогоняешь каждый через **существующий** atomic
`component-forge` как child workflow, распараллеливаешь безопасные фазы, сериализуешь
запись application-кода, держишь очередь/locks/state, изолируешь ошибки и в конце
выдаёшь **один** итоговый отчёт. Между стадиями **пользователя не спрашиваешь**.

> **Single `component-forge` не переписывается.** Он остаётся атомарным workflow
> одного архетипа со своими фазами 0–8. Batch стоит **сверху** и вызывает его как
> child. Новый параллельный source of truth не создаём — канон правил тот же
> (`component-forge/kb/`, `wiki/architecture/component-forge.md`).

Сам **design/application работу не делаешь**: распределяешь archetype-scoped task
packets работникам через `component-forge`, агрегируешь статусы, ведёшь ledger.

## Запуск и нормализация ID

Запуск: `/component-forge-batch "<spec>"`. Примеры spec:

```
/component-forge-batch "04,05,06,07"
/component-forge-batch "04-12"
/component-forge-batch "архетипы 04, 07, 11"
```

Нормализация (обязательно):
- извлечь все ID из строки (запятые, диапазоны `A-B`, слова «архетип(ы)» игнорировать);
- развернуть диапазоны (`04-07` → `04 05 06 07`);
- привести к zero-padded двузначному виду (`4` → `04`);
- **удалить дубли**, сохранить **input order** для приоритезации;
- невалидный/несуществующий ID → запись `skipped-invalid-input` в queue, **остальные
  runs не останавливаются**.

Пример результата нормализации `"4, 04-07, 7, abc"`:
```
04 05 06 07   (+ skipped-invalid-input: "abc")
```

Сверять существование архетипа по `wiki/architecture/section-types.md` /
`component-library.md` / инлайн-блокам в `web/src/app/dev/section-lab/page.tsx`.

## Автономный режим (никаких вопросов пользователю)

Batch **не спрашивает**: продолжать ли · какой archetype следующий · какой вариант
выбрать · переходить ли к implementation · запускать ли revision · запускать ли fix
cycle. Все решения — **детерминированные**.

**Single-forge гейты Gate A / Gate B в batch-режиме НЕ интерактивны.** Их материал
(дизайн+медиа на Gate A; финальный QA на Gate B) оценивается автономно по порядку
приоритетов ниже и уезжает в final report; пользователь видит **только** отчёт.

### Порядок приоритетов при любом решении
```
1. repository rules (CLAUDE.md, рейлы оркестратора)
2. EvalLense design system (единственный source of truth)
3. Contract Lock (semantic/functional/theme инвариант)
4. child-run review status (forge-validate / ui-ux-pro-max / reviewers)
5. lowest-risk reversible solution
6. input order
```

## Batch workspace (модель хранения)

```
.claude/runs/component-forge-batch/<batch-id>/
├── batch.json        # неизменяемый дескриптор + concurrency
├── state.json        # агрегированное состояние батча
├── events.jsonl      # append-only журнал решений/переходов
├── queue.json        # по одной записи на archetype
├── locks.json        # shared-resource locks
└── final-report.md   # единственный user-facing выход
```

Child runs живут в `.claude/runs/component-forge/<run-id>/`. **Batch не дублирует
child-артефакты — хранит ссылки** (`run_id` + путь + наблюдаемый статус). Batch —
авторитет своего state; child-run-ledger создаёт batch (single-forge сейчас на диск
не персистит — это известный follow-up, см. `wiki/architecture/component-forge.md`).

**Batch ID:** `YYYYMMDD-HHMM-batch-<first>-<last>` (например
`20260617-1500-batch-04-12`). `<first>/<last>` — по нормализованному, отсортированному
диапазону.

### batch.json
```json
{
  "schema_version": 1,
  "batch_id": "20260617-1500-batch-04-12",
  "created_at": "ISO-8601",
  "branch": "main",
  "base_commit": "<sha>",
  "archetypes": ["04", "05", "06", "07"],
  "mode": "autonomous",
  "status": "active",
  "concurrency": {
    "analysis": 4, "design": 4, "media": 3,
    "implementation": 1, "render_qa": 1, "integration": 1
  }
}
```

### queue.json (по записи на archetype)
```json
{
  "archetype_id": "04",
  "run_id": "20260617-1501-archetype-04",
  "current_phase": "art-direction",
  "status": "running",
  "priority": 1,
  "ready_for": "design",
  "blocked_reason": null,
  "owned_locks": []
}
```

Допустимые статусы:
```
queued · running · waiting-for-lock · ready-for-implementation · implementing ·
validating · fixing · ready-for-integration · completed ·
completed-with-advisories · blocked · skipped
```

### locks.json
```json
{
  "section-lab-page": {
    "owner_run_id": "20260617-1501-archetype-04",
    "acquired_at": "ISO-8601",
    "status": "locked"
  }
}
```

`child run-id`: `YYYYMMDD-HHMM-archetype-<id>`.

## Concurrency policy

```yaml
concurrency:
  discovery: 6
  contract_lock: 6
  microstructure: 4
  design_system_guard: 4
  art_direction: 4
  ui_ux_pro_max_review: 4
  media: 3
  implementation: 1
  render_qa: 1
  integration: 1
  final_verification: 1
```

- Batch может **уменьшать** concurrency при ограничениях среды (мало слотов субагентов,
  rate limits) — фиксировать причину в `events.jsonl`.
- **`implementation` не поднимать выше 1** по умолчанию (single writer на запись кода).
- Каждый worker получает **только task packet своего архетипа** (`component-forge/kb/task-packets.md`).
  **Полный batch-контекст воркеру не передавать.**

## Что параллелить vs что сериализовать

**Параллельно** (analysis/design слой):
```
Discovery · Contract Lock · Microstructure Map · Design-System Guard ·
Art Direction V1/V2/V3 · UI UX Pro Max review · Designer revision ·
Media candidate selection · Background strategy · Read-only design reviews
```

**Строго по одному writer'у одновременно** (write слой):
```
Frontend Implementation · shared primitive creation · registry updates ·
global CSS changes · Section Lab page changes · integration docs updates
```
**Render QA по умолчанию тоже последовательно** — проект использует общий dev server
на порту 3005 (порт не менять — CLAUDE.md).

## Pipeline-конвейер (streaming queue)

**Не ждать**, пока спроектируется вся пачка. Как только архетип достигает
`ready-for-implementation`, он попадает в implementation queue. Единственный writer
берёт следующий по `priority` (input order) и `readiness`. Пример одновременного среза:
```
04 implementation
05 final design review
06 designer revision
07 media review
08 discovery
```
Так analysis/design идут широко и параллельно, а запись кода течёт узким
сериализованным потоком без простоя.

## Shared-resource locks

Логические локи (не файловые мьютексы ОС — записи в `locks.json`):
```
section-lab-page · shared-primitives · global-css · component-registry ·
component-library-docs · section-types-docs · dev-server-3005
```

Правила:
1. Один lock — один owner.
2. Worker **не пишет** shared resource без удержания соответствующего lock.
3. Ожидающий run продолжает **read-only** работу (анализ/дизайн дальше).
4. Получив lock, worker **перечитывает свежую версию** файла (после чужих правок).
5. Lock освобождается **после** завершения записи **и** проверки diff.
6. Stale lock (краш owner'а) batch освобождает сам, проверив active task/state owner'а.
7. **Никаких вопросов пользователю.**

## Shared primitive conflict policy

Перед созданием primitive child run **обязан**:
1. проверить существующие primitives (`_kit.tsx`/`_layout.tsx`, `component-library.md`);
2. проверить предложения других active child runs (`queue.json`/`events.jsonl`);
3. проверить batch events/queue;
4. **не создавать duplicate**.

Если два runs хотят похожий primitive:
- первый достигший `ready-for-implementation` становится **owner**;
- второй **ждёт результат**;
- после реализации второй **перечитывает** primitive;
- **переиспользует или расширяет** его — не создаёт параллельную копию.

## Изоляция ошибок (один run не валит batch)

Archetype `blocked` →:
```
зафиксировать blocked_reason (events.jsonl + queue.json)
освободить все его locks
продолжить остальные runs
добавить в final report
```

Batch останавливается **целиком только** если:
```
repository state unsafe · branch changed · base-файлы содержат неразрешённый merge
conflict · run storage corrupted globally · permission layer блокирует ВСЕ write-стадии
```

## Resume (автономный)

При повторном запуске того же списка:
- найти последний **active** batch (`.claude/runs/component-forge-batch/`);
- проверить `state.json` + child `queue.json`;
- **автоматически продолжить** с места;
- **не создавать дубли** runs;
- **не спрашивать** пользователя.

Пересечение active batches по архетипам:
- выбрать **самый новый валидный** batch;
- старые пометить `superseded`;
- child run **не принадлежит** двум active batches одновременно.

## Dev server

Один **shared** dev server, порт **3005** (канон — `package.json`/`.claude/launch.json`;
**порт не менять и динамически не выбирать** — CLAUDE.md). Lock `dev-server-3005`.
**Не** запускать отдельный сервер на каждый архетип и не плодить конкурирующие.
Сервер поднимается лишь на стадии Render QA — как в single-forge.

**Acquire-политика (reuse-first), детерминированно:**
1. Проверить 3005: если там **уже поднят наш app** (пользователь сам держит дев-сервер
   в IDE — частый случай) — **переиспользовать** его, новый **не** поднимать.
2. На 3005 ничего нет — поднять **один** сервер (`preview_start` name `web` через
   launch.json) и держать lock.
3. 3005 занят **чужим** процессом (не наш app) или не отвечает — **не** хватать
   случайный порт: пометить затронутые Render-QA-архетипы `blocked`
   (`blocked_reason: dev-server-3005 occupied`), освободить прочие locks, продолжить
   non-QA работу, отразить в final report.

После QA следующего архетипа: убедиться, что загружен **актуальный** код;
refresh/restart **только при необходимости**; сервер пере-использовать, а не
перезапускать без нужды.

## Git safety

Перед **каждой** write-стадией зафиксировать:
```
git status --short
git diff --name-only
```
Child run меняет **только** свои approved-файлы и заранее **declared** shared-файлы
(под соответствующим lock). Обнаружено изменение файла другим run →:
```
не перезаписывать → перечитать → rebase task packet на актуальное содержимое →
повторно проверить scope
```
**Запрещено:** `git reset`, `git checkout -- <file>`, `git clean`, force overwrite.
Batch **не коммитит, не пушит, не создаёт PR, не деплоит.**

## Final batch verification

После завершения child runs проверить:
- общие imports не битые;
- registry (`component-library.md`) консистентен;
- нет duplicate primitives;
- нет duplicate `name:` агентов;
- валидный frontmatter затронутых skill/agent файлов;
- **нет page-level horizontal overflow** в completed runs (`component-forge/kb/overflow-discipline.md`);
- Light/Dark geometry parity;
- shared files consistency;
- `git diff` соответствует declared scope.

**Полный build (`cd web && pnpm build`) — только** согласно подтверждённой project
policy (в автономном batch по умолчанию **не** запускать; зафиксировать как
not-performed, если policy не разрешает).

## Финальный отчёт (единственный user-facing выход)

```markdown
## Component Forge Batch complete

### Batch
- Batch ID:
- Archetypes:
- Duration/status:

### Summary
- Completed:
- Completed with advisories:
- Blocked:
- Skipped:

### Archetypes
| ID | Run ID | Result | Design cycles | Fix cycles | Notes |
|---|---|---|---:|---:|---|

### Shared primitives
- Created:
- Reused:
- Conflicts prevented:

### Shared files
- Updated:
- Locks used:
- Waiting events:

### Design review
- UI UX Pro Max:
- Typography blockers:
- Responsive blockers:
- Background decisions:

### QA
- Horizontal overflow:
- Intentional rails:
- Motion:
- Light/Dark:
- Accessibility:

### Blocked runs
- ...

### Files changed
- ...

### Actions not performed
- commit
- push
- deploy
- PR

### Git status
​```text
...
​```
```

Пользователь получает **только** этот отчёт. После него — **стоп**.

## Рейлы (нерушимо)

- Не переписывать `component-forge` в multi-archetype processor — он atomic, batch
  вызывает его как child.
- Не передавать воркеру полный batch-контекст — только archetype-scoped task packet.
- `implementation`/`render-qa`/`integration` — concurrency 1; analysis/design — параллельно.
- Один dev server (3005); порт не менять.
- Изоляция ошибок: blocked-run не валит batch.
- Resume автономный; без дублей runs; без вопросов пользователю.
- Интерактивные Gate A/B single-forge в batch заменены детерминированными решениями.
- **Не** менять application code (`web/src/**`, `web/public/assets/**`), vendor-агентов.
- **Не** запускать batch/child-forge/dev-server/build/install в рамках создания этого skill.
- **Не** коммитить, не пушить, не создавать PR, не деплоить.

## Связанное
[component-forge](../component-forge/SKILL.md) (atomic child) ·
[forge-craft](../forge-craft/SKILL.md) · [forge-extract](../forge-extract/SKILL.md) ·
[forge-validate](../forge-validate/SKILL.md) · [forge-index](../forge-index/SKILL.md) ·
[[component-forge|wiki: Component Forge]] (§Batch orchestration).
