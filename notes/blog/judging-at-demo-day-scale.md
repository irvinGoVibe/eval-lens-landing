---
slug: judging-at-demo-day-scale
category: Product
accent: aqua
title: Judging at Demo Day scale
excerpt: Accelerators accept under 13% of applicants, and for many programs the accepted ventures do not outperform the rejected ones. An organizer's playbook for judging that survives being checked.
date: 2026-05-23
readMinutes: 8
cover: /assets/blog/demo-day-scale/cover.png
author: Anonymous Unicorn
status: draft
---

Most of the work a program does is on companies it will turn down.

Accelerators in the largest research dataset select under 13% of applicants per cohort ([GALI](https://www.galidata.org/assets/report/pdf/Does%20Acceleration%20Work_EN.pdf)). So roughly 87% of the reading, scoring and arguing goes toward decisions nobody celebrates, nobody writes up, and nobody checks afterwards.

The same report contains a sentence that should make any organizer put down their coffee: for many individual programs, accepted ventures do not end up outperforming rejected ones. The dataset behind it covers 360+ programs and 23,000+ entrepreneurs across 150+ countries.

That is not an argument against running a program. It is an argument that selection quality is a real, measurable, currently-unmeasured property of one, and that the process deserves the same rigor as the curriculum.

## What a jury is actually deciding

Y Combinator states its own cutoff logic plainly on a public page: an application is rejected not because it seems particularly bad, but because there are enough others that seem particularly good, and they interview as many great teams as needed to fill the batch, then stop.

That is the honest shape of the decision at scale. Not "is this good enough," but "where does this rank against the field, given that we have twenty slots." Relative ranking under a capacity constraint.

Which puts weight in an uncomfortable place. A relative ranking is only as good as the comparability of the scores it sorts. And comparability is exactly what unstructured panels fail to produce.

## The panel problem, with numbers

The cleanest experiment on this comes from grant review. Forty-three researchers scored twenty-five real applications across four panels. Agreement between reviewers on the same application came out at an intraclass correlation of zero, confidence interval capped at 0.14 ([PNAS](https://pmc.ncbi.nlm.nih.gov/articles/PMC5866547/)). Two ratings of one application were, on average, as similar as two ratings of different applications.

These were trained, expert, motivated reviewers. The failure was structural.

Now the finding that shows where the lever actually is. At the Paris 2024 Olympics, expert judges scoring breaking landed at intraclass correlations of 0.21 to 0.45 on the subjective criteria. Judges of the same caliber scoring artistic gymnastics, a discipline with decades of anchored rubric development, reach 0.94 to 0.98 ([Frontiers in Psychology](https://pmc.ncbi.nlm.nih.gov/articles/PMC12708583/)).

Same quality of judge. Same level of event. The difference is how precisely the thing being scored was defined.

Your judges are not the problem. Your rubric is.

:::gallery
![](/assets/blog/demo-day-scale/rubric-lever.png)
:::

## What actually moves agreement, and what does not

Two studies, one positive and one negative, and the negative one is more useful.

**Calibration before scoring works, cheaply.** A randomized trial with 75 professors compared an eleven-minute training video explaining what each scale value means and what inaccurate scoring costs, against no training. Inter-rater reliability went from 0.61 to 0.89. Correct selection of scale values went from 35% to 74% ([PLOS One](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0130450)). Eleven minutes. That is less time than one extra pitch.

**Feedback after scoring does not work.** A randomized controlled trial at a Norwegian funder gave 42 reviewers either general or individualized feedback about how their scores compared to others, across two review years. Agreement did not move (p = .228). Average absolute score difference went from 2.0 to 1.8 in one group and 2.2 to 1.9 in the other ([Research Integrity and Peer Review](https://pmc.ncbi.nlm.nih.gov/articles/PMC8485516/)).

Telling judges afterwards that they disagreed changes nothing. The fix has to be upstream of the scoring.

And the same study hands you the mechanism. Inside it, agreement on the *eligibility* question, which is binary and observable, ran at 0.83 rising to 0.93. Agreement on the *quality* question, which is holistic, sat at 0.30 to 0.40. Identical reviewers, identical applications, wildly different reliability, decided entirely by how checkable the question was.

That gives every organizer a concrete rewriting rule: **convert judgment questions into evidence questions wherever the rubric allows.** Not "how strong is traction," which reliably produces disagreement, but "is there a named customer with a stated contract value in the deck," which reliably produces agreement. Keep the holistic judgment for where it belongs, and shrink its share of the score.

## The organizer's playbook

**1. Write the rubric as checkable items, then anchor every scale value.** For each criterion, write out what a 3 looks like versus a 7, in observable terms. This is the step that separates gymnastics from breaking. Do it before applications open.

**2. Spend eleven minutes calibrating the panel.** A short recorded walkthrough of the anchored rubric, sent to every judge before they score anything. The research says it nearly halves disagreement, and it is the cheapest intervention available to you.

**3. Do the arithmetic on judge capacity before you promise anything.** Live judging has a formula, from the MLH organizer guide: judges needed = (projects × rounds × minutes per project) ÷ minutes available. Their science-fair format budgets 4 minutes per project per judge, 3 rounds per project. Sixty finalists at 3 rounds is 720 judge-minutes, which is twelve judges working a solid hour with no breaks and no drift. Run this number honestly and most Demo Day judging plans turn out to be short by half.

**4. Blind the first pass where you can.** A three-year journal trial found that under single-anonymous review outcomes depended on author demographics, with higher ratings for authors in higher-income and higher-English-proficiency countries, and that double-anonymous review removed that dependence ([Functional Ecology](https://besjournals.onlinelibrary.wiley.com/doi/full/10.1111/1365-2435.14259)). Honest caveat: the same trial found blinding did not close the gender gap, and reviewers often guess identities anyway. It is a partial fix worth taking, not absolution.

**5. Score everything against the rubric before anyone ranks anything.** Every submission read on identical terms, cold, with per-criterion scores tied to what was actually in the material. Then rank the field once, in a single sitting, when all the scores exist. This is where our six independent judges do the first pass and the organizer does the ranking; the shape works with volunteers and a scoring sheet too, it just costs more evenings.

**6. Surface the disagreements instead of averaging them.** When two independent reads on the same submission land far apart, that gap is information about a genuinely contested application. Our threshold is a spread of 3.0 points or more, which flags the entry for human attention rather than smoothing it into a mean. A panel that only ever reports averages is throwing away its most useful signal.

:::gallery
![](/assets/blog/demo-day-scale/judge-math.png)
:::

## The 87% deserve an answer

Back to where we started. Most of your program's work is on the applicants you reject, and most programs tell them almost nothing.

YC's public position is that there is no useful answer to give. Techstars has said other applications were simply more interesting. Both are honest, and both are what you say when the reasons were never written down in a comparable form.

Now look at how NIH handles the same volume problem: written critiques and criterion-level scores go back to every applicant, including applications that were never discussed at the panel. Same scale, same reviewer scarcity, opposite default.

The difference is not generosity. It is that criterion-level scoring produces feedback as a byproduct. If your judges scored against anchored criteria with evidence attached, the rejection letter is already written; you are just choosing whether to send it. If they scored holistically in their heads, there is nothing to send, which is precisely why the answer becomes "there's no answer."

A program that can tell an applicant why is a program that can tell its own board why. Those are the same artifact.

## Common questions

**How do you judge hundreds of accelerator applications fairly?** Score every application against an anchored rubric before any ranking happens, calibrate the panel first, and rank the whole field once at the end. Fairness at scale is a property of comparable scores, not of individual judge quality: expert reviewers scoring the same applications without structure have measured zero agreement.

**How many judges do I need for Demo Day?** Multiply projects by judging rounds by minutes per project, then divide by the minutes each judge is actually available. Using the MLH format of 4 minutes per project and 3 rounds, sixty finalists needs about 720 judge-minutes, which is twelve judges for an hour. Most plans underestimate this by roughly half.

**How can I improve agreement between judges?** Calibrate before scoring, not after. An eleven-minute training video on what each scale value means raised inter-rater reliability from 0.61 to 0.89 in a randomized trial, while post-hoc feedback about disagreement produced no measurable improvement.

**What should I tell rejected applicants?** The criterion-level scores you already have, with the evidence behind them. Programs that cannot answer this usually scored holistically, which leaves nothing to report. NIH returns written critiques to every applicant at national scale, including ones never discussed at panel.

Your next cohort will be selected either way. The question is whether, six months from now, you can reconstruct why company nineteen made it and company twenty did not. **Book a demo** and bring a past cohort, so we can check that reconstruction against the one you already made.
