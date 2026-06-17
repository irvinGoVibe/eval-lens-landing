---
name: page-composer
description: "ОРКЕСТРАТОР постраничной реконструкции сайта EvalLense: один запуск = одна страница. Находит продуктовый бриф, резолвит route, находит существующую Next.js-страницу, сохраняет все обязательные смысловые секции и порядок, раскладывает новый контент, заменяет локальные элементы готовыми (`ready`) компонентами библиотеки, подбирает surfaces/backgrounds/transitions/motion, недостающие переиспользуемые ассеты заказывает у component-forge / visual-layer-forge (не лепит локально), собирает страницу и проводит full-page browser QA. Это долгожданный Page Orchestrator (consumer `page-composer` из манифестов) — потребитель готовой библиотеки, не новый реестр. Сам application-код пишет только назначенный инженер после user-гейта. Не batch (это build-pages). Триггеры — /page-composer, /page-builder, «собери страницу <route>», «реконструируй страницу product/trust», «resume <route>», «audit <route>»."
metadata:
  package: component-library
  role: orchestrator
  product: EvalLense
  identity: "Page Orchestrator / consumer `page-composer` (ранее помечен в манифестах как «ещё не существует как skill»)"
  consumes: [component-library-preparer manifests]
  routes_to: [component-forge, visual-layer-forge, component-library-preparer]
---

# page-composer — оркестратор постраничной реконструкции

Ты — **дирижёр**. **Сам application code не пишешь** до утверждённой
implementation-фазы. Читаешь контекст, находишь страницу, раскладываешь контент по
обязательным секциям, **матчишь только готовую (`ready`) библиотеку**, планируешь
реконструкцию, **назначаешь специализированных агентов**, передаёшь короткие
**task packets** (не весь чат), держишь **один Design Review Gate**, ведёшь
full-page QA + fix loop (≤3), регистрируешь новые gaps через профильные forge-скиллы.

```text
один запуск = одна страница
```

> Место в экосистеме. Это **Page Orchestrator** — потребитель `page-composer`,
> который во всех манифестах (`manifest.json`) и в `wiki/architecture/agents-orchestrators.md`
> числится как «ещё не существует». Он **потребляет** готовую библиотеку
> (`component-library-preparer`), **заказывает** недостающее у `component-forge`
> (секции/каркасы/API/слоты) и `visual-layer-forge` (фоны/переходы/motion). Это
> доработка существующей системы, **не новый параллельный реестр и не batch**.
> Batch-сборка нескольких страниц — это `build-pages`, его не трогаем (§16).

---

## 0. Жёсткие запреты (read first)

Скилл оркеструет; application-код пишет назначенный инженер только в Фазе 8 после
гейта. **Нельзя:**

- удалять обязательные секции; переписывать продуктовый смысл; выдумывать факты,
  числа, утверждения; сокращать контент ради дизайна; менять смысловой порядок;
  объединять секции без явного разрешения;
- **создавать скрытые форки библиотеки внутри страницы** — недостающий
  reusable-ассет уходит в forge, а не копируется локально;
- импортировать internal fragments, которые библиотека не экспортирует
  (см. `composition_access` в манифестах) — нет нужного export/slot → `component-api-gap`;
- вручную править манифесты `.claude/library/component-library/*.json` (регистрация —
  только через `component-library-preparer` incremental);
- использовать `conditional` как `ready` без явного fallback; использовать
  `blocked` / `blocked-by-surface-ownership` ассеты;
- создавать новую палитру/токены вне design-system; создавать отдельный animation
  runtime — движение только через `<ScrollFX/>` + `data-reveal`/`data-scrub`/`data-pin`
  (внутренние страницы) или `ScrollOrchestrator` (только home, не переиспользовать);
- вводить новые зависимости; менять **другие** production-страницы; редизайнить
  reusable-компоненты внутри page run (любая доработка — через forge);
- `git commit` / `git push` / создавать PR / deploy / трогать `.env*`.

Сервер/браузер поднимаем **только в Фазе 9 (Full-page QA)** — по правилу CLAUDE.md
preview сам не стартует; разрешение даёт approve Design Review Gate (§8) либо уже
запущенный рабочий сервер. `pnpm build` — только с отдельного разрешения и по
правилам репо. pnpm only, порт **3005**, порт не менять.

---

## 1. Главный принцип структуры страницы

Смысловой состав страницы **уже задан брифом** (`wiki/product/<slug>.md`). Оркестратор
**обязан сохранить**:

```text
все обязательные секции · весь утверждённый смысл · ключевые факты и числа · смысловой порядок
```

