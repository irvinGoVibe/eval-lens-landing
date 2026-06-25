---
name: ds-ify-page
description: "Перевести ОДНУ существующую страницу EvalLense на канонические DS-компоненты (барель `@/components/ds`), СОХРАНИВ контент и порядок секций. Это ВЕРНЫЙ рефактор, а не редизайн: версии/поверхности/цвета/переходы и копирайт НЕ меняются — только подмена локальных/инлайн/`Lab*` блоков на барель + контейнер-канон (`section-lab ds`) + смонтированный `<ScrollFX/>`. Раскладывает страницу на секции, по каждой даёт маппинг «секция → DS-компонент», ЧЕСТНО помечает гэпы (архетипы без барель-эквивалента) и маршрутизирует их в `redraw-block` (извлечь в чистый DS) — НЕ оставляет сырой `Lab*` без TODO. Один user-гейт: показывает маппинг ДО переписывания. На выходе — страница, где каждый блок = DS-компонент (или помеченный гэп), готовая к ручному арт-дирекшну (версии + переходы) и к page-skin/page-motion. Не batch (это build-pages), не раскрашивает, не куёт секции с нуля. Триггеры — /ds-ify-page, «переведи страницу <route> на DS», «DS-ифицируй <route>», «перепиши секции страницы на наши компоненты», «ds-ify <route>», «канонизируй страницу <route>»."
metadata:
  version: 0.1.0
  product: EvalLense
  role: orchestrator
  precedes: [page-skin, page-motion, manual-art-direction]
  routes_to: [redraw-block, component-forge]
  consumes: [sections.json, section-types.md, "@/components/ds index"]
---

# ds-ify-page — перевод страницы на канонические DS-компоненты

Ты — **дирижёр верного рефактора**. Берёшь ОДНУ существующую страницу и переводишь
её блоки на публичный барель `@/components/ds`, **ничего не меняя по смыслу**. Это
шаг 0 перед арт-дирекшном: страница становится «выпрямленной» до канона, и только
потом мы трогаем версии блоков, поверхности и переходы.

**Главный инвариант — ВЕРНОСТЬ.** Контент (копирайт, слоты, данные), порядок секций
и их смысл сохраняются 1:1. Ты НЕ редизайнишь, НЕ красишь, НЕ выбираешь версии, НЕ
ставишь переходы. Меняется только **происхождение блока**: локальный/инлайн/`Lab*`
→ барель `@/components/ds`.

---

## 0. Жёсткие запреты (read first)

- НЕ менять контент: тексты, числа, порядок, ссылки, слоты — как было.
- НЕ редизайнить, НЕ менять раскладку, НЕ выбирать `version`, НЕ менять `surface`
  относительно текущего, НЕ добавлять/менять переходы и motion — это последующие
  проходы (ручной арт-дирекшн → `page-skin` / `page-motion`).
- НЕ оставлять сырой импорт `Lab*` / `sections/lab/_kit` в финальном коде **молча**:
  гэп либо извлекается через `redraw-block`, либо остаётся с **явным `// TODO ds-gap`**
  и попадает в отчёт (канон CL-007: публичный API — только `@/components/ds`).
- НЕ трогать `ScrollOrchestrator` и движок главной (`/`) — там своя оркестрация;
  внутренние страницы используют `<ScrollFX/>`.
- НЕ трогать другие страницы, общие файлы (`globals.css`, `ds.css`) кроме случая,
  когда `redraw-block` извлекает гэп-компонент (тогда правки идут в `ds.css`/`.ds`).
- НЕ `git commit` / `git push` / PR / `.env*`.
- Dev-сервер сам не поднимать; `pnpm build` — только с явного разрешения user
  (память: `pnpm build` портит preview `.next`). pnpm only, порт 3005 не менять.
- Одна страница за вызов. Не batch (это `build-pages`).

---

## 1. Инварианты канона (по факту кода)

- **Публичный API секций — только барель** [`@/components/ds`](../../../web/src/components/ds/index.ts).
  Готовы (clean DS + алиасы): `StatementHero` · `EditorialSplit` · `Gallery` ·
  `Bento` · `Numbered` · `StatBand` · `QuietCta` · `PinnedSteps` · `FullStatement`
  (+ атомы `Eyebrow`/`Title`/`Media`, `Button`). Сверяйся с актуальным `index.ts`,
  не с этим списком.
- **Контейнер страницы** — `<main className="<page> section-lab ds">`. Класс
  `section-lab` обязателен (иначе `.lab-*` стили схлопываются); `ds` — светлый язык
  DS (`--dsc-*`, гейт `:not(.ink)`).
- **Движок** — `<ScrollFX/>` в конце `<main>` (видимость DS-компонентов завязана на
  него: без движка `data-reveal` остаётся `opacity:0` и страница пустая). Главная
  (`/`) — исключение (`ScrollOrchestrator`), её не трогаем.
- **surface** у DS-секций — `light|ink` (проп только про тон). При рефакторе берём
  **тот тон, что у секции сейчас** (`.band.soft`→`light`, `.band.ink`→`ink`), не
  «улучшаем».
- **Гэпы** (на 2026-06: ~11 архетипов — Statement(02), SplitRing(05), Pricing(13),
  CompareTable(14), Versus(15), HubMap(08), RiskControl(11), Faq(16) и т.п.) живут
  как `Lab*` и в барель НЕ вынесены. Сверяйся с `sections.json#consumption` и
  `section-types.md`, а не с памятью.

---

## 2. Источники истины (читать)

