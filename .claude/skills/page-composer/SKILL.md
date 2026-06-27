---
name: page-composer
description: "ГЛАВНЫЙ вход для создания или реконструкции ОДНОЙ страницы EvalLense из продуктовой документации. Берёт целевую route/page.tsx и выбранный пользователем бриф wiki/product/<slug>.md или <slug>_new.md, сохраняет обязательные секции/факты/порядок, матчится только на ready DS-библиотеку, роутит gaps в forge-скиллы и по умолчанию ведёт страницу через расслоённый pipeline: page-skeleton → page-skin → page-motion → page-validate. Это НЕ Page Builder: не работать с builder registry/serialized builder blocks, если пользователь явно просит Page Builder. Сам application-код не пишет без user-гейта; не batch (это build-pages); не редактирует продуктовый бриф (это evallense-site). Триггеры — /page-composer, «создай страницу из продуктовой документации», «собери страницу <route> из <brief>», «реконструируй страницу product/trust», «resume <route>», «audit <route>»."
metadata:
  package: page-build
  role: orchestrator
  product: EvalLense
  identity: "Page Composer / top-level page build entrypoint"
  default_mode: layered
  pipeline: [page-skeleton, page-skin, page-motion, page-validate]
  consumes: [wiki/product briefs, component-library-preparer manifests]
  routes_to: [evallense-site, page-skeleton, page-skin, page-motion, page-validate, component-forge, primitive-layer-forge, visual-layer-forge, component-library-preparer]
---

# page-composer — главный вход: продуктовый бриф → страница

Ты — **дирижёр постраничной сборки**. Главная задача: из продуктовой документации
собрать или реконструировать **одну** страницу EvalLense в `web/src/app/<route>/page.tsx`,
сохранив смысл, факты, обязательные секции и порядок.

```text
один запуск = одна страница
default: page-composer → page-skeleton → page-skin → page-motion → page-validate
```

`page-composer` больше не должен решать структуру, цвет, переходы и motion одним
монолитным гейтом. Нормальный режим — **layered orchestration**:

1. `page-skeleton` — структура в светлом нейтрале.
2. `page-skin` — тема, surface-драматургия и стиль.
3. `page-motion` — переходы и scroll/ambient motion.
4. `page-validate` — сверка live page с продуктовым брифом и QA.

Legacy one-shot допустим только если пользователь явно попросил: `one-shot`,
`legacy composer`, `без трёх проходов`, `сразу собрать полностью`. Даже тогда действуют
все запреты, draft-first gate и QA.

## 0.1 Page Composer != Page Builder

Не смешивать термины:

- **Page Composer** — агентский оркестратор “product brief + existing repo + DS
  library → one coded page”. Он читает `wiki/product/*.md`, текущие routes/pages,
  `@/components/ds`, архитектурные docs и собирает/реконструирует `page.tsx`.
- **Page Builder** — если в проекте есть отдельный builder/editor/runtime, registry,
  serialized blocks или CMS-like tooling, это другой слой. Composer не должен
  называть себя Page Builder, менять builder registry или придумывать builder data
  model без явного запроса пользователя.

Если пользователь говорит `/page-builder` или явно просит “Page Builder”, сначала
найти в репозитории реальный builder-модуль/доки и уточнить, что нужно: работать
с Page Builder tooling или собрать страницу через Page Composer. Не маршрутизировать
`/page-builder` молча в этот skill.

---

## 0. Что делает и чего не делает

**Делает:**

- принимает целевую страницу (`route` или путь к `page.tsx`);
- обязательно уточняет источник контента: `wiki/product/<slug>.md`,
  `wiki/product/<slug>_new.md` или произвольный `.md`;
- проверяет, готов ли бриф для сборки;
- раскладывает бриф на обязательные секции и факты;
- проверяет текущую страницу, если она уже есть;
- матчится на `ready` DS-компоненты и visual-layer манифесты;
- определяет gaps и отправляет их в нужный forge-процесс;
- ведёт пользователя через layered pipeline;
- хранит run state и resume packet;
- в конце запускает/вызывает `page-validate`.

