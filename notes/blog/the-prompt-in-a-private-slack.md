---
slug: the-prompt-in-a-private-slack
category: Research
accent: orange
title: The prompt in a private Slack
excerpt: 85% of dealmakers use AI daily, and most of that screening runs through an unnamed prompt someone pastes decks into. It is fast, free, and unaccountable. Here is what the convenience actually costs.
date: 2026-08-03
readMinutes: 7
cover: /assets/blog/private-slack-prompt/cover.png
author: Anonymous Unicorn
status: published
---

Monday pipeline meeting. A partner points at a deck on the screen and asks a reasonable question: why did this one advance?

The associate has an answer, sort of. The screen liked it. Which screen? A prompt that lives in a private Slack channel, where inbound decks get pasted in and verdicts get pasted out. The thread has since scrolled away. The prompt has been tweaked twice since that deck went through. Nobody wrote down which model read it.

The fund's first investment gate has no address, no version number, and no memory. And it is winning. Not against another product; against every structured screening process on the market, including ours. If you sell structure for a living, that prompt, and no rival vendor, is your real competitor.

## Why the prompt won, honestly

Start by giving the prompt its due, because pretending it is bad at its job convinces nobody who has used it.

85% of dealmakers now use AI daily, per an Affinity survey of about 300 professionals, while only around 12% of institutional funds have AI screening running as a production system ([Development Corporate](https://developmentcorporate.com/corporate-development/ai-startup-screening-how-vcs-use-chatgpt-to-filter-pre-seed-deals/)). The distance between those two numbers is the private prompt. At smaller funds it is often the GP personally, dropping an inbound deck into a chat window with a standing prompt.

And of course they do. The prompt reads a 20-slide deck in seconds. It costs nothing beyond a subscription that already exists. There is no procurement, no onboarding call, no rubric workshop. It never complains about volume and never asks for carry. It is the fastest analyst the fund never hired.

The prompt deserves its market share on convenience. What it does not deserve is the trust currently being extended to it, because the convenience is billed separately. Three invoices, all invisible until someone asks a hard question.

:::gallery
![](/assets/blog/private-slack-prompt/three-invoices.png)
:::

## Invoice one: the same deck returns a different verdict

Run the identical submission through the identical prompt twice and you are not guaranteed the same answer. One documented test fed the same essay and the same rubric to a model three times and measured score variation of up to 60% between runs ([MarkInMinutes](https://www.markinminutes.com/blog/why-you-cant-use-chatgpt-for-grading)). Vendor source, but the test is described plainly enough to rerun yourself, and anyone who has pasted the same document twice has seen a smaller version of it.

Switch models and it gets stranger: different models render systematically different verdicts on identical decks ([Development Corporate](https://developmentcorporate.com/corporate-development/ai-startup-screening-how-vcs-use-chatgpt-to-filter-pre-seed-deals/)). So the score depends on which tool the associate had open, on what day, on which silent model update had shipped. A score you cannot reproduce is not a measurement. It is a dice roll wearing confident prose.

I wrote about the fix at length in [Same deck, same score](/blog/same-deck-same-score); the short version is that reproducibility has to be engineered in, and a chat window does not engineer it in.

## Invoice two: evidence that is not there

The second invoice is worse than randomness, because it looks like diligence.

The same grading test found justifications that gestured at quality without citing anything, and feedback referencing content that did not exist in the submitted work. This failure mode has a public track record in higher-stakes rooms. Stanford RegLab tested commercial legal research tools marketed with claims of hallucination-free citations and measured hallucination rates of 17% and 33% ([Stanford RegLab](https://reglab.stanford.edu/publications/hallucination-free-assessing-the-reliability-of-leading-ai-legal-research-tools/)). Deloitte Australia partially refunded an A$440,000 government contract after academics found its AI-assisted report contained references to research that did not exist and a fabricated quote from a court judgment ([OECD.AI](https://oecd.ai/en/incidents/2025-10-05-be45)).

Those were reviewed documents with named authors, and the fabrications shipped anyway. A screening verdict pasted into a chat channel receives less review than either. When the verdict says "strong traction, growing enterprise pipeline," nobody checks whether the pipeline appears anywhere in the deck. The verdict sounds like reading. Sometimes it is invention.

## Invoice three: no trail

The third invoice arrives last and costs the most, because it arrives in front of other people.

An LP asks how the fund screens inbound. A founder disputes a rejection. A regulator, someday, asks how an automated system participated in a decision. The honest answer, for the private-prompt workflow, is that there is no answer. The prompt was edited without a changelog. The threads are scattered or gone. There is no record of which decks got the careful prompt and which got the quick one, no per-criterion scores, no way to show two decks were judged by the same standard, because there was no standard, there was a vibe with an API.

The Development Corporate piece lands the verdict on funds that cannot produce calibration data for their screening: they are running "an unaudited model with fund-returner-sized error bars" ([Development Corporate](https://developmentcorporate.com/corporate-development/ai-startup-screening-how-vcs-use-chatgpt-to-filter-pre-seed-deals/)). The scary part of an unaudited gate is less the bad deals it lets through than the good ones it silently kills, with no log to ever discover which.

## Same models, different discipline

Here is the part vendors tend to mumble, so I will say it clearly: a structured screening layer often runs on the same underlying models as the Slack prompt. The intelligence is not the difference. The discipline around the intelligence is the difference, and it comes in four pieces.

**A fixed, versioned rubric.** Every submission is asked the same questions, and the questions are written down before any deck is read. Change the rubric and the change has a date on it.

**Evidence anchoring.** Every score points to the passage or slide that earned it, and evidence that is missing is recorded as missing rather than paraphrased into existence. A claim that cannot be traced back into the submission does not ship.

**Deterministic aggregation.** In EvalLens, 6 independent judges read each submission against their zones of the rubric, and the path from their scores to the final number is pure math, no model in the loop. Same inputs, same output, every run. When the judges diverge past a Spread of 3.0, the report flags it instead of averaging it into false calm.

**A human signature.** The AI total is advisory. A person reads the report, sets the final score, and puts their name on the decision. Across 1,000+ runs, that has been the constant: the machine standardizes the reading, a human owns the verdict.

:::gallery
![](/assets/blog/private-slack-prompt/prompt-vs-process.png)
:::

None of this makes the model smarter than the one in the Slack channel. It makes the output defensible, which is the property the prompt cannot fake. If you are comparing options in this category, the buyer's checklist in [How to evaluate an AI evaluation tool](/blog/how-to-evaluate-an-ai-evaluation-tool) applies to us as much as to anyone, and if your current stack is forms plus spreadsheets plus a chat window, [the side-by-side is here](/compare/spreadsheet).

## If you keep the prompt anyway

Some readers will close this tab and keep the Slack channel, and for low-stakes triage that can be a defensible call. If so, three rules cut the invoices down.

**1. Freeze and log it.** Put the prompt in a document with a version number. Every pasted verdict gets a one-line header: prompt version, model, date. Ten seconds of typing buys you a primitive audit trail.

**2. Ban unsourced claims.** Add one instruction: every claim must quote the deck and name the slide, and anything the model cannot locate must be listed as not found. Then spot-check. The first fabricated quote you catch will recalibrate how much you trust the rest.

**3. Run it twice, and never let it say no alone.** If two runs disagree materially, the score is noise; treat it accordingly. And route every rejection through a human who owns it, because "the prompt passed on it" is not a sentence anyone should have to say to a partner, an LP, or a founder.

That turns the ghost in the channel into something closer to a logged intern. Still not a process. But no longer a secret.

## Common questions

**Can I use ChatGPT to screen pitch decks?** As a reading aid, yes, and most dealmakers already do: 85% report daily AI use. As a decision gate, it fails on three governance counts: the same deck can score differently between runs, justifications can cite evidence that is not in the deck, and nothing is logged. If a score influences who advances, add a fixed rubric, evidence citations, run logging, and a human sign-off, or use a system that has them built in.

**Why does ChatGPT give a different score for the same document?** Model outputs are not deterministic by default, small prompt and formatting changes shift results, and providers update models silently. Measured drift reaches 60% score variation on an identical submission and rubric. The reliable fix is architectural: collect judgments in a structured form and compute the final score with deterministic math outside the model.

**Do AI tools make up evidence when evaluating documents?** Yes, and it is documented in high-stakes settings. Independent testing measured 17% and 33% hallucination rates in legal research tools marketed as hallucination-free, and a major consultancy partially refunded a government report over fabricated references. The defense is evidence anchoring: every claim must point to a specific passage in the source, and missing evidence must be recorded as missing.

**What should replace an ad-hoc AI screening prompt?** Not a bigger model. A process: a rubric fixed before reading, multiple independent judgments per submission, deterministic aggregation from judgments to score, disagreement surfaced instead of averaged, and a named human making the final call. The models can stay the same; the accountability is the upgrade.

The partner's question from the first paragraph is coming for every fund and every program that screens with a hidden prompt. When it arrives, the difference between a chat thread and a process is the difference between an apology and an answer. **Book a demo**, bring a deck your prompt already scored, and run it through both. Twice.