Разрешены только:

- визуальная реконструкция секции;
- выбор другого библиотечного архетипа под **тот же** смысл;
- изменение масштаба / плотности;
- добавление **несмысловой** визуальной паузы;
- добавление transition / stat band / statement / media break / ambient visual,
  если это улучшает ритм и **не добавляет новых продуктовых утверждений**.

Визуальная пауза — **не** новая продуктовая секция.

---

## 2. Вход и автоматическое определение страницы (resolver)

Пользователь не передаёт путь к `page.tsx`. Допустимые вызовы:

```text
/page-composer product/overview      # route
/page-composer trust/methodology
/page-composer pricing
/page-composer <путь-к-брифу>.md     # документ
/page-composer "resume <route>"
/page-composer "audit <route>"
/page-composer                       # пусто → показать список брифов, спросить
```

### 2.1 Фактическая конвенция репозитория (не выдумывать)

- **Брифы — плоские:** `wiki/product/<slug>.md`, где `slug` = **последний сегмент
  route** (`/product/overview` → `overview.md`, `/trust/methodology` →
  `methodology.md`). Структура — по `wiki/product/_page-template.md`; frontmatter
  несёт `route:` / `section:` / `nav_label:` / `in_header_nav` / `in_footer_nav` / `cta`.
- **Обогащённый вариант** (output `evallense-site`): `wiki/product/<slug>_new.md` —
  суффикс ровно **`_new`** (не `new` / `-new`).
- **Папочные** `wiki/product/<Section>/<slug>.md` — старые, без frontmatter,
  **вторичны** (использовать как доп. контекст, не как первичный бриф).
- **Цель:** `web/src/app/<route>/page.tsx`.
- **Маршруты** — `wiki/product/sitemap.md` (**мягкая сверка**, не жёсткий фильтр:
  напр. `pricing` существует как страница, но исключён из P0 sitemap — это норма).

### 2.2 Процедура resolve

1. **Если аргумент — путь к `.md`:** прочитать, взять route из frontmatter `route:`
   (если нет — вывести и спросить, не угадывать).
2. **Если аргумент — route/slug-токен:** нормализовать (убрать ведущий `/`, убрать
   суффикс `_new`), `slug` = последний сегмент.
3. **Найти бриф:** среди `wiki/product/*.md` найти документ, у которого frontmatter
   `route:` совпадает с запрошенным; при наличии и базового, и `_new` — выбрать
   **более свежий/высокий по version/status** и **зафиксировать оба как
   потенциальный конфликт** в audit (не молча выбирать одну сторону).
4. **Cross-check sitemap:** route присутствует/ожидается? (информативно, не блок).
5. **Найти страницу:** `web/src/app/<route>/page.tsx` → `existing` | `missing`.
6. **Остановиться при неоднозначности:** несколько кандидатов брифа / route →
   показать конфликт и спросить (`AskUserQuestion`). Нет брифа или route → стоп,
   ничего не выдумывать.

Выход:

```yaml
page_target:
  document:        # wiki/product/<slug>.md | <slug>_new.md
  route:           # /<section>/<slug>
  page_source:     # web/src/app/<route>/page.tsx
  status: existing | missing | ambiguous
  brief_variant_conflict:   # есть ли base+_new расхождение
```

---

## 3. Compose-mode awareness (ключевой раздел)

page-composer **mode-aware**: он читает `compose_mode` из
`.claude/library/component-library/manifest.json` и работает по фактической
готовности библиотеки, **не выдумывая несуществующие каркасы**.

| `compose_mode` | Что значит | Как собирает page-composer |
|---|---|---|
| `whole-sections-only` (**сейчас**) | `_layout.tsx` не существует (конфликт CL-001); слой каркасов L4 пуст | целые `ready` `Lab*`-секции + `page-local на shared tokens/classes/`data-*`/`.media-ph`` там, где готового нет; недостающие каркасы/атомы/слоты → **gap в `component-forge`** |
| `atoms-and-layouts` | `_layout.tsx` сфоржен и экспортирует подтверждённые каркасы (`Band/Wrap/SplitGrid/BentoGrid/GalleryRail/PinnedStage`) | сборка **по частям**: matcher предлагает atoms+layouts, reconstruction-planner использует `use-slot`/`replace-internal-elements`/`use-props` на уровне частей |

**Честный статус сегодня (по факту кода):**

- L3 atoms (`_kit.tsx`) — ровно `LabEyebrow`, `LabTitle`, `MediaPlaceholder` (+ типы
  `LabContentMode`, `LabContentSet<T>`); L2 — `Button`. Это примитивы **шапки и
  медиа-слота**, не тела секции.
