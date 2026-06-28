---
title: Methodology
status: live-synced
version: 2.0
updated: 2026-06-28
route: /trust/methodology
section: trust
nav_label: Methodology
in_header_nav: false
in_footer_nav: true
cta: Book a Demo
---

# Methodology

← [[index|Wiki]] · [[sitemap|Карта сайта]]

Trust-страница: объясняет методологию оценки EvalLense — как AI-жюри оценивает
питч-деки по явным критериям с привязкой к доказательствам, и почему результату
можно доверять, когда финальное решение остаётся за человеком.

> Продуктовый бриф страницы — **синхронизирован с живым кодом** `web/src/app/trust/methodology/page.tsx` (2026-06-28). Структура страницы расширена с 8 до 12 секций. Секции «Принципы» и «AI-жюри» заменены новыми блоками (Why / Runs / Foundations / Dimension Matrix / Routing Matrix / Limits / Related). Scoring model переехал в light-зону. Фактологическая таблица и открытые вопросы — из предыдущей версии, актуальные позиции сохранены.

## Роль и аудитория

- **Роль страницы:** изложить методологию оценки — criteria-based evaluation,
  роли AI-судей, rubric, scoring model, детекция расхождений — как основу доверия
  к результату.
- **Для кого:** организаторы (VC, акселераторы, конкурсы) и эксперты-сожюри,
  которым важно понимать, *как* получается оценка, а не только её число.
- **Ключевое сообщение:** оценка EvalLense — не «чёрный ящик»: воспроизводимый
  процесс по явным критериям, где каждый балл привязан к доказательствам в деке,
  а финальное решение принимает человек.
- **Целевое действие:** Book a Demo → `/company/contact`.

## Структура секций

| # | ID | Секция | Компонент | Поверхность | Что показываем |
|---|---|---|---|---|---|
| 1 | hero | Hero | StatementHero v2 | light | «A score you can inspect, compare, and defend» + 2 CTA |
| 2 | why | Review at scale | RiskControl v2 (page-local) | light | 4 Risk → System response пары (gradient cards) |
| 3 | runs | Field tested | StatBand v2 (page-local) | light | 3 стата: 400+ runs / 6 judge lenses / P1-P6 dimensions |
| 4 | foundations | Method foundations | Bento v1 | light | 3 тайла: Lean Startup / Customer Development / VC Due Diligence |
| — | — | Tonal zone flip | ZoneToneFlip | — | light → ink crossfade |
| 5a | pipeline | Every deck follows the same path | PinnedSteps v3 | ink | 5 фиксированных стадий с scrub-видео |
| 5 | matrix | Dimension matrix | Gallery v4 | ink | P1–P6 как вопросы, один rubric |
| — | — | Reverse tonal flip | ZoneToneFlipReverse | — | ink → light crossfade (brand bridge) |
| 6 | routing | Routing matrix | RoutingMatrix | light | Полная таблица judge × dimension с ролями |
| 7 | evidence | Score trace | EditorialSplit v3 | light | 4-шаговая процедура evidence-before-score |
| 7a | — | The scoring model | Bento v1 | light | 5 тайлов: Per dimension / Confidence / Total / Disagreement / Reproducible |
| 8 | disagreement | Review signals | RiskControl (shared) | light | Spread как сигнал: 4 пары Signal → Meaning |
| 9 | control | Human control | section (page-local, mirror layout) | light | 4 шага HITL + looping video |
| 10 | limits | Clear boundaries | section (page-local, v2 cards) | light | 4 пары «It is not» → «What it does» |
| 11 | related | Trust layers | section (page-local, v3 expanded) | ink | 5 deep-dive ссылок |
| 12 | — | Final CTA | Cinema | ink | «Follow one score from slide to final call» + Book a Demo |

> **Тональный ритм:** light-зона §1–4 → ink-пик §5a–5 → light-зона §6–10 → ink-хвост §11–12. Два tonal-flip перехода (ZoneToneFlip / ZoneToneFlipReverse) образуют единый фон на всю страницу. Поверхности §6–10 все light — это отход от старого чередования light/ink.

> **Header nav (anchor links на этой странице):** Foundations · Matrix · Evidence · Control.

## Контент по секциям

> Ниже — финальная английская копия из кода страницы. Русским — только редакторские пометки.
> `[accent]` помечает слово/фразу под градиент-акцент.

### 1. Hero — `light` · `StatementHero v2`