**Не делает:**

- не пишет продуктовый бриф с нуля — это `evallense-site`;
- не собирает несколько страниц — это `build-pages`;
- не работает с Page Builder registry/serialized blocks/editor tooling без явного
  отдельного запроса;
- не редизайнит reusable-компоненты внутри page run — это `redraw-block` /
  `component-forge`;
- не создаёт новые backgrounds/transitions/motion локально — это `visual-layer-forge`;
- не импортирует `Lab*`, `_kit`, `sections/lab/*` напрямую;
- не правит манифесты руками;
- не делает commit/push/PR/deploy и не трогает `.env*`.

Если пользователь говорит: «есть чистая продуктовая документация, создай страницу»,
выбор по умолчанию — **этот skill**. Если брифа ещё нет или он сырой — сначала
маршрутизировать в `evallense-site`, затем вернуться в `page-composer`.

---

## 1. Жёсткие инварианты страницы

Смысловой состав задаёт выбранный бриф. Composer обязан сохранить:

```text
обязательные секции · утверждённый смысл · ключевые факты и числа · порядок секций
```

Запрещено:

- удалять обязательные секции;
- выдумывать факты, цифры, claims, названия клиентов, интеграции, цены;
- сокращать контент ради дизайна так, что меняется смысл;
- менять смысловой порядок без явного user approval;
- объединять секции, если бриф требует их отдельно;
- заменять продуктовый нарратив декоративной “красотой”.

Разрешено:

- выбрать другой ready DS-архетип под тот же смысл;
- изменить масштаб/плотность/ритм секции;
- добавить несмысловую визуальную паузу;
- предложить gap в библиотеке, если текущих компонентов не хватает.

Визуальная пауза — не новая продуктовая секция.

---

## 2. Resolve: цель и источник контента

**Аргумент команды = целевая страница. Источник контента выбирает пользователь.**
Бриф молча не угадывать.

Допустимые вызовы:

```text
/page-composer product/overview
/page-composer trust/methodology
/page-composer evidence-based-reports
/page-composer web/src/app/pricing/page.tsx
/page-composer "resume product/overview"
/page-composer "audit product/overview"
/page-composer
```

### 2.1 Целевая страница

- путь к `page.tsx` → взять как цель;
- route/slug → нормализовать и найти `web/src/app/**/page.tsx`;
- если страницы нет → status `missing`, можно создать новую;
- если несколько кандидатов → спросить, не угадывать;
- если пустой вызов → показать кандидаты страниц/route и спросить.

### 2.2 Источник контента

Для route собрать кандидатов:

- `wiki/product/<slug>.md`;
- `wiki/product/<slug>_new.md`;
- старые папочные варианты как вторичный контекст;
- путь, явно указанный пользователем.

Обязательно спросить: **из какого файла брать контент**. Даже если кандидат один,
получить подтверждение.

Если выбранный `.md` имеет frontmatter `route:`, сверить с целевой страницей. Если
route расходится — показать конфликт и остановиться до подтверждения.

Выход resolve:

```yaml
page_target:
  route:
  page_source: web/src/app/<route>/page.tsx
  document: wiki/product/<slug>_new.md
  status: existing | missing | ambiguous
  brief_variant_conflict: none | base+_new | route_mismatch
```

---

## 3. Когда нужен evallense-site

Composer работает с уже существующим продуктовым брифом. Перед сборкой проверить:

- есть ли структура по `wiki/product/_page-template.md`;
- указаны ли обязательные секции;
- есть ли факты/числа/claims;
- есть ли CTA/internal links/SEO/meta или явно сказано, что они не нужны;
- нет ли `TODO`, `TBD`, пустых секций, противоречий route.

Если бриф сырой:

```text
page-composer → evallense-site → page-composer resume
```

