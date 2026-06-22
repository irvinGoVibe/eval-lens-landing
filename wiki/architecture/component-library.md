# Component Library — манифест дизайн-системы

Реестр **переиспользуемых prop-driven секций дизайн-системы** — публичный API
[`@/components/ds`](../../web/src/components/ds/index.ts). Источник истины «что
готово к переиспользованию на внутренних страницах». Заполняется моментом
[forge-index](../../.claude/skills/forge-index/SKILL.md) пакета
**component-forge**; потребители — `page-composer` / `build-pages`.

> **Канон (см. [[design-system]] §«Дизайн-система — `@/components/ds`»).** Страницы
> и скиллы называют и импортируют **только** чистые DS-имена
> (`StatementHero`/`Bento`/…). Колонка «Компонент» в таблице ниже временно
> показывает внутренний путь `sections/lab/Lab*.tsx` — это **deprecated
> субстрат**, который барель оборачивает; north-star — расковать каждую секцию в
> самостоятельный чистый DS-компонент и убрать `Lab`-имя. Чего нет в барреле —
> это **gap**: forge извлекает чистый DS-компонент, страница в обход `Lab*` не
> импортирует.

**Статусы:** `forged` — прошёл гейт forge-validate; `draft` — в работе;
`blocked` — провалил гейт (см. примечание); `inline` — ещё не извлечён из стенда.

**Demo-media:** реальный demo-content (light/dark · desktop/mobile · poster) из
`web/public/assets/section-lab/<archetype>/`; `.media-ph` — fallback при asset-gap
(см. `component-forge/kb/demo-media.md`).

| # | Архетип | Компонент | Ключевые пропсы | Версии | Поверхности | Demo-media (L/D · dt/mb · poster) | Статус | Обновлён |
|---|---|---|---|---|---|---|---|---|
| 01 | Statement hero | `sections/lab/LabStatementHero.tsx` | eyebrow, title, sub, media | v1–v4 | light/ink | — | forged | — |
| 02 | Full-bleed statement | `sections/lab/LabStatement.tsx` | versions[] (`LabContentSet<{eyebrow,text}>`), surface | v1–v2 | light/ink | — | draft⁶ | 2026-06-17 |
| 03 | Pinned multi-screen | `sections/lab/LabPinnedSteps.tsx` | steps[], pinSteps | v1–v3 | light/ink | — | forged | — |
| 04 | Editorial split | `sections/lab/LabEditorialSplit.tsx` | eyebrow, titleLead(+accent/trail), sub, media | v1–v3 | light/ink | `.media-ph` (demo TBD) | forged¹ | 2026-06-17 |
| 05 | Editorial split + scrub-ring | `sections/lab/LabSplitRing.tsx` | ring, breakdown[], media | v1–v3 | light/ink | scoring-matrix ↔ light-scoring-matrix (из `_demo-pool`, через object-fit)² | forged | 2026-06-17 |
| 06 | Horizontal gallery | `sections/lab/LabGallery.tsx` | eyebrow, title, sub, laneLabel, items[] | v1, v3 | light/ink | v3 only: `06-horizontal-gallery/gallery-v3-{light,dark}-desktop.webp` (ambient backdrop под generated-CSS scrim; v1 — без медиа; mobile — CSS-градиент)³ | forged | 2026-06-17 |
| 07 | Bento overview | `sections/lab/LabBento.tsx` | eyebrow, title, sub, items[] (feature + media), surface | v1–v3 | light/ink | `.media-ph` fallback на обе темы (asset-gap; paired light/dark lens-grid generation brief на файле)⁴ | forged | 2026-06-17 |
| 08 | Bento link tiles (hub map) | `sections/lab/LabHubMap.tsx` | eyebrow, title, sub, items (`LabContentSet<LabHubLink[]>`), surface | v1–v3 | light/ink | — (тайлы-ссылки; своего медиа-слота нет) | draft⁵ | 2026-06-17 |
| 09 | Stat band / counters | `sections/lab/LabStatBand.tsx` | eyebrow, title, stats[], media, surface | v1–v3 | light/ink | `.media-ph` 21:9 band (demo TBD) | draft⁵ | 2026-06-17 |
| 10 | Editorial numbered list | `sections/lab/LabNumbered.tsx` | eyebrow, title, sub, items[] | v1–v3 | light/ink | — | draft⁵ | 2026-06-17 |
| 11 | Risk → control grid | `sections/lab/LabRiskControl.tsx` | eyebrow, title, sub, pairs[] | v1–v3 | light/ink | — | draft⁵ | 2026-06-17 |
| 12 | Quiet CTA band | `sections/lab/LabQuietCta.tsx` | eyebrow, title, sub, cta, surface | v1–v3 | light/ink | — | draft⁶ | 2026-06-17 |
| 13 | Pricing tiers | `sections/lab/LabPricing.tsx` | eyebrow, title, sub, tiers[], note, ctaLabel/Href | v1–v3 | light/ink | — | draft⁶ | 2026-06-17 |
| 14 | Comparison table | `sections/lab/LabCompareTable.tsx` | eyebrow, title, sub, columns[], rows[][], recommendedIndex | v1–v3 | light/ink | — | draft⁶ | 2026-06-17 |
| 16 | FAQ list | `sections/lab/LabFaq.tsx` | eyebrow, title, items[] (q/a) | v1–v3 | light/ink | — | draft⁶ | 2026-06-17 |

