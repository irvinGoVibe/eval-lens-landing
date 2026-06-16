---
title: Methodology
status: generated
version: 1.1
updated: 2026-06-16
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

> Продуктовый бриф страницы для skill `build-pages`. Факты сверены с источником
> правды `ai-jury-prod` (`wiki/product/judges.md`, `dimension-rubrics.md`,
> `scope.md` §5; `wiki/architecture/pipeline-summarizer.md`). Раздел «Контент по
> секциям» — **финальная EN-копия, готовая к вёрстке** (антислоп-проход пройден,
> единый голос). MVP — Pitch Competition, 6 судей J-P1…J-P6 / измерения P1–P6.
> Числа — с источником. Чего нет / расходится — в «Открытые вопросы».

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

| # | Секция | Архетип | Движение | Поверхность | Что показываем |
|---|---|---|---|---|---|
| 1 | Hero | statement-hero | reveal | light | «Every deck, scored against the same rubric» + lens-акцент + CTA |
| 2 | Принципы | editorial-numbered-list | reveal | ink | 4 принципа методологии |
| 3 | Конвейер оценки | pinned-multi-screen | pin | light | 5 стадий: Decoder → Judges → Summarizer → Scoring → Report |
| 4 | AI-жюри + coverage | horizontal-gallery + coverage-strip | reveal | ink | 6 судей (имя + код + JTBD + «looks for») и strip «1 lead + cross-checks» по каждому измерению; полная матрица — опц. |
| 5 | Рубрика | editorial-split | reveal | light | Шкала 0–10, 4 банда, evidence-before-score процедура |
| 6 | Scoring model | editorial-split + scrub-ring | scrub | ink | Детерминированная математика, confidence, spread |
| 7 | Human-in-the-loop | editorial-split | reveal | light | Advisory от AI → решение человека + pull-quote |
| 8 | Final CTA | quiet-cta | reveal | ink | Призыв + Book a Demo |

> Поверхности по ритму light↔ink (1L·2I·3L·4I·5L·6I·7L·8I — чистое чередование,
> hero светлый, принципы/жюри/scoring/CTA тёмные для «доверия и кино»). Архетипы и
> классы — из [[section-types|Section Types]] (`methodology-hero`,
> `methodology-principles`, `methodology-pipeline`, `methodology-judges`,
> `methodology-rubric`, `methodology-scoring`+`po-ring`, `methodology-hitl`,
> `methodology-cta`). Ритм — по [[page-design-patterns|Page Design Patterns]].

## Контент по секциям

> Ниже — финальная английская копия. Русским — только редакторские пометки в
> скобках. `[lens]` помечает слово/фразу под градиент-акцент.

### 1. Hero — `light`
- **Eyebrow:** Methodology
- **Heading (выбран — C; lens на `methodology`):** The methodology behind every score
  - *(альтернативы, не используем: A «Every deck, scored against the same rubric»; B «Scores you can explain, line by line»)*
- **Subhead:** Six independent AI judges read each deck against a fixed rubric, tie every score to evidence in the slides, and hand you a result you can defend. The final call always yours.
- **CTA:** Book a Demo

### 2. Принципы — `ink`
- **Eyebrow:** What we hold to
- **Heading:** Four principles behind the method
- **Numbered list:**
  1. **AI supports the decision — it doesn't own it.** Every AI score is advisory. You set the final score, and the ranking is built from yours.
  2. **Every score is explainable.** Each number traces back to evidence in the deck and the rubric band it lands in — not a black-box verdict.
  3. **Disagreement is useful.** When judges diverge on a dimension, the report shows the spread instead of burying it in an average.
  4. **Methodology matters more than the model.** Reliability comes from fixed criteria, defined judge roles, and a deterministic scoring step — not from any single model.

