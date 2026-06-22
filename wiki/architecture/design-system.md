---
title: Design System
status: generated
version: 1.4
updated: 2026-06-22
source: DS-бандл .claude/designs/evallense/ (DesignSync, синк 2026-06-18) + web/src/app/globals.css (канон, вкл. `.ds` scope + `--dsc-*` + барель `@/components/ds`) + AI Jury / design / EvalLense-Interface-Style-Guide.html (v1.2)
---

# Design System

← [[index|Wiki]]

Дизайн-система EvalLense — единый язык интерфейса. **Внутренние страницы сайта
строятся на этих же токенах**, чтобы лендинг и продукт читались как одно целое.

> Этот файл — опорный референс для агентов и разработчиков при создании
> внутренних страниц (`web/`). Не выдумывать новые цвета, тени, радиусы и шрифты:
> брать из таблиц ниже. Токены уже заведены в
> [web/src/app/globals.css](web/src/app/globals.css) (`:root` + `@theme inline`).

## Источник истины и синхронизация

Сейчас у системы три согласованных слоя; значения в таблицах ниже сверены по
всем трём (v1.3):

1. **DS-бандл** — `.claude/designs/evallense/` (синхронизирован через **DesignSync**,
   project `daa67aa0-d912-4b21-9cad-25d83508a3a7`, namespace `Evallense_c7d744`,
   синк 2026-06-18). Содержит токены (`tokens/*.css`), компоненты (Button · Chip ·
   Eyebrow · Tile · Heading · MediaPlaceholder), гайдлайны и `conventions.md`.
   Каждый токен-файл помечен `Source of truth: web/src/app/globals.css` — бандл
   **извлечён из кода**, а не наоборот.
2. **`globals.css`** — [web/src/app/globals.css](web/src/app/globals.css) `:root`
   + `@theme inline`. То, что реально применяется на живом сайте. Канон.
3. **Стайл-гайд продукта** — `EvalLense — Interface Style Guide` (v1.2, внешний
   HTML). Концептуальный референс: принципы, продуктовые компоненты, паттерны
   решения/доверия. Часть продуктовых компонентов ещё не имеет React-реализации
   в `web/` (см. «Открытые вопросы»).

При расхождении приоритет: **`globals.css` = бандл** (они должны совпадать;
бандл ресинкается из кода через `.ds-sync/resync.mjs`) → затем стайл-гайд.

> **Sync-чек (v1.2 → v1.3).** При этой синхронизации исправлены значения,
> разъехавшиеся с кодом: `--ink` `#0a0a0d` → **`#000000`** (а `#0a0a0d` стал
> `--panel`); `--muted-2` `#86868b` → **`#76767f`**. Добавлены отсутствовавшие
> в доке токены `--bg-ink`, `--body-on-dark`, `--tag-tint`, две dark-темы
> (Ink Refined · Nebula Deep) и API DS-компонентов бандла (`.ds-btn-*`).

## Принципы

Шесть правил, которым подчиняется любой экран:

1. **Lens clarity.** Свести шум к одному ясному, подтверждённому сигналу.
   Пробелы и тихая структура важнее декора.
2. **AI prepares, humans decide.** Финальное решение всегда за человеком; вывод
   AI — рекомендательный (advisory).
3. **Evidence over opinion.** Показываем что нашли, откуда и чего не хватает —
   никогда «голую» оценку.
4. **Subtle layering.** Мастерство невидимо: мягкая фиолетовая глубина,
   hairline-границы, шёпотная тень.
5. **One accent, with meaning.** Фиолетовый ведёт действие; lens-градиент метит
   «сигнал» продукта; цвет всегда что-то значит.
6. **Calm motion.** Easing на замедление, без отскока. Reveal'ы, ведомые
   скроллом, следуют за читателем.

## Цвет

Нейтральная Apple-база строит структуру; цвет — коммуникация. Поверхности живут
на одном тоне и сдвигаются только по светлоте. Lens-градиент зарезервирован под
сигнал продукта (оценки, ключевые метрики, знак), а **не** под фон.

### Нейтральная основа

| Токен | HEX | Назначение |
|---|---|---|
| `--bg` | `#ffffff` | основной фон |
| `--bg-soft` | `#f5f5f7` | мягкий фон, inset-поля |
| `--bg-ink` | `#000000` | канвас страницы (overscroll-полоса, фон `<html>`) |
| `--ink` | `#000000` | тёмные statement-поверхности (истинный ink-чёрный) |
| `--panel` | `#0a0a0d` | тёмная панель (на 1 ступень светлее ink) |
| `--panel-2` | `#121218` | тёмная панель (на 2 ступени светлее ink) |
| `--fg` | `#1d1d1f` | основной текст |
| `--muted` | `#6e6e73` | вторичный текст |
| `--muted-2` | `#76767f` | подписи, mono-лейблы (`.t-sub`) |
| `--border` | `#d2d2d7` | граница по умолчанию |
| `--border-2` | `#e6e6ea` | мягкая граница (карточки, кнопки) |
| `--hairline` | `rgba(20,18,40,.07)` | волосяной разделитель |
| `--fg-on-dark` | `#f5f5f7` | текст на тёмном |
| `--body-on-dark` | `#d8d8de` | body-текст на тёмном (`.t-body`) |
| `--muted-on-dark` | `#a9a9b2` | вторичный текст на тёмном |
| `--border-on-dark` | `rgba(255,255,255,.12)` | акцентная граница на тёмном |
| `--border-on-dark-2` | `rgba(255,255,255,.07)` | граница на тёмном по умолчанию |