- **Eyebrow:** Methodology
- **Heading:** A score you can [accent: inspect, compare, and defend].
  - *(titleLead: «A score you can» · titleAccent: «inspect, compare, and defend» · titleTrail: «.»)*
- **Sub:** EvalLense does not ask one model for a final verdict. It turns each deck into evidence, routes that evidence through fixed criteria and independent judge lenses, computes an advisory AI Total Score, and keeps the final ranking under human control.
- **CTAs:**
  - Primary: «See a sample score trace» → `#evidence`
  - Secondary: «Book a Demo» → `/company/contact`
- **Media:** ratio 16:9 · placeholder. Alt: «A lens focusing a noisy deck into one clear, evidence-linked score»

### 2. Why methodology was needed — `light` · `#why` · page-local RiskControl v2

- **Eyebrow:** Review at scale
- **Heading:** Human review does not [accent: scale] cleanly
- **Sub:** At small volume, reviewers can still read carefully. At large volume, consistency starts to crack. Different reviewers anchor on different signals, and strong submissions disappear in the pile. EvalLense keeps review structured when the batch is too large for unaided human review.
- **Cards (Risk → System response) — gradient-card style:**
  | Risk | System response |
  |---|---|
  | Reviewers focus on different signals | Fixed P1-P6 dimensions |
  | Scores are hard to defend | Score trace |
  | Strong submissions get lost in the pile | Structured review queue |
  | AI can overreach | Jury Score controls the ranking |

> Page-local style: `.ds-risk__row` получает gradient background (violet/lavender) вместо дефолтного. Shared `RiskControl` не тронут.

### 3. What 400+ runs taught us — `light` · `#runs` · page-local StatBand v2

- **Eyebrow:** Field tested
- **Heading:** The method earned its shape through [accent: iteration]
- **Stats (3):**
  | Value | Label | Source |
  |---|---|---|
  | 400+ | Evaluation runs behind the current method | Builder log |
  | 6 | Judge lenses with defined roles | Pitch preset |
  | P1-P6 | Fixed dimensions for every deck | Dimension matrix |

> Комментарий в коде: «What 400+ runs taught us. Each stat label carries the lesson and the change it drove, so the trust number doubles as the builder story.»

### 4. Methodological foundations — `light` · `#foundations` · `Bento v1`

- **Eyebrow:** Method foundations
- **Heading:** Built from startup [accent: evaluation] methods, not prompt tricks
- **Sub:** The Pitch Competition dimension matrix combines three established startup-evaluation lenses. It is thesis-first: a polished deck should not score high if the problem is vague, the customer is unclear, and the business logic is thin. Presentation quality matters, but it is not the whole method — a polished deck should not outrank weak problem, market, team, or feasibility evidence.
- **Bento tiles (3):**
  - **[Feature]** Tag: «Feeds P1 · P2» · Title: «Lean Startup» · Body: «Hypothesis and problem-solution logic — feeds Problem significance and Solution differentiation.» · Image: `/assets/methodology/foundations-lean-startup-v8.webp` (1229×359) — glass methods illustration
  - Tag: «Feeds P1 · P2» · Title: «Customer Development» · Body: «Customer, pain, and validation evidence — feeds Problem significance and Solution differentiation.»
  - Tag: «Feeds P3 · P5 · P6» · Title: «VC Due Diligence» · Body: «Market, business model, team, and feasibility — feeds Market, Team, and Feasibility.»

> Page-local style: feature tile — glass illustration закреплена вдоль нижнего края карточки (behind copy, z-index:1), overflow:hidden, desktop-only absolute позиционирование.

### 5a. Pipeline — `ink` · `#pipeline` · `PinnedSteps v3`

- **Eyebrow:** One fixed path
- **Heading:** [accent: Every deck] follows the same path
- **Sub:** The process stays fixed, so every deck is reviewed the same way.
- **Steps (5 фиксированных стадий):**
  | # | Label | Description |
  |---|---|---|
  | 01 | Decoder | PDF, PPTX, or Google Slides — every deck is converted into the same structured, slide-by-slide format for the judges. |
  | 02 | AI Judges | Six judges review the deck independently against the same criteria. They don't see one another's scores. |
  | 03 | Aggregate | The scoring layer aggregates judge scores with fixed math. A separate summary layer prepares the narrative and follow-up questions. |
  | 04 | Scoring | Your criterion weights are applied to the Human Jury Score to produce the Final Score. |
  | 05 | Report | An explainable report is assembled for every participant. |
