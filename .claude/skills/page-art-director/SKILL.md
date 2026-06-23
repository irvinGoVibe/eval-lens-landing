---
name: page-art-director
description: "ОРКЕСТРАТОР-дирижёр КОМПЛЕКСНОГО арт-дирекшна ВСЕЙ страницы EvalLense из уже готовых секций: решает, какая секция light/dark и как цвета читаются между собой (цвет = связь блоков), проектирует Apple-style анимацию заголовков (падение сверху) и НЕпрямые переходы чёрное↔белое из разрешённой палитры приёмов (сквозной фон с pin-флипом /dev/parallax-spike · переходные блоки · видеопереходы) — ЗАПРЕЩЕНЫ только градиентные мостики. Делает это через КОНКУРЕНЦИЮ двух дизайнеров разными движками — Дизайнер A (scroll-директор) берёт Skill `scroll-experience`, Дизайнер B (UX) берёт Skill `ui-ux-pro-max` — затем СУДЬЯ (design-system-architect + ui-visual-validator) выбирает/синтезирует один арт-дирекшн → передача на ВЁРСТКУ (боевой TSX) → финальное ревью стыков с fix-loop. Конкурентный слой НАД page-skin (цвет/surface) и page-motion (переходы/анимация): переиспользует их правила и пишет их state, а не дублирует. Сам application-код не пишет. Контент/структура/порядок секций — неизменяемый инвариант. Одна страница за вызов. Запуск: /page-art-director \"<route>\". Триггеры — /page-art-director, «сделай комплексный дизайн страницы», «реши какие секции тёмные/светлые», «арт-дирекшн всей страницы», «scroll-директор + UX на страницу», «анимация заголовков Apple-style + переходы»."
metadata:
  version: 1.0.0
  role: orchestrator
  product: EvalLense
  scope: whole-page
  layer: art-direction
  competes_with_engines: [scroll-experience, ui-ux-pro-max]
  feeds: [page-skin, page-motion]
  routes_to: [visual-layer-forge, component-library-preparer]
---

# page-art-director — арт-дирекшн всей страницы через конкуренцию двух дизайнеров

Ты — **дирижёр комплексного арт-дирекшна**. **Сам application-код не пишешь.** Берёшь
**одну страницу из уже готовых секций** и решаешь её как **единое цветовое и моушн-
произведение**: какая секция light/dark, как поверхности **читаются между собой**
(цвет = связь блоков), **Apple-style** анимацию заголовков (падение/проявление
сверху) и **непрямые** переходы чёрное↔белое на стыках. Делаешь это через
**конкуренцию двух дизайнеров разными движками**, **судья** выбирает один арт-дирекшн,
дальше **вёрстка** боевого TSX и **ревью стыков** с fix-loop. Держишь фазы и **два
user-гейта**.

Запуск: **`/page-art-director "<route>"`** (например `/page-art-director "/"` для
лендинга). **Одна страница за вызов.** Рабочий диалог — **на русском**; UI-копия в
коде — на английском (язык сайта), если не попросили иначе.

> **Место в экосистеме.** Это **конкурентный слой НАД** расслоённой сборкой
> `page-skeleton → page-skin → page-motion`. Структуру (skeleton) он **не трогает** —
> секции уже готовы. Он принимает решения, которые обычно принимают одиночные фазы:
> вместо одного `ui-ux-pro-max`-signoff на surface-арку (`page-skin` Ф1) и одного
> прохода motion-композиции (`page-motion` Ф1) — здесь **два дизайнера соревнуются и
> судья выбирает**. Реализация и QA **переиспользуют правила** `page-skin`
> (цвет/surface) и `page-motion` (переходы/анимация) и **пишут их общий state**
> (`page-build/<run-id>/state.json`), чтобы результат был совместим и итерируем теми
> же проходами. Это **не** новый параллельный стек и **не** `design-jam` (тот — один
> блок). Если нужно лишь иначе раскрасить или иначе развести переходы без конкуренции —
> это `page-skin` / `page-motion` напрямую.

---

## Инвариант (нерушимо)

- **Контент и структура — неизменяемы.** Секции, их состав, порядок и тексты — те же
  (`kb/contract-lock`, `skeleton.locked`). Этот скилл меняет **только цвет/поверхности,
  переходы и анимацию**. Обнаружил структурную проблему → стоп, вернуть в
  `page-skeleton`/`page-composer`, не править здесь.
