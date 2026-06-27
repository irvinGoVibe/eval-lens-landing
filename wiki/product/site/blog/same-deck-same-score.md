---
slug: same-deck-same-score
category: Research
accent: aqua
title: Same deck, same score
excerpt: Reproducibility is the unglamorous property that decides whether a ranking survives scrutiny. Here is the part of the score we made pure math — no model in the loop — so the same deck returns the same number every time.
date: 2026-06-21
readMinutes: 8
cover: /assets/blog/same-score/cover.png
author: Anonymous Unicorn
status: draft
---

A founder emails three weeks after the competition. Polite, but pointed: *why did we score a 6?* You open the report to answer, re-run the deck to be sure — and the number comes back a 7.

Now you have two problems. The founder's, and a much worse one of your own.

Most evaluation processes call themselves objective. What they usually mean is that nobody re-ran them. A score feels solid right up until the moment you have to produce it twice, in front of someone who cares about the difference. That moment is the whole job. An organizer is not paid to generate opinions about startups. They are paid to rank them and defend the ranking.

So this is a piece about one property that sounds boring and turns out to be the entire point: the same deck should get the same score.

## The short version

:::gallery
![](/assets/blog/same-score/short-version.png)
:::

Everything below is why we drew that line exactly there.

## "Objective" usually means nobody re-ran it

Early on, we did re-run things. We sent the same deck through the same pipeline, same judge roles, nothing changed — and watched the result move. Some drift we expected; language models are probabilistic and wording wanders. But scores moved too. One run leaned on team strength, the next punished a thin market slide. The deck had not changed. The evaluation had.

For a demo, that is survivable. For a product that ranks real submissions, it is not. A founder should not get a different evaluation because the model noticed a different signal on Tuesday than it caught on Monday. And you should not have to hope nobody re-runs the deck.

That run reframed the project for us. We were not shipping a generator of polished opinions. We were on the hook for an evaluation system, and evaluation systems have to repeat.

:::gallery
![](/assets/blog/same-score/reproducibility.png)
:::

## We took the model out of the scoring step

Here is the part most people get wrong, including us at first. The fix for "the score keeps moving" is not a better prompt. It is removing the model from the place where the score is made.

For a long time, even our scoring stage asked a model to turn the judges' work into a number. That was the leak. So we closed it. Today the scoring stage does something deliberately dull:

- it does not call a model;
- it does not write a prompt;
- it does not parse a model's JSON;
- each dimension's score comes straight from the judge that owns it;
- the total is a weighted sum.

Same inputs in, same number out. Every time, by construction.

We did not make the model deterministic, and we have never claimed we did. We moved the score to where determinism is free. The judges still reason. They just no longer get a vote on the arithmetic.

## How the number is actually built

You can describe the whole thing in a sentence, which is the point — it is the kind of answer you can give the founder who emailed.

Each dimension gets a weighted average of the judges who cover it, trimmed a little when their confidence is low. Those dimensions are then combined using the criteria weights you set, and the result is the advisory `AI Total Score` on a 0–10 scale. No step in that chain asks a model for an opinion. Feed the scoring stage the same judge outputs and the same weights, and it returns the same number every time — identical to within less than one percent.

No mood. No Tuesday. A number you can recompute on demand and get back exactly.

Give the scoring stage the same judge reads twice, and the two runs line up column for column (illustrative numbers):

| Dimension | Run 1 | Run 2 |
|---|---|---|
| P1 Problem | 7.1 | 7.1 |
| P3 Market | 5.8 | 5.8 |
| P5 Team | 6.9 | 6.9 |
| **AI Total Score** | **6.4** | **6.4** |

Same inputs, same column twice. The promise made boring on purpose.

## The story explains the number. It never moves it.

A score with no explanation is just a verdict, and we are not in the verdict business. So the report still has a narrative — strengths, weaknesses, what is missing, questions for live Q&A. That part is written by a model, because writing is what models are good at.

But it works for the math, not the other way around. If the arithmetic says a dimension is a 7.2, the narrative does not get to call it weak. Numbers are computed, then explained — never invented by the writer to justify a score it already liked. The prose can make the number legible. It cannot outvote it.

## What we did not make deterministic

Honesty is part of the product here, so the scope matters.

Reading the deck is done by a model. Judging it is done by models. The narrative is written by a model. Those stages reason, and their reads can move a little between runs — not only the wording, the judges' numbers too. We do not pretend otherwise. The rubric-as-contract narrows that drift; it does not erase it, and chasing bit-for-bit identical model output would be the wrong goal anyway.

So does the same deck always produce the same score? The honest answer has two parts. The scoring math: yes, always, by construction. The judge reads that feed it: model work, still capable of shifting a little. What changed is that the variance is now contained to one layer instead of running loose through the whole result. When a number does move, you can see it came from a judge re-reading a slide — not from the arithmetic having a different opinion on Tuesday. And the call that decides the ranking sits past all of it: a human sets the final score.

What is fixed is the part that becomes the score. The judgments flow into arithmetic, and the arithmetic repeats. Determinism where it decides the ranking, judgment where it actually helps, and a clear line between the two. The mistake is not using a model. The mistake is letting a model quietly own the number.

:::gallery
![](/assets/blog/same-score/deterministic-line.png)
:::

## A repeatable score is a defensible score

This is why a dull property earns a whole article. Reproducibility is not a benchmark to brag about. It is what makes a ranking hold up when someone pushes on it.

The discipline is the same on every deck: a score should trace through the dimension, the evidence, the routing weight, and the math — and land in the same place if you walk the path again. That is an audit trail, not a vibe.

You feel the difference in the room. A partner leans in: *why is this one a 6 and that one an 8?* The weak answer is "the model felt stronger about it." The answer that holds is a path — this dimension, this evidence the judges cited, this weight, this number — and the quiet fact that it reads the same now as it did then. One of those answers ends the conversation. The other starts a worse one.

And the score that repeats is still advisory. The leaderboard ranks on the human `Jury Score`, not on the `AI Total Score`. You read the report, bring in live Q&A and your own context, and set the final number. The math gives you a baseline you can defend; the decision stays yours.

So when the founder emails, you have a real answer. Here is the dimension. Here is the evidence the judges read. Here is the weight. Here is the number — and yes, it is the same today as it was in the room. AI prepares the evaluation. You make the final call. Neither of you has to wonder what a re-run would say.

## Common questions

**Does the AI pick the winner?** No. The `AI Total Score` is advisory. The leaderboard ranks on the human `Jury Score`, which you set after reading the report and running live Q&A.

**Is the entire pipeline deterministic?** No, and we don't claim it is. The scoring math is — same judge outputs and weights in, same number out. The model stages that read and judge the deck can still move a little; we contain that variance to one layer instead of letting it run through the whole result.

**What if I disagree with the score?** You overrule it. The AI baseline stays visible as explanation, but your Jury Score is the one that ranks. Disagreement is part of the process, not a failure of it.

Want to put it to the test? **Book a demo**, bring your own batch — including the deck you already argued about — and run it twice.
