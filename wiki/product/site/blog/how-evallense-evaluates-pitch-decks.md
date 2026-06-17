---
slug: how-evallense-evaluates-pitch-decks
category: Research
accent: cyan
title: How EvalLense evaluates pitch decks
excerpt: A look inside the methodology — how a deck becomes a structured, evidence-backed score, and why the final ranking stays yours.
date: 2026-06-15
readMinutes: 5
cover: /assets/blog/how-evallense-evaluates/cover.png
author: Anonymous Unicorn
status: draft
---

Reviewing a stack of pitch decks looks structured from the outside: a panel reads each deck, assigns scores, publishes a leaderboard. The weak point hides inside the process. Why did a deck get that score? What evidence backed it? Where did reviewers disagree? And when the ranking comes out — did an AI decide it, or did you?

EvalLense is built to answer all four, on every deck in the batch. That is what lets you review a hundred decks in an afternoon and still defend every call.

## The short version

```text
Deck
→ Decoder
→ 6 Pitch AI judges
→ P1-P6 dimension scoring
→ Deterministic aggregation
→ Advisory AI Total Score
→ Human Review
→ Jury Score
→ Leaderboard
```

AI prepares the evaluation. You make the final scoring decision.

:::gallery
![](/assets/blog/how-evallense-evaluates/pipeline.png)
:::

## Step 1 — Decode the deck

Before any scoring starts, the system reads the structure of the deck. The goal is to capture what the deck actually says — not to guess what the startup probably meant.

The decoder prepares structured material for the judges:

- slide content;
- visible text;
- visual meaning;
- likely slide purpose;
- missing or unclear information;
- source references.

So a thin deck reads as a thin deck. Gaps are flagged, not quietly filled in.

## Step 2 — Score across six dimensions

A pitch competition is scored on six dimensions:

| Code | Dimension |
|---|---|
| P1 | Problem significance |
| P2 | Solution differentiation |
| P3 | Market attractiveness |
| P4 | Business model / GTM |
| P5 | Team / founder fit |
| P6 | Feasibility / readiness |

This keeps the review from collapsing into one vague impression. A startup can be strong on team and weak on GTM, or clear on the solution and thin on market evidence. The report keeps those signals apart, so a good story can't paper over a weak number — and you see exactly where each deck stands.

## Step 3 — Six specialized judges

EvalLense runs six Pitch judges, each reading the deck through a different lens:

- Problem;
- Solution Logic;
- Business Value / Market;
- Pitch Quality;
- Team Readiness;
- Feasibility.

Each judge reads across the dimensions it is responsible for, and none of them sees the others' scores while it works. Six perspectives stay genuinely independent — the way a real panel should.

:::gallery
![](/assets/blog/how-evallense-evaluates/judges.png)
:::

## Step 4 — Aggregate with deterministic math

The numbers come from math, not from a model's mood. The scoring layer calculates:

- an AI Criterion Score per dimension;
- an advisory `AI Total Score`;
- `Spread(d)`, the disagreement signal between judges.

The narrative text explains the result — it never invents the numbers. Run the same deck twice and you get the same score, so a ranking holds up when someone asks how it was reached.

## Step 5 — Surface disagreement

Averages hide conflict. A dimension where every judge gives 7.5 is not the same as one where one judge gives 5 and another gives 10 — but the average looks identical.

`Spread(d)` exposes that. A high spread is a flag: it points your attention to the decks and dimensions where the judges don't agree, so you spend your review time where it actually matters.

:::gallery
![](/assets/blog/how-evallense-evaluates/spread.png)
:::

## Step 6 — You make the final call

The governing rule is simple:

```text
AI Total Score is advisory.
The leaderboard ranks on your Jury Score.
```

You read the AI report, bring in live Q&A and your own context, then submit the final scores. The AI baseline stays visible as explanation — it never replaces your decision. The heavy lifting is automated; the call, and the ranking, are yours.

## Why this matters

EvalLense isn't trying to make pitch judging sound more scientific with heavier language. It solves a practical problem: evaluating startups needs structure, traceability, and a review you can stand behind.

A good evaluation system should show:

- what was evaluated;
- what evidence was used;
- which dimensions were strong or weak;
- where the judges disagreed;
- who made the final decision.

That is the core of how EvalLense works — and why the lens stays in your hands.

Want to see it run on your own batch? **Book a demo.**
