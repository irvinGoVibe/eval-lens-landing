---
title: Component Forge
status: generated
version: 1.1
updated: 2026-06-17
---

# Component Forge

← [[index|Wiki]]

Управляемый агент-оркестратор, который **последовательно** перерабатывает один
архетип стенда Section Lab в переиспользуемый prop-driven блок продуктового
качества (V1/V2/V3, light+dark, demo-media). Оркестратор сам код не пишет — он
дирижирует специализированными агентами через короткие задачи и держит гейты.

## Зачем существует

Между ручным [[redraw-block]]-скиллом (один блок, один проход вручную) и
[[build-pages]] (сборка страниц из **готовых** блоков) не было управляемого слоя,
который системно доводит архетип: фиксирует контракт → проектирует версии →
готовит медиа → реализует → проверяет вживую → индексирует. Это и есть
Component Forge. Запуск: `/component-forge "архетип 04"`. **Один архетип за раз.**

## Состав пакета

Живёт в `.claude/`:

- **Оркестратор** — `.claude/skills/component-forge/SKILL.md` (дирижёр).
- **Скиллы-фазы** — `.claude/skills/forge-{primitives,craft,extract,validate,index}/SKILL.md`
  (плейбуки отдельных фаз).
- **Базы знаний (rule-cards)** — `.claude/skills/component-forge/kb/*.md`: одно
  правило = один файл; оркестратор **дословно вставляет** нужные карточки в задачу
  агенту. Индекс — `kb/00-index.md`.
- **Ростер** — `.claude/skills/component-forge/workers.md` (фаза → агент + формат задачи).
- **Реестр готового** — [[component-library|Component Library]] (`wiki/architecture/component-library.md`).
- **Пул demo-медиа** — `web/public/assets/_demo-pool/` (+ `INDEX.md`).

## Работники (агенты)

Используются только vendor-агенты wshobson (`.claude/agents/wshobson/`, **не менять,
не переименовывать**) + проектный `media-curator`. Контекст проекта они получают
**только через task packet** (см. ниже), сами агенты остаются дженериками.

| Фаза | Роль | Агент (`name:`) |
|---|---|---|
| 2 Microstructure Map | карта микрочастей | `multi-platform-apps-frontend-developer` |
| 3 Design-System Guard | DS-ограничения + матрица | `design-system-architect` |
| 4A.1/4A.3 Art Direction | дизайн/правки V1/V2/V3 | `ui-ux-designer` (ритм/рекомпозиция) + `ui-designer` (визуал) |
| 4A.2 Advisory review | typography/composition/responsive/media/bg | Skill `ui-ux-pro-max` — **вызывает оркестратор сам, не subagent** |
| 4B Demo Media | подбор/подготовка медиа | `media-curator` (проектный) |
| 5 Frontend Implementation | боевой TSX | `multi-platform-apps-frontend-developer` — **один writer** |
| 6 Render QA | ревью (read-only, параллельно) | `ui-visual-validator`, `design-system-architect`, `accessibility-expert`, `comprehensive-review-code-reviewer` |

> `ui-reviewer` и story/flow-агенты (`repo-reader`, `story-writer`,
> `implementation-planner`, `developer-agent`) в форже **не используются** — это
> агенты story/[[build-pages]]-флоу.

## Pipeline (фазы)

```
0 Discovery → 1 Contract Lock → 2 Microstructure Map → 3 Design-System Guard
→ 4A Art Direction (4A.1 Draft → 4A.2 UI UX Pro Max Review → 4A.3 Revision
  → 4A.4 Final, V1/V2/V3) → 4B Demo Media → ⛔ Gate A (user)
→ 5 Frontend Implementation → 6 Render QA → Fix Loop (≤3) → ⛔ Gate B (user)
→ 7 Integration/Index → 8 Final Verification → Final Report
```

- **0 Discovery** — найти архетип, источник (inline/вынесен), связанные файлы,
  CSS/primitives/motion, существующие версии/темы/медиа, риски. Ничего не менять.
- **1 Contract Lock** — зафиксировать неизменяемый контракт: semantic (один
  payload во всех версиях), functional (props/data/routing/серверность), theme
  (light↔dark одной версии совпадают по геометрии). `kb/contract-lock.md`.
- **2 Microstructure Map** — карта `tokens→primitives→fragments→recipe`. **Без**
  авто-componentization; извлекаем только реально переиспользуемое (на Фазе 5).
- **3 Design-System Guard** — `design-system-architect` выводит реальные токены и
  **Surface-to-action matrix** (какие кнопки/действия на light/dark) из
  `globals.css` + [[design-system|Design System]]. `kb/surface-to-action.md`.
