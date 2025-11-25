/**
 * FEATURES SCHEMA
 *
 * This migration establishes interactive features and storage.
 *
 * CONTENTS:
 * 1. Inquiries: Contact form submissions.
 * 2. Analytics: Traffic tracking.
 * 3. Storage: Buckets and policies for file uploads.
 *
 * SECURITY NOTES:
 * - Inquiries: Public INSERT (for contact form), Admin SELECT/UPDATE.
 * - Analytics: Public INSERT (via tracking pixel/script), Admin SELECT.
 * - Storage: Public Read, Admin Write.
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


-- 2. ANALYTICS
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


-- 3. STORAGE
-- Note: storage.buckets is a system table in Supabase.
-- We use ON CONFLICT DO NOTHING to avoid errors if buckets exist.

insert into storage.buckets (id, name, public)
values 
  ('project-images', 'project-images', true),
  ('article-images', 'article-images', true),
  ('avatars', 'avatars', true)
on conflict (id) do nothing;

-- Storage Policies (Complex because they live in storage.objects)

-- PROJECT IMAGES
create policy "Project images are publicly accessible"
on storage.objects for select
to anon, authenticated
using ( bucket_id = 'project-images' );

create policy "Project images are uploadable by admin only"
on storage.objects for insert
to authenticated
with check ( bucket_id = 'project-images' and public.is_admin() );

create policy "Project images are updateable by admin only"
on storage.objects for update
to authenticated
using ( bucket_id = 'project-images' and public.is_admin() );

create policy "Project images are deletable by admin only"
on storage.objects for delete
to authenticated
using ( bucket_id = 'project-images' and public.is_admin() );

-- ARTICLE IMAGES
create policy "Article images are publicly accessible"
on storage.objects for select
to anon, authenticated
using ( bucket_id = 'article-images' );

create policy "Article images are uploadable by admin only"
on storage.objects for insert
to authenticated
with check ( bucket_id = 'article-images' and public.is_admin() );

create policy "Article images are updateable by admin only"
on storage.objects for update
to authenticated
using ( bucket_id = 'article-images' and public.is_admin() );

create policy "Article images are deletable by admin only"
on storage.objects for delete
to authenticated
using ( bucket_id = 'article-images' and public.is_admin() );

-- AVATARS
create policy "Avatars are publicly accessible"
on storage.objects for select
to anon, authenticated
using ( bucket_id = 'avatars' );

create policy "Avatars are uploadable by owner or admin"
on storage.objects for insert
to authenticated
with check ( 
  bucket_id = 'avatars' and 
  ((select auth.uid())::text = (storage.foldername(name))[1] or public.is_admin())
);

create policy "Avatars are updateable by owner or admin"
on storage.objects for update
to authenticated
using ( 
  bucket_id = 'avatars' and 
  ((select auth.uid())::text = (storage.foldername(name))[1] or public.is_admin())
);

create policy "Avatars are deletable by owner or admin"
on storage.objects for delete
to authenticated
using ( 
  bucket_id = 'avatars' and 
  ((select auth.uid())::text = (storage.foldername(name))[1] or public.is_admin())
);

