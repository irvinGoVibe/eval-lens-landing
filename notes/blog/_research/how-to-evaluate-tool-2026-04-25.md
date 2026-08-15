# Research: "How to evaluate an AI evaluation tool"

Article slug: how-to-evaluate-an-ai-evaluation-tool
Planned publish date (backdated): **2026-04-25**
Hard constraint: every source below is published **on or before April 2026**. Verified per source.
Research date: 2026-08-15

Rejected for chronology (do NOT use in this article):
- GPTZero investigation into the EY loyalty-fraud report (60% hallucinated references) — published **2026-05-14**, too late.
- GPTZero investigations into KPMG (Jun 2026) and PwC (Jul 2026) — too late.
- FINRA 2026 Annual Oversight Report AI-hallucination flag — 2026 publication, month unverified, skipped.
- Any "$2.3B trading losses Q1 2026" figure — traced only to vendor marketing blogs, unverifiable. Skipped.

---

## 1. Lab evals can't be trusted without reproduction (contamination, gaming, reproducibility)

### F1. Leaderboard scores can be bought with private retries
**Fact:** An analysis of Chatbot Arena found that a single provider could privately test many model variants and publish only the best score — the paper documents **27 private LLM variants tested by Meta** in the run-up to Llama-4. It also found Google and OpenAI received **19.2% and 20.4%** of all arena data respectively, while **83 open-weight models together received an estimated 29.7%**, and that access to arena data produced **relative gains of up to 112%** on the arena distribution.
**Source:** "The Leaderboard Illusion", arXiv:2504.20879 — https://arxiv.org/abs/2504.20879
**Published:** 2025-04-29 (v1)
**Checklist use:** Ask the vendor: "How many prompt/model configurations did you run before publishing this number, and did you publish all of them or the best one?" A single headline accuracy figure with no attempt count is a marketing number, not an evaluation.

### F2. Benchmark scores drop on fresh, uncontaminated data
**Fact:** Scale AI built GSM1k — 1,250 new grade-school math problems mirroring GSM8k's style and difficulty — and measured accuracy drops of **up to 8%** on leading models (the initial version reported up to 13% for some model families), with a positive relationship (Spearman r² = 0.36) between a model's likelihood of reproducing a GSM8k example and its GSM8k→GSM1k performance gap, i.e. partial memorisation.
**Source:** "A Careful Examination of Large Language Model Performance on Grade School Arithmetic", arXiv:2405.00332; NeurIPS 2024 Datasets & Benchmarks — https://arxiv.org/abs/2405.00332
**Published:** 2024-05-01 (v1); NeurIPS 2024
**Checklist use:** Demand a held-out run on YOUR data, not their benchmark. If a vendor's number only exists on a public dataset, assume some of it is memorisation. The buyer's version: "run it on 50 of my own decks, blind."

### F3. A single character can flip the ranking
**Fact:** Evaluation results are brittle to formatting: MMLU performance can vary by **±23% depending on the choice of delimiter** across Llama, Qwen and Gemma families, and the authors show you can "manipulate model rankings to put any model in the lead by only modifying the single character separating examples." Brittleness persists across topics and model scale.
**Source:** "A Single Character can Make or Break Your LLM Evals", arXiv:2510.05152 — https://arxiv.org/abs/2510.05152
**Published:** 2025-10-02 (v1)
**Checklist use:** Ask whether the vendor's prompt/format is frozen and versioned. If the scoring prompt changes silently between your pilot and production, your scores are not comparable — and neither are two candidates scored a month apart.

### F4. Reproducibility is a known, unsolved problem in LLM evaluation
**Fact:** The EleutherAI team behind the Language Model Evaluation Harness documents, from three years of practice, that LLM evaluation suffers from sensitivity to evaluation setup, difficulty of fair cross-method comparison, and **lack of reproducibility and transparency** — and publishes lm-eval specifically as infrastructure for independent, reproducible evaluation.
**Source:** "Lessons from the Trenches on Reproducible Evaluation of Language Models", arXiv:2405.14782 — https://arxiv.org/abs/2405.14782
**Published:** 2024-05-23 (v1)
**Checklist use:** "Can I re-run the exact same input and get the same score? Show me the run log." A tool that can't reproduce its own output can't defend a rejection.

---

## 2. Explainability / traceability in high-stakes screening

### F5. NIH bans generative AI in peer review outright — on confidentiality grounds
**Fact:** NIH prohibits scientific peer reviewers from using natural language processors, large language models or other generative AI technologies to analyse or formulate peer review critiques for grant applications and R&D contract proposals. The stated rationale is confidentiality and integrity: uploading application content to online AI tools breaches the reviewer confidentiality agreement, because there is no guarantee of where the data is sent, saved, viewed or later used. NIH revised its Security, Confidentiality and Non-disclosure Agreements accordingly; breach can lead to termination of reviewer service, government-wide suspension or debarment, and civil or criminal action.
**Source:** NIH Guide Notice NOT-OD-23-149 — https://grants.nih.gov/grants/guide/notice-files/NOT-OD-23-149.html (mirror: https://www.healthaipolicy.org/policies/NOT-OD-23-149)
**Published:** 2023-06-23
**Checklist use:** Two buyer questions in one. (a) "Where does my applicant's deck physically go, and is it retained or used for training?" (b) If your process mirrors a confidential review, an AI tool that ships documents to an opaque third party is a policy violation before it is a quality question. Ask for the data-flow diagram, not the assurance.

