# Dark Themes — Design Council Record

Трёхраундовый дизайн-совет (питч A/B → перекрёстная критика → директор).
Источник истины для dark-стилей в page-composer (Ф6-styles).

---

## ДИРЕКТОРСКОЕ РЕШЕНИЕ (финал)

Теперь у меня достаточно данных из кодовой базы, чтобы принять обоснованное директорское решение. Ключевые факты:

- `--panel: #0a0a0d` и `--panel-2: #121218` уже существуют как dark elevation tokens
- `--bg-ink: #000000` — абсолютно чёрный surface
- `--ink-grad: linear-gradient(160deg, #0a0a0d 0%, #1b1b26 100%)` — уже в коде
- `LabCinemaScrim` использует `background: #000` на секции и `.lab-cinema__fill` с `background: var(--lens)`
- `mix-blend-mode: screen` уже применён в cta-band видео, bloom, и других местах — precedent есть
- Elevation система: три dark surface уровня частично присутствуют (`#000`, `#0a0a0d`, `#121218`, `#1b1b26`)

---

## ДИРЕКТОРСКОЕ РЕШЕНИЕ

### Оценка процесса

**B был убедительнее в стратегии, A — в технической детализации.**

B выиграл по трём ключевым пунктам: (1) аргумент о контексте просмотра ("открытая вкладка рядом с Notion") — это правильный уровень абстракции для продуктового решения; (2) инженерная позиция про `--panel: #0a0a0d` и `--panel-2: #121218` — эти токены уже в коде, B прав, что строить надо от них, а не от нуля; (3) `fg-secondary` как violet-tinted brand carrier — это системное решение, а не точечный эффект.

A выиграл по: (1) lens hairline seam — конкретный CSS-приём для межсекционных переходов, которого у B нет вообще; (2) числовые anti-patterns с конкретными условиями срабатывания; (3) явная честность при именовании новых токенов.

Рецензия A на B: сильная, поймал реальную техническую проблему с `mix-blend-mode: screen` на cinema fill (но прецедент в коде уже есть — `.cta-band--dark .cta-band__video{mix-blend-mode:screen}` — так что это не антипаттерн, это уже паттерн). Тезис о `#06050f` как визуально неотличимом от `#000000` за пределами OLED — правильный и важный.

Рецензия B на A: поймал реальный пробел — dot-grid texture конкурирует с видео в hero. Вопрос про LabCinemaScrim и dot-grid не закрыт в питче A.