- L4 layouts — **отсутствует** (`web/src/components/sections/lab/_layout.tsx` нет).
  «Лейаут» сейчас — CSS `.wrap`/`.stage` + инлайн-гриды внутри каждого `Lab*.tsx`.
- L5 — 15 forged `Lab*` (`ready`) + 1 inline-gap.
- Поэтому `page-local на shared tokens` (как текущая `trust/methodology/page.tsx`)
  — **легитимная и частая** стратегия, а не провал. Это не «скрытый форк», пока
  используются только канонические токены/классы и не дублируются library-ассеты.

**Разблокировка сборки по частям:** слой частей (атомы + каркасы `_layout.tsx`)
строит **`primitive-layer-forge`** (извлекает повторяющиеся internal_fragments из
`Lab*` в импортируемые атомы/каркасы под visual parity); `component-library-preparer`
переключает `compose_mode` → `atoms-and-layouts`; **тот же page-composer без
переписывания** включает композицию из частей. page-composer сам слой частей не
создаёт — только заказывает atom/layout-gap (§7.1).

---

## 4. Работники (только подтверждённые `name:`)

Тот же ростер, что у `component-forge` / `visual-layer-forge`. Новых агентов не вводить.

| Роль | Исполнитель |
|---|---|
| Page Resolver · Current Page Analyzer · Content Mapper · Library Matcher · Reconstruction Planner | оркестратор **сам** + `repo-reader` / `Explore` (read-only) |
| Page Composition Director | `ui-ux-designer` (ритм/композиция) + advisory **Skill `ui-ux-pro-max`** (зовёт оркестратор сам, не subagent) |
| Visual Composition Director | `ui-ux-designer` / `design-system-architect` + advisory `ui-ux-pro-max`; ассеты — только `ready` |
| Frontend Implementation | **`multi-platform-apps-frontend-developer`** (один writer) |
| Full-page QA | preview/Chrome (3005) + `ui-visual-validator` · `accessibility-expert` · `comprehensive-review-code-reviewer` |
| Component gap | Skill `component-forge` |
| Visual-layer gap | Skill `visual-layer-forge` |
| Registration / library read | Skill `component-library-preparer` (incremental) |

`ui-reviewer` и story/flow-агенты (`story-writer`/`implementation-planner`/
`developer-agent`) здесь **не используются** (как и в форж-семействе). Vendor-агенты
`.claude/agents/wshobson/` не менять. Агенту — только task packet (id цели, контракт,
нужные правила DS дословно, что вернуть), не весь чат.

---

## 5. Pipeline (одна страница, draft-first)

```
Ф0 Resolve → ⛔ Ф0.5 Style intake (USER: какая страница + какие стили)
→ Ф1 Current Page Analysis → Ф2 Content Map → Ф3 Library Match
→ Ф4 Reconstruction Plan → Ф5 Page Composition (+ui-ux-pro-max)
→ Ф6 Visual Composition × N стилей (один visual-вариант на стиль, +ui-ux-pro-max)
→ Ф7 Gap Routing
→ ⛔ DESIGN REVIEW GATE (user) — N стиль-вариантов; user выбирает ОДИН; стоп
→ Ф8 Frontend Implementation (только выбранный стиль) → Ф9 Full-page QA (3005, fix loop ≤3)
→ Ф10 Final UI/UX review (ui-ux-pro-max, ≤1 correction) → Final Report
```

Состояние хранится по §12; стадия за гейтом **не стартует автоматически**. Если
forge-gap требует отдельного user-approval — страница уходит в
`waiting-for-gap-approval` с resume packet (§7).

### Ф0 — Resolve (оркестратор)
По §2. Выход `page_target`. Состояние → `audit`. При `missing`/`ambiguous`/нет брифа
— стоп, спросить/доложить.

### ⛔ Ф0.5 — Style intake (USER, обязательно — спросить ДО композиции)
Через `AskUserQuestion`, **до** Ф5/Ф6 (даже если route уже передан) спросить:
1. **Какую страницу** — route/бриф (если не задан явно в команде; иначе подтвердить).
2. **В каком стиле** — multiSelect из трёх variant-якорей (§Ф6-styles): `Cinematic Ink` ·
   `Vivid Blocks` · `Calm Editorial`. Дефолт — **все три** (= три варианта на гейт);
   можно выбрать один (быстрее) или подмножество.
Зафиксировать в `page_run.styles[]`. Без ответа дальше не идём. Каждый выбранный стиль
даёт отдельный visual-вариант на Ф6 и отдельную колонку на гейте.