- **Media:** 4:3 placeholder + video scrub (`/assets/methodology/methodology-transition.mp4`). Alt: «Horizontal track of the five pipeline stages, Decoder to Report»

### 5. Dimension matrix — `ink` · `#matrix` · `Gallery v4`

- **Eyebrow:** Dimension matrix
- **Heading:** [accent: Six questions, one rubric] *(обе фразы — accentWords)*
- **Sub:** Each deck is scored across six Pitch Competition dimensions. The dimensions are fixed, so every startup is compared against the same core questions.
- **Lane label:** «The six Pitch Competition dimensions, P1 through P6»
- **Six dimensions (P1–P6), each read as a question:**
  | Tag | Title | Question |
  |---|---|---|
  | P1 | Problem significance | Is the pain real, urgent, and specific? |
  | P2 | Solution differentiation | Is the solution clear and meaningfully different? |
  | P3 | Market attractiveness | Is the opportunity credible and worth pursuing? |
  | P4 | Business model / GTM | Is there a plausible path to revenue and distribution? |
  | P5 | Team / founder fit | Can this team credibly execute? |
  | P6 | Feasibility / readiness | Is the plan realistic given resources, time, and dependencies? |

> Примечание кода: «These are P1-P6, NOT the judge lenses (J-P1…J-P6) — the lenses live only in the Routing Matrix below. The matrix is thesis-first.»

### 6. Routing matrix — `light` · `#routing` · `RoutingMatrix`

- **Eyebrow:** Controlled influence
- **Heading:** Not every judge [accent: influences] every score
- **Sub:** The matrix shows how much each judge lens (J-P1...J-P6) contributes to each dimension (P1-P6). Primary judges drive the score. Secondary judges add important support. Advisory judges provide context. None means no scoring influence.
- **Full routing matrix (judge × dimension):**

  | Judge | P1 Problem | P2 Solution | P3 Market | P4 GTM | P5 Team | P6 Feasibility |
  |---|---|---|---|---|---|---|
  | J-P1 Problem | primary | advisory | advisory | none | none | advisory |
  | J-P2 Solution Logic | secondary | primary | advisory | advisory | none | secondary |
  | J-P3 Business Value / Market | advisory | advisory | primary | primary | none | advisory |
  | J-P4 Pitch Quality | advisory | advisory | advisory | advisory | advisory | advisory |
  | J-P5 Team Readiness | none | none | advisory | advisory | primary | secondary |
  | J-P6 Feasibility | advisory | secondary | secondary | secondary | secondary | primary |

> Page-local style: `.head` max-width 60ch, `.sub` max-width 70ch (widened so title reads in ~2 lines).

### 7. Evidence before score — `light` · `#evidence` · `EditorialSplit v3`

- **Eyebrow:** Score trace
- **Heading:** [accent: Evidence] before score
- **Sub:** A number is useful only when you can inspect the evidence behind it. The rubric forces evidence, strengths, weaknesses, and missing information before a score — never the other way around. Worked example, P3 Market: evidence on slides 6 and 8, strength a clear target segment, weakness an unsourced TAM, missing buyer validation, confidence medium — which lands the score in the band, not above it.
- **Media:** 4:3 placeholder. Alt: «A 0 to 10 rubric scale with defined bands and an evidence to score trace»
- **4-шаговая процедура (points):**
  1. **Cite the evidence** — Use slide-grounded facts only. Every claim must point to a specific slide.
  2. **Weigh it both ways** — State what supports the score, what lowers it, and what the deck leaves unclear or unproven.
  3. **Name the band** — Explain which rubric band the evidence falls into and why.
  4. **Then the score** — The score must sit inside that band. At the boundary, incomplete evidence pushes the result down, not up.

### 7a. The scoring model — `light` · no ID · `Bento v1` (className: `ds-scoring-bento`)

