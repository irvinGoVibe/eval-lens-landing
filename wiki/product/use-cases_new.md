---
title: Use Cases
status: generated
version: 1.0
updated: 2026-06-27
route: /trust/use-cases
section: trust
nav_label: Use Cases
in_header_nav: false
in_footer_nav: true
cta: Book a Demo
---

# Use Cases

← [[index|Wiki]] · [[sitemap|Карта сайта]]

Trust hub page for all EvalLense ICPs: helps visitors recognize their workflow,
understand where EvalLense fits, and move toward a segment-specific page or demo.

> Это **продуктовый бриф страницы** — первичный источник для skill `page-composer`
> / `build-pages`. Основан на DOCX-драфте
> `EvalLense_Use_Cases_Product_Draft.docx`. Финальный copy — English. Важно:
> текущий MVP — **Pitch Competition first**: one organizer, one project, Pitch
> mode, P1-P6, AI reports, Jury Score, and Leaderboard by Final Score.
> Hackathon, Custom, Truth Check, multi-organizer, and export are roadmap/future
> depth, not current live coverage.

## Роль и аудитория

- **Роль страницы:** build `/trust/use-cases` as a hub page for all ICPs. This is
  not a Product Overview page; it shows who uses EvalLense, why, and what
  workflow it supports.
- **Для кого:** VC funds, accelerators, angels, corporate innovation teams,
  startup competitions, grant programs, hackathons, and universities.
- **Ключевое сообщение:** EvalLense supports many high-stakes shortlist
  workflows through the same pitch-deck evaluation engine: structured intake,
  evidence-linked reports, comparison, and a final ranking that stays
  human-owned.
- **Целевое действие:** Book a Demo → `/company/contact`; secondary action helps
  visitors choose their workflow.

## Структура секций

| # | Секция | Архетип / DS direction | Движение | Поверхность | Что показываем |
|---|---|---|---|---|---|
| 1 | Hero | `StatementHero` | reveal | light | Broad promise: one review system for every high-stakes shortlist |
| 2 | Shared pressure | `RiskControl` or editorial ink statement + compact risk/response grid | reveal | ink | Common bottleneck across every segment |
| 3 | Use-case selector | `HubMap` / `Gallery` / card grid | reveal / scrub | light | 8 ICP cards; each card includes moment, job, what EvalLense gives, CTA |
| 4 | Primary workflows | `EditorialSplit` / three large editorial cards | reveal | light | Event hosts, VC/dealflow, Hackathons |
| 5 | Same system underneath | `PinnedSteps` or `Numbered` | pin | ink | Entry Hub → Reports → Review Board → Jury Score → Leaderboard |
| 6 | What every workflow gets | `Bento` / `Numbered` | reveal | light | Outcomes that apply to every segment |
| 7 | Current coverage and roadmap | `StatBand` / compact roadmap cards | reveal | light | Available now vs next segment depth vs roadmap workflows |
| 8 | Final CTA | `QuietCta` or `CtaBand` | reveal | ink | Bring your next batch to EvalLense |

Recommended rhythm from source draft:

```text
1 light
2 ink
3 light
4 light / split
5 ink
6 light
7 light compact
8 ink
```

## Контент по секциям

### 1. Hero

- **Eyebrow:** USE CASES
- **Heading:** One review system for every high-stakes shortlist
- **Subhead:** Use EvalLense anywhere a batch of pitch decks has to become a
  shortlist your team can explain — competitions, funds, accelerators,
  hackathons, universities, grants, and corporate programs.
- **Primary CTA:** Find your workflow
- **Secondary CTA:** Book a Demo

**Visual direction:** a wide field of glass pitch-deck cards converges into a
single EvalLense lens. The lens outputs several clean workflow paths:
Competitions, VC, Hackathons, Accelerators, Universities, Grants, and Corporate
programs. Use glassmorphism, lens gradient violet → lavender → cyan → aqua,
minimal labels, no logos, no fake customer names.

### 2. Shared pressure

- **Eyebrow:** THE SHARED PRESSURE
- **Heading:** The best teams are not always the easiest ones to notice
- **Body:** Every selection program hits the same bottleneck. A careful review
  takes time. A large batch takes more time than most teams have. When the pile
  grows, reviewers skim, focus on different signals, and lose the thread across
  submissions.

EvalLense gives each program a structured way to read the field: one intake, one
evaluation method, evidence-linked reports, comparison, and a final ranking that
stays human-owned.

