---
title: YC Application Fit - EvalLens
status: draft
date: 2026-07-23
owner: EvalLens
---

# YC Application Fit - EvalLens

## Bottom line

EvalLens is a credible YC candidate if we apply as an early-stage B2B AI workflow company, not as a polished enterprise judging platform.

The strongest framing:

> EvalLens helps accelerators, funds, and startup competitions turn piles of pitch decks into evidence-linked reports and a human-ranked shortlist.

Fit score today: **7.5/10**.

The idea is YC-compatible because it is AI-native, has a concrete painful workflow, has a tight wedge, and can grow into a broader evaluation operating system. The main application risk is not the idea. The risk is weak visible traction: no confirmed ARR, no public customer proof, and several product claims that must be stated carefully.

## Current YC facts

As of July 23, 2026:

- YC is accepting applications for the **Fall 2026** batch.
- Fall 2026 runs **October to December 2026** in San Francisco.
- On-time application deadline: **July 27, 2026 at 8pm PT**.
- On-time applicants get a decision by **August 28, 2026**.
- Interviews are mostly by video in **August and September**; YC usually decides the same day as the interview.
- YC invests when accepted, not when the batch starts.
- Current standard deal: **$500,000 total**: $125,000 for 7%, plus $375,000 on an uncapped MFN safe.
- YC invests in US, Canada, Cayman, and Singapore corporations. If already incorporated elsewhere, accepted companies usually need a parent-company flip.
- The batch is in-person in San Francisco, with a 3-day kickoff and regular meetups.
- YC says it is not too early to apply: roughly 40% of companies funded per batch are just an idea, and most do not have revenue.
- A working demo matters. YC interviews focus on questions and what the team has built.

Sources:

- https://www.ycombinator.com/apply
- https://www.ycombinator.com/deal
- https://www.ycombinator.com/faq
- https://www.ycombinator.com/interviews
- https://www.ycombinator.com/howtoapply

## What YC will probably care about

YC's public advice is consistent:

- Be clear, concise, and matter-of-fact.
- Explain what we are making in simple words first.
- Show what we have built.
- Show real progress between application and interview.
- Know users and metrics if launched.
- Be honest about risks and obstacles.
- Be specific about existing alternatives and what is wrong with them.

For EvalLens, the application should avoid marketing phrases like "revolutionizing startup evaluation" and lead with the literal workflow.

## EvalLens current product story

Core product:

- Operating layer for structured batch pitch evaluation.
- Entry Hub collects applications and decks into one workspace.
- AI pipeline reads decks through fixed criteria and specialized judge lenses.
- Evidence-Based Reports explain every score and tie important findings back to the deck.
- Review Board lets a human compare reports, set Jury Scores, and rank the batch.
- AI Total Score is advisory; final ranking is human-owned.

Important existing product facts from local docs:

- Main audience: VC funds, accelerators, startup competitions, hackathons, grant programs, universities, corporate innovation teams.
- Origin: built as AI Jury during the Amazon Nova hackathon, then evolved after hundreds of internal runs.
- Current strongest mode: Pitch Competition, using 6 dimensions P1-P6.
- Pitch dimensions: problem significance, solution differentiation, market attractiveness, business model / GTM, team / founder fit, feasibility / readiness.
- Pipeline: Decode -> judge lenses -> routing matrix -> deterministic aggregation -> structured report -> human review -> leaderboard.
- Pricing model: pay per event, not per seat or monthly subscription.

Local sources:

- `wiki/product/about.md`
- `wiki/product/overview_new.md`
- `wiki/product/entry-hub.md`
- `wiki/product/evidence-based-reports.md`
- `wiki/product/review-board.md`
- `wiki/product/pricing.md`
- `wiki/product/site/blog/from-ai-jury-to-evallense.md`

## Strong YC fit

### 1. Clear problem

The problem is concrete: program owners receive too many applications, read them inconsistently, miss strong projects, and struggle to explain the final decision.

This is better than an abstract AI pitch. The user has a painful before-state:

- decks scattered across forms, emails, folders, chats;
- reviewers using different criteria;
- hours spent on first-pass review;
- weak decision trail;
- no useful feedback for rejected teams.

### 2. Strong wedge

The wedge should be **batch pitch evaluation for accelerators and competitions**, not "AI for all decisions."

This gives a narrow first buyer:

- accelerator program manager;
- pitch competition organizer;
- university entrepreneurship center;
- corporate innovation lead;
- scout or emerging fund screening inbound decks.

### 3. YC-category tailwind

YC is currently funding many AI infrastructure, eval, observability, and workflow companies. Adjacent examples:

- Confident AI: LLM eval and observability platform.
- AgentHub/Panoptive launch history: agent evaluation in realistic sandboxes.
- Lemma: production monitoring and continuous improvement for AI agents.
- Robocurve: independent benchmarks and evals for robotics.