### 3. Конвейер оценки — `light`
- **Eyebrow:** The pipeline
- **Heading:** Every deck runs the same five stages
- **Subhead:** The path is fixed, so no two decks are read differently. Each stage lights up as you scroll.
- **Steps (pinned, 5):**
  1. **Decoder** — Any format — PDF, PPTX, or Google Slides — becomes one structured, slide-level view the judges can read.
  2. **AI Judges** — Six independent judges score the deck across P1–P6, in parallel, without seeing one another's scores.
  3. **Summarizer** — A deterministic math step aggregates the scores; a second step writes the narrative and the questions to ask each team.
  4. **Scoring** — Your criterion weights apply to the human Jury Score to form the Final Score.
  5. **Report** — An explainable report is assembled for every participant.

### 4. AI-жюри — `ink`
- **Eyebrow:** The AI jury
- **Heading:** Six judges, six lenses
- **Subhead:** Each judge owns one lens and answers a single question. They run in parallel and never compare notes — six independent reads, not one blurred opinion.
- **Judges (horizontal gallery).** Каждая карточка: имя крупно (heading) · код мелким mono-тегом · вопрос-фокус (jobs-to-be-done) · строка «Looks for». Код — вторичный, не ведущий.
  - **Problem** `J-P1` — *Who actually suffers from this pain, how often, and what do they do about it today?* — Looks for: a named user, pain that's frequent and costly, an honest read of today's alternatives.
  - **Solution Logic** `J-P2` — *Does this approach actually solve the problem, and why is it better than the alternatives?* — Looks for: a clear mechanism, a defensible "why us", a sharp wedge over a do-everything platform.
  - **Business Value / Market** `J-P3` — *Is the market real and reachable, with a credible way to make money and defend the position?* — Looks for: a beachhead segment, monetization that fits the buyer, real defensibility.
  - **Pitch Quality** `J-P4` — *Can a reviewer follow what this is and why it matters, without guessing?* — Looks for: narrative structure and clear language. (Grades the communication, not the idea.)
  - **Team Readiness** `J-P5` — *Do these people have the experience and founder-market fit to execute?* — Looks for: evidence of shipping over titles, a complete team, gaps owned rather than hidden.
  - **Feasibility** `J-P6` — *Given the resources, timeline, and risks, can the team actually deliver?* — Looks for: a sequenced roadmap, resources matched to ambition, a sober view of risk.
- **Coverage — «1 lead + cross-checks» (визуал под галереей).** Публичный визуал
  упрощённый: по каждому измерению — один lead-судья и несколько независимых
  перепроверок. Без полной судья × измерение сетки (она грузит холодного читателя
  и вскрывает нюанс «судья ≠ измерение»). Месседж — *no score rests on one read*.
  - **Heading:** No score rests on one opinion
  - **Subhead:** Every dimension gets one lead judge and several independent cross-checks from the rest of the panel.
  - **Per-dimension (lead + cross-checks → independent reads):** маркеры `●` lead · `○` cross-check.
    - Problem significance — `● + ○○○○` → 5 reads
    - Solution differentiation — `● + ○○○○` → 5 reads
    - Market attractiveness — `● + ○○○○○` → 6 reads
    - Business model / GTM — `● + ○○○○` → 5 reads
    - Team / founder fit — `● + ○○` → 3 reads
    - Feasibility / readiness — `● + ○○○○○` → 6 reads

> **Advanced (опц. — для демо / whitepaper / раскрывашки «see the full panel», НЕ
> главный визуал).** Полная судья × измерение матрица с ролями. Здесь честно видно
> асимметрию: Pitch Quality (J-P4) — чисто кросс-чек, не ведёт ни одного
> измерения. Поэтому на публичной странице это спрятано, а не в hero-визуале.
>
> ```text
> Judge ↓ \ Dimension →     P1   P2   P3   P4   P5   P6
> Problem        (J-P1)      ●    ○    ○    ·    ·    ○
> Solution Logic (J-P2)      ◐    ●    ○    ○    ·    ◐
> Business/Market(J-P3)      ○    ○    ●    ●    ·    ○
> Pitch Quality  (J-P4)      ○    ○    ○    ○    ○    ○
> Team Readiness (J-P5)      ·    ·    ○    ○    ●    ◐
> Feasibility    (J-P6)      ○    ◐    ◐    ◐    ◐    ●
> ```
> `●` primary (lead) · `◐` secondary · `○` advisory · `·` none. Измерения: P1 Problem significance · P2 Solution differentiation · P3 Market attractiveness · P4 Business model/GTM · P5 Team/founder fit · P6 Feasibility/readiness. Источник — `dimension-rubrics.md` §3.1.

