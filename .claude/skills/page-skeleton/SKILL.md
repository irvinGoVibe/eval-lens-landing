---
name: page-skeleton
description: "ПРОХОД 1 из 3 расслоённой сборки страницы EvalLense (skeleton → skin → motion). Собирает СТРУКТУРУ одной страницы в нейтрале: route + продуктовый бриф → обязательные секции, порядок, готовые (`ready`) DS-компоненты, ОДНА светлая нейтральная поверхность (light/soft), БЕЗ бренд-цвета и БЕЗ переходов между секциями. Монтирует <ScrollFX/> (видимость DS-компонентов завязана на движок — без него data-reveal остаётся opacity:0 и страница пустая/не скроллится), но сам extra-motion и tr-* НЕ добавляет — встроенные reveal/pin компонентов это норма. На выходе — рабочая читаемая страница, которую легко проверить и итерировать. После Structure Gate структура ЗАМОРАЖИВАЕТСЯ (locked) — раскраску делает page-skin, переходы page-motion. Сам application-код пишет назначенный инженер после user-гейта. Не batch (это build-pages), не раскрашивает, не делает переходы между секциями. Триггеры — /page-skeleton, «собери структуру <route>», «собери страницу в нейтрале», «skeleton <route>», «resume skeleton <route>»."
metadata:
  package: page-build
  role: orchestrator
  pass: 1
  product: EvalLense
  pipeline: [page-skeleton, page-skin, page-motion]
  consumes: [component-library-preparer manifests]
  routes_to: [component-forge, primitive-layer-forge, component-library-preparer]
---

# page-skeleton — проход 1: структура в нейтрале

Ты — **дирижёр первого прохода** расслоённой сборки страницы. Твоя и только твоя
задача — собрать **смысловую структуру** страницы: правильные секции, правильный
порядок, правильный контент, в **одной светлой нейтральной поверхности**, на
готовых DS-компонентах. **Никакого бренд-цвета, никаких переходов между секциями,
никакой анимации** — это следующие проходы.

```text
один запуск = структура одной страницы в нейтрале
skeleton (этот скилл) → skin (page-skin) → motion (page-motion)
```

> **Зачем расслоение.** Старый `page-composer` решал контент + раскладку + цвет +
> переходы + motion в один гейт — если переходы выходили плохими, нельзя было
> поправить только их. Здесь каждый слой — отдельный проход с отдельным гейтом и
> общим state-файлом. Этот проход даёт **читаемую страницу-баланс**, на которой
> видно структуру без отвлекающего декора. `page-composer` остаётся как есть (§9).

---

## 0. Жёсткие запреты (read first)

Наследуются от `page-composer` §0 (см. [page-composer](../page-composer/SKILL.md) §0)
**плюс** запреты этого прохода:

- **не вводить бренд-цвет** (`--violet`/`--cyan`/`--dsc-*`/градиенты/неон/glow) —
  только нейтральные токены поверхностей (`--bg`/`--bg-soft`) и текста;
- **не ставить переходы между секциями** (`tr-*`) — стыки нейтральные (переходы — это page-motion);
- **не добавлять СВОИ motion-атрибуты** сверх тех, что DS-компоненты эмитят сами
  (`data-reveal`/`data-scrub`/`data-pin` внутри `StatementHero`/`Numbered`/`Gallery`/
  `PinnedSteps`/… — это их встроенное поведение, оставляем как есть); новый scroll/
  ambient слой и тюнинг — page-motion;
- **`<ScrollFX/>` МОНТИРОВАТЬ обязательно** (после `<Footer/>`): видимость DS-компонентов
  завязана на движок — `[data-reveal]{opacity:0}` снимается только классом `.is-in`,
  который вешает ScrollFX; без него страница пустая и не скроллится (замок `#hero`).
  Это НЕ «добавление motion» — это включение видимости; extra-эффекты не добавляем;
- **не выбирать тему light/dark и не выбирать стиль** — это вопрос page-skin;
- импортировать и называть **только** `@/components/ds` (никаких `Lab*`/`_kit`/
  `sections/lab/*`); контейнер — `<main className="section-lab ds">`;
- недостающую DS-секцию/атом/каркас → **gap в forge** (§7 page-composer), не лепить
  локально и не импортировать Lab в обход;
- манифесты руками не править; новых зависимостей не вводить; другие страницы не
  трогать; `git commit`/`push`/PR/deploy/`.env*` — нельзя.

