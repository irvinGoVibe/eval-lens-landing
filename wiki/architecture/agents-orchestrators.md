---
title: Agents & Orchestrators
status: generated
version: 1.0
updated: 2026-06-17
---

# Agents & Orchestrators — карта системы автоматизации

← [[index|Wiki]]

Единая карта **всего, что автоматизирует работу над EvalLense**: субагенты
(`.claude/agents/`), скиллы-оркестраторы и сервисные скиллы (`.claude/skills/`),
slash-команды (`.claude/commands/`) — что это, что делает, как работает и как они
складываются в пайплайны. Детали каждого — в его файле/доке; здесь — обзор и связи.

Источник истины — фактические файлы в `.claude/`. Документ generated, сверять с
кодом при расхождении.

---

## 0. Три типа единиц

| Тип | Где | Что это | Как запускается |
|---|---|---|---|
| **Агент** (субагент) | `.claude/agents/*.md` | Узкий исполнитель с жёсткими границами `tools` и списком запретов. Сам не оркеструет. | Вызывается оркестратором/командой/скиллом (Agent tool) по `name:` |
| **Скилл** | `.claude/skills/<name>/SKILL.md` | Либо **оркестратор-дирижёр** (назначает агентов, держит фазы/гейты), либо **сервисный** скилл (анализ/запись артефактов). | `/имя-скилла` или триггер-фраза |
| **Команда** | `.claude/commands/*.md` | Слэш-команда: промпт, который запускает агентов в фиксированном порядке. | `/имя-команды <args>` |

Граница: **агент** = руки, **скилл-оркестратор** = дирижёр, **команда** = сценарий
story-цикла. Скиллы-оркестраторы сами application-код не пишут — они назначают
агента-инженера и передают ему короткий **task packet** (не весь чат).

---

## 1. Две экосистемы

```
A. STORY-DEV FLOW (команды + проектные агенты)         B. DESIGN / BUILD ORCHESTRATORS (скиллы)
   сигнал → story → код → QA → merge                      Section Lab / контент → блоки / страницы / визуальные слои
   /story-draft → /implement-story → /finish-story        component-forge(+batch) · forge-* · component-library-preparer
   см. [[agent-workflow|Agent Workflow]]                  · build-pages · visual-layer-forge · redraw-block · evallense-site
```

Связующее звено — **общая библиотека** (`wiki/architecture/component-library.md`
+ манифесты `.claude/library/component-library/`), которую готовит
`component-library-preparer` и потребляют `build-pages` / будущий Page Orchestrator.

---

## 2. Агенты (`.claude/agents/`)

### 2.1 Проектные агенты (story-dev flow)

| Агент | `tools` | Роль | Пишет файлы |
|---|---|---|---|
| `repo-reader` | Read/Grep/Glob/Bash | read-only анализ репо, конфликты wiki↔code, пробелы | нет |
| `story-writer` | + Write | черновик story по `wiki/stories/_template.md` | только `wiki/stories/` после подтверждения |
| `linear-drafter` | Read/Grep/Glob | план публикации в Linear; **MCP не дёргает** | нет |
| `implementation-planner` | Read/Grep/Glob/Bash | acceptance → файлы/зоны кода, миграции, проверки, rollback | нет |
| `developer-agent` | + Edit/Write | **единственный** агент с правом править код; минимальные правки по плану; `cd web && pnpm build` | да (только файлы из плана) |
| `data-security-reviewer` | Read/Grep/Glob/Bash | ревью данных/auth/storage/секретов | нет |
| `domain-logic-reviewer` | Read/Grep/Glob/Bash | ревью доменной/бизнес-логики | нет |
| `ui-reviewer` | Read/Grep/Glob/Bash | ревью frontend (DS, границы компонентов, стандарты) | нет |
| `qa-acceptance-reviewer` | Read/Grep/Glob/Bash | acceptance-матрица, build, агрегация ревью, pass/blocked | нет |
| `release-reporter` | Read/Grep/Glob/Bash | финальный отчёт после QA pass | нет |
| `media-curator` | + Write | demo-media из существующих ассетов под строгий media-brief (Фаза 4B forge) | да (деривативы в `web/public/assets/`) |

