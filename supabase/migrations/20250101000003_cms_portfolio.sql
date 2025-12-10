/**
 * CMS: PORTFOLIO
 *
 * This migration establishes the portfolio and services system.
 *
 * CONTENTS:
 * 1. Services: Company offerings.
 * 2. Testimonials: Client feedback.
 * 3. Projects: Portfolio items (Linked to Testimonials).
 * 4. Project Services: Junction table.
 * 5. RLS Policies: Row Level Security.
 * 6. Views Tracking: Logic for counting views.
 */

-- 1. SERVICES
create table if not exists public.services (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  slug        text not null unique,
  description text,
  capabilities text[],
  published   boolean default false,
  views       integer default 0 not null, -- Total pageviews for analytics
  display_order integer default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- 2. TESTIMONIALS
create table if not exists public.testimonials (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  role        text,
  company     text,
  content     text not null,
  published   boolean default false,
  display_order integer default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- 3. PROJECTS
create table if not exists public.projects (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  slug        text not null unique,
  description text,
  testimonial_id uuid references public.testimonials(id), -- Linked client info
  year        text,
  tech_stack  text[], -- Array of technologies used
  image_url   text,
  project_link text,
  published   boolean default false,
  views       integer default 0 not null, -- Total pageviews for analytics
  display_order integer default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- 4. PROJECT_SERVICES (Junction Table)
create table if not exists public.project_services (
  project_id uuid not null references public.projects(id) on delete cascade,
  service_id uuid not null references public.services(id) on delete cascade,
  primary key (project_id, service_id),
  created_at timestamptz not null default now()
);

create index if not exists idx_project_services_project_id on public.project_services(project_id);
create index if not exists idx_project_services_service_id on public.project_services(service_id);
create index if not exists idx_projects_testimonial_id on public.projects(testimonial_id);

-- 5. RLS POLICIES
alter table public.services enable row level security;
alter table public.testimonials enable row level security;
alter table public.projects enable row level security;
alter table public.project_services enable row level security;

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

-- 6. VIEWS TRACKING

CREATE INDEX IF NOT EXISTS idx_projects_views 
ON public.projects(views DESC) 
WHERE published = true;

CREATE INDEX IF NOT EXISTS idx_services_views 
ON public.services(views DESC);

-- Database functions for atomic view increments
CREATE OR REPLACE FUNCTION increment_project_views(project_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE public.projects 
  SET views = views + 1 
  WHERE id = project_id AND published = true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION increment_service_views(service_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE public.services 
  SET views = views + 1 
  WHERE id = service_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Grant execute permissions (public can increment)
GRANT EXECUTE ON FUNCTION increment_project_views TO anon, authenticated;
GRANT EXECUTE ON FUNCTION increment_service_views TO anon, authenticated;

-- Documentation comments
COMMENT ON COLUMN public.projects.views IS 'Total pageviews for analytics and popular projects';
COMMENT ON COLUMN public.services.views IS 'Total pageviews for analytics';

COMMENT ON FUNCTION increment_project_views IS 'Atomic increment of project views counter (called after 3s delay)';
COMMENT ON FUNCTION increment_service_views IS 'Atomic increment of service views counter (called after 3s delay)';