### 5. Рубрика — `light`
- **Eyebrow:** The rubric
- **Heading:** One scale, four bands, evidence first
- **Subhead:** Every dimension is scored on the same 0–10 scale, split into four bands. A judge has to assemble the evidence before it can name a score — never the other way around.
- **Procedure (ordered, 4):**
  1. **Cite the evidence** — Slide-grounded facts only, each tied to a specific slide. No claim without a reference.
  2. **Weigh it both ways** — What raises the score, what lowers it, and what the deck never establishes.
  3. **Name the band** — The judge states, in words, which rubric band the evidence lands in.
  4. **Then the score** — The number must sit inside that band. On the edge, an incomplete deck rounds down, not up.
- **Bands (chips):** `0–3` absent or unsubstantiated · `4–6` plausible but thin · `7–8` specific and credible · `9–10` demonstrated, not asserted
- *(Опц.: coverage matrix из секции 4 можно продублировать/перенести сюда, если рубрику хочется показать вместе с тем, кто какое измерение оценивает. По умолчанию матрица живёт в секции 4 — это про судей; рубрика — про шкалу.)*

### 6. Scoring model — `ink`
- **Eyebrow:** The scoring model
- **Heading:** From six reads to one advisory score
- **Subhead:** A deterministic math step turns the judges' scores into one number — the same inputs always produce the same result. It's an advisory reference, not the ranking.
- **Points:**
  - **Per dimension** — Judge scores are combined by their routing weight and adjusted for confidence to form an AI Criterion Score.
  - **Across dimensions** — Your criterion weights roll those up into the AI Total Score, on a 0–10 scale.
  - **Confidence** — Every score carries a low, medium, or high confidence signal, and lower confidence pulls the result toward caution.
  - **Spread** — Where judges disagree on a dimension, the report flags it — consensus, split, or conflict — instead of averaging it away.
  - **Reproducible** — No model runs in this step. The same judge outputs and weights give the same score, every time.
- **Scrub-ring (right):** confidence-ring `.po-ring`, заполняется по `--scrub` (0→AI Criterion Score).

### 7. Human-in-the-loop — `light`
- **Eyebrow:** Where the human decides
- **Heading:** The AI prepares. You decide.
- **Subhead:** Every AI score is advisory. You read the evidence, set your Jury Score on each dimension, and the leaderboard is built from your Final Score — never from the AI's.
- **Pull-quote (right):** Six AI lenses do the reading. The final call is always yours.
- **Quote tag:** Pitch Competition · P1–P6

### 8. Final CTA — `ink`
- **Eyebrow:** Get started
- **Heading:** See the methodology run on your own decks
- **Subhead:** Book a demo and watch one deck go from slides to an evidence-linked, explainable score.
- **CTA:** Book a Demo

## Числа и факты

