---
slug: when-every-application-is-good
category: Research
accent: violet
title: When every application is good
excerpt: Application volume is up 57% in three years while the share of weak submissions collapsed from 20% to 5%. The screening job quietly changed from filtering junk to separating good from good, and most processes never noticed.
date: 2026-08-11
readMinutes: 8
cover: /assets/blog/every-application-good/cover.png
author: Anonymous Unicorn
status: published
---

The debrief after a screening cycle used to have a rhythm. Half the pile was obviously out, the committee argued about the middle, and the top ten picked themselves.

This spring a program manager described a different meeting to me. Three hundred applications, and the panel could not find fifty to cut cleanly. The bottom of the pile had disappeared. Every submission had a plausible team, a coherent plan, a tidy deck with the right slides in the right order. The committee spent four hours and left less certain than when they walked in.

Here is the uncomfortable part. By every traditional measure, that was a better applicant pool than any they had ever seen. And it broke their process completely.

## The junk filter is out of a job

Screening processes were built for a world where the main work was subtraction. You built a sieve: minimum criteria, hard filters, a fast first pass to remove the half that was never going to be funded. Whatever survived the sieve got real attention, and the sieve did most of the labor.

The sieve assumed there was junk to catch. That assumption is dying, and it is dying with numbers attached.

Across 12 major research funders, application volume rose 57% between 2022 and 2025, with Marie Curie fellowship applications up 142% ([Times Higher Education](https://www.timeshighereducation.com/news/research-funders-flooded-ai-assisted-applications)). Over roughly the same window, the share of applications falling below the quality threshold dropped from about 20% in 2018 to 5% in 2025. More submissions in, and almost all of them competent.

Geraint Rees, UCL's Pro Vice-Chancellor for Research, put the consequence plainly: reviewers will soon face huge volumes of high-quality submissions and be forced into "largely arbitrary choices" ([Times Higher Education](https://www.timeshighereducation.com/news/research-funders-flooded-ai-assisted-applications)). James Wilsdon, who directs the Research on Research Institute, went further in the same piece, warning that grant funding and review systems will not survive without new strategies. Nature reached a similar conclusion days later: as AI-assisted applications improve, funders will find it harder to tell proposals apart, and they will need to keep clear rationales behind every rejection ([Nature](https://www.nature.com/articles/d41586-026-01422-x)).

The denominators were brutal before any of this. A survey of 885 institutional investors found the median firm considers around 200 companies a year to close four, roughly 101 opportunities considered per deal ([Gompers et al.](https://www.nber.org/papers/w22587)). That funnel was survivable when a sieve made the first cut. Run the same funnel on a pool where 95% of submissions clear the bar, and the sieve retires. Every single cut becomes a judgment call between fundable things.

The job changed from sieving to measuring. Sieves separate rocks from sand. When everything left in the pan is sand, you need calipers.

:::gallery
![](/assets/blog/every-application-good/sieve-to-calipers.png)
:::

## Good against good is a different sport

Telling a strong application from a weak one is easy precisely because the gap is wide. Any reasonable reviewer lands on the same side of it, on any day, in any mood. Telling a strong application from another strong application means the gap you are measuring is small. And here an ugly piece of arithmetic takes over: the differences you are trying to detect are now smaller than the noise in the instrument doing the detecting.

The noise is well documented. When 43 oncology researchers scored 25 real NIH grant applications across four panels, agreement between reviewers reading the same application came out at an intraclass correlation of zero ([PNAS](https://www.pnas.org/doi/10.1073/pnas.1714379115)). Two expert reads of the same proposal were no more alike than reads of different proposals. On a wide-gap pool that noise is survivable, because even a shaky instrument can tell a boulder from a pebble. On a narrow-gap pool, the noise becomes the ranking.

Sequence makes it worse. Ten years of MBA admissions data, 9,323 interviews, show scores negatively autocorrelated within a day: a strong run of applicants in the morning measurably lowers the expected score of whoever comes after lunch ([Simonsohn & Gino](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2070623)). In a pool where everyone is strong, every applicant sits behind a strong run. The tax lands on all of them, unevenly, based on nothing but queue order.

One honest caveat before the next section. If your pool is thirty applications and your gaps are still wide, none of this bites yet, and a disciplined committee with a shared spreadsheet is a fine instrument. This article is about what happens past the point where volume is high and quality has converged, because the data says most programs are heading there whether they plan to or not.

So the committee in my opening scene was not failing. Their tools were. They were asked to make caliper-grade distinctions with a sieve, in sequence, at 6pm. "Largely arbitrary" is exactly what that setup produces. Nobody chooses arbitrary. Arbitrary is what happens when the differences are real but the process cannot resolve them.

## What separates good from good

If polish no longer separates the pile, something else has to. Three moves do most of the work. None of them require AI, for the record. They require discipline; tooling just makes the discipline cheap enough to survive contact with 300 applications.

**Score evidence, not polish.** In a uniformly polished pool, polish carries no information. What still varies is substantiation: whether the claimed traction has numbers behind it, whether the named customer appears anywhere besides the logo slide, whether the plan's assumptions survive its own appendix. A useful screening pass reads for what each claim would cost to fake, and pins every score to the passage that earned it. That is the difference between "strong team, 8" and "8: two prior exits in the same category, slide 4." The first is an impression. The second is checkable, which is what makes it [usable when someone disputes the outcome](/trust/use-cases).

**Fix the rubric before you see the field.** Criteria and weights decided after you have seen the applications are not criteria. They are rationalizations with a spreadsheet attached. A fixed rubric does not make the choices for you; it guarantees that submission #14 and submission #214 were asked the same questions, which is the minimum condition for calling a comparison between them fair. The full read-then-rank mechanics are in [Hundreds of decks, one shortlist](/blog/hundreds-of-decks-one-shortlist), so I will not repeat them here.

**Treat disagreement as data.** This is the move most processes miss. When multiple independent reads of the same application diverge, that divergence is not a malfunction to average away quietly. It is the most useful number the process produces: a flag that says this one is contested, spend the room's time here. In EvalLens, every submission is read by 6 independent judges against the same rubric, and when their scores diverge past a threshold, a Spread of 3.0 or more, the report says so out loud. [Consistency where the pool agrees, a visible flag where it does not](/trust/consistency-reliability). The flag does not resolve the argument. It locates it.

:::gallery
![](/assets/blog/every-application-good/spread-flag.png)
:::

Across 1,000+ runs the pattern holds: most of a good pool clusters, and the committee's real work hides in the flagged residue. The point of structure is to find that residue before the meeting starts, instead of discovering it at 6pm inside the meeting, by which time nobody is measuring anything.

The ranking itself stays human. The machine's job is to make sure every application got the same reading and every score points at its evidence. A person decides what the reading means, and signs it. When a rejected applicant asks why #212 lost to #14, "here are the criteria, the evidence, and the judgment" is an answer. "The panel felt" no longer is, not in a pool where the panel would feel differently on Tuesday.

## Common questions

**Why is it harder to screen grant and startup applications now?** Volume rose while quality converged. Twelve major research funders saw applications grow 57% between 2022 and 2025, and the share of submissions below the quality threshold fell from about 20% to 5%. The old first pass, filtering out obvious junk, has almost nothing left to filter, so every cut is now a fine judgment between competent applications.

**How do you choose between applications that are all good?** Stop comparing overall impressions and compare evidence per criterion. Fix a rubric before reading, score each application against it independently, pin each score to the specific passage that earned it, and rank the whole batch once at the end. When independent reads of the same application disagree sharply, treat that as the signal for where committee discussion belongs.

**Why do expert reviewers disagree so much on the same application?** Measured agreement between qualified reviewers reading the identical grant application is close to zero, an intraclass correlation of 0 in a careful NIH replication. On top of that, queue position shifts scores: a strong run of earlier applicants lowers the next one's expected score. Neither effect means reviewers are careless; both mean unstructured reading is a noisy instrument.

**Does AI make screening high-quality applications fairer?** Only if the process around it is inspectable. Fair means every application met the same criteria, every score traces to evidence in the submission, disagreement between independent reads is surfaced rather than averaged away, and a named person owns the final ranking. An AI that outputs one unexplained number adds speed, not fairness.

Your next cycle will likely be the best pool you have ever rejected most of. If the last one ended with forty defensible finalists and twelve slots, **book a demo** and bring that pool with you. Calipers are easier to judge when they are measuring your own sand.
