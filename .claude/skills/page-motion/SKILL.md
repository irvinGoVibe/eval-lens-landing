---
name: page-motion
description: "ПРОХОД 3 из 3 расслоённой сборки страницы EvalLense (skeleton → skin → motion). Делает ПЕРЕХОДЫ между секциями и тюнит АНИМАЦИЮ поверх уже раскрашенной страницы: на каждый стык ставит направленный `ready`-переход (`tr-*`) с `data-from`/`data-to` из skin.surface_sequence, добавляет/настраивает scroll/ambient motion через `data-reveal`/`data-scrub`/`data-pin`. `<ScrollFX/>` УЖЕ смонтирован скелетом (видимость DS-компонентов завязана на движок) — page-motion лишь проверяет его наличие, а не ставит с нуля. НЕ меняет структуру (skeleton.locked) и НЕ перекрашивает (skin). Переходы — ТОЛЬКО из готовой библиотеки; нужного нет → visual-layer-forge, не лепить руками. Отдельный проход = можно итерировать переходы, не трогая остальное. Сам код пишет инженер после user-гейта. Триггеры — /page-motion, «сделай переходы <route>», «оживи <route>», «добавь анимацию <route>», «motion <route>», «resume motion <route>»."
metadata:
  package: page-build
  role: orchestrator
  pass: 3
  product: EvalLense
  pipeline: [page-skeleton, page-skin, page-motion]
  depends_on: page-skin
  routes_to: [visual-layer-forge, component-library-preparer]
---

# page-motion — проход 3: переходы и анимация

Ты — **дирижёр третьего прохода**. Берёшь **раскрашенную страницу** (структура от
`page-skeleton`, цвет/surfaces от `page-skin`) и добавляешь **движение**: направленные
переходы между секциями + scroll/ambient анимацию. **Структуру и цвет не трогаешь.**

```text
один запуск = переходы + анимация одной раскрашенной страницы
skeleton → skin → motion (этот скилл)
```

> **Почему отдельный проход.** Раньше переходы решались наспех в общем гейте — если
> выходило плохо, нельзя было поправить только их. Здесь переходы и motion — отдельная
> итерируемая стадия со своим гейтом и QA. Диагноз по факту кода: библиотека переходов
> **не сырая** (`tr-gradient-bridge`/`tr-masked-divider`(+`--diagonal`/`--dome`)/
> `tr-glow-crossover`/`tr-pattern-dissolve`(+`--lines`)/`tr-lens-seam`(+`--strong`)/
> `tr-hard-cut`, все параметризованы `data-from`/`data-to` по light/soft/ink) — сырой
> была **разводка**. Этот проход и есть аккуратная разводка + итерация.

---

## 0. Предусловие (gate before start)

**Стартуем только если `skin.status == skin-applied`** (значит и `skeleton.locked`) в
общем state (`.claude/runs/page-build/<run-id>/state.json`). Нет раскраски / нет
`skin.surface_sequence` → **вернуть user к `page-skin`** (или page-skeleton, если и
структуры нет). Переходы зависят от поверхностей соседних секций — без surface_sequence
их направление не определить.

---

## 1. Жёсткие запреты (read first)

Наследуются от `page-composer` §0 **плюс** запреты этого прохода:

- **не менять структуру** (секции/порядок/контент — `skeleton.locked`) и **не
  перекрашивать** (surfaces/цвет/тему — это `page-skin`); diff этого прохода — только
  переходы `tr-*` и motion-атрибуты + монтаж `<ScrollFX/>`;
- **переходы — только из `ready` visual-layer библиотеки** (`tr-*` из манифестов
  `transitions`); нужного перехода/направления нет → **gap в `visual-layer-forge`**
  (§4), **не** изобретать `tr-*` руками и **не** лепить голый inline-градиент;
- движение — **только** через `<ScrollFX/>` + `data-reveal`/`data-scrub`/`data-pin`
  (внутренние страницы); **новый animation runtime не создавать**; `ScrollOrchestrator`
  — **только home**, не переиспользовать на внутренних (правило CLAUDE.md: единый rAF,
  не дробить на per-section `useEffect`);
- `tr-hard-cut` — только осознанный приём на одном high-contrast statement с причиной,
  не дефолт между полосами;
