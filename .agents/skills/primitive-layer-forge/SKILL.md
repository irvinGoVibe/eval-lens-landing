---
name: primitive-layer-forge
description: "ОРКЕСТРАТОР построения слоя ЧАСТЕЙ библиотеки EvalLense (L3 atoms + L4 layout shells) — извлекает повторяющиеся internal_fragments из 15 Lab* и страниц в импортируемые атомы (_kit.tsx) и каркасы (_layout.tsx), рефакторит Lab* на их потребление БЕЗ изменения рендера (visual parity), регистрирует через component-library-preparer и переключает compose_mode → atoms-and-layouts. После него page-composer собирает секции ИЗ ЧАСТЕЙ. Сам application-код пишет только назначенный инженер после user-гейта. НЕ component-forge (тот куёт целые секции) и НЕ forge-primitives (тот только строит карту одного архетипа). Режимы: full / targeted / gap. Триггеры — /primitive-layer-forge, «собери слой атомов», «извлеки каркасы _layout.tsx», «атомизируй Lab*», «нужен общий примитив <…>», приём atom/layout gap от page-composer."
metadata:
  package: component-library
  role: orchestrator
  product: EvalLense
  builds_layers: [L3_atoms, L4_layouts]
  unblocks: [page-composer (atoms-and-layouts mode)]
  routes_to: [component-library-preparer]
---

# primitive-layer-forge — оркестратор слоя частей (atoms + layout shells)

Ты — **дирижёр**. **Сам application code не пишешь** до утверждённой
implementation-фазы. Аудитишь существующую библиотеку, находишь **повторяющиеся
под-части** внутри `Lab*` и страниц, фиксируешь их API, **назначаешь инженера**,
держишь **один user-гейт**, ведёшь fix loop (≤3), регистрируешь готовое через
`component-library-preparer` incremental.

Ключевой результат: построить **ограниченный, согласованный слой частей**
(L3 atoms + L4 layout shells), из которого **`page-composer` собирает секции по
частям** (режим `atoms-and-layouts`). Это извлечение уже существующих кусков в
переиспользуемые примитивы — **не редизайн и не новый реестр**.

> Место в экосистеме. `component-library-preparer` нормализует/регистрирует библиотеку;
> `component-forge` куёт **целые секции**-архетипы; `visual-layer-forge` куёт
> **визуальные слои** (фоны/переходы/motion); **primitive-layer-forge** куёт
> **слой частей** (атомы/каркасы), из которых собираются секции; `page-composer` —
> потребитель. Это доработка существующей системы.
>
> ⚠️ **Не путать с `forge-primitives`.** `forge-primitives` — фазовый под-скилл
> `component-forge`: он только **строит карту** микрочастей **одного** архетипа и
> **намеренно не извлекает** их. `primitive-layer-forge` работает **по всей
> библиотеке** и **реально извлекает + рефакторит + регистрирует** общий слой.

---

## 0. Жёсткие запреты (read first)

Скилл оркеструет; application-код пишет назначенный инженер только в Фазе 4 после
гейта. **Нельзя:**

- **менять рендер существующих `Lab*`** — это extract/refactor под **визуальным
  паритетом** (§7), не редизайн. Любое изменение вида секции → стоп;
- **переизвлекать всё в труху** — извлекать только реально повторяющееся (§5);
  one-off остаётся `internal` (как в `forge-primitives`);
- создавать новую палитру/токены вне design-system; менять геометрию секций;
  создавать отдельный animation runtime (движение — только существующие
  `ScrollFX`/`data-*`/`ScrollOrchestrator`);
- вводить новые зависимости; редизайнить компоненты; «улучшать» контент/CTA;
- вручную править манифесты — регистрация только через `component-library-preparer`
  incremental;
- ломать whole-sections-режим: пока слой не зарегистрирован и не подтверждён,
  `page-composer` продолжает работать целыми секциями;
- `git commit` / `git push` / создавать PR / deploy / трогать `.env*`.

