# Research: "Judging at Demo Day scale: an organizer's playbook"

Article publish date (backdated): **2026-05-23**
Research compiled: 2026-08-15
Audience: accelerator / pitch-competition organizers

## Chronology rule applied

Every source below is published **on or before May 2026**. Sources found during research but
rejected for being too recent are listed at the bottom under "Rejected (too recent)".

---

## 1. Market scale: how many programs, how many applications

### Fact 1.1 — Accelerators pick fewer than 1 in 8 applicants, on average

> "on average, programs in the GALI dataset select fewer than 13% of applicants per cohort"

- Source: *Does Acceleration Work? Five years of evidence from the Global Accelerator Learning Initiative*, ANDE / Emory University (GALI)
- URL: https://www.galidata.org/assets/report/pdf/Does%20Acceleration%20Work_EN.pdf
- **Published: May 2021**
- Use in playbook: this is the baseline number for "why judging load is brutal". A 13% selection
  rate means ~87% of the work a program does is on companies it will reject. Frame the playbook as
  "designing the process for the 87%, not just the 13%".

### Fact 1.2 — The dataset behind that number: 360+ programs, 23,000+ applicants, 150+ countries

> "Between 2013 – 2020, Emory University partnered with more than 360 acceleration programs to
> collect detailed data from more than 23,000 entrepreneurs who applied to their programs."

Separately, ANDE's own accelerator directory (built June 2020 – March 2021) maps **N=280** active
accelerator programs worldwide, and the report explicitly caveats it: "this dataset is likely
missing many accelerators, largely due to inconsistencies in publicly available information as well
as language barriers."

- Source: same GALI report as 1.1
- URL: https://www.galidata.org/assets/report/pdf/Does%20Acceleration%20Work_EN.pdf
- **Published: May 2021**
- Use in playbook: use as the credible floor for "the accelerator world is big and nobody has a
  clean census". Avoid the inflated "3,000 / 7,000 accelerators" numbers floating around blogs —
  they are unsourced. Honest framing beats a big number here, and it matches the article's own
  argument about measurement discipline.

### Fact 1.3 — Selection does not reliably predict outcomes

> "we know that accelerators are not always successful at predicting which entrepreneurs will
> succeed: for many individual accelerator programs, accepted ventures do not end up outperforming
> rejected ventures."

