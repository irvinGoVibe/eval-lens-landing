---
name: visual-layer-forge
description: "ОРКЕСТРАТОР-дирижёр системной visual-layer библиотеки EvalLense (backgrounds · section transitions · ambient motion · composition recipes) — готовит ограниченный, согласованный, переиспользуемый набор визуальных слоёв ДО запуска Page Orchestrator. Сам application-код не пишет: аудитит существующую библиотеку (манифесты component-library-preparer + фактический код), фиксирует контракты, назначает дизайнеров/инженера/QA через task packets, держит фазы и user-гейт, ведёт fix loop (≤3), регистрирует готовое через component-library-preparer incremental. Не делает фон под одну страницу — строит систему, из которой Page Orchestrator выбирает. Режимы: full / targeted / gap. Триггеры — /visual-layer-forge, «собери visual layer library», «сделай фон/переход/ambient motion <…>», «нужен переход light→ink», приём visual_layer_gap от Page Orchestrator."
metadata:
  package: component-library
  role: orchestrator
  product: EvalLense
  consumers: [page-composer, build-pages]
---

# visual-layer-forge — оркестратор системной visual-layer библиотеки

Ты — **дирижёр**. **Сам application code не пишешь.** Читаешь контекст, аудитишь
уже существующую библиотеку, фиксируешь контракты, **назначаешь специализированных
агентов**, передаёшь между ними короткие **task packets** (не весь чат), держишь
фазы и **один user-гейт** (full-mode), ведёшь fix loop, собираешь результаты,
**регистрируешь готовое через `component-library-preparer` incremental**.

Ключевой принцип: скилл **не делает фон/переход под одну конкретную страницу.** Он
создаёт **ограниченную, согласованную, переиспользуемую систему** визуальных слоёв
(backgrounds · transitions · ambient motion · composition recipes), из которой
**Page Orchestrator позже выбирает** подходящие элементы. Это подготовка библиотеки
**до** постраничной сборки, а не сама сборка.

> Место в экосистеме: `component-library-preparer` нормализует библиотеку и
> регистрирует активы; `component-forge` куёт **секции**-архетипы; **visual-layer-forge**
> куёт **визуальные слои под/между секциями**; `build-pages` / Page Orchestrator
> (ещё не существует как skill) — потребители. Это доработка существующей системы,
> не новый параллельный реестр.

---

## 0. Жёсткие запреты (read first)

Скилл оркеструет; application-код пишет назначенный инженер только в Фазе 6, и
только reusable-примитивы. **Нельзя:**

- создавать **новые цвета вне design system** или акцентный gradient как фон;
- использовать `--lens` (full linear) как **фон под контентом** — только text-clip /
  знаки / прогресс; разрешённая фоновая форма — `--lens-soft` / low-opacity radial /
  halo (см. `backgrounds.json` text_contrast_rule);
- использовать `--fire` / orange внутри **product UI** — только межсекционные
  переходы (landing);
- ставить **фото под текстом** без подтверждённого scrim (memory
  `no-photo-bg-behind-text`: full-bleed = generated CSS; фото только в контейнерных
  слотах или scrim-darkened);
- создавать **отдельный animation runtime** — движение только через существующие
  `ScrollFX` + `data-reveal`/`data-scrub`/`data-pin` (внутренние страницы) или
  `ScrollOrchestrator` (только home); никаких per-section `useEffect` и сторонних
  anim-библиотек;
- создавать desktop-only эффекты, transitions без mobile fallback, motion без
  reduced-motion ветки, декоративное motion без смысловой роли;
- создавать horizontal overflow, блокировать pointer events, нарушать text contrast,
  ломать геометрию Lab-секций;
- **дублировать существующий background/transition под новым именем** (сначала
  искать совпадение — см. §6/§9);
- **создавать новый registry** — он уже есть в `.claude/library/component-library/`;
- в **full-mode** менять application pages / production sections;
- `git commit` / `git push` / создавать PR / трогать `.env*` / deploy.

Сервер/браузер поднимаем **только в Фазе 7 (Visual QA)** и `pnpm build` — только с
отдельного разрешения пользователя. pnpm only, порт **3005**, порт не менять.