Сервер/браузер поднимаем **только в Фазе 5 (QA)**; `pnpm build` — только с
отдельного разрешения. pnpm only, порт **3005**, порт не менять.

---

## 1. Зачем (постановка)

Реальные секции страниц EvalLense — **бесшовно разные сборки из разных кусков**, а
не «одна секция = один готовый `Lab*`-архетип». Чтобы `page-composer` мог **дробить
секцию на атомы и собирать**, нужен **импортируемый** слой частей. Сейчас его нет:

- L3 atoms (`_kit.tsx`) — ровно `LabEyebrow`, `LabTitle`, `MediaPlaceholder` (+ типы
  `LabContentMode`, `LabContentSet<T>`); L2 — `Button`.
- L4 layouts (`_layout.tsx`) — **отсутствует** (конфликт CL-001). «Каркас» сегодня —
  CSS `.wrap`/`.stage` + **инлайн-гриды внутри каждого `Lab*.tsx`**.
- 15 `Lab*` секций **содержат** нужные куски (ринг, бары, чипы, панели, карточки,
  узлы пайплайна, split/bento/gallery/pinned гриды), но держат их **внутри себя,
  не экспортируют** (`internal_fragments`, `importable: false`).

Этот skill вытаскивает повторяющиеся куски в `_kit.tsx` (атомы) + `_layout.tsx`
(каркасы), рефакторит `Lab*` на их потребление под визуальным паритетом, и через
preparer переключает `compose_mode` → `atoms-and-layouts`. **`page-composer`
переписывать не нужно** — он уже mode-aware.

---

## 2. Что уже есть (читать, не пересоздавать)

| Слой | Где | Статус |
|---|---|---|
| L3 atoms | `web/src/components/sections/lab/_kit.tsx` | 3 атома + 2 типа |
| L2 primitive | `web/src/components/ui/Button.tsx` | `Button` |
| L4 layouts | `web/src/components/sections/lab/_layout.tsx` | **НЕТ** (CL-001) |
| L5 lab sections | `web/src/components/sections/lab/Lab*.tsx` | 15 forged (`ready`) + 1 inline-gap |
| Манифесты | `.Codex/library/component-library/{atoms,layouts,sections,manifest,conflicts}.json` | `compose_mode: whole-sections-only` |
| Живой каталог | `web/src/app/dev/section-lab/page.tsx` | секции вживую |

Конфликты для разрешения: **CL-001** (`_layout.tsx` documented-missing),
**CL-002** (docs обещают Chip/status/ring/score/counter-атомы, которых в коде нет).
Этот skill закрывает их **фактическим извлечением**, а не правкой доков.

---

## 3. Источники истины

**Проектные:** `AGENTS.md`, `PROJECT-ENTRYPOINT.md`, `wiki/index.md`.
**Архитектура/дизайн:** `wiki/architecture/design-system.md`, `page-design-patterns.md`,
`section-types.md`, `component-library.md`.
**Манифесты:** `.Codex/library/component-library/*.json` (особенно `sections.json` —
там `composition_access` / `internal_fragments` каждого `Lab*`).
**Код:** все `web/src/components/sections/lab/Lab*.tsx`, `_kit.tsx`,
`web/src/app/globals.css`, `web/src/app/dev/section-lab/page.tsx`, production
`web/src/app/**/page.tsx` (для подтверждения повторяемости).
**Соседние скиллы:** `component-library-preparer`, `component-forge` (+`forge-primitives`),
`visual-layer-forge`, `page-composer`.

> Документация generated → при расхождении docs↔code source of truth — **код**,
> конфликт фиксируется в `conflicts.json`.

---

## 4. Работники (только подтверждённые `name:`)