- **Дизайн-система EvalLense — единственный source of truth.** Токены, поверхности
  (`light`/`soft`/`ink`), liquid-glass (общая группа в `globals.css`), типографика.
  Бренд-цвет — **только наши токены** (`--violet`/`--cyan`/`--violet-2`/`--dsc-*`/
  surfaces), никаких приближённых хексов и не-DS палитр. Бандл DS —
  `.claude/designs/evallense/`, ориентир — `interface-style-guide.html`, dark —
  `.claude/designs/dark-themes/design-council.md`.
- **Light ≡ Dark по геометрии** — тема/стиль меняют **только цвет**, раскладка та же
  (`kb/surface-invariant`, `SectionFrame`: *«light ≡ ink, only colour flips»*).
- **Движение — через движок проекта, не новый runtime.** Home — `ScrollOrchestrator`
  (единый rAF, **не** дробить на per-section `useEffect` — CLAUDE.md). Внутренние
  страницы — `<ScrollFX/>` + `data-reveal`/`data-scrub`/`data-pin`. Новый
  animation-runtime/зависимость не вводить без согласования (`gsap` сейчас **не**
  зависимость рантайма страницы — `scroll-experience`/GSAP используется как **движок
  идей**, реализация конформится к движку проекта).
- **Переход чёрное↔белое — НЕпрямой, из разрешённой палитры** (см. §⚖️; дизайнеры
  конкурируют, судья выбирает): (A) сквозной фон с pin-флипом (`/dev/parallax-spike`),
  (B) переходный блок (`tr-masked-divider`/`tr-lens-seam`/`tr-pattern-dissolve`/
  `tr-glow-crossover` из `ready` visual-layer), (C) видеопереход (переходный блок с
  видео, через `media-curator`). Где переход не нужен — **прямой стык** (direct seam).
- **🚫 Единственный запрет — градиентные мостики:** `tr-gradient-bridge` и голый
  inline-градиент на стыке секций (`no-gradient-section-transitions`). Переходные блоки
  и видеопереходы — **разрешены** (подтверждено пользователем 2026-06-23).

---

## ⚖️ Палитра переходов чёрное↔белое (конкурс; запрещены только градиентные мостики)

Переход чёрное↔белое — **непрямой**. Дизайнеры **конкурируют** за приём из
**разрешённой палитры**, судья выбирает (Ф3). Каждый стык light↔ink может получить свой
приём, но язык переходов на странице должен быть **консистентным** (не зоопарк).

**✅ A. Сквозной фон с pin-флипом — механика `/dev/parallax-spike`** (формализация
`approved-section-bg-gradient-flip`; **дефолтный безопасный приём** для главного
light→ink разворота):
- два **fixed full-viewport** слоя за прозрачными секциями: light = точный hero-градиент
  (`.lab-hero__bg`), dark = его **реверс в ink** (`.lab-hero.ink`, угол 132°→312°) поверх;
- флип ведёт **первый в DOM** `[data-pin]`-драйвер (`--pin = clamp01(-rect.top /
  (height - vh))`, на scrollY=0 = **ровно 0** → старт полностью light); трек ~2× viewport
  → `--pin` 0→1 за ~один экран, дальше ScrollFX клампит в 1 (**HOLD dark**);
- dark-слой — **child** pin-секции, наследует `--pin` через CSS-каскад даже будучи
  `position:fixed`; `opacity:var(--pin)` — crossfade; секции **прозрачны** → фон
  непрерывен, **без шва**; текст перекрашивается (`.px-on-dark`);
  `prefers-reduced-motion` → dark-слой opaque, reveal'ы сразу;
- эталон — `web/src/app/dev/parallax-spike/page.tsx` (+ `.css`); пики тёмного —
  тональная база (`--ink-grad`, cool-violet→black), не плоский near-black
  (`dark-gradient-tonal-base`).

**✅ B. Переходный блок** — отдельный вставной визуальный мостик на стыке (не контентная
секция): `ready` `tr-*` из visual-layer — `tr-masked-divider`(+`--diagonal`/`--dome`) ·
`tr-lens-seam`(+`--strong`) · `tr-pattern-dissolve`(+`--lines`) · `tr-glow-crossover` ·
`tr-hard-cut` (только осознанный statement). `data-from`/`data-to` = surfaces соседних
секций. Нужного приёма/направления нет в `ready` → **gap в `visual-layer-forge`**, не
изобретать руками.

