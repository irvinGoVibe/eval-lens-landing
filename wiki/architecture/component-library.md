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

| Слой | Где | Назначение |
|---|---|---|
| Токены | `globals.css :root`, DS `tokens/` | цвет/типо/радиусы/тени/градиенты |
| **Атомы** | `sections/lab/_kit.tsx` | **фактически только** `LabEyebrow`, `LabTitle`(+grad-word), `MediaPlaceholder` (+ типы `LabContentMode`/`LabContentSet`). Chip/status-чип/ring/score/counter в коде НЕ существуют — конфликт CL-002, источник истины = код |
| **Каркасы (layout)** | `sections/lab/_layout.tsx` — **файла нет** (`documented-missing`, конфликт CL-001) | Обещанные `Band/Wrap/SplitGrid/BentoGrid/GalleryRail/PinnedStage` **не реализованы**. Сегодня есть только CSS `.wrap`/`.stage` + инлайн-гриды в `Lab*`. До форджа `_layout.tsx` page-composer работает в режиме `whole-sections-only` |
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

## Source of truth для page-composer (preparer)

Реестр выше — **forge-процесс** (статусы `forged/draft` = прошёл ли forge-validate).
**Consumption-готовность** для `page-composer` / `build-pages` живёт в
нормализованных манифестах, которые ведёт момент
[component-library-preparer](../../.claude/skills/component-library-preparer/SKILL.md):

```
.claude/library/component-library/
  manifest.json · sections.json · atoms.json · layouts.json · chrome.json ·
  motion.json · newsroom.json · social.json · backgrounds.json ·
  transitions.json · production-patterns.json · conflicts.json · README.md
```

**Модель слоёв (14):** tokens · global-primitives · lab-atoms · layouts ·
lab-sections · production-sections · chrome · nav · newsroom · social · media ·
motion · backgrounds · transitions. Подробные API-контракты — в манифестах, не
здесь.

**Readiness-политика:** компонент `ready` только если ОДНОВРЕМЕННО source+export
есть, отрендерен в Section Lab, пропсы разобраны, версии+поверхности подтверждены,
**browser QA выполнен**, build ok, light/dark ok, responsive ok, horizontal-overflow
ok, media-контракт известен, contract полон. `page-composer` берёт **только `ready`**;
`conditional` — лишь с явным fallback; `unavailable` — нельзя.

**Compose-mode: `whole-sections-only`** — пока нет `_layout.tsx`, собирать только
цельные `Lab*`, не смешанные блоки из выдуманных каркасов.

**Browser QA (preparer, 2026-06-17, :3005 `/dev/section-lab`):** 1440/1280/768/375 —
page-level horizontal overflow = 0; переключение версий и Light/Dark подтверждено
вживую; console без ошибок; build = dev-compiled (полный `pnpm build` не запускался).
Итог: **15 выкованных Lab-секций → `ready`**; интенциональный horizontal-scroll —
у Gallery (06) и Compare-table (14). **Архетип 15 (Versus) → `unavailable`**: всё
ещё инлайн-JSX в `page.tsx`, требует форджа в `LabVersus`.

**Конфликты docs↔code (источник истины = код, фиксируются в `conflicts.json`):**
CL-001 `_layout.tsx` documented-missing · CL-002 атомы `_kit` переоценены ·
CL-003 home-order упоминает выключенный MistBridge · CL-004 3D-примитивы
(UnicornScene/Stage, BentoHorse) + dead-code (FinalUnicorn/Trust/Results) не
задокументированы · CL-005 CLAUDE.md «CMS нет» устарел (Supabase default) ·
CL-006 `LabStatementHero` без `surface`-пропа (→ component-forge).

**Обновление:** одно изменилось → `/component-library-preparer "<имя|путь>"`
(single-target, правит только эту запись). Полный пересбор → `… "full"`.
`forge-index` дёргает single-target после регистрации нового архетипа.
