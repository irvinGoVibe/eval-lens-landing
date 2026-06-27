---
title: Image generation portrait
status: draft
updated: 2026-06-27
source: web/src/app/globals.css + wiki/architecture/design-system.md + web/public/assets
---

# Image generation portrait

← [[index|Wiki]]

Этот документ фиксирует визуальный портрет изображений EvalLense: что именно
генерировать для сайта, какие признаки сохранять, а какие запрещать. Он основан
на текущей дизайн-системе, медиабрифах страниц и фактических ассетах в
`web/public/assets`.

## Core Idea

EvalLense изображает не "AI magic", а спокойную систему принятия решений:
много шумных заявок, деков и сигналов проходят через линзу, становятся
структурированным evidence, затем передаются человеку для финального решения.

Образ всегда должен читать три смысла:

1. **Lens clarity** — шум сводится к одному проверяемому сигналу.
2. **Evidence over opinion** — видны источники, рубрики, строки, карточки,
   матрицы, следы анализа.
3. **AI prepares, humans decide** — AI-оценка приглушена, human decision или
   final score визуально сильнее.

## Visual DNA

### Palette

- База: Apple-neutral, много воздуха, `#ffffff`, `#f5f5f7`, `#1d1d1f`.
- Тёмная сцена: почти чёрный `#000000`, панели `#0a0a0d`, `#121218`.
- Единственный фирменный акцент: lens-gradient `118deg`:
  `#6c4cf1 → #a99bff → #2ec5e8 → #36e0c2`.
- Семантика только по смыслу: green `#1aa37a` = ready/approved, amber `#e8943a`
  = attention/incomplete.
- Orange/fire используется только как тёплый переход лендинга, не как продуктовый
  UI-акцент.

### Form Language

- 1px hairline geometry: тонкие рамки, узлы, линии, стрелки, сетки, матрицы.
- Glass/lens объекты: прозрачные кольца, линзы, стеклянные панели, мягкий violet
  rim-light, cyan edge-light.
- Product mockups: настоящие интерфейсные поверхности, карточки, строки,
  score-панели, source refs, readiness states.
- Пространство важнее декора: одна фокусная сцена на кадр, не коллаж.
- На тёмном: cinematic glass на чёрном поле, glow локальный и контролируемый.
- На светлом: editorial product diagram, белая поверхность, мягкая фиолетовая
  глубина, минимум теней.

### Typography Inside Images

- По возможности не вшивать длинный текст в растр.
- Допустимы короткие mono labels: `P1-P6`, `J-P1`, `SourceRef`, `Ready`,
  `Incomplete`, `AI Total`, `Jury Score`.
- Любые числа должны быть placeholder-логикой или подтверждёнными фактами.
- Не генерировать случайные проценты, fake logos, fake company names.

## Image Families

### 1. Light Editorial Diagrams

Use for blog covers, explainers, methodology graphics, product overview slots.

Портрет: белая или почти белая поверхность, тонкая hairline-схема, несколько
deck cards слева, lens/ring в центре, структурированный output справа.

Типовые сцены:

- Decks → lens → ranked row.
- Decoder → judges → scoring → human review.
- 6×6 judges/dimensions matrix.
- Spread/consensus scale.
- Entry intake flow with readiness cards.

Prompt kernel:

> Minimal editorial product diagram on white #ffffff, generous negative space,
> 1px hairline geometry, Apple-neutral sans and tiny mono labels, a single
> 118-degree lens gradient accent from violet #6c4cf1 through lavender #a99bff
> to cyan #2ec5e8 and aqua #36e0c2. Thin pitch deck cards pass through a glass
> lens and resolve into structured evidence or a ranked workspace. Calm,
> precise, flat-to-subtle-glass, no decorative icons.

### 2. Dark Cinematic Product Scenes

Use for hero/CTA peaks, dramatic product moments, dark page sections.

Портрет: чёрный фон, неоново-стеклянная линза или объект, фиолетово-циановая
подсветка, UI-карточки как светящиеся панели. Сцена должна быть глубокой, но не
игровой.

Типовые сцены:

- Glass lens tunnel / scoring matrix.
- Private deck vault.
- Prompt-injection boundary card.
- Human review silhouette with floating evidence cards.
- Abstract cube/lens loops for CTA backgrounds.

Prompt kernel:

> Cinematic dark product scene on near-black #000000, a transparent glass lens
> object and thin UI panels lit by restrained violet and cyan edge light. Use
> the EvalLense 118-degree lens gradient only as signal illumination. Hairline
> frames, subtle depth, soft bloom, high contrast, premium Apple-like product
> visualization. No sci-fi clutter, no chrome overload, no security theatre.

### 3. Product UI Mockups

Use when the picture explains actual functionality rather than mood.

