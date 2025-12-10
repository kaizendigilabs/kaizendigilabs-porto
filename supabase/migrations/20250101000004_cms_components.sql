/**
 * CMS: COMPONENTS
 *
 * This migration establishes miscellaneous CMS components.
 *
 * CONTENTS:
 * 1. Testimonials: Client feedback.
 * 2. FAQs: Frequently asked questions.
 * 3. RLS Policies: Row Level Security.
 */

-- 1. TESTIMONIALS
create table if not exists public.testimonials (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  role        text,
  company     text,
  content     text not null,
  avatar      text,
  rating      integer default 5,
  published   boolean default false,
  display_order integer default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- 2. FAQS
create table if not exists public.faqs (
  id          uuid primary key default gen_random_uuid(),
  question    text not null,
  answer      text not null,
  published   boolean default false,
  display_order integer default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- 3. RLS POLICIES
alter table public.testimonials enable row level security;
alter table public.faqs enable row level security;

-- TESTIMONIALS
create policy "Testimonials are viewable by everyone"
on public.testimonials for select
to anon, authenticated
using (true);

create policy "Testimonials are insertable by admin only"
on public.testimonials for insert
to authenticated
with check (public.is_admin());

create policy "Testimonials are updateable by admin only"
on public.testimonials for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "Testimonials are deletable by admin only"
on public.testimonials for delete
to authenticated
using (public.is_admin());

-- FAQS
create policy "FAQs are viewable by everyone"
on public.faqs for select
to anon, authenticated
using (true);

create policy "FAQs are insertable by admin only"
on public.faqs for insert
to authenticated
with check (public.is_admin());

create policy "FAQs are updateable by admin only"
on public.faqs for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "FAQs are deletable by admin only"
on public.faqs for delete
to authenticated
using (public.is_admin());