| Факт | Значение | Источник (ai-jury-prod) |
|---|---|---|
| AI-судей (Pitch) | 6 (J-P1…J-P6), независимы, параллельно | `judges.md` §Pitch, §Как судьи работают вместе |
| Измерений оценки | 6 (P1–P6), защищённые — Market и Team | `judges.md` §Pitch dimensions |
| Веса по умолчанию | P1 .15 · P2 .15 · P3 .20 · P4 .15 · P5 .20 · P6 .15 | `judges.md` §Dimensions и веса |
| Шкала балла | 0–10 per dimension | `judges.md`, `scope.md` §5 |
| Confidence | low / medium / high (internal 0.55 / 0.70 / 0.85) | `scope.md` §5.4, `pipeline-summarizer.md` |
| Роли судьи в матрице | Primary (полный вес) · Secondary (½) · Advisory (¼) | `judges.md` §Что такое судья |
| Рубричных бандов | 4 (`0–3` · `4–6` · `7–8` · `9–10`) + red flags | `dimension-rubrics.md` §3 |
| Процедура скоринга | фиксированная, evidence-before-score (score эмитится последним) | `dimension-rubrics.md` §1.3 |
| AI Criterion Score | `A(d) = R(d)·[1 − 0.15·(1 − C(d))]` | `scope.md` §5.3 |
| AI Total Score | `Σ_d w(d)·A(d)` — advisory, не ранжирует | `scope.md` §5.3, `judges.md` §Как собирается |
| Spread-лейблы | `<1.5` consensus · `1.5–2.99` split · `≥3.0` conflict | `scope.md` §5.4, `pipeline-summarizer.md` |
| Воспроизводимость | те же выходы судей + веса → тот же балл (<1%) | `scope.md` AC5.SM1 |
| Ранжирование | по человеческому Jury / Final Score | `judges.md` §Как собирается, `user-flow.md` §11 |

> **Что рендерится публично, что нет.** На странице — только качественные лейблы
> (`low/medium/high` · `consensus/split/conflict`) и свойство **reproducible**
> («те же входы → тот же балл»). Точные числовые константы (confidence
> 0.55/0.70/0.85, spread-пороги 1.5/3.0, коэффициент 0.15) и сами формулы —
> **внутренние, на странице не показываются**; держим их здесь для точной сборки и
> демо. Формулу при желании показывать только «по форме» (взвешено по матрице,
> скорректировано на confidence), без литералов.

## Изображения

| Слот | Где на странице | Что изображено | Промпт-набросок (стиль бренда) |
|---|---|---|---|
| hero | секция 1 | Линза фокусирует шумный дек в один ясный, evidence-привязанный балл | lens-градиент violet→cyan→aqua поверх Apple-нейтрали, мягкая глубина, hairline-структура, calm, без щитов/security-театра; `.media-ph` 16:9. Alt: «A lens focusing a noisy deck into one clear, evidence-linked score» |
| pipeline | секция 3 | Трек 5 стадий Decoder→Judges→Summarizer→Scoring→Report, узлы зажигаются вдоль lens-трека | те же токены, light, тонкие линии-узлы; `.media-ph` 4:3 |
| coverage | секция 4 | Шесть строк-измерений, в каждой `●` lead + `○` cross-checks; месседж «no score rests on one read» | чистый hairline-strip на ink, lens-акцент на `●`; нативная CSS-сетка, не картинка. Полную судья × измерение матрицу — опционально за раскрывашкой / в PDF |
| rubric | секция 5 | Шкала 0–10 с 4 бандами + строка процедуры evidence→band→score | hairline-диаграмма, один lens-акцент на «band»; `.media-ph` 4:3 |
| ring | секция 6 | Confidence-ring заполняется + per-dimension контрибуция судей | минимализм, lens-акцент на кольце; `.po-ring` scrub + `.media-ph` 4:3 |

## Внутренние ссылки

- **Header/Footer nav:** пункт `Methodology` → `/trust/methodology`
  (footer-секция TRUST, см. [[sitemap|Карта сайта]]).
- **Cross-links со страницы:**
  - [[sitemap|Consistency & Reliability]] — стабильность и повторяемость оценок
  - [[sitemap|Prompt Injection Safety]] — почему контент дека не ломает оценку
  - [[sitemap|Evidence-Based Reports]] — что внутри отчёта по участнику
  - [[sitemap|Review Board]] — где человек ставит Jury Score и решает