- **Eyebrow:** The scoring model
- **Heading:** How the [accent: advisory] score is built
- **Sub:** A fixed calculation combines judge outputs into an advisory AI Total Score. The same judge scores, routing weights, confidence values, and criterion weights produce the same result. The score informs human review but does not determine the final ranking.
- **Bento tiles (5):**
  - **[Feature]** Tag: «Criterion score» · Title: «Per dimension» · Body: «Judge scores are combined using routing weights to produce a weighted average.» + key facts (bold labels inline): **Inputs** Judge score · routing weight · confidence / **Primary judges** Carry the strongest influence / **Advisory judges** Add context without dominating the score · Image: `/assets/bento/scoring-model-transparent.webp` (3:2)
  - Tag: «Confidence» · Title: «Confidence adjustment» · Body: «Confidence is calculated separately and can apply a limited downward adjustment. It reduces overconfidence when evidence is thin. Maximum adjustment: 15%.» · Image: `/assets/bento/scoring-confidence.webp` (3:2)
  - Tag: «Total score» · Title: «Across dimensions» · Body: «Project weights combine the AI Criterion Scores into one advisory AI Total Score on a 0-10 scale.» · Image: `/assets/bento/scoring-across.webp` (3:2)
  - Tag: «Review signal» · Title: «Disagreement» · Body: «Spread flags consensus, split, or conflict between primary and secondary judges. It does not change the score — it tells reviewers where to look closer.»
  - Tag: «Reproducible math» · Title: «Reproducible» · Body: «No model call runs during final aggregation. The same judge outputs and weights produce the same calculated score every time.»

> Page-local style: feature tile — copy sits in left half-column (desktop), image pinned bottom-right (absolute, z-index:1 behind copy). Bold inline sub-labels use `font-weight: 700` (explicit, not «bolder»).

> Формула `15%` confidence adjustment здесь публично упомянута в copy (в отличие от более ранних ограничений «только качественные лейблы»). Это сознательный выбор.

### 8. Disagreement — `light` · `#disagreement` · `RiskControl` (shared)

- **Eyebrow:** Review signals
- **Heading:** Averages can [accent: hide] the case that needs review
- **Sub:** When judges disagree, EvalLense shows the spread instead of burying it in an average. Spread does not change the score. It points reviewers to the cases that need a closer look. The numeric tests live in Consistency & Reliability.
- **leftTag:** Signal · **rightTag:** Meaning
- **Pairs (Signal → Meaning):**
  | Signal | Meaning |
  |---|---|
  | High score · low spread | Strong, stable signal |
  | High score · high spread | Strong score, needs review |
  | Market strong · feasibility weak | Opportunity with execution risk |
  | Low score · high spread | Contested, not simply weak |

### 9. Human-in-the-loop — `light` · `#control` · page-local section (mirror layout)

- **Eyebrow:** Human control
- **Heading:** AI prepares the evidence. [accent: You set the score.]  *(grad-word span на второй фразе)*
- **Sub:** The AI Total Score is an advisory baseline — it explains the AI read, but it never ranks the batch. The Jury Score is the final human scoring input, and the leaderboard is ranked only by that human score. Because no model runs at scoring time, the same judge outputs and weights reproduce the same baseline every time.
- **Media (left):** looping video `/assets/methodology/hitl-loop.mp4` · `data-play-once` · `data-replay-delay="7000"`
- **Points (4, right column):**
  1. **Review the evidence** — AI suggests a score for each dimension and shows the evidence behind it — a read-only reference.
  2. **Add live context** — Bring in what the deck can't show: notes from the live pitch and the Q&A.
  3. **Set the Jury Score** — You set your own Jury Score per dimension. It stays a separate value from the AI Criterion Score — the AI baseline for one dimension.
  4. **Submit the decision** — The leaderboard is built only from submitted Jury Scores. The AI Total Score never determines the ranking.

### 10. What this methodology does not claim — `light` · `#limits` · page-local section (v2 cards)

- **Eyebrow:** Clear boundaries
- **Heading:** Prepares the review, never your [accent: judgment]
- **Sub:** EvalLense evaluates what is present in the deck, highlights missing evidence, and prepares the review. It does not prove that every claim is true.
- **Cards («It is not» → «What it does»):**
  | It is not | What it does |
  |---|---|
  | An external truth check | Evaluates what the deck presents and flags what is missing — it does not verify claims against the outside world. |
  | Investment advice | Gives decision support for reviewers, not a recommendation to fund or pass. |
  | Automatic winner selection | Never ranks the batch — the human Jury Score owns the leaderboard. |
  | A prediction of success | Describes the pitch today; it does not forecast whether the startup will succeed. |

### 11. Related trust pages — `ink` · `#related` · page-local section (v3 expanded)

Расположен **вне светлой зоны** (за пределами `.ds-zone`), переходит в ink-хвост.

