---
title: Agents & Orchestrators
status: generated
version: 1.2
updated: 2026-06-26
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
`component-library-preparer` и потребляют `build-pages` / `page-composer`
(Page Orchestrator — **теперь существует как skill**, §3.3).

Поверх обеих — **`dispatch`** (§3.7): мета-слой-раздатчик ad-hoc правок, который
триажит поток задач от user и раскидывает их по фоновым воркерам на Opus (в т.ч.
вызывая скиллы обеих экосистем). Сам диспетчер — на лёгкой модели сессии.

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

18 рабочих скиллов (включая трио точечной правки страницы — §3.4b; +пустой
stale-каталог `evallense-visual-restyler/` без `SKILL.md` — кандидат на удаление).
Сгруппированы по назначению.

### 3.1 Component Forge — переработка архетипов в prop-driven блоки

**Оркестратор:**

- **`component-forge`** (`/component-forge "архетип 04"`) — дирижёр переработки
  **одного** Section Lab архетипа в переиспользуемый **чистый DS-компонент**
  (`@/components/ds`, prefix-free имя, scope `.ds`, стили в `ds.css` — **не** обёртка
  над `Lab*`) продуктового качества (V1 Polish / V2 Modern Recomposition /
  V3 Expanded Expressive; light+dark;
  demo-media). Фазы 0–8, **два user-гейта** (Gate A — дизайн+медиа, Gate B —
  финальный блок), fix loop ≤3. Назначает vendor-дизайнеров/инженера/ревьюеров +
  `media-curator`; на 4A.2 сам зовёт advisory-скилл `ui-ux-pro-max`. Базы знаний —
  `kb/` rule-cards (вставляются в task packet). Сам код не пишет, не коммитит.
  Дока: [[component-forge|Component Forge]].

**Фазовые под-скиллы (вызываются дирижёром):**

| Скилл | Фаза | Что делает | Работник |
|---|---|---|---|
| `forge-primitives` | 2 | Microstructure map (tokens→DS-атомы→fragments→recipe; primitives = DS-атомы `@/components/ds`), **без** авто-componentization | multi-platform-apps-frontend-developer |
| `forge-craft` | 4A | Art Direction: три брифа V1/V2/V3 + Designer Self-Check + media-brief | ui-designer + ui-ux-designer |
| `forge-extract` | 5 | Реализация approved-брифов: извлечь архетип в **чистый DS-компонент** в `web/src/components/ds` (баррель `@/components/ds`, prefix-free имя, scope `.ds`, стили в `ds.css`) — **не** оборачивая/копируя `Lab*` | multi-platform-apps-frontend-developer |
| `forge-validate` | 6 | Render QA вживую (:3005) + fix loop ≤3 + вход в Gate B | ui-visual-validator · design-system-architect · accessibility-expert · comprehensive-review-code-reviewer |
| `forge-index` | 7 | Регистрация **чистого DS-имени** (`@/components/ds`) в `component-library.md` + `section-types.md`; дёргает `component-library-preparer` incremental | — (оркестрация) |

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