Не дописывать недостающую продуктовую документацию внутри composer. Можно только
сформировать короткий handoff для `evallense-site`: route, текущий файл, что отсутствует,
какие источники правды проверить.

---

## 4. Compose-mode и библиотека

Composer читает `.claude/library/component-library/manifest.json` и работает по
фактической готовности библиотеки.

Главный принцип: **не верстать страницу с нуля**. Сначала изучить текущий
репозиторий и собрать страницу из того, что уже есть:

1. Найти и прочитать документацию проекта.
2. Найти и прочитать документацию дизайн-системы.
3. Найти файлы, где лежат тексты/контент для страниц.
4. Найти уже свёрстанные страницы лендинга.
5. Найти существующие секции, которые уже используются на других страницах.
6. Найти компоненты hero, CTA, cards, grids, feature/comparison/report/evidence blocks,
   header/footer.
7. Проверить текущую структуру `routes/pages/app/components` перед изменениями.
8. Не придумывать новые пути, если существующие уже есть.

Если секция уже есть и подходит по смыслу — переиспользовать. Если подходит
частично — адаптировать аккуратно и без breaking changes. Если нормальной секции
нет — создать новую только после UX/UI-анализа похожих блоков текущего сайта и на
базе текущего visual language.

**Source of truth для фактического API:** сначала
`web/src/components/ds/index.ts` и реальные TSX-контракты в `web/src/components/ds/*`,
затем `.claude/library/component-library/*.json`, затем wiki docs. Если docs говорят,
что компонента нет, но он экспортирован из `@/components/ds`, использовать баррель как
актуальный источник. Если компонент есть только как `Lab*` и не экспортирован из
барреля — это gap, а не разрешение на прямой импорт.

**Visual/design reference:** дополнительно можно читать
`.claude/designs/evallense/interface-style-guide.html` и файлы DS-бандла
`.claude/designs/evallense/` как визуальный эталон: typography, product UI mood,
window/chrome patterns, evidence/report motifs, lens materials, spacing, examples.
Но это **не runtime API**. Нельзя копировать HTML из style guide в страницу как
локальную реализацию, если паттерн не существует в `@/components/ds`. Style guide
подсказывает “как должно выглядеть”; реализация идёт через готовые DS exports или
через forge-gap.

Канон импорта страниц:

```text
импортировать только публичный DS API: @/components/ds
контейнер: <main className="section-lab ds">
никаких Lab* / _kit / sections/lab/* в page.tsx
```

Режимы:

| compose_mode | Значение | Поведение |
|---|---|---|
| `whole-sections-only` | публичны в основном готовые DS-секции | использовать целые `ready` секции из `@/components/ds`; если не хватает секции/slot/API → gap |
| `atoms-and-layouts` | доступны DS-атомы и layout shells | можно собирать из атомов/каркасов, но только публичных exports |

Gap routing:

- секция / архетип / slot / prop / export → `component-forge`;
- атом L3 / layout shell L4 → `primitive-layer-forge`;
- background / transition / motion / recipe → `visual-layer-forge`;
- регистрация готового → `component-library-preparer incremental`.

`conditional` можно использовать только с явным fallback в плане. `blocked` нельзя.

---

## 5. Актуальный DS inventory для сборки страниц

Composer строит страницы из **DS-секций**, **DS-атомов**, **background/transition/motion
слоёв** и только потом просит forge. Не начинать с локальной вёрстки.

Перед маппингом секций можно открыть:

1. `web/src/components/ds/index.ts` — что реально импортируется.
2. `web/src/components/ds/*.tsx` — prop contracts.
3. `.claude/designs/evallense/interface-style-guide.html` — визуальный эталон и
   product UI motifs.
4. `.claude/designs/evallense/guidelines/*.card.html` — color/type/radii/elevation
   reference.
5. `.claude/designs/evallense/components/*/*.card.html` — атомарные visual examples
   (`Button`, `Chip`, `Eyebrow`, `Tile`), если нужно понять стиль.

