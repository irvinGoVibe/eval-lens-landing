-- EvalLense blog — "Home / Blog block" featured selection.
--
-- Story 02, "Главная → Блок «Блог»": the editor chooses which published
-- articles appear in the blog block on the home page and in what order.
-- We store the selection inline on `articles` (vs. a singleton config):
--   home_featured  boolean  — included in the home blog block
--   home_position  int      — order within the block (ascending; nulls last)
--
-- The public home block reads published + home_featured rows ordered by
-- home_position; an empty selection falls back to "newest published by date"
-- (handled in the query layer, not here).

alter table public.articles
  add column if not exists home_featured boolean not null default false;

alter table public.articles
  add column if not exists home_position int;

-- Partial index: only the (small) set of featured rows is indexed, ordered by
-- position, for the home-block read.
create index if not exists articles_home_featured_position_idx
  on public.articles (home_position)
  where home_featured;

-- RLS note: anon read of published rows is already granted by
-- 20260615000001_init_blog_schema.sql ("articles_public_read_published").
-- The new columns are covered by that same SELECT policy. No anon write
-- policies are added — all writes go through the server-side service_role
-- client, which bypasses RLS.
