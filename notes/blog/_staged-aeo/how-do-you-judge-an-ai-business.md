---
slug: how-do-you-judge-an-ai-business
action: append-faq
---
## Common questions

**Are AI judges reliable for evaluating startups?** Useful and fragile at once. In the MT-Bench study a strong model agreed with human raters over 80 percent of the time, roughly the rate at which humans agree with each other. But the same judges are sensitive to things unrelated to quality: swapping the order of two answers was enough to flip the winner in the FairEval study, and LLM evaluators show familiarity bias, anchoring effects, and low agreement with themselves.

**Are human experts better judges than AI?** Not reliably. When researchers collected roughly 3,000 expert scores across 300 product ideas, the experts disagreed substantially on fine-grained scores even while agreeing on coarse good-or-not calls. Some of that disagreement is structure, different investment theories and risk appetites, so a good evaluation system makes it visible instead of averaging it away.

**How did the Gemini XPRIZE change how AI businesses are judged?** It moved the bar from demo to operated business. The Build with Gemini XPRIZE scores Business Viability, AI-Native Operations, and Category Impact in equal weight, and asks for revenue by month, cost evidence, customer evidence, and agent logs. Two of those three criteria have nothing to do with the model, and the judges grade the evidence you submit rather than testing the product.

**How does EvalLens make startup evaluation repeatable?** By changing what the decision is made from. Independent reviewers read every submission against one shared rubric, every score ties back to the exact claim that produced it, reviewer disagreement is surfaced instead of smoothed over, and the AI total stays advisory while the human score ranks the field. In a controlled single-deck benchmark, the latest scoring iteration returned an identical dimension profile in 12 of 14 runs and cut run-to-run variance by roughly 59 percent. That is a claim about repeatable evaluation, not about predicting startup success.

**Why is evaluation the bottleneck for AI startups now?** Because building got cheap and judging did not. At Y Combinator's Spring 2025 batch, 70 of 144 startups were building agentic AI, and that is one cohort at one accelerator. As the volume of things worth judging grows, the constraint moves from creation to evaluation, and even elite pickers operate in a low-signal regime where evidence discipline matters most.
