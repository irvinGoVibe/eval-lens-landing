---
name: page-skin
description: "ПРОХОД 2 из 3 расслоённой сборки страницы EvalLense (skeleton → skin → motion). РАСКРАШИВАЕТ уже собранную нейтральную страницу: спрашивает тему (light/dark) и стиль, накладывает surface-драматургию (light/soft/ink-пики) + бренд-цвет + recipe-anchor поверх ЗАМОРОЖЕННОЙ структуры. НЕ меняет секции/порядок/контент (skeleton.locked), НЕ делает переходы и анимацию (это page-motion). Каждый выбранный стиль = отдельный визуальный вариант на гейте; user выбирает ОДИН. Геометрия surface-invariant — раскраска не двигает раскладку. Записывает surface_sequence для page-motion. Сам код пишет инженер после user-гейта. Триггеры — /page-skin, «раскрась <route>», «примени тему/стиль к <route>», «сделай dark-версию <route>», «skin <route>», «resume skin <route>»."
metadata:
  package: page-build
  role: orchestrator
  pass: 2
  product: EvalLense
  pipeline: [page-skeleton, page-skin, page-motion]
  depends_on: page-skeleton
  routes_to: [visual-layer-forge, component-forge, component-library-preparer]
---

# page-skin — проход 2: тема и стиль (surface + цвет)

Ты — **дирижёр второго прохода**. Берёшь **залоченную нейтральную структуру** от
`page-skeleton` и **раскрашиваешь** её: тема (light/dark), surface-драматургия
(`light`/`soft`/`ink`-пики), бренд-цвет, recipe-anchor. **Структуру не трогаешь.
Переходы и анимацию не делаешь** — это page-motion.

```text
один запуск = раскраска одной залоченной страницы
skeleton → skin (этот скилл) → motion
```

> **Почему это работает без переразметки.** В DS геометрия surface-invariant
> (`SectionFrame`: *«light ≡ ink, only colour flips»*). Значит тема/стиль меняют
> **только цвет и поверхность**, раскладка остаётся той же, что утверждена на
> Structure Gate. Поэтому этот проход безопасен и обратим.

---

## 0. Предусловие (gate before start)

**Стартуем только если `skeleton.locked == true`** в общем state
(`.claude/runs/page-build/<run-id>/state.json`, см. [page-skeleton](../page-skeleton/SKILL.md) §5).
Если структура не залочена / страница ещё нейтральная не собрана → **вернуть user к
`page-skeleton`**, не чинить структуру здесь. Если state-файла нет — спросить route и
проверить, собиралась ли страница через page-skeleton.

---

## 1. Жёсткие запреты (read first)

Наследуются от `page-composer` §0 (см. [page-composer](../page-composer/SKILL.md) §0)
**плюс** запреты этого прохода:

- **не менять секции/порядок/контент/факты** — структура заморожена (`skeleton.locked`);
  обнаружил структурную проблему → стоп, вернуть в page-skeleton, не править здесь;
- **не менять раскладку/геометрию** — только surface-токен и цвет (геометрия invariant);
- **не ставить переходы** (`tr-*`) и **не добавлять motion** (`data-reveal`/`scrub`/`pin`,
  `<ScrollFX/>`) — это исключительно page-motion;
- бренд-цвет — **только наши токены** (`--violet`/`--cyan`/`--violet-2`/`--dsc-*`/
  surfaces из `globals.css` + `.ds`), никаких приближённых хексов и не-DS палитр;
- импорт только `@/components/ds`; недостающий стиль-примитив/recipe → **gap в
  `visual-layer-forge`** (§4), не лепить локально;
- манифесты руками не править; новых зависимостей нет; другие страницы не трогать;
  `commit`/`push`/PR/deploy/`.env*` — нельзя.

**Next16 Lightning CSS gotchas (память) — критично для цвета:**
- сырые `oklab()`/`oklch()` в стопах градиентов рушат сборку CSS молча → стопы
  задавать **hex/rgb** (`next16-lightningcss-drops-raw-oklab`);
- `backdrop-filter` — только unprefixed + **unitless** `saturate()`, иначе Lightning
  выкидывает свойство, ломая Firefox (`next16-lightningcss-drops-backdrop-filter`).

Сервер/браузер — только Ф4 (Skin QA); pnpm, порт 3005.

---

## 2. Стиль-якоря — пул зависит от темы (source of truth)

Этот проход выполняет **Ф0.5 Style intake** и **Ф6/Ф6-styles** из page-composer —
**не дублируй спеки, бери по ссылке:** все surface-арки, anti-stripe лимиты, dark-темы
(токены, signature-приёмы, glow/opacity-лимиты, «когда что») описаны в
[page-composer](../page-composer/SKILL.md) §Ф6 и §Ф6-styles, источник истины dark —
`.claude/designs/dark-themes/design-council.md`.

