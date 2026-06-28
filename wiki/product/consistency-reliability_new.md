---
title: Consistency & Reliability
status: generated
version: 1.2
updated: 2026-06-28
route: /trust/consistency-reliability
section: trust
nav_label: Consistency & Reliability
in_header_nav: false
in_footer_nav: true
cta: Book a Demo
---

# Consistency & Reliability

← [[index|Wiki]] · [[sitemap|Карта сайта]]

Trust-страница: объясняет, как EvalLense делает стабильность оценки видимой и
измеримой — где результаты согласованы, где судьи расходятся, и где нужен человек.

> Продуктовый бриф страницы. Факты сверены с источником правды `ai-jury-prod`:
> `wiki/product/benchmarking-methodology.md`, `wiki/product/scope.md` §5,
> `wiki/product/benchmark-research/`, и **measured benchmark**
> `notes/reports/2026-06-13-basalt-coin-j-p5-team-readiness-*`.
> Раздел «Контент по секциям» — финальная EN-копия взята из живого кода страницы
> (`page.tsx`). **Решение user (2026-06-17): подаём benchmark-числа агрессивно**,
> но с явной пометкой scope (single-deck repeatability test) прямо в копии.
> **Синхронизировано с кодом 2026-06-28.**

## Роль и аудитория

- **Роль страницы:** показать, что EvalLense заботится о *качестве* оценки, а не
  только об объёме — делает variance, repeatability и disagreement видимыми и
  измеримыми, и привязывает их к human-in-the-loop.
- **Для кого:** VC-фонды, акселераторы, организаторы конкурсов — те, кто принимает
  решения по результатам и кому важно знать, *насколько* устойчив балл.
- **Ключевое сообщение:** балл полезен, только если известно, насколько он
  устойчив. EvalLense вскрывает согласие, разброс и случаи, требующие человека — и
  **измеряет** воспроизводимость, а не прячет её за усреднением.
- **Целевое действие:** Book a Demo → `/company/contact`; вторичный путь —
  View live report → `/try-live-demo`.

## In-page nav (header)

Якорные ссылки в `PageHeader`, секция «Trust» → `/trust`:

| Label | Href |
|---|---|
| Mechanisms | `#mechanisms` |
| Spread | `#spread` |
| Benchmark | `#benchmark` |

## Структура секций

| # | Секция | Архетип | Движение | Поверхность | Что показываем |
|---|---|---|---|---|---|
| 1 | Hero | StatementHero | reveal | light | «Reliability you can inspect» + lens-акцент + CTA |
| 2 | Почему усреднение опасно | editorial-split (page-local) | reveal | light | Два дека с одинаковым средним: consensus-dial vs conflict-dial |
| 3 | Механизмы надёжности | Cinema | reveal | ink | Cinematic statement + видео |
| 4 | Два слоя надёжности | EditorialSplit | reveal | light | Aggregation детерминирована · judge-слой измеряется на repeatability |
| 5 | Spread — разброс судей | PinnedSteps | pin | ink | Пороги Consensus / Split / Conflict; SpreadLensScene |
| 6 | Контроль смещений | risk-control grid (page-local) | reveal | ink | Таблица risk → control (halo, generic scoring, overweighting, AI overreach) |
| 7 | Benchmark evidence | stat-bento (page-local) + BentoHorse | reveal | ink | **Measured**: SD 0.096, ~60% variance↓, ~86% профиль + expandable scope/targets |
| 8 | Граница надёжности | editorial-hero v3 (page-local) | reveal | ink | Что система НЕ обещает; DelayedLoopVideo |
| 9 | Final CTA | StatementHero v1 | reveal | ink | Призыв + Book a Demo; видеофон |

> Ритм light↔ink (1L·2L·3I·4L·5I·6I·7I·8I·9I).
> Секции 6, 8 — **ink** (в коде, не light как в предыдущем брифе).
> Секция 3 — **Cinema** (не bento), секция 4 — image-slot (не scrub-ring).
> Архетипы/классы — из [[section-types|Section Types]] (`consistency-*`). Ритм — по
> [[page-design-patterns|Page Design Patterns]].

## Контент по секциям

> Ниже — финальная английская копия из живого кода. Русским — только редакторские пометки.
> `[lens]` помечает слово под градиент-акцент.