### F6. EU law gives an individual the right to an explanation of an AI-based decision
**Fact:** Article 86 of Regulation (EU) 2024/1689 (EU AI Act) gives any person affected by a decision taken by a deployer on the basis of a high-risk Annex III AI system — where the decision produces legal effects or similarly significantly affects them — the right to obtain from the deployer **"clear and meaningful explanations of the role of the AI system in the decision-making procedure and the main elements of the decision taken."** AI systems evaluating the creditworthiness of natural persons sit in Annex III, point 5(b).
**Source:** EU AI Act Article 86 — https://artificialintelligenceact.eu/article/86/ (Regulation (EU) 2024/1689, in force 2024-08-01; Art. 86 applies from 2026-08-02)
**Published:** Regulation adopted/published 2024 (OJ, July 2024); article text stable
**Checklist use:** "If a founder or a supplier disputes the score, what exactly can I show them?" A number with no traceable reason chain is not an explanation. Require per-criterion reasoning tied to the specific passage in the submitted document.

### F7. Vendor "hallucination-free" claims did not survive independent testing
**Fact:** The first preregistered empirical evaluation of commercial legal AI research tools (202 queries, hand-scored by experts) found hallucination rates of **17% for Lexis+ AI and 33% for Westlaw AI-Assisted Research**, against LexisNexis's marketing claim of "100% hallucination-free linked legal citations" and Thomson Reuters's claim that its tools avoid hallucinations by relying on trusted content. The researchers concluded providers' claims are overstated.
**Source:** "Hallucination-Free? Assessing the Reliability of Leading AI Legal Research Tools", Stanford RegLab / HAI, arXiv:2405.20362 — https://reglab.stanford.edu/publications/hallucination-free-assessing-the-reliability-of-leading-ai-legal-research-tools/
**Published:** 2024-05-30 (arXiv v1); coverage 2024-05
**Checklist use:** Treat "no hallucinations" as an unverified claim until you personally test it. The buyer's move: seed the pilot with 10 documents whose facts you already know cold, and count fabrications yourself.

---

## 3. Calibrating an AI judge against human labels

### F8. The founding LLM-as-judge result — and its three named biases
**Fact:** Strong LLM judges such as GPT-4 match controlled and crowdsourced human preferences at **over 80% agreement — the same level of agreement humans reach with each other**. The same paper documents the failure modes: **position bias, verbosity bias, self-enhancement bias**, and limited reasoning ability.
**Source:** Zheng et al., "Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena", arXiv:2306.05685; NeurIPS 2023 D&B — https://arxiv.org/abs/2306.05685
**Published:** 2023-06-09 (v1); NeurIPS 2023
**Checklist use:** The right benchmark for an AI judge is not "is it right" but "does it agree with your humans as much as your humans agree with each other." Ask the vendor for their human-agreement number AND their human-to-human baseline. One without the other is meaningless.

### F9. Correlation is not agreement — use Cohen's kappa
**Fact:** A 54-model study of LLM judges (43 open-source 1B–405B, 11 closed) concludes that **"correlation alone is insufficient for judge evaluation"** and builds a tiered classification using Cohen's Kappa plus z-scores against human-annotator behaviour: 27 of 54 models reached Tier 1, 23 showed human-like judgment patterns (|z| < 1), and 4 were "super-consistent" beyond typical human-to-human agreement (z > 1).
**Source:** "Judge's Verdict: A Comprehensive Analysis of LLM Judge Capability Through Human Agreement", arXiv:2510.09738 — https://arxiv.org/abs/2510.09738
**Published:** 2025-10-10 (v1)
**Checklist use:** Insist on kappa, not correlation. A judge can correlate perfectly with your team while being systematically harsher or softer than them — correlation hides that, kappa doesn't. Ask: "What's your Cohen's kappa against human labels, on what sample size, on my rubric?"

### F10. Self-preference bias is real and measurable
**Fact:** LLM evaluators score their own outputs higher than others' outputs that human annotators judge equal in quality. GPT-4 and Llama 2 have non-trivial out-of-the-box accuracy at recognising their own text, and fine-tuning experiments show a **linear correlation between self-recognition capability and the strength of self-preference bias**, with a causal link that resists straightforward confounders.
**Source:** Panickssery, Bowman, Feng, "LLM Evaluators Recognize and Favor Their Own Generations", arXiv:2404.13076; NeurIPS 2024 — https://arxiv.org/abs/2404.13076
**Published:** 2024-04-19 (v1); NeurIPS 2024
**Checklist use:** If the same model family both drafts and scores, the score is contaminated. Ask which models sit on the judging side, whether they're the same family the applicant likely used to write the deck, and whether more than one model votes.