Сервер/браузер — **только в Ф6 (Skeleton QA)**, по правилу CLAUDE.md preview сам не
стартует; разрешение даёт approve Structure Gate (Ф5) либо уже запущенный сервер.
pnpm only, порт **3005**, порт не менять.

---

## 1. Нейтрал этого прохода (нерушимо)

**Дефолтный нейтрал — светлый (`light`/`soft`).** База страницы — `--bg`; вторичные
секции/карточки — `--bg-soft`. Текст — стандартный тёмный (`--fg`/`--fg-muted`).
Геометрия в DS **surface-invariant** (`SectionFrame`: *«geometry is surface-invariant
within a version, light ≡ ink, only colour flips»*) — значит структура, собранная в
светлом нейтрале, без изменения раскладки потом перекрашивается page-skin'ом в любую
тему (включая dark).

Разрешённое разнообразие в нейтрале — **только** для читаемости структуры:
- чередование `--bg` / `--bg-soft` как мягкая группировка (не «зебра», не драма);
- разный масштаб/плотность секций (scale/density) — это структура, а не цвет;
- нейтральные разделители (hairline `--border`), **без** градиентов и glow.

Всё, что про цвет, surface-драматургию (`ink`-пики), бренд-акценты, переходы и
анимацию — **отложено** и записано как намерение для следующих проходов, но **не
реализовано** здесь.

---

## 2. Вход, resolve, контент, библиотека, план

Эти стадии **идентичны** `page-composer` — переиспользуй по ссылке, не дублируй:

| Стадия | Источник правил |
|---|---|
| Ф0 Resolve (route → page.tsx; ⛔ спросить источник контента) | [page-composer](../page-composer/SKILL.md) §2 |
| Ф1 Current Page Analysis | page-composer §5 Ф1 |
| Ф2 Content Map (весь контент брифа, факты дословно) | page-composer §5 Ф2 |
| Ф3 Library Match (только `ready`, compose-mode aware) | page-composer §3 + §5 Ф3 |
| Ф4 Reconstruction Plan (стратегия на секцию) | page-composer §5 Ф4 |
| Gap Routing (нет ассета → forge, не локально) | page-composer §7 |
| Ростер агентов / task packets | page-composer §4 |

**Отличие:** на стадии resolve этот скилл **НЕ спрашивает тему/стиль** (Ф0.5
page-composer здесь не выполняется — это вопрос page-skin). Спрашивается только
целевая страница и источник контента.

---

## 3. Pipeline (структура, draft-first)

```
Ф0 Resolve (route + ⛔ источник контента) → Ф1 Current Page Analysis
→ Ф2 Content Map → Ф3 Library Match → Ф4 Reconstruction Plan
→ Ф4.5 Structure Composition (порядок/масштаб/плотность; +ui-ux-pro-max на иерархию)
→ ⛔ STRUCTURE GATE (user) — секции/порядок/стратегия/нейтрал; стоп
→ Ф5 Implementation (нейтральная page.tsx) → Ф6 Skeleton QA (3005, fix loop ≤3)
→ Lock структуры + handoff packet → Final Report
```

### Ф4.5 — Structure Composition
Только **структурный** ритм: порядок секций (уже задан брифом), масштаб (compact/
standard/large), плотность, чередование текст/визуал, нейтральные паузы. Оркестратор
зовёт advisory **Skill `ui-ux-pro-max`** — но **только** на иерархию/scale/density/
mobile rhythm, **не** на цвет/surface-драму/переходы. Опора —
`wiki/architecture/page-design-patterns.md`.

```yaml
structure_composition:
  sections:
    - section_id:
      scale: compact | standard | large
      density: low | medium | high
      neutral_surface: bg | bg-soft        # только нейтраль, не ink
      visual_role: statement | evidence | process | comparison | conversion | pause
  intended_for_later:                       # ЗАПИСАТЬ, НЕ реализовывать
    skin_hint:                              # где напрашивается ink-пик/акцент (для page-skin)
    motion_hint:                            # где напрашивается reveal/scrub (для page-motion)
```

`intended_for_later` — это **подсказки** следующим проходам, не обязательства.
page-skin и page-motion вольны их переопределить.

