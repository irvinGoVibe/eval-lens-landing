---
slug: how-evallense-evaluates-pitch-decks
action: append-faq
---
## Common questions

**How does EvalLens score a pitch deck?** A deck goes through a fixed pipeline. The Decoder reads the deck as it is, six independent AI judges score it across six dimensions, and deterministic math turns those judgments into an advisory AI Total Score. Then a human reviews the report and sets the Jury Score, which is what the leaderboard actually ranks on.

**Does the AI decide the final ranking?** No. The AI Total Score is advisory, and the leaderboard ranks on the Jury Score a human submits after reading the AI report and adding live Q&A and context. The AI baseline stays on screen as explanation, never as the decision.

**What dimensions does EvalLens use to evaluate a pitch deck?** Six: problem significance, solution differentiation, market attractiveness, business model and GTM, team and founder fit, and feasibility. Market and team carry the most weight by default, 0.20 each against 0.15 for the rest. Organizers can adjust the weights before judging starts, and then they lock.

**Are AI pitch deck scores reproducible?** In EvalLens, yes. The aggregation is a fixed mathematical function, not a fresh model opinion, so running the same deck twice returns the same numbers. The written report is generated after the math and has to build around it, which means the narrative can never invent a score.

**What happens when the AI judges disagree?** EvalLens measures the spread between judges on each dimension and labels it: below 1.5 is consensus, 1.5 to 2.99 is a split, and 3.0 or more is a conflict. A conflict is not smoothed over. It points you to the exact decks and dimensions where your human judgment changes the ranking most.