> ¹ Архетип 04 — «дореформенный» пилот (до полного pipeline Фаз 0–8 / demo-media /
> двух гейтов); подлежит перековке по обновлённому `component-forge`.

> ² Архетип 05 выкован полным pipeline (Gate A/B). Фото подключено через `object-fit`
> из `_demo-pool` (деривативы `section-lab/05-editorial-split/` — follow-up).
> **Tracked follow-ups (non-blocking):** (a) фото за текстом — усилить scrim/затемнение
> до AA-читаемости (правило [[no-photo-bg-behind-text]]: full-bleed только generated-CSS,
> фото — в контейнерных слотах либо затемнённое под текстом); (b) тёмный `scoring-matrix.png`
> 1.3MB → пересжать в WebP; (c) ring-glow radius по теме — нормализовать или принять;
> (d) ring tone green/amber — отложено.

> ³ Архетип 06 выкован полным pipeline (Gate A/B, 2 fix-итерации). Версия
> **v2 Modern Recomposition удалена по запросу user** — оставлены v1 Polish и
> v3 Expanded Expressive. V3 — ambient photo-backdrop (`_demo-pool` →
> `section-lab/06-horizontal-gallery/`) за generated-CSS scrim (фото не под
> текстом напрямую — правило [[no-photo-bg-behind-text]]); v3 ink-карточки —
> liquid-glass через общую группу (sheen-слои) с тёмным floor 88% (`--bg-ink`)
> для AA body-текста над нео́н-хало.

> ⁴ Архетип 07 выкован полным pipeline (Gate A/B, 2 fix-итерации). Три версии:
> **v1 Polish** (3-col, feature span 2×2, без grad-word), **v2 Modern
> Recomposition** (1.2fr/1fr magazine-split, заголовок внутри feature-тайла,
> lens-акцент «ingredients»), **v3 Expanded Expressive** (irregular 1.6fr/1fr/1fr
> в 2 ряда, крупный display-заголовок, lens-акцент «map»). Demo-media —
> `MediaPlaceholder` fallback на обе темы: в проекте нет structured lens-grid
> paired-light-dark ассета (media-curator вернул `asset-gap`), generation brief
> на файле. Типографика заголовка **запинена per-version** (`.lab-bento__v--* .title`
> задаёт font-size/line-height/letter-spacing), т.к. глобальный `.ink .title`
> крупнее — иначе Light↔Dark прыгали бы (surface-invariant). `_layout.tsx`/
> `BentoGrid` намеренно **не создан** — grid инлайн (один потребитель; см. карту
> Фазы 2).

