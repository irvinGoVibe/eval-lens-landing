-- EvalLense blog content backend — schema.
--
-- Tables: articles, loop_posts. Public read is restricted by RLS to
-- status = 'published' (anon + authenticated). No write policies for anon.
-- Storage media lives in a single public bucket `media` with subfolders
-- bento/, video/, photos/; columns store the full public object URL.

-- ---------------------------------------------------------------------------
-- articles
-- ---------------------------------------------------------------------------
create table if not exists public.articles (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  category      text not null check (category in (
                  'Press Release',
                  'Update',
                  'Quick Read',
                  'Feature',
                  'Research',
                  'Photos'
                )),
  accent        text not null,
  title         text not null,
  excerpt       text,
  date          date not null,
  read_minutes  int,
  cover         text,
  author        text,
  role          text,
  body          jsonb,
  status        text not null default 'published' check (status in ('draft', 'published')),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists articles_status_date_idx
  on public.articles (status, date desc);

-- ---------------------------------------------------------------------------
-- loop_posts ("In the Loop" reposts; id is the stable key for deep-links)
-- ---------------------------------------------------------------------------
create table if not exists public.loop_posts (
  id          text primary key,
  kind        text not null check (kind in ('video', 'photo')),
  author      text,
  initials    text,
  accent      text,
  caption     text,
  cover       text,
  video       text,
  photos      jsonb,
  date        date,
  href        text,
  status      text not null default 'published' check (status in ('draft', 'published')),
  created_at  timestamptz not null default now()
);

create index if not exists loop_posts_status_created_idx
  on public.loop_posts (status, created_at);

-- ---------------------------------------------------------------------------
-- Row Level Security: public read of published rows only; no anon writes.
-- ---------------------------------------------------------------------------
alter table public.articles enable row level security;
alter table public.loop_posts enable row level security;

create policy "articles_public_read_published"
  on public.articles
  for select
  to anon, authenticated
  using (status = 'published');

create policy "loop_posts_public_read_published"
  on public.loop_posts
  for select
  to anon, authenticated
  using (status = 'published');