- импорт только `@/components/ds`; манифесты не править; зависимостей не вводить; другие
  страницы не трогать; `commit`/`push`/PR/deploy/`.env*` — нельзя.

`prefers-reduced-motion` — обязателен: motion тих, **контент виден** (не спрятан за
`.is-current`/начальным состоянием reveal). Сервер/браузер — только Ф4 (Motion QA);
pnpm, порт 3005.

---

## 2. Принципы движения (по page-composer §Ф6 шаг 3)

- **переход направленный и намеренный**: между разными поверхностями — `ready`
  `tr-*` с корректными `data-from`/`data-to` (берутся из `skin.surface_sequence`), а
  не голый black↔white cut; `soft` — мост для резких `light→ink`;
- **motion поддерживает нарратив, не шумит**: reveal/scrub дозированно; нет нескольких
  high-intensity подряд; пик движения совпадает с surface-пиком (`ink`/glow), заданным
  page-skin'ом, а не спорит с ним;
- **переход совместим с соседними surfaces** — `data-from`/`data-to` обязаны
  соответствовать фактическим поверхностям секций из `surface_sequence`.

---

## 3. Pipeline (движение, draft-first)

```
Ф0 Load skinned page (route + общий state; проверить skin.status == skin-applied)
→ Ф1 Motion Composition (стыки → tr-* + data-from/to из surface_sequence; ambient motion; +ui-ux-pro-max)
→ Ф2 Gap Routing (нет нужного tr-*/направления `ready` → visual-layer-forge)
→ ⛔ MOTION GATE (user) — план переходов+анимации; стоп
→ Ф3 Implementation (вставить tr-*, data-*, смонтировать <ScrollFX/>)
→ Ф4 Motion QA (3005, fix loop ≤3; переходы/reduced-motion вживую)
→ Ф5 Final UI/UX review (ui-ux-pro-max, ≤1 correction) → motion.status=done → Report
```

### Ф1 — Motion Composition
Для **каждого стыка** соседних секций из залоченной структуры — направленный
`ready`-переход; `data-from`/`data-to` = поверхности этих секций из
`skin.surface_sequence`. Для секций — дозированный ambient/reveal motion. Оркестратор
зовёт `ui-ux-pro-max` на **глобальный ритм движения** (не пару).

```yaml
motion_composition:
  seams:                       # на каждый стык залоченной структуры
    - from_section:            # из skeleton.sections (порядок неизменен)
      to_section:
      from_surface:            # из skin.surface_sequence — НЕ выдумывать
      to_surface:
      transition_id:           # ready tr-* (directional) | none(static seam) | gap
  ambient:
    - section_id:
      motion_id:               # ready motion | data-reveal | data-scrub | data-pin | static
      intensity: low | medium | high
  reduced_motion: "контент виден, эффекты выключены"
  rhythm_check:                # нет >2 high-intensity подряд; пик совпадает с surface-пиком
    verdict: harmonious | noisy(+fix)
```

### Ф2 — Gap Routing
Нужного `tr-*`/направления/motion нет в `ready` манифестах → `visual-layer-forge`
(page-composer §7.2: `from_surface`/`to_surface`/`required_behavior`), стоп с resume
packet. Локально переход не изобретать.

### ⛔ MOTION GATE (user)
Показать план (§5) — стыки с переходами + ambient motion. **Стоп.** Application code —
после `подтверждаю`/`реализуй`/`approved`.

### Ф3 — Implementation
`multi-platform-apps-frontend-developer`: в **существующую** раскрашенную `page.tsx`
вставляет `tr-*`-обёртки на стыки с `data-from`/`data-to` из surface_sequence;
навешивает/настраивает `data-reveal`/`data-scrub`/`data-pin` по плану. **`<ScrollFX/>`
уже смонтирован скелетом** (после `<Footer/>`) — проверить, что он на месте; если по
какой-то причине отсутствует — смонтировать. **Не** меняет структуру/тексты; **не**
перекрашивает; **не** создаёт новый runtime/зависимости.
Состояние → `implementation`.

### Ф4 — Motion QA (+ fix loop ≤3)
Preview `web` (3005). Ширины `1440 / 1280 / 768 / 375`. Проверить:

- **структура и цвет не изменились** vs skin-страница (diff только переходы/motion);
- **переходы хорошо работают в соседних парах**: `data-from`/`data-to` совпадают с
  фактическими поверхностями; направление верное; нет голых black↔white cut без
  намерения; стыки читаются как замысел, а не баг;
- motion не конфликтует; нет нескольких high-intensity подряд; **`<ScrollFX/>`
  смонтирован** (иначе `data-reveal` → пустые секции);
- **`prefers-reduced-motion` тих**: контент полностью виден, ничего не спрятано;
- console=0; **horizontal overflow=0** на всех ширинах (full-bleed переходы не текут);
- gotchas памяти: `section-lab-preview-scroll-gotcha` (mid-page стыки — `preview_eval`/
  `preview_inspect`, не скролл-скриншоты), `preview-globals-css-stale-cache`.

Read-only — `ui-visual-validator`, `accessibility-expert` (reduced-motion/focus),
`comprehensive-review-code-reviewer`. Fail → fix loop ≤3 тому же writer'у; после 3 →
`blocked-after-three-fix-cycles`.

### Ф5 — Final UI/UX review
`ui-ux-pro-max` по **реализованной** странице целиком (переходы · ритм движения ·
совместимость с surface-аркой · reduced-motion · mobile). **≤1** correction. Состояние
→ `done`.

---

## 4. Motion Gate — план (формат)

```markdown
## Page Motion Plan — <route>  (проход 3/3: переходы + анимация)

### Locked structure + applied skin (НЕ меняются)
- Style: <…> · Surface sequence: light·soft·ink·soft·light  (из page-skin)

### Transitions (seams)
| From → To | From surface | To surface | Transition (ready tr-*, directional) | Gap? |

### Ambient / scroll motion
| Section | Motion (ready / data-reveal / scrub / pin) | Intensity |

### Reduced motion
- контент виден, эффекты выключены: <как>

### Gaps
- visual-layer gaps (→ visual-layer-forge): … (нет нужного tr-*/направления)

### Files expected to change
- web/src/app/<route>/page.tsx  (tr-* обёртки, data-* атрибуты, <ScrollFX/> mount)

### Validation plan
- structure+skin unchanged · seams directional & correct · ScrollFX mounted
- reduced-motion quiet · console=0 · overflow=0
```

После — **стоп** до явного решения.

---

## 5. State (свой блок в общем файле)

```yaml
page_build:
  motion:
    status:                    # pending | waiting-for-approval | implementation | QA | final-review | done | blocked
    seams: [ ]                 # from/to section, from/to surface, transition_id
    ambient: [ ]               # section_id, motion_id, intensity
    scrollfx_mounted:          # true после Ф3
```

Блокеры: `blocked-after-three-fix-cycles · transition-gap-unapproved ·
skin-not-applied` (нет раскраски → вернуть в page-skin). Resume:
`/page-motion "resume <route>"`. После `done` страница собрана всеми тремя проходами.

---

## 6. Рейлы (нерушимо)

- Стартовать только при `skin.status == skin-applied`; структуру и цвет не менять.
- Переходы — только `ready` `tr-*` с `data-from`/`data-to` из `skin.surface_sequence`;
  нужного нет → `visual-layer-forge`, не изобретать руками.
- Движение — только `<ScrollFX/>` + `data-*`; новый runtime не создавать;
  `ScrollOrchestrator` не тащить на внутренние страницы.
- `prefers-reduced-motion` обязателен; `tr-hard-cut` — только намеренно.
- Манифесты не править; другие страницы не трогать.
- Сервер/браузер — только Ф4; pnpm, порт 3005; не commit/push/PR/deploy; `.env*` не трогать.
- Стоп на Motion Gate до явного решения.

## 7. Связанные
[page-skeleton](../page-skeleton/SKILL.md) (проход 1, структура) ·
[page-skin](../page-skin/SKILL.md) (проход 2, источник `surface_sequence`) ·
[page-composer](../page-composer/SKILL.md) §Ф6 (принципы переходов/anti-stripe) ·
[visual-layer-forge](../visual-layer-forge/SKILL.md) (переходы/motion — visual gaps).
Опора: `wiki/architecture/page-design-patterns.md` · `<ScrollFX/>`/`data-*` конвенции.
