---
name: zone-rhythm
description: "Разложить ВСЮ страницу EvalLense в ритм тональных зон, как на /dev/canvas-bg и /trust/methodology: обернуть идущие подряд секции в ОДНУ сквозную зону (`.ds-zone`) со СТОПКОЙ фоновых слоёв (`--lobes` светлая база + `--lobes-dark` поверх, opacity 0), пустить поверх светлых полос летящие блобы (`<ZoneBlobs/>`), и на КАЖДОМ тональном стыке поставить переход `<ZoneToneFlip/>` (light→ink) / `<ZoneToneFlipReverse/>` (ink→light) — он КРОССФЕЙДИТ сквозной фон через бренд-блум (bridge+glow, без грязно-серого), как canvas-bg. Фон ТЕЧЁТ непрерывно за всей группой (не перемычка между раздельными зонами); секции прозрачны и держат только тон через `surface` (light/ink). Это автоматический комбинатор НАД `zone-background`. Секции со своим full-bleed фоном (Cinema-видео, Footer) остаются снаружи и рвут ритм; светлый StatementHero идёт ВНУТРЬ. Контент, порядок и число секций НЕ меняются; новые фоны/переходы/блобы НЕ куются (только готовые `ds.css` + `ZoneToneFlip`/`ZoneToneFlipReverse`/`ZoneBlobs`). Один user-гейт: план ритма (границы зоны, тон секций, где встают флип-швы) ДО перезаписи. Одна страница за вызов. Не редизайнит секции (это redraw-block), не куёт новые слои (это visual-layer-forge). Триггеры — /zone-rhythm, «оберни страницу в светлые и тёмные зоны как на canvas-bg», «сделай ритм светлый→тёмный с блум-флипом и блобами», «разбей <route> на зоны light/dark», «поставь сквозной флип между зонами», «zone-rhythm <route>»."
metadata:
  version: 0.2.0
  product: EvalLense
  role: orchestrator
  consumes: ["components/ds/ds.css (.ds-zone API)", "components/ZoneToneFlip", "components/ZoneToneFlipReverse", "components/ZoneBlobs", "@/components/ds prop types", section-types.md]
  reference: ["web/src/app/trust/methodology/page.tsx (прод)", "web/src/app/dev/canvas-bg/page.tsx (dev)"]
  sibling: [zone-background, page-motion, ds-ify-page, redraw-block, visual-layer-forge]
---

# zone-rhythm — сквозной ритм светлых/тёмных зон с блум-флипом и блобами

Ты — **дирижёр тонального ритма страницы**. User указывает **страницу**; ты
оборачиваешь её участвующие секции в **ОДНУ сквозную тональную зону** с
**непрерывным фоном**, который **флипается** light→dark (и обратно) по скролл-швам,
пускаешь поверх светлых полос **летящие блобы**, а на каждом тональном стыке
ставишь **переход-флип** (`ZoneToneFlip` / `ZoneToneFlipReverse`).

**Эталон вживую — `/dev/canvas-bg` и `/trust/methodology`.** Это НЕ две раздельные
зоны с перемычкой. Это **один фон под всей группой**, в котором тёмный слой
**проявляется** на стыке (а не отдельный блок-переход между двумя фонами).

**Это комбинатор НАД [zone-background](../zone-background/SKILL.md):** тот делает
одну зону по диапазону; `zone-rhythm` оборачивает весь тональный прогон страницы и
расставляет флип-швы. Правила одной зоны (фон = слой под группой, не проп;
own-backdrop наружу; `--contained` для частичной зоны) **наследуются**.

**Ключевая модель (повтори про себя):**
1. **Зона** = ОДИН `.ds-zone` вокруг всего тонального прогона. Внутри — **стопка**
   фоновых слоёв (z-index:-1, рисуются в порядке DOM, back→front): `--lobes`
   (светлая база, всегда видна) + `--lobes-dark` (тёмный, opacity 0) [+ при
   возврате в свет: `--lobes ds-relight` + `ds-flip-bridge`/`__glow`].
2. **Секции** прозрачны, держат только тон через `surface` (light → `light`,
   dark → `ink`). Светлый StatementHero — ВНУТРЬ зоны (как methodology).