- **Eyebrow:** Trust layers
- **Heading:** Related [accent: trust] pages
- **Sub:** This page is the hub. For the mechanics behind each claim, follow the matching deep-dive.
- **Links (5, формат: tag · title · body · «Read more →» ссылка):**
  | Tag | Title | Body | href |
  |---|---|---|---|
  | Human decision | Review Board | Where the human jury sets the final score and the ranking. | /product/review-board |
  | Repeatability | Consistency & Reliability | Repeatability, spread, and when a human decision is needed. | /trust/consistency-reliability |
  | Safety | Prompt Injection Safety | How decks that try to manipulate the judges are handled. | /trust/prompt-injection-safety |
  | Privacy | Security & Privacy | How deck data is handled, stored, and protected. | /trust/security-privacy |
  | Story | The builder story | What 400+ runs taught us about scoring pitch decks. | /blog |

### 12. Final CTA — `ink` · `Cinema`

- **Headline:** Follow one score from slide to final call
- **Sub:** Open a sample evaluation and trace one score from slide evidence to rubric band, judge output, AI Total Score, and final Jury Score.
- **CTA:** Book a Demo → `/company/contact`
- **Media:** video `/assets/methodology/methodology-transition.mp4` (shared with §5a)
- **maskId:** `methodology-final-cta`

## Числа и факты

| Факт | Значение | Источник (ai-jury-prod) |
|---|---|---|
| AI-судей (Pitch) | 6 (J-P1…J-P6), независимы, параллельно | `judges.md` §Pitch, §Как судьи работают вместе |
| Измерений оценки | 6 (P1–P6), P4 = Business model / GTM (переименовано vs старый бриф) | `judges.md` §Pitch dimensions |
| Шкала балла | 0–10 per dimension | `judges.md`, `scope.md` §5 |
| Confidence | low / medium / high; max downward adjustment 15% (публично на странице) | `scope.md` §5.4, `pipeline-summarizer.md` |
| Роли судьи в матрице | Primary (полный вес) · Secondary (½) · Advisory (¼) · None | `judges.md` §Что такое судья |
| Рубричных бандов | 4 (`0–3` · `4–6` · `7–8` · `9–10`) | `dimension-rubrics.md` §3 |
| Процедура скоринга | evidence-before-score (4 шага, score — последний) | `dimension-rubrics.md` §1.3 |
| AI Total Score | advisory, 0-10, не ранжирует batch | `scope.md` §5.3 |
| Воспроизводимость | нет model-call на шаге агрегации; те же входы → тот же балл | `scope.md` AC5.SM1 |
| Ранжирование | только по человеческому Jury Score | `judges.md`, `user-flow.md` §11 |
| Evaluation runs | 400+ (публичная цифра на странице в §3) | Builder log |

> **Что рендерится публично.** На странице: качественные лейблы (`low/medium/high` · `consensus/split/conflict`), «15%» maximum confidence adjustment (явно упомянуто в §7a), «0-10 scale», «400+», «reproducible». Точные внутренние константы (0.55/0.70/0.85, spread-пороги 1.5/3.0) и формулы AI Criterion Score — **не на странице**; живут здесь для сборки и демо.

## Изображения

| Слот | Секция | Файл / формат | Размер / ratio | Описание |
|---|---|---|---|---|
| hero | §1 | placeholder | 16:9 | «A lens focusing a noisy deck into one clear, evidence-linked score» |
| foundations-lean-startup | §4 feature tile | `/assets/methodology/foundations-lean-startup-v8.webp` | 1229×359 | Glass «methods illustration»: Lean Startup book, Hypothesis card, Customer Pain card, Validated check token |
| pipeline video | §5a | `/assets/methodology/methodology-transition.mp4` (scrub) | 4:3 | Decoder → AI Judges → Aggregate → Scoring → Report, scrubbed by scroll |
| evidence rubric | §7 | placeholder | 4:3 | «A 0 to 10 rubric scale with defined bands and an evidence to score trace» |
| scoring-model | §7a feature tile | `/assets/bento/scoring-model-transparent.webp` | 3:2 | Diagram: routed judge signals → one AI Criterion Score |
| scoring-confidence | §7a | `/assets/bento/scoring-confidence.webp` | 3:2 | Criterion score nudged down by confidence adjustment |
| scoring-across | §7a | `/assets/bento/scoring-across.webp` | 3:2 | Six AI Criterion Scores → one AI Total Score |
| hitl-loop | §9 | `/assets/methodology/hitl-loop.mp4` (looping) | — | HITL interaction: reviewer sets Jury Score |
| final-cta video | §12 | `/assets/methodology/methodology-transition.mp4` | — | Reused pipeline transition clip |

## Внутренние ссылки

- **Header/Footer nav:** пункт `Methodology` → `/trust/methodology`
  (footer-секция TRUST, см. [[sitemap|Карта сайта]]).