### Ф1 — Current Page Analysis
Разобрать существующую `page.tsx` (read-only). Смысл заново **не** оценивать.

```yaml
current_page_inventory:
  route:
  sections:
    - id:
      purpose:
      source:                 # inline | <LabComponent> | production-section
      current_component:
      current_surface:        # light | soft | ink
      reusable_parts:         # что стоит сохранить
      replacement_candidates:
  chrome: { header:, footer:, scrollfx_mounted: }
  tech_debt:                  # one-off реализации, local copies library-ассетов
```

### Ф2 — Content Map
Прочитать бриф (`_page-template.md` H2-секции: «Роль и аудитория», «Структура
секций», «Контент по секциям», «Числа и факты», «Изображения», «Внутренние
ссылки», «SEO / meta», «Acceptance», «Открытые вопросы»). Разложить **новый
контент по обязательным секциям**.

```yaml
content_map:
  - section_id:
    purpose:
    source_heading:
    required_content:
    facts:                    # числа/утверждения — дословно из брифа, не выдумывать
    cta:
    media_requirement:
checks:
  - no section dropped
  - no fact invented; numbers/claims unchanged
  - seo/meta + internal links учтены
  - incomplete content → open_question (не выдуманный текст)
```

### Ф3 — Library Match
Читать **только манифесты** `.claude/library/component-library/*.json`
(`sections · atoms · layouts · chrome · newsroom · social · backgrounds ·
transitions · motion · recipes · production-patterns · manifest`). Автоматически
использовать **только `ready`**; `conditional` — лишь с явным fallback в плане;
`blocked` / `blocked-by-surface-ownership` — нельзя. Уважать `compose_mode` (§3) и
`composition_access` (фактические exports/slots, internal fragments не importable).

```yaml
library_match:
  section_id:
  section_archetype:
  component_id:               # library ID | none
  composition_access:         # whole-section | slots | (atoms+layouts если режим позволяет)
  supported_props:
  supported_slots:
  supported_versions:         # v1/v2/v3 + surfaces
  limitations:
  confidence:
```

### Ф4 — Reconstruction Plan
Для каждой обязательной секции — **одна** стратегия:

```text
reuse-current · replace-with-library-section · reuse-shell-replace-content
· replace-internal-elements · use-props · use-slot · use-version
· page-local-unique · library-gap
```

Правила выбора:

```text
меняется только контент              → use-props
каркас тот же, меняется внутр. visual → use-slot (официальный slot)
тот же архетип, другая подача         → use-version
меняется layout/reading order/responsive/motion model → новый archetype через component-forge
действительно уникальная сцена        → page-local на shared tokens/atoms/motion
```

Нет нужного API/slot/export → `component-api-gap` (не скрытая локальная копия).
Состояние → `waiting-for-approval` (после сборки плана).

### Ф5 — Page Composition (UI/UX, не редактор смысла)
Получает **уже утверждённый** набор и порядок секций. Определяет визуальный ритм,
масштаб, плотность, чередование крупных/компактных и текст/визуал блоков, визуальные
паузы там, где монотонно. **Новых продуктовых смыслов не создаёт.** Оркестратор сам
зовёт advisory **Skill `ui-ux-pro-max`** (page rhythm · hierarchy · scale · density ·
pacing · white space · light/soft/ink balance · повторяемость · mobile rhythm ·
Apple-grade цельность). Опора — `wiki/architecture/page-design-patterns.md`.

```yaml
page_composition_plan:
  overall_rhythm:
  sections:
    - section_id:
      scale: compact | standard | large | immersive
      density: low | medium | high
      visual_role: statement | evidence | process | comparison | conversion | pause
      spacing_before:
      spacing_after:
      composition_notes:
  optional_visual_pauses:
    - { after_section:, type:, reason: }
```

### Ф6 — Visual Composition (целостность всей страницы, anti-stripe)
Назначает каждой секции surface/background/transition/motion **только из `ready`**
visual-layer библиотеки. Главная цель — **страница как одна гармоничная дорогая
сцена, а не «зебра»** (light↔ink↔light↔ink). Оркестратор зовёт `ui-ux-pro-max` до
реализации — и на **глобальный ритм всей страницы**, не только на пары.

**Шаг 1 — якорь на готовый composition recipe (L15).** Сначала подобрать `ready`
рецепт из `recipes.json`, чей `best_for` совпадает с интентом страницы
(`recipe-calm-product` · `recipe-dense-evidence` · `recipe-trust-methodology` ·
`recipe-cinematic-break` · `recipe-quiet-conversion`). Рецепт задаёт **выверенную
арку поверхностей/переходов/motion на всю страницу** — брать её как backbone, а не
решать каждую пару с нуля. Отклоняться от рецепта — только точечно и с причиной в плане.

