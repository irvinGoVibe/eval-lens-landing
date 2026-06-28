---
title: Evidence-Based Reports
status: approved
version: 1.4
updated: 2026-06-28
route: /product/evidence-based-reports
section: product
nav_label: Evidence-Based Reports
in_header_nav: false
in_footer_nav: true
cta: Book a Demo
---

# Evidence-Based Reports

← [[index|Wiki]] · [[sitemap|Карта сайта]]

Product-страница: объясняет главный output EvalLense — структурированные отчёты,
где scores и выводы привязаны к содержимому дека.

> Продуктовый бриф страницы для skill `build-pages`. Факты сверены с источником
> правды `ai-jury-prod` (`wiki/product/report.md` §4–§13, `judges.md`,
> `dimension-rubrics.md`, `scope.md` §5). Раздел «Контент по секциям» — **финальная
> EN-копия, точно соответствующая живому page.tsx** (антислоп-проход пройден,
> единый голос). Глубокую scoring-математику не дублируем — ссылаемся на
> Methodology. Подавать как explainable-отчёт, **без** «gap analysis / due
> diligence». Числа — с источником. Чего нет / расходится — в «Открытые вопросы».

## Роль и аудитория

- **Роль страницы:** показать, что после оценки пользователь получает
  **explainable-отчёт**, а не «голый» AI-балл — каждый score объясним, важные
  выводы привязаны к evidence из дека.
- **Для кого:** review-команды, program owners, инвесткомитеты — те, кому отчёт
  нужен для ревью, shortlist и решения.
- **Ключевое сообщение:** каждый score должен быть объясним, каждый важный вывод —
  связан с содержимым питч-дека. EvalLense выдаёт не число, а обоснование.
- **Целевое действие:** Book a Demo → `/#demo`; вторичный путь —
  View Sample Report (пока disabled `href: "#"`).

## Структура секций

| # | Секция | Архетип / компонент | Движение | Поверхность | Что показываем |
|---|---|---|---|---|---|
| 1 | Hero | StatementHero v3 | reveal | light | «A score you can explain. Evidence you can check.» + stat-band |
| 2 | Beyond the number | Cinema | reveal | light | «Explain the score. Defend the decision.» + video |
| 3 | Anatomy of the report | PinnedSteps v1 | pin | light | 3 слоя: Project Summary → AI Score Report → Questions for Live Q&A |
| 4 | Inside the AI Score Report | Gallery v4 | reveal | light | 6 карточек: breakdown · matrix · formation · methodology · criteria · conclusions |
| 5 | Grounded, not opaque | EditorialSplit | reveal | light | Every finding links back to a slide: 3 points + visual |
| — | ZoneToneFlip | (tone transition) | scroll | — | light→dark crossfade seam between §5 and §6 |
| 6 | Deck completeness | Bento | reveal | ink | 10 sections, severity info/warning/critical — signal, не verdict + ChipGrid |
| 7 | Across the review | RiskControl | reveal | ink | 5 пар before/during/after → what you know/defend/share/bring/keep |
| 8 | Final CTA | Cinema | reveal | ink | «AI prepares. You decide.» + Book a Demo |

> **Тональный ритм (live):** секции 1–5 на непрерывном `light` фоне (lobes),
> ZoneToneFlip перелистывает в `ink` перед §6; секции 6–8 держат ink. Итоговый
> arc: **5L · (flip) · 3I** — не alternating, как было в v1.3 (1L·2I·3L·4I·5L·6I·7L·8I).
> Cinema (§2) и Gallery (§4) — **light**, не ink. RiskControl (§7) — **ink**, не light.
> Архетипы и классы — из [[section-types|Section Types]]. Ритм — по
> [[page-design-patterns|Page Design Patterns]].

## Header nav

```
section: "Product"  →  /product/overview
links:
  - Anatomy  →  #anatomy
  - Score    →  #score
  - Grounded →  #grounded
```

## Контент по секциям

> Ниже — финальная английская копия, взятая из live `page.tsx`. Русским — только
> редакторские пометки в скобках. `[lens]` помечает слово/фразу под градиент-акцент.