### 1. Hero — `light`
- **Eyebrow:** Consistency & Reliability
- **Heading (lens на `inspect`):** Reliability you can `[inspect]`, not just trust
- **Subhead:** EvalLense shows which scores stay stable, where judges disagree, and when human review is needed. It also tracks how results change across repeated runs.
- **CTA:** Book a Demo → `/company/contact`
- **Media slot:** `16/9` — Two lenses with the same average but a different scatter of judge points
  - Hint: "Two lenses, same average, different scatter density — lens-gradient violet→cyan→aqua, calm"
  - Path: `/assets/consistency/` (hero image, not yet named in code)

### 2. Почему усреднение опасно — `light`
- **Eyebrow:** The problem with one number
- **Heading (lens на `disagreement`):** An average can hide `[disagreement]`
- **Subhead:** Two decks can have the same average score. One may have broad agreement. The other may split the judges. The average alone does not show the difference.
- **Points:**
  - **Clear cases** — Judges broadly agree on the result.
  - **Contested cases** — The same average can hide very different judge opinions.
  - **False precision** — A precise score can still carry uncertainty.
- **Media:** Два изображения-диала рядом (flex, прозрачный фон, без белой карточки):
  - `CONSENSUS` / "Judges agree" — `/assets/consistency/consensus-dial.webp` (680×680)
  - `CONFLICT` / "Judges are split" — `/assets/consistency/conflict-dial.webp` (680×681)
  - Оба обёрнуты в `FloatFx` (класс `ev-float` / `ev-float ev-float--b`)
- **Background:** BlobField (blob-host)

### 3. Механизмы надёжности — `ink` · `id="mechanisms"`
- **Компонент:** `Cinema` (не bento)
- **Eyebrow:** How reliability is built
- **Headline:** Reliable scoring is built, not assumed
- **Lines (desktop / mobile):**
  - desktop: `["Reliable scoring is", "built, not assumed"]`
  - mobile: `["Reliable scoring", "is built,", "not assumed"]`
- **Sub:** Fixed criteria, independent judges, deterministic aggregation, and visible disagreement make every result easier to inspect — reliability is engineered into the pipeline, not taken on faith.
- **Media:** video `/assets/consistency/consistency-cta-bg.mp4`

> ⚠️ В предыдущем брифе §3 был описан как bento с 7 тайлами (Fixed dimensions,
> Specialized judges, Independent outputs, Routing matrix, Deterministic math, Spread,
> Human review). В живом коде это Cinema (кинематографическое утверждение + видео).
> Тайлы **отсутствуют** на странице.

### 4. Два слоя надёжности — `light`
- **Eyebrow:** Two layers
- **Heading:** One layer is `[deterministic]`. The other is measured.
- **Subhead:** EvalLense separates the math from the judgment and holds each to its own standard.
- **Points:**
  - **Aggregation is deterministic.** Once judge outputs exist, the score is calculated by a deterministic aggregation function, not another LLM call. The same judge outputs and weights produce the same AI Total Score every time, with only rounding-level tolerance.
  - **Judges are measured for repeatability.** The AI judge layer runs on a language model, so repeated runs are not always identical. We benchmark that repeatability: in repeated runs of the same deck, our latest calibration prompt reduced run-to-run variance by about 60%, and the same deck reproduced the same dimension profile in roughly 86% of runs (internal single-deck repeatability test; see benchmark evidence below).
- **Media:** image `4/3` — `/assets/consistency/ai-total-score-machine-4.webp` (1448×1086)
  - ariaLabel: "A glass aggregation machine combining judge scores into a single AI Total Score of 7.7"

> Предыдущий бриф описывал «scrub-ring» для медиа-слота и называл «anti-bias prompt».
> В живом коде: статичное изображение (webp) и термин «calibration prompt».

### 5. Spread — разброс судей — `ink` · `id="spread"`
- **Компонент:** `PinnedSteps`
- **Eyebrow:** Disagreement in the open
- **Heading:** When judges `[split,]` / the report says so
- **Subhead:** EvalLense tracks the spread between judges on each dimension and turns it into a clear label. A high spread does not lower the score automatically. It routes your attention to the decks worth a closer look. It is a signal, not a penalty.
- **Steps (SPREAD_STEPS):**
  - `< 1.5` · **Consensus** — Judges agree. The dimension reads the same way across the jury.
  - `1.5 – 2.99` · **Split** — Judges diverge. It is worth checking where the views split.
  - `≥ 3.0` · **Conflict** — Strong disagreement. The report flags this dimension for human review.
