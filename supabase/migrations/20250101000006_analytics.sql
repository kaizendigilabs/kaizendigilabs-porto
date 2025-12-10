/**
 * FEATURES: ANALYTICS
 *
 * This migration establishes simple analytics tracking.
 *
 * CONTENTS:
 * 1. Analytics: Traffic tracking.
 */

-- 1. ANALYTICS
create table if not exists public.analytics (
  id          uuid primary key default gen_random_uuid(),
  path        text not null,
  referrer    text,
  user_agent  text,
  country     text,
  device      text,
  created_at  timestamptz not null default now()
);

alter table public.analytics enable row level security;

-- Analytics Policies
create policy "Analytics are insertable by everyone"
on public.analytics for insert
to anon, authenticated
with check (true);

create policy "Analytics are viewable by admin only"
on public.analytics for select
to authenticated
using (public.is_admin());