- **`page-composer`** (`/page-composer <route>`) — **Page Orchestrator**:
  один запуск = **одна** страница, глубокая реконструкция. Резолвит
  бриф `wiki/product/<slug>.md` + route + существующую `page.tsx`, сохраняет все
  обязательные секции/порядок/факты, матчит **только `ready`** библиотеку
  (манифесты), планирует реконструкцию, держит **один Design Review Gate**, после
  approve реализует через `multi-platform-apps-frontend-developer` + full-page QA
  (3005, fix loop ≤3) + финальный `ui-ux-pro-max`. **Mode-aware:** читает
  `compose_mode` — сегодня `whole-sections-only` (целые DS-секции из
  `@/components/ds` + page-local на shared tokens), после форджа слоя частей →
  `atoms-and-layouts` (сборка из DS-атомов+каркасов) **без переписывания**.
  Потребляет только `@/components/ds`, не `Lab*` напрямую. Недостающее **заказывает** у forge:
  секции → `component-forge`, атомы/каркасы → `primitive-layer-forge`, фоны/переходы
  → `visual-layer-forge`. Не коммитит/не пушит. Это потребитель `page-composer` из
  манифестов (ранее значился «ещё не существует»). Дока: [[component-library#Source of truth для page-composer (preparer)|Source of truth для page-composer]].

  **Не путать с Page Builder.** Если в проекте есть отдельный Page Builder
  runtime/editor/registry/serialized blocks, это другой слой. `/page-builder`
  не является алиасом `page-composer`; при таком запросе сначала найти реальные
  builder-доки/модуль и уточнить желаемый режим работы.

- **`build-pages`** (`/build-pages /product/entry-hub …`) — пакетно собирает
  внутренние страницы из продуктовых брифов `wiki/product/<slug>.md`. На каждую
  страницу автономно прогоняет story → код → QA по агентскому flow, **но без
  пофазовых гейтов** (единственный гейт — старт батча). **Коммитит каждую страницу
  отдельно**, в конце пушит ветку и выдаёт сводку на поштучное ревью. Использует
  `repo-reader`/`story-writer`/`implementation-planner`/`developer-agent`/
  `ui-reviewer`/`qa-acceptance-reviewer`, монтирует `<ScrollFX/>`, ставит `.media-ph`
  при отсутствии ассетов. Единственный наш скилл, который **коммитит и пушит** (рабочей ветки).

> `page-composer` vs `build-pages`: первый — **одна** страница, глубокая
> реконструкция из библиотеки с гейтом и resume; второй — **batch** нескольких
> страниц, автономно, с коммитом на страницу. Не дублируют друг друга.

- **`page-validate`** (`/page-validate <route>` | «сверь страницу с `_new`») —
  **верификатор** одной собранной страницы (read-only, код не правит). Два слоя:
  (1) live render QA дисциплиной `forge-validate`, применённой ко всей странице
  (3005, консоль/overflow/light·dark/responsive/motion); (2) статическая сверка
  `web/src/app/<route>/page.tsx` ↔ **нового** брифа `wiki/product/<slug>_new.md`.
  Выдаёт **одну сводную таблицу** по секциям: актуален ли DS-компонент (барель
  `@/components/ds` + совпадение архетипа с брифом), кастом-настройки, переходы
  между секциями, совпадение текста с `_new.md` — и вердикт `clean/drift/
  out-of-sync`. Найденное чинят отдельным проходом (`redraw-block` /
  `retype-section` / ручная правка). Опирается на `forge-validate`. Дока:
  [[page-build-skills#`page-validate` — верификация страницы против `_new.md`|Page Build Skills §6]].

### 3.4 Library layers — visual + parts ДО постраничной сборки

Оба строят **слои библиотеки**, которые потом потребляет `page-composer`; сами
страницы не собирают, регистрируют готовое через `component-library-preparer`.

- **`visual-layer-forge`** (`/visual-layer-forge` | `"<target>"` | gap) —
  оркестратор системной visual-layer библиотеки (backgrounds · section transitions
  · ambient motion · composition recipes). Аудитит существующую библиотеку,
  фиксирует контракты, назначает design-system-architect/ui-designer/ui-ux-designer/
  инженера/QA + advisory `ui-ux-pro-max`, держит один user-гейт, fix loop ≤3,
  регистрирует через `component-library-preparer` incremental. Не делает фон под одну
  страницу — строит систему, из которой выбирает `page-composer`. Режимы:
  full / targeted / gap. Живой каталог — `web/src/app/dev/visual-lab/`.
  Дока: [[component-library#Визуальные слои (visual-layer-forge)|Visual layers]].

- **`primitive-layer-forge`** (`/primitive-layer-forge` | `"<target>"` | gap) —
  оркестратор **слоя частей** (L3 atoms + L4 layout shells). Извлекает
  повторяющиеся под-части из 15 (deprecated) `Lab*` и DS-секций/страниц в
  импортируемые **чистые DS-атомы и DS-каркасы** в `web/src/components/ds`
  (баррель `@/components/ds`, стили в `ds.css`/`.ds` — **не** в `_kit.tsx`/
  `_layout.tsx`), рефакторит потребителей на `@/components/ds` **под
  визуальным паритетом** (рендер не меняется), регистрирует через
  `component-library-preparer` и **переключает `compose_mode` →
  `atoms-and-layouts`** — после чего `page-composer` собирает секции **из частей**.
  Назначает `design-system-architect`/`multi-platform-apps-frontend-developer`/
  QA-ревьюеров + advisory `ui-ux-pro-max`, один user-гейт, fix loop ≤3. Закрывает
  конфликты CL-001 (`_layout.tsx`) и CL-002 (атомы) **фактическим извлечением**, не
  правкой доков. **Не путать с `forge-primitives`** (тот лишь строит карту одного
  архетипа и не извлекает). Режимы: full / targeted / gap.

### 3.4b Page edits — точечная правка готовой страницы (трио 2026-06-26)

Скиллы слоя **B**: одна направленная операция над **существующей** страницей, один
user-гейт, одна единица за вызов. Сами application-код пишут на месте или через
`multi-platform-apps-frontend-developer`; не batch. Детали и порядок применения —
[[page-build-skills|Page Build Skills]].

| Скилл             | Триггер                                               | Что делает                                                                                                                                                                                                                                                                                                         |
| ----------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ds-ify-page`     | `/ds-ify-page`, «переведи `<route>` на DS»            | Верный рефактор страницы на барель `@/components/ds` (контент/порядок 1:1; гэпы → `redraw-block`/TODO). Шаг 0 перед арт-дирекшном.                                                                                                                                                                                 |
| `retype-section`  | `/retype-section`, «секцию 3 из бенто в галерею»      | Свап ТИПА одной секции на другой архетип + маппинг контента (drop/needs-value на гейт). Не редизайн.                                                                                                                                                                                                               |
| `zone-background` | `/zone-background`, «один фон под эти секции»         | Обернуть идущие подряд секции в зону (`.ds-zone`) с общим фоном (light `--lobes` / dark `--lobes-dark`+`--on` / flip `ds-zone--flip`); `surface` под тон; own-backdrop секции — наружу.                                                                                                                            |
| ## You decide     | `/zone-rhythm`, «разбей `<route>` на зоны light/dark» | Комбинатор НАД `zone-background`: всю страницу в ОДНУ сквозную `.ds-zone` со стопкой фонов (`--lobes` + `--lobes-dark`), на каждом тональном стыке — флип-шов `<ZoneToneFlip/>`/`<ZoneToneFlipReverse/>` (бренд-блум) + `<ZoneBlobs/>`. StatementHero внутрь, Cinema/Footer наружу. Эталон — `/trust/methodology`. |

### 3.5 Single-block / контент / bootstrap

| Скилл | Триггер | Что делает |
|---|---|---|
| `redraw-block` | «доведи блок…», `redraw <Component>` | Один структурный блок → продуктовое качество (Apple-style). Режим A: редизайн существующего компонента; режим B: извлечь инлайн-секцию в prop-driven Server Component **чистого DS** (`web/src/components/ds`, баррель `@/components/ds`, scope `.ds`, стили в `ds.css`) — **не** оборачивая/копируя `Lab*`/`_kit`. Версии light+dark, инспектор версий. Контент-инвариант, раскладку можно менять (`structure=слабо/средне/сильно`). |
| `design-jam` | `/design-jam "<блок>"`, «два дизайнера на `<секцию>`» | ОРКЕСТРАТОР дизайна **одного** блока: два дизайнера разными движками (Дизайнер A — `baoyu-design`, Дизайнер B — `ui-ux-pro-max`) независимо → дебаты (взаимная критика) → синтез в один дизайн → вёрстка боевого TSX (frontend-инженер) → финальное ревью стыков с fix-loop. Сам код не пишет; **два** user-гейта. Контент-инвариант, DS EvalLense — source of truth. Один блок за вызов. |
| `evallense-site` | «перепиши бриф страницы», `evallense doc <slug>` | Редактура **продуктовой документации** (`wiki/product/*.md`), не кода. Ходит за фактами в источник правды, сверяет раскладку с page-design-patterns/section-types, пишет `wiki/product/<slug>_new.md`. |
| `init-docs` | `/init-docs` | Интервью о продукте/архитектуре → стартовая документация в `wiki/product/`, `wiki/architecture/`, стек-секции CLAUDE.md. |

### 3.6 Внешние скиллы, на которые опираются оркестраторы (не наши)

- `ui-ux-pro-max` (плагин) — advisory-ревью типографики/композиции/responsive в
  `component-forge` (4A.2) и `visual-layer-forge`. **Новую DS не создаёт.**
- `design:design-critique`, `design:accessibility-review` — визуальное ревью
  (ручной шаг в `build-pages`).
- `baoyu-design`, `ui-ux-pro-max` (плагины) — два движка дизайна в `design-jam`
  (Дизайнер A / Дизайнер B); `baoyu-design` также делает self-contained
  HTML-прототипы **вне** `web/`.
- `motion-framer` — **справочник** по Motion/Framer Motion (API, spring-пресеты,
  easing). ⚠️ Project-guard: в `web/` Framer Motion **не используется** (движение —
  только через `ScrollOrchestrator`, пакета нет в зависимостях). Применять как
  референс / в `baoyu-design`-прототипах вне `web/`; тайминги переносить в
  `ScrollOrchestrator` руками.

---

### 3.7 Dispatch — быстрый раздатчик ad-hoc правок (мета-оркестратор)

Стоит **над** остальными: не пайплайн с фазами/гейтами, а тонкий слой-диспетчер.
User держит его открытым в чате и **накидывает задачи потоком**; диспетчер их
мгновенно триажит и раскидывает по фоновым воркерам — независимые параллельно,
конфликтующие по файлу последовательно. Цель — **скорость**: user не залипает над
чатом, у него всегда есть очередь работающих задач.

| Скилл | Триггер | Что делает |
|---|---|---|
| `dispatch` | `/dispatch`, «накидаю задач — раздавай», «диспетчер задач», «раскидай по агентам» | Триаж → dispatch → очередь → сводка. Сам код **не пишет** и глубоко **не думает**: «мысль» — внутри воркеров. |

Ключевые свойства (детали — `.claude/skills/dispatch/SKILL.md`):

- **Липкая сессия.** `/dispatch` вызывается **один раз** и держит режим открытым
  (маркер `.claude/runs/dispatch/SESSION.md` = `active`): дальше **каждое**
  сообщение user = новые задачи в очередь, повторно скилл звать не нужно. Закрытие —
  `/dispatch stop` («стоп диспетчер»); есть `пауза`/`продолжаем`. Маркер `active` →
  авто-resume после суммаризации контекста.
- **Dispatch report.** `/dispatch report` («диспатч репорт») — **промпт + ответ**
  (verbatim) по задачам. **Скоуп по умолчанию = текущий чат**: задачи тегаются
  `session_id` из `SESSION.md` (колонка `Sess` в `queue.md` + поле `session:` в
  per-task логе `tasks/<id>.md`), и report показывает только их — не весь
  накопленный `queue.md`. Фильтры: `report #N` / `report done|failed` / `report
  short`; снять скоуп — `report all`; прошлый прогон — `report session <id>`. Режим
  сессии отчёт не меняет.
- **Меню команд.** `/dispatch -h` (`--help`) — кликабельное **интерфейсное меню**
  всех команд (visualize-виджет в терминальном стиле: строки с подсказками,
  `:hover`-подсветка, клик → `sendPrompt` вводит команду; фолбэк — `AskUserQuestion`).
  Справка **сессию не открывает**.
- **Живая схема.** `/dispatch info` («покажи схему») — терминальная ASCII-блок-схема
  состояния в чате: диспетчер → активные воркеры (по факту `TaskList`) → очередь с
  `⛓ blocked-on` → tally `✅/⛔/⏳/⏸`, перерисовка на каждый вызов. `info graph` —
  то же как **терминальное окно** (visualize-виджет: chrome+светофор, фосфорный фон,
  ANSI-цвета статусов, tally-бар, дерево зависимостей, мигающий курсор, lens-градиент).
- **Застрявшие задачи.** Зависший/тихо умерший фоновый воркер (`running` без
  завершения) или осиротевшая блокировка (`queued` за упавшей задачей) детектятся
  через `TaskList`/`TaskGet`/`TaskOutput`; `/dispatch stuck` их показывает,
  `/dispatch retry #N` (`retry failed` / `all-stuck`, «перезапусти застрявшие»)
  снимает зависший воркер `TaskStop` и поднимает нового (attempt #k в логе, со
  сверкой полу-правок). Двойное падение по той же причине → эскалация к user, не
  бесконечный retry.
- **Модели наоборот.** Диспетчер крутится на **лёгкой** модели сессии (Sonnet /
  inherit — её задаёт user при старте чата, скилл её не трогает); каждого воркера
  запускает на **Opus** (`model: "opus"`).
- **Сложность → Opus, не main.** Диспетчер на слабой модели **никогда** не делает
  прикладную работу сам «потому что задача сложная». Лестница эскалации в Opus:
  фоновый Opus-воркер → **foreground Opus** (`run_in_background:false`,
  `effort:"high"`, диспетчер ждёт) → профильный пайплайн на сильной модели. Команда
  **«форсни на опус #N»** поднимает задачу сразу foreground-Opus. «Сделаю в основной
  сессии» — запрещённый исход.
- **Воркер по умолчанию** — `general-purpose` (Opus), `run_in_background: true`.
  Получает компактный **task packet** (не весь чат) с инжектом проектных рейлов
  (CLAUDE.md, DS-барель, `ScrollOrchestrator`, `section-lab`, glass, pnpm, порт
  3005, Lightning CSS). Воркер **может сам вызвать профильный скилл**
  (`redraw-block`, `zone-rhythm`, `retype-section`, …), если задача под него ложится.
- **Параллель/очередь.** Независимые задачи стартуют сразу пачкой; конфликт по
  **горячему файлу** (`globals.css`, `ds.css`, баррель `@/components/ds`,
  `ScrollOrchestrator.tsx`, та же `page.tsx`) → **сериализация** (`blocked-on`),
  без worktree/merge. Очередь — в `.claude/runs/dispatch/queue.md` (переживает
  суммаризацию контекста; resume при рестарте сессии).
- **Границы.** Тяжёлую оркестрацию целой страницы (`build-pages`, `page-composer`,
  `component-forge-batch`) и арт-дирекшн-гейты в фонового воркера **не** тащит —
  эскалирует user как отдельный пайплайн. Деструктив сам не инициирует.

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

**Primitive Layer Forge (слой частей, разово → потом targeted):**
```
primitive-layer-forge: Ф1 Audit → Ф2 DS Guard → Ф3 Extraction Plan
  → ⛔Design review (ui-ux-pro-max + DS) → ⛔Gate (user)
  → Ф4 Implementation (extract DS-атомы/DS-каркасы в @/components/ds + refactor потребителей под visual parity)
  → Ф5 Visual-parity QA (+fix-loop ≤3) → Ф6 Registration (preparer incremental)
  → compose_mode: whole-sections-only → atoms-and-layouts
```

**Page Composer (одна страница, глубокая реконструкция):**
```
page-composer: Ф0 Resolve → Ф1 Current page → Ф2 Content map → Ф3 Library match (ready)
  → Ф4 Reconstruction plan → Ф5 Page composition → Ф6 Visual composition (+ui-ux-pro-max)
  → Ф7 Gap routing (→ component-forge / primitive-layer-forge / visual-layer-forge)
  → ⛔Design Review Gate (user) → Ф8 Implementation → Ф9 Full-page QA (+fix-loop ≤3)
  → Ф10 Final ui-ux-pro-max → отчёт
```

**Library refresh loop (общая шина):**
```
forge-index / visual-layer-forge / primitive-layer-forge
  → /component-library-preparer "<target>" (incremental)
  → манифесты + component-library.md → build-pages / page-composer потребляют (только `ready`)
```

---

## 6. Общие рейлы (для всех оркестраторов)

- **Гейты:** `component-forge`, `visual-layer-forge`, `primitive-layer-forge` и
  `page-composer` останавливаются на user-гейтах; `component-forge-batch` и
  `build-pages` — автономны (гейт только на старте). Оркестраторы **сами не
  запускаются и не дёргают друг друга** — каждый запускает user; связь между ними
  идёт через реестр (манифесты), не через авто-вызов.
- **Коммиты:** forge-семейство, `component-library-preparer`, `visual-layer-forge`,
  story-агенты — **не коммитят/не пушат**. Исключение — `build-pages` (коммит на
  страницу + push рабочей ветки в конце; без merge/force).
- **Dev-сервер:** только pnpm, порт **3005**, и только когда нужен live-QA — по
  правилу CLAUDE.md сам не поднимается без явной просьбы (preview через `launch.json`).
- **Task packets:** агенту передаётся короткий пакет с нужными правилами DS дословно,
  не весь чат. Vendor-агенты `wshobson/` неизменяемы.
- **Compose-mode:** пока нет публичных DS-каркасов в `@/components/ds` —
  `whole-sections-only` (конфликт CL-001; сегодня `_layout.tsx` не существует).
  Переключает на `atoms-and-layouts` `primitive-layer-forge` после форджа слоя
  частей **в чистый DS** (см. `component-library.md`).
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