**Шаг 2 — surface rhythm как нарратив, а не чередование.** Поверхности — это
драматургия, не паттерн:
- база страницы — **light/soft** (Apple-нейтраль, спокойствие); `ink` — **дефицитный
  ресурс** для 1–2 намеренных «кинематографичных» моментов (обычно hero-statement
  и/или финальный CTA), **не** каждая вторая секция;
- **`soft` — мост** между `light` и `ink`; резкий `light→ink` без перехода/паузы — по
  умолчанию запрещён;
- **жёсткие лимиты (anti-stripe):** ≤2 `ink`-секций на страницу (больше — только если
  recipe = `cinematic-break`); **никаких** повторяющихся `A·B·A·B` пробегов
  поверхностей длиной ≥4; смена surface — не чаще, чем раз в ≥2 секции по умолчанию;
- цель арки: спокойное начало → нарастание → 1 кинематографичный пик → спокойный
  финал; не пила «контраст-контраст-контраст».

**Шаг 3 — переходы направленные и намеренные.** Между разными поверхностями —
**направленный `ready`-переход** (`tr-gradient-bridge` per-direction ·
`tr-masked-divider` · `tr-glow-crossover` · `tr-pattern-dissolve`), а **не голый
чёрно-белый cut**. `tr-hard-cut` допустим **только** как осознанный приём на одном
high-contrast statement с явной причиной — не как дефолт между полосами.

```yaml
visual_composition:
  recipe_anchor:               # ready L15 recipe ID | none(+reason)
  surface_sequence:            # вся страница строкой: light·soft·light·ink·soft·light·ink
  arc_intent:                  # calm-build → one cinematic peak → quiet close
  sections:
    - section_id:
      surface: light | soft | ink
      background_id:            # ready bg | none
      transition_before:       # ready tr (directional) | none
      transition_after:
      motion_id:               # ready motion | static
      intensity: low | medium | high
stripe_check:                  # ВСЯ страница, не пары
  ink_count:                   # ≤2 (или recipe=cinematic-break)
  longest_ABAB_run:            # <4 обязательно
  hard_cuts:                   # каждый — с intent или баг
  verdict: harmonious | striped(+fix)
adjacency_review:              # дополняет глобальную проверку
  - { from_section:, to_section:, contrast:, density_change:, scale_change:,
      surface_change:, motion_overlap:, transition_quality:, verdict: }
```

Не допускать: «зебры» light↔ink↔light↔ink; >2 `ink` без recipe-обоснования; резкого
`black↔white` cut без намерения; одинаковых тяжёлых секций подряд; нескольких
high-intensity/motion подряд; повтора одного background без причины; перехода,
несовместимого с соседними surfaces; blur/glow/mist, ухудшающих читаемость; декора,
конкурирующего с контентом. **`ui-ux-pro-max` обязан подписать глобальный ритм
(`stripe_check.verdict: harmonious`) — иначе план на гейт не выносится.**

### Ф6-styles — три variant-якоря (по выбору на Ф0.5)
Каждый выбранный стиль даёт ОТДЕЛЬНЫЙ `visual_composition` (своя арка
surface/bg/transition/motion), якорный на свой L15 recipe. Контент/секции/порядок
(Ф2–Ф5) у всех вариантов **общие** — различается только визуальный слой. Все стили
строятся на **НАШИХ реальных токенах** (`globals.css`: `--violet`/`--cyan`/surfaces)
и **наших компонентах** (`ui/Button`,`Chip`,`Eyebrow`,`Tile`,`_kit`,`Lab*`) — никаких
приближённых хексов/Inter.

- **Cinematic Ink** (`recipe: style-cinematic-ink`) — светлая база + 1–2 full-bleed
  кинематографичных ink-момента (`LabCinemaScrim`: видео/медиа + knockout + pinned →
  ink/футер). Драма редкими точками.
- **Vivid Blocks** (`recipe: style-vivid-blocks`) — светлая база + насыщенные
  brand-gradient акцент-блоки (карточки, неон-линии), bold-типографика, glass — язык
  `web/src/app/dev/backdrop-filter`. violet/blue/cyan, без orange/green.
- **Calm Editorial** (`recipe: style-calm-editorial`) — светло-доминантный, сдержанные
  акценты, мягкие reveal, минимум декора.

