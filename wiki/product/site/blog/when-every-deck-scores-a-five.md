---
slug: when-every-deck-scores-a-five
category: Product
accent: violet
title: When every deck scores a five
excerpt: A score that lands every deck in the same narrow range isn't ranking anything. Here is the calibration problem we found in EvalLense, why the middle is a magnet, and how we widened the gap between strong and weak — without touching the math or the human's final call.
date: 2026-07-07
readMinutes: 7
cover: /assets/blog/every-deck-a-five/cover.png
author: Anonymous Unicorn
status: draft
---

You run a batch of twenty decks. The strong ones come back around a 5. The weak ones come back around a 5. The great one and the thin one land close enough that the number can't separate them.

Technically the pipeline did its job. It read every deck, scored every dimension, produced every report. And it still failed the only test that matters: you looked at the column of scores and it didn't tell you anything you didn't already fear. A ranking that puts everything in the same lane isn't a ranking. It's a rumor.

This is a piece about that failure — call it compression — and the unglamorous work of fixing it. Not by making the model louder, but by fixing how a judge behaves when it isn't sure.

## The short version

:::gallery
![](/assets/blog/every-deck-a-five/short-version.png)
:::

Everything below is how we found it and how we pulled the ends apart.

## A score that can't separate is just a number

We caught this the boring way: re-running old batches and looking at the shape of the results instead of any single result. The scores were stable enough. They were also huddled. Weak decks drifted up toward the middle, strong decks sat a little below where they should — and the whole distribution collapsed into a narrow lane around the center of the scale.

For a single deck, you don't notice. The report reads fine, the number looks plausible. You only see it when you put decks side by side, which is the entire job of a batch tool. A 4.8 and a 5.2 are not a decision. They're two ways of saying *I'm not sure*, dressed up as precision.

So the problem was never that a deck got the wrong number in isolation. It was that the numbers had lost their spread — and spread is the part you actually rank on.

## Why the middle is a magnet

Here is the mechanism, and it's a known one.

EvalLense runs a panel of role-based judges — a problem lens, a market lens, a team lens, and so on — and each dimension is covered by more than one of them. A judge is sharp inside its specialty. The trouble starts when a specialist is asked to weigh in on something at the edge of its lane and the deck gives it thin evidence to work with. Faced with not-enough-to-go-on, a rater does the safe, human thing: it aims for the middle. Not a 2, not an 8 — a comfortable, defensible 5-ish.

This has a name in the scoring literature — central-tendency, or leniency, bias — and it's exactly what you'd expect from a cautious evaluator hedging under uncertainty. It's not a hallucination and it's not a bug in any single answer. It's a systematic tug toward the center that, summed across a panel, quietly inflates weak decks and clips strong ones. The middle isn't a conclusion. It's a hiding place.

And it hides in the aggregate, which is why it survived so long. Every individual score looked reasonable. Only the distribution gave it away.

## We recalibrated the reads, not the machinery

The instinct is to reach for the arithmetic. We didn't touch it. The dimensions, the routing weights, the way scores combine into the advisory `AI Total Score` — all unchanged. This was never a math problem. As we've written before, the [scoring math is already deterministic on purpose](/blog/same-deck-same-score); the model was never the one doing the addition.

What we changed was the discipline each judge follows when it forms a read. The rule now is blunt: score what the evidence in front of you supports, and when the evidence is thin, that is a low read — not a polite middle. A weak signal is allowed to be a weak score. The cross-expert perspectives that made the system rich in the first place stay exactly where they were; they just stopped drifting to the center when they had little to say.

We won't walk through the internals of how that discipline is written — that's the part we keep behind the curtain. What matters to you is the behavior it produces: the panel stopped treating "I'm not sure" as a vote for 5, and started treating it as what it is.

## What the benchmark showed

We validated this the same way we validate everything: repeated runs, on decks at both ends of the quality range, before and after — and we watched the gap, not just the numbers.

A deliberately weak deck and a strong benchmark deck, average score on the 0–10 scale:

| | Weak deck | Strong deck | Gap |
|---|---|---|---|
| **Before** | ~4.8 | ~7.0 | ~2.2 |
| **After** | ~3.5 | ~6.7 | ~3.2 |

Read the gap column. That's the whole story. The strong deck barely moved — good decks were never the problem, and we made sure the fix didn't punish them. The weak deck came down to an honest number instead of a flattering one. The distance between them widened by a full point on a ten-point scale, which is the difference between a ranking you squint at and one you can act on.

Two properties held across the runs that we cared about just as much:

- **Strong decks stayed strong.** The risk of any de-inflation is that you overcorrect and start crushing good work into the same low range — compression in the other direction. That didn't happen. The top of the scale is still the top of the scale.
- **Repeat runs stayed tight.** Pulling the ends apart didn't cost stability; the same deck still lands in the same place run to run.

## The polished-deck trap, closed on the way

One bias fell out of this that's worth naming on its own, because organizers feel it constantly. A beautifully designed deck used to lift the scores of things design has nothing to do with — the business model looked stronger because the slides looked stronger. A clean template was quietly buying points on substance.

That's now separated. Presentation is assessed as presentation. A crisp, well-built deck earns credit for being a crisp, well-built deck — and not a half-point on the strength of the team or the market it happened to be describing. The founder with a gorgeous template and a thin plan no longer outscores the founder with an ugly template and a real one.

## What we did not change

The scope matters, so here it is plainly.

The reading and judging of a deck is still model work; those reads can still move a little between runs, and we don't pretend otherwise. The scoring math is untouched and still deterministic. The dimensions and weights you set are untouched. And the decision is untouched: the `AI Total Score` is advisory, the leaderboard ranks on the human `Jury Score`, and you set that after the reports and the live Q&A. We did not build a smarter oracle. We fixed a specific, measurable distortion in how the panel scores under uncertainty — and left everything downstream of it exactly where it was.

Better calibration doesn't move the final call an inch closer to the machine. It just means the baseline you're arguing with is telling you the truth about the spread.

## The change, in three lines

- **Sharper calibration.** Scores now separate strong and weak decks instead of clustering in the middle.
- **Steadier reads.** Repeat runs stay tight — the wider spread didn't cost stability.
- **Presentation stays in its lane.** A polished deck no longer inflates the scores for substance like team or business model.

## Why a boring word earns an article

Resolution — the ability of a score to tell two things apart — is not a feature you demo. It's the property that decides whether the number on the screen is doing any work at all. A reproducible score that can't separate decks is precise about nothing. A score that separates but wanders is a coin flip with a decimal point. You need both, and this was the half we were missing.

You feel the difference in the room. A partner runs a finger down the column: *why is this a 3 and that one a 7?* Before, the honest answer was a shrug — they were all bunched anyway. Now the gap is real, it traces back to evidence the judges cited, and it reads the same if you run it again. AI prepares the evaluation. You make the final call. What changed is that the evaluation finally has an opinion worth arguing with.

## Common questions

**Does a higher AI score pick the winner?** No. The `AI Total Score` is advisory. The leaderboard ranks on the human `Jury Score` you set after reading the reports and running live Q&A.

**Did you change how the score is calculated?** No. The dimensions, the routing weights, and the scoring math are all unchanged. What changed is how each judge scores under thin evidence, so the reads that feed the math stop clustering in the middle.

**Will a strong deck score lower now too?** No — that was the thing we specifically checked. Strong decks held their scores. The correction pulls up-drifted weak decks back down; it does not clip the top of the scale.

Want to see the spread on your own batch? **Book a demo**, bring decks you already have opinions about — the strong one and the borderline one — and see whether the numbers put daylight between them.
