---
title: Component Forge Batch
status: generated
version: 1.0
updated: 2026-06-17
source: .claude/skills/component-forge-batch/SKILL.md
---

# Component Forge Batch

← [[index|Wiki]] · [[component-forge|Component Forge]] · [[component-library|Component Library]]

Верхнеуровневый **автономный batch-оркестратор** над [[component-forge|Component
Forge]]. Одна команда пользователя → обработка массива архетипов → параллельная
аналитика и дизайн → контролируемая очередь записи application-кода → автоматические
review/fix-циклы → **один** итоговый отчёт. Живёт в
`.claude/skills/component-forge-batch/SKILL.md`.

> **Single forge остаётся атомарным.** `component-forge` не переписывается в
> multi-archetype processor: он по-прежнему перерабатывает **один** архетип (фазы
> 0–8, два гейта). Batch стоит **сверху** и вызывает его как **child workflow**. Это
> не новый source of truth — канон правил тот же (`component-forge/kb/`,
> [[component-forge|Component Forge]]).

## Зачем существует

Одиночный forge доводит один архетип и **останавливается на каждом гейте**, ожидая
пользователя. Когда нужно перековать пачку архетипов (`04,05,06,07`), это
превращается в ручное няньченье: запустить, дождаться Gate A, утвердить, дождаться
Gate B, утвердить, повторить N раз. Batch снимает это: принимает список/диапазон,
сам гоняет каждый архетип через forge, **распараллеливает безопасные фазы**,
**сериализует запись кода**, изолирует ошибки и отдаёт один отчёт — без вопросов
между стадиями.

Запуск:

```
/component-forge-batch "04,05,06,07"
/component-forge-batch "04-12"
/component-forge-batch "архетипы 04, 07, 11"
```

## Функционал

### 1. Разбор и нормализация ID
Извлекает ID из строки (запятые, диапазоны `A-B`, слово «архетип(ы)» игнорируется),
разворачивает диапазоны, приводит к двузначному zero-padded виду (`4 → 04`), **удаляет
дубли**, сохраняет **input order** (он же приоритет). Невалидный ID →
`skipped-invalid-input`, остальные runs продолжаются.

### 2. Child run на каждый архетип
Каждый архетип получает свой `run_id` (`YYYYMMDD-HHMM-archetype-<id>`) и прогоняется
через существующий [[component-forge|component-forge]]. Воркеры получают **только
archetype-scoped task packet** (`component-forge/kb/task-packets.md`) — полный
batch-контекст воркеру не передаётся.

### 3. Параллельная аналитика и дизайн vs сериализованная запись
| Слой | Фазы | Concurrency |
|---|---|---:|
| **Параллельно** | Discovery · Contract Lock · Microstructure · DS Guard · Art Direction (V1/V2/V3) · UI UX Pro Max review · Designer revision · Media candidate select · Background strategy · read-only reviews | 4–6 |
| **Сериализовано (1 writer)** | Frontend Implementation · shared primitive creation · global CSS · Section Lab page · registry/docs updates | 1 |
| **Сериализовано (1 server)** | Render QA (live, порт 3005) · Integration · Final verification | 1 |

`implementation` по умолчанию **не поднимать выше 1** — единственный писатель на
запись кода, чтобы пачка не побила общие файлы (`_kit`/`_layout`/`globals.css`/
`page.tsx`).

### 4. Streaming-конвейер
Не ждёт завершения дизайна всей пачки. Как только архетип достигает
`ready-for-implementation`, он входит в implementation queue; единственный writer
берёт следующий по priority и readiness. Пример одновременного среза: `04
implementation · 05 final design review · 06 designer revision · 07 media review · 08
discovery`. Дизайн 2..N «прячется» за сериализованным потоком записи.

### 5. Shared-resource locks
Логические локи в `locks.json` на разделяемые ресурсы: `section-lab-page`,
`shared-primitives`, `global-css`, `component-registry`, `component-library-docs`,
`section-types-docs`, `dev-server-3005`. Один lock — один owner; ожидающий run
работает read-only; после захвата перечитывает свежий файл; релиз — после записи и
проверки diff; stale-lock освобождает оркестратор.

### 6. Shared-primitive conflict policy
Перед созданием primitive child run проверяет существующие примитивы, предложения
других active runs и batch events; **дубликат не создаёт**. Если два runs хотят
похожий primitive — первый `ready-for-implementation` становится owner, второй ждёт
результат, затем **переиспользует или расширяет** его.

