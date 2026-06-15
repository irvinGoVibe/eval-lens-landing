-- EvalLense blog — collapse taxonomy 6 -> 3 (Story 03, Task A), data-preserving.
--
-- Recategorize existing seeded articles in place to the three canonical rubrics
-- (Press Release, Product, Research) via the per-slug mapping from the app
-- static source (web/src/lib/blog-static.ts). Drop the old CHECK FIRST (the new
-- value Product is absent from the old 6-value set, so the update would
-- otherwise violate it), then remap, then add the tightened CHECK. Replaces the
-- earlier delete-then-reseed approach: no data loss, and a fresh rebuild (0002
-- seeds the same 17 slugs) reproduces the result.

alter table public.articles
  drop constraint articles_category_check;

update public.articles a set category = m.cat
from (values
    ('evallense-launches-ai-jury', 'Press Release'),
    ('explainable-reports-every-score', 'Product'),
    ('prompt-injection-defenses', 'Research'),
    ('deck-vault-secure-pipeline', 'Product'),
    ('batch-review-in-one-afternoon', 'Product'),
    ('rubric-design-principles', 'Research'),
    ('human-in-the-loop-decisions', 'Research'),
    ('scoring-matrix-redesign', 'Product'),
    ('behind-the-lens-photos', 'Press Release'),
    ('calibrating-the-jury', 'Research'),
    ('exporting-reports-to-notion', 'Product'),
    ('what-a-strong-deck-looks-like', 'Research'),
    ('security-soc2-type-ii', 'Press Release'),
    ('the-cost-of-a-missed-deal', 'Research'),
    ('rubric-templates-by-stage', 'Product'),
    ('inside-the-deck-vault', 'Product'),
    ('founding-story', 'Press Release')
) as m(slug, cat)
where a.slug = m.slug;

alter table public.articles
  add constraint articles_category_check
  check (category in ('Press Release', 'Product', 'Research'));