### 2.2 Vendor-агенты (`.claude/agents/wshobson/`) — дизайн/инженерия/ревью

Внешний пакет **wshobson**. **Не редактировать.** Вызываются по `name:` (у двух
файлов имя реестра отличается от имени файла):

| `name:` (как вызывать) | Файл | Роль |
|---|---|---|
| `design-system-architect` | design-system-architect.md | токены/DS-гард, surface-to-action |
| `ui-designer` | ui-designer.md | визуальный дизайн, layout, mockup→code |
| `ui-ux-designer` | ui-ux-designer.md | ритм/композиция/рекомпозиция, UX |
| `multi-platform-apps-frontend-developer` | **frontend-developer.md** | React 19 / Next, реализация компонентов |
| `ui-visual-validator` | ui-visual-validator.md | визуальная валидация, screenshot/regression |
| `accessibility-expert` | accessibility-expert.md | WCAG/a11y |
| `comprehensive-review-code-reviewer` | **code-reviewer.md** | code review, безопасность, надёжность |

> В story-flow используются проектные ревьюеры; в forge / visual-layer-forge —
> vendor-дизайнеры/инженер/ревьюеры. `ui-reviewer` в форже **не** используется.

---

## 3. Скиллы (`.claude/skills/`)

13 рабочих скиллов (+ пустой stale-каталог `evallense-visual-restyler/` без
`SKILL.md` — кандидат на удаление). Сгруппированы по назначению.

### 3.1 Component Forge — переработка архетипов в prop-driven блоки

**Оркестратор:**

- **`component-forge`** (`/component-forge "архетип 04"`) — дирижёр переработки
  **одного** Section Lab архетипа в переиспользуемый блок продуктового качества
  (V1 Polish / V2 Modern Recomposition / V3 Expanded Expressive; light+dark;
  demo-media). Фазы 0–8, **два user-гейта** (Gate A — дизайн+медиа, Gate B —
  финальный блок), fix loop ≤3. Назначает vendor-дизайнеров/инженера/ревьюеров +
  `media-curator`; на 4A.2 сам зовёт advisory-скилл `ui-ux-pro-max`. Базы знаний —
  `kb/` rule-cards (вставляются в task packet). Сам код не пишет, не коммитит.
  Дока: [[component-forge|Component Forge]].

**Фазовые под-скиллы (вызываются дирижёром):**

| Скилл | Фаза | Что делает | Работник |
|---|---|---|---|
| `forge-primitives` | 2 | Microstructure map (tokens→primitives→fragments→recipe), **без** авто-componentization | multi-platform-apps-frontend-developer |
| `forge-craft` | 4A | Art Direction: три брифа V1/V2/V3 + Designer Self-Check + media-brief | ui-designer + ui-ux-designer |
| `forge-extract` | 5 | Реализация approved-брифов в боевой TSX `Lab*` | multi-platform-apps-frontend-developer |
| `forge-validate` | 6 | Render QA вживую (:3005) + fix loop ≤3 + вход в Gate B | ui-visual-validator · design-system-architect · accessibility-expert · comprehensive-review-code-reviewer |
| `forge-index` | 7 | Регистрация в `component-library.md` + `section-types.md`; дёргает `component-library-preparer` incremental | — (оркестрация) |

**Batch-надстройка:**

- **`component-forge-batch`** (`/component-forge-batch "04-12"`) — автономный
  batch-оркестратор над `component-forge`: child run на каждый архетип, streaming-
  очередь, concurrency (analysis/design — параллельно, implementation/render-QA/
  integration — сериализовано), shared-resource locks, изоляция ошибок, resume,
  **один** итоговый отчёт. Между стадиями user не спрашивает, не коммитит/не пушит.
  Дока: [[component-forge-batch|Component Forge Batch]].

### 3.2 Library — source of truth для сборщиков