### 7. Изоляция ошибок
Blocked-архетип фиксирует `blocked_reason`, освобождает свои locks и **не валит
batch** — остальные продолжаются, причина уходит в отчёт. Полная остановка только
при unsafe repo state / смене ветки / неразрешённых merge-конфликтах / порче
run-хранилища / блокировке всех write-стадий.

### 8. Автономные решения (без гейтов)
Batch не задаёт промежуточных вопросов. Интерактивные **Gate A / Gate B** одиночного
forge заменены детерминированными решениями по приоритету:

```
1. repository rules (CLAUDE.md)
2. EvalLense design system (source of truth)
3. Contract Lock (semantic/functional/theme)
4. child-run review status (forge-validate / ui-ux-pro-max / reviewers)
5. lowest-risk reversible solution
6. input order
```

### 9. Dev server (reuse-first, порт 3005)
Один shared dev-сервер на **3005** (канон — `package.json`/`.claude/launch.json`;
порт не менять и динамически не выбирать). Если на 3005 уже поднят наш app (часто —
сервер из IDE пользователя) — **переиспользовать**; пусто → поднять один; занят
**чужим** процессом → затронутые Render-QA-архетипы `blocked`, без захвата случайного
порта.

### 10. Resume (автономный)
Повторный запуск того же списка находит последний **active** batch, сверяет state +
child queue и **продолжает** с места — без дублей runs и без вопросов. Пересекающиеся
batches: самый новый валиден, старые `superseded`; child run не принадлежит двум
active batches.

### 11. Финальная верификация и отчёт
После завершения child runs проверяет: битые imports, реестр, дубли примитивов, дубли
`name:` агентов, валидность frontmatter, **отсутствие page-level horizontal overflow**
(`component-forge/kb/overflow-discipline.md`), Light/Dark parity, консистентность
shared-файлов, соответствие `git diff` объявленному scope. Полный `pnpm build` — лишь
по подтверждённой project policy. Пользователь получает **один** итоговый отчёт
(batch summary, по-архетипная таблица, shared primitives, locks, design review, QA,
blocked runs, files changed, actions not performed, git status).

## Хранилище (workspace)

```
.claude/runs/component-forge-batch/<batch-id>/   # <batch-id> = YYYYMMDD-HHMM-batch-<first>-<last>
├── batch.json        # дескриптор + concurrency (неизменяемый)
├── state.json        # агрегированное состояние
├── events.jsonl      # append-only журнал решений
├── queue.json        # запись на каждый archetype (статусы ниже)
├── locks.json        # shared-resource locks
└── final-report.md   # единственный user-facing выход
```

Child runs — в `.claude/runs/component-forge/<run-id>/`; batch **не дублирует**
артефакты, хранит ссылки. `.claude/runs/` в `.gitignore` (рантайм-состояние не
коммитим).

**Статусы archetype в `queue.json`:** `queued · running · waiting-for-lock ·
ready-for-implementation · implementing · validating · fixing · ready-for-integration
· completed · completed-with-advisories · blocked · skipped`.

> **Персистенция (follow-up).** Одиночный forge сейчас на диск не персистит —
> поэтому child-run dir создаёт и владеет им batch (как ledger со ссылками).
> Собственная дисковая персистенция single-forge — отдельная задача.

## Ускорение (что даёт и чего не даёт)

Ускоряет: аналитика/дизайн 4–5 архетипов схлопывается до ≈ времени одного
(перекрытие + конвейер прячет дизайн за реализацией); исчезают простои на 2×N
гейтах. **Не** ускоряет: реализация + live-QA + fix-loop + интеграция идут по одному
(один writer, один сервер 3005) — это несжимаемый сериализованный пол, растущий
линейно с N. Итог зависит от профиля: если доминировали дизайн/ревью/ожидание —
выигрыш крупный; если тяжёлые реализация/QA — скромнее. Главная ценность — **не
голая скорость, а автономность и консистентность** (рисковые записи специально
сериализованы ради безопасности общих файлов).

## Рейлы

Не переписывать single-forge; воркеру — только archetype-scoped packet;
`implementation/render-qa/integration` = 1; один dev-сервер (3005), порт не менять;
ошибки изолированы; resume автономный; гейты заменены детерминированными решениями;
**не** менять `web/src/**`/`web/public/assets/**`/vendor-агентов; **не**
коммитить/пушить/создавать PR/деплоить.

## Связанное

- [[component-forge|Component Forge]] — атомарный child workflow (фазы 0–8, гейты).
- [[component-library|Component Library]] — реестр выкованных блоков (выход форжа).
- [[section-types|Section Types]] — каталог архетипов (вход батча).
- [[page-design-patterns|Page Design Patterns]] — архетипы, ритм, scroll-движок, QA.