- **Media (right):** `SpreadLensScene` — анимированные три линзы-цели с pointer-parallax:
  - `/assets/consistency/spread-target-consensus.webp` (474×638)
  - `/assets/consistency/spread-target-split.webp` (543×650)
  - `/assets/consistency/spread-target-conflict.webp` (540×645)
- **Page-local CSS:** lens-gradient на числа порогов; все три строки lit (opacity:1); колонка фиксированной ширины для выравнивания

> Прежний eyebrow: "Disagreement, in the open" (с запятой). В коде — без запятой.

### 6. Контроль смещений — `ink`
- **Компонент:** page-local `.bias-grid` секция (`className="consistency band ink consistency-bias"`)
- **Eyebrow:** Bias controls
- **Heading:** Common evaluation risks have `[built-in checks]`
- **Subhead:** Each common evaluation risk maps to a built-in control, so the process relies on structure rather than goodwill.
- **Pairs (BIAS_ROWS, risk → control):**
  - **Halo effect** → Dimensions are split across separate judges.
  - **Generic scoring** → Dimension-specific prompts and criteria per judge.
  - **Overweighting presentation** → Pitch Quality is visible, but it does not dominate the score.
  - **Hidden disagreement** → Spread plus the judge contribution matrix.
  - **AI overreach** → The AI Total Score is advisory. The human decides.
  - **Assumption-filling** → Missing evidence becomes a gap or a question, not a guess.
- **Background:** BlobField variant="b"

> ⚠️ Предыдущий бриф: surface «light», heading «Every common bias has a built-in check».
> В живом коде: surface **ink**, heading «Common evaluation risks have built-in checks»,
> плюс добавлен subhead.

### 7. Benchmark evidence — `ink` · `id="benchmark"`
- **Eyebrow:** Measured, not asserted
- **Heading:** We `[benchmark]` the scoring and publish what we find
- **Sub (под бенто):** We rerun controlled decks and measure whether scores hold. Here is the latest repeatability run.
- **Stat-cards (BENCHMARK_STATS) — 4 карточки вокруг BentoHorse:**
  - `0.096` — Score standard deviation across 24 reruns of the same deck · *Internal benchmark deck*
  - `~60% lower` — Run-to-run variance after our latest calibration prompt · *vs the prior prompt*
  - `~86%` — Reruns that reproduced the same dimension profile · *12 of 14*
  - `<1%` — Aggregation consistency check (same inputs → same total) · *Deterministic aggregation function*
- **Центр бенто:** `BentoHorse` (анимированный unicorn orb, mix-blend-screen) + `UnicornSpeech`
- **Backdrop:** looping video `/assets/consistency/benchmark-bg.mp4` (за карточками, feathered edges)
- **CTAs (под бенто):**
  - **View live report** → `/try-live-demo` (primary)
  - **Book a Demo** → `/company/contact` (glass)
- **Expandable details (`<details>`) — «Benchmark scope & targets»:**
  - `UnicornEggBadge`
  - Scope: Internal repeatability benchmark: J-P5 Team Readiness, one deck, 24 runs, June 2026. A multi-deck regression across the full panel is in progress.
  - Targets: final-score standard deviation ≤ 3 · score-band consistency ≥ 90% · critical-risk recall ≥ 90% · schema-valid outputs ≥ 99% · regression pass ≥ 95%.
  - Story: EvalLense comes from **1,000+ internal evaluation runs**, starting with an Amazon Nova hackathon prototype and the earlier AI Jury system.

> Предыдущий бриф: «400+ прогонов» (product story) — устарело; в коде и меморис — **1,000+**.
> CTAs «View live report» + glassmorphic expandable details — новые в коде, в прежнем брифе отсутствовали.

