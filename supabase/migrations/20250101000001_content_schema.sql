/**
 * CONTENT SCHEMA
 *
 * This migration establishes the CMS content tables.
 *
 * CONTENTS:
 * 1. Articles: Blog posts with rich text content.
 * 2. Projects: Portfolio items.
 * 3. Services: Offerings description.
 * 4. Testimonials: Client feedback.
 * 5. FAQs: Frequently asked questions.
 *
 * SECURITY NOTES:
 * - RLS enabled on all tables.
 * - Public Read Access: Everyone (anon + authenticated).
 * - Admin Write Access: Only users with 'admin' role.
 */

-- 1. ARTICLES
create table if not exists public.articles (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  slug        text not null unique,
  content     jsonb, -- Tiptap JSON
  excerpt     text,
  image_url   text,
  author_id   uuid references public.profiles(user_id),
  published   boolean default false,
  display_order integer default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- 2. PROJECTS
create table if not exists public.projects (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  slug        text not null unique,
  description text,
  client      text,
  year        text,
  category    text,
  image_url   text,
  link        text,
  published   boolean default false,
  display_order integer default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- 3. SERVICES
create table if not exists public.services (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  slug        text not null unique,
  description text,
  capabilities text[],
  published   boolean default false,
  display_order integer default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- 4. TESTIMONIALS
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



-- 6. PROJECT_SERVICES (Junction Table)
create table if not exists public.project_services (
  project_id uuid not null references public.projects(id) on delete cascade,
  service_id uuid not null references public.services(id) on delete cascade,
  primary key (project_id, service_id),
  created_at timestamptz not null default now()
);

create index if not exists idx_project_services_project_id on public.project_services(project_id);
create index if not exists idx_project_services_service_id on public.project_services(service_id);

-- 7. FAQS
create table if not exists public.faqs (
  id          uuid primary key default gen_random_uuid(),
  question    text not null,
  answer      text not null,
  published   boolean default false,
  display_order integer default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- 8. TAGS
create table if not exists public.tags (
  id          uuid primary key default gen_random_uuid(),
  name        text not null unique,
  slug        text not null unique,
  description text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists idx_tags_slug on public.tags(slug);

-- 9. ARTICLE_TAGS (Junction Table)
create table if not exists public.article_tags (
  article_id uuid not null references public.articles(id) on delete cascade,
  tag_id     uuid not null references public.tags(id) on delete cascade,
  primary key (article_id, tag_id),
  created_at timestamptz not null default now()
);

create index if not exists idx_article_tags_article_id on public.article_tags(article_id);
create index if not exists idx_article_tags_tag_id on public.article_tags(tag_id);

-- RLS POLICIES
-- Enable RLS
alter table public.articles enable row level security;
alter table public.projects enable row level security;
alter table public.services enable row level security;
alter table public.testimonials enable row level security;
alter table public.project_services enable row level security;
alter table public.faqs enable row level security;
alter table public.tags enable row level security;
alter table public.article_tags enable row level security;

-- Policy Generator Macro (Conceptual) - Applying manually for clarity

-- ARTICLES
create policy "Articles are viewable by everyone"
on public.articles for select
to anon, authenticated
using (true);

create policy "Articles are insertable by admin only"
on public.articles for insert
to authenticated
with check (public.is_admin());

create policy "Articles are updateable by admin only"
on public.articles for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "Articles are deletable by admin only"
on public.articles for delete
to authenticated
using (public.is_admin());

-- PROJECTS
create policy "Projects are viewable by everyone"
on public.projects for select
to anon, authenticated
using (true);

create policy "Projects are insertable by admin only"
on public.projects for insert
to authenticated
with check (public.is_admin());

create policy "Projects are updateable by admin only"
on public.projects for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "Projects are deletable by admin only"
on public.projects for delete
to authenticated
using (public.is_admin());

-- SERVICES
create policy "Services are viewable by everyone"
on public.services for select
to anon, authenticated
using (true);

create policy "Services are insertable by admin only"
on public.services for insert
to authenticated
with check (public.is_admin());

create policy "Services are updateable by admin only"
on public.services for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "Services are deletable by admin only"
on public.services for delete
to authenticated
using (public.is_admin());

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



-- PROJECT_SERVICES
create policy "Project services are viewable by everyone"
on public.project_services for select
to anon, authenticated
using (true);

create policy "Project services are insertable by admin only"
on public.project_services for insert
to authenticated
with check (public.is_admin());

create policy "Project services are updateable by admin only"
on public.project_services for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "Project services are deletable by admin only"
on public.project_services for delete
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

-- TAGS
create policy "Tags are viewable by everyone"
on public.tags for select
to anon, authenticated
using (true);

create policy "Tags are insertable by admin only"
on public.tags for insert
to authenticated
with check (public.is_admin());

create policy "Tags are updateable by admin only"
on public.tags for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "Tags are deletable by admin only"
on public.tags for delete
to authenticated
using (public.is_admin());

-- ARTICLE_TAGS
create policy "Article tags are viewable by everyone"
on public.article_tags for select
to anon, authenticated
using (true);

create policy "Article tags are insertable by admin only"
on public.article_tags for insert
to authenticated
with check (public.is_admin());

create policy "Article tags are updateable by admin only"
on public.article_tags for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "Article tags are deletable by admin only"
on public.article_tags for delete
to authenticated
using (public.is_admin());

