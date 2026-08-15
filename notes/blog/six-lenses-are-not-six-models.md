---
slug: six-lenses-are-not-six-models
category: Research
accent: cyan
title: Six lenses are not six models
excerpt: New research says AI reviewers overlap with each other in 21% of cases, versus 3% for humans. That number is aimed straight at products like ours. Here is why we quote it anyway, and how to tell a real panel from one judge in six costumes.
date: 2026-08-07
readMinutes: 7
cover: /assets/blog/six-lenses/cover.png
author: Anonymous Unicorn
status: published
---

Ask for a second opinion on a scary diagnosis and you have exactly one requirement: a different doctor. Not your doctor's med school roommate, who trained on the same wards, reads the same journal, and reveres the same textbook. The roommate will be confident, articulate, and nearly useless, because he shares every habit that produced the first opinion.

A lot of the AI evaluation market is currently selling roommates.

## The panel idea was right

In 2024, researchers at Cohere published the result that reshaped how evaluation tools get built. A Panel of LLM evaluators, several smaller models drawn from different families, tracked human judgment more closely than a single large judge, carried less intra-model bias, and cost a fraction as much ([arXiv](https://arxiv.org/abs/2404.18796)). The finding landed because the single-judge problem was already well documented: the CALM framework had catalogued twelve systematic bias types in one-model setups, from position to verbosity to authority effects ([arXiv](https://arxiv.org/abs/2410.02736)). We walked through that evidence in [The bias hiding in a single AI judge](/blog/the-bias-in-a-single-ai-judge).

Then the market compressed the research into a slogan: more models, better scores. Screening tools now advertise their model count the way blenders advertise horsepower. Three models. Five models. Nine.

The count was never the point.

## The number that should worry every panel vendor

This year a research group put the slogan under a microscope. Forty-five experts examined AI-written reviews of papers from Nature-family journals and graded them for correctness. The best AI reviewer got 86.2% of its claims right, against 92.3% for the strongest human reviewers. Close race. Then came the finding that actually matters: the AI reviewers overlapped with one another in 21% of cases. The human reviewers overlapped in 3% ([arXiv](https://arxiv.org/html/2605.20668v1)).

Sit with that gap. Seven times more overlap means that a stack of AI reviewers is much closer to one opinion, restated with different wording, than a room of humans ever is. Nominally you hired a committee. Functionally you photocopied a memo.

We build a product around six AI judges, so this is the most uncomfortable number anyone has published about our category. We quote it anyway, because the study is not an argument against panels. It is an argument against fake ones.

## Why models agree: they carpooled

The mechanism has a name now. A May 2026 analysis titled "Nine Judges, Two Effective Votes" showed that when panel members share training data or a model family, their errors correlate, and nine nominal judges collapse into roughly two independent opinions ([arXiv](https://arxiv.org/pdf/2605.29800)). The votes exist on paper. The opinions behind them mostly do not.

Two forces drive the collapse. First, shared habits: every copy of a model inherits the same catalogue of biases, so duplicating the model duplicates the blind spots along with the strengths ([arXiv](https://arxiv.org/abs/2410.02736)). Second, shared taste: models measurably prefer text that feels familiar to them, scoring writing that resembles their own output higher regardless of quality ([arXiv](https://arxiv.org/abs/2410.21819)). Feed the same document to six instances of the same judge and they will like the same paragraphs for the same reasons and miss the same hole on slide nine.

Run one model six times with six prompt personas and you have not convened a panel. You have hired one judge and six costumes. The roommate problem, at industrial scale.

:::gallery
![](/assets/blog/six-lenses/overlap-gap.png)
:::

## What independence actually requires

We learned this the slow way, on our own product. The early version of EvalLens kept adding judges on the theory that reliability would climb with headcount. Across what is now 1,000+ evaluation runs, it did not. Reliability moved when the methodology moved, and the full story of that redesign is in [From AI Jury to EvalLens](/blog/from-ai-jury-to-evallense).

What came out of it are three structural choices, and none of them is "more models."

**Different roles.** Each of the six judges reads the deck as a different kind of reader, with its own role and its own focus. A judge asking "would this survive diligence" and a judge asking "is this problem real for a paying customer" are looking for different evidence, so they fail differently. Uncorrelated failure is the whole prize.

**Different zones of the rubric.** No judge scores everything. Each one owns its zone of a fixed rubric, so a shared stylistic preference cannot quietly leak into all six numbers at once. The rubric stays identical across the whole batch: every deck meets the same six readings in the same six ways.

**Isolation.** The judges run in parallel and never see each other's scores. No anchoring, no bandwagon, no polite convergence toward whoever spoke first. Sequential scoring, where each judge can peek at the previous verdict, manufactures agreement and then presents it as confidence.

Independence, in other words, is not a purchasing decision. It is an architecture, and the details live on [our methodology page](/trust/methodology).

## Disagreement is the receipt

Here is the test most buyers never think to run: a panel that never disagrees was never a panel.

Independent readers with different roles and different evidence will, on some submissions, land far apart. Averaging that split into a tidy mean would destroy the strongest signal the system produces. EvalLens measures it instead, as Spread: when the six judges split on a deck by 3.0 points or more, the deck gets flagged for human attention, because a genuine conflict between independent readers is exactly where a person's judgment earns the most.

Spread does double duty. For the organizer, it routes attention. For anyone auditing the system, it is the receipt that the six opinions are actually six. A vendor whose judges agree 99% of the time is not demonstrating precision. That vendor is demonstrating correlation, and the 21% overlap study shows what correlation looks like when someone finally checks.

And the verdict never belongs to the machines. The AI Total Score stays advisory; the ranking runs on the Jury Score a human sets after reading the evidence. Six lenses make the analysis harder to bias. Only a person can own the call.

:::gallery
![](/assets/blog/six-lenses/three-tests.png)
:::

## Three tests for any ensemble

Shopping for a multi-judge screening tool, or auditing the one you have? Three questions, one afternoon.

1. **The pedigree test.** Ask what makes the judges different from each other. If the answer is a list of prompts, you are looking at costumes. Real answers name structural differences: roles, rubric zones, evidence requirements, model families. Then ask the harder follow-up: how would you detect it if two judges became redundant?
2. **The unanimity test.** Run twenty of your own past submissions and count how often the judges meaningfully split. Near-zero disagreement on varied real-world input is a red flag, not a feature. Humans reviewing the same material overlap around 3% of the time; an ensemble that always agrees is telling you its votes are copies.
3. **The blindfold test.** Ask whether any judge can see another judge's output before scoring. If yes, the later scores are anchored to the earlier ones, and the panel is a queue wearing a panel's name.

A tool that fails all three can still be useful, the way one quick opinion is useful. Just price it as one opinion.

## Common questions

**Is a panel of AI models better than a single AI judge?** Yes, when the panel is real. Research shows a panel of evaluators from different model families tracks human judgment better than a single large judge and carries less bias. The benefit disappears when panel members are correlated: judges sharing training data or a family make the same errors, so their votes collapse into far fewer effective opinions.

**Why do AI reviewers agree with each other so much?** Because they share habits and taste. Models inherit the same catalogued biases across copies, and they prefer text resembling their own output. A 2026 study of AI-written reviews of Nature-family papers found AI reviewers overlapped in 21% of cases versus 3% for human reviewers, meaning many AI votes restate one underlying opinion.

**What makes AI judges independent in an evaluation panel?** Structure, not headcount. Independent judges have different roles, score different zones of a fixed rubric, and never see each other's outputs while scoring. Independence then has to be verified in the results: genuinely independent judges will visibly disagree on some share of real submissions.

**How does EvalLens keep its six judges from being six copies?** Each judge has its own role and its own zone of one fixed rubric, and all six run in parallel without seeing each other's scores. Disagreement is measured rather than averaged away: a split of 3.0 points or more flags the deck for human review, and the final ranking always comes from the human Jury Score.

The next tool that tells you "we use six models" deserves one question back: would any of them notice if the other five were wrong? **Book a demo** and watch six judges that actually disagree, in the open.