Risk / response grid:

| Risk | EvalLense response |
|---|---|
| Too many decks to read carefully | Structured AI-assisted first pass |
| Reviewers focus on different things | Fixed criteria and judge lenses |
| Scores are hard to explain | Evidence trace behind each score |
| Strong teams get missed | Ranked shortlist and review board |
| AI should not pick winners | Jury Score controls the final ranking |

### 3. Use-case selector

- **Eyebrow:** FIND YOUR WORKFLOW
- **Heading:** Pick the workflow that looks like yours
- **Subhead:** Different teams use EvalLense for different selection jobs. The
  common pattern is the same: many submissions, limited review capacity, and a
  decision that needs to be explained.
- **UX:** grid or horizontal gallery of 8 segment cards. Every card should
  include segment name, moment, job, what EvalLense gives, and CTA. Every card
  should be clickable.

Segment cards:

| Segment | Moment | Job | EvalLense gives | CTA |
|---|---|---|---|---|
| Pitch Competitions | Before finals day | Move from open submissions to a ranked finalist board. | One rubric, evidence-linked reports, live questions, and a leaderboard your jury owns. | Explore pitch competitions |
| Hackathons | Before live judging | Review many teams fast and prepare the judge panel. | A pitch-deck first pass today, with execution-specific hackathon review on the roadmap. | Explore hackathons |
| VC Funds | Before the pipeline meeting | Turn inbound decks into a partner-ready first read. | Market, team, GTM, feasibility signals, missing evidence, and questions for the first call. | Explore VC dealflow |
| Accelerators & Incubators | Before cohort selection | Compare applicants on one standard and defend the cohort decision. | Side-by-side reports, fixed criteria, evidence gaps, risks, and selection questions. | Explore accelerators |
| Angel Investors | Before diligence night | Know which decks deserve your time. | A structured first read with strengths, weaknesses, missing evidence, and founder questions. | Explore angel review |
| Corporate Innovation | Before stakeholder review | Separate real partnership potential from innovation theatre. | Fit signals, readiness checks, business value, evidence gaps, and a shortlist for the committee. | Explore corporate innovation |
| Grant Programs | Before funding decisions | Review applications against fixed criteria and keep the decision explainable. | Comparable scores, evidence-linked reasoning, missing points, and a review trail. | Explore grants |
| Universities | Before demo day or program selection | Compare student and research teams fairly. | Transparent scoring, useful feedback, presentation questions, and a human-owned ranking. | Explore universities |

Disclaimer under selector:

> Example scenarios are illustrative. They describe typical program workflows,
> not customer case studies.

Future route ideas:

- `/trust/use-cases/pitch-competitions`
- `/trust/use-cases/hackathons`
- `/trust/use-cases/vc-funds`
- `/trust/use-cases/accelerators`
- `/trust/use-cases/angel-investors`
- `/trust/use-cases/corporate-innovation`
- `/trust/use-cases/grants`
- `/trust/use-cases/universities`

Until child pages exist, route cards to `/company/contact` with segment context
or use a disabled / coming-soon state depending on product decision.

### 4. Primary workflows

- **Eyebrow:** PRIMARY WORKFLOWS
- **Heading:** Start with the workflows we see most
- **Subhead:** EvalLense can support many selection programs. These three are
  the clearest starting points today.

#### Event hosts

- **Title:** Pitch events and competitions
- **Body:** For event hosts, the pressure starts before the stage. The jury needs
  to know which teams deserve a closer live read. EvalLense turns submissions
  into a ranked board, report set, and question list before finals day.
- **What changes:**
  - One intake flow for teams.
  - Every deck reviewed against the same criteria.
  - Reports ready before live judging.
  - Questions prepared per finalist.
  - Final ranking owned by the jury.
- **CTA:** Plan a competition workflow

#### VC and dealflow

- **Title:** VC and early dealflow
- **Body:** For funds, EvalLense is not diligence and not an investment
  decision. It is a structured first read. It helps the team decide which decks
  deserve partner time and which questions to ask first.
- **What changes:**
  - Every inbound deck gets a consistent read.
  - Partners see strengths, risks, and missing evidence.
  - Market, team, GTM, and feasibility are separated.
  - Pipeline meetings start with better context.
  - First calls start with better questions.
- **CTA:** Plan a dealflow workflow

