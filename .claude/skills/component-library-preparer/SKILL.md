---
name: component-library-preparer
description: "Служебный skill: инспектирует ЖИВУЮ UI-библиотеку сайта EvalLense и готовит из неё нормализованный source of truth для page-composer / build-pages. Сверяет docs ↔ Section Lab ↔ фактический код, классифицирует ассеты по слоям (tokens · atoms · layouts · lab-sections · production-sections · chrome · newsroom · social · backgrounds · transitions · motion), формирует строгие consumption contracts и machine-readable manifests, фиксирует docs/code-конфликты и readiness. САМ не собирает страницы, не редизайнит, не извлекает компоненты, не коммитит — только анализ, валидация, contracts/manifests/docs. Режимы: full и incremental single-target — принимает указатель на ОДИН объект (имя компонента / путь к файлу / «ссылку» на объект / описание места) и добавляет/обновляет только его в библиотеке, не прогоняя всё заново. Триггеры — /component-library-preparer, «подготовь библиотеку компонентов», «добавь в библиотеку <объект>», «обнови consumption contract <Component>», «вот ссылка на новый блок — внеси в библиотеку», «проинспектируй section-lab для page-composer», «library preparer full»."
metadata:
  package: component-library
  role: service
  product: EvalLense
  consumers: [page-composer, build-pages, component-forge, forge-index]
---

# component-library-preparer — Library Source-of-Truth Preparer

Служебный (не дизайнерский) skill. Его задача — **проинспектировать всю живую
UI-библиотеку, сверить её с документацией и Section Lab, и сформировать
нормализованные consumption contracts + manifests**, которыми потом пользуются:

- `page-composer` — выбирает блоки только из готового инвентаря;
- `build-pages` — собирает страницы из подтверждённых контрактов;
- `component-forge` — закрывает выявленные component-API-gaps;
- `forge-index` — дёргает incremental-refresh после регистрации нового архетипа;
- Library Auditor / Background & Transition Director — короткие воркеры, читающие
  уже нормализованные контракты.

Skill **не живёт как постоянный агент**: он готовит и обновляет библиотеку, а
оркестраторы просто читают результат.

---

## 0. Жёсткие запреты (read first)

Skill только анализирует и пишет contracts/manifests/docs. **Нельзя**:

- менять application-код `web/src/**` (DS-баррель `@/components/ds`, deprecated
  субстрат `Lab*`/`_kit`, Footer, PageHeader, Newsroom, ui/*);
- извлекать новые DS-атомы/DS-секции в `@/components/ds`/`ds.css`, генерировать backgrounds;
- пересобирать страницы, запускать `component-forge` / `primitive-layer-forge` /
  `build-pages` / `visual-layer-forge`;
- создавать visual layers / backgrounds / transitions / recipes, извлекать компоненты
  в чистый DS, редизайнить страницы (это работа forge / visual-layer-forge);
- запускать `cd web && pnpm build` без отдельного разрешения пользователя;
- стартовать dev-сервер самостоятельно (правило CLAUDE.md — preview только по
  явной просьбе; использовать уже запущенный либо `preview_start name=web`,
  порт **3005**);
- `git commit` / `git push` / создавать PR.

Единственное исключение для правки `web/src/**` — пользователь отдельно
подтвердил конкретный docs/code-fix. По умолчанию gap уходит в forge (секция →
`component-forge`, атом/каркас → `primitive-layer-forge`), который **извлекает
чистый DS-компонент** в `@/components/ds` + `ds.css`, а не правится здесь и **не**
оборачивает/копирует `Lab*`.

---

## 1. Главный принцип — библиотека шире, чем `Lab*`

> **Канон публичного API (нерушимо).** ЕДИНСТВЕННЫЙ публичный API библиотеки —
> баррель `@/components/ds` (чистые prefix-free имена: `StatementHero` · `Bento` ·
> `FullStatement` · `Gallery` · `PinnedSteps` · `Eyebrow` · `Title` · `Media` ·
> `Button`, + по мере расковки) + scope `.ds` (светлый язык) + `ds.css`. Манифесты
> и contracts **экспонируют именно эти DS-публичные имена/ID**. `Lab*`
> (`sections/lab/Lab*.tsx`) · `_kit.tsx` (`LabEyebrow`/`LabTitle`/`MediaPlaceholder`)
> · CSS `.lab-*` · scope `.section-lab` — **deprecated внутренний субстрат**, который
> баррель оборачивает; в манифестах он фигурирует только как внутренний
> `source`/implementation с пометкой `deprecated`. NORTH-STAR — убрать субстрат
> целиком (см. [[design-system]] §«Дизайн-система — `@/components/ds`»).

Нельзя считать библиотекой только `web/src/components/sections/lab/Lab*.tsx`.
Фактическая библиотека EvalLense включает все слои ниже. Skill обязан найти их
**по фактическому коду** и **не выдумывать** отсутствующие компоненты. Колонка
«Где искать» — это физический source (в т.ч. deprecated субстрат); manifest-имя/ID
всегда DS-публичное.

| # | Слой | Где искать (подтверждено в репо) |
|---|---|---|
| L1 | Design tokens | `web/src/app/globals.css` (`:root`, `@theme inline`) + `ds.css`/`.ds`, `.claude/designs/evallense/`, `wiki/architecture/design-system.md` |
| L2 | Global UI primitives | `web/src/components/ui/` (сейчас только `Button.tsx`, в барреле как `Button`), глассы/чипы/карточки в `globals.css` |
| L3 | DS atoms | публичные `@/components/ds`: `Eyebrow`/`Title`/`Media`; **deprecated source** — `web/src/components/sections/lab/_kit.tsx` (`LabEyebrow`/`LabTitle`/`MediaPlaceholder`) |
| L4 | Layout primitives | DS-каркасы в `@/components/ds` — **пока нет**; deprecated кандидат-source `web/src/components/sections/lab/_layout.tsx` **сейчас ОТСУТСТВУЕТ** (см. §4) |
| L5 | DS sections | публичные `@/components/ds` (`StatementHero`/`Bento`/`FullStatement`/`Gallery`/`PinnedSteps` + по мере расковки); **deprecated source** — `web/src/components/sections/lab/Lab*.tsx` (16 шт.) |
| L6 | Production sections | `web/src/components/sections/*.tsx` (Hero, BentoHorse, CtaBand, Trust, …) |
| L7 | Page chrome | `PageHeader.tsx`, `SiteHeader.tsx`, `Footer.tsx`, `HeaderThemeSync.tsx` |
| L8 | Navigation | `web/src/lib/site-nav.ts` |
| L9 | Newsroom / blog | `web/src/components/blog/*` (`AllNewsGrid`, `ArticleCard`, `CategoryTag`, `InTheLoop`, `MoreFromNewsroom`), `web/src/lib/blog*.ts`, `web/src/lib/cms/` |
| L10 | Social | внутри `Footer.tsx` / contact-страницы / newsroom (фиксировать embedded vs candidate) |
| L11 | Media primitives | DS `Media`; **deprecated source** — `MediaPlaceholder` (`_kit.tsx`), media-слоты в `Lab*` |
| L12 | Motion primitives | `ScrollFX.tsx`, `ScrollOrchestrator.tsx`, `data-reveal`/`data-scrub`/`data-pin` |
| L13 | Background primitives | `globals.css`/`ds.css` surfaces/gradients/glows, `OrangeGlow.tsx`, `UnicornScene/Stage.tsx`, `MistBridge.tsx` |
| L14 | Transition primitives | `MistBridge.tsx`, shared-layer/scrim паттерны между секциями |
| L15 | Composition recipes | `.claude/library/component-library/recipes.json` — комбинации `surface + background + transition + motion` (ссылки на ID L13/L14/L12); авторит `visual-layer-forge` |

> Реальные пути имеют приоритет. Если что-то в репо отличается от этого списка —
> использовать фактический путь и пометить расхождение в `conflicts`. Манифест-имя/ID
> объекта L3/L5 — DS-публичное; `Lab*`/`_kit`-путь идёт в `source` с `deprecated`.

---

## 2. Источники истины (читать, что существует)

**Проектные:** `CLAUDE.md`, `PROJECT-ENTRYPOINT.md`, `Home.md`, `wiki/index.md`,
`wiki/processes/process.md`, `wiki/processes/agent-workflow.md`.

**Архитектура/дизайн:** `wiki/architecture/design-system.md`,
`page-design-patterns.md`, `section-types.md`, `component-library.md`, `system.md`
(+ при необходимости `footer.md`, `cta-band.md`, `blog.md`, `cms.md`).

**Forge:** `.claude/skills/component-forge/SKILL.md`, `forge-primitives`,
`forge-craft`, `forge-extract`, `forge-validate`, `forge-index`.

**Page building:** `.claude/skills/build-pages/SKILL.md`.

**Section Lab:** `web/src/app/dev/section-lab/page.tsx`,
`web/src/components/sections/lab/**`.

**Shared UI / chrome / motion / nav:** `web/src/components/ui/**`,
`PageHeader.tsx`, `SiteHeader.tsx`, `Footer.tsx`, `ScrollFX.tsx`,
`ScrollOrchestrator.tsx`, `HeaderThemeSync.tsx`, `web/src/lib/site-nav.ts`.

**Newsroom/blog:** `web/src/app/blog/**`, `web/src/components/blog/**`,
`web/src/lib/blog*.ts`, `web/src/lib/cms/**`.

**Production pages & sections:** `web/src/app/**/page.tsx`,
`web/src/components/sections/**`.

**Стили/дизайн:** `web/src/app/globals.css`, `.claude/designs/evallense/**`.

> Документация generated и основана одновременно на style guide и фактическом
> коде → preparer **обязан** сверять docs ↔ code и сохранять конфликты, а не
> молча выбирать одну сторону.

---

## 3. Первый проход — AUDIT без изменений (обязательная остановка)

В full-mode сначала вывести audit и **остановиться на подтверждение**. Никаких
файлов до явного «да».

```markdown
## Component Library Preparation Audit

### Sources inspected
| Source | Exists | Role | Notes |

### DS sections (public name; Lab* = deprecated source)
| DS name | Source path (deprecated Lab*) | Rendered in lab | Versions | Surfaces | Status |

### DS atoms (public name; _kit = deprecated source)
| DS atom | Source (deprecated _kit) | Props | Reused by |

### Layout primitives (DS shells)
| Layout | Source | Exists | Reused by |

### Page chrome
| Component | Source | Role |

### Newsroom and social
| Component | Source | Role | Reusable |

### Background and transition primitives
| Primitive | Source | Type | Reusable |

### Docs ↔ code conflicts
| Area | Documentation says | Code says | Recommended source of truth |

### Library readiness gaps
| Gap | Severity | Required action |

### Proposed files
| Path | Create/update | Purpose |
```

После audit показать draft и ждать подтверждения перед записью manifests/docs.

---

## 4. Layout layer — честный статус (КРИТИЧНО)

DS-каркасов в публичном `@/components/ds` **сейчас нет**, и их deprecated
кандидат-source `web/src/components/sections/lab/_layout.tsx` **в репозитории тоже
нет** (конфликт **CL-001**). Документация может обещать `Band / Wrap / SplitGrid /
BentoGrid / GalleryRail / PinnedStage`, но в manifest их класть **только если DS-export
реально есть**.

Если документация описывает layout layer, а DS-export/файла нет:

```yaml
conflict_id: CL-001
status: documented-missing
severity: blocker-for-atom-composition
```

Skill объявляет один из двух режимов компоновки для page-composer. Единица в обоих
режимах — публичный `@/components/ds`; различается только гранулярность:

```text
whole-sections-only   # дефолт: сборка из целых DS-секций (@/components/ds) —
                      # пока нет подтверждённого DS-каркасного слоя
atoms-and-layouts     # сборка из DS-атомов + DS-каркасов — только когда
                      # каркасы реально вынесены в @/components/ds (extract via
                      # primitive-layer-forge), не из выдуманных _layout exports
```

До появления подтверждённого DS-каркасного слоя page-composer **не должен** собирать
смешанные блоки из выдуманных каркасов — только цельные DS-секции. Недостающий каркас
— это GAP: `primitive-layer-forge` **извлекает чистый DS-каркас** в `@/components/ds`
+ `ds.css` (не оборачивая `_layout`/`Lab`).

То же про L3 DS-атомы (конфликт **CL-002**): публично выкованы `Eyebrow`/`Title`/
`Media`; их deprecated source `_kit.tsx` сейчас экспортирует ровно `LabContentMode`,
`LabContentSet<T>` (типы), `LabEyebrow`, `LabTitle`, `MediaPlaceholder`. Не
предполагать более широкую атомарную систему — фиксировать фактические exports.
Недостающие DS-атомы (`Card`/`Chip`/`Stat`/`Ring`/`Bars`/`ListItem`) — это GAP:
`primitive-layer-forge` **извлекает их в чистый DS** (`@/components/ds` + `ds.css`),
а не в `_kit`.

---

## 5. Слои и форматы контрактов

Каждый reusable asset классифицируется ровно в один слой и описывается по
соответствующему шаблону. Поля брать из **реального кода**, не из ожиданий.

### L1 — Tokens
```yaml
token: { name, category, css_value, documented_value,
  status: confirmed|conflict|undocumented, usage }
```
Категории: `color surface typography spacing radius shadow gradient motion
z-index container`.

### L2 — Global UI primitives
```yaml
primitive: { name, source, export, props, variants, themes,
  accessibility, dependencies, best_for, constraints }
```
> Glass-кнопка: `<Button variant="glass">` обязана рендерить общий liquid-glass
> материал (группа селекторов в `globals.css`). Фиксировать это как constraint —
> не описывать как локальный one-off.

### L3 — DS atoms
Manifest-имя — DS-публичное (`Eyebrow`/`Title`/`Media`); `source` указывает на
deprecated `_kit.tsx` export (`LabEyebrow`/…) с пометкой `deprecated`. Для каждого
фактического атома: content role, visual role, required/optional props, motion
support, theme behavior, known consumers. Недостающий DS-атом
(`Card`/`Chip`/`Stat`/`Ring`/`Bars`/`ListItem`) → `component-api-gap` →
`primitive-layer-forge` извлекает в чистый DS, не в `_kit`.

### L4 — Layout primitives (DS shells)
Только реально существующие DS-export (см. §4). Иначе `documented-missing` (CL-001).

### L5 — DS sections — полный consumption contract
Manifest `name`/`export_name` — DS-публичные (`StatementHero`/`Bento`/…);
`source_path` указывает на deprecated `Lab*.tsx` с пометкой. Недостающая DS-секция
(~13 ещё не в барреле) → `component-api-gap` → `component-forge` извлекает чистый DS.
```yaml
component:
  name: ; archetype_id: ; label: ; source_path: ; export_name: ;
  registry_status: ; production_ready:
  versions: { available, default, differences }
  surfaces: { available, geometry_shared, theme_notes }
  props:
    - { name, type, required, default, semantic_role, capacity, example }
  content_capacity: { eyebrow, heading, body, bullets, metrics, table, faq, media, cta }
  media: { supported, modes, aspect_ratios, light_dark_sources, mobile_sources, poster, fallback }
  motion: { reveal, scrub, pin, horizontal_scroll, reduced_motion }
  responsive: { desktop, tablet, mobile, known_breakpoints }
  backgrounds: { owns_background, supported_strategies, can_inherit, can_overlap, known_constraints }
  best_for: [ ... ]
  unsuitable_for: [ ... ]
  known_issues: [ ... ]
  readiness:
    rendered_in_section_lab: ; browser_qa: ; build: ; light_dark: ;
    responsive: ; overflow: ; consumption_contract:
  composition_access:
    whole_section: { importable: , export_name: }
    exported_atoms: [ ]
    exported_fragments: [ ]
    slots: [ ]
    internal_fragments:
      - { name: , importable: false, extraction_candidate: , reason: }
    supported_strategies: [ props, slot, version, whole-section, page-local ]
    unsupported_strategies: [ ]
  variation_policy:
    props_supported: ; slots_supported: ; versions_supported: ; page_local_allowed:
    new_archetype_required_when: [ ]   # layout / reading-order / motion-model change
  registration: { status: pending|completed|failed, registered_by: component-library-preparer, manifest: , target_id: , checked_at: }
  build: { status: passed|failed|dev-compiled|not-run|stale, evidence_source: , commit_sha: , checked_at: }
```

> **composition_access / variation_policy** (§27): preparer фиксирует internal
> fragments, но не объявляет их importable и сам не извлекает; нет нужного slot/
> export → `component-api-gap` (forge извлекает **чистый DS**, не оборачивает `Lab`).
> Page Orchestrator видит только фактические DS exports/slots — прямой импорт
> `Lab*`/`_kit` в коде страниц запрещён. Логика вариаций: контент→props ·
> внутренний visual→slot · подача→version · layout/reading/motion→new archetype ·
> уникальная сцена→page-local на DS-токенах/`.ds`.

### 5.1 — L15 Composition recipe (нормализованный контракт)

Recipe — проверенная комбинация поверхность+фон+переход+motion (ID из L13/L14/L12),
не page template и не компонент. Авторит `visual-layer-forge`; preparer нормализует
его поля в эту модель — **второй формат не вводить**.

```yaml
recipe:
  id:            # recipe-<slug>
  name: ; purpose:
  source:        # visual-layer-forge | manual | page-derived
  sequence:
    - section_surface: light|soft|ink
      background:        # background ID из backgrounds.json | none
      transition_after:  # transition ID из transitions.json | none
      motion:            # motion ID из motion.json | static
  dependencies: { backgrounds: [ ], transitions: [ ], motion: [ ] }   # выводятся из sequence → реальные ID
  best_for: [ ]
  unsuitable_for: [ ]    # нормализация vlf `avoid_when`
  responsive: ; mobile_fallback: ; reduced_motion:   # worst-case по контрактам участников
  known_constraints: [ ]
  dependency_status: { status: valid|incomplete|stale|missing, missing: [ ], conditional: [ ], needs_recheck: [ ] }
  registration: { status: pending|completed|failed, registered_by: component-library-preparer, manifest: recipes.json, target_id: , checked_at: }
  readiness: { contract_complete: , dependency_check: , browser_qa: , registration: }
  consumption_readiness: { status: ready|conditional|unavailable, reasons: [ ], allowed_consumers: [ page-composer, build-pages ], restrictions: [ ] }
```

Маппинг `visual-layer-forge §8.4 → preparer`: `avoid_when → unsuitable_for`;
`sequence` копируется; `dependencies/*` собираются из `sequence`; `mobile_fallback`/
`reduced_motion` — worst-case по участникам. Recipe `ready` только если ВСЕ участники
`ready` И `registration.status: completed` (§24, §25).

---

## 6. Readiness — registry-строки недостаточно

Компонент доступен page-composer только когда **одновременно**: source exists,
export exists, rendered in Section Lab, props parsed, versions confirmed,
surfaces confirmed, browser QA confirmed, build confirmed, responsive confirmed,
Light/Dark confirmed, horizontal-overflow confirmed, media-contract known,
consumption contract complete.

Итоговый статус компонента:
`production-ready | conditionally-ready | draft | blocked | registry-code-conflict`.

```yaml
consumption_readiness:
  status: ready | conditional | unavailable
  reasons: [ ... ]
  allowed_consumers: [ page-composer, build-pages ]
  restrictions: [ ... ]
```

`page-composer` получает **только `ready`**. `conditional` — лишь при явно
описанном fallback. Нельзя помечать `production-ready` по одной static code
inspection без browser QA.

### 6.1 — Registration gate
`consumption_readiness.status: ready` **запрещён**, пока `registration.status !=
completed` (формат `registration` — §5/§25). Частичная запись manifests/docs →
`registration: failed` + `consumption_readiness: conditional` + причина в отчёте (§19.2).

### 6.2 — Build evidence
`dev-compiled ≠ passed`. Preparer сам `pnpm build` не запускает; читает evidence от
forge-validate / CI / прошлого build-report / явного user-approved build:
```yaml
build: { status: passed|failed|dev-compiled|not-run|stale, evidence_source: , commit_sha: , checked_at: }
```
Readiness честно отражает тип evidence — не помечать `passed` по dev-компиляции.

---

## 7. Section Lab как живой каталог (deprecated субстрат, рендерит DS-секции)

`http://localhost:3005/dev/section-lab` — live visual catalog. Это deprecated
`.section-lab` стенд, на котором рендерится субстрат `Lab*`, оборачиваемый
DS-секциями; QA здесь подтверждает рендер именно DS-секции (manifest-имя DS, не
`Lab*`). Использовать **уже запущенный** preview или поднять `preview_start name=web`
(порт 3005), не менять порт. Учитывать gotcha: в headless-preview скролл на
`/dev/section-lab` сбрасывается в 0 — mid-page блоки проверять через
`preview_inspect` / `preview_eval` / canvas-сэмплинг, а не скролл-скриншотами.

Для каждого блока: найти компонент в коде → найти DOM-блок → проверить версии
v1/v2/v3 → Light/Dark → content mode → media → desktop/tablet/mobile →
horizontal overflow → motion/reduced-motion → снять reference-скриншот.

Скриншоты — в `.claude/library/component-library/screenshots/` (или существующий
проектный путь, если он есть; не плодить второй registry скриншотов).

---

## 8. Production sections тоже индексируются

Пройти `web/src/components/sections/**` и `web/src/app/**/page.tsx`. Для каждого
production-блока определить отношение к библиотеке.

```yaml
production_block:
  route: ; source: ; visual_role: ; closest_lab_component: ;
  similarity: ; differences: ; atoms_used: ;
  reusable_as_is: ; should_extract: ; should_remain_local:
```

Классификатор отличий (не сводить насильно к одному `Lab*`):

```text
same-component         # один и тот же компонент
supported-variation    # отличие укладывается в текущий props API
composed-from-atoms    # собрано из atoms/tokens
missing-library-pattern
intentional-page-local # bespoke и намеренно локальный
component-api-gap       # отличие требует нового DS API → forge извлекает чистый DS
```

Новый компонент **не создавать** автоматически — gap уходит в forge (секция →
`component-forge`, атом/каркас → `primitive-layer-forge`), который извлекает чистый
DS в `@/components/ds` + `ds.css`, не оборачивая/копируя `Lab*`.

---

## 9. Page chrome

Индексировать `PageHeader`, `SiteHeader`, `Footer`, `HeaderThemeSync` и
nav/CTA-контракты (`site-nav.ts`).

```yaml
chrome: { name, source, used_on, variants, props,
  theme_behavior, navigation_behavior, cta_behavior, constraints }
```
Отдельно зафиксировать: internal page header, homepage header, footer light/dark,
section navigation, Launch App CTA, Book a call / demo CTA. Glass-CTA в footer —
тот же liquid-glass контракт, что и в Hero (constraint, не локальный стиль).

---

## 10. Social layer

Найти social в `Footer`, contact-странице, newsroom (`InTheLoop` и т.п.).

```yaml
social_component: { name, source, purpose, data_shape, variants,
  reusable, accessibility, external_links, media_support }
```
Inline-SVG внутри Footer → `embedded-set`. Нужен в нескольких местах →
`candidate-for-extraction`. Skill **только фиксирует**, не извлекает.

---

## 11. Newsroom / gallery

Индексировать `AllNewsGrid`, `ArticleCard`, `CategoryTag`, `InTheLoop`,
`MoreFromNewsroom` + rails/featured/grids.

```yaml
newsroom_component: { name, source, role, data_source, variants,
  content_capacity, responsive, media, interaction, suitable_for }
```
Не смешивать DS `Gallery` (deprecated source `LabGallery`) и newsroom article
gallery — это разные contracts.

---

## 12. Backgrounds

```yaml
background: { name, source, implementation, tokens, light_dark, reusable,
  page_level, section_level, may_overlap, overflow_risk,
  text_contrast_rules, reduced_motion }
```
Важно: lens/accent gradient — **не** generic page background. Если design-system
запрещает акцентный gradient как фон под текстом (см. memory: фото не фоном под
текстом; full-bleed = generated CSS) — сохранить это ограничение в contract.

---

## 13. Transitions

```yaml
transition: { name, source, from_surfaces, to_surfaces, type,
  static_or_motion, overlap_depth, clipping, z_index, mobile_fallback,
  reduced_motion, reusable }
```
Паттерн, живущий как CSS внутри одной страницы → `page-local-candidate`, не
объявлять global primitive автоматически (`MistBridge.tsx` — кандидат на разбор).

---

## 14. Motion

Индексировать `ScrollFX`, `ScrollOrchestrator`, `data-reveal`/`data-scrub`/
`data-pin`, horizontal-rails, stagger, reduced-motion.

```yaml
motion: { name, runtime, data_attributes, css_outputs, intended_use,
  constraints, reduced_motion, page_level_or_section_level }
```
Помнить инвариант CLAUDE.md: вся скролл/анимация-оркестрация — в одном
`ScrollOrchestrator.tsx` (единый rAF). Не предлагать per-section useEffect.

---

## 15. Semantic + style + conflict metadata

Каждому section-компоненту — метаданные для будущего Component Matcher:

```yaml
semantic_matching:
  primary_roles: [ hook, explain, prove, compare, guide, resolve, convert ]
  content_shapes: [ short-heading, medium-body, metrics, list, table, faq, media-led, process ]
  intensity: { visual: low|medium|high, motion: low|medium|high, density: low|medium|high }
  rhythm: { good_before, good_after, avoid_adjacent_to }
style:
  brand_fit: ; surfaces: ; typography: ; spacing: ; radius: ;
  shadow: ; gradient: ; contrast: ; motion:
```
`style.*` ссылается на существующие tokens/docs, не копировать arbitrary CSS,
если есть token.

Конфликты docs↔code:
```yaml
conflict: { id, component, documentation, code, impact,
  recommended_resolution, source_of_truth: code|docs|blocked }
```
По умолчанию для runtime API приоритет — **фактический экспортированный код**, но
конфликт обязан остаться в docs.

---

## 16. Артефакты

### Machine-readable manifests
`.claude/library/component-library/` (уже существует — обновлять, не пересоздавать):

```text
manifest.json · sections.json · atoms.json · layouts.json · chrome.json ·
newsroom.json · social.json · backgrounds.json · transitions.json · motion.json ·
recipes.json · production-patterns.json · conflicts.json · README.md
```
Если в репо уже есть подтверждённый equivalent path — использовать его, не плодить
второй. **Не переписывать manifests целиком без необходимости**; сохранять curated/
manual metadata; generated-поля обновлять отдельно от curated, если структура
позволяет.

### Human-readable source of truth
Обновить `wiki/architecture/component-library.md` (не превращать в JSON-dump).
Содержит: library purpose, layer model, readiness policy, consumption rules,
manifest paths, component summary, known gaps, docs/code conflict policy, update
workflow. Подробные API-контракты живут в manifests.

---

## 17. Режимы запуска

### Full — `/component-library-preparer` (без аргументов) или `"full"`
Проходит все слои §1, делает browser QA (§18), останавливается на audit (§3),
после подтверждения пишет manifests + обновляет `component-library.md`, выдаёт
итоговый report (§19).

### Targeted incremental — `/component-library-preparer "<target>"`

> Термин — **targeted incremental** (не «single-target»): режим допускает несколько
> целей через запятую, обрабатываемых как независимые targeted-проходы. См. также
> §17.5 (resource-ID resolution, режим `changed`, draft-gate).

Дефолтный режим для повседневной работы: **«что-то одно появилось или
изменилось → добавь/обнови в библиотеке, не прогоняя всё заново»**. Любой
аргумент, отличный от `"full"`, трактуется как single-target.

#### 17.1 Что принимается как `<target>`
`<target>` — это указатель на ОДИН объект. Допустимые формы:

| Форма | Пример | Как резолвить |
|---|---|---|
| DS-публичное имя | `"StatementHero"`, `"Bento"`, `"Eyebrow"` | искать export в `@/components/ds`, затем по реестру `component-library.md` |
| Имя экспорта/компонента (вкл. deprecated source) | `"LabEditorialSplit"`, `"ArticleCard"`, `"Footer"` | grep по `web/src/**` (`export … <Name>`); если это `Lab*`/`_kit` — резолвить в DS-публичное имя, которое его оборачивает, и писать запись под DS-именем (source = Lab*, `deprecated`) |
| Путь к файлу | `"web/src/components/sections/lab/LabFaq.tsx"` | прочитать файл напрямую |
| «Ссылка» на объект в репо | строка с путём + опц. якорь/строка: `".../globals.css#--surface-ink"`, `"_kit.tsx:LabTitle"` | разобрать в путь + символ/токен |
| Описание места | `"новый бэкграунд в OrangeGlow"`, `"social-иконки в футере"`, `"токен radius в @theme inline"` | найти по описанию через grep/Glob, показать кандидата(ов) |
| Несколько целей | `"LabFaq, LabPricing"` | обработать по очереди как независимые single-target-проходы |

Если описание резолвится в **несколько** кандидатов — не угадывать: вывести
список и спросить, какой именно (через AskUserQuestion). Если не резолвится
вовсе — сказать прямо и предложить уточнить путь/имя. **Full-прогон при этом не
запускать.**

#### 17.2 Определение слоя цели
После резолва — однозначно отнести объект к слою из §1 (token / global-primitive
/ DS-atom / DS-layout / DS-section / production-section / chrome / nav / newsroom /
social / media / motion / background / transition) и взять соответствующий шаблон
контракта (§5/§9–§15). Слой определяет, **в какой manifest** пишем (§16) и какие
проверки применимы. Запись объекта L3/L5 идёт под DS-публичным именем; `Lab*`/`_kit`
— только `source` с `deprecated`.

#### 17.3 Процедура single-target
1. **Resolve** — превратить `<target>` в конкретный source-path (+ символ/токен),
   подтвердить, что объект реально существует (иначе stop, см. §17.1).
2. **Classify** — определить слой и тип контракта.
3. **Re-read source** — прочитать ТОЛЬКО этот файл (+ его прямые зависимости:
   импортируемые atoms/tokens). Не сканировать всю библиотеку.
4. **Diff против библиотеки** — найти существующую запись в нужном manifest и в
   реестре. Новый объект → `create`; изменившийся → `update`.
5. **Build/refresh contract** — заполнить поля из реального кода (props, versions,
   surfaces, media, motion, semantic/style metadata по применимости слоя).
6. **Targeted QA** — если объект виден в Section Lab и preview уже запущен,
   проверить только его (версии, Light/Dark, overflow, responsive) по §18. Если
   preview не поднят — `browser_qa: not-run` + `consumption_readiness:
   conditional`, не помечать `production-ready`. Dev-сервер сам не поднимать.
7. **Dependency check** — проверить только прямые зависимости и прямых
   потребителей (кто импортирует объект): не сломан ли их контракт. Если задет
   shared-токен/atom — отметить затронутых потребителей как `needs-recheck` в
   `conflicts.json`, но **их записи не переписывать**.
8. **Write narrow** — обновить ровно: (а) запись объекта в его manifest;
   (б) строку в реестре `component-library.md`/`section-types.md` если это
   section/архетип; (в) `conflicts.json` если всплыл docs/code-конфликт.
   Unrelated entries не трогать.
9. **Mini-report** (§19.1).

#### 17.4 Гарантии узости
- Перечитывается только цель + её прямые связи; полный обход слоёв §1 — нет.
- Манифесты, которых слой цели не касается, не открываются на запись.
- `readiness` пересчитывается только для цели (и `needs-recheck`-флаг для прямых
  потребителей — без пересчёта их статуса).
- Все запреты §0 в силе (no build/commit, no редизайн, no extract).

`forge-index` вызывает именно этот режим после регистрации нового архетипа
(передаёт имя компонента как `<target>`).

---

### 17.5 — Расширенный target resolution + режим `changed` + draft-gate

`<target>` теперь принимает также: **resource ID** (`bg-…` / `tr-…` / `motion-…` /
`recipe-…`), **имя слоя** (`backgrounds`/`transitions`/`motion`/`recipes`/…),
export/source path, однозначное описание. Resolution: 1) точный ID в манифестах →
2) точное имя → 3) export/source path → 4) однозначное описание → 5) несколько
кандидатов → спросить (AskUserQuestion) → 6) **не** запускать full вместо
неразрешённого target.

**Режим `changed`** — `/component-library-preparer "changed"`: читает `git diff`,
определяет изменённые library-related ресурсы, обновляет только связанные entries,
обрабатывает rename/delete (§29), full scan не запускает.

**Draft-first и в targeted/changed:** перед записью новых/изменённых manifests/docs
показать narrow audit/diff + список изменяемых записей и ждать явного подтверждения.
Исключение — только явное `skip draft` / `publish immediately` / «пушь сразу».

## 18. Browser QA (full)

На `http://localhost:3005/dev/section-lab` проверить ширины **1440 / 1280 / 768 /
375** по каждой секции: render, version switching (v1/v2/v3), Light/Dark, content
mode, media, motion/reduced-motion, horizontal overflow, responsive.

Если preview недоступен:
```yaml
browser_qa: not-run
consumption_readiness: conditional
```
Не помечать `production-ready` без живой проверки.

---

## 19. Финальный report (full)

```markdown
## Component Library Preparation Complete

### Summary
Inspected: · Production-ready: · Conditional: · Draft: · Blocked: · Registry/code conflicts:

### Layers
Tokens / Atoms / Layouts / Lab sections / Production sections / Page chrome /
Newsroom / Social / Backgrounds / Transitions / Motion

### DS sections (Lab* = deprecated source)
| Archetype | DS name | Readiness | Browser QA | Build | Contract |

### Production patterns
| Route | Block | Closest library match | Status |

### Gaps
layout / props / component / background / transition / documentation

### Manifests created / Docs updated / Ready consumers

### Actions not performed
no page rebuild · no component redesign · no commit · no push · no PR
```

### 19.1 Mini-report (single-target)
```markdown
## Library updated — <target>

- Resolved to: <source-path>[#<symbol/token>]
- Layer: <layer> · Action: create | update
- Manifest touched: <file>.json (1 entry)
- Registry/docs: component-library.md / section-types.md — updated? yes|no
- Readiness: <ready|conditional|unavailable> (browser_qa: run|not-run)
- Direct consumers flagged needs-recheck: <list|none>
- Conflicts: <none | id…>

Not touched: full library scan, unrelated manifests, unrelated entries.
Not performed: build, commit, push, PR.
```

---

### 19.2 Visual-layer / recipe report additions

Для bg/tr/motion/recipe и registration-flow к отчёту добавлять:
```markdown
### Registration
| Resource | Manifest | registration.status | reason (if failed) |

### Dependency graph
| Recipe | depends on (bg/tr/motion) | dependency_status | needs-recheck |

### Build evidence
| Resource | build.status | evidence_source | commit_sha |

### Surface-ownership blocked
| Resource | scope | status | unblock_requires |
```

## 20. Интеграция с forge-index

После регистрации нового forged-компонента `forge-index` должен:
1. обновить `component-library.md`;
2. обновить `section-types.md`;
3. пометить/вызвать `component-library-preparer` incremental update для этого
   компонента;
4. обновить его consumption contract и readiness;
5. проверить manifest consistency.
Не запускать full-анализ без необходимости.

---

## 21. Проверка после патча

```bash
git status --short
git diff --stat
git diff -- .claude/skills/component-library-preparer .claude/skills/forge-index \
  wiki/architecture/component-library.md .claude/library
```
Не запускать build без отдельного разрешения. Не commit/push/PR.

---

## 22. Acceptance criteria

Section Lab проиндексирован · все DS-секции contracts сформированы под
DS-публичными именами (`Lab*` = deprecated `source`) · props из реального кода ·
versions/surfaces/readiness подтверждены · DS-атомы проиндексированы (`_kit` =
deprecated source) · layout layer честно отражён (`documented-missing`/CL-001, если
DS-каркаса/файла нет) · недостающие DS-секции/атомы зафиксированы как
`component-api-gap` (→ forge извлекает чистый DS) ·
PageHeader/SiteHeader/Footer проиндексированы · social layer проиндексирован ·
Newsroom проиндексирован · backgrounds/transitions/motion проиндексированы ·
production-pages сопоставлены с библиотекой · docs/code-конфликты сохранены ·
page-composer получает only-ready inventory · forge-index умеет incremental
update.

---

## 23. L15 — Composition recipes

Слой L15: проверенные комбинации `surface + background + transition + motion`.
Манифест — `.claude/library/component-library/recipes.json`. Контракт — §5.1.
Recipe **не** page template и **не** компонент. Авторит `visual-layer-forge`,
нормализует и регистрирует preparer. `ready` — только при всех `ready`-участниках
и `registration.completed` (§24, §25). Page-level recipes на `bg-shared-page-grid`/
`tr-grid-continuation` — `blocked-by-surface-ownership` (§26).

## 24. Visual-layer dependency graph

Проверяемые связи: `recipe→backgrounds/transitions/motion`, `transition→supported
surfaces`, `motion→runtime (ScrollFX|ScrollOrchestrator|css)`, `background→tokens/
surfaces`.

```yaml
dependency_status:
  status: valid | incomplete | stale | missing
  missing: [ ]        # ID, которых нет в манифестах
  conditional: [ ]    # есть, но не ready
  needs_recheck: [ ]  # участник изменился → пересчитать
```

Если зависимость отсутствует / не зарегистрирована / не `ready` / удалена-переименована
→ recipe не получает `ready`. При изменении background/transition/motion зависимые
recipes помечаются `needs-recheck` — **не переписывать их целиком без необходимости**.

## 25. Registration status

Каждый ресурс (bg/tr/motion/recipe/section) несёт:
```yaml
registration: { status: pending | completed | failed, registered_by: component-library-preparer, manifest: , target_id: , checked_at: }
```
`consumption_readiness.status: ready` запрещён, пока `registration.status !=
completed`. Частичная запись manifest/docs → `registration: failed` +
`consumption_readiness: conditional` + причина в отчёте (§19.2).

## 26. surface-ownership blocker

```yaml
surface_ownership:
  scope: section | page
  requires_transparent_sections:
  supported_now:
  status: supported | blocked-by-surface-ownership
  unblock_requires: [ component-forge, transparent-or-inherit-surface-api ]
```
Применяется к page-level shared backgrounds и transitions (grid continuation), пока
Lab-секции владеют непрозрачной `.band.light/.soft/.ink`. Preparer: регистрирует
ресурс, сохраняет его архитектурную ценность, **не** отдаёт его Page Orchestrator
как `ready`, **не** правит section API сам, фиксирует `component-api-gap`.

## 27. Composition access & variation policy

Контракты — в L5 section contract (§5): `composition_access` (whole_section /
exported_atoms / exported_fragments / slots / internal_fragments с `importable:false`
/ supported_/unsupported_strategies) и `variation_policy`. Preparer фиксирует internal
fragments, но их не извлекает и не объявляет importable; нет slot/export →
`component-api-gap`. Page Orchestrator видит только фактические exports/slots.

## 28. Build evidence

Контракт `build` — §6.2. `dev-compiled ≠ passed`. Preparer сам build не запускает,
читает существующее evidence (forge-validate / CI / прошлый report / user-approved).

## 29. Rename / delete / missing source

Если target отсутствует в коде: 1) проверить запись в манифестах; 2) проверить git
diff на rename/move/delete; 3) **не** оставлять `ready`. Статусы: `missing-source |
moved | renamed | removed`. Удалённые записи **не** удалять молча — сначала
`unavailable` + сохранить историю/конфликт в `conflicts.json`.

## 30. Targeted/changed approval gate

См. §17.5: draft-first действует и в targeted/changed mode; исключение — только явное
`skip draft` / `publish immediately` / «пушь сразу».

## 31. Интеграция с visual-layer-forge

Контракт-поток:
```
visual-layer-forge → implementation → visual QA → final design review
  → component-library-preparer (targeted incremental) → registration completed → resource ready
```
Task packet, который preparer принимает (и всё равно перепроверяет фактический
source — **packet'у вслепую не доверять**):
```yaml
library_registration_request:
  resource_type: background | transition | motion | recipe
  id: ; source: ; contract: ; qa_evidence: ; dependencies:
```
Preparer регистрирует ресурс в нужный manifest (backgrounds/transitions/motion/
recipes) + `component-library.md`, проставляет `registration` и `dependency_status`,
и только при `registration.completed` + ready-зависимостях выдаёт
`consumption_readiness: ready`.