- Сама страница: `web/src/app/**/page.tsx` (+ её локальные секции/css, если есть).
- `wiki/architecture/section-types.md` — каталог архетипов ↔ классы ↔ публичные имена.
- `.claude/library/component-library/sections.json` — `consumption_readiness`,
  какие архетипы `ready` в бареле, какие `component-api-gap`.
- `web/src/components/ds/index.ts` — фактический барель (источник имён/пропсов).
- `web/src/app/globals.css` — текущие классы секций страницы (для определения тона).
- Соседний скилл `redraw-block` (извлечение гэпа в чистый DS).

> При расхождении docs ↔ code source of truth — **код** (`index.ts` + рендер
> страницы).

---

## 3. Pipeline

```
Фаза 1 Resolve & Decompose
  → Фаза 2 Map (секция → DS | gap)
  → ⛔ GATE (user): таблица маппинга + решения по гэпам; стоп
  → Фаза 3 Rewrite (барель, верно, порядок)  [+ redraw-block на гэпы по решению]
  → Фаза 4 Verify (static self-check; build/preview только с разрешения)
  → Final Report
```

### Фаза 1 — Resolve & Decompose
- Резолвни route → файл `page.tsx` (и подключённые локальные секции).
- Разложи `<main>` на **упорядоченный список секций**: для каждой — текущий
  компонент/класс, тон (`soft`/`ink`), и краткое содержимое (eyebrow/title/слоты).
- Зафиксируй контейнер и наличие `<ScrollFX/>` / движка.

### Фаза 2 — Map
Для каждой секции определи одно из:
- **already-ds** — уже импортируется из `@/components/ds` → не трогаем (только
  проверяем импорт-путь).
- **swap** — локальный/инлайн/`Lab*` блок, у которого ЕСТЬ барель-эквивалент →
  подмена на барель + маппинг «контент → пропсы» (1:1, без потери копирайта).
- **gap** — архетип без барель-эквивалента (`component-api-gap`/`Lab*`) → пометить;
  на гейте предложить: (a) извлечь сейчас через `redraw-block` (режим B), (b)
  оставить `Lab*` с `// TODO ds-gap`, (c) взять ближайший `ready` DS (только с
  явного согласия — это уже мелкое изменение раскладки, по умолчанию НЕ делаем).

### ⛔ GATE (user)
Покажи `## ds-ify <route> — Mapping` и **остановись**. Не переписывай до «да».
```markdown
## ds-ify <route> — Mapping
| # | Секция (сейчас) | Тон | → DS-компонент | Класс | Действие |
|---|---|---|---|---|---|
| 1 | po-hero (inline) | soft | StatementHero | swap | content→props |
| 2 | LabBento ink | ink | Bento | already-ds | — |
| 3 | pr-versus (inline) | ink | — | **gap** | redraw-block? / TODO |
### Gaps (нужно решение)
- pr-versus → нет барель-эквивалента: извлечь (redraw-block) | оставить Lab* +TODO
### План перезаписи
- контейнер: `section-lab ds`, ScrollFX в конце; порядок и контент 1:1
```

### Фаза 3 — Rewrite
Только после approve. Перепиши `page.tsx`:
- импорты — из `@/components/ds`; контент в пропсы **дословно** как был;
- порядок секций 1:1; контейнер `section-lab ds`; `<ScrollFX/>` в конце (если не
  главная и его не было — смонтировать);
- `surface` = текущий тон секции;
- НЕ менять `version`/цвет/переходы/motion;
- **gap по решению**: (a) вызвать `redraw-block` для извлечения в чистый DS и
  подключить полученный компонент; (b) оставить `Lab*` с `// TODO ds-gap: <архетип>`.
Большой/рискованный рефактор можно поручить инженеру
(`multi-platform-apps-frontend-developer`) task packet'ом; мелкая механическая
подмена — на месте.

### Фаза 4 — Verify
- Static self-check: все импорты резолвятся из бареля, пропсы существуют (сверь с
  `index.ts` и типами компонентов), порядок/контент совпали с исходником, контейнер
  и `ScrollFX` на месте, сырых `Lab*` без TODO не осталось.
- `cd web && pnpm build` или preview — **только если user попросил**; иначе
  ограничиться статической проверкой и сказать об этом честно.

### Final Report
```markdown
## ds-ify <route> Complete
### Mapping applied
| # | Было | Стало (DS) | Действие |
### Gaps
- осталось как Lab* (+TODO): … | извлечено через redraw-block: …
### Verify
- static: imports ok / props ok / order+content 1:1 / ScrollFX ok
- build/preview: run | skipped (по правилу проекта)
### Next
- ручной арт-дирекшн (версии блоков + переходы) → page-skin / page-motion
### Not performed
- no content change · no redesign · no recolor · no transitions · no commit/push
```

---

## 4. Рейлы (нерушимо)
- Верность контента и порядка — выше всего; рефактор, не редизайн.
- Публичный API только `@/components/ds`; гэпы — через `redraw-block` или явный TODO,
  никогда молча `Lab*`.
- Один user-гейт (маппинг) до перезаписи; одна страница за вызов.
- Главную и `ScrollOrchestrator` не трогать; общие файлы — только через `redraw-block`.
- Не коммитить/push/PR/`.env`; dev-сервер не поднимать; `pnpm build` — с разрешения.

## 5. Связанные
[redraw-block](../redraw-block/SKILL.md) (извлечь гэп в чистый DS) ·
[page-skin](../page-skin/SKILL.md) / [page-motion](../page-motion/SKILL.md)
(следующие проходы) · [build-pages](../build-pages/SKILL.md) (batch) ·
[section-types](../../../wiki/architecture/section-types.md) (каталог архетипов).
