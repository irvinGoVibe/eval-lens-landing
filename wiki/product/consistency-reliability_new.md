---
title: Consistency & Reliability
status: generated
version: 1.1
updated: 2026-06-17
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

> Продуктовый бриф страницы для skill `build-pages`. Факты сверены с источником
> правды `ai-jury-prod`: `wiki/product/benchmarking-methodology.md`,
> `wiki/product/scope.md` §5, `wiki/product/benchmark-research/`, и **measured
> benchmark** `notes/reports/2026-06-13-basalt-coin-j-p5-team-readiness-*`.
> Раздел «Контент по секциям» — финальная EN-копия. **Решение user (2026-06-17):
> подаём benchmark-числа агрессивно**, но с явной пометкой scope (single-deck
> repeatability test) прямо в копии. Числа — с источником.

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
  Explore Methodology → `/trust/methodology`.

## Структура секций

| # | Секция | Архетип | Движение | Поверхность | Что показываем |
|---|---|---|---|---|---|
| 1 | Hero | statement-hero | reveal | light | «Reliability you can inspect» + lens-акцент + CTA |
| 2 | Почему усреднение опасно | editorial-split | reveal | light | Два дека с одинаковым средним: согласие vs конфликт |
| 3 | Механизмы надёжности | bento | reveal | ink | 7 механизмов: fixed dimensions, independent judges, routing, det. math, spread, human review |
| 4 | Два слоя надёжности | editorial-split + scrub-ring | scrub | light | Aggregation детерминирована (<1%) · judge-слой измеряется на repeatability |
| 5 | Spread — разброс судей | stat-band / pinned | pin | ink | Пороги Consensus / Split / Conflict; spread маршрутизирует внимание, не штрафует |
| 6 | Контроль смещений | risk-control grid | reveal | light | Таблица risk → control (halo, generic scoring, overweighting, AI overreach) |
| 7 | Benchmark evidence | stat-band | reveal | ink | **Measured**: SD 0.096, ~60% variance↓, ~86% профиль + целевые пороги |
| 8 | Граница надёжности + эскалация | editorial-split | reveal | light | Что система НЕ обещает; сигналы ведут человека к borderline-кейсам |
| 9 | Final CTA | quiet-cta | reveal | ink | Призыв + Book a Demo |

> Ритм light↔ink (1L·2L·3I·4L·5I·6L·7I·8L·9I — ≥1 ink, доверие/benchmark/CTA тёмные).
> Архетипы/классы — из [[section-types|Section Types]] (`consistency-*`). Ритм — по
> [[page-design-patterns|Page Design Patterns]].

## Контент по секциям

> Ниже — финальная английская копия. Русским — только редакторские пометки.
> `[lens]` помечает слово под градиент-акцент.

### 1. Hero — `light`
- **Eyebrow:** Consistency & Reliability
- **Heading (выбран; lens на `inspect`):** Reliability you can inspect, not just trust
- **Subhead:** EvalLense shows where scores are stable, where judges disagree, and where a person should decide — and it measures run-to-run repeatability instead of asking you to take it on faith.
- **CTA:** Book a Demo

### 2. Почему усреднение опасно — `light`
- **Eyebrow:** The problem with one number
- **Heading:** An average can hide a fight
- **Subhead:** Two decks can land on the same average score — one with broad agreement, the other with a real split. You need to know which is which.
- **Points:**
  - **Clear cases** — some decks are obvious leaders or laggards; the panel agrees.
  - **Contested cases** — others pull the judges apart, and the average buries it.
  - **False precision** — a score can look exact while sitting on real uncertainty.

### 3. Механизмы надёжности — `ink`
- **Eyebrow:** How reliability is built
- **Heading:** Reliability is a process, not a hope
- **Subhead:** Structure is what makes scores trustworthy — fixed criteria, independent reads, deterministic aggregation, and visible disagreement.
- **Tiles (bento):**
  - **Fixed dimensions (P1–P6)** — Criteria don't drift between decks.
  - **Specialized judges (J-P1…J-P6)** — Each lens is scored separately.
  - **Independent outputs** — Judges never see one another's scores, cutting group bias.
  - **Routing matrix** — Controls how much each judge contributes per dimension.
  - **Deterministic math** — Aggregation is reproducible and auditable.
  - **Spread** — Disagreement is surfaced, not hidden.
  - **Human review** — The final decision stays with a person.