> ⁵ Архетипы 08–11 выкованы пачкой через **component-forge-batch** (batch
> `20260617-1326-batch-08-11`) одним сериализованным writer'ом (все четыре правят
> общие файлы — `page.tsx`, `globals.css`, реестр — поэтому запись инвариантно
> concurrency-1). Каждый — три версии (**v1 Polish** = точная экстракция инлайна +
> добавлена surface-инвариантная перекраска противоположной темы; **v2 Modern
> Recomposition** / **v3 Expanded Expressive** — по лестнице смелости, заголовок
> запинен per-version, т.к. глобальный `.ink .title` крупнее). Общий атом
> **`LabTitle`** (title + один lens-accent word) вынесен в `_kit.tsx` (5 потребителей;
> инлайн-`Title` в `LabBento` функционально идентичен — кандидат на адопцию later).
> Контент-инвариант: у 08 сохранён content-axis (placeholder/real через
> `LabContentSet`), у 09 — медиа-band 21:9 (`MediaPlaceholder`), у 10/11 — без медиа.
> **Статус `draft` (не `forged`):** живой Render-QA (forge-validate) **не выполнен** —
> старт dev-сервера на :3005 запрещён CLAUDE.md без явной просьбы user, на :3005
> ничего не слушало. v1 — экстракция гарантированной точности; v2/v3 авторские, но
> **не валидированы вживую** (особенно стоит проверить 08·v3 — feature-hero на
> `grid-row:1/4`). После живой проверки user → статус `forged`.

> ⁶ Архетипы 02, 12, 13, 14, 16 выкованы пачкой через **component-forge-batch**
> (batch `20260617-1348-batch-02-16`), тем же сериализованным writer-моделью.
> **02 Full-bleed statement** — особый: сохранены **2 версии** (это демо
> content-оси с РАЗНОЙ копией по версиям; v3 не добавлен — потребовал бы выдумать
> новое продуктовое утверждение, запрещено Contract Lock); пропсы — массив
> `versions[]`, каждая с placeholder/real. **12/13/14/16** — полная лестница v1/v2/v3:
> v1 = точная экстракция, v2 Modern Recomposition, v3 Expanded Expressive; заголовок
> запинен per-version. `LabTitle` расширен (опциональные `reveal`/`delay`) — нужно
> для пер-элементного стаггера 12. Кнопки 12/13 — общий `Button` (12 default; 13
> primary/ghost). Таблица 14 держит overflow-safe scroll-контейнер (`min-width`)
> во всех версиях. **Render-QA:** в этом прогоне dev-сервер УЖЕ работал на :3005
> (приложение user'а) — выполнена **read-only HTTP-проверка рендера** (route
> компилируется и отдаёт 200, без preview-панели/build). Полный визуальный QA
> (скриншоты, L/D pixel-parity) и `pnpm build` — по-прежнему отложены; статус
> `draft`. **Advisory:** ghost-кнопка 13 на ink-поверхности визуально не проверена.

> Архетипы 15, 17–20 — пока `inline` в `web/src/app/dev/section-lab/page.tsx`,
> ждут прогона через component-forge.

## Слои библиотеки (единица переиспользования зависит от слоя)

Страницы — смешанные блоки, поэтому режем не только на секции (см.
`component-forge/kb/composition-layers.md`):

| Слой | Публичный API (что называют скиллы/страницы) | Источник (deprecated внутренний субстрат) |
|---|---|---|
| Токены | `globals.css :root` + scope `.ds` (`--dsc-*`), DS `tokens/` | — |
| **Атомы** | `@/components/ds`: `Eyebrow` · `Title` · `Media` | `sections/lab/_kit.tsx` (`LabEyebrow`/`LabTitle`/`MediaPlaceholder` + типы `LabContentMode`/`LabContentSet`). Chip/status-чип/ring/score/counter в коде НЕ существуют (markup-only в `/dev/ds-atoms`) — CL-002, **gap → `primitive-layer-forge`** извлекает в DS-атомы |
| **Каркасы (layout)** | (пока нет публичных каркасов) | `sections/lab/_layout.tsx` **не существует** (`documented-missing`, CL-001). Обещанные `Band/Wrap/SplitGrid/BentoGrid/GalleryRail/PinnedStage` не реализованы; сегодня — CSS `.wrap`/`.stage` + инлайн-гриды. Слой частей куёт **`primitive-layer-forge`** (под visual parity, в чистый DS); до него page-composer в режиме `whole-sections-only` |
| **Секции** | `@/components/ds`: `StatementHero` · `Bento` · `FullStatement` · `Gallery` · `PinnedSteps` · … (по мере расковки) | `sections/lab/Lab*.tsx` — оборачиваются барелем; цель — расковать в чистые DS-секции |
| Страницы | `app/**/page.tsx` — импорт **только** из `@/components/ds` | (`page-composer` / `build-pages`) |