### 8. Граница надёжности — `ink`
- **Компонент:** page-local реплика `StatementHero` v3 (`ds-hero__v ds-hero__v3`), `className="band ink ds-hero consistency-honest-edge"`
- **Eyebrow:** What we do not claim
- **Heading (lens на `Reliability`):** `[Reliability]` has an honest edge
- **Sub:** EvalLense does not promise to predict startup success. It raises the quality of evaluation by making it structured, evidence-linked, and checkable. It points you to the decisions that need human attention most — and because absolute calibration across every deck type is still being proven, the human makes the final call.
- **Media:** `DelayedLoopVideo` — `/assets/consistency/honest-edge-bg.mp4`; plays once, holds last frame, replays after 7-second gap (не continuous loop)
- **Layout:** editorial split (copy left, media right); на desktop медиа scale(1.5) anchored left, растёт в правый гаттер

> ⚠️ Предыдущий бриф: surface «light»; содержал абзац «Reliability signals — low
> confidence, high spread, surfaced gaps — help a person focus on the borderline,
> unstable, and high-stakes calls.» В живом коде этот абзац **отсутствует**; surface **ink**.

### 9. Final CTA — `ink` · `id="get-started"`
- **Компонент:** `StatementHero` version=1, surface="ink", background="video"
- **Background video:** `/assets/consistency/consistency-cta-bg-2.mp4`
- **Eyebrow:** Get started
- **Heading:** See how stable the scores are on `[your own decks]`
- **Sub:** Book a demo and see consensus, spread, and reproducibility on a real batch.
- **CTA:** Book a Demo → `/company/contact`
- **Page-local:** fade from black at top (gradient overlay) чтобы слиться с §8 ink без жёсткого шва

## Числа и факты

| Факт | Значение | Источник (ai-jury-prod) |
|---|---|---|
| Score SD (24 reruns, same deck) | **0.096** (raw overall, EXP v7) | `notes/reports/2026-06-13-basalt-coin-j-p5-team-readiness-benchmark-report.md` §6 |
| Variance reduction (calibration prompt) | **~60% lower vs the prior prompt** | там же §6 |
| Identical profile reproducibility | **~86% (12 of 14)** | там же §7 |
| Benchmark scope | **single deck, J-P5, 24 runs** (multi-deck pending) | там же §1, §16–17 |
| Determinism tolerance (aggregation) | **<1%** (same inputs → same total) | `scope.md` §5.3 AC5.SM1 |
| Spread-пороги | <1.5 / 1.5–2.99 / ≥3.0 | reliability-framework / `scope.md` §5.4 |
| Confidence-веса *(внутр., не рендерить)* | 0.55 / 0.70 / 0.85 | `scope.md` §5.4 |
| Целевые пороги (targets, не результаты) | stddev ≤3 · band ≥90% · recall ≥90% · schema ≥99% · regression ≥95% | `benchmarking-methodology.md` (колонка «Good») |
| Внутренних прогонов (продуктовая история) | **1,000+** | живой код §7 + memory |

> **Подача (решение user 2026-06-17 — агрессивно, но честно):** measured-числа
> (0.096 / ~60% / ~86%) выносим на видное место в стат-банде, **но scope-label
> «single-deck repeatability test, multi-deck pending» обязателен в expandable
> details** — чтобы не читалось как портфельная гарантия. Целевые пороги — отдельно,
> как «targets on a controlled set». Confidence-веса (0.55/0.70/0.85) — внутренние,
> не рендерить (консистентно с [[sitemap|Methodology]]).

## Изображения и медиа

| Слот | Секция | Путь | Формат | Размер |
|---|---|---|---|---|
| hero | §1 | `/assets/consistency/` (не указан в коде) | webp | 16:9 |
| consensus-dial | §2 | `/assets/consistency/consensus-dial.webp` | webp | 680×680 |
| conflict-dial | §2 | `/assets/consistency/conflict-dial.webp` | webp | 680×681 |
| mechanisms bg | §3 | `/assets/consistency/consistency-cta-bg.mp4` | video | 16:9 |
| aggregation machine | §4 | `/assets/consistency/ai-total-score-machine-4.webp` | webp | 1448×1086 |
| spread consensus | §5 | `/assets/consistency/spread-target-consensus.webp` | webp | 474×638 |
| spread split | §5 | `/assets/consistency/spread-target-split.webp` | webp | 543×650 |
| spread conflict | §5 | `/assets/consistency/spread-target-conflict.webp` | webp | 540×645 |
| benchmark bg | §7 | `/assets/consistency/benchmark-bg.mp4` | video | backdrop |
| honest edge bg | §8 | `/assets/consistency/honest-edge-bg.mp4` | video | 16:9 |
| final cta bg | §9 | `/assets/consistency/consistency-cta-bg-2.mp4` | video | full-bleed |

