---
title: Use Cases
status: live
version: 1.1
updated: 2026-06-28
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

## Header nav (PageHeader)

- **Section label:** Trust
- **Section href:** `/trust`
- **In-page anchor links:**
  - Workflows → `#workflows`
  - Engine → `#engine`
  - Coverage → `#coverage`

## Структура секций

| # | Секция | DS component / custom | Поверхность | Anchor | Что показываем |
|---|---|---|---|---|---|
| 1 | Hero | `StatementHero` v1 | light | `#usecases-hero` | Broad promise: one review system for every high-stakes shortlist |
| 2 | Workflow lens visual | `WorkflowLensScene` (custom, BlobField) | soft / blob | — | Animated deck field converging into EvalLense core, branching to 7 workflow paths |
| 3 | Shared pressure | `NarrativeControlGrid` (custom ink statement + risk/response grid) | ink | `#shared-pressure` | Common bottleneck across every segment; 5 risk/control pairs |
| 4 | Selection room | `SelectionRoomScene` (custom) | light | — | "Before the meeting" — turn a pile of decks into a room the jury can read; 4 output cards + video |
| 5 | Use-case selector | `FieldedUseCaseCards` (custom card grid) | light | `#workflows` | 8 ICP cards; each card: segment, moment, job, what EvalLense gives, CTA |
| 6 | Review packet | `ReviewPacketScene` (custom ink split) | ink | — | "Not another list of use cases. A repeatable review packet." — 3 packet items + scoring-matrix image |
| 7 | Primary workflows | `WorkflowDossierTrio` (custom, BlobField) | soft / blob | — | Event hosts, VC/dealflow, Hackathons — three detailed editorial panels |
| 8 | Cinema bridge | `Cinema` DS component | ink | `#workflow-cinema` | "One engine, many workflows" — cinematic video bridge between dossier and engine steps |
| 9 | Same engine / PinnedSteps | `PinnedSteps` v3 | ink | `#engine` | Entry Hub → Reports → Judge Lenses → Review Board → Jury Score → Decision Trail; video scrub |
| 10 | What every workflow gets | `SignalYieldScene` (custom) | light | `#workflow-value` | 5 numbered value cards; operating advantage across all segments |
| 11 | Coverage and roadmap | `ScopeRoadmapLedger` (custom) | light | `#coverage` | Now / Next / Roadmap coverage cards + inline scope note |
| 12 | Final CTA | `CtaBand` DS component | dark (bleed) | — | Bring your next batch to EvalLense |

Surface rhythm:

```text
1  light
2  soft (blob)
3  ink
4  light
5  light
6  ink
7  soft (blob)
8  ink
9  ink
10 light
11 light
12 dark
```

## Контент по секциям

### 1. Hero

- **Eyebrow:** Use Cases
- **Title lead:** One review system for every
- **Title accent:** high-stakes
- **Title trail:** shortlist
- **Subhead:** Use EvalLense anywhere a batch of pitch decks has to become a
  shortlist your team can explain — competitions, funds, accelerators,
  hackathons, universities, grants, and corporate programs.
- **Primary CTA:** Find your workflow → `#workflows`
- **Secondary CTA:** Book a Demo → `/company/contact`
- **Background:** video `/assets/hero-intro-2.mp4`, poster `/assets/hero-intro-2-poster.jpg`
- **StatementHero version:** 1

### 2. Workflow Lens Visual

Custom section (`WorkflowLensScene`). No heading or copy — purely visual.

- A field of 10 animated pitch-deck card spans converges into an EvalLense core node.
- The core node reads: **EvalLense** / "one review engine"
- Seven workflow paths radiate from the core: Competitions, VC, Hackathons,
  Accelerators, Universities, Grants, Corporate.
- BlobField background. No video asset — purely CSS/HTML animation.

### 3. Shared Pressure

- **Eyebrow:** Shared pressure
- **Heading:** The best teams are not always the easiest ones to **notice** (accent word)
- **Body (paragraph 1):** Every selection program hits the same bottleneck. A
  careful review takes time. A large batch takes more time than most teams have.
  When the pile grows, reviewers skim, focus on different signals, and lose the
  thread across submissions.
