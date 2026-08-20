-- Run this in Supabase Dashboard → SQL Editor → New query → Run

-- 1) Main portfolio JSON document (edit this from Table Editor)
create table if not exists public.portfolio_content (
  id text primary key default 'main',
  data jsonb not null,
  updated_at timestamptz not null default now()
);

-- 2) Live stats you update often (DSA / Codolio / custom numbers)
create table if not exists public.live_stats (
  key text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

-- 3) Optional chat logs (for later review)
create table if not exists public.chat_logs (
  id uuid primary key default gen_random_uuid(),
  message text not null,
  reply text,
  mode text,
  created_at timestamptz not null default now()
);

-- 4) Contact form submissions (view in Table Editor → contact_messages)
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

-- 5) Chat rate limits (per IP hour/day buckets)
create table if not exists public.chat_rate_limits (
  key text primary key,
  count int not null default 0,
  updated_at timestamptz not null default now()
);

-- 6) Global portfolio like counter (bottom-left heart)
create table if not exists public.site_likes (
  id text primary key default 'main',
  count bigint not null default 0,
  updated_at timestamptz not null default now()
);

insert into public.site_likes (id, count)
values ('main', 0)
on conflict (id) do nothing;

create or replace function public.bump_site_likes(delta integer)
returns bigint
language plpgsql
security definer
as $$
declare
  new_count bigint;
begin
  insert into public.site_likes (id, count)
  values ('main', 0)
  on conflict (id) do nothing;

  update public.site_likes
  set count = greatest(0, count + delta),
      updated_at = now()
  where id = 'main'
  returning count into new_count;

  return coalesce(new_count, 0);
end;
$$;

-- Auto-update timestamps
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists portfolio_content_updated_at on public.portfolio_content;
create trigger portfolio_content_updated_at
before update on public.portfolio_content
for each row execute function public.set_updated_at();

drop trigger if exists live_stats_updated_at on public.live_stats;
create trigger live_stats_updated_at
before update on public.live_stats
for each row execute function public.set_updated_at();

-- Public read access for the website (safe: only portfolio data)
alter table public.portfolio_content enable row level security;
alter table public.live_stats enable row level security;
alter table public.chat_logs enable row level security;
alter table public.contact_messages enable row level security;
alter table public.chat_rate_limits enable row level security;
alter table public.site_likes enable row level security;

drop policy if exists "Public read portfolio" on public.portfolio_content;
create policy "Public read portfolio"
on public.portfolio_content for select
to anon, authenticated
using (true);

drop policy if exists "Public read live stats" on public.live_stats;
create policy "Public read live stats"
on public.live_stats for select
to anon, authenticated
using (true);

drop policy if exists "Public read site likes" on public.site_likes;
create policy "Public read site likes"
on public.site_likes for select
to anon, authenticated
using (true);

-- Writes stay locked to service role (your server / dashboard owner)
-- No insert/update policies for anon = public cannot edit

-- Storage bucket for resume + media (create via Dashboard too if needed)
insert into storage.buckets (id, name, public)
values ('portfolio-files', 'portfolio-files', true)
on conflict (id) do nothing;

drop policy if exists "Public read portfolio files" on storage.objects;
create policy "Public read portfolio files"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'portfolio-files');