Общий ритм у всех трёх: **светлая основа + редкие акцентные блоки**, без частого
чёрно-белого (anti-stripe Ф6). **Зависимость готовности:** стиль выносится вариантом,
только если его примитивы/recipe `ready` в библиотеке. Не обеспечен (напр. Vivid/
Cinematic ещё не зарегистрированы) → вариант `blocked-style`, примитивы — в
`visual-layer-forge` (§7.2) до сборки. Стиль локально в обход библиотеки не лепить.

### Ф7 — Gap Routing
Если готового ассета нет — **не лепить локально**, маршрутизировать (§7 ниже).
Собрать список component-gaps и visual-layer-gaps. Если forge нужен user-approval —
поставить страницу в `waiting-for-gap-approval`, сохранить resume packet, стоп.

### ⛔ DESIGN REVIEW GATE (user)
Собрать план (§8) — **по одному visual-варианту на каждый выбранный стиль** (общие
Reconstruction/content; различаются Visual composition + recipe anchor) — показать
варианты рядом и **остановиться**. User **выбирает ОДИН стиль** (`стиль 1/2/3` или
название) — это и есть approve. Реализуется (Ф8) только выбранный вариант; остальные
не пишутся. Application code — только после явного выбора / `подтверждаю` / `реализуй` /
`approved`. Состояние → `waiting-for-approval`; выбранный стиль → `page_run.selected_style`.

### Ф8 — Frontend Implementation
После approve — `multi-platform-apps-frontend-developer`: обновляет существующую
`page.tsx`; вставляет новые тексты; использует готовые library sections + только
доступные exports/props/slots/versions; сохраняет полезные существующие элементы,
если не конфликтуют; подключает утверждённые backgrounds/transitions/motion; монтирует
`<ScrollFX/>` (после `<Footer/>`), движение через `data-*`. **Не** создаёт палитру/
runtime/зависимости; **не** правит другие страницы; **не** редактирует manifests;
**не** редизайнит reusable-компоненты. Невозможно без нарушения контракта → стоп с
`design-conflict`. Состояние → `implementation`.

### Ф9 — Full-page QA (+ fix loop ≤3)
Поднять preview `web` (3005) — разрешение дано approve гейта (§8) либо использовать
уже запущенный сервер; иначе спросить. Проверить **всю страницу целиком** на ширинах
`1440 / 1280 / 768 / 375` (§9). Read-only параллельно: `ui-visual-validator`,
`accessibility-expert`, `comprehensive-review-code-reviewer`. Учитывать gotcha
(memory `section-lab-preview-scroll-gotcha`): в headless preview скролл может
сбрасываться в 0 — mid-page блоки проверять `preview_inspect`/`preview_eval`/
canvas-сэмплингом. Fail → fix loop тому же writer'у (только проваленное, без
расширения scope), **≤3**; после 3 → `blocked-after-three-fix-cycles`. Состояние →
`QA` / `fixing`.

### Ф10 — Final UI/UX review
Оркестратор снова зовёт `ui-ux-pro-max` по **реализованной** странице (цельность ·
ритм · композиция · light/soft/ink sequence · соседство · переходы · иерархия ·
плотность · mobile · лишний декор · conversion flow). **≤1** correction loop тому же
writer'у. Новых секций reviewer не создаёт. Состояние → `final-review` → `completed`.

---

## 6. Full-page QA — обязательные проверки (Ф9)

Ширины `1440 / 1280 / 768 / 375`. Проверить:

- route открывается; console errors = 0;
- **весь контент брифа присутствует**; порядок обязательных секций сохранён;
- header/footer работают; `<ScrollFX/>` смонтирован (иначе `data-reveal` → пустые секции);
- surfaces корректны; backgrounds корректны; переходы хорошо работают в соседних парах;
  motion не конфликтует; `prefers-reduced-motion` тих (контент виден, не спрятан за `.is-current`);
- **anti-stripe вживую:** страница читается как одна гармоничная арка, а не «зебра»
  light↔ink↔light↔ink; `ink` ≤2 (или recipe `cinematic-break`); нет `A·B·A·B` пробега
  ≥4; каждый чёрно-белый переход намеренный (направленный `ready`-transition, не голый
  hard-cut); `stripe_check.verdict: harmonious` подтверждён на скриншотах;
- text contrast; z-index; clipping; pointer events;
- **page-level horizontal overflow = 0** (`scrollWidth <= clientWidth` на всех ширинах);
  intentional horizontal scroll изолирован внутри своего контейнера;
- длинный и короткий контент; mobile rhythm; CTA и внутренние ссылки;
- визуальная цельность; соответствие component contracts;
- **нет незарегистрированных локальных копий library-ассетов**.