- **Body (paragraph 2):** EvalLense gives the team a structured first read
  before the live decision. It prepares reports, evidence gaps, comparison
  context, and questions while keeping the final ranking under human control.

Risk / response pairs (5 items, rendered as card grid):

| Pressure | EvalLense response |
|---|---|
| Too many decks to read carefully | Structured AI-assisted first pass |
| Reviewers focus on different things | Fixed criteria and judge lenses |
| Scores are hard to explain | Evidence trace behind each score |
| Strong teams get missed | Ranked shortlist and review board |
| AI should not pick winners | Jury Score controls the final ranking |

### 4. Selection Room

- **Kicker:** Before the meeting
- **Heading:** Turn a pile of decks into a **room the jury can read** (accent)
- **Body:** EvalLense is strongest when the team needs to move from raw
  submissions to a shared review surface: intake, evidence, comparison,
  questions, and a human final call.
- **Video (in glass card):** `/assets/section2-scroll-2.mp4` (autoPlay, muted, loop)
- **Lens labels on video overlay:** Intake / **EvalLense** / Board

Four output cards (`ROOM_OUTPUTS`):

| Label | Title | Body |
|---|---|---|
| Entry Hub | One intake flow | Teams submit into a managed flow instead of scattering decks across inboxes and folders. |
| Reports | Structured first read | Each deck comes back with findings, gaps, scores, and questions connected to the evidence. |
| Review Board | A batch view | The team sees the field side by side before the live decision, not one deck at a time. |
| Jury Score | Human-owned ranking | AI prepares the analysis. The jury keeps control of the final shortlist. |

### 5. Use-Case Selector

- **Heading:** Pick the workflow that **looks like yours** (accent)
- **Subhead:** Different teams use EvalLense for different selection jobs. The
  common pattern is the same: many submissions, limited review capacity, and a
  decision that needs to be explained.
- **UX:** grid of 8 segment cards + 1 media panel. Every card is an `<a>` link.
  All cards currently route to `/company/contact?use_case=<segment>` (no
  child pages yet).

Media panel (above cards in grid):

- Video: `/assets/backgrounds/bg-abstract-cinematic.mp4` (autoPlay, muted, loop), poster `/assets/section2-scroll-2-poster.jpg`
- Overlay label: "Workflow atlas"
- Overlay body: "One review engine, refracted into the selection moment each team actually runs."

Segment cards (8 items):

| Segment | Moment | Job | EvalLense gives | CTA |
|---|---|---|---|---|
| Pitch Competitions | Before finals day | Move from open submissions to a ranked finalist board. | One rubric, evidence-linked reports, live questions, and a leaderboard your jury owns. | Explore pitch competitions |
| Hackathons | Before live judging | Review many teams fast and prepare the judge panel. | A pitch-deck first pass today, with execution-specific hackathon review on the roadmap. | Explore hackathons |
| VC Funds | Before the pipeline meeting | Turn inbound decks into a partner-ready first read. | Market, team, GTM, feasibility signals, missing evidence, and questions for the first call. | Explore VC dealflow |
| Accelerators | Before cohort selection | Compare applicants on one standard and defend the cohort decision. | Side-by-side reports, fixed criteria, evidence gaps, risks, and selection questions. | Explore accelerators |
| Angel Investors | Before diligence night | Know which decks deserve your time. | A structured first read with strengths, weaknesses, missing evidence, and founder questions. | Explore angel review |
| Corporate Innovation | Before stakeholder review | Separate real partnership potential from innovation theatre. | Fit signals, readiness checks, business value, evidence gaps, and a shortlist for the committee. | Explore corporate innovation |
| Grant Programs | Before funding decisions | Review applications against fixed criteria and keep the decision explainable. | Comparable scores, evidence-linked reasoning, missing points, and a review trail. | Explore grants |
| Universities | Before demo day or program selection | Compare student and research teams fairly. | Transparent scoring, useful feedback, presentation questions, and a human-owned ranking. | Explore universities |

Disclaimer below grid:

> Example scenarios are illustrative. They describe typical program workflows,
> not customer case studies.

Note on routing: until child pages exist, all segment cards route to
`/company/contact?use_case=<SegmentName>` (URL-encoded). No disabled or
coming-soon states in current implementation.