- **4A Art Direction** — три версии одного блока с **review-loop**:
  **4A.1 Draft → 4A.2 UI UX Pro Max Review → 4A.3 Revision → 4A.4 Final**.
  **V1 Polish** (довести исходную композицию), **V2 Modern Recomposition**
  (рекомпозиция — ритм решает дизайнер), **V3 Expanded Expressive** (масштаб/воздух/
  типографика/сцены/scroll-driven). Заголовки скомпонованы **по-разному в V1/V2/V3**
  (слова те же). На 4A.2 оркестратор **сам** вызывает Skill `ui-ux-pro-max`
  (advisory: typography/composition/responsive/media/background/anti-patterns; **НЕ**
  subagent; новую DS не создаёт — EvalLense DS = source of truth). **≤2 цикла**
  4A.2↔4A.3; не сошлось → `blocked-design-review`, Gate A не показываем.
  + Designer Self-Check + media-brief. Новые правила-карточки: `typography-contract`,
  `theme-typography-geometry`, `overflow-discipline`, `motion-correctness`,
  `background-strategy`, `ui-ux-pro-max-review`.
- **4B Demo Media** — `media-curator` по media-brief подбирает реальный
  **demo-content** из пула/ассетов, готовит минимальные производные (ресайз,
  пережатие, desktop/mobile, light/dark, poster) и возвращает media-package на
  approval дизайнеру. Нет ассета → `.media-ph` fallback.
- **⛔ Gate A** — пользователь утверждает дизайн+медиа. До approve код не пишется.
- **5 Frontend Implementation** — **один** frontend-writer реализует утверждённые
  брифы + медиа в боевой TSX (`web/src/components/sections/lab/Lab<Archetype>.tsx`),
  componentize по карте. Контент/CTA/функц.контракт не трогает.
- **6 Render QA** — **поднимает дев-сервер (3005) и проверяет блок вживую через
  Chrome MCP / preview** (собралось/рендер/light-dark/responsive) + 4 параллельных
  read-only ревьюера. **Fix Loop ≤3** тому же writer'у; после 3 → `blocked`.
- **⛔ Gate B** — пользователь утверждает финал.
- **7 Integration/Index** — запись в [[component-library|реестр]] + [[section-types]];
  проверка V1/V2/V3 controls, light/dark, demo-режимов, соседних архетипов.
- **8 Final Verification** — pnpm-проверки (`cd web && pnpm build` с разрешения),
  TS/lint, битые импорты/медиа, vendor не тронут, `.env*` целы, `git status`.

## Два гейта и состояния

Оркестратор хранит **одно** состояние архетипа и **не стартует** стадию за гейтом
автоматически. Состояния — `kb/process-states.md`:
`discovered → contract-locked → microstructure-mapped → ds-constrained →
designing → design-review-revision → media-curating → design-review →
design-approved → implementing → validating → fixing → final-approved →
integrating → completed`; ветка `blocked` (`design-conflict` / `asset-gap` /
`blocked-design-review` / `blocked-after-three-fix-cycles`).

## Task packets

Агенту передаётся **не весь чат**, а короткий пакет (`kb/task-packets.md`):
archetype ID + фаза/состояние + роль + approved inputs + relevant files +
DS-ограничения (+матрица) + media-brief + allowed/forbidden + **вставленные
дословно rule-cards** + expected output + stop condition. Оркестратор агрегирует
результат и передаёт дальше только необходимое.

## Версии и инвариант поверхности

V1/V2/V3 живут в `data-version`; инспектор `LabMarkers` на `/dev/section-lab` даёт
табы версий + тумблер Light/Dark (выбор в localStorage). **Внутри одной версии
light и dark совпадают по геометрии** — меняется только цвет/тема (инвертирование);
другая раскладка под тёмную = это новая версия, а не вариант поверхности
(`kb/surface-invariant.md`).

## Слои переиспользования

Страницы — смешанные блоки, поэтому режем не только на секции
(`kb/composition-layers.md`): токены → атомы (`sections/lab/_kit.tsx`) →
layout-каркасы (`sections/lab/_layout.tsx`) → секции (`Lab*`) → страницы.
Смешанный блок страницы собирается из атомов+каркасов напрямую, не форкая секцию.

## Demo-медиа

Реальные нейтральные ассеты **в стиле EvalLense** (не пустой placeholder). Пул —
`web/public/assets/_demo-pool/` (`photo/`, `video/`, `INDEX.md` с тегами
type/role/theme/ratio/text). `media-curator` **ищет здесь первым**, потом в ассетах
архетипа/соседей/проекта. Обработка минимальная (ресайз+пережатие), главное —
**цвет под тему** (light=светлый, dark=тёмный); стратегии `single-adaptive /
light-specific / dark-specific / paired-light-dark`. Не генерирует, не качает
извне, исходники не правит. `kb/demo-media.md`.

## Что НЕ делает (рейлы)

Не коммитит/push/deploy; не трогает `.env*`, production pages, worktree, Linear;
не меняет vendor-агентов; не переписывает [[redraw-block]]; не создаёт параллельный
workflow. Сервер/сборка — только в Фазе 6 (Render QA) и Фазе 8.

## Связанное

- [[component-library|Component Library]] — реестр выкованных блоков (выход форжа).
- [[section-types|Section Types]] — каталог архетипов (вход форжа).
- [[page-design-patterns|Page Design Patterns]] — архетипы, ритм, scroll-движок, QA.
- [[design-system|Design System]] — токены/компоненты, опора DS Guard.
- [[redraw-block|redraw-block]] *(скилл)* — ручной апгрейд одного блока (источник декомпозиции).
- [[build-pages|build-pages]] *(скилл)* — downstream: сборка страниц из готовых блоков.