### ⛔ STRUCTURE GATE (user)
Показать план (§4) и **остановиться**. User подтверждает секции/порядок/стратегию/
нейтрал. Application code — только после `подтверждаю`/`реализуй`/`approved`.
Состояние → `waiting-for-structure-approval`.

### Ф5 — Implementation (нейтральная page.tsx)
После approve — `multi-platform-apps-frontend-developer` (один writer): обновляет/
создаёт `page.tsx`, вставляет тексты брифа, импортирует секции/атомы **только из
`@/components/ds`** (доступные exports/props/slots), контейнер
`<main className="section-lab ds">`, все секции в **нейтральной светлой поверхности**.
**Не** добавляет цвет/градиенты/переходы между секциями (`tr-*`) и СВОИ extra-motion-
атрибуты. **`<ScrollFX/>` МОНТИРУЕТСЯ** один раз после `<Footer/>` (импорт
`@/components/ScrollFX`) — это включает видимость DS-компонентов, а не «добавляет
motion» (см. ⚠️ ниже). Встроенные `data-reveal`/`data-pin`/`data-scrub` компонентов —
их штатное поведение, оставляем как есть. Состояние → `implementation`.

> **⚠️ Почему ScrollFX обязателен (видимость = движок).** В нашей библиотеке движение
> — это механизм видимости, не декор. DS-компоненты (под капотом `Lab*`) эмитят
> `data-reveal` внутри себя; `globals.css` задаёт `[data-reveal]{opacity:0}` и снимает
> это только классом `.is-in`, который вешает **`ScrollFX`** (IntersectionObserver).
> Плюс глобальный замок `body:not(.hero-ready):has(#hero){overflow:hidden}` блокирует
> скролл, пока ScrollFX не повесит `.hero-ready`. Итог: **без `<ScrollFX/>` страница
> пустая (всё `opacity:0`, кроме форс-видимого hero) и не скроллится.** Поэтому скелет
> ScrollFX монтирует. Это не противоречит «нейтралу»: не добавляем цвет, переходы между
> секциями и свой ambient — только включаем то, что нужно компонентам, чтобы
> отрендериться. (Историческая заметка: ранняя версия скилла пыталась быть «статичной
> без ScrollFX» — это ломало рендер; см. memory `hero-id-scroll-lock`.)

### Ф6 — Skeleton QA (+ fix loop ≤3)
Поднять preview `web` (3005) — разрешение от approve гейта либо уже запущенный сервер.
Ширины `1440 / 1280 / 768 / 375`. Проверить:

- route открывается; **console errors = 0**;
- **весь контент брифа присутствует**; порядок обязательных секций сохранён;
- **нейтрал чист:** нет бренд-цвета/градиентов/glow; нет переходов между секциями (`tr-*`);
  не добавлено СВОИХ motion-атрибутов сверх встроенных в DS-компоненты;
- **`<ScrollFX/>` смонтирован** → страница скроллится и весь контент проявляется (ничего
  не залипло на `opacity:0`); встроенные reveal/pin компонентов работают — это норма;
- text contrast; **page-level horizontal overflow = 0** на всех ширинах;
- нет незарегистрированных локальных копий library-ассетов; импорт только `@/components/ds`.

Учитывать gotchas памяти: `section-lab-preview-scroll-gotcha` (mid-page блоки —
`preview_inspect`/`preview_eval`, не скролл-скриншоты), `preview-globals-css-stale-cache`
(правки globals.css → `rm -rf web/.next` + рестарт preview). Read-only параллельно —
`ui-visual-validator` (структура/иерархия), `accessibility-expert`. Fail → fix loop тому
же writer'у (только проваленное), **≤3**; после 3 → `blocked-after-three-fix-cycles`.

### Lock + handoff
После QA pass: `skeleton.locked = true`. Записать **handoff packet** (§5) для page-skin.
Состояние → `skeleton-locked`.

---

## 4. Structure Gate — план (формат)

```markdown
## Page Skeleton Plan — <route>  (проход 1/3: структура в нейтрале)

### Target
- Document: · Route: · Existing page: <existing|missing> · compose_mode: <…>

### Required sections (order from brief)
| # | Purpose | Content source | Strategy | DS component / gap |

### Structure composition
| # | Section | Scale | Density | Neutral surface (bg/bg-soft) | Visual role |

### Intended for later passes (NOT built now)
- skin hints (где напрашивается ink-пик/акцент): …
- motion hints (где напрашивается reveal/scrub): …

### Gaps
- component gaps (→ component-forge / primitive-layer-forge): …

### Files expected to change
- web/src/app/<route>/page.tsx

### Validation plan
- widths 1440/1280/768/375 · console=0 · overflow=0 · content complete · ScrollFX mounted (all content visible, page scrolls) · neutral-clean (no brand color, no section transitions, no added motion)
```