> **Иерархия тёмных поверхностей (исправлено в v1.3).** Истинный базовый чёрный —
> `--ink: #000000`. Над ним две ступени панелей: `--panel: #0a0a0d` и
> `--panel-2: #121218`. Ранее в доке `--ink` ошибочно указывался как `#0a0a0d`.

### Lens-акценты (сигнал бренда)

| Токен | HEX | |
|---|---|---|
| `--violet` | `#6c4cf1` | первичное действие, активное состояние |
| `--violet-2` | `#7b5cf6` | hover-вариант фиолетового |
| `--lavender` | `#a99bff` | средняя точка градиента; цвет eyebrow (`.t-eyebrow`) |
| `--cyan` | `#2ec5e8` | точка градиента |
| `--aqua` | `#36e0c2` | финальная точка градиента |
| `--tag-tint` | `#cdbfff` | цвет mono-тегов (`.t-tag`) на светлом |

### Семантика (один смысл на цвет, без декора)

| Токен | HEX | Смысл |
|---|---|---|
| `--green` | `#1aa37a` | ready / approved (одобрение человека) |
| `--amber` | `#e8943a` | attention / incomplete |
| `--amber-ink` | `#8a5414` | читаемый текст-пара для amber-заливок |

Статусы: **зелёный** = готово/одобрено · **янтарь** = внимание/неполно ·
**фиолетовый** = активно/в процессе · **muted** = отсутствует. Каждый статус-чип
ведёт маленькая точка.

### Тёплое семейство (orange) — только для лендинга

`--orange-hot #ff6a2e`, `--orange-core #ff8f4f`, `--orange-soft #ffb27a` и
градиент `--fire` живут в `globals.css` для warm-переходов между секциями
главной (OrangeGlow / MistBridge). **Внутри продуктового UI тёплый градиент не
используется** — только переходы.

### Lens-градиент

```
--lens: linear-gradient(118deg, violet 0% → lavender 32% → cyan 68% → aqua 100%)
```

Зарезервирован под сигнал: оценки, hero-числа, знак, ключевые метрики. Не фон.

## Типографика

Три голоса. SF Pro для всего человеческого, Menlo для всего измеренного. Тип —
это и есть дизайн: вес и трекинг важнее размера.

| Токен | Стек | Роль |
|---|---|---|
| `--font-display` | `-apple-system, "SF Pro Display", …` | заголовки (600, `letter-spacing:-.022em`) |
| `--font-text` | `-apple-system, "SF Pro Text", …` | body (в `globals.css` — `--font-ui`) |
| `--font-mono` | `Menlo, "SF Mono", ui-monospace, …` | числа, лейблы, breadcrumb, споки |

- Заголовки могут рендерить ключевую фразу lens-градиентом (`.grad-t`) для
  акцента.
- Body — `--muted`; mono-лейблы — uppercase с трекингом `.1–.24em`.
- Оценки/числа — mono, gradient, tabular.

## Spacing · Radius · Elevation · Motion

### Spacing — база 4px

Micro `4–8` (icon gaps) · component `12–16` (карточки, кнопки) · section
`24–48` · gutter `clamp(20px, 5vw, 72px)`. Max-ширина контента **1180–1200px**.

### Radius

| Токен | px | Применение |
|---|---|---|
| `--r-xs` | 8 | инпуты, чипы |
| `--r-sm` | 12 | кнопки, контролы |
| `--r-md` | 18 | карточки |
| `--r-lg` | 24 | окна, модалки |
| `--r-pill` | 980 | pill-кнопки, чипы |

(В лендинге карточки/сцены чуть крупнее: `--radius-card:22px`,
`--radius-stage:28px`.)

### Elevation — фиолетовые тени, одна стратегия

| Токен | Назначение |
|---|---|
| `--sh-1` | мягкая (чипы, мелкие карточки) |
| `--sh-2` | средняя (кнопки-pill, окна) |
| `--sh-3` | глубокая (контент-области окон) |

Тени мягкие и фиолетово-подкрашенные — **никогда серый drop-shadow**. На тёмных
поверхностях опираемся на границы, а не на тени.

> `--sh-1/2/3` и `--r-xs/sm/md/lg/pill` заведены в `:root`
> [globals.css](web/src/app/globals.css) (Story 05) на базе
> `rgba(60,40,160,…)`-теней (как `--shadow-soft`) и канонических радиусов
> (8/12/18/24/980px). Их использует продуктовая CMS (`admin.css`).

### Motion

- Easing: `--ease: cubic-bezier(.22,.61,.36,1)` — замедление, без отскока.
- Micro `0.30–0.45s` (hover, toggles) · Layer `0.55–0.80s` (reveals, морфы).
- Демо продукта — scroll-scrubbed: прогресс маппится на позицию скролла.
- В `web/` вся скролл/анимационная оркестрация — в одном
  [ScrollOrchestrator.tsx](web/src/components/ScrollOrchestrator.tsx) (единый
  rAF-цикл), см. [[system|System]].

## Компоненты

Каждый экран собирается из одних и тех же блоков; обработка поверхности
постоянна — одна толщина границы, один набор теней, один радиус.

### DS-бандл (синхронизированные компоненты)

Это компоненты, реально поставляемые DS-бандлом (`.claude/designs/evallense/components/`,
namespace `Evallense_c7d744`). Они self-contained: стилизуются inline-стилями,
читающими CSS-переменные, **без theme-provider** — нужно лишь чтобы был загружен
`styles.css` (он `@import`-ит токены). Утилит-фреймворка нет; layout-glue —
через `var(--token)` и role-классы (`.t-*`, `.surface-*`).