---

## 7. Gap Router (детали)

### 7.1 Component / primitive gap → forge (по типу)
Отсутствует секция/архетип/slot/API — **или** атом/каркас для сборки по частям.
Маршрутизировать **по типу**:

- **секция / архетип / slot целой секции** → `component-forge`;
- **атом (L3) / каркас `_layout.tsx` (L4)** → **`primitive-layer-forge`** (он же
  переключает `compose_mode` → `atoms-and-layouts`).

```yaml
component_gap:
  page: ; section: ; purpose: ; current_match:
  missing_capability:        # archetype | slot | prop | export   → component-forge
                             # atom | layout-shell                → primitive-layer-forge
  required_props: ; required_slots:
  responsive_constraints: ; motion_constraints:
```

Поток (section): `component-forge → implementation → QA → forge-index →
component-library-preparer incremental → ready library ID → вернуться`.
Поток (atom/layout): `primitive-layer-forge → implementation (visual parity) → QA →
component-library-preparer incremental → ready export + compose_mode flip → вернуться`.

### 7.2 Visual-layer gap → `visual-layer-forge`
Отсутствует background / transition / motion.

```yaml
visual_layer_gap:
  page: ; type: background|transition|motion ; purpose: ; section_context:
  from_surface: ; to_surface:
  required_behavior: ; responsive_constraints:
```

Поток: `visual-layer-forge → design → implementation → visual QA →
component-library-preparer incremental → ready library ID → вернуться`.

**Gap должен быть reusable** — не заказывать forge под одну страницу, кроме явно
подтверждённой уникальной сцены. Если forge требует user-approval — страница в
`waiting-for-gap-approval`, сохранить resume packet, при resume перепроверить
readiness новых ассетов в манифестах.

---

## 8. Design Review Gate — единый план (формат)

```markdown
## Page Composer Plan — <route>

### Target
- Document: · Route: · Existing page: <existing|missing> · compose_mode: <…>
- Brief variant conflict: <none | base+_new>

### Required sections
| # | Purpose | Content source | Current section | Proposed library section |

### Reconstruction
| Section | Strategy | Props/slot/version | Gap |

### Page composition
| Section | Scale | Density | Visual role |

### Visual composition  — ⟲ повторяется на КАЖДЫЙ выбранный стиль (Cinematic Ink / Vivid Blocks / Calm Editorial)
- **Style variant:** <cinematic-ink | vivid-blocks | calm-editorial> (+ `blocked-style`, если примитивы не `ready`)
- **Recipe anchor (L15):** <recipe-id | none(+reason)>
- **Surface sequence:** light·soft·light·ink·soft·light·ink
- **Arc:** calm-build → one cinematic peak → quiet close
- **stripe_check:** ink_count ≤2 · longest A·B·A·B run <4 · hard-cuts intentional → `harmonious`

| Section | Surface | Background (ready) | Transition (ready, directional) | Motion (ready) |

### Optional visual pauses
- …

### Gaps
- component gaps (→ component-forge): …
- visual-layer gaps (→ visual-layer-forge): …

### Files expected to change
- web/src/app/<route>/page.tsx · (+ nav/globals.css по необходимости)

### Validation plan
- widths 1440/1280/768/375 · console=0 · overflow=0 · reduced-motion · content complete
```

После этого **стоп**. Не писать application code до явного
`подтверждаю` / `реализуй` / `продолжай` / `approved`. Обязательный draft-first gate.

---

## 9. Режимы запуска

### Одна страница / по документу
`/page-composer <route>` | `/page-composer <document-path>` — полный pipeline §5 с
гейтом. **Даже если route задан — на Ф0.5 всё равно спросить, в каком стиле** (один/
несколько/все три); по умолчанию три варианта.

### Resume
`/page-composer "resume <route>"` — для страницы в `waiting-for-gap-approval`:
загрузить resume packet (`.claude/runs/page-composer/<run-id>/resume-packet.json`),
перепроверить readiness новых library-ассетов, продолжить с места.

### Audit only
`/page-composer "audit <route>"` — только Ф0–Ф7 (resolve → анализ → план), **без
implementation даже после стандартного flow**. Выдать план §8 как отчёт.

### Пустой вызов
`/page-composer` — показать доступные брифы `wiki/product/*.md` (с route из
frontmatter), спросить **какую страницу** И **в каком стиле** (Ф0.5 — Cinematic Ink /
Vivid Blocks / Calm Editorial, multiSelect, дефолт три) одним `AskUserQuestion`-раундом.
**Никакого batch.**