- Source: same GALI report
- URL: https://www.galidata.org/assets/report/pdf/Does%20Acceleration%20Work_EN.pdf
- **Published: May 2021**
- Use in playbook: the single most uncomfortable stat for organizers, and the strongest hook. The
  playbook's promise is not "judge faster" but "judge in a way you can actually check afterwards".
  Pair with Fact 2.1 (reviewers can't agree) to build the case for structure over instinct.

### Fact 1.4 — Y Combinator's own explanation of how the cutoff works

> "The reason it gets rejected is not that it seems particularly bad, but that there are a
> sufficient number of others that seem particularly good."

> "We interview as many great teams as needed to find that number of companies and then generally
> stop, no matter how many good ones apply."

- Source: Y Combinator, "Why We Don't Invite Groups to Interviews"
- URL: https://www.ycombinator.com/whynot/
- **Published: no date on page** (evergreen YC policy page; live well before May 2026)
- Use in playbook: quote it as proof that at scale the decision is *relative ranking under a
  capacity constraint*, not absolute merit. That is exactly the kind of decision that needs a
  consistent scale — because a relative ranking built from inconsistent scores is noise.
- ⚠️ Caution: undated page. Present as "YC's published position", not as a dated claim.

---

## 2. Known failures of human panels: agreement, drift, order, fatigue

### Fact 2.1 — Trained NIH reviewers scoring the *same* proposals agreed at essentially zero

Mock NIH study section: **43 reviewers, 4 panels, 25 real funded R01 applications, 83 ratings.**

> "The ICC turned out to be 0 [P = 1.0, 95% CI (0, 0.14)]"

> "two randomly selected ratings for the same application were on average just as similar to each
> other as two randomly selected ratings for different applications"

> "our reviewers rated unfunded applications just as positively as funded applications (P = 0.58)"

Krippendorff's alpha near zero (α = 0.024); ICC 0.017 for weaknesses identified, 0 for strengths.

- Source: Pier EL, Brauer M, Filut A, Kaatz A, Raclaw J, Nathan MJ, Ford CE, Carnes M. "Low
  agreement among reviewers evaluating the same NIH grant applications", *PNAS*
- URL: https://www.pnas.org/doi/10.1073/pnas.1714379115 (open mirror:
  https://pmc.ncbi.nlm.nih.gov/articles/PMC5866547/)
- **Published: March 2018** (online March 5, issue March 20, 2018)
- Use in playbook: the headline fact of the whole article. These were expert, trained, incentivized
  reviewers on a mature rubric, with far more time per item than any Demo Day judge gets. If they
  land at ICC 0, an organizer's volunteer panel scoring 200 decks over a weekend has no reason to
  assume better. Lead the "why your scores don't mean what you think" section with this.

### Fact 2.2 — Expert judges in a live competition: ICC 0.21–0.45 on subjective criteria

Olympic breaking (Paris 2024), 32 battles, official results. Single-measure absolute-agreement ICC
by criterion: Originality **0.452**, Vocabulary **0.290**, Execution **0.291**, Musicality
**0.277**, Technique **0.206**. Kendall's W: 0.322–0.570.

> "the reliability of the judges' scores was comparable to DanceSport and hip-hop competitions but
> considerably lower than artistic gymnastics"

Prior research puts artistic gymnastics ICC at **0.94–0.98** — the difference being how tightly the
rubric is anchored to observable, enumerable elements.

- Source: Sato N. "Reliability of judging in Olympic breaking at the 2024 Paris games",
  *Frontiers in Psychology*
- URL: https://pmc.ncbi.nlm.nih.gov/articles/PMC12708583/
- **Published: December 2024**
- Use in playbook: the cleanest available proof that *rubric specificity is the variable*, not judge
  quality. Same caliber of judge, same event: 0.21 on the vague criterion, and 0.94+ in a sport that
  enumerates its elements. Directly justifies the playbook step "replace 'Team' and 'Market' with
  observable, countable evidence checks".

### Fact 2.3 — Panel scores drift with the room: laughter and the chair move them

Video-recorded NIH study sections, 4 oncology panels (8–12 researchers each), 25 R01 applications,
15 cases of score-calibration talk analyzed.

> "score change was significantly more likely when laughter was present during SCT than when it was
> absent (OR = 16; 95% CI: 1.09, 234.25, p = .04)"

> "Score change was also significantly more likely when the chair initiated SCT than when another
> panelist initiated SCT (OR = 36; 95% CI: 1.77, 731.56, p = .02)"

> "Interpersonal pressure from the chair's SCT or SCT-invoked group laughter could introduce bias in
> an R01's final priority score."

- Source: Pier EL, Raclaw J, Carnes M, Ford CE, Kaatz A. "Laughter and the Chair: Social Pressures
  Influencing Scoring During Grant Peer Review Meetings", *Journal of General Internal Medicine*
- URL: https://pmc.ncbi.nlm.nih.gov/articles/PMC6445833/
- **Published: 2 January 2019**
- Use in playbook: the argument against the live "let's discuss and converge" room as the *primary*
  scoring mechanism. Confidence intervals are very wide (small n) — present as directional, not
  precise. Recommendation it supports: independent scores locked before discussion; the chair speaks
  last; discussion resolves disagreement rather than manufacturing agreement.

### Fact 2.4 — Panel norms shift over the length of a meeting, and scores compress

> "the decision-making norms of a panel can evolve over the length of the review meeting"

Collecting rankings at the end of all discussion is proposed specifically to "mitigate any temporal
effects". Also: "scores are often compressed to a limited range in peer review" — in the AIBS case
study reviewers used only **1.3 to 4** of a 1–5 scale.

- Source: Gallo SA, Pearce M, Lee CJ, Erosheva EA. "A new approach to grant review assessments:
  score, then rank", *Research Integrity and Peer Review*
- URL: https://pmc.ncbi.nlm.nih.gov/articles/PMC10367367/
- **Published: 24 July 2023**
- Use in playbook: this is the citation for **rubric drift** as a named phenomenon, plus the reason
  your "1–10 scale" is really a 3-point scale in practice. Supports two playbook moves: (a) score,
  then rank, and (b) re-score a seeded calibration item mid-session to measure drift instead of
  hoping it isn't there.

### Fact 2.5 — Evaluator fatigue: favorable rulings fall from ~65% to near zero within a session

Analysis of **1,112 parole rulings** (≈40% of a country's parole requests).

> "The percentage of favorable rulings drops gradually from ≈65% to nearly zero within each decision
> session and returns abruptly to ≈65% after a break."

- Source: Danziger S, Levav J, Avnaim-Pesso L. "Extraneous factors in judicial decisions", *PNAS*
- URL: https://www.pnas.org/doi/10.1073/pnas.1018033108
- **Published: April 2011** (online 11 April 2011)
- Use in playbook: the fatigue/order argument in one number. Supports the concrete rule "no judge
  scores more than N items without a break, and slot position must be randomized and recorded".
- ⚠️ Caution: there is a published methodological critique (Glöckner, *Judgment and Decision Making*,
  2016) arguing the effect size is overestimated by a case-ordering artifact. Cite the finding as
  "contested in magnitude, uncontested in direction" — or hedge with "widely replicated pattern of
  decision fatigue". Do not present ≈65%→0 as settled.

### Fact 2.6 — Order effects in sequential expert evaluation are real

Competing early in a sequentially judged contest produces statistically lower scores; judges
assimilate the current score toward the previous one. Documented biases in panel judging include
order bias, reputation effect, memory effect, and conformity effect.

- Source: Page L, Page K. "When is a talent contest not a talent contest? Sequential performance
  bias in expert evaluation", *Economics Letters*
- URL: https://www.sciencedirect.com/science/article/abs/pii/S0165176519300370
- **Published: 2019** (Economics Letters, vol. 176)
- ⚠️ Caution: publisher blocked full-text retrieval (403). Findings above are from the abstract and
  secondary summaries. **Verify the exact coefficient before quoting a number** — safest to use it
  qualitatively ("pitching first is a measurable disadvantage") rather than with a figure.
- Use in playbook: justifies randomizing pitch order, recording it as a field, and checking
  score-vs-slot correlation after the event as a QA step.

---

## 3. What actually improves agreement

### Fact 3.1 — An 11-minute training video raised reviewer ICC from 0.61 to 0.89

Randomized trial, **75 Public Health professors**, training video vs no-training control.

- Training condition **ICC 0.89** (95% CI 0.71–0.99); no-training **ICC 0.61** (95% CI 0.32–0.96)
- Correct rating-scale selection: **74% vs 35%**
- Trained reviewers spent more time on criteria: M = 6.1 min vs 4.2 min
- Intervention: an **11-minute** video on what each scale value means and the cost of inaccurate
  scoring

- Source: Sattler DN, McKnight PE, Naney L, Mathis R. "Grant Peer Review: Improving Inter-Rater
  Reliability with Training", *PLOS ONE*
- URL: https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0130450
- **Published: 15 June 2015**
- Use in playbook: the highest-ROI action an organizer can take, with a number attached. Eleven
  minutes of calibration nearly halved the disagreement. Make this the "do this first" step — it
  costs a volunteer judge less time than one extra pitch.

### Fact 3.2 — Post-hoc feedback to reviewers did *not* fix agreement

RCT at a Norwegian funder, **42 reviewers** (23 general feedback, 19 individual feedback), two
review years.

- No significant time×group interaction on proposal-score agreement (**p = .228**)
- Average absolute score difference barely moved: general 2.0 → 1.8, individual 2.2 → 1.9
- "We did not observe changes in proposal score agreement between 2017 and 2018 in reviewers
  receiving different feedback"
- Agreement stayed low: **ICC(1,2) ≈ 0.30–0.40** in both groups
- Eligibility (binary, well-defined) agreement was high and improved: Gwet's AC1 0.829 → 0.927

- Source: Hesselberg J-O, Fostervold KI, Ulleberg P, Svege I. "Individual versus general structured
  feedback to improve agreement in grant peer review: a randomized controlled trial", *Research
  Integrity and Peer Review*
- URL: https://pmc.ncbi.nlm.nih.gov/articles/PMC8485516/
- **Published: 30 September 2021**
- Use in playbook: the important negative result. Telling judges "you scored differently from
  others" after the fact does nothing. Fix it **upstream** — calibration before scoring (3.1) and a
  criterion that is binary/observable enough to agree on (note the AC1 0.93 on the eligibility
  question vs ICC 0.30 on the quality question). This is the strongest structural argument in the
  research set: convert judgment into checkable evidence questions wherever possible.

### Fact 3.3 — Double-anonymous review removes demographic dependence in outcomes

Three-year trial at a *Functional Ecology* (British Ecological Society).

- Under single-anonymous review, "outcomes depended on author demographics. Papers with a first
  author residing in a higher-income country or a country with a higher average English-proficiency
  received higher ratings."
- Under double-anonymous review, "peer review outcomes were similar across author demographics."
- "Anonymizing author identities had no effect on gender differences in reviewer ratings or editor
  decisions."

- Source: Fox CW et al., *Functional Ecology* (BES three-year trial); reported via British
  Ecological Society / Lab Manager
- URL: https://besjournals.onlinelibrary.wiley.com/doi/full/10.1111/1365-2435.14259
- **Published: 2023** (Functional Ecology; BES press coverage April 2023)
- ⚠️ Caution: Wiley returned 403 and the press summaries carry no effect sizes. Use qualitatively.
  Also note the honest limitation: blinding fixed the geography/language gap, **not** the gender gap.
- Use in playbook: supports "blind the first screening pass" while being honest that blinding is a
  partial fix, not a moral get-out-of-jail card. Also supports the companion point that
  anonymization is leaky — reviewers guess identities.

### Fact 3.4 — Structured, anchored rubrics measurably lift ICC over ad-hoc scoring

Documented progression in an assessment program: scoring **without** a rubric started at **ICC
0.595 (2008)** and reached **0.860 (2012)** after rubric implementation, revision, and rater
training. Holistic-rubric scoring went from **0.586 (2009)** to **0.772 (2012)**. Behaviorally
anchored, case-specific rubric items were more reproducible than broad global ratings.
Conventional interpretation: ICC .60–.74 good, .75–1.0 excellent.

- Source: peer-reviewed rubric-reliability literature (PMC), incl.
  https://pmc.ncbi.nlm.nih.gov/articles/PMC7405303/ (clinical documentation rubric IRR)
- **Published: 2020** (PMC7405303, *Am J Pharm Educ*)
- ⚠️ Caution: the 0.595→0.860 series was assembled from search summaries across rubric-reliability
  papers. **Verify against PMC7405303 directly before quoting the exact ICC series**, or use the
  qualitative claim only ("anchored rubrics plus rater training moved a program from mediocre to
  excellent agreement").
- Use in playbook: the "write the rubric like a checklist, not a vibe" step. Note this also
  triangulates cleanly with Fact 2.2 (breaking vs gymnastics).

---

## 4. Volunteer judges: what they will actually give you

### Fact 4.1 — MLH's arithmetic: 4 minutes per project per judge, 3 rounds per project

MLH Hackathon Organizer Guide, science-fair judging format:

- "2 minutes for presentation + demo, 1 minute for questions from judges and score compilations, and
  1 minute for judge travel" = **4 minutes per project per judge**
- Recommended **3 judging rounds per project** (each project seen 3 times)
- Judge-count formula: **J = ⌈(P × n × t) / T⌉** where P = projects, n = rounds (3), t = minutes per
  project (4), T = total minutes available
- Worked example in the guide: **500 attendees, 120 minutes → 13 judges**
- Total judging window: "This usually takes around 2 - 3 hours, depending on the number of
  submissions and judges."
- Finalists at closing: "~7 minutes per team … 3-5 for the presentation and 2 minutes to set up the
  next group"
- Recruit **2–3 extra judges** as a buffer against no-shows

- Source: Major League Hacking, Hackathon Organizer Guide — Judging Plan
- URL: https://guide.mlh.com/general-information/judging-and-submissions/judging-plan
  (old host guide.mlh.io 302-redirects here)
- **Published: no date — living/evergreen guide**, long-established and current as of research date
- Use in playbook: the arithmetic centerpiece. Run their own formula against Demo Day numbers: 200
  submissions × 3 rounds × 4 min = **2,400 judge-minutes = 40 judge-hours**, which in a 2-hour window
  needs 20 judges you do not have. State the constraint plainly, then show the playbook's way out.
- ⚠️ Caution: undated. Cite as "MLH's organizer guide", not with a year.

### Fact 4.2 — Technovation: 30 minutes per submission, minimum 5, ~3 hours total

- "We estimate it takes about 30 minutes to review one team's submission."
- Minimum commitment: **5 submissions**
- "commit to at least three hours of volunteering", including a **30-minute recorded training**

- Source: Technovation, "Volunteer as a Virtual Judge for Technovation"
- URL: https://www.technovation.org/blogs/volunteer-as-a-virtual-judge-for-technovation/
- **Published: no explicit date; page references the 2022 Technovation Girls program**
- Use in playbook: the realistic unit of volunteer supply — **~5 items, ~3 hours**. Note the
  training is baked into the ask (matches Fact 3.1). Do the division out loud for the reader: 300
  submissions × 3 reviews ÷ 5 items per judge = **180 volunteer judges** you must recruit, train and
  chase.

### Fact 4.3 — Deep written-feedback judging costs ~1.5 hours per submission

Project ECHO Teen Entrepreneurs' Business Plan Competition: each plan takes about **1.5 hours** to
review, score, and write feedback; judges take **3 plans**, for a total commitment of roughly **6
hours** including training. In-person pitch panels review **7–10 presentations**.

- Source: Project ECHO, Virtual Judge FAQ / Competition Volunteers
- URL: https://www.projectecho.org/virtualjudgefaq
- **Published: no date — evergreen volunteer FAQ**
- Use in playbook: this is the price of *written feedback*, and it is the reason organizers stop
  giving it (see §5). The gap between 30 min (score only) and 90 min (score + feedback) is the exact
  gap the playbook has to close.

---

## 5. What organizers tell rejected applicants, and why it hurts

### Fact 5.1 — YC: "a lot of the time there's literally no answer"

> "The reason we can't respond to emails about why teams were rejected is that a lot of the time
> there's literally no answer."

> "The main reason the top third or so of the applicants don't get invited to interviews is
> literally not to be found anywhere in their application, but instead is distributed across the top
> few applications that pushed them down below the cutoff."

- Source: Y Combinator, "Why We Don't Invite Groups to Interviews"
- URL: https://www.ycombinator.com/whynot/
- **Published: no date on page** (evergreen YC policy page)
- Use in playbook: the most quotable statement of the problem, from the most credible possible
  source. It is also *honest*: the reason genuinely lives in the comparison, not in the application.
  The playbook's counter: if the reason lives in the comparison, then record the comparison. A
  ranked, criterion-level trace is feedback even when no single flaw exists.

### Fact 5.2 — Techstars: "there were probably just other things more interesting to us"

> "the honest truth is that there were probably just other things more interesting to us"

> "passing on an applicant doesn't mean that there is something specifically wrong with the startup"

- Source: Techstars, "Non-Selection is Not Really Rejection"
- URL: https://www.techstars.com/newsroom/non-selection-is-not-really-rejection
- **Published: no date visible on newsroom post**
- Use in playbook: shows this is an industry norm, not one program's quirk. Two of the most
  resourced accelerators in the world both publicly decline to give reasons. That is the status quo
  the playbook is arguing against.

### Fact 5.3 — The contrast case: NIH sends written critiques to *every* applicant, including undiscussed ones

Applicants whose applications are discussed receive, within about one month: "written critiques
provided by the assigned reviewers", "the SRO's summary of the discussion, scores for each review
criterion, and administrative notes of special consideration".

Applications **not** discussed still receive "the critiques of the assigned reviewers and
preliminary scores for each review criterion."

- Source: NIH Center for Scientific Review, "What happens to your application during and after
  review?"
- URL: https://public.csr.nih.gov/ForApplicants/InitialReviewResultsAndAppeals/applicationduringafterreview
- **Published: page last updated 26 August 2025**
- Use in playbook: the strongest structural argument in §5. A funder handling far more volume than
  any accelerator, with far higher stakes, returns criterion-level scores and written critiques to
  100% of applicants — including the ones that never made the discussion table. "Too much volume" is
  therefore a tooling answer, not a truth. Build the closing section on this comparison.

### Fact 5.4 — Selection criteria themselves shift between screening and final stages

Study of a Southeast Asian seed accelerator using a 30-criterion "real-win-worth" scoreboard on real
applicant profiles: managers' implicit criteria shifted from **eight** criteria used in initial
screening of many startups to a different **four** criteria in final selection of the few.

- Source: Yin B, Luo J. "How Do Accelerators Select Startups? Shifting Decision Criteria Across
  Stages", *IEEE Transactions on Engineering Management*
- URL: https://ieeexplore.ieee.org/document/8283784/
  (open preprint: https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2735465)
- **Published: 2018**
- Use in playbook: explains *why* honest feedback is hard even with good intentions — the rubric a
  founder was screened on is not the rubric they were finally judged on, and nobody wrote that down.
  Supports the playbook step "publish the stage-specific rubric, and say which stage the applicant
  was cut at".

---

## Rejected (too recent — chronological conflict with 2026-05-23)

- **22nd Century Frontier, "290+ Global Startup Accelerators: The Full Database"** —
  https://www.22ndcenturyfrontier.com/p/global-startup-accelerator-database — **published 11 June
  2026**. This is the origin of the widely-quoted "1.6 million startups applied to accelerators in
  2025, 48,000 accepted, 3% acceptance rate" figure. **Do not use** — it postdates the article, and
  the figure is not independently sourced anyway.
- **Frontiers in Education, "Assessor experience, not rubric type, determines grading reliability
  in biosciences coursework"** (feduc.2026.1729644) — 2026, exact month unverified. Excluded as
  unsafe.
- Various Sopact / awards-software vendor pages carrying 2026 datelines and unsourced accelerator
  review-volume statistics ("500–3,000 applications per round, 8–15 reviewers"). Marketing content,
  no methodology, dates unverifiable. **Do not use.**

## Unverified / do not quote with numbers

- Y Combinator per-batch application counts. Reported figures range from 20,000 to 40,000+ across
  secondary sources, with a "record 24K applications" attributed to Bloomberg. YC publishes no
  official figure. If volume is needed, use GALI's <13% selection rate (Fact 1.1) instead.
- Global accelerator counts of "3,000" or "7,000+", and the "$5.11B accelerator market in 2025".
  All from undated SEO blogs with no methodology. Use GALI's N=280 directory with its own caveat.
- MLH's "300 hackathons / 500,000 developers" scale claims — homepage marketing copy, undated,
  internally inconsistent across MLH properties.

## Retrieval failures worth a second pass if a number becomes load-bearing

- Page & Page, *Economics Letters* 2019 (Fact 2.6) — ScienceDirect 403
- Fox et al., *Functional Ecology* 2023 (Fact 3.3) — Wiley 403, BES 403, phys.org 451
- Rotthoff, "Order Matters" working paper — host 403
- The 0.595→0.860 rubric ICC series (Fact 3.4) — assembled from summaries, needs direct confirmation