**✅ C. Видеопереход** — переходный блок с видео (loop / scroll-scrubbed) на смене
light↔ink. Требует **реального ассета** через `media-curator` (строгий `media-brief`,
Ф4B); poster + light/dark + desktop/mobile + `prefers-reduced-motion` (постер вместо
проигрывания). Ассета нет → **fallback на A или B**, фиксируем prerequisite.

**🚫 Единственный запрет (`no-gradient-section-transitions`):** градиентные мостики
между секциями — `tr-gradient-bridge` и голый inline-градиент на стыке. Переходные
блоки (B) и видеопереходы (C) — **разрешены** (подтверждено пользователем 2026-06-23).
Где переход не нужен — **прямой стык** (direct seam), не градиент.

---

## Работники

Два класса участников — **движки-Skill** (исполняются оркестратором в главном потоке)
и **агенты-сабагенты** (через Agent tool).

**Дизайн-движки (Skill, вызывает оркестратор сам, последовательно):**
- **Дизайнер A — scroll-директор, Skill `scroll-experience`.** Ведёт **scroll-
  драматургию всей страницы**: Apple-style анимация заголовков (падение/проявление
  сверху, stagger, completes-before-exit), pin/scrub, кинематографичные переходы
  чёрное↔белое, ритм движения по странице. Выдаёт **choreography-spec** (исследование
  направления), реализуемый движком проекта (`ScrollOrchestrator` home / `<ScrollFX/>`
  internal), **не** финальный код и **не** GSAP-рантайм.
- **Дизайнер B — UX, Skill `ui-ux-pro-max`** (`ui-ux-pro-max:ui-ux-pro-max`). Ведёт
  **цветовую/surface-драматургию и UX**: какая секция light/soft/ink, anti-stripe-арка
  (цвет = связь блоков, не «зебра»), контраст текста на всех поверхностях, типографи-
  ческий строй, иерархия, responsive, состояния, anti-patterns. Для типографики —
  `--domain typography`.

> **⚠️ Техническое ограничение.** Skill исполняется **только в главном потоке** —
> сабагент Skill вызвать не может. Два движка запускаются **последовательно**;
> «параллельность» = их **независимость**: Дизайнер B брифуется **нейтрально**, без
> показа заявки A. Дебаты/судейство — отдельная фаза **после** обеих заявок.

> **🚫 Deny-list для `ui-ux-pro-max`** (`kb/ui-ux-pro-max-review`): запрещено
> генерировать новую DS/палитру/шрифты/токены, `--design-system`/`--persist`/`MASTER.md`.
> Он — advisory по **нашему** DS. Не установлен → фиксируем prerequisite, шаг
> пропускаем с пометкой. Аналогично `scroll-experience` не установлен → Дизайнер A
> работает по принципам §«Принципы движения» (page-motion §2) с пометкой prerequisite.

**Агенты-сабагенты (только подтверждённые `name:`):**
- **Судья:** `design-system-architect` (ведущий) + `ui-visual-validator` — оценивают
  **обе** заявки, выбирают победителя / задают синтез (Ф3).
- **Вёрстка:** `multi-platform-apps-frontend-developer` — пишет боевой TSX.
- **Ревью стыков (Ф7):** `design-system-architect` + `ui-visual-validator`;
  `accessibility-expert` — reduced-motion/контраст/focus.
- **Медиа (только если выбран видеопереход, приём C):** `media-curator` по строгому
  `media-brief` (Ф4B). Сам арт-дирекшн ассеты не выбирает; pin-флип (A) и `tr-*`-блоки
  (B) — чистый CSS, медиа не требуют.

## Базы знаний (переиспользуем, не дублируем)

Rule-cards — `../component-forge/kb/`. Оркестратор **дословно вставляет** нужные карты
в task packet работнику. Surface-арки/anti-stripe/стиль-якоря — `page-composer` §Ф6 и
§Ф6-styles + `page-skin` §2. Принципы переходов/движения — `page-motion` §2. Конвенции
вёрстки — `../redraw-block/references/`.

- Инжект движкам/судье: `contract-lock`, `surface-invariant`, `theme-typography-geometry`,
  `surface-to-action`, `token-binding`, `glass-rule`, `typography-contract`,
  `background-strategy`, `motion-correctness`, `overflow-discipline`, `a11y-baseline`,
  `copy-voice`; для B — `ui-ux-pro-max-review`.
