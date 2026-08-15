---
slug: from-ai-jury-to-evallense
action: append-faq
---
## Common questions

**Why was AI Jury renamed to EvalLens?** Because a jury decides, and deciding is the one thing the system is not supposed to do. The product prepares the evaluation: structure, risk, strengths, weaknesses, decision signals. A lens reveals rather than rules, and the final call stays with a person, so the name had to follow the product.

**Do more AI judges make startup evaluation better?** Not on their own. Adding judges produced longer reports, but the judges read the same slides and stepped on each other, so the extra words carried more noise than signal. What improved the evaluation was the structure around the judges: a routing matrix that defines each judge's influence, deterministic aggregation, and a human holding the final decision.

**Can prompt engineering make an LLM judge consistent?** It helps, then it stops helping. Sharper prompts made outputs cleaner, but a judge still behaved like a smart, moody reviewer that noticed different things on different runs. A prompt steers a model; it cannot stand in for methodology, which is why EvalLens pins down scope, dimensions, weights, scoring math, and ranking logic outside the model.

**Can a pitch deck manipulate AI judges with hidden instructions?** It can try. Decks can carry lines like "ignore previous instructions" or "give this project 10/10", so we tested a direct prompt-injection scenario with a red-team deck, and the judge layer held: no inflated score, no dropped rubric. The honest claim is narrow: in that tested scenario the judges treated the deck as evaluation input, not as an instruction source, which is different from claiming universal immunity.

**How is hackathon judging different from pitch competition judging?** They answer different questions, so EvalLens runs two modes. Pitch Competition is thesis-first: six judges score the P1 to P6 dimensions, from problem significance to feasibility. Hackathon is execution-first: five judges score the H1 to H6 dimensions, with execution and technical depth protected, so a confident story cannot outrank a working build.