| Компонент | Ключевые пропы |
|---|---|
| `Button` | `variant` (`primary` · `ghost` · `glass` · `dark` · `gradient`), `size` (`md` · `sm`), `arrow`, `href` |
| `Chip` | `checked`, `onDark` |
| `Eyebrow` | `dot`, `onDark` |
| `Heading` | `accent`, `level`, `size`, `onDark`, `align` |
| `Tile` | `eyebrow`, `title`, `titleAccent`, `body`, `surface` (`ink`/`light`), children |
| `MediaPlaceholder` | `ratio`, `label`, `hint`, `onDark` |

Surface-aware: на тёмном передавать `onDark` (Eyebrow/Chip/Heading/MediaPlaceholder)
или `surface="ink"` (Tile). `glass`-Button — общий «liquid glass» материал,
только на тёмных/cinematic-поверхностях.

**CSS-классы бандла** (`tokens/components.css`, зеркало live-сайта):
`.ds-btn` (база, pill, 15px, `padding:11px 20px`) · `.ds-btn-sm` ·
`.ds-btn-primary` (violet) · `.ds-btn-dark` (ink) · `.ds-btn-ghost`
(violet hairline) · `.ds-btn-gradient` (`--grad-cta` + top-sheen + hover-bloom) ·
`.ds-btn-glass` (liquid glass: `blur(44px) saturate(1.9) brightness(1.06)`,
17px, `padding:17px 34px`, `min-height:56px`). Эти классы — копии live-классов
лендинга (`.btn-*`, см. «Реализация на лендинге»), не отдельный набор.

> **Role-классы типографики** (канон в обоих источниках, `globals.css` + бандл):
> `.t-eyebrow` (mono caps, lavender) · `.t-tag` (9.5px mono, tag-tint) ·
> `.t-heading` (display 600, `clamp(34px,5.5vw,60px)`, lens-clip) · `.t-title`
> (display 18px on-dark) · `.t-body` (16px, body-on-dark) · `.t-body-strong`
> (21px) · `.t-sub` (12px, muted-2). Surface-хелперы: `.surface-light` ·
> `.surface-soft` · `.surface-ink` · `.surface-panel`. Lens-текст: `.lens-text`
> / `.fire-text`.

### Продуктовый стайл-гайд

Ниже — продуктовые компоненты из стайл-гайда (v1.2). Часть пока без
React-реализации в `web/` (см. «Открытые вопросы»).

#### Core

- **App window** — рамка любого продуктового экрана: traffic-dots · lens-glyph +
  wordmark · mono-breadcrumb (контекст) · status-pill справа
  (Confidential / Shared). Контент — радиус md/lg, тень `sh-3`.
- **Buttons** — primary violet (`r-sm`); ghost white + `border-2`; pill CTA
  (маркетинг); disabled = canvas-fill + muted-текст. Состояния: hover поднимает
  на −2px, focus — фиолетовое кольцо. См. §«Кнопки» ниже.
- **Inputs** — inset: canvas-fill, `border-2`, радиус xs/sm. Инпут темнее своей
  поверхности — читается как «печатай сюда».
- **Chips & tags** — selectable chip (чекбокс) для опций; signal tag (точка) для
  извлечённых критериев P1–P6.
- **Status chips** — смысл цветом (см. семантику выше).

#### Data & Reporting

Ядро продукта — превращать деки в сравнимые, подтверждённые отчёты.

- **Score + confidence ring** — подпись EvalLense: score (mono, gradient,
  tabular) + conic-кольцо уверенности (green/amber по уровню).
- **Counters / stats** — hero-числа считаются вверх на reveal; позитивные метрики
  градиентом, attention-метрика — сплошным amber.
- **Comparison table** — mono-uppercase шапка · hairline-строки · gradient-score
  · ring на строку; топ-кандидат — мягкий фиолетовый тинт строки.
- **Report panel** — число всегда в паре с источником: breakdown-бары по
  критерию, цитата-evidence со ссылкой на страницу, явные флаги «missing
  evidence».

#### Decision & Trust

Передача от AI к человеку — спроектированный момент.

- **Human-in-the-loop footer** — advisory-полоса (AI, пунктир) передаёт
  human-полосе (named role, нейтральный аватар — **никогда** lens-градиент).
  Segmented-control ставит решение; audit-строка пишет кто и когда. **AI-green
  зарезервирован под одобрение человека** — подчёркивает, кто главный.
- **Pipeline status** — узлы зажигаются вдоль lens-трека по мере обработки:
  Decode → Judges → Summarize → Score → Report.
- **Trust & privacy chips** — приватность заявляется сдержанными mono-чипами;
  без щитов, замков и security-театра.

## Слои и применение (Layout)

Несколько повторяемых раскладок покрывают большинство экранов; max-ширина
1180–1200px:

- **Rail + stage** — ступенчатый rail (active / done / muted) ведёт одну сцену;
  гайдед-воркфлоу.
- **Split — two outputs** — один источник ветвится на две поверхности
  (дашборд организатора + отчёт участника).
- **Bento** — разнокалиберные тайлы для trust/overview: один hero, несколько
  равных.

## Градиентная система

Lens — сигнал бренда, но у него дисциплинированная семья.