#### Hackathons

- **Title:** Hackathons and build sprints
- **Body:** For hackathons, speed matters, but so does clarity. EvalLense helps
  structure the first pass and prepare live judging. Today this works through
  pitch-deck review. Execution-specific demo review belongs to the roadmap.
- **What changes:**
  - Fast structured first pass.
  - Shortlist-ready comparison.
  - Questions for the live round.
  - Clearer review before judges meet.
  - Roadmap path to execution-specific scoring.
- **CTA:** Plan a hackathon workflow

### 5. Same system underneath

- **Eyebrow:** SAME ENGINE
- **Heading:** Same system. Different selection moments.
- **Subhead:** Each workflow has its own decision context, but the core system
  stays the same: collect decks, structure the evidence, compare the batch, and
  keep the final call human.

System chain:

```text
Entry Hub -> Evidence-based Reports -> Review Board -> Jury Score -> Leaderboard
```

Tiles:

| Tile | Copy |
|---|---|
| Entry Hub | Collect decks in one managed flow. |
| Evidence-based Reports | Turn each deck into structured findings, scores, gaps, and questions. |
| Judge Lenses | Review the deck through role-specific AI perspectives. |
| Review Board | Compare the batch side by side and build the shortlist. |
| Human Jury Score | Keep the final ranking under human control. |
| Decision Trail | Keep the evidence and reasoning visible after the shortlist is built. |

### 6. What every workflow gets

- **Eyebrow:** WHAT YOU GET
- **Heading:** More signal before the final call
- **Subhead:** Regardless of the segment, EvalLense gives the team the same
  operating advantage: less raw pre-reading, more structured comparison, and a
  clearer decision trail.

Values:

| Value | Copy |
|---|---|
| Compare fairly | Every submission is evaluated against the same criteria. |
| Keep evidence visible | Scores stay connected to the deck, not just a final number. |
| Shortlist faster | The team starts from structured reports, not raw slides. |
| Ask better questions | Live review starts with what needs to be clarified. |
| Keep the final call human | AI prepares the analysis. The team decides. |

Small note:

> Time savings depend on batch size, review depth, and team process. EvalLense is
> designed to reduce manual pre-reading, not to remove human judgment.

### 7. Current coverage and roadmap

- **Eyebrow:** CURRENT COVERAGE
- **Heading:** Built around pitch-deck evaluation first
- **Body:** EvalLense currently focuses on pitch-deck based evaluation for Pitch
  Competition style workflows. That covers the common first pass for
  competitions, accelerators, funds, universities, grants, and corporate
  programs.

Hackathon-specific execution review, custom methodologies, external truth check,
and deeper program-specific workflows can be expanded as separate modes and
segment pages.

Coverage cards:

| Card | Copy |
|---|---|
| Available now | Pitch-deck based review with P1-P6 criteria, evidence reports, review questions, and human-owned ranking. |
| Next segment depth | Dedicated pages for pitch competitions, VC dealflow, accelerators, hackathons, universities, grants, and corporate innovation. |
| Roadmap workflows | Hackathon execution review, custom rubrics, truth check, and workflow-specific scoring. |

### 8. CTA band

- **Eyebrow:** GET STARTED
- **Heading:** Bring your next batch to EvalLense
- **Subhead:** Tell us what kind of program you run. We will map your workflow,
  show how the review would work, and walk through a pilot batch.
- **Primary CTA:** Book a Demo
- **Secondary CTA:** Choose your use case

## Числа и факты

| Факт | Значение | Источник |
|---|---|---|
| ICP segments | VC funds, accelerators, angels, corporate innovation, startup competitions, grant programs, hackathons, universities | DOCX source alignment |
| Current MVP | Pitch Competition first: one organizer, one project, Pitch mode | DOCX source alignment |
| Evaluation dimensions | P1-P6 | DOCX source alignment / product methodology |
| Ranking | Leaderboard by Final Score / Jury Score controls final ranking | DOCX source alignment |
| Hackathon execution review | Roadmap / future depth, not current live coverage | DOCX source alignment |
| Custom methodologies, Truth Check, multi-organizer, export | Outside MVP / roadmap | DOCX source alignment |

## Изображения