This tells us YC does not dislike "eval" companies. But the best YC eval companies have a sharp wedge, real technical depth, and measurable proof.

### 4. Differentiation is plausible

EvalLens is not just:

- a forms and judging portal like YouNoodle / Evalato;
- a one-off pitch deck analyzer like PitchBob / V7-style document analysis;
- a generic multi-agent toy.

The differentiated claim:

> Workflow platforms manage applications. AI deck tools review one deck. EvalLens runs structured evaluation across an entire batch and gives the human team an evidence trail for the final decision.

### 5. Founder story has shape

The "AI Jury -> EvalLens" origin is good for YC because it shows learning:

- started with more AI judges;
- discovered more agents created more noise;
- saw score drift and overlap;
- moved toward methodology, routing, deterministic aggregation, and human control.

This reads like real product discovery, not pure pitch fiction.

## Weak YC fit / risks

### 1. Traction gap

YC can fund pre-revenue companies, but application strength rises sharply with proof.

Current visible proof in repo:

- 400+ or 1,000+ internal evaluation runs, depending on source.
- sample reports and decks.
- draft partnership copy with Kaizen Finance and R2 Copilot.
- planned autumn pitch competition.
- pricing model.

What is missing:

- paying customer count;
- active pilot count;
- ARR / MRR;
- number of real decks evaluated for external users;
- retention / repeat use;
- named customer references or LOIs;
- measured time saved.

### 2. TAM can look small if framed poorly

"AI judge for pitch decks" can sound like a niche tool for startup competitions. That may not feel venture-scale.

Better market story:

1. Start with startup batches because the workflow is painful and easy to reach.
2. Expand to all application-heavy evaluation workflows where the decision must be explainable.
3. Build the evaluation lineage layer: every claim, criterion, source, score, disagreement, human override, and outcome becomes traceable.

### 3. Trust burden is high

The product evaluates founders and may influence funding, acceptance, grants, or reputation. That creates fairness, bias, security, explainability, and prompt-injection concerns.

This is okay if we own it directly:

- AI prepares, humans decide.
- Scores are evidence-linked.
- Disagreement is surfaced.
- AI score is advisory.
- Claims are not overpromised.
- Security claims stay inside what is documented.

### 4. Some materials conflict

Need to resolve before applying:

- `400+` vs `1,000+` evaluation runs.
- Hackathon mode: some docs say post-MVP, one blog says present but less mature.
- Partner announcement is draft, not proof unless signed/approved.
- Landing scope says public site has no real deck upload, while product docs describe app features.

The YC application should use only claims we can defend in a follow-up call.

## Growth lineage

This is the line I would use internally:

```text
Pitch-deck batch review
-> accelerator / competition operating layer
-> VC and scout dealflow triage
-> hackathon and demo/code evaluation
-> Truth Check for startup claims
-> custom evaluation pipelines
-> evaluation lineage graph for high-stakes decisions
```

### Stage 1: Pitch batch review

Win small, urgent batches:

- 50-500 applications;
- few reviewers;
- one deadline;
- need a shortlist and feedback fast.

Primary metric:

- hours from submission deadline to defensible shortlist.

### Stage 2: Program operating layer

Move from "analyze decks" to "run the evaluation":

- intake;
- evaluator workflow;
- live Q&A questions;
- human scores;
- leaderboard;
- exports;
- participant feedback.

Revenue:

- pay-per-event packages: $199 / $500 / $1,500 / $3,900 / enterprise.

### Stage 3: VC dealflow triage

Funds and scouts use the same core workflow, with different criteria:

- inbound deck triage;
- partner meeting prep;
- investment memo drafts;
- evidence map;
- follow-up questions.

This market is harder to sell into but higher value if the product becomes embedded in weekly dealflow.

### Stage 4: Hackathon evaluation

Add artifact evaluation:

- repo;
- demo video;
- live URL;
- technical depth;
- execution under time pressure.

This is a natural expansion, but should not be oversold until demo/code review exists.

### Stage 5: Truth Check

Before judging, verify what the deck claims:

- traction;
- market size;
- customers;
- technical feasibility;
- demo availability;
- contradictions.

This turns EvalLens from scoring into evidence governance.

### Stage 6: Evaluation lineage

Long-term moat:

- a claim graph from deck content to evidence;
- criterion-level scores;
- judge lens contributions;
- disagreement signals;
- human overrides;
- final decisions;
- downstream outcomes.

The big idea:

> EvalLens becomes the system of record for why a high-stakes application decision was made.

This is much larger than startup competitions. It can apply to grants, procurement, incubators, universities, prizes, corporate innovation, and eventually any structured application workflow.

## YC application positioning

### 50 characters or less

AI review board for startup batches

### One sentence

EvalLens helps accelerators, funds, and startup competitions turn piles of pitch decks into evidence-linked reports and a human-ranked shortlist.

### What are we making?