### 6. Review Packet

- **Heading:** Not another list of use cases. A repeatable **review packet** (accent).
- **Body:** The segment changes, but the useful output is consistent. The team
  gets a structured first read, a comparison board, and the questions that
  should shape the live conversation.
- **Image (in glass card):** `/assets/bento/scoring-matrix.png`, fills card, CSS
  class `ev-drift` (float animation).
- **Image card caption label:** Review packet
- **Image card caption strong:** Scores, risks, gaps, and questions in one surface

Three packet items (`PACKET_ITEMS`):

| Label | Title | Body |
|---|---|---|
| What changed | Less raw pre-reading | The team starts from structured findings instead of opening every deck cold. |
| What stays visible | Evidence behind scores | Scores stay connected to the deck, missing evidence, risks, and useful follow-up questions. |
| What the meeting gets | A sharper first conversation | Pipeline meetings, cohort reviews, and live judging start with better context. |

### 7. Primary Workflows (Dossier Trio)

- **Heading:** Start with the **workflows we see most** (accent)
- **Subhead:** EvalLense can support many selection programs. These three are
  the clearest starting points today.
- **Motion panel (video):** `/assets/backgrounds/bg-wires-cinematic.mp4`
  (autoPlay, muted, loop)
- **Motion panel overlay:** "From batch pressure" / "to a board the team can
  read together"

Three editorial panels (`PRIMARY_WORKFLOWS`):

#### Event hosts
- **Label (mini-tag):** Event hosts
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
- **CTA:** Plan a competition workflow (variant: gradient)
- **CTA href:** `/company/contact?use_case=Event%20hosts`

#### VC and dealflow
- **Label (mini-tag):** VC and dealflow
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
- **CTA:** Plan a dealflow workflow (variant: ghost)
- **CTA href:** `/company/contact?use_case=VC%20and%20dealflow`

#### Hackathons
- **Label (mini-tag):** Hackathons
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
- **CTA:** Plan a hackathon workflow (variant: ghost)
- **CTA href:** `/company/contact?use_case=Hackathons`

### 8. Cinema Bridge

DS component `Cinema`.

- **Eyebrow:** One signal
- **Headline:** One engine, many workflows
- **Lines (large animated text):** "One engine," / "many workflows"
- **Mobile lines:** "One" / "engine" / "many" / "workflows"
- **Sub:** The segment changes. The operating model stays the same: intake,
  evidence, comparison, and a human final call.
- **Video:** `/assets/methodology/cinema.mp4`
- **Pin steps:** 1
- **maskId:** `usecases-workflow-engine`
- **Surface:** ink

### 9. Same Engine (PinnedSteps)

DS component `PinnedSteps` v3.

- **Eyebrow:** Same engine
- **Title line 1:** Same system.
- **Title line 2:** Different selection **moments.** (accent)
- **Sub:** Each workflow has its own decision context, but the core system stays
  the same: collect decks, structure the evidence, compare the batch, and keep
  the final call human.
- **aria-label:** Same EvalLense system underneath every supported workflow
- **Video scrub:** `/assets/methodology/methodology-transition.mp4` (96 frames)
- **Media hint:** Entry Hub to reports, review board, Jury Score, leaderboard
  and decision trail

Six steps (`ENGINE_ITEMS`):

| Num | Label | Description |
|---|---|---|
| 01 | Entry Hub | Collect decks in one managed flow. |
| 02 | Evidence-based Reports | Turn each deck into structured findings, scores, gaps, and questions. |
| 03 | Judge Lenses | Review the deck through role-specific AI perspectives. |
| 04 | Review Board | Compare the batch side by side and build the shortlist. |
| 05 | Human Jury Score | Keep the final ranking under human control. |
| 06 | Decision Trail | Keep the evidence and reasoning visible after the shortlist is built. |

### 10. What Every Workflow Gets

- **Kicker:** What you get
- **Heading:** More **signal** (accent) before the final call
- **Body:** Regardless of the segment, EvalLense gives the team the same
  operating advantage: less raw pre-reading, more structured comparison, and a
  clearer decision trail.

Five numbered value cards (`VALUES`):