3. **Шов** = `<ZoneToneFlip/>` (light→ink: проявляет `--lobes-dark`) или
   `<ZoneToneFlipReverse/>` (ink→light: проявляет `ds-relight` + бренд-bridge).
   Ставится МЕЖДУ секцией уходящего тона и секцией приходящего. Он кроссфейдит
   **сквозной** фон через бренд-блум — это и есть «свайп через цветной блум».
4. **Блобы** — `<ZoneBlobs/>` поверх светлых полос (обрезаются с тёмных блоков).

**Что это НЕ:**
- НЕ редизайн секций (крафт/раскладка/версии) — это `redraw-block`.
- НЕ ковка новых фонов/переходов/блоб-сетов — это `visual-layer-forge`. Здесь —
  **готовые** `--lobes`/`--lobes-dark`/`ds-relight` + `ZoneToneFlip*` + `ZoneBlobs`.
- НЕ статичный `tr-tone-flip--bloom` div (это другой, де-скоупленный примитив — НЕ
  он). Механизм этого скилла — кроссфейд СКВОЗНОГО фона компонентом `ZoneToneFlip*`.
- НЕ batch — одна страница за вызов.

---

## 0. Жёсткие запреты (read first)

- НЕ менять контент, порядок и число секций. Только: обёртка-зона + стопка
  bg-слоёв + `ZoneBlobs` + флип-швы + правка `surface` под тон.
- НЕ изобретать фон/переход/блобы. Только готовое из репо:
  - фон: `ds-canvas__bg--lobes`, `ds-canvas__bg--lobes-dark`, `ds-canvas__bg--lobes ds-relight`, `ds-flip-bridge`(+`__glow`), `ds-canvas__spark--{1,2,3}`;
  - швы: `<ZoneToneFlip/>` (`@/components/ZoneToneFlip`), `<ZoneToneFlipReverse/>` (`@/components/ZoneToneFlipReverse`);
  - блобы: `<ZoneBlobs/>` (`@/components/ZoneBlobs`).
  Нужного пресета/направления нет → **останов**, маршрут в `visual-layer-forge`.
- **Hero (StatementHero) ТОЖЕ оборачиваем — он ВНУТРИ зоны.** Hero — не
  own-backdrop: это первая светлая секция прогона, её лёгкий паттерн читается над
  общим `--lobes` фоном (прод-прецедент — methodology оборачивает свой
  StatementHero-герой в ту же `.ds-zone`). Зона начинается С Hero, а не после него.
- НЕ затаскивать в зону секции со СВОИМ непрозрачным full-bleed фоном: **Cinema**
  (`ds-cinema`/видео), **Footer** (`variant="dark"`), любой own-video CTA. ТОЛЬКО
  они снаружи и **рвут ритм**. Hero и все контентные секции — внутрь.
- Зона частичная (есть соседи вне неё) → ВСЕ bg-слои несут `ds-zone__bg--contained`
  (см. рейл про fixed/absolute).
- НЕ перекрашивать бренд-цвет секций, НЕ трогать версии/раскладку.
- НЕ `git commit`/`push`/PR/`.env`; dev-сервер сам не поднимать; `pnpm build` —
  только с разрешения. pnpm, порт 3005.

---

## 1. Источники истины (читать)

- **`web/src/app/trust/methodology/page.tsx`** — ПРОД-эталон: одна `.ds-zone`,
  стопка `--lobes` + `--lobes-dark`(+sparks) + `--lobes ds-relight` +
  `ds-flip-bridge`/`__glow`, два `ZoneBlobs` (banded), `<ZoneToneFlip/>` на §2/§3 и
  `<ZoneToneFlipReverse/>` на §4/§5. Копируй разметку отсюда.
- **`web/src/app/dev/canvas-bg/page.tsx`** — dev-эталон того же приёма (одиночный
  light→dark флип) + комментарии про стопку слоёв.
- `web/src/components/ds/ds.css` — API зоны (`.ds-zone`, `__bg`, `--contained`,
  `--lobes`/`--lobes-dark`, `ds-relight`, `ds-flip-bridge`, `__spark`, `ds-zone__flip-seam`).
- `web/src/components/ZoneToneFlip.tsx` / `ZoneToneFlipReverse.tsx` — что шов ищет
  ближайший `.ds-zone` и кроссфейдит его dark/relight слой по скроллу (`targetSelector`
  переопределяет слой, если в зоне их больше одного).