---

## 4. Vendor due diligence for AI tools

### F11. There is now a canonical AI vendor questionnaire — use it as your floor
**Fact:** The Cloud Security Alliance released the AI Controls Matrix (AICM) v1.0 with **243 control objectives across 18 domains**, the first vendor-agnostic framework for AI security and governance, mapped to ISO/IEC and NIST material. Its companion AI-CAIQ (Consensus Assessment Initiative Questionnaire for AI) is designed explicitly as a self-assessment and third-party vendor evaluation instrument.
**Source:** CSA, "Introducing the CSA AI Controls Matrix" — https://cloudsecurityalliance.org/blog/2025/07/10/introducing-the-csa-ai-controls-matrix-a-comprehensive-framework-for-trustworthy-ai
**Published:** 2025-07-10
**Checklist use:** Don't invent your own questionnaire. Send the AI-CAIQ and see whether the vendor can fill it in at all. Inability to answer is itself the answer.

### F12. Third-party AI risk has a named control — including "what if they disappear"
**Fact:** NIST AI RMF 1.0's GOVERN 6 function covers third-party AI risk. **GOVERN 6.1:** "Policies and procedures are in place that address AI risks associated with third-party entities, including risks of infringement of a third party's intellectual property or other rights." **GOVERN 6.2:** "Contingency processes are in place to handle failures or incidents in third-party data or AI systems deemed to be high-risk."
**Source:** NIST AI Risk Management Framework 1.0 Playbook, GOVERN 6 — https://airc.nist.gov/AI_RMF_Knowledge_Base/Playbook/Govern (AI RMF 1.0 published 2023-01-26)
**Published:** 2023-01-26 (AI RMF 1.0)
**Checklist use:** Two questions buyers forget. "Which upstream model providers are you dependent on, and what happens to my scoring consistency when they deprecate a version?" and "If you shut down tomorrow, do I keep my scored history and my rubric?"

---

## 5. Hallucinated numbers in AI-generated investment / advisory documents

### F13. Deloitte refunded a government for an AI-written report with fabricated citations
**Fact:** Deloitte Australia produced an A$440,000 (~US$290,000) report for the Department of Employment and Workplace Relations on an automated welfare-penalty IT system, published July 2025. Academics found references to non-existent research papers and a **fabricated quote attributed to a federal court judgment**. Deloitte confirmed it used Azure OpenAI GPT-4o, published a revised version with the fabricated references removed, and agreed to partially refund the final contract instalment.
**Source:** OECD.AI incident record — https://oecd.ai/en/incidents/2025-10-05-be45 ; AI Incident Database #1193 — https://incidentdatabase.ai/cite/1193/ ; Business Standard coverage — https://www.business-standard.com/technology/tech-news/deloitte-ai-hallucination-report-australia-gpt4o-fabricated-references-125100800915_1.html
**Published:** 2025-10-05 / 2025-10-07 (report itself July 2025)
**Checklist use:** The failure mode is not "the AI was wrong," it's "the AI invented a source that looked right and nobody checked." Require every number and quote in an AI-produced screening memo to be link-anchored to a page or slide in the source document. If it can't be clicked back to origin, it doesn't ship.

### F14. Regulators already fine firms for overstating what their AI does
**Fact:** On 2024-03-18 the SEC announced its first-ever settled charges for "AI washing": Delphia (USA) Inc. and Global Predictions Inc. paid **$225,000 and $175,000** respectively for false and misleading statements about their use of AI. The SEC found Delphia did not have the AI/ML capabilities it advertised; Global Predictions falsely claimed to be the "first regulated AI financial advisor" offering "expert AI-driven forecasts."
**Source:** SEC Press Release 2024-36 — https://www.sec.gov/newsroom/press-releases/2024-36
**Published:** 2024-03-18
**Checklist use:** Put the vendor's marketing claims into the contract. "Does your MSA warrant the accuracy/agreement figures on your website?" A vendor unwilling to contractualise its own landing page is telling you the landing page is aspirational.

---

## Notes for the writer

- Strongest narrative spine: **F1 → F2 → F8/F9 → F13**. Published numbers can be shopped (F1), collapse on fresh data (F2), the only honest metric is human-agreement measured with kappa (F8/F9), and the cost of skipping this is a refunded contract with invented citations (F13).
- F7 is the sharpest single line for a BOFU piece: a named vendor claimed 100% hallucination-free and independent testing measured 17%. Use it to justify "test it yourself" as the article's core demand.
- F5 + F6 carry the explainability section without needing us to invent policy claims: one hard prohibition (NIH), one hard legal right (EU AI Act Art. 86).
- Avoid stating that EvalLens itself hits any specific kappa unless product docs confirm it. Frame F9 as the question the buyer should ask, not as our published number.
- All quantitative figures above are quoted from source abstracts or official releases; no derived or rounded numbers were introduced.