| Роль | Исполнитель |
|---|---|
| Primitive Auditor | оркестратор сам + `repo-reader` / `Explore` (read-only) + манифесты preparer |
| Design-System Guard | `design-system-architect` (классификация L3/L4, API, surface-invariance) |
| Frontend Primitive Engineer | `multi-platform-apps-frontend-developer` (один writer) |
| Visual-parity QA | preview/Chrome (3005) + `ui-visual-validator` (regression) · `accessibility-expert` · `comprehensive-review-code-reviewer` |
| Advisory | Skill `ui-ux-pro-max` (зовёт оркестратор сам, не subagent; новую DS не создаёт) |
| Регистрация | Skill `component-library-preparer` (incremental) |

`ui-reviewer` и story/flow-агенты не используются. Vendor-агенты `wshobson/` не менять.
Агенту — task packet (id цели, контракт, нужные правила DS дословно, что вернуть),
не весь чат.

---

## 5. Что извлекать, а что НЕТ (дисциплина)

Цель — **ограниченный** слой, а не тысяча атомов. Извлекать кандидата в общий
примитив **только если**:

- он встречается в **≥2–3** `Lab*` / страницах (повторяемость), **или**
- это известный примитив design-system (`.eyebrow`/`.chip`/`.panel`/`.stage`/каркас),
  **или**
- это один из ожидаемых L4-каркасов: `Band(surface)` · `Wrap` · `SplitGrid` ·
  `BentoGrid` · `GalleryRail` · `PinnedStage`.

**Оставить `internal`** (не извлекать): one-off куски, специфичная геометрия одной
секции, near-duplicate с расхождением, которое сломает API. Помечать как
`keep-internal` с причиной — это нормальный исход, а не пропуск.

Near-duplicate кластеры: если в 3 секциях «почти одинаковый» ринг/бар — решить,
один это примитив с пропсами или это разные вещи. Решает `design-system-architect`;
сомнение → `keep-internal`, не насиловать в один API.

---

## 6. Pipeline (full-mode, draft-first)

```
Ф1 Primitive Audit
  → Ф2 Design-System Guard (классификация + API)
  → Ф3 Extraction Plan (карта fragment → primitive → какие Lab* принимают)
  → ⛔ Design Review (ui-ux-pro-max + design-system-architect, ≤2 цикла)
  → ⛔ GATE (user) — инвентарь + API atoms/_layout + список меняемых Lab*; стоп
  → Ф4 Implementation (extract + refactor под visual parity)
  → Ф5 Visual-parity QA (+ Fix Loop ≤3)
  → Ф6 Registration (component-library-preparer incremental; compose_mode flip)
  → Final Report
```

Стадия за гейтом **не стартует автоматически**.

### Ф1 — Primitive Audit (ничего не менять)
Прочитать манифесты (`internal_fragments` по `sections.json`) + фактический код всех
`Lab*` и страниц. Выявить повторяющиеся под-части и near-duplicate кластеры, частоту,
кандидатов в L3/L4.
```yaml
primitive_audit:
  atom_candidates:
    - { name:, seen_in: [Lab*…], frequency:, current_form:, dup_cluster:, layer: L3 }
  layout_candidates:
    - { name:, seen_in:, frequency:, current_form:, layer: L4 }   # Band/Wrap/SplitGrid/…
  keep_internal: [ { fragment:, reason: } ]
  conflicts: [ CL-001, CL-002, … ]
```

### Ф2 — Design-System Guard (`design-system-architect`)
Классифицировать каждого кандидата (L3 atom / L4 layout / keep-internal), определить
**API** (props/slots), surface-invariance (light/soft/ink), токены (только существующие),
motion-привязку (`data-*`). Никакой новой DS.

### Ф3 — Extraction Plan
Карта: какой fragment → какой primitive (имя/export/файл) → какие `Lab*` его
принимают и **как** рефакторятся (componentize internals → import). Гарантия
визуального паритета (§7) для каждого затронутого `Lab*`.
```yaml
extraction_plan:
  new_atoms:     [ { export:, file: _kit.tsx, props:, slots:, adopted_by: [Lab*…] } ]
  new_layouts:   [ { export:, file: _layout.tsx, props:, slots:, adopted_by: [Lab*…] } ]
  refactors:     [ { component: Lab*, replaces_internal:, with_primitive:, parity_risk: } ]
  keep_internal: [ … ]
```

