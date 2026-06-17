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
| 05 | Editorial split + scrub-ring | `sections/lab/LabSplitRing.tsx` | ring, breakdown[], media | v1–v2 | light/ink | — | forged | — |

> ¹ Архетип 04 — «дореформенный» пилот (до полного pipeline Фаз 0–8 / demo-media /
> двух гейтов); подлежит перековке по обновлённому `component-forge`.

> Архетипы 02, 06–20 — пока `inline` в `web/src/app/dev/section-lab/page.tsx`,
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