| Градиент | Токен | Параметры | Применение |
|---|---|---|---|
| Lens — primary | `--lens` | 118°, violet→lavender→cyan→aqua | оценки, знак, ключевые метрики |
| Lens — soft | `--lens-soft` | 118°, `color-mix` violet/cyan/aqua → transparent | low-glare подложки (`.lens`) |
| Lens — deep | `--lens-deep` | 135°, `#3a1d8f→#1d8f7e` | тёмные поверхности, low-glare |
| Ink — mono | `--ink-grad` | 160°, `#0a0a0d→#1b1b26` | тёмные панели |
| Warm — fire | `--fire` | 118°, `#ffe066→orange-soft→orange-hot→#ff3314` | **только orange-мост между секциями** |
| CTA — filled | `--grad-cta` | 90°, `#9333ea→#3b82f6` (purple→blue) | залитый CTA (gradient-кнопка, footer) |
| Halo (radial) | — | violet over ink | за тёмными statement/hero |
| Mist (radial) | — | low-opacity lens on canvas | фоны секций, лёгкое свечение |

> `--lens-soft` использует `color-mix(in oklab, …)`. Сырые `oklab()`/`oklch()`
> стопы Next 16 Lightning CSS молча выкидывает — стопы задавать hex/rgb (см.
> [[system|System]]).

**Do:** linear-lens на числах/знаке/данных · radial-glow на очень низкой
прозрачности для глубины · deep/ink-варианты на тёмном.
**Avoid:** lens как полный фон контента · warm внутри продуктового UI ·
несколько ярких градиентов на одном экране.

## Тёмные темы

Для focus-режимов и statement-поверхностей. Тот же тон, инвертированная светлота.
В библиотеке зарегистрированы **три** тёмных набора (`page-composer` Ф0.5
спрашивает тему light/dark).

### 1. Ink (база) — нейтральный чёрный

| Роль | Токен | HEX |
|---|---|---|
| Base | `--ink` | `#000000` |
| Panel | `--panel` | `#0a0a0d` |
| Panel 2 | `--panel-2` | `#121218` |
| Text | `--fg-on-dark` | `#f5f5f7` |
| Body | `--body-on-dark` | `#d8d8de` |
| Muted | `--muted-on-dark` | `#a9a9b2` |

### 2. Ink Refined — фиолетово-подкрашенный

То же, что Ink, но body-текст уходит в тёплый фиолетовый оттенок.

| Роль | Токен | HEX |
|---|---|---|
| Body (violet-tinted) | `--fg-secondary-dark` | `#d0ccf4` |

### 3. Nebula Deep — глубокий космический

Отдельная самостоятельная палитра для cinematic-секций.

| Роль | Токен | HEX |
|---|---|---|
| Base | `--nebula-base` | `#0a0509` |
| Layer 1 | `--nebula-layer1` | `#0f0b1c` |
| Layer 2 | `--nebula-layer2` | `#1a1530` |
| Text | `--nebula-fg` | `#f0eeff` |
| Text 2 | `--nebula-fg-2` | `#c8c4f0` |
| Muted | `--nebula-fg-muted` | `#9896b8` |

Границы на тёмном: `--border-on-dark-2` `rgba(255,255,255,.07)` по умолчанию ·
`--border-on-dark` `rgba(255,255,255,.12)` акцент. Семантика десатурируется:
green → `--green-on-dark` `#5fe0bf`, amber → `--amber-on-dark` `#f0a95a`.
Кнопки на тёмном:
violet-primary держит brand-действие; inverted-white для high-emphasis
secondary; ghost = hairline-контур; green остаётся акцентной точкой, **никогда
залитой кнопкой**. Опираться на границы, не на тени.

## Кнопки

Одна система, две поверхности. Violet всегда ведёт первичное действие; остальное
поддерживает.

- **На светлом:** primary violet · ghost white + `border-2` · approved/success
  green (подтверждённые решения) · pill marketing CTA · disabled = canvas-fill +
  muted.
- **На тёмном:** primary держит violet · inverted-white для high-emphasis
  secondary · ghost = hairline-контур · approved остаётся green · disabled =
  бледная заливка.
- **Состояния:** hover −2px + мягкая тень · focus — фиолетовое кольцо ·
  disabled — canvas-fill.
- **Размеры/анатомия:** радиус `sm (12px)` для квадратных, `pill (980px)` для
  CTA · icon-gap 7px · лейбл SF Pro Text 550.

## Реализация на лендинге — паттерны главной (`web/`)

Канон выше — система продукта. Ниже — как она **фактически собрана на главной**
(`web/src/app/page.tsx`: Hero → Problem → OrangeGlow → Workflow → Decisions →
Bento + SiteHeader/Footer). Имена классов — из
[globals.css](web/src/app/globals.css) (legacy-CSS из `index.html`). Внутренние
страницы переиспользуют эти же классы и токены.

### Layout-токены

| Токен | Значение | Применение |
|---|---|---|
| `--maxw` | `1180px` | max-ширина секций (`.site-header__inner`, `.foot .legal`) |
| `--gutter` | `clamp(20px, 5vw, 72px)` | горизонтальные поля секций |
| `--radius-card` | `22px` | generic-карточки (`.tcard`) |
| `--radius-stage` | `28px` | bento-тайлы, крупные сцены |
| `--shadow-soft` | `0 2px 8px …, 0 24px 60px -28px rgba(60,40,160,.22)` | базовая тень на светлом |
| `--ease` | `cubic-bezier(.22,.61,.36,1)` | основной easing везде |