Смешанный блок страницы собирается из **DS-атомов + каркасов напрямую**, не форкая
секцию и не импортируя `Lab*`/`_kit`. Общий кусок всегда живёт на слое ниже
(не дублируется). Чего нет в `@/components/ds` — **gap → forge** (извлечь чистый
DS), а не локальная копия `Lab*`.

## Как пользоваться

- **Чистый API дизайн-системы (единственно допустимый в коде страниц):**
  импортировать из барреля
  [`@/components/ds`](../../web/src/components/ds/index.ts) — prefix-free имена
  `StatementHero · Bento · FullStatement · Gallery · PinnedSteps · Eyebrow ·
  Title · Media · Button`. Контент — пропсами, поверхность — `surface`. Движение
  — единый `<ScrollFX/>` внизу страницы. Контейнер страницы —
  `<main className="section-lab ds">` (`.ds` — публичный светлый язык;
  `.section-lab` — временный technical-debt класс, нужен пока `.lab-*` ещё несущие;
  см. [[design-system]] §«Дизайн-система — `@/components/ds`»). **Основные
  страницы:** `/dev/ds-sections` (референс), `/dev/ds-atoms`, `/dev/ds-theme`.
- **Прямой импорт `Lab*`/`_kit` — запрещён в коде страниц/скиллов** (это
  deprecated субстрат). Нужного компонента нет в барреле → это **gap**, его
  извлекает forge в чистый DS, а не страница локально.
- **Сравнение версий:** на стенде `dev/section-lab` / `/dev/ds-sections`
  инспектор даёт табы v1/v2/v3 + тумблер Light/Dark (выбор в localStorage).
- **Surface-инвариант:** внутри версии light и ink совпадают по геометрии,
  различие — только цвет (см. `component-forge/kb/surface-invariant.md`).

## Визуальные слои (visual-layer-forge)

Переиспользуемые фоны/переходы под и между секциями, кованые моментом
[visual-layer-forge](../../.claude/skills/visual-layer-forge/SKILL.md) **до** запуска
Page Orchestrator. Контракты — в `backgrounds.json` (L13) / `transitions.json` (L14);
консьюмер берёт только `ready`. Живой каталог — `web/src/app/dev/visual-lab/`
(не Section Lab — другая ось).

