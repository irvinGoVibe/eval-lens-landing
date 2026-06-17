---
slug: how-evallense-evaluates-pitch-decks
category: Research
accent: cyan
title: How EvalLense evaluates pitch decks
excerpt: A look inside the methodology — how a deck becomes a structured, evidence-backed score you can reproduce, and why the final ranking stays yours.
date: 2026-06-15
readMinutes: 6
cover: /assets/blog/how-evallense-evaluates/cover.png
author: Anonymous Unicorn
status: draft
---

From the outside, judging a stack of pitch decks looks rigorous. A panel reads each deck, assigns scores, publishes a leaderboard. Clean.

The weak part is the part you can't see. Why did this deck score a 7 and that one a 6? What in the deck actually backed it? Where did the judges disagree? And the ranking that came out — did an AI decide it, or did you?

Most tools answer none of those. They hand you a number and hope you don't ask. EvalLense is built to answer all four, on every deck in the batch. That is what lets you screen a hundred decks in an afternoon and still defend every call.

## The short version

```text
Deck
→ Decoder
→ 6 Pitch AI judges (independent)
→ P1–P6 dimension scoring
→ Deterministic math (AI Total Score, advisory)
→ Human Review
→ Jury Score
→ Leaderboard
```

AI prepares the evaluation. You make the final scoring decision. Everything below is how that line is enforced, step by step — not as a slogan.

:::gallery
![](/assets/blog/how-evallense-evaluates/pipeline.png)
:::

## Step 1 — Decode the deck

Before any scoring starts, the system reads the deck as it is. The goal is to capture what the deck actually says — not to guess what the startup probably meant.

The Decoder turns any format into structured material for the judges:

- slide content and visible text;
- visual meaning and likely slide purpose;
- missing or unclear information;
- source references back to specific slides.

So a thin deck reads as a thin deck. A gap is flagged as a gap, not quietly filled in with a generous assumption. This matters more than it sounds: most "AI feedback" tools paper over missing information because a confident paragraph reads better than an honest blank.

## Step 2 — Two things people confuse: dimensions and judges

This is where most explanations get fuzzy, so here is the distinction plainly.

A Pitch Competition deck is scored on six **dimensions** — the things being measured:

| Code | Dimension | Default weight |
|---|---|---|
| P1 | Problem significance | 0.15 |
| P2 | Solution differentiation | 0.15 |
| P3 | Market attractiveness | 0.20 |
| P4 | Business model / GTM | 0.15 |
| P5 | Team / founder fit | 0.20 |
| P6 | Feasibility / readiness | 0.15 |

Market and team carry the most weight by default — and you can adjust the weights before judging starts, then they lock.

Then there are six **judges** — the perspectives doing the measuring: Problem, Solution Logic, Business Value / Market, Pitch Quality, Team Readiness, and Feasibility. A judge isn't tied to a single dimension. Each one contributes to the dimensions it's responsible for through a routing matrix — full weight where it's the primary reviewer, less where it's a secondary one.

Dimensions keep the review from collapsing into one vague impression. A startup can be strong on team and thin on market evidence, and the report keeps those signals apart. A good story can't paper over a weak number — and you see exactly where each deck stands.

:::gallery
![](/assets/blog/how-evallense-evaluates/judges-matrix.png)
:::

## Step 3 — Six judges that don't talk to each other

The six judges run in parallel, and none of them sees the others' scores while it works. That independence is the point. The moment judges can see each other, they converge — the loud one anchors the room, and you get consensus that looks like agreement but is really just deference.

For each dimension it covers, a judge returns a score from 0 to 10, a confidence level, the evidence it leaned on, strengths, weaknesses, red flags, and the questions it would ask the team live. Six perspectives stay genuinely separate — the way a real panel is supposed to work, and rarely does.

## Step 4 — The numbers come from math, not mood

Once the judges are done, a deterministic function does the arithmetic. It applies the routing matrix and the dimension weights and computes the per-dimension scores, the advisory `AI Total Score`, and the disagreement signal. No model is asked how it feels about the result.

Two consequences fall out of that:

- **It's reproducible.** Run the same deck twice and you get the same numbers, because the math is a fixed function, not a fresh opinion. A ranking holds up when someone asks how it was reached.
- **The narrative can't invent numbers.** The written report is generated after the math and has to build around it. If a dimension scored 7.2, the text cannot describe it as weak. Words explain the score; they never set it.

That order — math first, prose second — is the difference between an evidence-based report and a confident guess.

## Step 5 — Disagreement is a feature, not noise

Averages hide conflict. A dimension where every judge gives 7.5 is not the same as one where one gives 5 and another gives 10 — but the average is identical.

So EvalLense measures the spread between judges on each dimension and labels it:

| Spread | Status | What it means |
|---|---|---|
| below 1.5 | Consensus | judges agree |
| 1.5 to 2.99 | Split | moderate disagreement |
| 3.0 and up | Conflict | serious disagreement |

A conflict isn't a problem to be smoothed over. It's a map. It points your attention to the exact decks and dimensions where the judges don't agree — which is precisely where your human judgment is worth the most. You spend your review time where it actually changes the ranking.

:::gallery
![](/assets/blog/how-evallense-evaluates/spread-scale.png)
:::

## Step 6 — You make the final call

The governing rule is short:

```text
AI Total Score is advisory.
The leaderboard ranks on your Jury Score.
```

You read the AI report, add live Q&A and the context only you have, then submit the final scores. The AI baseline stays on screen as explanation — it never becomes the decision. The heavy lifting is automated; the call, and the ranking, are yours.

:::gallery
![](/assets/blog/how-evallense-evaluates/final-call.png)
:::

## Why this matters

EvalLense isn't trying to make pitch judging sound more scientific with heavier language. It solves a plain problem: evaluating startups at volume needs structure, traceability, and a result you can stand behind.

A score becomes credible when it's expensive to fake — when you can see what was measured, what evidence backed it, where the judges split, and who signed off. Across 1,000+ evaluation runs, that's the line that separates a ranking you can defend from a number you have to trust on faith.

A good evaluation system should show:

- what was evaluated;
- what evidence was used;
- which dimensions were strong or weak;
- where the judges disagreed;
- who made the final decision.

That is the core of how EvalLense works — and why the lens stays in your hands.

Want to see it run on your own batch? **Book a demo.**
