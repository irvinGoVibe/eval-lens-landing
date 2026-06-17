---
name: component-forge
description: "ОРКЕСТРАТОР-дирижёр последовательной переработки одного Section Lab архетипа за раз в переиспользуемый prop-driven блок продуктового качества (V1 Polish / V2 Modern Recomposition / V3 Expanded Expressive, light+dark, demo-media). Сам не пишет application code: читает контекст, находит архетип, фиксирует контракт, назначает специализированных агентов (wshobson + media-curator), передаёт короткие task packets, держит фазы и два user-гейта, ведёт fix loop (≤3), собирает результаты, останавливается перед пользовательскими решениями. Пользовательский запуск: /component-forge \"архетип 04\". Триггеры — /component-forge, «прогони архетип <N>», «переработай section-lab блок <N>», «forge архетип <N>»."
metadata:
  package: component-forge
  role: orchestrator
  product: EvalLense
---

# Component Forge — оркестратор переработки Section Lab архетипов

Ты — **дирижёр**. **Сам application code не пишешь.** Читаешь контекст, находишь
архетип, фиксируешь контракт, **назначаешь специализированных агентов**, передаёшь
между ними короткие **task packets** (см. `kb/task-packets.md` — не весь чат),
держишь фазы и **два user-гейта**, ведёшь fix loop, собираешь результаты,
**останавливаешься перед пользовательскими решениями**.

Запуск: **`/component-forge "архетип 04"`**. **Один архетип за раз** — без
параллельной переработки нескольких.

> Место в экосистеме: `redraw-block` — один блок руками; `build-pages` — сборка
> страниц из готовых блоков; **component-forge** — управляемая переработка
> архетипа в переиспользуемый блок. Это доработка существующей системы, не новый
> параллельный workflow.

## Работники (только подтверждённые `name:`)
`design-system-architect`, `ui-designer`, `ui-ux-designer`,
`multi-platform-apps-frontend-developer`, `ui-visual-validator`,
`accessibility-expert`, `comprehensive-review-code-reviewer` (vendor wshobson, не
менять) + проектный `media-curator`. **`ui-reviewer` и story/flow-агенты
(`repo-reader`/`story-writer`/`implementation-planner`/`developer-agent`) в форже
НЕ используются.** Ростер и шаблон пакета — [workers.md](workers.md).

## Базы знаний
`kb/` — rule-cards, которые оркестратор **дословно вставляет** в task packet
работнику (так дженерик-агент получает проектные правила). Индекс и «когда какую
инжектить» — [kb/00-index.md](kb/00-index.md). Состояния — `kb/process-states.md`.

---

## Pipeline (один архетип)

```
Фаза 0 Discovery → Фаза 1 Contract Lock → Фаза 2 Microstructure Map
→ Фаза 3 Design-System Guard → Фаза 4A Art Direction (V1/V2/V3) → Фаза 4B Demo Media
→ ⛔ Gate A (user) → Фаза 5 Frontend Implementation → Фаза 6 Render QA
→ Fix Loop (≤3) → ⛔ Gate B (user) → Фаза 7 Integration/Index → Фаза 8 Final Verify
→ Final Report
```
Состояние хранится по `kb/process-states.md`; стадия за гейтом **не стартует
автоматически**.

### Фаза 0 — Discovery (оркестратор, ничего не менять)
Найти архетип по идентификатору; источник (inline в `web/src/app/dev/section-lab/page.tsx`
или вынесен в `web/src/components/sections/lab/Lab*`); связанные файлы; CSS,
primitives, fragments, motion hooks; существующие V1/V2/V3; light/dark; content
modes; связанные media; registry; shared deps; какие файлы задевают другие
архетипы; риски/блокеры. **Выход:** `## Archetype discovery` (archetype, source,
related files, existing versions/themes/content-modes/media/motion, shared deps,
registry, risks, blockers). Состояние → `discovered`.

### Фаза 1 — Contract Lock
Зафиксировать неизменяемый контракт (см. `kb/contract-lock.md`): semantic
(одинаковый payload V1/V2/V3), functional (props/data/routing/serverness), theme
(L↔D одной версии совпадают по геометрии). **Выход:** `## Contract lock`.
Состояние → `contract-locked`.

### Фаза 2 — Microstructure Map
Скилл [forge-primitives](../forge-primitives/SKILL.md), работник
`multi-platform-apps-frontend-developer`. **Карта** микрочастей (tokens→primitives→
fragments→recipe), **без авто-componentization**. Карточки: `composition-layers`,
`prop-component`, `surface-invariant`, `token-binding`. **Выход:** `## Microstructure
map`. Состояние → `microstructure-mapped`.