- `web/src/components/ZoneBlobs.tsx` — пропы `top` / `bottom` (клип-полоса, чтобы
  орбы не лезли на тёмный блок) / `label`; mode `zone` (parallax по своей зоне).
- `web/src/components/ScrollFX.tsx` — флип-швы и блобы на GSAP/ScrollTrigger;
  `<ScrollFX/>` должен быть смонтирован.
- `@/components/ds` prop-типы — публичные `surface` = **light | ink**.

> Расхождение docs ↔ code → source of truth **код** (methodology + ds.css).

---

## 2. Стройматериалы

### 2.1 Стопка фоновых слоёв (первыми детьми зоны, порядок важен — back→front)

```jsx
<div className="ds-zone">
  {/* 1) светлая база — всегда видна */}
  <div className="ds-zone__bg ds-zone__bg--contained ds-canvas__bg--lobes" aria-hidden="true" />
  {/* 2) тёмный слой — opacity:0, его проявляет ZoneToneFlip */}
  <div className="ds-zone__bg ds-zone__bg--contained ds-canvas__bg--lobes-dark" aria-hidden="true">
    <span className="ds-canvas__spark ds-canvas__spark--1" />
    <span className="ds-canvas__spark ds-canvas__spark--2" />
    <span className="ds-canvas__spark ds-canvas__spark--3" />
  </div>
  {/* 3) ТОЛЬКО если есть возврат dark→light: светлый слой поверх тёмного +
        бренд-bridge; их проявляет ZoneToneFlipReverse */}
  <div className="ds-zone__bg ds-zone__bg--contained ds-canvas__bg--lobes ds-relight" aria-hidden="true" />
  <div className="ds-flip-bridge" aria-hidden="true" />
  <div className="ds-flip-bridge__glow" aria-hidden="true" />
  {/* блобы — см. 2.3 */}
  <ZoneBlobs bottom="<клип>" />
  {/* …секции по порядку, со швами между разными тонами… */}
</div>
```

- `--contained` обязателен (частичная зона) — иначе fixed-слой накроет соседей
  (Cinema/Footer) и они пропадут.
- Слой `ds-relight` + `ds-flip-bridge`/`__glow` добавляй **только** если в прогоне
  есть стык ink→light (возврат в свет). Для простого light→dark в конце страницы —
  не нужен.
- спарки — опциональный энхансер тёмного слоя (предлагай, не навязывай).

### 2.2 Флип-швы (переход = кроссфейд сквозного фона)

| Стык | Компонент | Что проявляет |
|---|---|---|
| **light → ink** | `<ZoneToneFlip />` | `--lobes-dark` (тёмный слой 0→1) |
| **ink → light** | `<ZoneToneFlipReverse />` | `ds-relight` + бренд-bridge (свет обратно) |

- Ставится как **сиблинг между секциями** в точке смены тона (см. methodology §2/§3
  и §4/§5). Без пропов в обычном случае; `targetSelector` — только если в зоне
  больше одного тёмного слоя (напр. dark→light→dark, второй тёмный помечен `.ds-redark`).
- Механизм = тот же, что на canvas-bg (кроссфейд сквозного фона через бренд-блум),
  но без bespoke «летящего заголовка» — чистый, переиспользуемый. reduced-motion:
  сразу показывает целевое состояние.
- **Требует `<ScrollFX/>`** на странице (швы на GSAP/ScrollTrigger).

### 2.3 Блобы (летящие орбы поверх светлых полос) — ОБЯЗАТЕЛЬНО

- Рендерь `<ZoneBlobs/>` сразу после bg-слотов, ВНУТРИ зоны.
- **Клипуй орбы прочь с тёмных блоков** через `top`/`bottom` (обёртка
  `overflow:hidden`): `bottom="X%"` оставляет орбы только в верхних `(100−X)%`
  зоны; `top="Y%"` — только в нижних. Если светлые полосы и сверху, и снизу от
  тёмного блока — ставь ДВА `ZoneBlobs` (верхний `bottom=…`, нижний `top=…`), как
  methodology. Если тёмный блок в конце прогона — одного верхнего достаточно.