Портрет: screen-like frame, clear rows/cards, advisory AI information muted,
human action highlighted. UI must follow real product hierarchy, not fantasy
dashboard decoration.

Mandatory hierarchy:

- AI outputs: muted/supporting, explanatory.
- Evidence/source references: visible and structured.
- Human decision or Jury Score: active, lens-accented, visually primary.
- Statuses: green/amber/violet/muted only by actual meaning.

Prompt kernel:

> Clean EvalLense interface mockup, Apple-neutral surface, hairline card frames,
> muted AI Total Score and per-dimension evidence rows on the left, active human
> Jury Score input and submit action on the right highlighted with the single
> violet-to-cyan lens gradient. Mono numeric labels, tabular scores, calm
> spacing, no fake logos, no invented real data.

### 4. Light/Dark Paired Assets

Use for pages that crossfade tone or need the same concept across surfaces.

Rules:

- Same composition in both variants.
- Light variant: white/soft surface, accent is crisp and minimal.
- Dark variant: black/ink surface, accent becomes edge-light/glow.
- Do not change the meaning between variants; only material and exposure change.

Good pairs already present:

- `light-deck-scan.webp` ↔ `deck-scan.png`
- `light-scoring-matrix.webp` ↔ `scoring-matrix.png`
- `light-blocked-card.jpeg` ↔ `injection-blocked.png`

### 5. Abstract Backgrounds And Blobs

Use as supporting atmosphere, not as primary explanation.

Портрет: soft glass blobs, violet/cyan/aqua refractions, no hard icons, no text.
For light pages, blobs are pale and spacious. For dark pages, blobs are small,
central, and clamped by black edges.

Avoid using abstract backgrounds where the user needs to inspect product detail.

## Negative Prompt

Do not generate:

- stock team photos, fake office scenes, smiling business people;
- shields, padlocks as the main metaphor, "security theatre";
- generic blue-purple AI gradients as full backgrounds;
- robot brains, circuit heads, magic particles without product meaning;
- cartoon unicorns or mascot comedy;
- 3D chrome objects that overpower the interface;
- third-party logos, fake startup logos, fake partner marks;
- long in-image text, illegible UI copy, hallucinated charts;
- random metrics presented as factual data;
- heavy rainbow palettes or multiple unrelated accent colors.

## Composition Rules

- One hero object or one diagram per image.
- 16:9 for hero/cover/background, 4:3 for page-side visual slots, 1:1 only for
  object tiles or portraits.
- Keep subject centered enough for responsive cropping, but leave generous
  negative space for surrounding page layout.
- No hard white cards floating on dark unless they are intentional product
  panels.
- If a visual includes a UI mockup, make the UI readable at card size.
- If a visual includes glass, its glow must follow the product palette and stay
  local.

## Asset-Specific Guidance

### Product overview

Generate light editorial scenes:

- decks converging into lens and ranked workspace;
- seven-step organizer path as a lit node track;
- three-module bento with Entry Hub, Evidence Reports, Review Board.

### Entry Hub

Generate clean intake/product cards:

- deck cards, note cards, status cards, entry record, clean workspace;
- light surfaces preferred, with soft violet/cyan rim-light;
- readiness statuses must use green/amber/violet consistently.

### Trust and prompt injection

Generate diagrams, not fear imagery:

- deck text is evidence, not command;
- hidden instruction passes through lens and gets tagged;
- vertical layers: judges → deterministic math → advisory narrative → human.

No shields, hackers, red cyber walls, or "attack" drama.

### About and contact

Generate calm brand/world images:

- lens focusing applications into one signal;
- AI Jury → EvalLense history as a node chain;
- contact signal converging into one lens point;
- documentation page / open guide as a quiet ink-surface object.

Team portraits should eventually use real photos. Generated stand-ins must be
clearly treated as temporary art direction, not real people.

### Blog

Prefer light editorial diagrams unless the article is specifically cinematic.
Every inline image should explain one concept: pipeline, matrix, spread,
decision board, routing, disagreement, brand evolution.

## Master Prompt Template

```text
Create an EvalLense website image for [slot/page].
Concept: [one sentence].
Style: Apple-neutral editorial product visualization, generous negative space,
1px hairline geometry, soft violet depth, precise UI-like structure.
Palette: white #ffffff / soft #f5f5f7 or ink #000000 / panel #0a0a0d, with one
118-degree lens gradient accent only: violet #6c4cf1, lavender #a99bff,
cyan #2ec5e8, aqua #36e0c2.
Composition: [16:9 / 4:3 / 1:1], [main subject], [supporting elements].
Meaning hierarchy: AI evidence is muted, human decision/action is primary.
Typography: tiny mono labels only where needed; no long text.
Avoid: stock people, shields, logos, cartoon unicorns, generic AI magic, chrome
overload, random metrics, unreadable text.
```