- Инжект вёрстке: `prop-component`, `motion-wiring`, `media-placeholder`, `demo-media`
  + всё выше + правила `page-skin` §1 (цвет) и `page-motion` §1 (переходы/motion).
- Состояния/гейты — `kb/process-states`. Шаблон пакета — `kb/task-packets`.

**Next16 Lightning CSS gotchas (критично):** сырые `oklab()`/`oklch()` в стопах
градиентов молча рушат CSS → стопы **hex/rgb** (`next16-lightningcss-drops-raw-oklab`);
`backdrop-filter` — только unprefixed + **unitless** `saturate()`
(`next16-lightningcss-drops-backdrop-filter`).

---

## Pipeline (одна страница)

```
Ф0 Discovery (route → секции, текущие surfaces, заголовки-кандидаты, стыки)
→ Ф1 Contract Lock (секции/порядок/контент = инвариант; темы геометрия-parity)
→ Ф2 Independent Proposals (A: scroll-experience ∥ B: ui-ux-pro-max — независимо,
     каждый = ПОЛНЫЙ арт-дирекшн: цвет + heading-motion + приём(ы) перехода из палитры §⚖️)
→ Ф3 Judge (design-system-architect + ui-visual-validator: выбор/синтез + причины,
     в т.ч. выбор приёма перехода на каждый стык; проверка «нет градиентного мостика»)
→ Ф4 Synthesis (ОДИН арт-дирекшн-бриф: surface_sequence + переходы (A/B/C по стыкам)
     + heading-motion + ambient + Designer Self-Check) [+ Ф4B media-brief, если выбран C]
→ ⛔ Gate A (user) → Ф5 Вёрстка (frontend → боевой TSX, по правилам page-skin+page-motion)
→ Ф6 Render QA (build + live, light/dark, responsive, reduced-motion) [по разрешению]
→ Ф7 Ревью стыков (design-system-architect + ui-visual-validator + accessibility-expert)
→ Fix Loop (≤3) → ⛔ Gate B (user) → Final Report
```

Стадия за гейтом **не стартует автоматически** (`kb/process-states`).

### Ф0 — Discovery (оркестратор, ничего не менять)
Зарезолвить `route` → найти существующую `web/src/app/<route>/page.tsx`. Собрать:
**список секций и порядок** (это инвариант); **текущие поверхности** каждой секции;
**заголовки-кандидаты** на Apple-style анимацию (h1/секционные h2); **стыки** между
секциями (для переходов); тема страницы (home — `ScrollOrchestrator`; internal —
`<ScrollFX/>`); есть ли уже медиа-ассеты. Определить `run-id` (или переиспользовать
существующий `page-build/<run-id>` для этого route). **scope = одна страница.**

### Ф1 — Contract Lock (оркестратор)
Выписать инвариант (`kb/contract-lock`): секции · порядок · тексты заголовков/CTA ·
тип каждой секции. Зафиксировать `skeleton.locked = true` (структура готова). Это —
нерушимая рамка для **обоих** дизайнеров: они меняют цвет/переходы/анимацию, не
структуру/контент.

### Ф2 — Independent Proposals (движки, независимо)
Две **независимые** полные заявки по одной и той же странице и контракту. Каждая
покрывает **весь** арт-дирекшн (не только свою специализацию), но с уклоном движка:

1. **Дизайнер A — `scroll-experience`** (уклон: scroll/cinematic). Брифуешь: задача,
   контракт Ф1, движок проекта (`ScrollOrchestrator`/`<ScrollFX/>`), **палитра переходов
   §⚖️** (A pin-флип / B переходный блок / C видеопереход; запрещён только градиентный
   мостик), light+dark, DS-ограничения. Выход: **choreography-spec** — heading-motion
   (Apple drop: откуда, stagger, длительность, easing, completes_before_exit,
   reduced-motion fallback); **какой приём перехода на каждый стык light↔ink** (где,
   как быстро, на каком scroll-якоре) и почему; surface-арка под драматургию скролла;
   ambient motion.
2. **Дизайнер B — `ui-ux-pro-max`** (уклон: цвет/UX). Брифуешь **нейтрально** (тот же
   контракт, **без** показа заявки A): surface_sequence (какая секция light/soft/ink,
   anti-stripe, цвет=связь), контраст/типографика (`--domain typography`), heading-
   motion с точки зрения UX/иерархии, **приём(ы) перехода** из палитры §⚖️ с точки
   зрения нарратива и читаемости текста на смене фона, responsive, states, anti-patterns.
   Соблюдай deny-list.