## Внутренние ссылки

- **Header/Footer nav:** пункт `Consistency & Reliability` → `/trust/consistency-reliability` (footer-секция TRUST).
- **Cross-links со страницы (live demo + demo contact):**
  - `/try-live-demo` — View live report (§7 CTA)
  - `/company/contact` — Book a Demo (§1, §7, §9 CTA)
- **Cross-links из брифа (не в коде, но рекомендованные):**
  - [[sitemap|Methodology]] — как устроена оценка целиком
  - [[sitemap|Prompt Injection Safety]] — почему контент дека не ломает оценку
  - [[sitemap|Evidence-Based Reports]] — что внутри отчёта
  - [[sitemap|Security & Privacy]] — как обрабатываются деки

## SEO / meta

- **`<title>`:** EvalLense — Consistency & Reliability of Pitch Evaluation
- **meta description:** How EvalLense makes score stability measurable: deterministic
  aggregation, benchmarked judge repeatability, judge spread, and bias controls —
  inspectable, not just promised. *(≤155)*
- **OG-изображение:** слот `hero`

## Источники истины

### Wiki (landing)
- [[vision|Vision]] · [[scope|Scope]] · [[sitemap|Карта сайта]]
- [[design-system|Design System]] / [[section-types|Section Types]] — stat-bento, risk-control grid, Cinema, PinnedSteps

### Application (`ai-jury-prod`) — сверено 2026-06-17
- `notes/reports/2026-06-13-basalt-coin-j-p5-team-readiness-benchmark-report.md` — **measured repeatability** (SD 0.096, variance↓, mode share, scope/limits)
- `wiki/product/benchmark-research/2026-06-12-judge-primary-bias-study.md` — bias-патоки, рекомендации (advisory-scoring, роль J-P4 — модель в эволюции)
- `wiki/product/benchmarking-methodology.md` — целевые пороги, dataset, repeated runs
- `wiki/product/scope.md` §5.3–5.4 — Function 1 math, determinism AC, confidence-веса

## Acceptance (что считать готовым)

- [x] страница доступна по `/trust/consistency-reliability`, обёрнута в `PageHeader` + `Footer`
- [x] все 9 секций собраны с финальной EN-копией
- [x] секция 7: measured stat-band (0.096 / ~60% / ~86% / <1%) со scope в expandable details
- [x] секция 4: двухслойный нарратив (determinism + judge repeatability measured)
- [x] spread / bias-control присутствуют; целевые пороги поданы как targets
- [x] добавлена ссылка в footer-nav (TRUST); только токены/классы design-system
- [ ] `cd web && pnpm build` зелёный; `prefers-reduced-motion` уважается

## Открытые вопросы

- **⚠️ Scope measured-чисел — single deck / single judge.** Агрессивная подача
  одобрена (user, 2026-06-17), но scope-label обязателен в копии. Как только
  пройдёт **multi-deck regression по всей панели** — заменить на портфельные числа
  и убрать «single-deck» оговорку. До тех пор не обобщать.
- **Wiki-vs-reality: модель судей в эволюции.** Bias-study рекомендует убрать
  numeric advisory-scoring и починить роль J-P4 (нет primary-измерения; кандидат —
  P4 Business/GTM). Бенчмарк ещё использует advisory-веса. Страница описывает
  текущую модель; если рефактор выкатится — синхронизировать Methodology + эту страницу.
- **Точные целевые пороги** (stddev ≤3 и т.д.) — публикуем как «targets on a
  controlled set», не как достигнутые гарантии. Подтвердить, что ок показывать.
- **Confidence-веса (0.55/0.70/0.85)** — внутренние, не рендерим (как на Methodology).
- **Prompt-versioning defect** (raw JSON всё помечен `v2.1`) — внутренняя заметка,
  на сайт не выносить; влияет только на воспроизводимость benchmark provenance.
- **Bento-7-tiles (предыдущий §3)** — механизмы из брифа (Fixed dimensions, Specialized
  judges, Independent outputs, Routing matrix, Deterministic math, Spread, Human review)
  убраны со страницы. При необходимости вернуть — добавить отдельную секцию или
  расширить Cinema subhead.