- **`component-library-preparer`** (`/component-library-preparer "full"` |
  `"<target>"`) — **сервисный** скилл. Инспектирует живую UI-библиотеку, сверяет
  docs↔Section Lab↔код, классифицирует по слоям (tokens · atoms · layouts ·
  lab-sections · production-sections · chrome · newsroom · social · backgrounds ·
  transitions · motion), формирует consumption contracts + машиночитаемые
  манифесты + readiness, фиксирует конфликты. Пишет в
  `.claude/library/component-library/*.json` + `wiki/architecture/component-library.md`.
  Режимы: **full** и **incremental single-target**. Сам страницы не собирает,
  не редизайнит, не коммитит. Потребители — `page-composer`/`build-pages`/
  `component-forge`/`forge-index`/`visual-layer-forge`.

### 3.3 Pages — сборка внутренних страниц

- **`build-pages`** (`/build-pages /product/entry-hub …`) — пакетно собирает
  внутренние страницы из продуктовых брифов `wiki/product/<slug>.md`. На каждую
  страницу автономно прогоняет story → код → QA по агентскому flow, **но без
  пофазовых гейтов** (единственный гейт — старт батча). **Коммитит каждую страницу
  отдельно**, в конце пушит ветку и выдаёт сводку на поштучное ревью. Использует
  `repo-reader`/`story-writer`/`implementation-planner`/`developer-agent`/
  `ui-reviewer`/`qa-acceptance-reviewer`, монтирует `<ScrollFX/>`, ставит `.media-ph`
  при отсутствии ассетов. Единственный наш скилл, который **коммитит и пушит** (рабочей ветки).

### 3.4 Visual layers — фоны/переходы/motion ДО постраничной сборки

