-- Low-commitment lead intake from the marketing site ("send us your batch").
-- Written by /api/lead via service_role; RLS enabled with no anon policies,
-- so only service_role can read/write (same model as `articles`).
create table if not exists public.site_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text,
  email text not null,
  org text,
  program_type text,
  batch_size text,
  message text,
  source_path text,
  utm jsonb
);

alter table public.site_leads enable row level security;
