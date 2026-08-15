---
slug: the-isolated-lane-is-live
category: Product
accent: violet
title: The isolated lane is live
excerpt: Last week we announced an isolated AI lane for the decks that can't touch public tools. This week it's running in production, inside a Microsoft-certified Azure environment. Here's what "isolated" actually means, point by point.
date: 2026-07-31
readMinutes: 4
cover: /assets/blog/isolated-lane-live/cover.png
author: Anonymous Unicorn
status: draft
---

Last week we made a promise in public, which is always a slightly nervous thing to do. We announced a partnership with [R2 Copilot](/blog/partnering-with-r2-copilot) and said we were wiring an isolated evaluation lane for the organizers whose compliance teams can't sign off on public AI tools. "The integration is in progress," we wrote, "we're announcing it early."

It's no longer early. The API integration is live, and confidential deck processing on EvalLens now runs inside R2 Copilot's certified Azure environment.

```text
Your decks → EvalLens methodology (6 lenses) → R2's isolated Azure environment → evidence-backed reports → your decision
```

AI prepares the evaluation. You make the final decision. Same line as always. What shipped is the answer to the question that used to come after it: "and where, exactly, does that preparation happen?"

## What went live

Three things, in the order they matter.

**The pipes are real.** We're now running on R2 Copilot's API under a signed agreement, not a letter of intent. Deck analysis that used to be a roadmap slide is a production route.

**The environment is certified, not self-described.** R2 Copilot holds Microsoft Solutions Partner status under the Industry AI on Azure program — a designation that requires passing Microsoft's technical audits, not filling in a form. Their published architecture maintains "Moderate" or higher scores across Reliability, Security, and Operational Excellence under the Azure Well-Architected Framework.

**The methodology didn't move.** Same six lenses, same evidence-backed report, same human making the final call. We changed where the computation lives, not how the evaluation thinks.

## What "isolated" means, point by point

"Isolated" is a word that does a lot of unsupervised work in this industry. So here is the checkable version, from R2's published security documentation:

| Layer | What actually happens |
| --- | --- |
| In transit | All communication runs over HTTPS |
| At rest | Data is encrypted in Azure Blob Storage |
| Storage | Customer data lives in Azure Blob Storage, Azure SQL Database, and Azure Key Vault — inside Microsoft's cloud, not scattered across vendors |
| Access | Role-based access control plus private endpoints; only verified internal components can reach the data |
| Processing | The full AI pipeline — chunking, vectorization, indexing, generation — executes entirely within Azure |
| Exit | Customers can delete their data and account at any time |

:::gallery
![](/assets/blog/isolated-lane-live/flow.png)
:::

No single row here is exotic. That's rather the point. Security that depends on one clever trick is a magic show; security that stacks boring, audited layers is an architecture.

## The detail we like most

Pitch decks are quietly full of personal data. Founder emails on the contact slide. Named advisors. Customer logos with real contract values next to them. A deck is a company's private life formatted in 16:9.

R2's pipeline includes Azure PII detection as a built-in processing step — personally identifiable information is flagged within the same Azure environment, before anything else happens to the document. For an evaluation platform that reads fifty confidential decks per batch, that's not a feature. It's table manners.

## What this changes for you

If you run screening at a fund, an accelerator, or a corporate venture arm where the policy on public AI tools is "no": that policy and structured evaluation are no longer in conflict. The lane exists, it's live, and it runs on infrastructure your compliance team can actually audit — Microsoft's, not ours and not our word.

Everything else stays deliberately untouched. Your rubric, your reports, your final call. Our methodology has sharpened over **1,000+ runs**, and every run through the isolated lane uses exactly the same one.

## The quiet part

Last week's announcement ended with a claim: if your decks can't touch public AI, that stops being a reason you can't use structured evaluation. This week the claim has a production endpoint behind it.

If your compliance team has been the reason you haven't tried this, [book a demo](/demo) and bring them along. The security review is now the fun part of the call.