| Num | Title | Body |
|---|---|---|
| 01 | Compare fairly | Every submission is evaluated against the same criteria. |
| 02 | Keep evidence visible | Scores stay connected to the deck, not just a final number. |
| 03 | Shortlist faster | The team starts from structured reports, not raw slides. |
| 04 | Ask better questions | Live review starts with what needs to be clarified. |
| 05 | Keep the final call human | AI prepares the analysis. The team decides. |

### 11. Coverage and Roadmap

- **Kicker:** Current coverage
- **Heading:** Built around **pitch-deck evaluation** (accent) first
- **Body:** EvalLense is strongest today where the source material is a pitch
  deck and the job is a structured first read. More segment-specific pages and
  workflow modes should stay clearly separated from what is already available.

Three coverage cards (`COVERAGE`):

| Value badge | Label | Description |
|---|---|---|
| Now | Available coverage | Pitch-deck based review with P1-P6 criteria, evidence reports, review questions, and human-owned ranking. |
| Next | Segment depth | Dedicated pages for pitch competitions, VC dealflow, accelerators, hackathons, universities, grants, and corporate innovation. |
| Roadmap | Workflow expansion | Hackathon execution review, custom rubrics, truth check, and workflow-specific scoring. |

Inline scope note (rendered inside the ledger as an `<aside>`):

- **Label:** Scope note
- **Body:** Hackathon execution review, custom rubrics, truth check, and
  workflow-specific scoring are roadmap areas. This page should not present them
  as available product coverage.
- **Boundary tags (visual chips):** Pitch Competition first · Human final call ·
  No fake case studies

### 12. CTA Band

DS component `CtaBand`.

- **Eyebrow:** Get started
- **Title:** Bring your next batch to **EvalLense** (accent)
- **Sub:** Tell us what kind of program you run. We will map your workflow,
  show how the review would work, and walk through a pilot batch.
- **Primary CTA:** Book a Demo → `/company/contact`
- **Secondary CTA:** Choose your use case → `#workflows`
- **auroraVariant:** ocean
- **Video:** `/assets/cta/neo.mp4`
- **Theme:** dark, bleed

## Числа и факты

| Факт | Значение | Источник |
|---|---|---|
| ICP segments | VC funds, accelerators, angels, corporate innovation, startup competitions, grant programs, hackathons, universities | DOCX source alignment |
| Segment card count | 8 cards in use-case selector | Live page |
| Segment card label for accelerators | "Accelerators" (not "Accelerators & Incubators") | Live page code |
| Current MVP | Pitch Competition first: one organizer, one project, Pitch mode | DOCX source alignment |
| Evaluation dimensions | P1-P6 | DOCX source alignment / product methodology |
| PinnedSteps count | 6 steps: Entry Hub, Evidence-based Reports, Judge Lenses, Review Board, Human Jury Score, Decision Trail | Live page code |
| Ranking | Leaderboard by Final Score / Jury Score controls final ranking | DOCX source alignment |
| Hackathon execution review | Roadmap / future depth, not current live coverage | DOCX source alignment |
| Custom methodologies, Truth Check, multi-organizer, export | Outside MVP / roadmap | DOCX source alignment |
| ICP card routing | `/company/contact?use_case=<segment>` for all 8 segments | Live page code |

## Медиа-слоты (видео и изображения)

| Слот | Секция | Asset path | Тип | Примечания |
|---|---|---|---|---|
| hero-video | 1 Hero | `/assets/hero-intro-2.mp4` | video (autoPlay, muted, loop) | poster `/assets/hero-intro-2-poster.jpg` |
| workflow-lens | 2 Lens visual | — | CSS/HTML animation | BlobField, 10 deck spans, no external video |
| selection-room-video | 4 Selection room | `/assets/section2-scroll-2.mp4` | video (autoPlay, muted, loop) | Inside glass card |
| field-media-video | 5 Use-case selector | `/assets/backgrounds/bg-abstract-cinematic.mp4` | video (autoPlay, muted, loop) | poster `/assets/section2-scroll-2-poster.jpg` |
| scoring-matrix | 6 Review packet | `/assets/bento/scoring-matrix.png` | image (next/image, fill) | CSS class `ev-drift` (float animation) |
| dossier-motion | 7 Primary workflows | `/assets/backgrounds/bg-wires-cinematic.mp4` | video (autoPlay, muted, loop) | In glass motion panel |
| cinema-video | 8 Cinema bridge | `/assets/methodology/cinema.mp4` | video via Cinema DS | Full-width cinematic |
| pinned-steps-scrub | 9 PinnedSteps | `/assets/methodology/methodology-transition.mp4` | video scrub (96 frames) | Scrubbed by scroll position |
| cta-video | 12 CtaBand | `/assets/cta/neo.mp4` | video via CtaBand | aurora ocean variant |