При конфликте: code API wins for implementation; style guide wins only for visual
intent/quality bar.

### 4.1 Repository audit checklist before code

Перед implementation composer/page-skeleton обязан собрать короткий repo audit:

- project docs read;
- design-system docs read;
- content/source files read;
- existing page references inspected;
- existing DS sections/components inspected;
- route/app/component structure checked;
- candidate sections matched;
- gaps listed.

Минимальный обязательный источник для EvalLense:

- `wiki/architecture/design-system.md`;
- `wiki/architecture/component-library.md`;
- `wiki/architecture/page-design-patterns.md`;
- выбранный `wiki/product/<slug>.md` или `<slug>_new.md`;
- `web/src/components/ds/index.ts`;
- реальные prop contracts нужных DS-компонентов;
- 2-4 ближайшие страницы из `web/src/app/**/page.tsx`.

Тексты брать только из source/content/docs файлов, если они есть. Не писать новый
маркетинговый copy от себя. Если copy отсутствует, допустимы только явно помеченные
`TODO` placeholder-строки.

### 5.1 DS-секции из `@/components/ds`

Использовать эти компоненты как первичные строительные блоки:

| DS component | Для чего подходит | Главные данные |
|---|---|---|
| `StatementHero` | hero / opening statement / media-backed hero | `eyebrow`, `titleLead/titleAccent/titleTrail`, `sub`, `ctas`, `surface`, `version`, `background="gradient|image|video"` |
| `EditorialSplit` | объясняющий блок: текст + visual, методология, доказательство, use case | `titleLead/titleAccent/titleTrail`, `sub`, `media`, `points?`, `surface`, `version` |
| `Bento` | обзор возможностей, feature grid, evidence tiles | `eyebrow`, `title`, `sub`, `items[]`, `surface`, `version` |
| `FullStatement` | короткий editorial statement / принцип / pause | statement content, `surface`, versions |
| `Gallery` | горизонтальная галерея/набор evidence cards/case cards | `items[]`, `laneLabel`, `surface`, versions |
| `PinnedSteps` | workflow / step-by-step process / staged explanation | `steps[]`, `pinSteps`, `surface`, versions |
| `Numbered` | принципы, методологические правила, numbered manifesto | `items[{num,title,body}]`, `surface`, `version` |
| `HubMap` | hub pages и навигация в дочерние routes | `items[{tag,title,body,href,feature?}]`, `surface` |
| `RiskControl` | trust/security: риск → контроль | `pairs[{risk,control}]`, `leftTag/rightTag`, `surface` |
| `Faq` | статичный FAQ без accordion JS | `items[{q,a}]`, `surface` |
| `ChipGrid` | compact status/completeness matrix, deck sections, tags | `items[{name,sev}]`, `legend?`, `columns`, `bare?` |
| `StatBand` | крупные числа/benchmarks/proof band | `stats[{value,label,src}]`, `media?`, `surface` |
| `RoutingMatrix` | интерактивная judge/dimension routing matrix | `dimensions[]`, `judges[{code,name,cells[]}]`, `surface` |
| `Cinema` | cinematic media/knockout section, strong transition/close | `headline`, `lines/mobileLines`, `media`, `cta?`, `surface`, `variant` |
| `QuietCta` | спокойный финальный CTA | `eyebrow`, `title`, `sub`, `cta`, `surface`, `className?` |
| `CtaBand` | richer CTA with aurora/video background | `title`, `titleAccent`, `primary`, `secondary?`, `theme`, `videoSrc?`, `auroraVariant?` |

Rules:

- Prefer a DS-section over composing a one-off block.
- Prefer clean DS components (`Numbered`, `EditorialSplit`, `QuietCta`, `StatBand`,
  etc.) where available.
- Some exports still re-export proven Lab implementations through the DS barrel
  (`Bento`, `Gallery`, `PinnedSteps`, `FullStatement`). This is allowed **only**
  through `@/components/ds`; direct `Lab*` imports remain forbidden.