- **`visual-layer-forge`** (`/visual-layer-forge` | `"<target>"` | gap) —
  оркестратор системной visual-layer библиотеки (backgrounds · section transitions
  · ambient motion · composition recipes). Аудитит существующую библиотеку,
  фиксирует контракты, назначает design-system-architect/ui-designer/ui-ux-designer/
  инженера/QA + advisory `ui-ux-pro-max`, держит один user-гейт, fix loop ≤3,
  регистрирует через `component-library-preparer` incremental. Не делает фон под одну
  страницу — строит систему, из которой выбирает Page Orchestrator. Режимы:
  full / targeted / gap. Живой каталог — `web/src/app/dev/visual-lab/`.
  Дока: [[component-library#Визуальные слои (visual-layer-forge)|Visual layers]].

### 3.5 Single-block / контент / bootstrap

| Скилл | Триггер | Что делает |
|---|---|---|
| `redraw-block` | «доведи блок…», `redraw <Component>` | Один структурный блок → продуктовое качество (Apple-style). Режим A: редизайн существующего компонента; режим B: извлечь инлайн-секцию в prop-driven Server Component (`Lab*`). Версии light+dark, инспектор LabMarkers. Контент-инвариант, раскладку можно менять (`structure=слабо/средне/сильно`). |
| `evallense-site` | «перепиши бриф страницы», `evallense doc <slug>` | Редактура **продуктовой документации** (`wiki/product/*.md`), не кода. Ходит за фактами в источник правды, сверяет раскладку с page-design-patterns/section-types, пишет `wiki/product/<slug>_new.md`. |
| `init-docs` | `/init-docs` | Интервью о продукте/архитектуре → стартовая документация в `wiki/product/`, `wiki/architecture/`, стек-секции CLAUDE.md. |

### 3.6 Внешние скиллы, на которые опираются оркестраторы (не наши)

- `ui-ux-pro-max` (плагин) — advisory-ревью типографики/композиции/responsive в
  `component-forge` (4A.2) и `visual-layer-forge`. **Новую DS не создаёт.**
- `design:design-critique`, `design:accessibility-review` — визуальное ревью
  (ручной шаг в `build-pages`).

---

## 4. Команды (`.claude/commands/`)

| Команда | Что делает | Кого запускает |
|---|---|---|
| `/note [prefix:] <text>` | запись в `notes/daily/`; `bug:`/`task:`/`idea:` → предложить Linear Issue | — |
| `/done [text]` | дневной отчёт в `notes/done/<сегодня>.md` | — |
| `/task <text>` | quick capture задачи сразу в Linear Backlog | Linear MCP |
| `/curate` | предлагает перенос дозревших тем `notes/` → `wiki/` | — |
| `/story-draft <task>` | черновик story; после подтверждения — файл в `wiki/stories/` | `repo-reader` → `story-writer` |
| `/implement-story <story>` | plan → code → qa → fix-loop → report, гейт на каждой фазе | `implementation-planner` → `developer-agent` → `qa-acceptance-reviewer` (+ data/domain/ui reviewers) → `release-reporter` |
| `/finish-story <story>` | release-отчёт, merge worktree → `eval-lens-landing`, cleanup, буллет в done | `release-reporter`; git через `AskUserQuestion` |
| `/linear-publish <story>` | создать/обновить Linear Project + Issues | `linear-drafter` → Linear MCP (после подтверждения) |
| `/bootstrap-project "Name"` | развернуть новый проект из шаблона | — |

> `/init-docs` и forge/library/pages/visual-layer запускаются как **скиллы**
> (Skill tool / триггер-фраза), не как команды `.claude/commands/`.

---

## 5. Пайплайны (как складывается)

**Story-dev flow** (детали — [[agent-workflow|Agent Workflow]]):
```
/story-draft → (repo-reader, story-writer) → wiki/stories/<NN>-<slug>.md
   → [опц.] /linear-publish → (linear-drafter → Linear MCP)
   → /implement-story → planner → developer-agent → qa (+reviewers) → fix-loop(≤3) → release-reporter
   → /finish-story → merge worktree → eval-lens-landing
```

**Component Forge (один архетип):**
```
component-forge: Ф0 Discovery → Ф1 Contract Lock → Ф2 forge-primitives → Ф3 DS Guard
  → Ф4A forge-craft (V1/V2/V3, +ui-ux-pro-max review) → Ф4B media-curator
  → ⛔Gate A → Ф5 forge-extract → Ф6 forge-validate (+fix-loop) → ⛔Gate B
  → Ф7 forge-index → (component-library-preparer incremental) → Ф8 verify → отчёт
```

**Batch:** `component-forge-batch` оборачивает это в очередь архетипов (design
параллельно, запись сериализованно, locks, resume, один отчёт; без гейтов).

**Visual Layer Forge:**
```
Auditor → Language Director → Background/Transition/Motion Designers
  → ⛔Design review (ui-ux-pro-max + DS) → ⛔Gate → Engineer → Visual QA (+fix-loop)
  → final review → регистрация (component-library-preparer incremental) → отчёт
```

**Library refresh loop (общая шина):**
```
forge-index / visual-layer-forge → /component-library-preparer "<target>" (incremental)
  → манифесты + component-library.md → build-pages / Page Orchestrator потребляют (только `ready`)
```

---

## 6. Общие рейлы (для всех оркестраторов)

- **Гейты:** `component-forge` и `visual-layer-forge` останавливаются на user-гейтах;
  `component-forge-batch` и `build-pages` — автономны (гейт только на старте).
- **Коммиты:** forge-семейство, `component-library-preparer`, `visual-layer-forge`,
  story-агенты — **не коммитят/не пушат**. Исключение — `build-pages` (коммит на
  страницу + push рабочей ветки в конце; без merge/force).
- **Dev-сервер:** только pnpm, порт **3005**, и только когда нужен live-QA — по
  правилу CLAUDE.md сам не поднимается без явной просьбы (preview через `launch.json`).
- **Task packets:** агенту передаётся короткий пакет с нужными правилами DS дословно,
  не весь чат. Vendor-агенты `wshobson/` неизменяемы.
- **Compose-mode:** пока нет `sections/lab/_layout.tsx` — `whole-sections-only`
  (см. конфликт CL-001 в `component-library.md`).
- **Движение:** единый `<ScrollFX/>` / `data-*` (внутренние) или
  `ScrollOrchestrator` (только home); без per-section `useEffect`.
- **`.env*`, production pages, Linear write** — вне автономного scope; Linear только
  через `/linear-publish` после подтверждения.

---

## 7. Связанное

- [[agent-workflow|Agent Workflow]] — детальный story-dev цикл и границы агентов
- [[process|Process]] · [[linear-workflow|Linear Workflow]]
- [[component-forge|Component Forge]] · [[component-forge-batch|Component Forge Batch]]
- [[component-library|Component Library]] — реестр блоков + визуальные слои
- [[page-design-patterns|Page Design Patterns]] · [[section-types|Section Types]] · [[design-system|Design System]]