**Пул LIGHT (тема `light`):** `Cinematic Ink` (`style-cinematic-ink`) ·
`Vivid Blocks` (`style-vivid-blocks`) · `Calm Editorial` (`style-calm-editorial`).
**Пул DARK (тема `dark`):** `Ink Refined` (`dark-refined`, база) ·
`Nebula Deep` (`dark-nebula`, акцентная flagship/immersive).

**Light и dark не смешиваются в одном запуске** — тема одна на прогон (сравнить
light vs dark = два запуска page-skin над той же залоченной структурой).

---

## 3. Pipeline (раскраска, draft-first)

```
Ф0 Load locked skeleton (route + общий state; проверить skeleton.locked)
→ ⛔ Ф0.5 Style intake (USER: тема light/dark + стиль(и) из пула темы; multiSelect)
→ Ф1 Surface Composition × N стилей (anti-stripe арка на КАЖДЫЙ стиль; +ui-ux-pro-max)
→ Ф2 Gap Routing (нет стиль-примитива/recipe `ready` → visual-layer-forge)
→ ⛔ SKIN GATE (user) — N стиль-вариантов рядом; user выбирает ОДИН; стоп
→ Ф3 Implementation (раскрасить page.tsx только выбранным стилем)
→ Ф4 Skin QA (3005, fix loop ≤3; anti-stripe вживую)
→ записать skin.surface_sequence + skin.selected_style → handoff в page-motion → Report
```

### ⛔ Ф0.5 — Style intake (USER, обязательно)
`AskUserQuestion`, два вопроса в одном раунде:
1. **Тема** — single-select: `Light` (дефолт) · `Dark`. Определяет пул якорей.
2. **Стиль(и)** — multiSelect из пула выбранной темы (§2; дефолт — все стили темы).

Зафиксировать `skin.theme` + `skin.styles[]`. Каждый стиль → отдельный
Surface Composition вариант и отдельная колонка на гейте.

### Ф1 — Surface Composition (anti-stripe, на каждый стиль)
Для каждого выбранного стиля — своя **арка поверхностей** по page-composer §Ф6:
якорь на `ready` L15 recipe; surface_sequence (light·soft·ink) как нарратив, не
«зебра»; `ink` — дефицитный пик (≤2 light-тема / переинтерпретация для dark);
бренд-цвет по signature стиля. **`ui-ux-pro-max` подписывает глобальный ритм**
(`stripe_check.verdict: harmonious`) — иначе вариант на гейт не выносится.

```yaml
skin_variant:                  # ⟲ на каждый выбранный стиль
  theme: light | dark
  style:                       # cinematic-ink | vivid-blocks | calm-editorial | dark-refined | dark-nebula
  recipe_anchor:               # ready L15 | none(+reason)
  surface_sequence:            # light·soft·ink·soft·light — на ВСЕ секции залоченной структуры
  arc_intent:                  # calm-build → one peak → quiet close
  per_section:
    - section_id:              # из skeleton.sections (НЕ менять состав/порядок)
      surface: light | soft | ink
      brand_accent:            # какой токен/приём (signature стиля) | none
  stripe_check: { ink_count:, longest_ABAB_run:, verdict: harmonious | striped(+fix) }
```

**`per_section.section_id` — строго из залоченного `skeleton.sections`.** Нельзя
добавить/убрать/переставить секцию. Только назначить каждой surface+accent.

### Ф2 — Gap Routing
Стиль-примитив/recipe не `ready` в манифестах → вариант `blocked-style`, примитивы в
`visual-layer-forge` (page-composer §7.2), стоп с resume packet. Локально не лепить.

### ⛔ SKIN GATE (user)
Показать план (§5) — по одному варианту на стиль (структура у всех одна, общая;
различается только surface+цвет). **Стоп.** User выбирает **ОДИН** стиль. Реализуется
только он. Application code — после `подтверждаю`/`реализуй`/`approved`.

### Ф3 — Implementation (раскрасить page.tsx)
`multi-platform-apps-frontend-developer`: правит **существующую** залоченную
`page.tsx` — назначает секциям surface (`light`/`soft`/`ink`), накладывает бренд-цвет/
recipe-anchor/signature выбранного стиля **через наши токены**. **Не** меняет состав/
порядок/тексты секций; **не** двигает раскладку; **не** добавляет переходы/motion/
`<ScrollFX/>`. Dark-тема → тёмный shell на всю страницу (не «зебра» с белым).
Состояние → `implementation`.