### 1. Hero — StatementHero v3, `light`

- **Eyebrow:** Evidence-Based Reports
- **Heading:** A score you can explain. [Evidence] you can check.
  *(titleLead="A score you can explain." titleAccent="Evidence" titleTrail="you can check.")*
- **Subhead:** See how each team scored, what drove the result, and what to ask next. You make the final call.
- **CTAs:**
  - Primary: Book a Demo → `/#demo`
  - Secondary: View Sample Report → `#` *(пока disabled; держим как visual anchor)*
- **Media:** `/assets/evidence-reports/hero-score-dashboards-01.webp` — ratio 3:2.
  Alt: "An overall score with a dimension radar, linked to deck slides — Market TAM and Traction MAU"
- **Outcome stat-row (stat-band под hero; illustrative; aria: "based on a 20–30 min manual read"):**

  | v (stat value) | k (stat caption) |
  |---|---|
  | Skip the first read | Start with the report, not the raw deck. |
  | Up to 40 hours saved | Across 100 decks, that can save a full week of reading. |
  | Review all decks at once | Decks are processed in parallel, not one by one. |

### 2. Beyond the number — Cinema, `light`

- **Eyebrow:** Beyond the number
- **Headline:** Explain the score. Defend the decision.
  *(lines: ["Explain the score.", "Defend the decision."]; mobileLines: ["Explain", "the score.", "Defend", "the decision."])*
- **Sub:** EvalLense shows what shaped the score and links each finding back to the deck. Your team can defend the shortlist, explain the feedback, and know what to ask next.
- **Media:** `/assets/evidence-reports/beyond-number-cinema.mp4`

### 3. Anatomy of the report — PinnedSteps v1, `light`

- **Eyebrow:** Anatomy of the report
- **Title:** One report. [Three] layers. *(line1="One report." line2="Three" line2Accent="layers.")*
- **Sub:** Start with the summary. See what shaped the score. Walk into the room with the right questions.
- **Steps (pinned, 3):**
  1. **01 · Project Summary** — The fast read: what the project does, how it scored, where it looks strong, and what to verify live.
  2. **02 · AI Score Report** — See what shaped the score, how each judge contributed, and how every dimension affected the result.
  3. **03 · Questions for Live Q&A** — Ready-to-use questions, ranked by priority and linked to the dimension each one tests.
- **Media (mediaNode — actual image):** `/assets/evidence-reports/report-evidence-map-01.webp` — 1448×1086, ratio 4:3.
  Alt: "EvalLense report evidence map — Project Summary, AI Score Report, and Questions for Live Q&A, with findings linked back to pitch-deck slides"
  *(Применяется page-local float: scale 1.15 + buoyant drift; motion отключается при prefers-reduced-motion.)*

### 4. Inside the AI Score Report — Gallery v4, `light`

- **Eyebrow:** Inside the AI Score Report
- **Title:** See what [shaped] every score *(titleLead="See what" titleAccent="shaped" title="every score")*
- **Sub:** See the evidence, confidence, judge input, and weights behind every score.
- **Cards (Gallery, 6 — все карточки, без отдельного «компактного списка»):**

  | Tag | Title | Body | Href |
  |---|---|---|---|
  | Per-dimension breakdown | What raised it. What lowered it. | For each dimension, see the score, confidence, what supports it, what lowers it, and what would change it. | — |
  | Judge contribution matrix | How each judge contributed | See who contributed to each dimension and where strong disagreements were flagged. | — |
  | Score formation | How the total adds up | See each dimension score, its weight, and its contribution to the final result. | — |
  | Methodology | The rules behind the score | The scale and scoring rules used consistently across every deck. | `/trust/methodology` |
  | Initial criteria | Your weights, fixed across the batch | Your criteria stay read-only and apply to every team on the same basis. | — |
  | Judge conclusions | Each judge, on the record | A takeaway, main concern, and live question from every judge. | — |

  *(Было 3 featured + 3 compact list — теперь 6 равных карточек в Gallery v4 grid.
  "Methodology" — единственная карточка с живой ссылкой; остальные href-less.)*

