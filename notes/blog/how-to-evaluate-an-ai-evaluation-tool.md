---
slug: how-to-evaluate-an-ai-evaluation-tool
category: Research
accent: violet
title: How to evaluate an AI evaluation tool
excerpt: One vendor advertised 100% hallucination-free citations. Independent testing measured 17%. Here is the checklist that separates a screening tool you can defend from a number on a slide.
date: 2026-04-25
readMinutes: 8
cover: /assets/blog/how-to-evaluate-tool/cover.png
author: Anonymous Unicorn
status: draft
---

Somewhere in the demo there is a slide with a number on it. Ninety-four percent accuracy. Ninety-one percent agreement with expert reviewers. The number is large, the font is confident, and the room nods.

Nobody asks the only question that matters about it: how many times did you run this before you got that one?

That question is not cynicism. It is the entire job of buying an evaluation tool. You are not buying software that does a task. You are buying an instrument that will produce numbers you have to defend to a founder, a committee, or a regulator. An instrument you cannot check is decoration.

## Published numbers can be shopped

Start with what a benchmark score actually is.

An analysis of the most-cited public LLM leaderboard documented that a single provider can privately test many variants and publish only the winner. In the run-up to one model launch, 27 private variants went through the arena before a score went public ([The Leaderboard Illusion](https://arxiv.org/abs/2504.20879)). The same paper found data access is wildly unequal: two labs pulled roughly 20% of arena data each, while 83 open-weight models shared under 30% between them.

None of that is fraud. Every number was real. The selection was the product.

Now take the same instrument to fresh data. When Scale AI rebuilt a popular math benchmark from scratch, with matched style and difficulty but new problems, leading models dropped by up to 8%, and the drop tracked with how likely a model was to reproduce the original examples verbatim ([GSM1k](https://arxiv.org/abs/2405.00332)). Some of that "capability" was memory.

And the whole thing is more fragile than it looks. One study showed evaluation results shifting by up to 23% based on the choice of a single delimiter character, enough that you can reorder a leaderboard by editing punctuation ([arXiv](https://arxiv.org/abs/2510.05152)).

So skip the argument about the vendor's number and make it irrelevant instead: run the tool on fifty of your own past submissions, where you already know the answer.

## "Agrees with experts" needs a second number

For any judge, human or machine, the honest metric is agreement with the people it stands in for. Accuracy against some absolute truth does not exist here; there is no key at the back of the book for "was this the right shortlist."

The paper that launched this entire category found strong models matching human preferences at over 80% agreement, and stated the comparison that most vendors quietly drop: that is the same level humans reach with each other ([Zheng et al.](https://arxiv.org/abs/2306.05685)). Human agreement is the ceiling and the yardstick at once.

Which is why one number alone is a trap. Ask for two: the tool's agreement with your reviewers, and your reviewers' agreement with each other. A tool at 70% inside a team that agrees with itself 65% of the time is doing well. The same 70% in a team that agrees 90% of the time is a problem.

There is a statistical trap under this too. A 54-model study of LLM judges concluded flatly that correlation alone is insufficient, and built its ranking on Cohen's kappa against human labels instead ([Judge's Verdict](https://arxiv.org/abs/2510.09738)). Correlation only asks whether the tool moves in the same direction as your team. Kappa asks whether it lands in the same place. A judge that is consistently two points harsher than your panel correlates beautifully and will still hand you a shortlist your panel would not sign.

:::gallery
![](/assets/blog/how-to-evaluate-tool/agreement-gap.png)
:::

## Ask who is judging whom

One more thing hides in the model layer.

LLM evaluators score their own output higher than equivalent text from elsewhere, and the strength of that self-preference tracks with how well a model recognizes its own writing ([Panickssery et al.](https://arxiv.org/abs/2404.13076)). Now think about who writes the submissions you screen. Founders draft decks with the same handful of frontier models. If the tool judging those decks belongs to the same family, it is quietly rewarding its own accent.

So: which models sit on the judging side, do more than one of them vote, and are they from different families than the ones your applicants write with?

## What you must be able to show afterwards

Screening is not a private opinion. Sooner or later someone asks why.

Two hard boundaries frame this, and neither of them is our invention.

The NIH bans generative AI in grant peer review outright, on confidentiality grounds: uploading application content to an online AI tool breaches reviewer confidentiality, because there is no guarantee of where that data goes, how long it is kept, or what it later trains ([NOT-OD-23-149](https://grants.nih.gov/grants/guide/notice-files/NOT-OD-23-149.html)). Whatever your program is, that is the standard your most careful applicant will assume you are holding.

And Article 86 of the EU AI Act gives a person affected by a significant AI-assisted decision the right to obtain clear and meaningful explanations of the role the system played and the main elements of the decision ([EU AI Act](https://artificialintelligenceact.eu/article/86/)). A score with no traceable reason chain does not satisfy that. Neither does a paragraph of confident prose.

The practical test is small and brutal: pick one rejected submission and try to reconstruct why. If every claim in the report links back to a specific page or slide in the document that was submitted, you have an audit trail. If the report reads like a summary of a document nobody can point to, you have a liability.

Which brings up the failure that actually happens in the wild. It is rarely a wrong score. It is an invented one. Deloitte Australia delivered a A$440,000 government report containing references to research papers that did not exist and a fabricated quote attributed to a federal court judgment; the firm confirmed generative AI was used and partially refunded the contract ([OECD AI Incidents](https://oecd.ai/en/incidents/2025-10-05-be45)). Nothing looked broken. It looked excellent, right up until someone clicked a citation.

## Test the claim, not the claimant

The sharpest data point for a buyer is what happened when someone finally checked a vendor's marketing.

One legal research provider advertised "100% hallucination-free linked legal citations." The first preregistered independent evaluation, 202 queries hand-scored by experts, measured hallucination rates of 17% for that product and 33% for a competitor ([Stanford RegLab](https://reglab.stanford.edu/publications/hallucination-free-assessing-the-reliability-of-leading-ai-legal-research-tools/)).

The lesson is not that these are bad products. It is that "we don't hallucinate" is a claim, claims are testable, and the person with the budget is the one who has to test it.

There is a market-wide version of this too: the SEC's first AI-washing settlements landed in March 2024, with two advisers paying $225,000 and $175,000 over statements about AI capabilities they did not have ([SEC](https://www.sec.gov/newsroom/press-releases/2024-36)). Regulators now treat the landing page as a claim. So should you.

## The buyer's checklist

Eleven questions. Send them before the demo, not after.

**On the number**
1. How many configurations did you run before publishing this figure, and did you publish all of them?
2. What is that number on data the model has never seen? Can you run it on fifty of my past submissions, blind?
3. Is your scoring prompt frozen and versioned? If it changes between my pilot and production, what happens to comparability?

**On agreement**
4. What is your agreement with human reviewers, measured as Cohen's kappa, on what sample size?
5. What is those humans' agreement with each other on the same sample?
6. Which models do the judging, how many of them vote, and are they from different families?

**On the record**
7. Take one rejected submission: show me every claim in the report linked to the page it came from.
8. Same input, next week: same score? Show me the run log.
9. Where does my applicant's document physically go, is it retained, and is it ever used for training?

**On the relationship**
10. If you shut down tomorrow, do I keep my scored history and my rubric?
11. Does your contract warrant the accuracy figures on your website?

Question 11 is the one that changes the temperature of a sales call. A vendor who will not put a marketing number into a contract has just told you what the marketing number is.

:::gallery
![](/assets/blog/how-to-evaluate-tool/vendor-questions.png)
:::

## Our own answers, since we are asking

It would be strange to publish this checklist and dodge it.

EvalLens does not publish a single accuracy number, because the honest version of that number is per-program: it depends on your rubric and your reviewers. What we do instead is run the comparison in the open, on your decks, against decisions you have already made, so the agreement figure you get is measured on your data rather than ours.

Every score is bound to the evidence: each claim in a report points back to the passage in the deck it came from, which is what makes question 7 answerable. The scoring itself is deterministic, so the same inputs produce the same number on re-runs, which is question 8. The reading is done by six independent judges rather than a single model, which is question 6, and we have run over 400 evaluations building that panel. Documents are not used to train models. And the ranking is not ours to make: the AI total stays advisory, and the leaderboard sorts on the human score a person signs.

If that sounds like a lot of hedging for a company selling AI evaluation, that is the point. The methodology is on [Methodology](/trust/methodology), the reproducibility argument is on [Consistency & reliability](/trust/consistency-reliability), and the data handling is on [Security & privacy](/trust/security-privacy). Read them like a buyer.

## Common questions

**How do I know if an AI screening tool actually works?** Test it on your own past decisions rather than trusting a published benchmark. Take fifty submissions you already ranked, run them blind, and compare. Public accuracy numbers can be selected from many private attempts and tend to drop on fresh data, so the only figure that means anything is the one measured on your material.

**What accuracy should an AI evaluation tool have?** The wrong question. Ask for agreement with your reviewers measured as Cohen's kappa, alongside your reviewers' agreement with each other. Human-to-human agreement is the realistic ceiling, and a tool that correlates well can still sit systematically harsher or softer than your panel.

**Is it safe to upload confidential pitch decks to an AI tool?** Only if you can answer three things: where the document is stored, how long it is retained, and whether it is ever used to train models. The NIH bans generative AI in grant peer review specifically because those answers are usually unavailable, and confidential submissions deserve the same standard.

**What questions should I ask an AI vendor before buying?** Start with the eleven above: how the published number was produced, agreement measured as kappa against a human baseline, per-claim traceability on a rejected submission, reproducibility on re-runs, data retention and training use, exit terms for your history and rubric, and whether the contract warrants the marketing figures.

A tool that survives this list is not necessarily the smartest one on the market. It is the one whose output you can put in front of a disappointed founder, a skeptical partner, or an auditor, and walk through line by line. That is the whole product. **Book a demo** and bring the batch you already argued about.