> **Namespaced-дубли.** Секции Workflow и Decisions держат свои копии токенов с
> префиксами `--wf-*` и `--sd-*` (`--wf-green`/`--sd-green` = `#1aa37a`,
> `--wf-amber`/`--sd-amber` = `#e8943a`, `--wf-amber-ink`/`--sd-amber-ink` =
> `#8a5414`, наборы `--wf-r-*`/`--sd-r-*` и `--wf-sh-*`/`--sd-sh-*`). Значения
> совпадают с каноном — это локальная изоляция legacy-CSS, не новая палитра.
> Канонические эквиваленты (`--green`, `--amber`, `--amber-ink`, `--hairline`)
> теперь заведены в `:root` — **новый код берёт их**, а не `--wf-*`/`--sd-*`.

### Кнопки (фактические классы)

- `.btn` — база, pill (980px), 15px, `padding:11px 20px`, `gap:8px`.
- `.btn-primary` — violet-фон, белый текст; hover → `--violet-2` + глубже тень.
- `.btn-ghost` — прозрачный фон, фиолетовый текст, граница (cyan на hover).
- `.btn-glass` — `rgba(255,255,255,.1)` + `backdrop-filter:blur(8px)`, граница
  `rgba(255,255,255,.28)`; для тёмных/hero-поверхностей.
- `.btn-sm` — `padding:8px 15px`, 13.5px.
- **Hero CTA** (`.cta-row .btn`) — 17px, `padding:17px 34px`, `min-height:56px`,
  тяжёлый стеклянный эффект: `backdrop-filter:blur(44px) saturate(1.9)
  brightness(1.06)`, inset-блики, многослойная тень.
- **Header CTA** — 11.5px mono uppercase, `blur(16px) saturate(1.3)`,
  lavender/violet-градиентная подложка.
- Состояния: `:active` → `scale(.97)`; стрелка `.arr` → `translateX(3px)`.

### Навигация

- **SiteHeader** (`.site-header`) — `position:fixed`, `z-index:150`,
  прозрачный над hero; за пределами hero класс `.is-light` переключает
  тему (бренд/ссылки → тёмные). `.site-header__inner` — `max-width:--maxw`,
  flex, `min-height:52px`.
  - `.brand .mark` — кружок 22px с `background:--lens` + inset-кольцо + glow.
  - `.site-header__link` — 12px mono uppercase, `letter-spacing:.16em`,
    lavender → `--fg-on-dark` на hover; `.site-header__accent` — lens-текст с
    подчёркиванием на hover.
- **Footer** (`.foot`) — `background:--bg-soft`, `border-top`, сетка
  `1.4fr repeat(3,1fr)`; `.foot h5` — 12px mono uppercase; `.foot a` muted →
  violet; `.legal` — `max-width:1180px`, flex space-between.

### Прогресс и scroll-driven

- **`.progress`** — `fixed`, `height:2px`, `z-index:200`; `::before` —
  `width:var(--p,0%)`, `background:--lens`, `transition:width .08s`.
  Переменную `--p` (0–100%) пишет ScrollOrchestrator.
- На `.section-orange-glow` ScrollOrchestrator пишет `--glow-p` (0→1, прогресс
  секции) и `--glow-zarya` (рампа intro-halo: 0→1 на p∈[0,.2], 1→0 на p∈[.2,.55]),
  с точностью `toFixed(3)`.

### Чипы, теги, лейблы

- `.eyebrow` — inline-flex, 12px mono uppercase, `letter-spacing:.16em`,
  lavender, ведущая `.dot` 6px с `--lens`.
- `.chip` — pill, 12.5px, граница, ведущая `.tick` 6px `--lens`; на `.ink`
  (dark) — полупрозрачный фон/граница.
- `.mini-tag` — абсолютный mono-лейбл 9.5px uppercase в углу карточки.
- `.seg` (Decisions) — segmented-control pill; `button.on[data-d="approved"]` →
  `--sd-green`, `[data-d="review"]` → `--sd-amber`.

### Карточки и поверхности

- **Bento-тайл** (`.bento-tile`) — `rounded-[28px]`, `bg-black`,
  `ring-1 ring-white/[.08]`; hover → `ring-white/[.14]` + фиолетовый glow
  `0 30px 90px -40px rgba(108,76,241,.55)`; `::before/::after` — conic-градиентный
  edge-shimmer (anim 2.6s/3.6s).
- **Trust-карточка** (`.tcard`) — `--radius-card` (22px), белый фон, hover
  поднимает `-4px` + фиолетовая тень; `.tcard.big` — `span 2×2`, demo с
  пунктирной lens-границей.
- **Problem-карточки** (`.scrub-file`, `.sm`/`.lg`) — тёмные стеклянные
  плитки: `linear-gradient(160deg, rgba(28,24,52,.92)…)`, `blur(8px)`,
  inset-кольцо violet, абсолютно спозиционированы, скролл-скраб.
- **Workflow** — `.setup-card` (белая, `--wf-r-md`, `--wf-sh-2`), `.link-card`
  (появляется на `.done`), `.preview-card` (показывается на stage 3).
- **Decisions** — `.repcard` (грид-карточка отчёта), `.sd-panel` (выезжающая
  боковая панель `translateX(102%)→0`), `.decision` (action-sheet снизу).

### Типографика в деле

| Что | Размер / трекинг |
|---|---|
| Hero `.title` | `clamp(68px, 10.2vw, 112px)`, `lh 1.02`, `ls -.03em` |
| Hero `.sub` | `clamp(18px, 2.1vw, 23px)`, `lh 1.58`, muted-on-dark |
| Секционный `.title` | `clamp(33px, 5vw, 56px)`; на `.ink` — `clamp(40px, 7vw, 84px)` |
| Scrub/Workflow heading | `clamp(36px, 6vw, 72px)`, `ls -.028em` |