EvalLens is a batch evaluation workspace for startup applications. Organizers collect pitch decks in one hub, run the same structured evaluation across every deck, get evidence-linked reports, and use a review board to set the final human ranking.

### Why now?

AI has made first-pass analysis cheap, but it has also made evaluation less trustworthy: decks can be AI-written, claims can be inflated, and generic AI judging drifts between runs. Program owners need speed, but they also need a decision trail. EvalLens combines AI reading with fixed criteria, evidence references, disagreement signals, and human final scoring.

### Why this team?

- Yaroslav: product vision, methodology, positioning, GTM, 14+ years in startups, digital products, business development, and market-entry strategy.
- Vladislav: architecture, engineering delivery, AI evaluation pipeline, fintech/payment infrastructure and complex systems.
- Arseniy: product experience and interface structure for complex workflows.

Need to add:

- exact equity split;
- full-time commitment;
- incorporation status;
- who writes code;
- what each founder built personally.

### What is the insight?

The first instinct is to add more AI judges. That creates more words, not more signal. The product is the methodology around the agents: fixed dimensions, routing matrix, deterministic aggregation, evidence-linked reports, disagreement visibility, and a human-owned final decision.

### What is the wedge?

Programs that receive 50-500 startup applications and need a ranked shortlist within days, not weeks.

### What is the non-obvious growth path?

Start with startup batches because they are evaluation-dense and deadline-driven. Then expand into evaluation lineage: the system of record for how application decisions are made, audited, and improved across funds, grants, corporate innovation, procurement, universities, and hackathons.

## What not to say

Avoid:

- "EvalLens predicts unicorns."
- "AI chooses the winners."
- "Fully deterministic AI evaluation."
- "Universal prompt-injection safety."
- "SOC 2 / ISO / HIPAA" unless certified or legally confirmed.
- "1,000+ runs" until the 400+ vs 1,000+ discrepancy is resolved.
- "Kaizen/R2 partnership" unless signed and approved to disclose.
- "Hackathon judge is shipped" unless demo/code review is working.

Safer:

- "AI prepares structured analysis; humans make the final decision."
- "The numeric aggregation layer is deterministic once judge outputs and weights are fixed."
- "We tested direct prompt-injection scenarios and designed the deck as evidence, not an instruction source."
- "Pitch Competition is the most mature flow; Hackathon is the next expansion."

## Proof to collect before submitting

Minimum proof package:

1. 2-minute demo video:
   - upload/add decks;
   - run batch evaluation;
   - open evidence report;
   - show AI score advisory;
   - set human Jury Score;
   - generate leaderboard.

2. Real metrics:
   - number of internal runs;
   - number of real decks processed;
   - median processing time per deck;
   - estimated manual review time saved;
   - rerun variance on a benchmark set;
   - number of conversations with funds/accelerators/organizers;
   - LOIs / pilots / paid tests.

3. Customer proof:
   - one signed pilot;
   - one named upcoming competition;
   - one quote from a program owner;
   - one example report with sensitive details removed.

4. Founder proof:
   - GitHub/build evidence;
   - short builder video;
   - optional Paxel builder report if useful and available.

## 4-day application sprint

### July 23

- Freeze the truthful product status.
- Pick one number: `400+` or `1,000+` runs.
- Confirm whether Kaizen/R2 can be disclosed.
- Record a raw demo, even if rough.

### July 24

- Talk to 5 program owners.
- Ask for a concrete pilot or LOI.
- Measure one real batch/report workflow end-to-end.
- Draft YC application in plain English.

### July 25

- Rewrite every answer to be shorter.
- Add numbers wherever possible.
- Prepare founder video.
- Prepare demo link.

### July 26

- Have one outsider read the application.
- Remove vague language.
- Submit before the July 27 deadline.

### July 27

- Use only for final fixes, not first writing.

## Interview prep if selected

Likely questions:

- What exactly does EvalLens do?
- Who uses it today?
- How many decks have you evaluated for real users?
- Why do users need this instead of forms + judges?
- Why not just use ChatGPT / Claude / V7 / PitchBob?
- What is your smallest customer segment that really wants this?
- How do you prevent bias or bad AI decisions?
- Who makes the final decision?
- How do you make money?
- Why can this become huge?
- What did you learn from users that surprised you?
- What changed between AI Jury and EvalLens?
- What is the hardest technical problem?
- What is your unfair advantage?

Best interview posture:

- Talk like builders, not consultants.
- Demo fast.
- Admit the traction gap.
- Be precise about methodology.
- Show progress since application.

## Recommendation

Apply to YC Fall 2026 if the team can submit a working demo and at least one concrete external proof point by July 27, 2026.

If not, still apply if the application is truthful and sharp. YC explicitly funds many idea-stage companies, and a rejection with a new progress delta can strengthen a later batch.

The application should not sell EvalLens as "AI judging." It should sell the thing the product learned to be:

> A structured evaluation workflow that helps people make defensible decisions over messy batches of startup applications.