### 4. Два слоя надёжности — `light`
- **Eyebrow:** Two layers
- **Heading:** One layer is guaranteed, the other is measured
- **Subhead:** EvalLense separates the math from the judgment — and holds each to its own standard.
- **Points (left):**
  - **Aggregation — deterministic.** Once the judges' outputs exist, the score is pure math (Summarizer Function 1, no LLM). The same judge outputs and the same weights produce the same AI Total Score every time — within 1%.
  - **Judges — measured for repeatability.** The AI judge layer runs on a language model, so it isn't bit-for-bit identical. We benchmark it: in repeated runs of the same deck, our latest anti-bias prompt cut run-to-run variance by about 60%, and the deck reproduced the same dimension profile in roughly 86% of runs *(internal single-deck repeatability test — see Benchmark evidence)*.
- **Scrub-ring (right):** confidence-ring `.po-ring`, заполняется по `--scrub`.

### 5. Spread — разброс судей — `ink`
- **Eyebrow:** Disagreement, in the open
- **Heading:** When judges split, the report says so
- **Subhead:** EvalLense tracks the spread between judges on each dimension and turns it into a plain label.
- **Bands (chips):** `< 1.5` Consensus · `1.5–2.99` Split · `≥ 3.0` Conflict
- **Body:** A high spread doesn't lower the score automatically — it routes your attention to the decks worth a closer look. It's a signal, not a penalty.

### 6. Контроль смещений — `light`
- **Eyebrow:** Bias controls
- **Heading:** Every common bias has a built-in check
- **Pairs (risk → control):**
  - **Halo effect** → Dimensions P1–P6 split across separate judges.
  - **Generic scoring** → Dimension-specific prompts and rubrics per judge.
  - **Overweighting presentation** → Pitch Quality is visible but doesn't dominate the score.
  - **Hidden disagreement** → Spread plus the judge contribution matrix.
  - **AI overreach** → The AI Total Score is advisory only; the human decides.
  - **Assumption-filling** → Missing evidence becomes a gap or a question, not a guess.

### 7. Benchmark evidence — `ink`
- **Eyebrow:** Measured, not asserted
- **Heading:** We benchmark the scoring — and publish what we find
- **Subhead:** We rerun controlled decks and measure whether the scores hold. Here's the latest repeatability run.
- **Stat-band (measured — с явной пометкой scope):**
  - **0.096** — score standard deviation across 24 reruns of the same deck
  - **~60% lower** — run-to-run variance after our latest anti-bias prompt (vs the prior prompt)
  - **~86%** — reruns that reproduced the identical dimension profile (12 of 14)
  - **<1%** — deterministic aggregation tolerance (same inputs → same total)
- **Scope label (обязательно в копии, мелким под стат-бандом):** Internal repeatability benchmark — J-P5 Team Readiness, single deck (Basalt Coin), 24 runs, June 2026. Multi-deck regression across the full panel is in progress.
- **Targets (рядом, как «целевые пороги на контролируемом наборе», не гарантия):** final-score stddev ≤ 3 · score-band consistency ≥ 90% · critical-risk recall ≥ 90% · schema-valid outputs ≥ 99% · regression pass ≥ 95%.
- **Product story:** The path from an Amazon Nova hackathon prototype and AI Jury to EvalLense ran through 400+ internal evaluation runs.

### 8. Граница надёжности + эскалация — `light`
- **Eyebrow:** What we don't claim
- **Heading:** Reliability has an honest edge
- **Subhead:** EvalLense doesn't promise to predict a startup's success. It raises the quality of the evaluation — structured, evidence-linked, and checkable — and points you to the decisions that need you most.
- **Body:** Reliability signals — low confidence, high spread, surfaced gaps — help a person focus on the borderline, unstable, and high-stakes calls. Absolute calibration across every deck type is still being proven; that's why the human makes the final call.

### 9. Final CTA — `ink`
- **Eyebrow:** Get started
- **Heading:** See how stable the scores are on your own decks
- **Subhead:** Book a demo and watch consensus, spread, and reproducibility play out on a real batch.
- **CTA:** Book a Demo