| ID | Слой | Что | Поверхности | Статус |
|---|---|---|---|---|
| `bg-neutral-light/soft/ink` | background (L13) | регистрация surface-токенов (`.band/.soft/.ink`); ink в паре с glow | light/soft/ink | ready |
| `bg-ink-ambient-glow` | background (L13) | CSS ambient-glow на `.band.ink`, без WebGL; **рефактор: `--aqua`→`--cyan`** (no green) | ink | ready |
| `bg-cool-mist` | background (L13) | очень слабые cyan/lavender радиалы над soft (≤0.09) | light/soft | ready |
| `bg-violet-halo` | background (L13) | один masked violet→lavender core (≤0.12 light / ≤0.16 ink) | both | ready |
| `bg-dot-grid` | background (L13) | нормализован из lab-decor; 22px точки, ellipse-mask | both | ready |
| `bg-line-field` | background (L13) | нормализован; dual 42px grid (violet/cyan) | light/soft | ready |
| `bg-concentric-rings` | background (L13) | repeating-radial violet @6%, pitch 36px | light/soft | ready |
| `bg-media-scrim` | background (L13) | pointer-safe scrim-overlay под текст над медиа | both | ready |
| `tr-hard-cut` | transition (L14) | намеренный cut (zero-height modifier, 1px hairline на ink); default для low-contrast | any | ready |
| `tr-gradient-bridge` | transition (L14) | **per-direction multi-stop** ramps (hex-стопы, `in oklab` interp), все 6 направлений, faint cool midpoint | все направления | ready |
| `tr-pattern-dissolve` | transition (L14) | gradient + dot/line pattern, растворяется top/bottom (section-boundary) | both | ready |
| `tr-masked-divider` | transition (L14) | soft-mask boundary: diagonal / convex-dome (lens-aperture), без edge-glow | ink↔light/soft | ready |
| `tr-glow-crossover` | transition (L14) | section-modifier glow через шов (violet/cyan, contained, не orange) | ink→light/soft | ready |
| `tr-overlap-bridge` | transition (L14) | карта/медиа пересекает шов | any | **blocked-by-surface-ownership** |

### Тёмные темы (batch 4 — visual-layer-forge, 2026-06-18)

Результат дизайн-совета (источник истины — `.claude/designs/dark-themes/design-council.md`).
Две тёмные стиль-темы для `page-composer` (Ф0.5 спрашивает тему light/dark → пул стилей).

| Asset | Слой | Назначение | Тема | Статус |
|---|---|---|---|---|
| `bg-ink-floor-glow` | background (L13) | violet floor glow снизу (≤0.18, строго 2 точки/стр.) | dark-refined | ready |
| `bg-nebula-layers` | background (L13) | тёмная nebula-база `#0a0509`/`#0f0b1c`/`#1a1530` (+`--raised`/`--float`) | dark-nebula | ready |
| `bg-nebula-blob` | background (L13) | dual radial blob, intensity по `--pin` (≤0.32), mobile 1 радиал | dark-nebula | ready |
| `bg-glass-tinted` | background (L13) | violet glass `blur(16px) saturate(1.4)` (+`--accent` glow) | dark-nebula | ready |
| `bg-glass-plain` | background (L13) | нейтральное стекло 6% `blur(8px)` | dark-refined | ready |
| `bg-nebula-video-scrim` | background (L13) | двойной overlay: readability `::before` ⟂ color-leak `::after` (screen только на leak) | dark-nebula | ready |
| `heading-lens-gradient` | atom/text-clip (L13) | gradient text для H1 hero/statement (не body) | dark-nebula | ready |
| `tr-lens-seam` | transition (L14) | 1px lens hairline между тёмными секциями (+`--strong`) | dark-refined | ready |
| `motion-nebula-drift` | motion (L12) | ambient drift nebula-слоя 32s, reduced-motion static | dark-nebula | ready |
| `recipe-dark-refined` | recipe (L15) | базовая тёмная арка (inner/dense/B2B) | dark-refined | ready |
| `recipe-dark-nebula` | recipe (L15) | акцентная тёмная арка (flagship/immersive/video) | dark-nebula | ready |

**Новые токены (`globals.css :root`):** `--fg-secondary-dark #d0ccf4`, `--nebula-base #0a0509`,
`--nebula-layer1 #0f0b1c`, `--nebula-layer2 #1a1530`, `--nebula-fg #f0eeff`,
`--nebula-fg-2 #c8c4f0`, `--nebula-fg-muted #9896b8`.
**Style anchors (`recipes.json`):** `style-dark-refined` (Ink Refined) · `style-dark-nebula`
(Nebula Deep) — оба `ready`, дополняют 3 light-якоря.
**Lightning CSS gotcha (зафиксировано инлайн):** `backdrop-filter` писать только unprefixed
и с unitless `saturate()` (`1.4`, не `140%`) — иначе Lightning дропает стандартное свойство
в multi-function filter (ломает Firefox).