**Ключевые инсайты из перекрёстной критики:**
- Обе темы сошлись на одной стратегии (layered dark shell + immersive accent) — это сигнал правильного направления
- Dot-grid в hero-секции с видео — однозначный антипаттерн, удаляется
- `mix-blend-mode: screen` на cinema fill — не риск, уже применён в cta-band, паттерн безопасен
- Elevation от существующих `--panel`/`--panel-2` — не компромисс, а инженерная точность
- Violet-tinted `fg-secondary` (#c8c4f0 из B или промежуточное значение) — берём как brand mechanism

---

### ФИНАЛЬНАЯ ТЕМА 1 — Ink Refined

> Базовая тёмная тема для большинства внутренних страниц, шелл-уровень

**Слоган:** Precision over presence. Every surface earns its depth.

**Основана на:** Graphite Studio (B) как инженерная основа + контраст-стек с WCAG-числами (B) + lens hairline seam (A) + явное именование токенов (A) + правило двух glow-точек (A, формализовано B)

**CSS-токены (финальные, конкретные hex):**
- bg-base: `#000000` (существующий `--bg-ink`, root canvas)
- bg-layer1: `#0a0a0d` (существующий `--panel`, рабочая поверхность секций)
- bg-layer2: `#121218` (существующий `--panel-2`, карточки и raised containers)
- accent-primary: `#6c4cf1` (существующий `--violet`)
- accent-secondary: `#2ec5e8` (существующий `--cyan`)
- accent-glow: `rgba(108,76,241,0.16)` (floor-glow под контентом; max 2 точки на странице)
- fg-primary: `#f5f5f7` (существующий `--fg-on-dark`; заголовки, display; ≥4.5:1 на bg-layer1)
- fg-secondary: `#d0ccf4` (новый; violet-tinted вместо нейтрального `--body-on-dark: #d8d8de`; ≥4.1:1 на bg-layer1; несёт бренд-hue в каждой строке body)
- fg-muted: `#a9a9b2` (существующий `--muted-on-dark`; ≥3.2:1 на bg-layer1; только caption-размеры на bg-layer2)
- border-default: `rgba(255,255,255,0.10)` (чуть тише существующего `.12` для layer1-контекста)
- border-accent: `rgba(108,76,241,0.28)` (активные состояния, акцентные карточки)

**5 signature visual приёмов:**

1. **Three-layer elevation без новых токенов.** `bg-base (#000)` как html/body canvas. `bg-layer1 (#0a0a0d)` как рабочая поверхность секций. `bg-layer2 (#121218)` как карточки и raised blocks. Все три значения уже в `globals.css` (`--bg-ink`, `--panel`, `--panel-2`) — нулевой diff в токенах, только семантическое применение.

2. **Violet floor glow — строго две точки.** `radial-gradient(ellipse 50% 60% at 50% 110%, rgba(108,76,241,.16) 0%, transparent 70%)` через `::after` на hero и CTA-band. Нигде больше. Правило инфорсится через компонент, не через документацию.

3. **Lens hairline seam между секциями.** `border-image: linear-gradient(90deg, transparent, rgba(108,76,241,.4), rgba(46,197,232,.4), transparent) 1` на `border-top` переходящих секций. Оба бренд-цвета в одной линии — минимально, но системно.

4. **Glass card 6% без tint.** `background: rgba(255,255,255,0.06); border: 0.5px solid rgba(255,255,255,0.10); backdrop-filter: blur(8px)` — нейтральный контейнер. Стекло не добавляет свой цвет, только структуру.

5. **Violet-tinted fg-secondary как тихий brand carrier.** `#d0ccf4` вместо нейтрального серого `#d8d8de` — разница 0.02 в hue на глаз, но системно каждая строка body несёт lens-направление. Не декорация — механизм.

**Surface sequence (7 секций главной):**

| # | Секция | Surface | Glow |
|---|--------|---------|------|
| 1 | Hero (video) | bg-base (#000) | floor glow (точка 1) |
| 2 | Problem/Statement | bg-layer1 (#0a0a0d) | нет |
| 3 | OrangeGlow | bg-layer1 + orange ambient | нет |
| 4 | Workflow | bg-layer1 (#0a0a0d) | нет |
| 5 | Decisions/Bento | bg-layer2 (#121218) | нет |
| 6 | Blog block | bg-layer1 (#0a0a0d) | нет |
| 7 | CTA Band | lens-deep gradient | floor glow (точка 2) |

Переходы hero→problem и bento→blog: lens hairline seam.

**Когда использовать эту тему:**
- Все внутренние страницы (pricing, about, methodology, blog-index)
- `/product/overview/page.tsx` по умолчанию (за исключением top hero-block)
- Любая страница с плотным контентом и B2B-читателем (Head of Investment, CTO фонда)
- Шелл для header и footer на всех страницах

**Anti-patterns:**
- Чистый `#000` как рабочая поверхность секции (без bg-layer1 под ней) — монолит без глубины
- Violet glow в 3+ точках на странице — иерархия размывается
- Glow opacity > `0.18` на Ink Refined — Nebula-территория, нарушает характер темы
- Dot-grid texture под видео или кинематографическими блоками — конкурирует с медиа
- A-B-A-B чередование dark/light ≥4 секций подряд
- `fg-muted (#a9a9b2)` в body-copy на `bg-layer2` — контраст 3.0:1, ниже AA; только caption ≤14px

---

### ФИНАЛЬНАЯ ТЕМА 2 — Nebula Deep

> Акцентная тёмная тема для flagship и immersive страниц

**Слоган:** The intelligence is visible. So is the ambition.

**Основана на:** Nebula Deep (B) как концептуальная база + `fg-secondary` как violet-tinted brand carrier (B) + anti-pattern список с числами (A) + двойной overlay для видео (A) + lens hairline seam (A) + `--pin` механизм для ambient glow (B)

**CSS-токены (финальные, конкретные hex):**
- bg-base: `#0a0509` (не `#06050f` B — слишком тёмный violet вне OLED; не `#0d0a1a` B — слишком явный; компромисс: тёплый ultra-dark с едва различимым violet undertone)
- bg-layer1: `#0f0b1c` (с violet gradient hint; отличается от bg-base на perceived lightness ~4-5 единиц — ощущается, а не вычисляется)
- bg-layer2: `#1a1530` (raised containers; достаточно светлее для elevation без потери атмосферы)
- accent-primary: `#7b5cf6` (существующий `--violet-2`; чуть ярче `--violet` для Nebula-контекста)
- accent-secondary: `#2ec5e8` (существующий `--cyan`)
- accent-glow: `rgba(123,92,246,0.28)` (интенсивнее чем Ink Refined; max 0.32 opacity)
- nebula-bg: см. CSS рецепты ниже
- fg-primary: `#f0eeff` (с едва уловимым violet warm tint; на bg-base даёт ≥4.5:1)
- fg-secondary: `#c8c4f0` (violet-tinted brand carrier — B; каждая строка body несёт hue; ≥4.1:1 на bg-layer1)
- fg-muted: `#9896b8` (violet-desaturated; ≥3.2:1 на bg-layer1; только caption на bg-layer2)
- border-default: `rgba(169,155,255,0.14)` (lavender-tinted, а не нейтральный белый)
- border-accent: `rgba(123,92,246,0.30)` + `box-shadow: 0 0 16px -4px rgba(123,92,246,0.35)` (светящийся бордер)

**5 signature visual приёмов:**

1. **Nebula blob fading по секциям.** Два radial-gradient blob-а (violet слева 0.22 opacity, cyan справа 0.14 opacity) с разными позициями на каждой секции — ощущение движения вниз без анимации. Управляется через `--pin` уже в ScrollOrchestrator: opacity blob-ов модулируется `calc(var(--pin, 0) * 0.18 + 0.08)` — атмосфера нарастает при скролле.

2. **Violet-tinted `fg-secondary` как системный brand carrier.** `#c8c4f0` — не нейтральный серый. Каждая строка body-copy несёт violet hue без явных акцентов. Работает как Apple warm-white-tint на iPhone pages, только в lens-направлении. Это не signature в смысле "заметен" — он работает на подсознательном уровне накопительно.

3. **Tinted glass card.** `background: rgba(123,92,246,.08); border: 1px solid rgba(169,155,255,.20); backdrop-filter: blur(16px) saturate(140%); box-shadow: inset 0 0 0 1px rgba(123,92,246,.10)` — violet tint изнутри. Контейнер не нейтральный, он светится собственным hue.

4. **Ambient video integration — двойной overlay (A).** `::before` для readability: `linear-gradient(to bottom, rgba(10,5,9,.15), rgba(10,5,9,.80))`. `::after` для color leak: `radial-gradient(ellipse at 30% 65%, rgba(123,92,246,.14) 0%, transparent 52%)`. Два слоя управляются независимо — readability не ломается при изменении color ambient.

5. **Gradient heading — только H1 hero и statement.** `background: linear-gradient(118deg, #f0eeff 0%, #a99bff 45%, #2ec5e8 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent` — существующий `--lens` направление, но на tinted fg-primary вместо белого. Исключительно для H1 на hero и LabStatementHero. Не для sub-headlines, не для body.

**CSS рецепты для фонов:**

```css
/* 1. Nebula hero — базовый фон с двумя blob-ами */
background: #0a0509;
background-image:
  radial-gradient(ellipse 80% 55% at 18% 48%, rgba(108,76,241,.22) 0%, transparent 60%),
  radial-gradient(ellipse 60% 45% at 86% 58%, rgba(46,197,232,.14) 0%, transparent 55%);

/* 2. Nebula card / raised surface */
background: rgba(123,92,246,.08);
border: 1px solid rgba(169,155,255,.20);
backdrop-filter: blur(16px) saturate(140%);
box-shadow: inset 0 0 0 1px rgba(123,92,246,.10);

/* 3. CTA band / statement */
background: var(--lens-deep); /* linear-gradient(135deg, #3a1d8f 0%, #1d8f7e 100%) */
background-image: radial-gradient(ellipse 70% 140% at 50% 50%, rgba(123,92,246,.22) 0%, transparent 65%);
```

**Видео-интеграция:**

`LabCinemaScrim` в Nebula Deep: `--bg-ink` не переопределяется (различие `#0a0509` vs `#000000` не читается на SVG knockout fill за пределами OLED, рецензия A права). Вместо этого: fill layer (`.lab-cinema__fill`) остаётся `background: var(--lens)` — уже работает корректно. Двойной overlay через `::before`/`::after` на `.lab-cinema__stage` как описано в signature приёме 4. `mix-blend-mode: screen` применяется только к bloom/ambient слою (`::after`), не к readability слою (`::before`) — это разделение устраняет edge case, который поднимала рецензия A.

**Surface sequence (7 секций product-overview / flagship):**

| # | Секция | Surface | Nebula intensity |
|---|--------|---------|-----------------|
| 1 | Hero (video) | bg-base (#0a0509) + двойной overlay | полный (blob opacity × 1.0) |
| 2 | LabCinemaScrim | bg-base + lens fill через --pin | нет blob, fill по --pin |
| 3 | Statement | bg-layer1 (#0f0b1c) | medium (blob opacity × 0.7) |
| 4 | Bento/Features | bg-layer2 (#1a1530) | low (blob opacity × 0.4) |
| 5 | Workflow | bg-layer1 (#0f0b1c) | medium (blob opacity × 0.7) |
| 6 | Quiet CTA | bg-layer1 (#0f0b1c) | нет blob |
| 7 | CTA Band | lens-deep + nebula bloom | полный |

Переходы: lens hairline seam на hero→cinema и features→workflow.

**Когда использовать эту тему:**
- `/product/overview/page.tsx` — пользователь уже принял решение смотреть
- Methodology page — narrative/cinematic experience
- Любой лендинг где задача — убедить за 4 секунды (pricing announcement, launch page)
- Hero-секция главной страницы может использовать Nebula Deep только для hero block, переключаясь на Ink Refined ниже

**Anti-patterns:**
- Nebula blob opacity > `0.32` — переходит в кислоту, теряет профессиональность
- Более двух nebula blob-ов на одну секцию — визуальный шум, теряется фокус
- Белый `#ffffff` как fg-primary вместо `#f0eeff` — ломает violet tint всей системы
- Gradient text на H2 и ниже, или на body — только H1 hero и statement
- `mix-blend-mode: screen` на readability overlay (только на color leak слое)
- Nebula Deep как шелл для header/footer — слишком иммерсивен для навигационного chrome; header/footer всегда Ink Refined
- A-B-A-B чередование dark/light ≥4 секций
- Использование Nebula Deep на страницах с плотными data-таблицами или формами — атмосфера конкурирует с задачей пользователя

---

### Интеграция в page-composer

**Тема 1 ID:** `dark-refined`
**Тема 2 ID:** `dark-nebula`

**Trigger-conditions для Ф0.5 вопроса (выбор стиля):**

Предлагать `dark-refined` когда:
- Тип страницы: pricing, about, blog-index, methodology, legal, inner product pages
- Аудитория: "decision maker уже в воронке", "технический читатель", "сравнение тарифов"
- Контент: много текста / таблиц / data-dense блоков
- Ключевые слова в задаче: "документация", "сравнение", "детальная", "инструкция"

Предлагать `dark-nebula` когда:
- Тип страницы: product-overview, launch page, flagship hero, methodology intro
- Аудитория: "cold traffic", "первое касание", "убедить за 4 секунды"
- Контент: cinematic moments, video-heavy, narrative flow
- Ключевые слова в задаче: "immersive", "flagship", "launch", "hero", "overview"

По умолчанию (если непонятно): `dark-refined` — ошибиться в сторону строгости безопаснее, чем в сторону кричащести.

---

### Финальное слово директора

EvalLense продаёт доверие аналитического инструмента людям, которые принимают решения за деньги других людей — `dark-refined` это их рабочее пространство, `dark-nebula` это момент, когда мы показываем им будущее. Разграничение "шелл vs flagship" — не компромисс между двумя питчами, это архитектурная точность: одна тема удерживает, другая убеждает.

---

## Питч A (baoyu-подход)

Питч двух тем готов. Вот детальное описание в тексте для совета.

---

## Тема 1 — Ink Dark

**Слоган:** Тёмная как ночь, острая как скальпель — AI-инструмент, которому доверяют.

### Философия

1. **Глубина через слои, не через эффекты.** Три уровня тёмного (`#000` → `#0e0e12` → `1a1a24`) создают пространство без шума — разные секции живут на разных этажах, а не на одной плоской плите.
2. **Акцент — только бренд-пара.** Violet (`#6c4cf1`) + cyan (`#2ec5e8`) и linse-градиент. Больше никаких цветов. Правило "один бренд на весь сайт" работает как японский минимализм.
3. **Glow — под контентом, не поверх.** Radial-gradient снизу секции как напольный свет. Текст всегда на тёмном, glow не "засвечивает" типографику.

### Точная палитра

| Роль | Значение |
|---|---|
| bg-base | `#000000` |
| bg-layer1 | `#0e0e12` |
| bg-layer2 | `#1a1a24` |
| accent-primary | `#6c4cf1` |
| accent-secondary | `#2ec5e8` |
| accent-glow | `rgba(108,76,241,0.18)` |
| fg-primary | `#f5f5f7` |
| fg-secondary | `#d8d8de` |
| fg-muted | `#a9a9b2` |
| border-default | `rgba(255,255,255,0.10)` |
| border-accent | `rgba(108,76,241,0.28)` |

### 5 signature приёмов

1. **Базальтовый surface.** `bg-layer1` (`#0e0e12`) как рабочая поверхность — чуть теплее pure black, почти неотличимо, но даёт ощущение материала, не пустоты.
2. **Violet floor glow.** `radial-gradient(ellipse 50% 60% at 50% 110%, rgba(108,76,241,.14) 0%, transparent 70%)` — источник снизу, как свет под дверью. Hero, statement, CTA.
3. **Glass card 6%.** `background: rgba(255,255,255,0.06); border: 0.5px solid rgba(255,255,255,0.12); backdrop-filter: blur(8px)` — бесцветное стекло, минимальный tint. Ничего от себя не добавляет, только контейнер.
4. **Lens hairline seam.** Переход между секциями: `border-image: linear-gradient(90deg, transparent, rgba(108,76,241,.4), rgba(46,197,232,.4), transparent) 1` — lens-градиент как разделительная линия.
5. **Dot-grid texture.** `radial-gradient(rgba(255,255,255,.04) 1px, transparent 1px); background-size: 28px 28px` — почти невидима, но добавляет тактильность. Только на hero и statement, не везде.

### Gradient рецепты

```css
/* Hero section */
background: linear-gradient(160deg, #0a0a0d 0%, #1b1b26 100%);
/* + floor glow через ::after */
background: radial-gradient(ellipse 50% 60% at 50% 110%, rgba(108,76,241,.14) 0%, transparent 70%);

/* Card hover state */
box-shadow: 0 0 0 1px rgba(108,76,241,.2), 0 16px 40px -12px rgba(108,76,241,.22);

/* CTA band */
background: linear-gradient(135deg, #3a1d8f 0%, #1d8f7e 100%); /* lens-deep */

/* Dot-grid overlay */
background-image: radial-gradient(rgba(255,255,255,.04) 1px, transparent 1px);
background-size: 28px 28px;
```

### Видео

Постер — `#0a0a0d`. Overlay: `linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.55) 100%)`. Видео на `mix-blend-mode: normal`, без цветовых фильтров. Задача overlay — не окрасить, а дать тексту внизу читаться на тёмной подложке.

### Anti-patterns

- Чистый `#000` без ink-grad — монолит без глубины, секции сливаются
- Glow поверх текста — только под контентом, как напольный свет
- Более 2-х цветов акцента — только violet + cyan, никаких новых
- A-B-A-B чередование dark/light ≥4 секций подряд (anti-stripe rule)

---

## Тема 2 — Nebula

**Слоган:** Живая тёмная — фиолетовый космос, nebula-свечение, кино-медиа.

### Философия

1. **Фон — не пустота, а материя.** Nebula-свечение из глубины: violet + cyan radial blobs за контентом. Каждая секция "излучает" своё пространство.
2. **Медиа — первый класс.** Видео и изображения дышат: тёмные ambient overlay с цветным leak. Медиа не вставляется в box — оно создаёт атмосферу.
3. **Стекло с характером.** Glass cards с violet tint — не прозрачные, а подсвеченные изнутри. `rgba(123,92,246,0.08)` + `backdrop-filter: blur(16px) saturate(140%)`.

### Точная палитра

| Роль | Значение |
|---|---|
| bg-base | `#0d0a1a` |
| bg-layer1 | `#141028` |
| bg-layer2 | `#1e1a36` |
| accent-primary | `#7b5cf6` (violet-2) |
| accent-secondary | `#2ec5e8` |
| accent-glow | `rgba(123,92,246,0.35)` |
| fg-primary | `#f0eeff` (с violet warm tint) |
| fg-secondary | `#d4ceff` |
| fg-muted | `#b0b8d8` |
| border-default | `rgba(169,155,255,0.15)` |
| border-accent | `rgba(169,155,255,0.30)` |

### 5 signature приёмов

1. **Nebula blob background.** Два radial-gradient на bg: violet blob слева (opacity 0.22), cyan blob справа (opacity 0.14). Разные позиции на каждой секции — создаёт ощущение движения вниз по странице.
2. **Tinted glass card.** `background: rgba(123,92,246,.08); border: 1px solid rgba(169,155,255,.2); backdrop-filter: blur(16px) saturate(140%); box-shadow: 0 0 0 1px rgba(123,92,246,.1) inset` — violet tint внутри, не снаружи.
3. **Ambient video leak.** `::after` поверх видео: `background: radial-gradient(ellipse at 30% 70%, rgba(123,92,246,.15) 0%, transparent 50%)` — цвет "вытекает" из видео в bg.
4. **Violet border glow.** Активные/hover состояния: `box-shadow: 0 0 0 1px rgba(169,155,255,.35), 0 0 20px -4px rgba(123,92,246,.4)` — бордер светится, а не просто виден.
5. **Gradient text.** Заголовки H1/H2: `background: linear-gradient(118deg, #f0eeff 0%, #a99bff 45%, #2ec5e8 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent` — только для hero и statement, не для body.

### Gradient рецепты

```css
/* Nebula hero section */
background: #0d0a1a;
background-image:
  radial-gradient(ellipse 80% 50% at 20% 50%, rgba(108,76,241,.22) 0%, transparent 60%),
  radial-gradient(ellipse 60% 50% at 85% 60%, rgba(46,197,232,.14) 0%, transparent 55%);

/* Tinted glass card */
background: rgba(123,92,246,.08);
border: 1px solid rgba(169,155,255,.2);
backdrop-filter: blur(16px) saturate(140%);
box-shadow: 0 0 0 1px rgba(123,92,246,.1) inset;

/* Gradient heading */
background: linear-gradient(118deg, #f0eeff 0%, #a99bff 45%, #2ec5e8 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;

/* CTA band */
background: linear-gradient(135deg, #3a1d8f 0%, #1d8f7e 100%);
background-image: radial-gradient(ellipse 70% 150% at 50% 50%, rgba(123,92,246,.25) 0%, transparent 70%);
```

### Видео

Постер — `#0d0a1a` (не черный, с violet undertone). Overlay — двойной: `linear-gradient(to bottom, rgba(13,10,26,.2), rgba(13,10,26,.85))` для читаемости текста + `radial-gradient(ellipse at 30% 60%, rgba(123,92,246,.12) 0%, transparent 50%)` для ambient leak. Видео на `mix-blend-mode: lighten` для интеграции с bg-цветом — тёмные части видео "сливаются" с nebula bg.

### Anti-patterns

- Glow без темной base — свечение без `#0d0a1a` основы даёт мутный туман
- Белый `#ffffff` вместо `#f0eeff` — нейтральный белый ломает violet tint всей системы
- Glow opacity > 0.35 — переходит в кислотность, теряет профессиональность
- Более 2-х nebula blob-ов на секцию — визуальный шум, теряется фокус

---

## Точка зрения дизайнера

**Ink Dark** — правильный выбор для продуктовых страниц с heavy data и B2B-аудиторией (legal ops, enterprise). Читается как Linear или Vercel Dashboard: "мы не развлекаем — мы работаем". Gradient text там будет смотреться чужеродно, держим типографику белой и строгой.

**Nebula** — правильный выбор для marketing/hero pages и pricing, где нужно продавать вижн. Читается как Anthropic.com × Midjourney: "мы строим будущее, и оно красивое". Здесь gradient text на H1 уместен именно потому, что это единственное место на странице с таким приёмом.

На практике — использовать обе: Ink Dark как базовый shell (header, footer, inner pages), Nebula как режим marketing hero-блоков на главной и лендингах. Это та же философия, что Apple использует для `apple.com` vs `developer.apple.com`.

---

## Питч B (ui-ux-pro-max)

Теперь детальный текстовый разбор — там, где палитра не заменяет аргументы.

---

## Позиция дизайнера B на совете

Я изучил кодовую базу: `globals.css` (~4500 строк), компонентный состав страницы (Hero → Problem → OrangeGlow → Workflow → Decisions → HomeBlogBlock → EvalLenseBentoSection → CtaBand), архитектуру `LabCinemaScrim` (SVG knockout mask + `--pin` scroll) и `LabStatementHero` (4 версии, surface-adaptive). Вот мои позиции.

---

## Тема 1 — Graphite Studio

"Precision at rest. Clarity on demand."

### Почему именно это

EvalLense — инструмент оценки стартапов. Покупатель — Head of Investment или CTO фонда, который видит тридцать SaaS-лендингов в неделю. Он реагирует на доверие, не на эффект. Graphite Studio берёт existing token `--ink-grad` (`#0a0a0d → #1b1b26`) и строит трёхуровневую систему поверхностей вместо одной (`--bg-ink: #000000` в текущем коде), что устраняет главный грех нынешней главной — все тёмные секции сливаются в одну бесформенную плиту.

### Что нового против текущего кода

Текущий код знает только два состояния тёмной поверхности: `band.ink` (абсолютный `#000`) и ничего. Graphite Studio добавляет `surface-raised (#111115)` и `surface-float (#1a1a22)` как настоящие elevation-уровни — без введения новых токенов, просто расширяя систему. Это не редизайн, это достройка.

Фиолетовый glow (`rgba(108,76,241,.18)`) ставится ровно в два места: Hero и CTA. Нигде больше. Текущая страница нарушает это правило — glow есть в Hero, в BentoSection, в нескольких card-компонентах, что размывает иерархию.

### По LabCinemaScrim

Компонент ink-only by design (из исходника: `surface?: "ink"`, fill rect = `var(--bg-ink, #0a0a0d)`). В Graphite Studio `--bg-ink` остаётся `#0a0a0d`, что на 3 единицы светлее текущего `#000`. Это мало что меняет визуально, но устраняет истинно-чёрный контраст-клип, который на некоторых OLED-экранах выглядит как дефект дисплея. Lens fill resolves в `--lens-deep` (`#3a1d8f → #1d8f7e`) — тёмная версия бренд-градиента без сатурации, читается как "завершение", не как "взрыв".

### Типографика в деталях

Текущий `lab-hero__title`: `clamp(44px,7vw,96px)`, `letter-spacing: -.03em`. Это правильно и не меняется. Но сейчас `--body-on-dark: #d8d8de` используется и для body-copy, и для sub-текста без разделения. Graphite Studio вводит строгий контраст-стек:
- fg-primary `#f5f5f7` — заголовки и display (≥4.5:1 на `#0a0a0d`)
- fg-secondary `#d8d8de` — body и sub (≥4.1:1, технически AA large text)
- fg-muted `#a9a9b2` — eyebrows, captions, meta (≥3.2:1, AA large)

Один нюанс: на `surface-float (#1a1a22)` fg-muted даёт только 3.0:1 — это Anti-pattern. Правило: на float-поверхностях muted-text только в caption-размерах, не в body.

---

## Тема 2 — Nebula Deep

"The intelligence is visible. So is the ambition."

### Почему именно это

Это тема для flagship moment — страница продукта, где нужно убедить за первые 4 секунды. `--lens` градиент в EvalLense называется так буквально: линза. Nebula Deep строит весь визуальный язык вокруг этой метафоры: тёмная среда, через которую проходит сигнал. Поверхности — как слои атмосферы, не как интерфейс-панели.

### Ключевое отличие от "просто фиолетовый тёмный"

Ошибка большинства nebula-тем — они кладут фиолетовый везде и теряют иерархию. Nebula Deep ограничивает ambient glow строго `surface-base (#06050f)` и управляет им через scroll-переменную `--pin` (уже существующей в ScrollOrchestrator). Workflow получает "звёздное поле" через CSS `background-image: radial-gradient(1px 1px at ...)` на pseudo-элементе — без JS, без heavy assets. Это то, что `OrangeGlow` секция уже делает для оранжевого glow через `--glow-p` и `--glow-zarya`.

### fg-secondary как brand carrier

Главный signature приём, который не виден в палитре: `fg-secondary: #c8c4f0` — это не нейтральный серый, это violet-tinted. Каждый параграф body-текста несёт бренд-hue без явного акцента. Это то, что Apple делает на страницах iPhone — белый текст с чуть тёплым tint. Здесь tint — violet-cyan direction.

### По LabCinemaScrim — конкретные изменения

Текущий SVG knockout использует `fill="var(--bg-ink, #0a0a0d)"` на mask rect. В Nebula Deep `--bg-ink` переопределяется для страниц с этой темой на `#06050f`. Эффект: буквы, через которые видно видео, вырезаются из глубоко-фиолетового черного, а не нейтрального — это усиливает ощущение что видео светится сквозь ткань темноты. Технически это одна переопределённая CSS-переменная на уровне страницы, ничего в компонентах не меняется.

LabCinemaScrim уже имеет `lab-cinema__fill` layer, который fade-in в конце scroll animation. Сейчас он задаётся в globals.css без конкретного цвета (inherits `--lens`). В Nebula Deep: fill = полный `--lens` gradient, и transition не просто opacity, но и luma — добавить `mix-blend-mode: screen` на fill позволяет видео "пробиваться" сквозь gradient вместо того чтобы быть полностью покрытым.

---

## Мой голос на совете

Я выбираю **Graphite Studio** для основной версии сайта, но это не значит, что Nebula Deep неверна.

Аргумент против консенсуса: команды часто выбирают immersive-тему для лендинга потому что она *ощущается* более амбициозной в Figma. В браузере, в потоке пользователя — открытая вкладка рядом с Gmail, Notion, Linear — она ощущается как кто-то кричит. Graphite Studio говорит то же самое, но тихо.

Правильный ответ для EvalLense: Graphite Studio на главной странице, Nebula Deep на страницах product-overview и methodology — там, где пользователь уже принял решение смотреть. Это соответствует существующей структуре репозитория: `/product/overview/page.tsx` — уже отдельный файл с отдельной страницей.

Nebula Deep убеждает тех, кто уже внутри продукта. Graphite Studio убеждает тех, кто снаружи. Обе темы нужны.

---

## Рецензия A → B

## Рецензия Дизайнера A на питч Дизайнера B

---

### 1. Что сильно у B

**Контраст-стек с числами.** Самый сильный момент всего питча — трёхуровневый типографический стек с конкретными соотношениями контрастности (4.5:1, 4.1:1, 3.2:1). Я назвал те же три роли (`fg-primary`, `fg-secondary`, `fg-muted`), но не привязал их к WCAG-цифрам. B сделал это и, что важно, сам поймал себя на anti-pattern: `fg-muted` на `surface-float` даёт только 3.0:1. Это не просто честность — это показатель системного мышления. Я упустил.

**Аргумент о контексте просмотра.** "Открытая вкладка рядом с Gmail, Notion, Linear" — это правильная постановка вопроса. B думает не о том, как тема выглядит в Figma или в изоляции, а о том, как она работает в реальном окружении пользователя. Это сильнее, чем мой аргумент про "японский минимализм" — я говорил о принципе, он говорит о конкретной ситуации восприятия.

**Сегментация по воронке.** Graphite Studio на главной, Nebula Deep на product-overview. B подкрепил это ссылкой на реальную структуру репозитория (`/product/overview/page.tsx`). Я тоже предложил два режима (Ink Dark shell + Nebula для hero-блоков), но без привязки к конкретным файлам. Его аргумент операционально точнее.

---

### 2. Где B ошибается или упускает

**Graphite Studio — это не "достройка", это переименование.** B утверждает, что `surface-raised (#111115)` и `surface-float (#1a1a22)` не вводят новых токенов, а "расширяют систему". Но `#111115` нет ни в одном существующем токене — это новое значение. Называть это "не редизайном" — самообман, удобный для совета, но не для инженера, которому придётся обновлять `globals.css`. Я был честнее: явно указал три слоя с новыми значениями и назвал это тем, чем оно является.

**Тезис про LabCinemaScrim слабее, чем кажется.** B пишет, что `--bg-ink` на `#06050f` (Nebula Deep) заставит буквы "вырезаться из глубоко-фиолетового черного". Проблема: SVG knockout работает с subtractive mask — цвет fill rect определяет, что *не* видно, не то, что видно. Фиолетовый оттенок `#06050f` на практике неотличим от `#000000` за пределами OLED-калиброванного монитора. Это красиво в питче, но не работает так в браузере. Предложение с `mix-blend-mode: screen` на fill-layer интереснее, но B не объясняет, что произойдёт с видео, у которого светлые участки — они дадут screen-артефакты на тёмном фоне. Техническая аргументация здесь не дотянута.

**Отсутствие решения для светлого режима.** Ни в Graphite Studio, ни в Nebula Deep B не упоминает, что будет, если пользователь использует light mode или если бизнес захочет лайт-версию страницы. Я явно обозначил, что Ink Dark — это shell-тема, а не универсальная. B полностью игнорирует этот вопрос, как будто EvalLense навсегда останется dark-only. Для B2B-продукта с legal ops аудиторией это риск.

---

### 3. Конфликт Темы 1 — чья сильнее для EvalLense

Мой Ink Dark и его Graphite Studio — одна идея с разной глубиной аргументации. Обе берут `--ink-grad`, обе строят три уровня поверхности, обе ограничивают glow двумя точками. Разница в следующем:

B ограничивает фиолетовый glow двумя точками (Hero + CTA) и называет это правилом. Я тоже ограничиваю, но менее явно. Это его преимущество в Теме 1.

Однако B называет свою тему "Graphite Studio" и строит её вокруг нейтрального, почти-серого материала — но `#111115` и `#1a1a22` это не графит, это почти-чёрный с синим подтоном. Название и визуальный язык расходятся. Мой "Ink Dark" честнее по отношению к тому, что реально получается.

**Чья сильнее для EvalLense:** его — за счёт контраст-стека с числами и правила двух glow-точек. Но только в этих двух пунктах.

---

### 4. Конфликт Темы 2 — чья Nebula убедительнее

Здесь у нас содержательный спор.

Моя Nebula честнее называет риски (anti-patterns явно перечислены, в том числе opacity > 0.35). B в своей Nebula Deep делает ставку на `fg-secondary: #c8c4f0` как brand carrier — violet-tinted серый вместо нейтрального. Это умный ход. Apple делает это с warm-tinted белым, и это работает. Если каждый абзац несёт hue без явного акцента — это системное решение, а не декорация.

Но: B предлагает `mix-blend-mode: screen` на cinema fill и gradient text на H1 одновременно в Nebula-контексте. Два сложных рендер-приёма в одном viewport — это либо работает идеально, либо разваливается при нестандартном видео или тексте. Он не адресует это напряжение.

Моя Nebula предлагает gradient text только на hero и statement, но не в cinema-контексте. Это консервативнее, но безопаснее.

**Чья убедительнее:** его Nebula Deep по идее `fg-secondary` как brand carrier и по аргументу с `--pin` scroll-переменной (повторное использование существующего механизма). Моя Nebula по операционной надёжности.

---

### 5. Что я готов позаимствовать у B

**Контраст-стек с цифрами.** Беру полностью. Не просто три роли, а конкретные WCAG-соотношения для каждого токена плюс правило "muted только в caption-размерах на float-поверхностях". Это то, что должно быть в документации темы, а не в питче.

**Правило двух glow-точек как явное правило.** У меня это подразумевалось, у него сформулировано. Формулировка лучше, чем подразумевание.

**Violet-tinted `fg-secondary`.** В моей Nebula `fg-secondary: #d4ceff` уже имеет violet tint, но я не назвал это механизмом. B объяснил, почему это работает. Объяснение важнее самого значения.

---

### 6. Итоговое предложение

**Оставить из B:** правило двух glow-точек, контраст-стек с WCAG-числами, сегментацию по воронке с привязкой к файлам репо.

**Оставить из A:** явное именование новых токенов как новых (не "расширение системы"), anti-patterns с конкретными условиями срабатывания, решение для потенциального светлого режима как открытый вопрос.

**Выбросить из B:** тезис о том, что Graphite Studio не вводит новых токенов (неправда), и технически непроработанное предложение с `mix-blend-mode: screen` на cinema fill без анализа edge cases.

**Выбросить из A:** слоган "Тёмная как ночь, острая как скальпель" — это копирайт, не дизайн-аргумент. Не место в питче перед советом.

**Итог:** Тема 1 — гибрид Graphite Studio + Ink Dark с явным именованием токенов, правилом двух glow-точек и WCAG-стеком. Тема 2 — Nebula с violet-tinted `fg-secondary` из питча B и anti-pattern списком из питча A. Сегментация по воронке — его, операционная надёжность — моя.

---

## Рецензия B → A

## Рецензия Дизайнера B на питч Дизайнера A

---

### 1. Что сильно у A

**Anti-pattern секции сделаны правильно.** A явно прописал запреты в обеих темах — и это не формальность. "A-B-A-B чередование ≥4 секций подряд" и "glow opacity > 0.35" — это конкретные цифры, которые можно проверить в коде. У меня anti-patterns сформулированы как принципы, у A — как правила. Правила работают лучше.

**Lens hairline seam — сильная находка.** `border-image: linear-gradient(90deg, transparent, rgba(108,76,241,.4), rgba(46,197,232,.4), transparent) 1` как переход между секциями — это именно тот уровень детали, который отличает дизайн-систему от набора цветов. Я не предлагал ничего подобного для межсекционных переходов, и это упущение с моей стороны.

**Финальная позиция "Apple developer vs apple.com".** A правильно идентифицировал, что нужны две темы с разными функциями, и дал понятную аналогию. Я пришёл к той же структуре, но A оформил её чище.

---

### 2. Где A ошибается или упускает

**Graphite Studio игнорирует LabCinemaScrim.** A дал детальный CSS для hero и cards — и полностью обошёл стороной главный визуальный компонент страницы. `LabCinemaScrim` с SVG knockout, `--pin` scroll-переменной и `lab-cinema__fill` layer — это не деталь, это центральный элемент главной страницы. Как поведёт себя dot-grid texture под видео? Как "floor glow" под контентом сочетается с `mix-blend-mode` на fill? A не ответил. Это не придирка — это пробел в системе, который обнаружится при первой же реализации.

**Видео-секция у A недодумана.** "Видео на `mix-blend-mode: normal`, без цветовых фильтров" для Ink Dark — это технически грамотно, но клинически. Ink Dark заявляет "тактильность" через dot-grid и "напольный glow", а видео обрабатывается как нейтральный контейнер. Нет объяснения, почему видео *не* должно интегрироваться с темой. Я явно указал `mix-blend-mode: screen` на fill для интеграции видео с gradient — это дизайн-решение, а не умолчание.

**Dot-grid texture — визуальный риск без обоснования.** `rgba(255,255,255,.04)` на `28px 28px` почти невидим на экране, но рендерится браузером как повторяющийся паттерн на всей высоте секции. A пишет "только на hero и statement, не везде" — но не объясняет, почему именно там. Моя позиция: если приём не усиливает сообщение секции, он работает против него. Hero в EvalLense — это кинематографическое видео. Dot-grid и видео конкурируют за "тактильное" ощущение. Один из них лишний.

---

### 3. Конфликт Тем 1 — чья сильнее?

Обе темы решают одну задачу: построить трёхуровневую тёмную поверхность вместо монолита. Разница — в отправной точке.

A строит от нуля: `#000 → #0e0e12 → #1a1a24`. Три уровня, где `bg-base` = абсолютный чёрный. Это работает как абстракция, но игнорирует, что в текущем коде `--bg-ink: #0a0a0d` уже существует как foundation — и его не зря сделали не чёрным.

Я строю от существующего токена `--ink-grad` и расширяю вверх: `#0a0a0d → #111115 → #1a1a22`. Это не вкусовщина — это инженерная позиция. Меньше diff, меньше риска регрессий, существующие компоненты (включая `LabCinemaScrim`) не нужно перепрописывать.

**Чья сильнее:** моя Graphite Studio сильнее в контексте существующей кодовой базы. A предлагает красивую новую систему. Я предлагаю достройку существующей. Для продукта в активной разработке с ~4500 строками CSS — это принципиальное различие.

Единственное, где A выигрывает у меня в Теме 1: lens hairline seam между секциями. Это конкретный технический приём, которого у меня нет.

---

### 4. Конфликт акцентных тем — чья Тема 2 убедительнее?

Здесь честный ответ неудобен: они близки. Обе — nebula-фиолетовый с ambient glow, tinted glass, gradient heading на H1. Различия — в деталях.

**Где A слабее:** `mix-blend-mode: lighten` для видео в Nebula A — рискованный выбор. `lighten` означает, что все светлые пиксели видео будут "пробиваться" сквозь bg, но тёмные участки видео покажут bg-цвет. На практике это работает только если видео специально снято под этот blend mode — с тёмным фоном и яркими элементами. Если видео общего характера, эффект будет непредсказуемым.

**Где я слабее:** мой "звёздное поле через CSS radial-gradient" для Workflow — это правильная идея, но я не дал конкретный рецепт. A дал конкретный CSS для каждого приёма. В этом он дисциплинированнее.

**Чья Тема 2 убедительнее для EvalLense:** моя Nebula Deep — за счёт одного аргумента. `fg-secondary: #c8c4f0` как violet-tinted body текст — это системное решение, которое несёт бренд через типографику без дополнительных компонентов. A предлагает gradient text только на H1/H2 как signature приём — это правильно, но это точечный эффект. Tinted fg-secondary работает на каждой строке тела и создаёт погружение без кричащих элементов. Для B2B-аудитории, которая читает много текста — это важнее.

---

### 5. Что я готов позаимствовать у A

**Lens hairline seam** — беру без изменений. Переход `border-image: linear-gradient(90deg, transparent, rgba(108,76,241,.4), rgba(46,197,232,.4), transparent) 1` — точный, технически чистый, использует оба бренд-цвета. Моя система межсекционных переходов слабее.

**Числовые anti-patterns.** A формализовал правила как цифры: "≥4 секций подряд", "opacity > 0.35". Я опишу свои anti-patterns в том же формате. Это делает правила проверяемыми.

**Ambient video leak через `::after`** из Nebula A — двойной overlay (readability + color leak) более гибкий, чем мой единственный overlay. Можно управлять каждым слоем независимо.

---

### 6. Итоговое предложение

Расхождений по стратегии между нами нет — оба пришли к "Graphite-like на главной, Nebula на product-pages". Спорить здесь не о чём, и это хорошо означает: концептуальный риск минимален.

Технически я предлагаю следующее объединение:

**Взять из моей системы:** surface elevation от `--ink-grad` (не от `#000`), `fg-secondary: #c8c4f0` как violet-tinted carrier, конкретную обработку `LabCinemaScrim` через переопределение `--bg-ink` и `mix-blend-mode: screen` на fill.

**Взять из системы A:** lens hairline seam как межсекционный разделитель, числовые anti-patterns, двойной overlay для видео.

**Выбросить:** dot-grid texture в Hero (конкурирует с видео), `mix-blend-mode: lighten` на видео в Nebula (непредсказуем на реальном материале), чистый `#000` как bg-base (есть `#0a0a0d` в коде, менять незачем).

**Один вопрос к A**, на который нужен ответ перед финальным решением: как dot-grid и LabCinemaScrim сосуществуют в твоей Ink Dark? Если у тебя есть решение — я его не видел, и оно важно.
