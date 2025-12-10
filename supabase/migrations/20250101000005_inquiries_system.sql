/**
 * FEATURES: INQUIRIES
 *
 * This migration establishes the contact form and inquiry system.
 *
 * CONTENTS:
 * 1. Inquiries: Contact form submissions.
 * 2. Inquiry Replies: Admin responses.
 */

-- 1. INQUIRIES
create table if not exists public.inquiries (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  phone       text,
  company     text,
  subject     text,
  message     text not null,
  status      text not null default 'new', -- new, read, archived
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table public.inquiries enable row level security;

-- Inquiries Policies
create policy "Inquiries are insertable by everyone"
on public.inquiries for insert
to anon, authenticated
with check (true);

create policy "Inquiries are viewable by admin only"
on public.inquiries for select
to authenticated
using (public.is_admin());

create policy "Inquiries are updateable by admin only"
on public.inquiries for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "Inquiries are deletable by admin only"
on public.inquiries for delete
to authenticated
using (public.is_admin());


-- 2. INQUIRY REPLIES
create table if not exists public.inquiry_replies (
  id          uuid primary key default gen_random_uuid(),
  inquiry_id  uuid not null references public.inquiries(id) on delete cascade,
  message     text not null,
  sender      text, -- Captured from user session
  created_at  timestamptz not null default now()
);

alter table public.inquiry_replies enable row level security;

-- Inquiry Replies Policies
create policy "Replies are viewable by admin only"
on public.inquiry_replies for select
to authenticated
using (public.is_admin());

create policy "Replies are insertable by admin only"
on public.inquiry_replies for insert
to authenticated
with check (public.is_admin());