> **visual-layer-forge full library — DONE + registered:** 15 backgrounds (L13) ·
> 8 transitions (L14, +`tr-overlap-bridge` blocked) · 6 motion recipes (L12:
> `motion-static` · `slow-ambient-drift` · `glow-expansion` · `pattern-reveal` ·
> `crossfade` · `nebula-drift`, всё на ScrollFX/`data-*`/CSS) · 7 composition recipes (L15:
> `recipe-calm-product` · `dense-evidence` · `trust-methodology` · `cinematic-break` ·
> `quiet-conversion` · `dark-refined` · `dark-nebula`). Все `ready`. Page-level shared backgrounds / grid-continuation /
> `tr-overlap-bridge` — `blocked-by-surface-ownership`. Каталог — `/dev/visual-lab`.
> Потребитель — `page-composer` (Page Orchestrator).
>
> ⚠️ Стек-готча (зафиксирована): сырые `oklab()` цветовые стопы рушат сборку CSS в
> Next 16 / Lightning CSS (молчаливый drop хвоста файла) — цветовые стопы только hex/rgb,
> интерполяция `in oklab` допустима.

**Browser QA (visual-layer-forge v1, 2026-06-17, :3005 `/dev/visual-lab`):** overflow 0
@375/768/1280; контраст текста на ink ok; `pointer-events:none` + `aria-hidden` на
декор-слоях; мобильный fallback фона (<600px → 1 радиал); все 4 направления моста
корректны; console чист. → оба `ready`.

**Backlog (page-level, `blocked-by-surface-ownership`):** `bg-shared-page-grid` +
`tr-grid-continuation` спроектированы, но требуют, чтобы Lab-секции умели прозрачную/
наследуемую поверхность (сейчас секции сами красят `.band.*`). Условие разблокировки:
`Lab sections support transparent/inherit surface → component-forge →
visual-layer-forge targeted → shared page backgrounds enabled`. Section API не трогается.

**Recipes (L15):** слой composition-recipes добавлен в модель библиотеки;
`recipes.json` содержит **7 `ready` рецептов** (5 light: calm-product · dense-evidence ·
trust-methodology · cinematic-break · quiet-conversion; 2 dark: dark-refined · dark-nebula)
+ блок `style_anchors` (3 light + 2 dark стиль-якоря для page-composer Ф0.5).
Recipe = проверенная комбинация `section surface + background + transition + motion`
(ссылки на ID из L13/L14/L12), а не page template и не компонент. Авторит
`visual-layer-forge`, нормализует и регистрирует `component-library-preparer`.
**Dependency-gate:** recipe не получает `ready`, если любой из его background/
transition/motion отсутствует, не зарегистрирован или не `ready`; при изменении
участника зависимые recipes помечаются `needs-recheck`. **Registration-gate:**
ни один ресурс не `ready`, пока `registration.status != completed`. Page-level
backlog `bg-shared-page-grid` / `tr-grid-continuation` (`surface_ownership.status:
blocked-by-surface-ownership`) регистрируется, но Page Orchestrator'у как `ready`
не отдаётся.

## Source of truth для page-composer (preparer)

Реестр выше — **forge-процесс** (статусы `forged/draft` = прошёл ли forge-validate).
**Consumption-готовность** для `page-composer` / `build-pages` живёт в
нормализованных манифестах, которые ведёт момент
[component-library-preparer](../../.claude/skills/component-library-preparer/SKILL.md):

```
.claude/library/component-library/
  manifest.json · sections.json · atoms.json · layouts.json · chrome.json ·
  motion.json · newsroom.json · social.json · backgrounds.json ·
  transitions.json · recipes.json · production-patterns.json · conflicts.json · README.md
```

**Модель слоёв (15):** tokens · global-primitives · lab-atoms · layouts ·
lab-sections · production-sections · chrome · nav · newsroom · social · media ·
motion · backgrounds · transitions · **composition-recipes (L15)**. Подробные
API-контракты — в манифестах, не здесь.