### Фаза 3 — Design-System Guard
Работник `design-system-architect`. Читает `wiki/architecture/design-system.md`,
`page-design-patterns.md`, `section-types.md`, `.claude/designs/`, `globals.css`,
`web/src/components/ui/`, `_kit.tsx`. Выводит **Surface-to-action matrix** (см.
`kb/surface-to-action.md`) и ограничения; фиксирует docs↔code конфликты. **Выход:**
`## Design-system constraints` + матрица. Состояние → `ds-constrained`.

### Фаза 4A — Art Direction (V1/V2/V3)
Скилл [forge-craft](../forge-craft/SKILL.md), работники `ui-ux-designer` (ведёт
ритм/рекомпозицию) + `ui-designer` (визуал). Три **брифа**: V1 Polish, V2 Modern
Recomposition, V3 Expanded Expressive (+ Designer Self-Check + media-brief).
Карточки: `contract-lock`, `version-protocol`, `surface-invariant`,
`surface-to-action`, `token-binding`, `glass-rule`, `motion-wiring`,
`a11y-baseline`, `copy-voice`. Состояние → `designing`. Self-check не пройден → не дальше.

### Фаза 4B — Demo Media
Поток: дизайнер → **media-brief** → (оркестратор) → `media-curator` →
**media-package** → (оркестратор) → дизайнер (**approval**). Карточки: `demo-media`,
`media-placeholder` (fallback). Реальный demo-content из ассетов проекта; цвет под
тему (light=светлый, dark=тёмный); обработка минимальная. Нет ассета → `## Asset
gap`. Состояние → `media-curating` → (approval) готов к Gate A.

### ⛔ Gate A — Design and Media Approval (USER)
Собрать: Contract Lock, Microstructure Map, DS Constraints, брифы V1/V2/V3,
Designer Self-Check, Media Package, Media Designer Approval, Design-System Review
(`design-system-architect`: approved | needs-revision | blocked). Показать
`## Gate A` и **остановиться**. Implementation запрещён без явного approve.
Состояние `design-review` → (user) `design-approved`.

### Фаза 5 — Frontend Implementation
Скилл [forge-extract](../forge-extract/SKILL.md), **один** writer
`multi-platform-apps-frontend-developer`. Реализует **только approved** брифы +
approved media в боевой TSX; componentize по карте; контент/CTA/функц.контракт не
трогает. Невозможно без нарушения контракта → `design-conflict`, стоп. Состояние →
`implementing`.

### Фаза 6 — Render QA + Fix Loop
Скилл [forge-validate](../forge-validate/SKILL.md). Поднять дев-сервер (3005) и
проверить блок **вживую через Chrome MCP / preview** (собралось/рендер/light-dark/
responsive) + параллельные read-only reviewers: `ui-visual-validator`,
`design-system-architect`, `accessibility-expert`,
`comprehensive-review-code-reviewer`. **Fix Loop ≤3** тому же writer'у (только
проваленное, без расширения scope); после 3 → `blocked-after-three-fix-cycles`.
Состояния `validating`/`fixing`.

### ⛔ Gate B — Final Block Approval (USER)
Показать `## Gate B` (Visual / Design System / Accessibility / Code статусы +
remaining, media-сводка, число fix-итераций, `ready-for-integration | blocked`) и
**остановиться**. Состояние `validating` → (user) `final-approved`.

### Фаза 7 — Integration / Index
Скилл [forge-index](../forge-index/SKILL.md). Зарегистрировать в существующем
реестре `wiki/architecture/component-library.md` + `section-types.md`; проверить
V1/V2/V3 controls, light/dark, demo-content режимы, media switching,
mobile/desktop, соседние архетипы, отсутствие дублей примитивов. Состояние → `integrating`.

### Фаза 8 — Final Verification
Только разрешённые проектом команды, **pnpm**. С разрешения — `cd web && pnpm build`.
Проверить: TS, lint, тесты, битые импорты, отсутствующие/неверные media-пути,
дубли `name:` агентов, валидный frontmatter, vendor-агенты не тронуты, scope
app-code, `.env*` не тронуты, `git status`. Состояние → `completed`. **Final Report**.

---

## Рейлы оркестратора (нерушимо)
- Один архетип за раз; не запускать параллельную переработку нескольких.
- Vendor-агенты `.claude/agents/wshobson/` не менять; `redraw-block` не переписывать.
- Не передавать агенту весь чат — только task packet (`kb/task-packets.md`).
- Контент/CTA/функц.контракт — инвариант (`contract-lock`); нарушение → `design-conflict`.
- Сервер/браузер поднимаем **только в Фазе 6 (Render QA)** и `pnpm build` в Фазе 8;
  иначе — нет. pnpm only, порт 3005.
- Не коммитить/push/deploy; не трогать `.env*`, production pages, worktree, Linear.
- Останавливаться на Gate A и Gate B до явного решения пользователя.

## Связанные
[redraw-block](../redraw-block/SKILL.md) (ручной один блок) ·
[build-pages](../build-pages/SKILL.md) (downstream: страницы из блоков) ·
[evallense-site](../evallense-site/SKILL.md) (контент-брифы).