### 5. Grounded, not opaque — EditorialSplit, `light`

- **Eyebrow:** Grounded, not opaque
- **Title:** Every finding links back to a [slide]
- **Sub:** The report is built to be checked. Each score comes with what supports it and what lowers it, and every finding points to the slide it came from — so a claim reads as an observation, not an opinion.
- **Points (left column, 3):**
  - **What supports, what lowers** — Each dimension lists the concrete signals that raised or reduced its score.
  - **Linked to the slide** — Every finding cites the exact slide — number, title, and note — so you can open it and check the claim against the source.
  - **Built for live Q&A** — See where a deck is thin before the team is in the room.
- **Media (right):** `/assets/evidence-reports/slide-source-map-01.webp` — 1600×1200, ratio 4:3.
  Alt: "A pitch-deck slide (Slide 07) linked to the supporting and lowering evidence behind its score, with a verify-live cue"

---
*(ZoneToneFlip — tone crossfade seam; no visible heading. Transitions the shared lobes background from light to dark.)*

---

### 6. Deck completeness — Bento, `ink`

- **Eyebrow:** Deck completeness
- **Title:** See what the deck never [covered]
- **Sub:** The report checks which core sections are present, thin, or missing, then shows the severity and the dimension affected. It's a review signal, not a verdict.
- **Tiles (Bento, 3):**

  | Tag | Title | Body | Feature |
  |---|---|---|---|
  | 10 core sections | Present, thin, or missing | Problem, Solution, Market, Business Model, Traction, Team, Roadmap, Financials, Ask, and Other — each checked for presence and depth. | ✅ feature (contains ChipGrid) |
  | Severity | Every gap ranked by severity | Each gap is marked info, warning, or critical and linked to the dimension it affects. | — |
  | Not a fact-check | Missing does not mean false | Completeness flags missing or thin coverage. It does not validate the claim itself — that remains a human judgment. | — |

- **ChipGrid (inside the feature tile):** 10-row inline grid, 2 columns, bare/ink surface.
  Rows (name · sev · status · dimension):

  | Section | Severity | Status | Dimension |
  |---|---|---|---|
  | Problem | info | present | — |
  | Solution | info | present | — |
  | Market | warning | thin | P3 Market |
  | Business model | info | present | — |
  | Traction | info | thin | P4 Traction |
  | Team | info | present | — |
  | Roadmap | info | present | — |
  | Financials | critical | missing | P5 Viability |
  | Ask | warning | thin | — |
  | Other | info | present | — |

  Legend: info · warning · critical.

### 7. Across the review — RiskControl, `ink`

- **Eyebrow:** Across the review
- **Title:** One report, from first read to [final record]
- **Sub:** The same report supports preparation, selection, feedback, committee decisions, and the final record.
- **Pairs (5 rows; left = moment/use-case, right = outcome):**

  | leftTag | risk (use case) | rightTag | control (outcome) |
  |---|---|---|---|
  | Before review | Reviewer prep | What you know | A briefed first read — walk in already knowing each deck's strengths, gaps, and what to ask. |
  | During shortlisting | Shortlist discussion | What you can defend | Compare teams on the same structured basis, not gut feel. |
  | After review | Founder feedback | What you can share | Give every team concrete, structured feedback — not just a yes or no. |
  | Before the committee | Committee prep | What you bring | Bring a defensible, evidence-linked basis for the decision. |
  | After the decision | Batch archive | What you keep | Keep a clear record of how every team was evaluated. |

  *(Компонент изменился с horizontal-gallery на RiskControl — левая колонка = момент/use-case,
  правая = конкретный outcome. Поверхность была light, теперь ink.)*

### 8. Final CTA — Cinema, `ink`

