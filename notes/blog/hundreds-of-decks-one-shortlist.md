---
slug: hundreds-of-decks-one-shortlist
category: Product
accent: cyan
title: Hundreds of decks, one shortlist
excerpt: Three hundred submissions at three minutes each is fifteen hours of reading before you compare anything. The fix is not reading faster. It is separating the reading from the ranking.
date: 2026-05-09
readMinutes: 8
cover: /assets/blog/hundreds-of-decks/cover.png
author: Anonymous Unicorn
status: draft
---

Do the arithmetic once and the rest of this article writes itself.

Three hundred applications. Real attention per deck runs just under three minutes, and that is the number for investors doing their actual job, not skimming ([DocSend](https://techcrunch.com/2022/09/22/science-of-pitch-decks/)). Call it fifteen hours of pure reading, spread across people who have other work, before a single comparison has been made between any two submissions.

Then the comparison itself begins. And the comparison is the part you will have to defend.

## The pile is not an anomaly

Every selection program runs a version of the same funnel, and the denominators are worse than they feel from inside.

A survey of 885 institutional investors at 681 firms found the median firm considers around 200 companies a year to close four. Per closed deal: 101 opportunities considered, one in four reaching a management meeting, roughly a third of those going to a partners meeting ([Gompers et al.](https://www.nber.org/papers/w22587)).

Accelerators sit tighter, around 1% acceptance at the top programs ([Crunchbase News](https://news.crunchbase.com/startups/accelerators-incubators-layoffs-yc-nextview/)). Grant programs run the same shape at scale: one EIC Accelerator cut-off drew 923 full applications requesting nearly €7 billion, and about 13% reached the interview stage ([European Innovation Council](https://eic.ec.europa.eu/news/strong-interest-eic-accelerator-funding-923-companies-applying-final-2025-cut-2025-10-17_en)).

Meanwhile the supply keeps rising and the attention keeps falling. DocSend measured deck volume up 16% year over year while review time per deck dropped 11% ([DocSend pre-seed report](https://www.prnewswire.com/news-releases/from-growth-at-all-costs-to-cost-of-missing-out-docsend-pre-seed-report-shows-investor-shift-to-long-term-profitability-and-risk-aversion-301908433.html)). More in, less each.

:::gallery
![](/assets/blog/hundreds-of-decks/attention-math.png)
:::

So the honest framing of the job: 99 of every 100 decisions your program makes are rejections, most of them made under time pressure, and each one belongs to a founder who will remember it.

## Three things break, and none of them are effort

Here is what goes wrong when a queue gets long. None of it is about caring less.

**Two good reviewers do not agree.** In a careful replication of the NIH process, 43 oncology researchers scored 25 real R01 applications across four panels. Agreement between reviewers on the same application came out at an intraclass correlation of zero, with a confidence interval topping out at 0.14 ([PNAS](https://pmc.ncbi.nlm.nih.gov/articles/PMC5866547/)). Two ratings of the same proposal were no more alike than ratings of different proposals. "Send it to a second partner" is not calibration. It is a second sample from a wide distribution.

**Position in the queue is a hidden criterion.** Ten years of MBA admissions data, 9,323 interviews by 31 interviewers, shows scores negatively autocorrelated within a day: a strong run of applicants earlier in the day measurably lowers the expected score of whoever comes next ([Simonsohn & Gino](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2070623)). The deck you read at 10am taxes the deck you read at 11am.

**Reviewers reverse themselves for no reason.** Across loan officers, asylum judges and umpires, decisions are negatively autocorrelated in ways unrelated to the case: loan officers are 8 percentage points less likely to approve after approving the previous application ([Chen, Moskowitz & Shue](https://academic.oup.com/qje/article/131/3/1181/2590011)). After a streak, the next applicant pays for the streak.

Notice what all three have in common. They are properties of reading and judging in the same motion, in sequence, under load. They are not fixed by hiring better people, and they get worse exactly when the pile gets big.

## The one structural move

There is a finding from selection research that has held up for decades and still surprises people.

When you take the same information and combine it mechanically, with a formula or a rubric, instead of holistically, in someone's head, prediction of actual performance improves by more than 50%. The advantage persists among experts who know the job and the organization intimately ([Kuncel et al.](https://pubmed.ncbi.nlm.nih.gov/24041118/)).

Read that carefully, because it is easy to misread as "algorithms beat humans." It says something narrower and more useful: **humans should supply the judgments; a formula should combine them.** The expert eye is doing its best work at the criterion level, on the specific question of whether this team has shipped anything real. It is doing its worst work when asked to hold nine criteria and forty comparisons in working memory at 6pm.

That is the entire design principle behind the workflow below. Separate the reading from the ranking.

## The playbook

Six steps. This is how a batch actually moves in EvalLens, but the shape works with a spreadsheet and discipline too.

**1. Fix the rubric before the first deck opens.** Decide the criteria and their weights while nobody's application is in front of you. Weights set after you have seen the field are not criteria, they are rationalizations. Keep the list short enough that every criterion earns its place.

**2. Take everything in through one door.** Scattered inboxes, drive links and forwarded attachments guarantee that submissions arrive in different shapes and get read with different care. One intake, one format, one place. Our version is the [Entry Hub](/product/entry-hub); yours can be a form. The requirement is that no submission arrives through a side channel.

**3. Read every submission against the same criteria, cold.** Not ranked, not compared. Each deck gets the identical set of questions and returns per-criterion scores with the evidence attached. This is the step that kills queue position as a hidden criterion, because nothing is being compared to its neighbors yet. In our pipeline six independent judges do this pass, each covering its own zone of the rubric and none of them seeing another's scores.

**4. Extract what the reading actually lands on.** Team, traction, product, financials. When DocSend tracked where attention moved, time on team slides rose 40% at seed and 30% at pre-seed, with traction, product and financials ahead of market and competition sections ([Dropbox DocSend](https://www.prnewswire.com/news-releases/vcs-prioritize-people-in-an-ai-heavy-landscape-according-to-new-dropbox-docsend-report-302334444.html)). Everything else is second-round material.

**5. Rank the whole batch once, at the end.** After every submission has been read on identical terms, sort the field in a single sitting. This is where a human belongs, and where the comparison finally becomes fair, because now you are comparing scores derived the same way rather than impressions formed at different hours of different days.

**6. Send back the reason, not just the verdict.** You already have per-criterion scores tied to evidence. A rejection that includes them costs almost nothing extra and changes what a founder does next.

:::gallery
![](/assets/blog/hundreds-of-decks/read-then-rank.png)
:::

Steps 3 and 5 are the load-bearing pair. Everything else is hygiene around them.

## What a ranked shortlist must not become

One honest caveat, because the failure mode here is real and it is seductive.

A study of investors adopting data tooling for pre-investment screening found they got better at avoiding failures inside the pool that resembled historical data, tilted their investing toward that pool, and became less likely to back the innovative outliers that produce rare major successes ([Bonelli](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4362173)). Structure can quietly narrow a thesis.

Two guards against it. Rank on evidence quality and criterion fit rather than resemblance to past winners; a deck should score well because it substantiates its claims, not because it looks like a company you already funded. And keep an explicit outlier lane, a small number of slots reserved for submissions a reviewer wants to advance against the ranking, with their name on the decision.

Related: structure is not a replacement for the best judge in the room. Angel investors with deep experience who managed to suppress their biases outperformed a predictive model; the ones without that combination did not ([Blohm et al.](https://journals.sagepub.com/doi/10.1177/1042258720945206)). Structure replaces the average tired reviewer on the twentieth deck of the day. That reviewer is most of the reading.

## What this gives back

Half of private capital professionals now spend 21 or more hours a week on deal research, a third of them 21 to 40 hours, and 68% expect volume to keep rising ([Affinity](https://www.affinity.co/blog/2026-private-capital-predictions)). The pile is not going to get smaller.

What changes is where those hours land. A structured first pass does not decide anything. It arrives at the meeting having already read everything on identical terms, so the room's time goes to the eight submissions worth arguing about instead of the two hundred that had to be opened to find them. We have run over 400 evaluations building that pass, and the pattern holds: the discussion starts at the disagreements rather than at slide one.

The final ranking stays where it belongs. The AI total is advisory; the leaderboard sorts on the score a person sets after reading the report. The machine's job is to make sure every submission got the same reading. Yours is to decide what that reading means.

## Common questions

**How do you screen hundreds of pitch decks fairly?** Separate reading from ranking. Score every submission against a fixed rubric before any comparison happens, then rank the entire batch in one sitting. Ranking as you read lets queue position leak into the scores: research on interview panels shows a strong run of earlier applicants measurably lowers the next applicant's score.

**How long does it take to review a pitch deck?** Real attention runs just under three minutes per deck for investors, and decks heading for a no are abandoned around the two-minute mark. At that rate 300 applications is roughly fifteen hours of reading before any comparison begins, which is why most programs quietly stop reading carefully somewhere in the pile.

**Is AI screening of applications fair?** It depends entirely on whether the process is inspectable. Fair means every submission met the same criteria, each score points to the evidence behind it, and a person owns the final ranking. AI that outputs a single unexplained number is not fairer than a tired human, just faster.

**Can software replace the judges?** No, and the research says it should not. Mechanical combination of criterion-level judgments beats holistic combination by more than 50%, but the judgments themselves come from people. The split that works: humans supply the reads, structure supplies the ordering, humans sign the decision.

Your next batch will be read either way. The only real question is whether the first hundred rejections were made the same way as the last hundred. **Book a demo** and bring a cycle you have already decided, so you can check our reading against yours.