- Точный % клипа зависит от высот секций (pinned-секции высокие) → выстави оценку
  и **пометь как требующее живой подгонки** (инспектор по `?blobs`).

---

## 3. Pipeline

```
Фаза 1 Resolve   (route → page.tsx; перечислить секции + surface + own-backdrop; section-lab/ds/ScrollFX; импорты)
  → Фаза 2 Segment (own-backdrop Cinema/Footer наружу — рвут ритм; остальное — в ОДНУ зону; назначить тон секций; найти стыки тонов)
  → Фаза 3 Plan    (стопка bg-слоёв под прогон; ZoneBlobs+клип; на каждом стыке — ZoneToneFlip/Reverse; список surface-правок; импорты; инфра)
  → ⛔ GATE (user)  (план ритма: границы зоны + тон секций + швы + блобы; стоп)
  → Фаза 4 Apply   (обернуть прогон в зону, добавить стопку фонов + ZoneBlobs, вставить швы, поправить surface, импорты, домонтировать ScrollFX)
  → Фаза 5 Verify  (static self-check; build/preview только с разрешения)
  → Final Report
```

### Фаза 1 — Resolve
- route → `page.tsx`. Перечисли секции `<main>` по порядку: номер → компонент →
  текущий `surface` → есть ли свой непрозрачный full-bleed фон. Проверь импорты
  (`ZoneToneFlip`, `ZoneToneFlipReverse`, `ZoneBlobs`), `section-lab ds`, `<ScrollFX/>`.

### Фаза 2 — Segment
- **own-backdrop** (ТОЛЬКО Cinema-видео / Footer / own-video CTA) — снаружи зоны,
  рвут прогон. Всё остальное — внутрь, в т.ч. **обязательно оборачиваем Hero
  (StatementHero)**: зона стартует С него. Контентные секции (Statement/Hub/Risk/
  Pinned/Gallery/Bento/Editorial/Numbered/Faq/StatBand) — внутрь.
- Собери максимальный прогон подряд идущих НЕ-own-backdrop секций в ОДНУ зону.
- Назначь тон каждой секции: по умолчанию её текущий `surface`; если просят ритм —
  светлая пачка → тёмная пачка (2–3 секции, как ляжет). Уважай существующий тон, НЕ
  перекрашивай ради ритма (recolor — это page-skin).
- Зафиксируй **стыки тонов**: light→ink → `ZoneToneFlip`; ink→light → `ZoneToneFlipReverse`.

### Фаза 3 — Plan
- Стопка bg-слоёв под прогон (2.1): всегда `--lobes` + `--lobes-dark`; добавь
  `ds-relight`+bridge ТОЛЬКО при наличии ink→light стыка.
- `ZoneBlobs` + оценка клипа под тёмные блоки (2.3).
- На каждый стык — нужный шов (2.2).
- Импорты + `section-lab ds` + `<ScrollFX/>` (нет — добавить; обязательно).

### ⛔ GATE (user)
Покажи `## zone-rhythm <route>` и **стоп**. Без «да» не переписывай.
```markdown
## zone-rhythm <route> · 1 сквозная зона, K флип-швов
**Снаружи (свой full-bleed фон, рвут ритм):** §9 Cinema, Footer
**Зона (§1–§8, один сквозной фон):**
| # | Секция | surface (тон) |
|---|---|---|
| 1 | StatementHero | light |
| … | … | light |
| 6 | EditorialSplit | light |
| 7 | Bento | ink |
| 8 | Gallery | ink |
**Фон-стопка:** --lobes + --lobes-dark(+sparks) [+ ds-relight+bridge если есть ink→light]
**Блобы:** `<ZoneBlobs bottom="~24%"/>` над светлыми §1–6 (клип — подгоню вживую)
**Флип-швы:**
| Стык | Между | Компонент |
|---|---|---|
| T1 | §6 → §7 (light→ink) | `<ZoneToneFlip/>` |
**Инфра:** section-lab ✓ · ds ✓ · ScrollFX ✓ · импорты (добавлю)
**Не меняю:** контент, порядок, число секций, бренд-цвет, версии, surface
### Нужно решение по: ритм тонов ок? спарки в тёмном слое? клип блобов ок?
```

### Фаза 4 — Apply
Только после approve:
- `<main>` несёт `section-lab ds` (нет — добавь). Импортируй `ZoneToneFlip`
  [/`ZoneToneFlipReverse`] и `ZoneBlobs`.