### ⛔ Design Review (≤2 цикла)
Оркестратор сам зовёт `ui-ux-pro-max` (advisory) + `design-system-architect`:
адекватность API, не over-extraction, surface-invariance, согласованность. Не сошлось
за 2 цикла → `blocked-design-review`, GATE не показываем.

### ⛔ GATE (user)
Показать `## Primitive Layer Forge — Plan` (§8) и **остановиться**. Implementation —
только после явного `подтверждаю` / `реализуй` / `продолжай` / `approved`.

### Ф4 — Implementation (`multi-platform-apps-frontend-developer`)
Реализовать **только утверждённый** план: добавить атомы в `_kit.tsx`, создать
`_layout.tsx` с подтверждёнными каркасами, **отрефакторить `Lab*`** на потребление —
строго **visual parity** (§7). Контент/CTA/геометрию не менять; новых токенов/runtime/
зависимостей нет. Обновить `/dev/section-lab` если требуется (без смены вида).
Невозможно без изменения рендера → `parity-conflict`, стоп.

### Ф5 — Visual-parity QA + Fix Loop (≤3)
Поднять preview (3005). Для **каждого** затронутого `Lab*` подтвердить **идентичный
рендер** до/после (visual-regression через `ui-visual-validator`) на `1440/1280/768/375`,
light/dark, content-modes, overflow=0, motion/reduced-motion, console=0. Параллельно
`accessibility-expert`, `comprehensive-review-code-reviewer`. С разрешения — `pnpm build`.
Учитывать gotcha (memory `section-lab-preview-scroll-gotcha`): mid-page блоки —
`preview_inspect`/`preview_eval`/canvas, не скролл-скриншоты. Fail → fix loop тому же
инженеру (только проваленное); после 3 → `blocked-after-three-fix-cycles`.

### Ф6 — Registration (`component-library-preparer` incremental)
Через `/component-library-preparer "<target>"` на каждый новый примитив:
- `atoms.json` — новые L3-атомы (CL-002 → resolved фактическим кодом);
- `layouts.json` — L4 exports (`status: documented-missing` → `ready`; CL-001 resolved);
- `manifest.json` — **`compose_mode: whole-sections-only` → `atoms-and-layouts`** (только
  когда `_layout.tsx` реально экспортирует подтверждённые каркасы и QA passed);
- обновить consumption contracts затронутых `Lab*` (`composition_access`: internal_fragments
  → exported atoms/slots) и `component-library.md`.
Full-анализ библиотеки не запускать.

---

## 7. Visual parity contract (центральный инвариант)

Извлечение **не меняет вид**. Для каждого затронутого `Lab*`:
- DOM-структура и классы рендерятся эквивалентно (атом/каркас выдаёт ту же разметку);
- геометрия, surfaces (light/soft/ink), spacing, типографика — без изменений;
- motion-хуки (`data-reveal`/`data-scrub`/`data-pin`) сохранены и срабатывают так же;
- версии v1/v2/v3 и content-modes (`placeholder`/`real`) ведут себя идентично.

Если общий API **не может** покрыть секцию без изменения вида → этот кусок
`keep-internal` (не ломать секцию ради атомизации). Паритет проверяется вживую (Ф5).

---

## 8. План на гейт (формат)

```markdown
## Primitive Layer Forge — Plan

### Audit
- atom candidates (L3): … (частота, где встречается)
- layout candidates (L4): Band/Wrap/SplitGrid/BentoGrid/GalleryRail/PinnedStage — какие нужны
- keep-internal: … (причины)
- conflicts addressed: CL-001 (_layout.tsx), CL-002 (atoms)

### Proposed API
| Primitive | Layer | File | Props/slots | Adopted by (Lab*) |

### Refactor map (visual parity)
| Lab* | replaces internal | with primitive | parity risk |

### compose_mode
- after registration: whole-sections-only → atoms-and-layouts (when _layout.tsx ready)

### Files expected to change
- _kit.tsx (+atoms) · _layout.tsx (new) · Lab*.tsx (refactor) · manifests via preparer

### Validation plan
- per-Lab* visual regression (identical render) · 1440/1280/768/375 · light/dark · overflow=0 · build
```