Каждая заявка — в **обеих темах** (геометрия идентична), держит контент-инвариант,
выбирает приём(ы) перехода **только из палитры §⚖️** (A/B/C) с обоснованием; градиентные
мостики (`tr-gradient-bridge`/inline-градиент) в заявку не принимаются.

### Ф3 — Judge (выбор / синтез)
Оркестратор отдаёт **обе** заявки судье — `design-system-architect` (ведущий, DS/токены/
тема/surface-арка) + `ui-visual-validator` (визуальная согласованность, anti-stripe,
контраст, motion-читаемость вживую по описанию). Судья:
- оценивает обе по DS + craft-bar + `motion-correctness` + anti-stripe (`page-skin` §2);
- **выбирает приём перехода на каждый стык** из палитры §⚖️ (A/B/C — что сильнее по
  нарративу/чистоте/perf), проверяет, что **нигде не протащен градиентный мостик**
  (`tr-gradient-bridge`/inline-градиент), и что язык переходов на странице консистентен;
  для приёма C — что есть/заказан реальный медиа-ассет (иначе fallback);
- честно фиксирует, **что сильнее у A, что у B, что слабо у обоих**, anti-patterns;
- выдаёт **вердикт**: победившая заявка как основа + что **привить** из проигравшей.
Оркестратор сводит вердикт, делит findings на **blocker / major / advisory**.

### Ф4 — Synthesis (один арт-дирекшн)
Оркестратор синтезирует **ОДИН** арт-дирекшн-бриф из вердикта судьи:

```yaml
art_direction:
  theme: light | dark
  style_anchor:                # ready L15 recipe (page-skin §2) | none(+reason)
  surface_sequence: [ ]        # light·soft·ink·… на ВСЕ секции (порядок инвариант)
  per_section:
    - section_id:              # из locked структуры
      surface: light | soft | ink
      brand_accent:            # токен/signature | none
  heading_motion:              # Apple-style
    pattern: drop-in-from-top  # + stagger
    targets: [ ]               # какие заголовки
    duration / easing / stagger:
    completes_before_exit: true
    reduced_motion: "контент виден, эффект выключен"
    engine: ScrollOrchestrator | ScrollFX
  transitions:                 # переходы light↔ink — приёмы ТОЛЬКО из палитры §⚖️
    - seam:                    # from_section → to_section (стык из locked структуры)
      from_surface / to_surface:    # из surface_sequence — НЕ выдумывать
      method: A-pin-flip | B-transition-block | C-video   # NO gradient-bridge
      rationale:               # почему этот приём здесь сильнее
      # A: anchor_section, direction (light→ink|ink→light), speed (~1 viewport),
      #    light_layer ".lab-hero__bg", dark_layer ".lab-hero.ink reversed 312°", ".px-on-dark"
      # B: tr-id (tr-masked-divider|tr-lens-seam|tr-pattern-dissolve|tr-glow-crossover|tr-hard-cut)
      # C: media_brief (см. Ф4B) + poster + light/dark + desktop/mobile + reduced-motion fallback
  direct_seams: [ ]            # стыки БЕЗ перехода — прямые (не градиент)
  ambient:
    - section_id / motion_id / intensity (low|medium|high)
  stripe_check: { ink_count:, longest_ABAB_run:, verdict: harmonious | striped(+fix) }
  rhythm_check: { verdict: harmonious | noisy(+fix) }   # нет >2 high-intensity подряд; пик движения = surface-пик
```

**Designer Self-Check (обязателен до Gate A; не пройден — гейт не показывать):** тот же
контент/секции/порядок; same headings/CTA; Light/Dark geometry parity; ширины текста
стабильны между темами; типографика прошла стресс-матрицу (`typography-contract`);
approved surfaces/button variants (`surface-to-action`); existing tokens, стопы hex/rgb;
**anti-stripe harmonious** (ink ≤2 light / dark-shell сквозной); **rhythm harmonious**;
heading-motion имеет reduced-motion fallback и completes_before_exit; каждый переход —
приём из палитры §⚖️ (A/B/C), **ни одного градиентного мостика**, язык переходов
консистентен; для A — pin-драйвер первый в DOM и на scrollY=0 фон полностью light,
text-recolor покрыт; для B — `tr-id` существует в `ready` (иначе gap зафиксирован); для
C — медиа-ассет есть/заказан + reduced-motion fallback; нет случайного page-overflow
(`overflow-discipline`).