**Readiness-политика:** компонент `ready` только если ОДНОВРЕМЕННО source+export
есть, отрендерен в Section Lab, пропсы разобраны, версии+поверхности подтверждены,
**browser QA выполнен**, build ok, light/dark ok, responsive ok, horizontal-overflow
ok, media-контракт известен, contract полон. `page-composer` берёт **только `ready`**;
`conditional` — лишь с явным fallback; `unavailable` — нельзя.

**Compose-mode: `whole-sections-only`** — пока нет `_layout.tsx`, собирать только
цельные DS-секции (публичные `@/components/ds`), не смешанные блоки из выдуманных
каркасов. Переключение на `atoms-and-layouts` (сборка из DS-атомов + каркасов)
делает **`primitive-layer-forge`** после извлечения слоя частей в чистый DS и
регистрации; `page-composer` mode-aware — читает `compose_mode` из манифеста и
включает сборку по частям без переписывания. В обоих режимах публичный API —
`@/components/ds`; `Lab*`/`_kit` напрямую не импортируются.

**Browser QA (preparer, 2026-06-17, :3005 `/dev/section-lab`):** 1440/1280/768/375 —
page-level horizontal overflow = 0; переключение версий и Light/Dark подтверждено
вживую; console без ошибок; build = dev-compiled (полный `pnpm build` не запускался).
Итог: **15 выкованных секций → `ready`** (источник — deprecated `Lab*` субстрат,
обёрнутый барелем; north-star — расковать в чистый DS); интенциональный
horizontal-scroll — у Gallery (06) и Compare-table (14). **Архетип 15 (Versus) →
`unavailable`**: всё ещё инлайн-JSX в `page.tsx`, требует форджа в чистую
DS-секцию `Versus` (`@/components/ds`).

**Production reusable sections (L6, контракт — `production-patterns.json`):**

| Компонент | Источник | Что | Surfaces | Медиа | Статус |
|---|---|---|---|---|---|
| `CtaBand` | `sections/CtaBand.tsx` | prop-driven CTA-band: фон = зацикленное видео (`videoSrc`/`videoPoster`, mp4) **или** CSS-aurora (`auroraVariant`: violet/ember/ocean/magenta/emerald/gold); `bleed` спиллит фон на футер; кнопки через общий `Button` (glass = общий liquid-glass) | light (`--bg-soft`) / dark (`--bg-ink`) | video ∥ aurora (fallback) | `ready`¹ |

> ¹ Browser QA пройден вживую (`/`, dark + видео `cube-1.mp4` + bleed на футер,
> настоящие CTA-ссылки, HUD убран, overflow 0, console чист). Production-параметры
> зафиксированы: `videoSrc=/assets/cta/cube-1.mp4`, `auroraVariant=violet`,
> `theme=dark`, `bleed` (test-циклеры удалены из `page.tsx`). Light-поверхность —
> по CSS-правилу (surface-invariant); при первом использовании на светлой странице
> проверить вживую. Полный контракт — в `production-patterns.json`.

**Конфликты docs↔code (источник истины = код, фиксируются в `conflicts.json`):**
CL-001 `_layout.tsx` documented-missing · CL-002 атомы `_kit` переоценены
(оба закрывает `primitive-layer-forge` фактическим извлечением, не правкой доков) ·
CL-003 home-order упоминает выключенный MistBridge · CL-004 3D-примитивы
(UnicornScene/Stage, BentoHorse) + dead-code (FinalUnicorn/Trust/Results) не
задокументированы · CL-005 CLAUDE.md «CMS нет» устарел (Supabase default) ·
CL-006 `LabStatementHero` без `surface`-пропа (→ component-forge).

**Обновление:** одно изменилось → `/component-library-preparer "<id|имя|путь>"`
(**targeted incremental** — принимает ID фона/перехода/motion/recipe, имя слоя,
путь к source или однозначное описание; правит только эту запись; несколько целей
через запятую — последовательно). Только изменённое по git → `… "changed"`
(git diff, rename/delete, без full scan). Полный пересбор → без аргументов или
`… "full"`. `forge-index` и `visual-layer-forge` дёргают targeted incremental
после регистрации нового ресурса.