- **Eyebrow:** Get started
- **Headline:** AI prepares. You decide. *(mobileLines: ["AI prepares.", "You decide."])*
- **Sub:** See a real report on your own deck — book a demo and walk through a full evaluation report: summary, reasoning, and the questions to ask live.
- **CTA:** Book a Demo → `/#demo`
- **Media:** `/assets/methodology/cinema.mp4` *(разделяет видео с Methodology-страницей)*

  *(Heading изменился с "See a real report on your own deck" на "AI prepares. You decide." —
  sub теперь несёт "See a real report on your own deck…" как вводную.)*

## Числа и факты

| Факт | Значение | Источник (ai-jury-prod) |
|---|---|---|
| Слоёв отчёта | 3 AI-слоя (Project Summary · AI Score Report · Questions for Live Q&A) + Live Jury Voting (HITL) | `report.md` §4 |
| Блоков AI Score Report | 6 (per-dimension breakdown · judge contribution matrix · score formation · methodology · initial criteria · judge conclusions) | `report.md` §8 |
| Измерений в breakdown | 6 (P1–P6) | `report.md` §8.6, `judges.md` |
| Полей в per-dimension breakdown | score · weight · confidence · supports · lowers · what-would-change-it | `report.md` §8.6 |
| Deck-completeness секций | 10 (problem…other), severity info/warning/critical | `report.md` §7 |
| Группы вопросов | ranked by priority, linked to dimension | `report.md` §10 |
| Роли судьи в матрице | Primary / Secondary / Advisory + disagreement highlight | `report.md` §8.5 |
| Шкала | 0.0–10.0 (0–100 — только UI) | `report.md` §8.3 |
| AI Criterion Score *(внутр.)* | `R(d)·[1 − 0.15·(1 − C(d))]`, штраф ≤15% | `report.md` §8.1 |
| AI Total Score *(внутр.)* | `Σ AI Criterion Score × Criterion Weight` — advisory | `report.md` §8.1/8.3 |
| Статус AI Total Score | advisory; rank по human Jury Score | `report.md` §8.1, §12 |
| SourceRef поля | slide number · title · note (привязка к слайду; шиппнуто) | `report.md` §9 + founder |

> **Что рендерится публично.** Качественные элементы (3 слоя, 6 блоков, supports/
> lowers, severity-лейблы, статус advisory) — да. Точные формулы и константа `0.15`
> — **внутренние**, на странице не показываются (как и на [[sitemap|Methodology]]);
> держим в таблице для сборки/демо. Глубину scoring — через cross-link на
> Methodology, не дублировать.

## Изображения и медиа

| Слот | Секция | Путь / формат | Что изображено |
|---|---|---|---|
| hero | §1 (StatementHero) | `/assets/evidence-reports/hero-score-dashboards-01.webp` — 1536×1024, 3:2 | Балл с dimension radar, тонкие линии к слайдам дека; lens-градиент violet→cyan→aqua |
| beyond-cinema | §2 (Cinema) | `/assets/evidence-reports/beyond-number-cinema.mp4` | Видео-фон для cinema-заголовка |
| anatomy | §3 (PinnedSteps) | `/assets/evidence-reports/report-evidence-map-01.webp` — 1448×1086, 4:3 | Evidence map: 3 слоя отчёта (Summary/Score/Questions) с привязками к слайдам; page-local float: scale 1.15 + drift |
| grounded | §5 (EditorialSplit) | `/assets/evidence-reports/slide-source-map-01.webp` — 1600×1200, 4:3 | Slide 07 ↔ supports/lowers/verify-live; thin connector lines |
| cta-cinema | §8 (Cinema) | `/assets/methodology/cinema.mp4` | Разделяет видео с Methodology-страницей |

> Реальный сэмпл отчёта (Project Summary со score + supports/lowers + slide-привязка)
> по-прежнему нужен как главный визуальный «trust lever» — вставляется фаундером.
> Кнопка View Sample Report держится disabled (`href: "#"`). До готовности сэмпла
> anatomy-слот показывает `/assets/evidence-reports/report-evidence-map-01.webp`.

## Внутренние ссылки

- **Header/Footer nav:** пункт `Evidence-Based Reports` →
  `/product/evidence-based-reports` (footer-секция PRODUCT, см. [[sitemap|Карта сайта]]).