## Числа и факты

| Факт | Значение | Источник (ai-jury-prod) |
|---|---|---|
| Score SD (24 reruns, same deck) | **0.096** (raw overall, EXP v7) | `notes/reports/2026-06-13-basalt-coin-j-p5-team-readiness-benchmark-report.md` §6 |
| Variance reduction (anti-bias prompt) | **~59% vs prev · ~67% vs legacy** | там же §6 |
| Identical profile reproducibility | **12/14 = 85.7%** | там же §7 |
| Mode share per dimension | P3 100% · P4 100% · P5 92.9% · P6 92.9% | там же §7 |
| Benchmark scope | **single deck, J-P5, 24 runs** (multi-deck pending) | там же §1, §16–17 |
| Determinism tolerance (aggregation) | <1% (same inputs → same total) | `scope.md` §5.3 AC5.SM1 |
| Confidence-веса *(внутр., не рендерить)* | 0.55 / 0.70 / 0.85 | `scope.md` §5.4 |
| Spread-пороги | <1.5 / 1.5–2.99 / ≥3.0 | reliability-framework / `scope.md` §5.4 |
| Целевые пороги (targets, не результаты) | stddev ≤3 · band ≥90% · recall ≥90% · schema ≥99% · regression ≥95% | `benchmarking-methodology.md` (колонка «Good») |
| Внутренних прогонов (продуктовая история) | 400+ | homepage-structure.md |

> **Подача (решение user 2026-06-17 — агрессивно, но честно):** measured-числа
> (0.096 / ~60% / ~86%) выносим на видное место в стат-банде, **но scope-label
> «single-deck repeatability test, multi-deck pending» обязателен в копии рядом** —
> чтобы не читалось как портфельная гарантия. Целевые пороги — отдельно, как
> «targets on a controlled set». Confidence-веса (0.55/0.70/0.85) — внутренние, не
> рендерить (консистентно с [[sitemap|Methodology]]).

## Изображения

| Слот | Где на странице | Что изображено | Промпт-набросок (стиль бренда) |
|---|---|---|---|
| hero | секция 1 | Две «линзы» с одинаковым средним, но разной плотностью разброса точек | lens-градиент violet→cyan→aqua, Apple-нейтраль, calm, без security-театра; `.media-ph` 16:9 |
| spread | секция 5 | Шкала Consensus→Split→Conflict: точки судей сходятся/расходятся вдоль оси | те же токены, три зоны подсвечены по порогам; `.media-ph` 4:3 |
| benchmark | секция 7 | Стат-полоса measured-чисел (SD/variance/reproducibility) + scope-label | ink, бары с lens-акцентом на одном показателе; `.media-ph` 21:9 |

## Внутренние ссылки

- **Header/Footer nav:** пункт `Consistency & Reliability` → `/trust/consistency-reliability` (footer-секция TRUST).
- **Cross-links со страницы:**
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
- [[design-system|Design System]] / [[section-types|Section Types]] — stat-band, scrub-ring, risk-control grid

### Application (`ai-jury-prod`) — сверено 2026-06-17
- `notes/reports/2026-06-13-basalt-coin-j-p5-team-readiness-benchmark-report.md` — **measured repeatability** (SD 0.096, variance↓, mode share, scope/limits)
- `wiki/product/benchmark-research/2026-06-12-judge-primary-bias-study.md` — bias-патоки, рекомендации (advisory-scoring, роль J-P4 — модель в эволюции)
- `wiki/product/benchmarking-methodology.md` — целевые пороги, dataset, repeated runs
- `wiki/product/scope.md` §5.3–5.4 — Function 1 math, determinism AC, confidence-веса

## Acceptance (что считать готовым)

- [ ] страница доступна по `/trust/consistency-reliability`, обёрнута в `SiteHeader` + `Footer`
- [ ] все 9 секций собраны с финальной EN-копией
- [ ] секция 7: measured stat-band (0.096 / ~60% / ~86% / <1%) **со scope-label рядом**
- [ ] секция 4: двухслойный нарратив (determinism guaranteed + judge repeatability measured)
- [ ] таблицы spread / bias-control присутствуют; целевые пороги поданы как targets
- [ ] добавлена ссылка в footer-nav (TRUST); только токены/классы design-system
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
