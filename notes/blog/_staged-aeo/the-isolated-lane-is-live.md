---
slug: the-isolated-lane-is-live
action: append-faq
---
## Common questions

**Can EvalLens evaluate confidential pitch decks without public AI tools?** Yes. Confidential deck processing runs inside R2 Copilot's certified Azure environment, on a live API integration under a signed agreement. If your compliance policy on public AI tools is "no", that policy and structured evaluation are no longer in conflict.

**How is deck data protected in the EvalLens isolated lane?** Communication runs over HTTPS, data is encrypted at rest in Azure Blob Storage, and access is limited by role-based access control plus private endpoints. The full AI pipeline, from chunking through generation, executes entirely within Azure. Customers can delete their data and account at any time.

**Is the isolated environment certified, or just self-described as secure?** Certified. R2 Copilot holds Microsoft Solutions Partner status under the Industry AI on Azure program, a designation that requires passing Microsoft's technical audits rather than filling in a form. Their published architecture maintains Moderate or higher scores across Reliability, Security, and Operational Excellence under the Azure Well-Architected Framework.

**Does the isolated lane change how EvalLens scores decks?** No. Same six lenses, same evidence-backed report, same human making the final call, on a methodology sharpened over 1,000+ runs. What moved is where the computation lives, not how the evaluation thinks.

**How does EvalLens handle personal data inside pitch decks?** R2's pipeline includes Azure PII detection as a built-in processing step, so personally identifiable information is flagged inside the same Azure environment before anything else happens to the document. That matters because decks quietly carry founder emails, named advisors, and customer logos with real contract values next to them.