После — **стоп** до явного подтверждения.

---

## 5. Общий state и handoff (контракт всех трёх проходов)

`.claude/runs/page-build/<run-id>/state.json`, `<run-id>` = `<YYYYMMDD-HHMM>-<route-slug>`.
**Один файл на страницу, общий для skeleton/skin/motion.** Каждый проход пишет свой блок
и уважает `skeleton.locked`.

```yaml
page_build:
  route: ; document: ; page_source:
  updated_at:                  # timestamp передаётся снаружи; дату в скрипте не генерировать
  skeleton:
    status:                    # building | waiting-for-structure-approval | implementation | QA | skeleton-locked | blocked
    sections:                  # id, purpose, strategy, ds_component, props_slots, order
    chrome: { header:, footer: }
    neutral_surface: light-soft
    intended_for_later: { skin_hint:, motion_hint: }
    locked:                    # true после Skeleton QA pass — skin/motion НЕ меняют секции/порядок/контент
  skin:    { status: pending }   # заполняет page-skin
  motion:  { status: pending }   # заполняет page-motion
```

Статусы блокеров: `design-conflict · blocked-after-three-fix-cycles · gap-unapproved`.
Resume: `/page-skeleton "resume <route>"` — загрузить state, продолжить с фазы.

**Инвариант передачи:** page-skin и page-motion стартуют только при
`skeleton.locked == true`. Если структура не залочена — они обязаны вернуть user к
page-skeleton, а не чинить структуру сами.

---

## 6. Final Report

```markdown
## Page skeleton built — <route>  (проход 1/3)

### Sections (order preserved, neutral)
| # | Purpose | Strategy | DS component / local | Neutral surface |

### Content fidelity
- all brief sections present: · facts unchanged: · open questions: …

### Neutral-clean check
- no brand color: · no section-to-section transitions (tr-*): · no ADDED motion attrs: · ScrollFX mounted (visibility engine): · page scrolls & all content visible:

### QA
- widths 1440/1280/768/375: · console: 0 · overflow: 0 · fix cycles: <n>/3

### Handoff
- skeleton.locked: true · state: .claude/runs/page-build/<run-id>/state.json
- next: page-skin (тема + стиль), затем page-motion (переходы + анимация)

### Files changed
- web/src/app/<route>/page.tsx

### Actions not performed
- no brand color · no section transitions (tr-*) · no added motion (ScrollFX mounted only for visibility) · no theme/style chosen · no manifest hand-edit
- no other pages changed · no commit/push/PR/deploy
```

---

## 7. Рейлы (нерушимо)

- Одна страница за запуск; не batch.
- Сохранять все обязательные секции, смысл, факты, порядок (page-composer §1).
- **Только нейтрал (light/soft):** ноль бренд-цвета, ноль переходов между секциями
  (`tr-*`), ноль СВОИХ motion-атрибутов; но `<ScrollFX/>` смонтирован (видимость) — всё остальное в
  следующих проходах; намерения записать в `intended_for_later`, не реализовывать.
- Импорт только `@/components/ds`; недостающее → forge, не локально; манифесты не править.
- После QA pass — `skeleton.locked = true`, handoff в общий state.
- Сервер/браузер — только Ф6; pnpm, порт 3005; не commit/push/PR/deploy; `.env*` не трогать.
- Стоп на Structure Gate до явного решения.

## 8. Связь с page-skin / page-motion / page-composer
[page-skin](../page-skin/SKILL.md) — проход 2 (тема light/dark + стиль; surface+цвет) ·
[page-motion](../page-motion/SKILL.md) — проход 3 (переходы `tr-*` + анимация ScrollFX).
[page-composer](../page-composer/SKILL.md) — монолитный оркестратор «всё за раз»,
**остаётся как есть**; этот pass-pipeline — параллельная управляемая альтернатива.
Опора: `wiki/architecture/page-design-patterns.md` · `design-system.md` ·
`component-library.md` · `wiki/product/_page-template.md`.
