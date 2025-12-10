/**
 * CMS: ARTICLE
 *
 * This migration establishes the article system.
 *
 * CONTENTS:
 * 1. Tags: Content tagging.
 * 2. Articles: Article posts.
 * 3. Article Tags: Junction table.
 * 4. RLS Policies: Row Level Security.
 * 5. Views Tracking: Logic for counting views.
 */

-- 1. TAGS
create table if not exists public.tags (
  id          uuid primary key default gen_random_uuid(),
  name        text not null unique,
  slug        text not null unique,
  description text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists idx_tags_slug on public.tags(slug);

-- 2. ARTICLES
create table if not exists public.articles (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  slug        text not null unique,
  content     jsonb, -- Tiptap JSON
  excerpt     text,
  image_url   text,
  author_id   uuid references public.profiles(user_id),
  published   boolean default false,
  views       integer default 0 not null, -- Total pageviews for public display
  display_order integer default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Index for author lookup performance
CREATE INDEX IF NOT EXISTS idx_articles_author_id ON public.articles(author_id);

-- 3. ARTICLE_TAGS (Junction Table)
create table if not exists public.article_tags (
  article_id uuid not null references public.articles(id) on delete cascade,
  tag_id     uuid not null references public.tags(id) on delete cascade,
  primary key (article_id, tag_id),
  created_at timestamptz not null default now()
);

create index if not exists idx_article_tags_article_id on public.article_tags(article_id);
create index if not exists idx_article_tags_tag_id on public.article_tags(tag_id);

-- 4. RLS POLICIES
alter table public.articles enable row level security;
alter table public.tags enable row level security;
alter table public.article_tags enable row level security;

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


-- 5. VIEWS TRACKING
-- Indexes for views sorting (Top Insights, Popular content)
CREATE INDEX IF NOT EXISTS idx_articles_views 
ON public.articles(views DESC) 
WHERE published = true;

-- Database functions for atomic view increments
CREATE OR REPLACE FUNCTION increment_article_views(article_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE public.articles 
  SET views = views + 1 
  WHERE id = article_id AND published = true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Grant execute permissions (public can increment)
GRANT EXECUTE ON FUNCTION increment_article_views TO anon, authenticated;

-- Documentation comments
COMMENT ON COLUMN public.articles.views IS 'Total pageviews for public display (Top Insights, article cards)';
COMMENT ON FUNCTION increment_article_views IS 'Atomic increment of article views counter (called after 3s delay)';