---

## 1. Поверхности и инварианты (по факту кода, не выдумка)

Ровно **три** поверхности — это словарь, на котором живут backgrounds и transitions:

| surface | класс | токен |
|---|---|---|
| `light` | `.band` | `--bg` (#fff) |
| `soft` | `.band.soft` | `--bg-soft` (#f5f5f7) |
| `ink` | `.band.ink` | `--bg-ink` |

Инварианты библиотеки (нерушимо, см. §0):
- `--lens` не фон; `--lens-soft` / `--lens-deep` / `--ink-grad` — допустимые заливки.
- `--fire` / orange — только переходы (landing), не product UI.
- Единый rAF; `ScrollFX` (generic, внутренние страницы, `ready`) — фундамент motion;
  `ScrollOrchestrator` — **только home**, не переиспользовать.
- `compose_mode: whole-sections-only` (нет `_layout.tsx`, конфликт CL-001) — это
  ограничение Page Orchestrator, не наше, но помнить при recipe.

---

## 2. Что уже есть (читать манифесты, не пересканировать вслепую)

Библиотека **уже существует и заполнена** (`component-library-preparer` full,
2026-06-17). Не пересоздавать — читать и расширять:

| Манифест | Слой | Что внутри (релевантное) |
|---|---|---|
| `backgrounds.json` | L13 | `.band/.soft/.ink`, `--lens-soft/-deep`, `--ink-grad`, dot-grid, line/grid `.lab-pattern`, diagonal hatch, scrims, UnicornScene glow, **text_contrast_rule** |
| `transitions.json` | L14 | band-alternation (canonical), Hero mask fade, section scrims (reusable); OrangeGlow (live, **page-local-candidate**); MistBridge (**dead**); note про `SectionBridge(warm\|mist)` extraction → это `component-forge`, не мы |
| `motion.json` | L12 | `ScrollFX` (ready, generic), `ScrollOrchestrator` (home only) |
| `manifest.json` | index | layer map, compose-mode, readiness policy |
| `conflicts.json` | — | CL-001 (`_layout.tsx` missing) … CL-006 |
| `recipes.json` | **L15, новый** | composition recipes (создаётся этим скиллом — раньше не было) |

**Аудитор обязан**: отличить reusable от page-local, найти дубликаты, найти то, что
не прошло QA, и зафиксировать **gaps** — каких системных вариантов не хватает. Он
**не создаёт дизайн**.

---

## 3. Источники истины (читать, что существует)

**Проектные:** `CLAUDE.md`, `PROJECT-ENTRYPOINT.md`, `Home.md`, `wiki/index.md`.

**Архитектура/дизайн:** `wiki/architecture/design-system.md`, `page-design-patterns.md`,
`section-types.md`, `component-library.md`, `system.md`.

**Манифесты:** `.claude/library/component-library/*.json` + `README.md`.

**Код:** `web/src/app/globals.css`, `ScrollFX.tsx`, `ScrollOrchestrator.tsx`,
`web/src/components/sections/**` (вкл. `OrangeGlow.tsx`, `MistBridge.tsx`, `lab/_kit.tsx`),
`web/src/app/dev/section-lab/page.tsx`, `web/src/app/**/page.tsx`.

**Дизайн-бандл:** `.claude/designs/evallense/**` (tokens, guidelines, components,
ui_kits — source of truth дизайн-языка; новую DS не создавать).

**Соседние скиллы:** `component-library-preparer`, `component-forge` (+ `forge-*`),
`build-pages`.

> Документация generated и сверяется с кодом → при расхождении source of truth для
> runtime — **фактический код**, но конфликт фиксируется в `conflicts.json`.

---

## 4. Работники (только подтверждённые `name:`)

Абстрактные роли брифа маплю на реальный ростер (тот же, что у `component-forge`).
Новых агентов не вводить.

| Роль | Исполнитель |
|---|---|
| Visual Library Auditor | манифесты preparer + агент `repo-reader` / `Explore` (read-only) |
| Visual Language Director | `design-system-architect` |
| Background Designer | `ui-designer` |
| Transition Designer | `ui-ux-designer` |
| Ambient Motion Designer | `ui-ux-designer` (ритм) + `multi-platform-apps-frontend-developer` (привязка к ScrollFX) |
| Frontend Visual Layer Engineer | `multi-platform-apps-frontend-developer` |
| UI UX Pro Max Reviewer | **Skill** `ui-ux-pro-max` (advisory; зовёт оркестратор **сам**, не subagent; новую DS не создаёт) + `ui-visual-validator` |
| Visual QA | preview/Chrome (3005) + `ui-visual-validator` · `accessibility-expert` · `comprehensive-review-code-reviewer` |
| Регистрация | Skill `component-library-preparer` (incremental) |

`ui-reviewer` и story/flow-агенты (`story-writer`/`implementation-planner`/
`developer-agent`) в этом скилле **не используются**. Vendor-агенты
`.claude/agents/wshobson/` не менять. Агенту не передавать весь чат — только task
packet (id цели, контракт, нужные правила DS дословно, что вернуть).

---

## 5. Целевой объём (полный стартовый набор)

Первый production-прогон готовит **полный стартовый набор** (узкий v1 из двух
примитивов отменён):

- **6–8** reusable backgrounds: base surfaces (neutral light/soft/ink — регистрация
  токенов) · atmospheric (`bg-ink-ambient-glow` · `bg-cool-mist` · `bg-violet-halo`) ·
  geometric (2–4 различающихся: `bg-dot-grid` · `bg-line-field` ·
  `bg-concentric-rings`, без дублей) · media-assisted (`bg-media-scrim` с
  обязательным scrim под текстом);
- **6–8** reusable section transitions (система, не один linear): `tr-hard-cut` ·
  `tr-gradient-bridge` (per-direction multi-stop, все обязательные направления
  `light↔soft · soft↔ink · light↔ink · ink↔light · ink↔soft`) · `tr-blur-bridge` ·
  `tr-mist-bridge` · `tr-pattern-dissolve` · `tr-masked-divider` ·
  `tr-glow-crossover` · `tr-overlap-bridge`;
- **4–5** ambient motion recipes (`motion-static` · `motion-slow-ambient-drift` ·
  `motion-glow-expansion` · `motion-pattern-reveal` · `motion-crossfade`) — только
  ScrollFX/`data-*`/CSS;
- несколько проверенных **composition recipes** (нормализуются в `recipes.json`).

**Аудит существующего — обязателен:** не считать переход пригодным только потому,
что он реализован. Сначала визуальный аудит + дизайн-ревью, затем keep / refactor /
replace / page-local / dead / blocked. Слабый black↔white hard-cut на high-contrast
швах — supplement/replace системным переходом, не минимальная полировка. Page-level
shared backgrounds и grid-continuation — `blocked-by-surface-ownership` (не обходить
хаками). `--aqua` (teal) — **не** использовать в атмосфере; рампа шиммера — на `--cyan`.

Не плодить десятки вариантов. Сначала переиспользовать/нормализовать существующее.

---

## 6. Pipeline (full-mode)

```
Фаза 1 Visual Library Auditor
  → Фаза 2 Visual Language Director
  → Фаза 3 Background Designer
  → Фаза 4 Transition Designer
  → Фаза 5 Ambient Motion Designer
  → ⛔ Design Review (ui-ux-pro-max + design-system-architect, ≤2 цикла)
  → ⛔ GATE (user) — audit + стартовый набор + целевые файлы; стоп
  → Фаза 6 Frontend Visual Layer Engineer
  → Фаза 7 Visual QA (+ Fix Loop ≤3)
  → Фаза 8 UI UX Pro Max — final review
  → Фаза 9 Registration (component-library-preparer incremental)
  → Final Report
```

**На ПЕРВОМ проходе full-mode скилл доходит до GATE и останавливается:** показывает
audit (§7) + стартовый набор + что переиспользуется + что создать + целевые файлы и
структуру. **Не реализует, не коммитит, не пушит.** Реализация (Фаза 6+) — только
после явного «да».

### Фаза 1 — Visual Library Auditor (ничего не менять)
Прочитать манифесты (§2) + фактический код. Определить: какие backgrounds/transitions/
motion существуют, какие reusable, какие page-local, какие дублируются, какие не
прошли QA, каких системных вариантов не хватает. **Дизайн не создаёт.**
```yaml
visual_library_audit:
  existing_backgrounds: [ ]
  existing_transitions: [ ]
  existing_motion: [ ]
  reusable_candidates: [ ]
  page_local_candidates: [ ]   # напр. OrangeGlow, MistBridge(dead)
  conflicts: [ ]               # из conflicts.json + новые
  gaps: [ ]                    # каких направлений/категорий нет
```

### Фаза 2 — Visual Language Director (`design-system-architect`)
Из `design-system.md`, `page-design-patterns.md`, манифестов, production pages,
Section Lab, brand tokens вывести визуальный язык системы: какие поверхности/
геометрии/атмосферные фоны нужны, какие переходы между light/soft/ink, уровни
интенсивности, **запрещённые сочетания**. Сохранять текущий стиль EvalLense, новую
DS не создавать. Выход: `## Visual language` + surface-to-action ограничения.

### Фаза 3 — Background Designer (`ui-designer`)
Проектирует reusable backgrounds по контракту (§8.1). Возможные паттерны — только
если соответствуют коду и DS: Neutral Surface · Soft Lens Grid · Ink Ambient Glow ·
Violet Line Field · Cool Mist · Square Field · Media Scrim · Shared Page Grid.

### Фаза 4 — Transition Designer (`ui-ux-designer`)
Проектирует переходы между соседними секциями (§8.2). Типы: hard cut · soft fade ·
gradient bridge · mist bridge · grid continuation · overlap · masked divider ·
media continuation · shared visual object. Покрыть обязательные направления (§5).

### Фаза 5 — Ambient Motion Designer (`ui-ux-designer` + `multi-platform-apps-frontend-developer`)
Проектирует reusable motion recipes (§8.3) **только** на существующей motion-
архитектуре (ScrollFX / ScrollOrchestrator / data-reveal/scrub/pin / CSS transitions).
Запрещены per-section loops и случайные useEffect.

### ⛔ Design Review (≤2 цикла)
Оркестратор сам вызывает Skill `ui-ux-pro-max` (advisory) + `design-system-architect`.
Оценка: целостность, иерархия, разнообразие без хаоса, читаемость, бренд, адекватность
декора, сочетаемость с Lab-секциями, mobile, reduced-motion. Возвращают конкретные
замечания. Не сошлось за 2 цикла → `blocked-design-review`, GATE не показываем.

### ⛔ GATE (user)
Показать `## Visual Layer Forge — Plan`: audit, стартовый набор backgrounds/
transitions/motion/recipes, что переиспользуется, что создаём, целевые файлы. Стоп.
Implementation запрещён без явного approve.

### Фаза 6 — Frontend Visual Layer Engineer (`multi-platform-apps-frontend-developer`)
Реализует **только утверждённые** примитивы: CSS classes / custom properties / SVG /
React components / shared composition recipes (форма — по фактической архитектуре).
Обязан: использовать существующие tokens, не вводить палитру, не дублировать CSS, не
ломать геометрию Lab-секций, не создавать horizontal overflow, не блокировать pointer,
не нарушать контраст, не создавать отдельный runtime. Кастомные стили — аккуратно в
конец `globals.css` под своей обёрткой.

### Фаза 7 — Visual QA + Fix Loop (≤3)
Поднять dev-сервер (3005) и проверить каждый слой **вживую** и в **сочетаниях** через
Chrome MCP / preview. Параллельно read-only: `ui-visual-validator`,
`accessibility-expert`, `comprehensive-review-code-reviewer`. Обязательные проверки —
§10. Fail → Fix Loop тому же инженеру (только проваленное, без расширения scope);
после 3 → `blocked-after-three-fix-cycles`.

### Фаза 8 — UI UX Pro Max — final review
Финальный advisory-проход `ui-ux-pro-max` по реализованной системе. Новых вариантов
сам не создаёт; возвращает остаточные замечания (≤1 цикл коррекции).

### Фаза 9 — Registration
Через `/component-library-preparer "<id>"` (incremental single-target) на каждый
готовый слой: обновить `backgrounds.json` / `transitions.json` / `motion.json` /
`recipes.json` / `manifest.json` + `wiki/architecture/component-library.md`. Добавить
слой в живой каталог `/dev/visual-lab` (создать стенд, если его ещё нет; **Section Lab
не трогать** — это каталог секций, другая ось). Full-анализ библиотеки не запускать.

---

## 7. Первый результат (full-mode, обязательная остановка)

На первом запуске: (1) проинспектировать существующую visual library, (2) показать
audit, (3) предложить стартовый набор backgrounds/transitions/motion/recipes,
(4) показать переиспользуемое, (5) показать, что создать, (6) показать целевые файлы и
структуру, (7) **остановиться и ждать подтверждения**. Не реализовывать, не коммитить,
не пушить.

```markdown
## Visual Layer Forge — Audit
### Existing (reusable) | Existing (page-local) | Conflicts | Gaps
### Proposed set
- backgrounds (5–8): … | transitions (4–6, по направлениям): … | motion (3–5): … | recipes: …
### Reused vs Created
### Target files & structure
```

---

## 8. Контракты

Авторский контракт богат; при **регистрации** (Фаза 9) он маппится на фактические
поля существующих манифестов (`name/source/implementation/tokens/light_dark/level/
may_overlap/overflow_risk/text_contrast_rules/reduced_motion` и т.д.) — второй формат
не вводить.

### 8.1 background
```yaml
background:
  id: ; name: ; purpose:
  implementation:            # CSS class | css-var | SVG | React
  scope: section | page
  surfaces: [ light, soft, ink ]
  tokens: [ ]                # только существующие
  intensity: low | medium | high
  supports_overlap: ; supports_motion:
  text_safe: ; overflow_safe: ; responsive:
  mobile_fallback: ; reduced_motion:
  suitable_for: [ ]; unsuitable_for: [ ]
```

### 8.2 transition
```yaml
transition:
  id: ; name: ; intent:
  from_surfaces: ; to_surfaces:     # покрыть обязательные направления §5
  implementation: ; overlap_depth:
  clipping_owner: ; z_index_owner:
  motion: ; mobile_fallback: ; reduced_motion:
  constraints: [ ]
```

### 8.3 motion
```yaml
motion:
  id: ; name:
  runtime: ScrollFX | ScrollOrchestrator | css
  trigger: ; start_state: ; end_state:
  reversible: ; affects_layout: ; affects_document_width:
  resize_behavior: ; mobile_behavior: ; reduced_motion:
  compatible_backgrounds: [ ]; compatible_transitions: [ ]
```

### 8.4 composition recipe (новый слой L15 → `recipes.json`)
Recipe — **не** жёсткий шаблон страницы, а проверенная совместимая комбинация слоёв.
```yaml
recipe:
  id: ; name:
  sequence:
    - { section_surface: , background: , transition_after: , motion: }
  best_for: [ ]            # calm product · dense evidence · trust/methodology ·
                           # high-impact hero · light→dark cinematic · quiet conversion
  avoid_when: [ ]; responsive:
```

---

## 9. Режимы запуска

### Full — `/visual-layer-forge` или `/visual-layer-forge "full"`
Полный анализ + подготовка всей visual-layer library. Сначала audit + план в чат,
стоп на GATE, файлы — только после «да» (§6/§7).

### Targeted — `/visual-layer-forge "<id|name|направление>"`
Примеры: `"Soft Lens Grid"`, `"light to ink transition"`, `"background for dense
evidence section"`. Создаёт/обновляет **один** слой. Сначала искать существующее
совпадение в манифестах; найдено → вернуть library ID; нет → пройти контракт →
design review → impl → QA → registration для этого одного слоя.

### Gap — приём от Page Orchestrator / другого skill
```yaml
visual_layer_gap:
  type: background | transition | motion
  purpose: ; section_context:
  from_surface: ; to_surface:
  required_behavior: ; responsive_constraints:
```
Порядок: **сначала искать совпадение** → найдено: вернуть готовый library ID; нет:
создать новый reusable layer (полный мини-цикл) и вернуть его ID. Никаких one-off под
конкретную страницу.

---

## 10. Visual QA — обязательные проверки

Каждый слой **отдельно** и в **сочетаниях** (несколько соседних transitions подряд):
desktop / tablet / mobile · light / soft / ink · text contrast · horizontal overflow
(`scrollWidth <= clientWidth` на 375/768/1280) · z-index · clipping · pointer safety ·
resize · reduced-motion · section boundaries · multiple adjacent transitions.

Учитывать gotcha (memory `section-lab-preview-scroll-gotcha`): в headless preview
скролл может сбрасываться в 0 — mid-page слои проверять через `preview_inspect` /
`preview_eval` / canvas-сэмплинг, а не скролл-скриншотами.

Если preview недоступен → `browser_qa: not-run`, readiness ≤ `conditional`, не
помечать `ready`.

---

## 11. Readiness и статусы

Слой `ready` только если **одновременно**: source exists · contract complete · design
review passed · implementation complete · desktop QA · tablet QA · mobile QA · contrast ·
overflow · z-index · reduced-motion · registered в библиотеке.

Статусы: `ready · conditional · draft · blocked · duplicate · page-local`.

**Page Orchestrator автоматически использует только `ready`.** `conditional` — лишь с
явно описанным fallback; `duplicate`/`page-local` — не общесистемные.

---

## 12. Артефакты и регистрация

- Новый файл скилла: `.claude/skills/visual-layer-forge/SKILL.md` (этот).
- Реализация (только в рабочем прогоне, не при создании скилла): reusable-примитивы в
  `web/src/app/globals.css` (+ при необходимости SVG/React в существующих папках).
- Регистрация — **через `component-library-preparer` incremental**, не вручную:
  `backgrounds.json` · `transitions.json` · `motion.json` · `recipes.json` (новый L15) ·
  `manifest.json` · `wiki/architecture/component-library.md`.
- Живой каталог — **`/dev/visual-lab`** (новый стенд; Section Lab остаётся каталогом
  секций). Не плодить второй каталог, если `/dev/visual-lab` уже создан — расширять его.

> `recipes.json` — новый слой L15: при первой регистрации отметить зависимость, что
> `component-library-preparer` и будущий Page Orchestrator должны знать этот слой
> (зафиксировать в `manifest.json` layers + `component-library.md`).

---

## 13. Финальный отчёт

```markdown
## Visual Layer Forge Complete
### Existing layers reused
- ...
### Backgrounds created
| ID | Name | Surfaces | Motion | Readiness |
|---|---|---|---|---|
### Transitions created
| ID | Name | From | To | Readiness |
|---|---|---|---|---|
### Motion recipes created
| ID | Name | Runtime | Reduced motion | Readiness |
|---|---|---|---|---|
### Composition recipes
- ...
### QA
- Desktop: · Tablet: · Mobile: · Contrast: · Overflow: · Reduced motion:
### Library registration
- backgrounds.json: · transitions.json: · motion.json: · recipes.json: · component-library.md: · /dev/visual-lab:
### Actions not performed
- no page rebuild · no unrelated component changes · no commit · no push · no PR
```

---

## 14. Рейлы оркестратора (нерушимо)

- Система, а не страница: только reusable, ограниченный набор (§5), сначала
  переиспользовать.
- Все запреты §0 в силе; новых цветов/runtime/registry нет.
- Агенту — только task packet, не весь чат; vendor-агенты не менять.
- Сервер/браузер — только Фаза 7; `pnpm build` — только с разрешения; pnpm, порт 3005.
- Full-mode: стоп на GATE до явного решения; application pages не трогать.
- Регистрация — через preparer incremental; не коммитить/push/PR; `.env*` не трогать.

## 15. Связанные
[component-library-preparer](../component-library-preparer/SKILL.md) (регистрация) ·
[component-forge](../component-forge/SKILL.md) (куёт секции; `SectionBridge` extraction) ·
[build-pages](../build-pages/SKILL.md) (потребитель) · Page Orchestrator (потребитель,
ещё не существует как skill).