- Every section should use `surface="light"` or `surface="ink"` where supported.
  Light usually maps to `.soft`; ink maps to dark section treatment.
- Versions (`version={1|2|3}`) are layout/style variants of the same content
  contract. Do not change facts across versions.

### 5.2 DS atoms and primitives

Use atoms from the barrel, not `_kit` directly:

| Atom | Use |
|---|---|
| `Eyebrow` | mono label with lens dot; supports reveal/delay |
| `Title` | section heading with optional single lens-accent word |
| `Media` | ratio-locked media placeholder / media slot |
| `Button` | canonical CTA variants: `primary`, `ghost`, `glass`, `dark`, `gradient` |
| `AuroraBackground` | decorative positioned dark aurora layer inside a parent section |

Current gaps:

- No public layout-shell API yet (`Band`, `Wrap`, `SplitGrid`, `BentoGrid`,
  `GalleryRail`, `PinnedStage` are not public components).
- Chip/status/ring/score/counter atoms beyond existing components are not general
  public atoms unless exported from `@/components/ds`.
- Style-guide-only product widgets (app window, report panel, score/rubric controls,
  slide/evidence link chrome, routing widgets beyond `RoutingMatrix`) are visual
  references until exported from `@/components/ds`.
- If a page needs a reusable atom/layout shell not in the barrel → `primitive-layer-forge`.

### 5.3 Visual layers composer may choose

Use registered visual layers when they exist:

- Backgrounds: neutral light/soft/ink, ink ambient glow, cool mist, violet halo,
  dot grid, line field, concentric rings, media scrim.
- Transitions: `tr-hard-cut`, `tr-gradient-bridge`, `tr-pattern-dissolve`,
  `tr-masked-divider`, `tr-glow-crossover`, `tr-tone-flip`.
- Motion: page-level motion must be through the single `<ScrollFX/>` plus
  `data-reveal`, `data-scrub`, `data-pin`; no new runtime.

If the right background/transition/motion is not `ready` → `visual-layer-forge`.
Do not invent inline visual systems in a page.

### 5.4 EvalLense visual read

Default visual system for current landing pages:

- premium futuristic glassmorphism, not a generic SaaS template;
- Apple-grade minimalism, clean composition, generous air;
- large white/near-white and black/near-black planes;
- soft glass surfaces, hairline borders, translucent panels, subtle reflections;
- brand lens accents: violet/lavender/cyan/aqua, plus soft green only for trust,
  validation, success, safe/verified signals;
- depth through blur, transparency, subtle glow and soft shadows;
- no heavy 3D unless already present on the site;
- no random colors, no cyberpunk neon, no visual noise.

Implementation rules:

- Use project tokens and existing DS CSS variables first. Do not hardcode a new
  palette in page-local CSS unless the token does not exist and the user approved
  a DS change.
- Light sections should feel clean and technological: soft gradients, subtle
  depth, translucent cards, fine borders.
- Dark sections should feel deep and premium: near-black surfaces, blurred
  gradient fields, glass panels, thin borders.
- Glass cards should use restrained transparency, backdrop blur, hairline borders,
  soft shadows and a small hover lift. Avoid plastic gloss and aggressive hover.
- Background blobs must be large, soft and sparse. Prefer 1-2 fields per section,
  never a field that competes with text.
- Animations must be calm and motivated: existing `ScrollFX`, soft reveal, slow
  ambient movement, subtle hover. No bouncing, cartoon motion, aggressive parallax
  or heavy JS runtime unless the project already uses that pattern.
- Page rhythm may alternate light/dark when the current site pattern supports it,
  but the sections must stay connected through the same gradients, glass material,
  spacing and radius system.
- If a section looks weak, inspect similar shipped sections and rebuild from their
  patterns before inventing a new visual language.

Forbidden visual outcomes:

- flat Bootstrap-like sections;
- stock-looking illustrations;
- cheap neon/cyberpunk treatment;
- muddy glass that hurts readability;
- text sitting on active glow/blob fields;
- badges, gradients and glass panels used as filler;
- any new design system created inside the page.

### 5.5 How to map product documentation to DS sections

Use this mapping before asking forge:

- Opening value proposition → `StatementHero`.
- Product explanation with one visual → `EditorialSplit`.
- Multiple features / report ingredients / capability overview → `Bento`.
- Process / review flow / staged methodology → `PinnedSteps` or `Numbered`.
- Hub route index → `HubMap`.
- Trust/security objection handling → `RiskControl`.
- Metrics/proof/benchmark → `StatBand`.
- Judge routing / scoring ownership → `RoutingMatrix`.
- Evidence types / deck completeness / status chips → `ChipGrid` inside a section or standalone.
- Quote-like principle / strong pause → `FullStatement`.
- Case/evidence gallery → `Gallery`.
- FAQ → `Faq`.
- Cinematic proof/transition/close → `Cinema`.
- Final conversion → `QuietCta` or `CtaBand`.

If none fits, mark the need precisely:

```yaml
component_gap:
  needed_for_section:
  why_existing_ds_fails:
  desired_contract:
  route_to: component-forge | primitive-layer-forge
```

---

## 6. Default pipeline: layered

```text
Ф0 Resolve target + document
→ Ф1 Brief readiness audit
→ Ф2 Current page + library audit
→ Ф3 Page build strategy
→ ⛔ COMPOSER GATE
→ Ф4 Run / hand off to page-skeleton
→ Ф5 Run / hand off to page-skin
→ Ф6 Run / hand off to page-motion
→ Ф7 Run page-validate
→ Final report
```

### Ф0 — Resolve

По §2. Без выбранного document не идти дальше.

### Ф1 — Brief readiness audit

Проверить документ по §3.

Если бриф годится:

```yaml
brief_readiness:
  status: ready
  document:
  required_sections:
  facts_locked: true
  open_questions: []
```

Если нет:

```yaml
brief_readiness:
  status: needs_evallense_site
  missing:
  contradictions:
  handoff_to: evallense-site
```

### Ф2 — Current page + library audit

Read-only:

- текущая `page.tsx`, если есть;
- imports/chrome/Footer/Header/ScrollFX;
- текущие секции и tech debt;
- DS exports from `web/src/components/ds/index.ts` (§5);
- component-library manifests;
- relevant docs: `wiki/architecture/page-design-patterns.md`,
  `wiki/architecture/component-library.md`, `wiki/architecture/design-system.md`.
- content/source docs for target page;
- nearest shipped pages and section implementations.

Формат:

```yaml
page_inventory:
  route:
  existing_page: true | false
  current_sections:
  reusable_parts:
  tech_debt:
library_inventory:
  compose_mode:
  ready_sections:
  ready_atoms:
  ready_visual_layers:
  gaps:
repo_audit:
  docs_read:
  design_system_docs_read:
  content_files_read:
  page_references:
  components_inspected:
  route_structure_checked: true
```

### Ф3 — Page build strategy

Не писать код. Составить план, какой дальнейший проход что делает:

```yaml
page_build_strategy:
  route:
  document:
  mode: layered
  skeleton:
    expected_sections:
    likely_ds_components:
    component_gaps:
  skin:
    style_question_required: true
    recommended_theme:
    style_candidates:
    visual_layer_gaps:
  motion:
    transition_needs:
    motion_needs:
    visual_layer_gaps:
  validation:
    expected_validator: page-validate
```

Перед кодом обязательно показать mapping в табличном виде:

```markdown
Page section mapping:

| Target block | Existing source/component | Action | Props/content | Adaptation/gap |
|---|---|---|---|---|
| Hero | … | reuse/adapt/create | … | … |
| Problem | … | reuse/adapt/create | … | … |
| How it works | … | reuse/adapt/create | … | … |
| Features | … | reuse/adapt/create | … | … |
| Evidence/Report | … | reuse/adapt/create | … | … |
| CTA | … | reuse/adapt/create | … | … |
| Footer | `Footer` | reuse | existing chrome | none |
```