## SEO / meta

- **`<title>`:** EvalLense Methodology — How the AI Jury Scores Pitch Decks
- **meta description:** The EvalLense methodology: six independent AI judges score
  each deck against a fixed rubric, tie every score to evidence, and the human sets
  the final call. Transparent and reproducible. *(≤155)*
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
- `wiki/product/dimension-rubrics.md` — 4-anchor рубрики per dimension, фиксированная 8-шаговая процедура скоринга (evidence→band→score), red flags
- `wiki/product/scope.md` §5 — pipeline (Decoder→Judges→Summarizer→Scoring), формулы F1, confidence-значения, reproducibility AC
- `wiki/architecture/pipeline-summarizer.md` — Spread-лейблы, confidence numeric, F1 math (через scope/judges)

## Acceptance (что считать готовым)

- [ ] страница доступна по `/trust/methodology`, обёрнута в `SiteHeader` + `Footer`
- [ ] все 8 секций из «Структура секций» собраны с финальной EN-копией
- [ ] есть pinned-multi-screen pipeline (секция 3), горизонтальная галерея судей (секция 4) и scrub-ring scoring (секция 6); тёмный numbered-statement (секция 2)
- [ ] поверхности секций соответствуют колонке «Поверхность» (1L·2I·3L·4I·5L·6I·7L·8I)
- [ ] добавлена ссылка `Methodology` в footer-nav (TRUST)
- [ ] только токены/классы из [[design-system|Design System]]
- [ ] `cd web && pnpm build` зелёный; `prefers-reduced-motion` уважается

## Открытые вопросы

- **✅ Расшифровка P1–P6 — закрыто.** Публичные формулировки судей и измерений
  взяты из `judges.md` (одобрен) — больше не «выдуманное», можно показывать на
  сайте. (В старом брифе это был открытый вопрос.)
- **✅ Коды судей (`J-P1`) и измерений (`P1–P6`) — решено: вести именем, код мелким
  тегом.** В прозе и карточках — **имя** (Problem, Solution Logic…); код — мелкий
  mono-тег рядом и подпись в advanced-матрице. Кодами не вести. (Реализовано в
  копии секции 4.)
- **✅ Имена судей ≠ имена измерений — решено: упрощённый публичный визуал.** Hero-
  визуал секции 4 — strip «1 lead + cross-checks» по измерениям, где асимметрия
  (Pitch Quality ничего не ведёт) не торчит. Полная судья × измерение матрица —
  опционально за раскрывашкой / в whitepaper, для тех, кто копает.
- **✅ Точные внутренние числа — решено: только лейблы.** На странице — `low/med/high`
  · `consensus/split/conflict` + акцент на reproducible. Точные константы
  (0.55/0.70/0.85, 1.5/3.0, 0.15) и формулы — внутренние, не рендерятся (живут в
  таблице фактов для сборки/демо). Причина: это тюнинг-константы, не аргумент
  доверия для покупателя; публиковать точную «науку» без готовых бенчмарков (Phase
  0) рискованно, и при смене константы страница молча устареет.
- **Статус режима Hackathon** — расхождение в источнике: `scope.md` (Hackathon
  post-MVP) vs `judges.md` + ADR-012 + `PROJECT-ENTRYPOINT.md` (Pitch и Hackathon
  оба first-class, Hackathon = 5 судей J-H1…J-H5 / H1–H6). Страница держится
  Pitch-методологии; если фаундер открывает Hackathon — добавить вторую панель.
- **Публичные цифры валидации** (reproducibility %, rank correlation, «400+ runs»)
  — бенчмарки в `benchmarking-methodology.md` (Phase 0, в работе); числового
  публикуемого proof пока нет. Не подавать как факт без утверждения.
- **Tagline hero** — выбрать из вариантов A/B/C с фаундером.
- **Debug Mode** — внутренний инструмент инспекции pipeline; на публичной странице
  не показывать.