Lens-акцент в тексте: `.grad-word` / `.grad` — `background:--lens` + clip-text;
reveal через `clip-path:inset(0 100% 0 0)→inset(0)`. В Workflow-заголовке акцент
идёт `--fire`-градиентом (`background-size:0%→100%`).

### Градиенты в деле

- `--lens` — знак, иконки, прогресс, текст-клипы, UI-акценты.
- `--lens-soft` — мягкие подложки (`.lens`).
- `--fire` (`#ffe066→orange-soft→orange-hot→#ff3314`) — reveal заголовка Workflow.
- **OrangeGlow** — слои `.section-orange-glow__bloom--core/--pulse/--spark/--ember`
  на radial-градиентах с `mix-blend-mode:screen` (аддитивное свечение); палитра
  orange (`--orange-hot/-core/-soft/-mist/-deep/-warm`).
- **MistBridge** — `.section-mist-bridge__wash`: oklab-градиент
  `#000→#2a2724→#c8c2bc→#fff` (мост тёмное→светлое).

### Workflow-паттерн

`.wf-rail` → `.step` (grid `auto 1fr`); `.step.active` подсвечивается фоном+тенью,
`.step.done` — violet. `.idx` — mono-кружок 26px (`--violet` на active/done).
Пайплайн `.pipeline` выезжает снизу (`translateY(106%)→0`); `.pipe-fill` —
`--lens`-полоса по `width`; `.pipe-node.on .nd` — violet-узел с кольцом.

### Decisions: статусы, ring, ввод

- `.status` — pill; `.review`→amber, `.open`→violet, `.reviewed`→green,
  `.miss`→muted.
- `.ring` — кольцо уверенности 22px: `conic-gradient(var(--c) calc(var(--v)*1%),
  border-2 0)` + `mask:radial-gradient(...)` (бублик); `--v` 0–100, `--c` цвет.
- `.rc-score` — mono 22px lens-clip; `.note` — поле с мигающим курсором
  `.cur` (`sd-blink`).

### Motion (фактические)

- **Hero:** `.hero-fade` (opacity/translateY/blur, delays d1–d4 0/.06/.12/.18s),
  `.hero-smash` (RGB-split shake .72s).
- **Reveal:** `.reveal`/`.reveal.in` (`translateY(26px)→0`, .8s; d1–d3),
  `.reveal-item` — скраб-driven (без CSS-transition, прогресс пишет JS).
- **Epic-заголовок:** `.epic-char-in` — пер-символьный (`delay:calc(--ci*.034s)`),
  `.epic-grad-lr` — clip-path reveal.
- **Атмосфера:** дыхание/пульс OrangeGlow (`.glow-breath-wide`, `.glow-pulse-*`,
  `.glow-ember-*`, `.glow-orb-*`, 3.6–11s, `screen`), дрейф MistBridge
  (`.mist-drift-*`, 18–26s), bento edge-breathe/aura, scrub-float/cell/bar.
- **Reduced-motion:** `@media (prefers-reduced-motion:reduce)` глушит все
  анимации/переходы, reveal сразу видимы.

### Эффекты

- `mix-blend-mode:screen` — hero-splash, OrangeGlow-блумы, horse-canvas
  (аддитивное свечение).
- `backdrop-filter:blur()` — hero CTA (`44px`), header CTA (`16px`),
  scrub-карточки и мелкие контролы (`8px`).
- Маски/clip-path — bento edge-shimmer (XOR-composite mask), heading-grad reveal
  (`clip-path`), кольцо уверенности (radial-mask «бублик»).
- **Нет горизонтального скролла (компонентный guard).** Несколько архетипов
  используют full-bleed детей (`width:100vw`, `margin-left:50%;translateX(-50%)`,
  `calc(50% - 50vw)`, 150vw glow-сцены); `100vw`/`50vw` включают ширину
  скроллбара и текут за документ. Канон: `.band{overflow-x:clip}` на базовом
  примитиве секции (+ `overflow-x:clip` на `.section-mist-bridge`/
  `.section-orange-glow`, у которых вертикальный bleed намеренный). Именно `clip`,
  не `hidden`: `clip` **не создаёт scroll-контейнер**, поэтому `position:sticky`
  pinned-сцены (`.lab-process`, `.ds-cinema`) продолжают работать. Full-bleed
  выровнен по вьюпорту → визуально ничего не теряется. Код:
  `globals.css` (раздел «section scaffolding»).

## Где это в коде

- **DS-бандл:** `.claude/designs/evallense/` — `_ds_manifest.json` (реестр
  токенов/компонентов), `tokens/*.css` (colors · typography · radii-elevation ·
  gradients-surfaces · components), `components/` (Button · Chip · Eyebrow ·
  Tile), `guidelines/*.card.html`, `conventions.md`, `preview.html`. Синк через
  **DesignSync**; ресинк из кода — `.ds-sync/resync.mjs`. Бандл извлекается из
  `globals.css`, не наоборот.
- Токены: [web/src/app/globals.css](web/src/app/globals.css) — `:root`
  (значения) + `@theme inline` (экспорт под Tailwind v4). Новый код может
  использовать и Tailwind-утилиты, и legacy-классы. **Канон совпадает с DS-бандлом.**