- **Anchor-nav на странице:** Anatomy (#anatomy) · Score (#score) · Grounded (#grounded).
- **Cross-links со страницы:**
  - [[sitemap|Methodology]] → `/trust/methodology` — card «The rules behind the score» (§4)
  - [[sitemap|Review Board]] — как отчёты сравниваются и ведут к решению
  - [[sitemap|Consistency & Reliability]] — почему score устойчив
  - [[sitemap|Entry Hub]] — откуда берутся деки для отчёта

## SEO / meta

- **`<title>`:** EvalLense — Evidence-Based Reports for Pitch Evaluation
- **meta description:** Explainable reports from EvalLense: scores across every
  dimension with reasoning, a judge matrix, findings grounded in the deck, and
  deck-completeness signals — not a black box. *(≤155)*
- **OG-изображение:** слот `hero` (`/assets/evidence-reports/hero-score-dashboards-01.webp`)

## Источники истины

### Wiki (landing)
- [[vision|Vision]] — explainable-отчёты как ценность
- [[sitemap|Карта сайта]] — Evidence-Based Reports (score linked to evidence)
- [[design-system|Design System]] — Gallery v4, PinnedSteps, Bento, RiskControl, Cinema
- [[section-types|Section Types]] / [[page-design-patterns|Page Design Patterns]] — архетипы

### Application (`ai-jury-prod`) — сверено 2026-06-16
- `wiki/product/report.md` — 4 слоя отчёта, AI Score Report (6 блоков §8), Project Summary (§7), SourceRefs (§9), Questions (§10), deck completeness (§7, 10 секций), формулы (§8.1)
- `wiki/product/judges.md` / `dimension-rubrics.md` — судьи, измерения P1–P6, supports/lowers, роли матрицы
- `wiki/product/scope.md` §5 — Summarizer F1/F2, формула, Report AC, advisory vs human

## Acceptance (что считать готовым)

- [x] страница доступна по `/product/evidence-based-reports`, обёрнута в `PageHeader` + `Footer`
- [x] все 8 секций из «Структура секций» собраны с финальной EN-копией
- [x] есть pinned-анатомия (§3, PinnedSteps), Gallery v4 для AI Score Report (§4), Cinema (§2 и §8), RiskControl (§7), Bento с ChipGrid (§6)
- [x] ZoneToneFlip между §5 и §6 переключает light→dark
- [x] поверхности: §1–5 light, §6–8 ink (arc 5L·flip·3I)
- [x] page-local float FX на hero image и anatomy image (без правок shared DS)
- [x] добавлена ссылка в footer-nav (PRODUCT)
- [ ] вставлен живой сэмпл отчёта (anatomy слот) + View Sample Report CTA активирован
- [x] `cd web && pnpm build` зелёный; `prefers-reduced-motion` уважается

## Открытые вопросы

- **✅ Slide-level SourceRefs — shipped.** Фича выкатилась; копия §5 и §4 дана в
  финальном виде с привязкой к слайду (number · title · note).
- **⭐ Реальный сэмпл отчёта — приоритет #1.** View Sample Report держит `href: "#"`.
  Вставить живой Project Summary со score + supports/lowers как главный визуал §3;
  активировать кнопку. До готовности — anatomy-слот показывает
  `report-evidence-map-01.webp`.
- **Export отчёта (PDF)** и **публичная share-ссылка** — post-MVP (`report.md` §14).
  Не обещать на странице.
- **Точные числа/формулы** (`0.15`, `A(d)`, `AI Total Score`) — рендерим лейблами
  и cross-link'ом на Methodology; литералы внутренние.
- **Не называть** «gap analysis / due diligence» — это explainable-отчёт и
  deck-completeness **signal**, не due-diligence-вердикт.
- **Статус Hackathon** — структура отчёта одинакова в обоих режимах; страница
  держится Pitch-нарратива.
- **Cinema §8 video** — переиспользует `/assets/methodology/cinema.mp4`; при
  появлении собственного видео для evidence-reports заменить путь локально.