**Ф4B — Media brief (только если выбран приём C — видеопереход).** Сформировать строгий
`media-brief` (роль, light/dark, ratio, desktop/mobile, poster, длительность,
reduced-motion), запустить `media-curator`; ассета нет → переход откатывается на A или B,
фиксируем prerequisite, гейт показываем уже с fallback.

### ⛔ Gate A (user)
Показать: кратко обе заявки (A/B), вердикт судьи, **итоговый арт-дирекшн-бриф**
(surface_sequence + переходы A/B/C по стыкам + heading-motion + ambient) и Designer
Self-Check. **Ждать явного одобрения** перед вёрсткой. Не сошлось за **2 цикла** Ф3↔Ф4 →
`blocked-design-review`, Gate A не показывать.

### Ф5 — Вёрстка (боевой TSX)
Один `multi-platform-apps-frontend-developer` реализует **одобренный** бриф в
**существующую** `page.tsx`, по правилам уже существующих проходов:
- **Цвет/surface** — по правилам `page-skin` §1/§6: назначить секциям `light`/`soft`/
  `ink`, бренд-цвет/recipe/signature **только нашими токенами**; геометрию не двигать;
  dark-тема → тёмный shell на всю страницу (не «зебра»).
- **Переходы** — реализовать **выбранным судьёй приёмом** на каждый стык (по правилам
  `page-motion` §1/§6):
  - **A pin-флип** — по механике `/dev/parallax-spike`: два fixed-слоя (light hero +
    reversed ink) за прозрачными секциями, `[data-pin]`-драйвер первым в DOM,
    `opacity:var(--pin)` crossfade, `.px-on-dark`; эталон
    `web/src/app/dev/parallax-spike/page.tsx` (+ `.css`), адаптировать под реальные
    секции, не копировать дев-текст;
  - **B переходный блок** — `ready` `tr-*` с `data-from`/`data-to` из `surface_sequence`;
    нужного нет → `visual-layer-forge` (gap), не изобретать;
  - **C видеопереход** — переходный блок с одобренным медиа (poster, light/dark,
    desktop/mobile, reduced-motion → постер).
  **🚫 Никаких `tr-gradient-bridge`/inline-градиентов** на стыках; стыки без перехода —
  прямые.
- **Heading-motion (Apple drop)** + ambient — через движок проекта: home —
  `ScrollOrchestrator` (единый rAF, **не** per-section `useEffect`); internal —
  `<ScrollFX/>` + `data-reveal`/`data-scrub`/`data-pin`. `prefers-reduced-motion`
  обязателен: контент виден.
- Glass — только общая liquid-glass группа в `globals.css` (новую поверхность — в
  группу, не локально — `kb/glass-rule`, CLAUDE.md). Импорт — только `@/components/ds`.
- Реализует **только approved** арт-дирекшн; контент/структуру не меняет; новых версий
  не плодит. Верификация — `cd web && pnpm build`.

Записать в общий state `page-build/<run-id>`: `skin.surface_sequence`,
`skin.selected_style`, `skin.theme`, `motion.seams`, `motion.ambient`,
`motion.scrollfx_mounted` — чтобы результат был совместим с `page-skin`/`page-motion`
для дальнейшей точечной итерации.

### Ф6 — Render QA (вживую, по разрешению)
**Только по запросу/с разрешения user** (CLAUDE.md: dev-сервер сам не поднимаем).
Когда разрешено — preview (`name: web`, **порт 3005**), ширины `1440/1280/768/375`:
- структура и контент не изменились (diff = только цвет/переходы/motion);
- **anti-stripe вживую** гармоничен (не «зебра»); контраст текста на всех surfaces;
- **переходы по выбранным приёмам**: A — на scrollY=0 фон полностью light, crossfade
  light→dark за ~1 экран, дальше HOLD dark, текст читаем (`.px-on-dark`); B — `tr-*`
  направлен (`data-from`/`data-to` = фактическим surfaces), читается как замысел; C —
  видео грузится, poster виден до старта, reduced-motion → постер; **ни одного
  градиентного мостика**; стыки без перехода прямые без шва;
- **heading-motion**: Apple drop читается, завершается до ухода, не дёргается;
- **`prefers-reduced-motion` тих**: контент полностью виден; `<ScrollFX/>` смонтирован
  (internal) / `ScrollOrchestrator` активен (home);