- Оберни прогон в ОДИН `<div className="ds-zone">…</div>`. Первыми детьми — стопка
  bg-слоёв (2.1) + `<ZoneBlobs/>`.
- Поправь `surface` секций под тон (обычно правок 0 — тона уже стоят).
- На каждом тональном стыке вставь `<ZoneToneFlip/>` / `<ZoneToneFlipReverse/>`
  (сиблинг между секциями).
- own-backdrop секции (Cinema/Footer) оставь снаружи зоны нетронутыми.
- Нет `<ScrollFX/>` — добавь в конец. Спарки/доп.блоб-кластеры — по согласованию.

### Фаза 5 — Verify
- Static self-check: `<main>` несёт `section-lab ds`; ОДНА `.ds-zone` вокруг
  прогона; стопка bg-слоёв первыми детьми (все `--contained`; dark + sparks; relight
  только при ink→light); `<ZoneBlobs/>` присутствует с клипом; на каждом стыке стоит
  верный шов; own-backdrop снаружи; `<ScrollFX/>` есть; импорты добавлены. Контент,
  порядок, число секций не изменились.
- `cd web && pnpm build` / preview — **только если user попросил**. Клип блобов и
  длину флипа честно помечай как требующие живой подгонки.

### Final Report
```markdown
## zone-rhythm <route> Complete
### Зона: 1 сквозная (§A–§B) · фон-стопка: <--lobes + --lobes-dark [+ relight/bridge]>
### Флип-швы: <K> (<список: стык → ZoneToneFlip|Reverse>)
### Блобы: ZoneBlobs <клип> (подгонка вживую: да/нет)
### Снаружи (own-backdrop): <Cinema/Footer>
### Импорты + инфра: section-lab/ds/ScrollFX ok
### Verify: static ok | build run|skipped
### Next: подгонка клипа блобов + длины флипа в превью; крафт секций — redraw-block; новый слой — visual-layer-forge
### Not performed: no content/order/count change · no recolor · no new layers forged · no commit/push
```

---

## 4. Рейлы (нерушимо)
- Фон = непрерывная стопка слоёв под ОДНОЙ зоной (не перемычка между раздельными
  зонами); `surface` = только тон. Контент/порядок/число секций — инвариант.
- Только готовое: `--lobes`/`--lobes-dark`/`ds-relight`/`ds-flip-bridge` +
  `ZoneToneFlip`/`ZoneToneFlipReverse` + `ZoneBlobs`. Нужного нет → `visual-layer-forge`.
- Все bg-слои частичной зоны несут `ds-zone__bg--contained`.
- Переход — кроссфейд сквозного фона через `ZoneToneFlip*` (НЕ статичный
  `tr-tone-flip--bloom` div), только на тональных стыках.
- `<ZoneBlobs/>` обязателен над светлыми полосами, клипнут прочь с тёмных блоков.
- Снаружи — ТОЛЬКО own-backdrop (Cinema-видео/Footer); **Hero (StatementHero) и
  все контентные секции оборачиваем ВНУТРЬ зоны — зона стартует с Hero.**
- `<main>` несёт `section-lab ds`; `<ScrollFX/>` смонтирован — обязательно.
- Один user-гейт (план ритма) до перезаписи; одна страница за вызов.
- Не коммитить/push/PR/`.env`; dev-сервер не поднимать; `pnpm build` — с разрешения.

## 5. Связанные
[zone-background](../zone-background/SKILL.md) (ОДНА зона по диапазону — атом) ·
[page-motion](../page-motion/SKILL.md) (переходы/motion в общем случае) ·
[ds-ify-page](../ds-ify-page/SKILL.md) (перевод страницы на DS — ДО зон) ·
[redraw-block](../redraw-block/SKILL.md) (крафт/редизайн секции) ·
[visual-layer-forge](../visual-layer-forge/SKILL.md) (ковка новых слоёв) ·
ПРОД-эталон: `web/src/app/trust/methodology/page.tsx` · dev: `web/src/app/dev/canvas-bg/page.tsx` ·
API: `ds.css` (`.ds-zone`) + `@/components/{ZoneToneFlip,ZoneToneFlipReverse,ZoneBlobs}`.
