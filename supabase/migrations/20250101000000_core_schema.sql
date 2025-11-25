/**
 * CORE SCHEMA
 *
 * This migration establishes the core identity and access management (IAM) layer.
 *
 * CONTENTS:
 * 1. Extensions: pg_trgm for fuzzy search.
 * 2. Profiles: User profile data synced with auth.users.
 * 3. RBAC: Roles and User_Roles tables for permission management.
 * 4. Security: Helper functions (has_role, is_admin) and strict RLS policies.
 *
 * SECURITY NOTES:
 * - All helper functions use SECURITY DEFINER and SET search_path = public.
 * - RLS is enabled on all tables.
 * - Public access is denied by default; explicit policies grant access.
 * - Admin role is required for sensitive operations.
 */

-- 1. EXTENSIONS
create extension if not exists "pg_trgm" with schema extensions;

-- 2. PROFILES
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

-- Trigger to update updated_at
create or replace function public.tg_set_updated_at()
returns trigger language plpgsql set search_path = public as $$
begin
  new.updated_at := now();
  return new;
end$$;

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


-- 3. RBAC (Roles & User Roles)
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


-- 4. SECURITY HELPERS
create or replace function public.has_role(uid uuid, role_name text)
returns boolean
language plpgsql
security definer
set search_path = public
stable
as $$
begin
  return exists (
    select 1
    from public.user_roles ur
    join public.roles r on r.id = ur.role_id
    where ur.user_id = uid
      and r.name = role_name
  );
end;
$$;

create or replace function public.is_admin()
returns boolean
language plpgsql
security definer
set search_path = public
stable
as $$
begin
  return public.has_role((select auth.uid()), 'admin');
end;
$$;

-- Guard: Prevent deleting the last admin
create or replace function public.tg_guard_last_admin()
returns trigger language plpgsql security definer set search_path=public as $$
declare v_admin_role_id uuid; v_count int;
begin
  select id into v_admin_role_id from public.roles where name='admin' limit 1;

  -- Only check if we are touching admin roles
  if (tg_op = 'DELETE' and old.role_id = v_admin_role_id) or 
     (tg_op = 'UPDATE' and old.role_id = v_admin_role_id and new.role_id <> v_admin_role_id) then
     
    select count(*) into v_count
    from public.user_roles
    where role_id = v_admin_role_id;

    if v_count <= 1 then
      raise exception 'Cannot remove the last admin user.';
    end if;
  end if;

  if tg_op = 'DELETE' then return old; end if;
  return new;
end$$;

create trigger trg_guard_last_admin
before delete or update of role_id on public.user_roles
for each row execute function public.tg_guard_last_admin();

-- Grant execute permissions
grant execute on function public.has_role(uuid, text) to authenticated;
grant execute on function public.is_admin() to authenticated;


-- 5. RLS POLICIES
alter table public.profiles enable row level security;
alter table public.roles enable row level security;
alter table public.user_roles enable row level security;

-- Profiles Policies
create policy "Profiles are viewable by owner or admin"
on public.profiles for select
to authenticated
using (
  (select auth.uid()) = user_id or public.is_admin()
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

create policy "Public can view active profiles"
on public.profiles for select
to public
using (status = 'active');

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