- console=0; **horizontal overflow=0** на всех ширинах; CSS-сборка не молчит
  (oklab/backdrop gotchas).
Память-gotchas: `section-lab-preview-scroll-gotcha` (mid-page — `preview_eval`/
`preview_inspect`, не скролл-скрин), `preview-globals-css-stale-cache`
(`rm -rf web/.next` + рестарт).

### Ф7 — Ревью стыков (read-only)
`design-system-architect` (ведущий) + `ui-visual-validator` + `accessibility-expert`
ревьюят **реализованную** страницу. Фокус — **стыки и сквозная согласованность**:
- переходы чёрное↔белое = приёмы из палитры §⚖️ (A/B/C), язык консистентен, **без
  градиентного мостика**; стыки без перехода прямые и читаются как замысел, не баг;
- сквозная цветовая арка (anti-stripe, цвет=связь, без «зебры»);
- heading-motion консистентен по странице (один язык падения, не зоопарк);
- ритм движения (нет >2 high-intensity подряд; пик движения совпадает с surface-пиком);
- соответствие брифу Ф4 и DS (токены/типографика/glass/surface-to-action);
- Light/Dark parity, responsive, reduced-motion, a11y-baseline (контраст/focus).
Findings → **blocker / major / advisory** с точными пунктами.

### Fix Loop (≤3)
Blocker/major → тому же `multi-platform-apps-frontend-developer` **коротким пакетом
только по найденному** (`kb/task-packets`). После фикса — повтор Ф6 (если был) + Ф7.
**Максимум 3 цикла**; не сошлось → `blocked-after-three-fix-cycles`, Gate B не объявляем
«готово».

### ⛔ Gate B (user)
Показать: путь к изменённой `page.tsx`, итог Render QA, вердикт ревью стыков,
остаточные advisory. **Ждать одобрения.** Коммит/пуш/PR — **не** делаем без явной просьбы.

### Final Report
Сводка: страница/route; что взяли от A, что от B (синтез судьи); финальная
surface_sequence + точка(и) pin-флипа + heading-motion; статус сборки; вердикт ревью
стыков; остаточные риски/advisory. Что обновить вручную
(`wiki/architecture/page-design-patterns.md` — при необходимости).

---

## Правки по комментарию (лёгкий режим)
Вызов «route + комментарий» к **уже согласованному** арт-дирекшну → правим **именно
названное** (один стык, одна секция, тайминг heading-motion), новый конкурс не
запускаем. Полный конкурс (два движка + судья) — только когда нужно пересобрать
цвето-моушн-драматургию страницы целиком. Точечная итерация только цвета → `page-skin`;
только переходов/motion → `page-motion`.

## Чего НЕ делает
- Не пишет application-код сам (пишет инженер после Gate A).
- Не меняет структуру/порядок/контент секций (это `page-skeleton`/`page-composer`).
- Не делает несколько страниц пачкой (это `build-pages`).
- Не создаёт новую DS/палитру/токены/шрифты и новый animation-runtime.
- **Не делает градиентные мостики** между секциями (`tr-gradient-bridge`/inline-градиент —
  единственный запрет, `no-gradient-section-transitions`). Переходные блоки и
  видеопереходы — **разрешены** (§⚖️, приёмы B/C).
- Не изобретает `tr-*` руками и не лепит голый inline-переход (gap → `visual-layer-forge`).
- Не коммитит, не пушит, не создаёт PR, не правит порт dev-сервера (3005), не трогает `.env*`.
- Не объявляет «готово» при провалившемся Render QA / ревью без подтверждённого фикса.

## Связанные
[page-skin](../page-skin/SKILL.md) (цвет/surface — правила реализации + state) ·
[page-motion](../page-motion/SKILL.md) (переходы/анимация — правила + словарь `tr-*`) ·
[page-composer](../page-composer/SKILL.md) §Ф6/§Ф6-styles (стиль-якоря, anti-stripe) ·
[page-skeleton](../page-skeleton/SKILL.md) (структура — источник locked-секций) ·
[design-jam](../design-jam/SKILL.md) (тот же приём конкуренции движков, но один блок) ·
[visual-layer-forge](../visual-layer-forge/SKILL.md) (переходы/recipes — visual gaps).
Движки: `scroll-experience` (Дизайнер A) · `ui-ux-pro-max` (Дизайнер B).
Источник истины dark: `.claude/designs/dark-themes/design-council.md`.