- **Дизайн-система (единственный публичный слой сборки):** канонический светлый
  язык — scope **`.ds`** в конце `globals.css` (токены `--dsc-*` + lens-soft
  карточки + cool-mist атмосфера + deep media-frame), всё на `:not(.ink)` +
  `ds.css`. Публичный API — баррель
  [web/src/components/ds/index.ts](web/src/components/ds/index.ts):
  `StatementHero · Bento · FullStatement · Gallery · PinnedSteps · Eyebrow ·
  Title · Media · Button`. `Lab*`/`_kit`/`.lab-*`/`.section-lab` — **deprecated
  внутренний субстрат** (north-star: убрать). Подробности и операционные правила
  — §«Дизайн-система — `@/components/ds`». **Основные страницы дизайн-системы:**
  `/dev/ds-sections` (референс — собрана из барреля), `/dev/ds-atoms` (атомы на
  light/ink), `/dev/ds-theme` (цельная страница light↔ink). На странице:
  `<main className="section-lab ds">` (`section-lab` — временный, до переезда
  `.lab-*`).
- Канонические токены, заведённые в `:root`: семантика `--green` `#1aa37a`,
  `--amber` `#e8943a`, `--amber-ink` `#8a5414`; dark-семантика
  `--green-on-dark` `#5fe0bf`, `--amber-on-dark` `#f0a95a`; `--hairline`;
  градиенты `--lens-deep` (135°) и `--ink-grad` (160°). Семантика проброшена в
  `@theme inline` — доступны утилиты `text-green` / `bg-amber` / `text-amber-ink`.
- Фактические паттерны главной (классы кнопок/чипов/карточек, layout-токены,
  namespaced-дубли `--wf-*`/`--sd-*`, градиенты, motion) задокументированы в
  разделе «Реализация на лендинге».
- Расхождения лендинга с каноном — намеренные дополнения главной: тёплое
  orange-семейство и `--fire`, более крупные `--radius-card/-stage`, чуть иная
  тень `--shadow-soft`, layout-токены `--maxw`/`--gutter`. Новые внутренние
  страницы должны тяготеть к каноническим токенам стайл-гайда, переиспользуя
  готовые классы лендинга там, где они подходят.
- **CMS теперь внутри системы (Story 05).** Ранее `admin.css` намеренно стоял
  «вне публичной визуальной системы» (тёмная утилитарная палитра, синий primary).
  Это расхождение снято: `web/src/app/admin/admin.css` (scoped под `.admin-root`)
  переписан на токены дизайн-системы — светлая тема, violet primary, SF Pro/Menlo,
  hairline-границы, `--sh-*`/`--r-*`. CMS читается как продуктовая апка; см.
  [[cms]] §«Визуальный язык и интерфейс».

## Связанное

- [[system|System]] — поверхности, стек, рендеринг, анимации
- [[index|Wiki]] — навигация

## Открытые вопросы

- Стайл-гайд — отдельный HTML вне репозитория (Google Drive). Частично снято:
  токены, гайдлайны и базовые компоненты теперь живут в DS-бандле
  (`.claude/designs/evallense/`) внутри репо. Остаётся решить судьбу полного
  HTML-гайда (`interface-style-guide.html` лежит в бандле, но `git-ignored`).
- Полного маппинга всех **продуктовых** компонентов стайл-гайда (App window,
  score-ring, comparison-table, human-in-the-loop footer и т.д.) на React в
  `web/` пока нет. DS-бандл покрывает только базовый слой (Button · Chip ·
  Eyebrow · Tile · Heading · MediaPlaceholder); остальное собирается по мере
  необходимости.
- `globals.css` ↔ DS-бандл сверены вручную (v1.3). Автоматической проверки
  drift'а нет — после правок токенов в `globals.css` нужно прогонять
  `.ds-sync/resync.mjs`, иначе бандл и дока снова разъедутся.

## Дизайн-система — `@/components/ds` (канон, единственный публичный API)

> **Канон (2026-06-22).** Страницы сайта собираются **только** из чистой
> дизайн-системы: `@/components/ds` (компоненты + атомы) + scope `.ds`
> (светлый язык) + `ds.css` (стили DS). Это **единственный публичный API**
> для сборки страниц — никаких `Lab`-имён в коде страниц/скиллов.

### Что публичное, а что — deprecated внутренний слой

| Слой | Где | Статус |
|---|---|---|
| **DS компоненты + атомы** | барель `@/components/ds` | **публичный API** — единственное, что импортируют страницы и называют скиллы |
| **DS стили / светлый язык** | `ds.css` + scope `.ds` (`globals.css`) | **публичный** — облик дизайн-системы |
| `Lab*` секции | `web/src/components/sections/lab/Lab*.tsx` | **deprecated** — внутренний субстрат, который барель оборачивает; цель — расковать в чистые DS-компоненты и убрать `Lab`-имя |
| `_kit.tsx` атомы (`LabEyebrow`/`LabTitle`/`MediaPlaceholder`) | `sections/lab/_kit.tsx` | **deprecated** — переезжают в DS-атомы (`Eyebrow`/`Title`/`Media`) |
| `.lab-*` CSS + scope `.section-lab` | `globals.css` | **deprecated** — несущие сейчас, но целятся на переезд в `ds.css`/`.ds`; новый CSS DS пишется в `ds.css`, не в `.lab-*` |

**North-star:** репозиторий без `Lab*` / `_kit` / `.lab-*` / `.section-lab` —
всё в чистой DS. **Операционное правило сейчас:** код и скиллы называют и
импортируют **только** чистый DS; пока `.lab-*`/`.section-lab` ещё несущие,
контейнер несёт `section-lab ds` (см. ниже) — это известный технический долг,
а не часть публичного контракта.

