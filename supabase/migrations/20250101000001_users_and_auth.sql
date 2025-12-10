/**
 * USERS AND AUTH
 *
 * This migration establishes profiles, roles, and user management.
 *
 * CONTENTS:
 * 1. Profiles: User profile data.
 * 2. RBAC: Roles and User_Roles tables.
 * 3. RLS: Policies for profiles and roles.
 */

-- 1. PROFILES
create table if not exists public.profiles (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  full_name  text,
  email      text,
  phone      text,
  avatar     text,
  job_title  text,
  bio        text,
  social_links jsonb default '{}'::jsonb,
  display_order integer,
  status     text check (status in ('active', 'inactive')) default 'inactive',
  last_login_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Indexes for profiles
create unique index if not exists idx_profiles_email_unique
  on public.profiles((lower(email)))
  where email is not null and email <> '';

create index if not exists idx_profiles_full_name_trgm
  on public.profiles
  using gin (full_name extensions.gin_trgm_ops);

create index if not exists idx_profiles_email_trgm
  on public.profiles
  using gin (email extensions.gin_trgm_ops);

-- Trigger to update updated_at (uses function from core_setup)
create trigger trg_profiles_updated_at
before update on public.profiles
for each row execute function public.tg_set_updated_at();

-- Trigger to auto-create profile on signup
create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql security definer set search_path = public as $$
declare v_avatar text; v_full_name text;
begin
  if new.raw_user_meta_data ? 'avatar' then v_avatar := new.raw_user_meta_data->>'avatar'; end if;
  if new.raw_user_meta_data ? 'full_name' then v_full_name := new.raw_user_meta_data->>'full_name'; end if;

  insert into public.profiles (user_id, full_name, email, avatar, status)
  values (new.id, v_full_name, new.email, v_avatar, 'active')
  on conflict (user_id) do nothing;

  return new;
end$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_auth_user();

-- Trigger to sync email changes
create or replace function public.sync_profile_email()
returns trigger
language plpgsql security definer set search_path = public as $$
begin
  update public.profiles
    set email = new.email, updated_at = now()
    where user_id = new.id;
  return new;
end$$;

create trigger on_auth_user_updated_email
after update of email on auth.users
for each row execute function public.sync_profile_email();


-- 2. RBAC (Roles & User Roles)
create table if not exists public.roles (
  id   uuid primary key default gen_random_uuid(),
  name text not null unique
);

create table if not exists public.user_roles (
  user_id uuid primary key references public.profiles(user_id) on delete cascade,
  role_id uuid not null references public.roles(id) on delete restrict
);

create index if not exists idx_user_roles_role_id on public.user_roles(role_id);
create index if not exists idx_roles_name on public.roles(name);

create trigger trg_guard_last_admin
before delete or update of role_id on public.user_roles
for each row execute function public.tg_guard_last_admin();


-- 3. RLS POLICIES
alter table public.profiles enable row level security;
alter table public.roles enable row level security;
alter table public.user_roles enable row level security;

-- Profiles Policies
create policy "Profiles are viewable"
on public.profiles for select
to public
using (
  status = 'active' 
  or ((select auth.uid()) = user_id) 
  or ((select auth.role()) = 'authenticated' and public.is_admin())
);

create policy "Profiles are updateable by owner or admin"
on public.profiles for update
to authenticated
using (
  (select auth.uid()) = user_id or public.is_admin()
)
with check (
  (select auth.uid()) = user_id or public.is_admin()
);

-- Roles Policies (Read: Authenticated, Write: Admin only)
create policy "Roles are viewable by authenticated users"
on public.roles for select
to authenticated
using (true);

create policy "Roles are insertable by admin only"
on public.roles for insert
to authenticated
with check (public.is_admin());

create policy "Roles are updateable by admin only"
on public.roles for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "Roles are deletable by admin only"
on public.roles for delete
to authenticated
using (public.is_admin());

-- User Roles Policies (Read: Owner/Admin, Write: Admin only)
create policy "User roles are viewable by owner or admin"
on public.user_roles for select
to authenticated
using (
  (select auth.uid()) = user_id or public.is_admin()
);

create policy "User roles are insertable by admin only"
on public.user_roles for insert
to authenticated
with check (public.is_admin());

create policy "User roles are updateable by admin only"
on public.user_roles for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "User roles are deletable by admin only"
on public.user_roles for delete
to authenticated
using (public.is_admin());