- **Page-level anchor nav (in-page):** Foundations (#foundations) · Matrix (#matrix) · Evidence (#evidence) · Control (#control)
- **Cross-links со страницы (§11 Related):**
  - [[sitemap|Review Board]] `/product/review-board` — where human sets final score
  - [[sitemap|Consistency & Reliability]] `/trust/consistency-reliability` — repeatability and spread
  - [[sitemap|Prompt Injection Safety]] `/trust/prompt-injection-safety` — deck content safety
  - [[sitemap|Security & Privacy]] `/trust/security-privacy` — deck data handling
  - Blog `/blog` — «The builder story»

## SEO / meta

- **`<title>`:** Evidence-Based Pitch Evaluation Methodology - EvalLense
- **meta description:** EvalLense does not ask one model for a final verdict. It turns each deck into evidence, routes it through fixed criteria and independent judge lenses, computes an advisory AI Total Score, and keeps the final ranking under human control. *(из кода `metadata.description`)*
- **OG-изображение:** слот `hero`

## Источники истины

### Wiki (landing)
- [[vision|Vision]] — AI-жюри + human-in-the-loop, explainable-отчёты
- [[scope|Scope]] — границы первой версии сайта
- [[sitemap|Карта сайта]] — Methodology: criteria-based / judge roles / scoring / rubric
- [[design-system|Design System]] — pipeline-status, score+confidence ring, human-in-the-loop, токены
- [[section-types|Section Types]] / [[page-design-patterns|Page Design Patterns]] — архетипы

### Application (`ai-jury-prod`) — сверено 2026-06-16
- `wiki/product/judges.md` — что такое судья, Pitch-панель J-P1…J-P6, dimensions P1–P6 + веса, Primary/Secondary/Advisory, как собирается AI Total Score, Spread, naming
- `wiki/product/dimension-rubrics.md` — 4-anchor рубрики per dimension, фиксированная процедура скоринга (evidence→band→score), red flags
- `wiki/product/scope.md` §5 — pipeline (Decoder→Judges→Summarizer→Scoring), формулы F1, confidence-значения, reproducibility AC
- `wiki/architecture/pipeline-summarizer.md` — Spread-лейблы, confidence numeric, F1 math

## Acceptance (что считать готовым)

- [x] страница доступна по `/trust/methodology`, обёрнута в `PageHeader` + `Footer`
- [x] все 12 секций из «Структура секций» собраны с финальной EN-копией
- [x] PinnedSteps pipeline (§5a), Gallery dimension matrix (§5), RoutingMatrix (§6)
- [x] Bento foundations (§4) и Bento scoring model (§7a) с реальными assets
- [x] HITL section с looping-видео (§9)
- [x] Limits section (§10) и Related section (§11)
- [x] Cinema финальный CTA (§12)
- [x] Тональный ритм: light-зона §1–4, ink-пик §5a–5, light-зона §6–10, ink-хвост §11–12
- [x] Anchor nav: Foundations / Matrix / Evidence / Control
- [x] Page-local стили инжектированы через `<style>` (shared DS не тронут)

## Открытые вопросы

- **✅ Расшифровка P1–P6 — закрыто.** Публичные формулировки на странице идут как вопросы («Is the pain real, urgent, and specific?»), не как утверждения — это финальный выбор.
- **✅ Точные внутренние числа — закрыто.** На странице видно «15%» (confidence cap) и «0-10», остальные константы — внутренние.
- **✅ Коды судей — решено: показываем J-P1…J-P6 в routing matrix таблице, а не в hero.** Полная матрица теперь публична (§6 Routing Matrix).
- **✅ «400+» trust-число — на странице.** Коммент в коде говорит «400+»; память проекта отмечает, что реальное число «1000+», а доки ещё не синхронизированы. При обновлении — поправить `RUNS_STATS[0].value`.
- **Статус режима Hackathon** — страница держится Pitch-методологии; Hackathon-панель (J-H1…J-H5) не раскрыта.
- **P4 нейминг** — в старом брифе P4 = «Pitch Quality», в живом коде P4 = «Business model / GTM» (это измерение, не судья). J-P4 = Pitch Quality — судья. Различие важно для будущих правок.
- **Старые секции «Принципы» (4 numbered) и «AI-жюри» (horizontal gallery)** — удалены из живой страницы. Если понадобится восстановить — хранятся в `methodology_new.md` v1.1.
- **Debug Mode** — внутренний инструмент инспекции pipeline; на публичной странице не показывать.