**Неполнота барреля — это gap, не повод трогать Lab напрямую.** Барель сейчас
покрывает 5 секций + 3 атома (таблица «Состав» ниже); остальные ~13 `Lab*` ещё
не вынесены. Чего нет в `@/components/ds` — это **gap**: его закрывает forge,
**извлекая чистый DS-компонент** (не оборачивая Lab алиасом и не копируя
`Lab*` в страницу). Скиллы матчат DS как реально экспортирован; недостающее →
`component-forge` / `primitive-layer-forge`, регистрация — через
`component-library-preparer`. См. [[component-library]] §«Слои» и
`.claude/skills/page-composer`, `component-forge`.

Точка входа — **барель `web/src/components/ds/index.ts`**. Импортировать только
оттуда (отдельные seed-файлы `ds/Eyebrow.tsx` · `Heading.tsx` · `Hero.tsx` ·
`SectionFrame.tsx` устарели и заменены барелем):

```tsx
import { StatementHero, Bento, FullStatement, Gallery, PinnedSteps,
         Eyebrow, Title, Media, Button } from "@/components/ds";
```

### Светлый визуальный язык — scope `.ds`

Светлый DS-облик (lens-soft градиентные карточки, violet-волоски, violet-свечение,
cool-mist атмосфера, брендовая deep-рамка медиа) живёт **одним каноном** в
`globals.css` под классом **`.ds`** (токены `--dsc-*` + правила). Раньше это было
скопировано в три dev-страницы (`.ds-theme` / `/dev/ds-atoms` / `/dev/ds-sections`)
— теперь источник один.

Контейнер страницы несёт `ds` **рядом с** `section-lab`. `ds` — публичный класс
дизайн-системы; `section-lab` присутствует только потому, что базовые `.lab-*`
правила (deprecated субстрат) пока требуют предка `.section-lab`. Это технический
долг: по мере переезда `.lab-*` → `ds.css`/`.ds` класс `section-lab` уходит, и
контейнер станет просто `ds`.

```tsx
<main className="section-lab ds"> … </main>   {/* section-lab — временный, до переезда .lab-* */}
```

Все правила `.ds` гейтятся на `:not(.ink)`, поэтому секция с `surface="ink"`
сохраняет родной тёмный вид. Секции surface-adaptive: `surface="light" | "soft"`
→ светлый DS-облик, `surface="ink"` → тёмная.

Правило палитры (подтверждено user): **фича-градиент карточки не уходит в
зелёный (aqua/teal)** — резолвится обратно в violet (violet→cyan→violet). То же
для слоёв sheen у медиа-рамки. См. [[ds-theme-design-prefs]] (память).

Токены `.ds` (значения — `globals.css`, scope `.ds`):

| Токен | Значение |
|---|---|
| `--dsc-card` | `linear-gradient(162deg,#fff, color-mix(violet 8%, #fff))` — near-white + violet tint |
| `--dsc-card-feature` | `linear-gradient(135deg, violet 24% → cyan 16% → violet 22%)` (НЕ в зелёный) |
| `--dsc-border` / `--dsc-border-strong` | violet 20% / 34% (transparent) |
| `--dsc-shadow` | white inset + 2 violet-тинт тени |
| `--dsc-radius` | `var(--r-lg)` (24px) |

**Основные страницы дизайн-системы:** `/dev/ds-sections` (референс — целиком из
барреля), `/dev/ds-atoms` (атомы на light/ink), `/dev/ds-theme` (цельная
страница light↔ink).

### Состав (полированный набор, 1-й проход)

| Чистое имя | Источник | Тип секции |
|---|---|---|
| `StatementHero` | `LabStatementHero` | Hero / заявление |
| `Bento` | `LabBento` | Bento-обзор (tile + feature) |
| `FullStatement` | `LabFullStatement` | Full-bleed тезис |
| `Gallery` | `LabGallery` | Горизонтальная галерея карточек |
| `PinnedSteps` | `LabPinnedSteps` | Pinned multi-screen процесс |
| `Eyebrow` | `_kit LabEyebrow` (deprecated source) | Атом — надзаголовок |
| `Title` | `_kit LabTitle` (deprecated source) | Атом — заголовок (grad-accent) |
| `Media` | `_kit MediaPlaceholder` (deprecated source) | Атом — медиа-слот (ratio-locked) |
| `Button` | `ui/Button` | Примитив — кнопка (все варианты) |

> Колонка «Источник» — это **внутренний deprecated субстрат**, который барель
> оборачивает сегодня. Цель — расковать каждый в самостоятельный чистый
> DS-компонент (без `Lab`-имени и `.lab-*` зависимости). Скиллы и страницы
> называют только левую колонку.

**Gaps дизайн-системы (закрываются forge, извлечением чистого DS):**

- **Секции, ещё не в барреле (~13):** `FullStatement` уже есть; остаются
  Statement (full-bleed) · SplitRing · EditorialSplit · HubMap · StatBand ·
  Numbered · RiskControl · QuietCta · Pricing · CompareTable · Faq · CinemaScrim ·
  Markers и пр. — каждая → `component-forge` (извлечь в `@/components/ds`, не
  оставлять как `Lab*`).
- **Атомы, ещё markup-only в `/dev/ds-atoms`:** Card · Chip · Stat · Ring · Bars ·
  ListItem — L3-кандидаты → `primitive-layer-forge` (извлечь в DS-атомы, не в
  `_kit`).

Пока gap не закрыт — секция/атом отсутствует в публичном API; страница
**не** импортирует `Lab*`/`_kit` в обход (это нарушение канона), а заказывает
извлечение через forge.