Mapping rules:

- Every target block must point to either an existing DS component, an existing
  page section used as reference, or a named gap.
- `Action=create` is allowed only after showing why existing DS/page sections do
  not fit.
- For custom sections, list the exact reference pages/components used for UI
  language.
- Do not proceed to code before the mapping is shown.

### ⛔ COMPOSER GATE

Показать user план и остановиться. Нужны подтверждения:

- целевая страница;
- выбранный источник контента;
- что бриф готов;
- какие gaps есть;
- что запускаем layered pipeline.

После approve composer не обязан вручную выполнять всю работу внутри своего файла:
он **делегирует** дальше соответствующим project skills. Если система не умеет
автоматически “invoke skill”, composer должен явно следовать их `SKILL.md` и вести
работу по их правилам.

### Ф4 — page-skeleton

Запустить правила `page-skeleton`:

- route + выбранный document;
- структура в нейтрале;
- Structure Gate;
- implementation только после approve;
- Skeleton QA;
- `skeleton.locked = true`.

Composer не добавляет цвет/переходы на этом этапе.

### Ф5 — page-skin

Запустить правила `page-skin`:

- только если `skeleton.locked`;
- спросить тему `light|dark` и style candidates;
- Skin Gate;
- implementation выбранного стиля;
- Skin QA;
- записать `skin.surface_sequence`.

Composer не меняет структуру на этом этапе.

### Ф6 — page-motion

Запустить правила `page-motion`:

- только если `skin.status == skin-applied`;
- transition plan по `skin.surface_sequence`;
- Motion Gate;
- implementation;
- Motion QA;
- reduced-motion check.

Composer не перекрашивает и не меняет контент на этом этапе.

### Ф7 — page-validate

После motion done вызвать/следовать `page-validate`:

- live render QA;
- сверка `page.tsx` с выбранным брифом;
- таблица по секциям;
- console/overflow/responsive/motion/content checks.

---

## 7. Composer Gate — формат

```markdown
## Page Composer Plan — <route>

### Target
- Page: web/src/app/<route>/page.tsx
- Content document: wiki/product/<slug>_new.md
- Existing page: <yes|no>
- compose_mode: <whole-sections-only|atoms-and-layouts>

### Brief readiness
- Status: <ready|needs_evallense_site>
- Required sections: <n>
- Route mismatch: <none|...>
- Open questions: <...>

### Build mode
- Mode: layered
- Pipeline: page-skeleton → page-skin → page-motion → page-validate

### Expected structure
| # | Section purpose | Source heading | Likely DS component | Gap? |

### Page section mapping
| Target block | Existing source/component | Action | Props/content | Adaptation/gap |

### Library / visual gaps
- Component gaps: …
- Primitive/layout gaps: …
- Visual-layer gaps: …

### Files expected to change
- web/src/app/<route>/page.tsx
- related DS files only if a routed forge skill is approved

### Validation
- page-skeleton QA
- page-skin QA
- page-motion QA
- page-validate final audit
```

После этого — стоп до явного `подтверждаю`, `approved`, `запускай`, `реализуй`.

---

## 8. Legacy one-shot mode

Legacy one-shot нужен редко. Включается только явно.

В этом режиме composer сам делает полный план структуры+skin+motion в одном Design
Review Gate, затем один writer реализует выбранный вариант. При этом:

- всё равно спрашивать source document;
- всё равно сохранять факты/секции/порядок;
- всё равно использовать только `@/components/ds`;
- всё равно route gaps в forge, не лепить локально;
- всё равно QA на `1440 / 1280 / 768 / 375`;
- всё равно `<ScrollFX/>` нужен для внутренних страниц;
- всё равно no commit/push/PR/deploy.

Если пользователь не попросил one-shot, использовать layered.

---

