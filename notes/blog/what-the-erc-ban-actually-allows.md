---
slug: what-the-erc-ban-actually-allows
category: Research
accent: orange
title: What the ERC ban actually allows
excerpt: Every newsletter reran the headline that reviewers may not use AI. Almost nobody answered the organizer's next question. Here is the working boundary between administration you can automate and evaluation you cannot delegate.
date: 2026-08-15
readMinutes: 7
cover: /assets/blog/erc-ban-allows/cover.png
author: Anonymous Unicorn
status: draft
---

On March 24, 2026, the European Research Council published a clarification on AI in grant evaluation, and within a week every research-adjacent newsletter had run some version of the same headline: reviewers banned from using AI. Somewhere in a funding agency, a program manager read it, looked at the intake automation her team spent a year building, and forwarded the link upstairs with one line: so do we turn everything off?

The coverage answered a question nobody was asking. Whether AI can be banned from something was settled the moment the PDF went up. The question that actually lands on an organizer's desk is the next one: what, exactly, is still allowed?

That question has a workable answer. It just requires reading the rules instead of the headlines.

## Two rules, two different logics

Start with what the [ERC guidance](https://erc.europa.eu/news-events/news/erc-clarifies-limits-ai-use-grant-evaluation) actually says. Reviewers may not use AI to summarize proposals, to assess scientific merit, or to prepare draft assessments. They also may not upload any part of a proposal into external AI systems. What remains permitted is narrow: polishing the language of their own report, and general background searches that pass no proposal content to the tool.

Now put it next to the other famous rule, which arrived three years earlier. The NIH's [NOT-OD-23-149](https://grants.nih.gov/grants/guide/notice-files/NOT-OD-23-149.html) prohibits peer reviewers from using generative AI to analyze applications or formulate critiques, and its stated rationale is confidentiality: uploading application content to an online AI tool breaches the reviewer's confidentiality agreement, because nobody can guarantee where that data is sent, stored, or later used. Breach carries real teeth, up to termination of reviewer service and debarment.

The two rules get lumped together as "the AI ban," and lumping them together is how organizers end up confused. They forbid different things for different reasons.

The ERC rule is about judgment. Assessing merit is the one task a funder cannot delegate to a machine, even a perfectly secure one running in the agency's own basement. The NIH rule is about custody. Confidential content may not leave controlled infrastructure, even for a task that involves no judgment at all. Two fences, around two different fields. An operation can clear one fence and still hit the other: a locally hosted model drafting a review violates the ERC's logic while satisfying the NIH's, and pasting a proposal into a chatbot to fix your own grammar does the reverse.

Once you see the two fences, the map of what is allowed draws itself.

:::gallery
![](/assets/blog/erc-ban-allows/two-fences.png)
:::

## Administration versus evaluation, operation by operation

The boundary that survives both rules is the line between administration and evaluation. Administration covers operations that establish facts about a submission: is it complete, is it eligible, where should it go, what happened to it. Evaluation is the act of judging its merit. The first is process. The second is the decision the whole program exists to make, and the person making it has to own it.

Here is how the common operations sort, under ERC-style rules and with content kept on infrastructure your confidentiality obligations permit:

| Operation | Which side of the line | Status |
|---|---|---|
| Extracting submission data into structured fields | Administration | Workable |
| Completeness checks: missing budget, missing section, broken file | Administration | Workable |
| Eligibility screening against published, objective criteria | Administration | Workable, until a criterion requires judgment |
| Routing submissions to reviewers by topic or conflict rules | Administration | Workable |
| Decision logs and audit records | Administration | Workable, and increasingly expected |
| Summarizing a proposal for a reviewer | Evaluation-adjacent | Named by the ERC as off limits |
| Drafting assessment text | Evaluation | Off limits |
| Scoring merit | Evaluation | Off limits |
| Uploading proposal content to an external AI tool | Either | Off limits under ERC, and a confidentiality breach under NIH-style rules |

One honest caveat about scope. The ERC document governs its own reviewers, and your program is bound by its own funder's rules, procurement terms, and confidentiality agreements. The table is a map of the reasoning, not a legal opinion: a place to start the conversation with whoever owns compliance at your organization. The [erc-ai-guidelines glossary entry](/glossary/erc-ai-guidelines) tracks how the underlying documents evolve.

Notice what the eligibility row admits: the line can go gray. "Submitted before the deadline" is administration. "Demonstrates sufficient innovation potential to qualify" is evaluation wearing an eligibility costume. When a criterion needs judgment to apply, treat it as judgment.

## Why the boundary beats the ban

If bans worked on their own, the conversation would be over. It is not going well for bans. When Nature examined the NIH's July 2025 prohibition on AI-generated review content, the assessment was blunt: rules like this are effectively [impossible to enforce](https://www.nature.com/articles/d41586-026-01422-x). Meanwhile the pressure that pushes people toward the tools keeps climbing: across 12 research funders, applications grew 57% between 2022 and 2025, with Marie Curie fellowship applications up 142%, while the share of submissions falling below the quality threshold dropped from 20% to 5% ([Times Higher Education](https://www.timeshighereducation.com/news/research-funders-flooded-ai-assisted-applications)). More applications, fewer easy rejections, same number of reviewer hours.

And underneath the enforcement problem sits the real fear, which was never accuracy. Critics of AI review keep returning to the question of [who bears responsibility](https://www.timeshighereducation.com/opinion/ai-not-peer-so-it-cant-do-peer-review) for a decision once a machine has touched it. A ban does not answer that question. A documented protocol does: this class of operations was automated, this class was decided by named humans, and here is the record showing which was which.

That is what the administration line is actually for. It is less a compliance trick than an accountability design.

:::gallery
![](/assets/blog/erc-ban-allows/boundary-map.png)
:::

## If you run a private program, the rules are yours to write

Accelerators, corporate innovation challenges, pitch competitions, private prizes: the ERC does not govern you, and neither does the NIH. That freedom is less comfortable than it sounds, because the norms are still unformed. In Candid's November 2025 survey of 529 foundations, [1% reported using generative AI to screen applications](https://candid.org/blogs/will-foundations-soon-use-ai-to-screen-grant-applications/), while 97% did not. On the other side of the desk, [67% of funders were undecided](https://candid.org/blogs/funders-insights-on-ai-generated-grant-application-proposals/) about accepting AI-written applications, and 57% did not know whether they had already received some.

A vacuum like that rewards the organizer who publishes a position early. Applicants are already asking what happens to their documents; boards are already asking who signs the decisions. And the regulatory floor is rising underneath everyone: since August 2, 2026, [Article 86 of the EU AI Act](https://artificialintelligenceact.eu/article/86/) grants people affected by decisions of certain high-risk AI systems the right to a clear explanation of the AI's role in the decision. Whether your selection program falls within its scope is a genuinely legal question, and we will not pretend to answer it. We are not lawyers, this article is not legal advice, and the correct move is to check your funder's rules and your counsel before you automate anything that touches a decision.

What we can say is where we build. EvalLens sits deliberately on both sides of the line the ERC drew, without crossing it: the platform prepares the analysis, and a human makes the call. Six independent judges read each submission against a fixed rubric, disagreement above a Spread of 3.0 gets flagged rather than averaged away, and across 1,000+ evaluation runs the final ranking has always come from the Jury Score a person sets. For an ERC-style scientific program, the automatable surface is the administration column of the table above. For a private program, it extends to evaluation support, with the judgment owned, visibly, by named humans. The full breakdown for funding programs is on [Grants and prizes](/trust/use-cases/grants-prizes).

## Common questions

**Can reviewers use AI to review grant applications?** Under ERC rules, no for anything touching judgment: reviewers may not use AI to summarize proposals, assess merit, or draft assessments, and may not upload proposal content to external AI tools. Under NIH rules, generative AI is barred from peer review on confidentiality grounds. Other funders set their own policies, so the binding answer always lives in your specific program's rules.

**What does the ERC AI guidance actually allow?** A narrow band: reviewers can use AI to polish the language of their own report and to run general background searches, provided no proposal content is passed to the tool. Everything evaluative, from summarization to scoring, stays with the human reviewer.

**What is the difference between AI-assisted administration and AI evaluation?** Administration establishes facts about a submission: completeness, eligibility against objective criteria, routing, record keeping. Evaluation judges its merit. The distinction matters because major funder rules restrict the delegation of judgment, while administrative automation is broadly workable when data custody rules are respected.

**Do ERC AI rules apply to accelerators and private competitions?** No, they bind ERC evaluations. But private programs face the same accountability question with no ready-made rulebook, and adjacent regulation such as EU AI Act Article 86 is beginning to define explanation rights around automated decisions. Publishing your own administration-versus-evaluation policy is the practical answer.

The ban made the headlines. The boundary does the work. If you want to see what a selection process looks like with the judgment kept human and everything else documented, **book a demo** and we will walk you through one.
