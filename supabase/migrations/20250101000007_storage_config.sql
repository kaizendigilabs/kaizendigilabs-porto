/**
 * FEATURES: STORAGE
 *
 * This migration establishes storage buckets and security policies.
 *
 * CONTENTS:
 * 1. Buckets: System storage containers.
 * 2. Policies: Access control for files.
 */

-- 1. STORAGE
-- Note: storage.buckets is a system table in Supabase.
-- We use ON CONFLICT DO NOTHING to avoid errors if buckets exist.

insert into storage.buckets (id, name, public)
values 
  ('project-images', 'project-images', true),
  ('article-images', 'article-images', true),
  ('avatars', 'avatars', true)
on conflict (id) do nothing;

-- 2. STORAGE POLICIES
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
