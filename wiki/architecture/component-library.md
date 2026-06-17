# Component Library — манифест выкованных секций

Реестр **переиспользуемых prop-driven секций** (`web/src/components/sections/lab/Lab*`),
выкованных из стенда `dev/section-lab`. Источник истины «что готово к
переиспользованию на внутренних страницах». Заполняется моментом
[forge-index](../../.claude/skills/forge-index/SKILL.md) пакета
**component-forge**; потребитель — `build-pages`.

**Статусы:** `forged` — прошёл гейт forge-validate; `draft` — в работе;
`blocked` — провалил гейт (см. примечание); `inline` — ещё не извлечён из стенда.

**Demo-media:** реальный demo-content (light/dark · desktop/mobile · poster) из
`web/public/assets/section-lab/<archetype>/`; `.media-ph` — fallback при asset-gap
(см. `component-forge/kb/demo-media.md`).

| # | Архетип | Компонент | Ключевые пропсы | Версии | Поверхности | Demo-media (L/D · dt/mb · poster) | Статус | Обновлён |
|---|---|---|---|---|---|---|---|---|
| 01 | Statement hero | `sections/lab/LabStatementHero.tsx` | eyebrow, title, sub, media | v1–v4 | light/ink | — | forged | — |
| 03 | Pinned multi-screen | `sections/lab/LabPinnedSteps.tsx` | steps[], pinSteps | v1–v3 | light/ink | — | forged | — |
| 04 | Editorial split | `sections/lab/LabEditorialSplit.tsx` | eyebrow, titleLead(+accent/trail), sub, media | v1–v3 | light/ink | `.media-ph` (demo TBD) | forged¹ | 2026-06-17 |
| 05 | Editorial split + scrub-ring | `sections/lab/LabSplitRing.tsx` | ring, breakdown[], media | v1–v3 | light/ink | scoring-matrix ↔ light-scoring-matrix (из `_demo-pool`, через object-fit)² | forged | 2026-06-17 |
| 06 | Horizontal gallery | `sections/lab/LabGallery.tsx` | eyebrow, title, sub, laneLabel, items[] | v1, v3 | light/ink | v3 only: `06-horizontal-gallery/gallery-v3-{light,dark}-desktop.webp` (ambient backdrop под generated-CSS scrim; v1 — без медиа; mobile — CSS-градиент)³ | forged | 2026-06-17 |

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

> Архетипы 02, 07–20 — пока `inline` в `web/src/app/dev/section-lab/page.tsx`,
> ждут прогона через component-forge.

## Слои библиотеки (единица переиспользования зависит от слоя)

Страницы — смешанные блоки, поэтому режем не только на секции (см.
`component-forge/kb/composition-layers.md`):

| Слой | Где | Назначение |
|---|---|---|
| Токены | `globals.css :root`, DS `tokens/` | цвет/типо/радиусы/тени/градиенты |
| **Атомы** | `sections/lab/_kit.tsx` | Eyebrow, Title(+grad-word), MediaPlaceholder, Chip, status-чип, ring, score, counter |
| **Каркасы (layout)** | `sections/lab/_layout.tsx` | `Band(surface)`, `Wrap`, `SplitGrid`, `BentoGrid`, `GalleryRail`, `PinnedStage` |
| **Секции** | `sections/lab/Lab*.tsx` | тонкие рецепты из атомов+каркасов (таблица выше) |
| Страницы | `app/**/page.tsx` (`build-pages`) | сборка из секций И/ИЛИ атомов+каркасов напрямую |

Смешанный блок страницы собирается из **атомов + каркасов напрямую**, не форкая
секцию. Общий кусок всегда живёт на слое ниже (не дублируется).

## Как пользоваться

- **Переиспользование на странице:** импортировать `Lab<Archetype>`, передать
  контент пропсами, выбрать `surface`. Движение — единый `<ScrollFX/>` внизу страницы.
- **Сравнение версий:** на стенде `dev/section-lab` инспектор `LabMarkers` даёт
  табы v1/v2/v3 + тумблер Light/Dark (выбор в localStorage).
- **Surface-инвариант:** внутри версии light и ink совпадают по геометрии,
  различие — только цвет (см. `component-forge/kb/surface-invariant.md`).