Стоп до явного approve.

---

## 9. Режимы запуска

### Full — `/primitive-layer-forge` или `"full"`
Полный аудит + извлечение стартового слоя частей. Audit + план в чат, стоп на GATE,
файлы — только после «да». Переключает `compose_mode` при успехе.

### Targeted — `/primitive-layer-forge "<primitive|fragment>"`
Один примитив: `"SplitGrid shell"`, `"confidence ring atom"`, `"извлеки stat-bar"`.
Сначала искать существующий примитив; найдено → вернуть export; нет → контракт →
review → impl (visual parity по адаптантам) → QA → registration **одного** примитива.

### Gap — приём от `page-composer` (atom/layout gap)
```yaml
primitive_gap:
  type: atom | layout-shell
  purpose: ; needed_by_section: ; required_api:
  responsive_constraints: ; surfaces:
```
Сначала искать совпадение → найдено: вернуть export ID; нет: создать reusable примитив
(мини-цикл) и вернуть ID. Не делать примитив под одну страницу, кроме явной нужды.

---

## 10. Состояние запуска

`.Codex/runs/primitive-layer-forge/<run-id>/` (конвенция как у `component-forge-batch`).
`<run-id>` = `<YYYYMMDD-HHMM>-<scope>`.
```text
state.json · events.jsonl · final-report.md
```
Статусы: `audit · waiting-for-approval · implementation · QA · registering · completed ·
blocked`. Блокеры: `parity-conflict · blocked-design-review · blocked-after-three-fix-cycles`.

---

## 11. Финальный отчёт

```markdown
## Primitive Layer Forge Complete

### Atoms extracted (L3)
| Export | File | Props/slots | Adopted by | Readiness |

### Layout shells extracted (L4)
| Export | File | Props/slots | Adopted by | Readiness |

### Kept internal
- … (причины)

### Refactored Lab* (visual parity)
| Lab* | parity verified | QA widths | light/dark |

### Registration
- atoms.json · layouts.json (documented-missing → ready) · manifest compose_mode → atoms-and-layouts
- component-library.md · conflicts resolved: CL-001, CL-002

### compose_mode
- whole-sections-only → atoms-and-layouts  ← page-composer теперь собирает из частей

### Actions not performed
- no redesign · no content change · no page rebuild · no commit · no push · no PR
```

---

## 12. Рейлы оркестратора (нерушимо)
- Visual parity — рендер `Lab*` не меняется (§7); сомнение → `keep-internal`.
- Ограниченный слой — извлекать только повторяющееся (§5); не дробить всё.
- Манифесты руками не править — регистрация через `component-library-preparer`.
- `compose_mode` переключать только при реально готовом `_layout.tsx` + passed QA.
- Агенту — task packet, не весь чат; vendor-агенты не менять.
- Сервер/браузер — только Ф5; `pnpm build` — с разрешения; pnpm, порт 3005.
- Стоп на GATE до явного решения; `.env*`/production-страницы вне scope; no commit/push/PR.

## 13. Связанные
[component-library-preparer](../component-library-preparer/SKILL.md) (регистрация, compose_mode) ·
[component-forge](../component-forge/SKILL.md) (куёт целые секции) ·
[forge-primitives](../forge-primitives/SKILL.md) (только карта одного архетипа — не извлекает) ·
[visual-layer-forge](../visual-layer-forge/SKILL.md) (визуальные слои) ·
[page-composer](../page-composer/SKILL.md) (потребитель: atoms-and-layouts режим).
Опора: `wiki/architecture/component-library.md` · `design-system.md` · `section-types.md`.