| Слот | Где на странице | Что изображено | Промпт-набросок (стиль бренда) |
|---|---|---|---|
| hero | секция 1 | Many different glass deck cards flowing into one lens, then branching into workflows. | EvalLense lens gradient violet to lavender to cyan to aqua, Apple-neutral, glass pitch-deck cards, no logos, no fake customer names. |
| use-case selector | секция 3 | Grid of 8 glass cards with small segment icon or abstract object. | Light DS surface, hairline borders, glass cards, restrained segment labels, no customer logos. |
| primary workflows | секция 4 | Three large editorial cards: Event hosts, VC, Hackathons. | Event hosts finalist board / stage preparation; VC pipeline meeting / first-read notes; Hackathons live judging / build sprint. |
| same engine | секция 5 | Horizontal system chain. | Entry Hub -> Reports -> Review Board -> Jury Score -> Leaderboard, dark ink section, lens signal lines. |
| coverage | секция 7 | Compact roadmap cards. | Available now / next segment depth / roadmap workflows, calm light surface, no huge timeline. |

## Внутренние ссылки

- **Header/Footer nav:** `Use Cases` → `/trust/use-cases` in footer TRUST.
- **Primary CTA:** `Book a Demo` → `/company/contact`
- **Future child route strategy:** route cards can later point to the use-case
  child routes listed in section 3.
- **Cross-links со страницы:**
  - [[methodology|Methodology]] — how the evaluation works
  - [[consistency-reliability|Consistency & Reliability]] — why outputs are comparable
  - [[review-board|Review Board]] — how teams compare the batch
  - [[evidence-based-reports|Evidence-Based Reports]] — what every report contains

## SEO / meta

- **`<title>`:** EvalLense Use Cases — One Review System for Every Shortlist
- **meta description:** See how EvalLense supports pitch competitions, VC
  dealflow, accelerators, hackathons, grants, universities, and corporate
  innovation with evidence-linked pitch-deck review.
- **OG-изображение:** slot `hero`

## Источники истины

### Source document

- `/Users/vrway/Downloads/EvalLense_Use_Cases_Product_Draft.docx`

### Wiki

- [[sitemap|Карта сайта]] — route and section placement
- [[design-system|Design System]] — DS tokens, surfaces, motion, components
- [[component-library|Component Library]] — DS-section inventory
- [[page-design-patterns|Page Design Patterns]] — page rhythm and archetypes
- [[overview|Product Overview]] — product context
- [[review-board|Review Board]] — batch comparison and Final Score context
- [[evidence-based-reports|Evidence-Based Reports]] — evidence-linked report context

## Acceptance (что считать готовым)

- [ ] Page exists at `/trust/use-cases`.
- [ ] Hero explains broad use-case coverage.
- [ ] Selector includes 8 ICP cards.
- [ ] Each card has Moment / Job / EvalLense gives / CTA.
- [ ] Event hosts, VC, and Hackathons get extra depth.
- [ ] Hackathon is honest: pitch-deck first pass today, execution-specific review on roadmap.
- [ ] Current coverage section clearly states Pitch Competition first.
- [ ] No fake logos, quotes, or case studies.
- [ ] No measured outcome claims without data.
- [ ] Related future child pages are implied through card CTAs.
- [ ] Page works as a hub, not as a full page for every ICP.
- [ ] Mobile selector is readable and scannable.
- [ ] CTA leads to demo or workflow selection.
- [ ] Uses DS styles, DS sections, and visual-layer rules through `@/components/ds`.
- [ ] `cd web && pnpm build` green; `prefers-reduced-motion` respected.

## Открытые вопросы

- **Child route behavior:** until child pages exist, should ICP cards route to
  `/company/contact` with segment context, or render disabled / coming-soon states?
- **Segment-specific pages:** which child pages should be created first:
  pitch competitions, VC dealflow, accelerators, or hackathons?
- **Verified metrics:** no measured time-savings or customer outcome claims are
  available. Do not invent them.
- **Customer proof:** no fake logos, quotes, or case studies. Example scenarios
  are illustrative only.
- **Hackathon scope:** do not claim live demo review, code review, repo review,
  or H1-H6 execution scoring as available unless shipped.

## Copy rules

Use clear segment language. Avoid generic hype and overclaiming.

| Do not use | Use |
|---|---|
| unlock | batch |
| revolutionize | shortlist |
| game-changing | review queue |
| fake proof | evidence |
| measured time savings unless verified | structured first read |
| customer logos / fake case studies | human-owned ranking |
| investment advice language | final call |
|  | program workflow |