### Ф4 — Skin QA (+ fix loop ≤3)
Preview `web` (3005). Ширины `1440 / 1280 / 768 / 375`. Проверить:

- **структура не изменилась**: те же секции, тот же порядок, тот же контент, что в
  залоченном skeleton (diff только цвет/surface);
- **anti-stripe вживую**: гармоничная арка, не «зебра»; `ink` ≤2 (light) / dark-shell
  сквозной без dark↔light пробегов; `stripe_check: harmonious` на скриншотах;
- бренд-цвет только наши токены; контраст текста на всех поверхностях; glass/glow в
  лимитах стиля; **переходов и motion ещё нет** (это норма для этого прохода);
- console=0; **horizontal overflow=0**; CSS-сборка не молчит (oklab/backdrop gotchas).

Gotchas памяти как в page-skeleton §6 (scroll-gotcha, globals stale cache). Read-only —
`ui-visual-validator`, `design-system-architect` (токены/тема), `accessibility-expert`
(контраст). Fail → fix loop ≤3 тому же writer'у; после 3 → `blocked-after-three-fix-cycles`.

### Handoff в page-motion
Записать `skin.surface_sequence` (вся страница) + `skin.selected_style` + `skin.theme`
+ `skin.recipe_anchor` в общий state, `skin.status = skin-applied`. page-motion берёт
`surface_sequence`, чтобы выставить `data-from`/`data-to` на переходах.

---

## 4. Skin Gate — план (формат)

```markdown
## Page Skin Plan — <route>  (проход 2/3: тема + стиль)

### Locked structure (from page-skeleton — НЕ меняется)
| # | Section | Scale | Role |   ← из skeleton.sections, read-only

### Theme: <light | dark>

### Skin variant  — ⟲ на КАЖДЫЙ выбранный стиль
- **Style:** <cinematic-ink | vivid-blocks | calm-editorial | dark-refined | dark-nebula>
- **Recipe anchor (L15):** <recipe-id | none(+reason)>
- **Surface sequence:** light·soft·light·ink·soft  (на залоченные секции)
- **Arc:** calm-build → one peak → quiet close
- **stripe_check:** ink ≤2 · longest A·B·A·B <4 → harmonious

| # | Section | Surface | Brand accent (signature) |

### Gaps
- visual-layer gaps (→ visual-layer-forge): … (если `blocked-style`)

### Files expected to change
- web/src/app/<route>/page.tsx  (только surface/цвет, структура неизменна)

### Validation plan
- structure unchanged vs locked skeleton · anti-stripe harmonious · contrast ok
- console=0 · overflow=0 · no transitions/motion yet (by design)
```

После — **стоп** до явного выбора стиля.

---

## 5. State (свой блок в общем файле)

```yaml
page_build:
  skin:
    status:                    # pending | waiting-for-style-approval | implementation | QA | skin-applied | blocked
    theme:                     # light | dark (Ф0.5)
    styles: [ ]                # выбранные на Ф0.5
    selected_style:            # выбранный на Skin Gate (один)
    recipe_anchor:
    surface_sequence: [ ]      # вся страница — handoff в page-motion
    per_section: [ ]           # section_id → surface + brand_accent
```

Блокеры: `blocked-style · blocked-after-three-fix-cycles · structure-not-locked` (skeleton
не залочен → вернуть в page-skeleton). Resume: `/page-skin "resume <route>"`.

---

## 6. Рейлы (нерушимо)

- Стартовать только при `skeleton.locked`; структуру/порядок/контент не менять.
- Только surface + цвет; геометрия invariant — раскладку не двигать.
- Переходы и motion **не** делать (page-motion); `<ScrollFX/>` не монтировать.
- Бренд-цвет — только наши токены; стопы hex/rgb; backdrop-filter по gotcha-правилу.
- Light/dark не смешивать в одном прогоне; anti-stripe подписывает `ui-ux-pro-max`.
- Недостающий стиль-примитив → `visual-layer-forge`, не локально; манифесты не править.
- Записать `surface_sequence` в общий state для page-motion.
- Сервер/браузер — только Ф4; pnpm, порт 3005; не commit/push/PR/deploy; `.env*` не трогать.
- Стоп на Skin Gate до явного выбора.

## 7. Связанные
[page-skeleton](../page-skeleton/SKILL.md) (проход 1, источник залоченной структуры) ·
[page-motion](../page-motion/SKILL.md) (проход 3, потребитель `surface_sequence`) ·
[page-composer](../page-composer/SKILL.md) §Ф6/§Ф6-styles (source of truth стиль-якорей) ·
[visual-layer-forge](../visual-layer-forge/SKILL.md) (стиль-примитивы/recipes — gaps).
Источник истины dark: `.claude/designs/dark-themes/design-council.md`.