## Внутренние ссылки

- **Header/Footer nav:** `Use Cases` → `/trust/use-cases` in footer TRUST.
- **Primary CTA:** `Book a Demo` → `/company/contact`
- **Segment card routing:** all 8 ICP cards → `/company/contact?use_case=<segment>`
  (until child pages are built)
- **Future child route strategy:**
  - `/trust/use-cases/pitch-competitions`
  - `/trust/use-cases/hackathons`
  - `/trust/use-cases/vc-funds`
  - `/trust/use-cases/accelerators`
  - `/trust/use-cases/angel-investors`
  - `/trust/use-cases/corporate-innovation`
  - `/trust/use-cases/grants`
  - `/trust/use-cases/universities`
- **Cross-links со страницы:**
  - [[methodology|Methodology]] — how the evaluation works
  - [[consistency-reliability|Consistency & Reliability]] — why outputs are comparable
  - [[review-board|Review Board]] — how teams compare the batch
  - [[evidence-based-reports|Evidence-Based Reports]] — what every report contains

## SEO / meta

- **`<title>`:** EvalLense Use Cases - One Review System for Every Shortlist
- **meta description:** See how EvalLense supports pitch competitions, VC
  dealflow, accelerators, hackathons, grants, universities, and corporate
  innovation with evidence-linked pitch-deck review.
- **OG-изображение:** slot `hero-video` poster

## Источники истины

### Source document

- `/Users/vrway/Downloads/EvalLense_Use_Cases_Product_Draft.docx`

### Live code

- `web/src/app/trust/use-cases/page.tsx` — single-file page; all data constants
  are inline (WORKFLOWS, PRIMARY_WORKFLOWS, ENGINE_ITEMS, VALUES, ROOM_OUTPUTS,
  PACKET_ITEMS, COVERAGE, RISK_PAIRS). No separate section component files.

### Wiki

- [[sitemap|Карта сайта]] — route and section placement
- [[design-system|Design System]] — DS tokens, surfaces, motion, components
- [[component-library|Component Library]] — DS-section inventory
- [[page-design-patterns|Page Design Patterns]] — page rhythm and archetypes
- [[overview|Product Overview]] — product context
- [[review-board|Review Board]] — batch comparison and Final Score context
- [[evidence-based-reports|Evidence-Based Reports]] — evidence-linked report context

## Acceptance (что считать готовым)

- [x] Page exists at `/trust/use-cases`.
- [x] Hero explains broad use-case coverage.
- [x] Selector includes 8 ICP cards.
- [x] Each card has Moment / Job / EvalLense gives / CTA.
- [x] Event hosts, VC, and Hackathons get extra depth (WorkflowDossierTrio).
- [x] Hackathon is honest: pitch-deck first pass today, execution-specific review on roadmap.
- [x] Current coverage section clearly states Pitch Competition first.
- [x] No fake logos, quotes, or case studies.
- [x] No measured outcome claims without data.
- [x] Related future child pages are implied through card CTAs.
- [x] Page works as a hub, not as a full page for every ICP.
- [x] CTA leads to demo or workflow selection.
- [x] Uses DS styles, DS sections, and visual-layer rules through `@/components/ds`.
- [x] Scope note inside coverage section explicitly marks roadmap items as not available.
- [ ] Mobile selector is readable and scannable (verify).
- [ ] `prefers-reduced-motion` respected (verify in ScrollFX / video autoplay).
- [ ] Child pages created for highest-priority segments (pitch competitions, VC dealflow).

## Открытые вопросы

- **Child route behavior:** ICP cards currently route to `/company/contact?use_case=<segment>`.
  When child pages are built, card links should update to the child route. Which
  segments get pages first?
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