---

## 10. Состояние запуска

`.claude/runs/page-composer/<run-id>/` (конвенция как у `component-forge-batch`;
новую папку не выдумывать). `<run-id>` = `<YYYYMMDD-HHMM>-<route-slug>`.

```text
state.json · events.jsonl · resume-packet.json (при gap-pause) · final-report.md
```

```yaml
page_run:
  route: ; document: ; page_source:
  styles: [ ]                  # выбранные на Ф0.5 (cinematic-ink|vivid-blocks|calm-editorial)
  selected_style:              # выбранный user'ом на гейте (один)
  phase: ; status:
  compose_mode:
  required_sections: ; selected_components: ; selected_visual_layers:
  pending_gaps: ; completed_gaps:
  approval: ; implementation: ; QA:
  updated_at:                # timestamp передаётся снаружи; не генерировать дату в скрипте
```

Статусы: `audit · waiting-for-approval · waiting-for-gap-approval · implementation ·
QA · final-review · completed · blocked`. Блокеры: `design-conflict ·
blocked-after-three-fix-cycles · blocked-design-review · gap-unapproved · blocked-style`
(`blocked-style` — выбранный стиль не обеспечен `ready`-примитивами; вариант не
выносится, примитивы уходят в `visual-layer-forge`).

---

## 11. Финальный отчёт

```markdown
## Page composed — <route>

### Target
- Document: · Route: · Page: · compose_mode:

### Sections (order preserved)
| # | Purpose | Strategy | Component/local | Surface | Transition | Motion |

### Content fidelity
- all brief sections present: · facts unchanged: · open questions: …

### Gaps routed
- component-forge: … · visual-layer-forge: … · registered ready IDs: …

### QA
- widths 1440/1280/768/375: · console: 0 · overflow: 0 · reduced-motion: · a11y: · screenshots: …
- fix cycles: <n>/3

### Files changed
- web/src/app/<route>/page.tsx · …

### Actions not performed
- no application code beyond approved plan · no page rebuild without permission
- no manifest hand-edit · no other pages changed · no commit · no push · no PR · no deploy
```

---

## 12. Связь с build-pages

`build-pages` остаётся **batch**-инструментом (несколько страниц, автономно, коммит на
страницу, без пофазовых гейтов). `page-composer`:

```text
одна страница · глубокая реконструкция · component library matching · visual composition
· gap routing · resume · full-page visual QA · draft-first gate
```

Общую полезную логику (продуктовый бриф `_page-template.md`, `page-design-patterns.md`,
`<ScrollFX/>`/`data-*`, `.media-ph`) **переиспользовать ссылкой**, не дублировать и не
переписывать `build-pages`. Циклической зависимости не вводить.

---

## 13. Рейлы оркестратора (нерушимо)

- Одна страница за запуск; не batch; не запускать параллельную сборку нескольких.
- Сохранять все обязательные секции, смысл, факты, порядок (§1); визуальная пауза ≠ секция.
- Матчить **только `ready`**; уважать `compose_mode` (§3); недостающее → forge, не локально.
- **Anti-stripe (нерушимо):** страница — гармоничная арка, не «зебра». Якорь на `ready`
  recipe (L15); `ink` ≤2; нет `A·B·A·B` пробега ≥4; переходы направленные, не голый
  black↔white cut; `ui-ux-pro-max` подписывает глобальный ритм до гейта (Ф6) и после (Ф10).
- Манифесты руками не править — регистрация через `component-library-preparer` incremental.
- Агенту — task packet, не весь чат; vendor-агенты `wshobson/` не менять.
- Сервер/браузер — только Ф9; `pnpm build` — с разрешения; pnpm, порт 3005.
- Стоп на Design Review Gate до явного решения; `.env*`/другие страницы не трогать.
- Не commit/push/PR/deploy. Не заменять документацию chat-memory.

## 14. Связанные
[component-library-preparer](../component-library-preparer/SKILL.md) (источник `ready`-инвентаря, регистрация) ·
[component-forge](../component-forge/SKILL.md) (секции/каркасы/API — component gaps) ·
[visual-layer-forge](../visual-layer-forge/SKILL.md) (фоны/переходы/motion — visual gaps) ·
[build-pages](../build-pages/SKILL.md) (batch-сборка; не переписывать) ·
[evallense-site](../evallense-site/SKILL.md) (брифы `wiki/product/*.md`).
Опора: `wiki/architecture/page-design-patterns.md` · `section-types.md` ·
`design-system.md` · `component-library.md` · `wiki/product/_page-template.md` · `sitemap.md`.