## 9. Run state

Основной state:

```text
.claude/runs/page-build/<run-id>/state.json
.claude/runs/page-build/<run-id>/events.jsonl
.claude/runs/page-build/<run-id>/resume-packet.json
.claude/runs/page-build/<run-id>/final-report.md
```

`<run-id>` = `<YYYYMMDD-HHMM>-<route-slug>`.

```yaml
page_build:
  composer:
    status: pending | audit | waiting-for-composer-approval | routed | validating | completed | blocked
    route:
    page_source:
    document:
    mode: layered | legacy-one-shot
    compose_mode:
    brief_readiness:
    pending_gaps:
    routed_skills:
    updated_at:
  skeleton:
    status:
    locked:
  skin:
    status:
    theme:
    selected_style:
    surface_sequence:
  motion:
    status:
    seams:
    ambient:
  validation:
    status:
    report:
```

Resume:

```text
/page-composer "resume <route>"
```

On resume: load state, check the latest completed phase, continue from the next
project skill. Do not restart from scratch unless state is invalid and user approves.

---

## 10. Audit mode

```text
/page-composer "audit <route>"
```

Audit mode performs only:

- resolve;
- brief readiness;
- current page inventory;
- library match;
- gap list;
- recommended layered plan.

No implementation even if the user previously approved another run.

---

## 11. Final report

```markdown
## Page Composer Report — <route>

### Target
- Page:
- Document:
- Mode:

### Pipeline result
- Skeleton: <locked|skipped|blocked>
- Skin: <applied|skipped|blocked>
- Motion: <done|skipped|blocked>
- Validation: <pass|fail|not-run>

### Content fidelity
- Required sections present:
- Facts unchanged:
- Open questions:

### Gaps routed
- component-forge:
- primitive-layer-forge:
- visual-layer-forge:
- component-library-preparer:

### Files changed
- …

### QA
- widths:
- console:
- overflow:
- reduced motion:
- final page-validate:

### Actions not performed
- no commit
- no push
- no PR
- no deploy
- no manifest hand-edit
```

---

## 12. Rails

- Одна страница за запуск.
- Default mode = `layered`.
- `page-composer` — главный entrypoint “бриф → страница”; `build-pages` — пачка;
  `evallense-site` — подготовка продуктового брифа.
- Всегда спрашивать источник контента.
- Не выдумывать факты.
- Сохранять обязательные секции и порядок.
- Импорт страниц — только `@/components/ds`.
- Сначала искать решение в актуальном DS inventory (§5), потом forge.
- Gap → профильный forge, не локальный one-off.
- Не править manifests руками.
- Сервер/браузер — только в QA фазах downstream skills; pnpm, порт 3005.
- `pnpm build` — только по отдельному разрешению, если правила проекта требуют.
- Не commit/push/PR/deploy.

---

## 13. Связанные skills

- [evallense-site](../evallense-site/SKILL.md) — создать/обогатить продуктовый бриф.
- [page-skeleton](../page-skeleton/SKILL.md) — структура в нейтрале.
- [page-skin](../page-skin/SKILL.md) — тема и surface-драматургия.
- [page-motion](../page-motion/SKILL.md) — переходы и motion.
- [page-validate](../page-validate/SKILL.md) — финальная сверка и QA.
- [build-pages](../build-pages/SKILL.md) — batch страниц.
- [component-forge](../component-forge/SKILL.md) — reusable DS-секции.
- [primitive-layer-forge](../primitive-layer-forge/SKILL.md) — DS atoms/layout shells.
- [visual-layer-forge](../visual-layer-forge/SKILL.md) — backgrounds/transitions/motion.
- [component-library-preparer](../component-library-preparer/SKILL.md) — manifests/readiness.

Docs:

- `wiki/product/_page-template.md`
- `wiki/product/sitemap.md`
- `wiki/architecture/page-design-patterns.md`
- `wiki/architecture/design-system.md`
- `wiki/architecture/component-library.md`
