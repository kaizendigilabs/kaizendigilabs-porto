/**
 * CORE SETUP
 *
 * This migration establishes the base extensions and helper functions.
 *
 * CONTENTS:
 * 1. Extensions: pg_trgm.
 * 2. Helpers: tg_set_updated_at, has_role, is_admin, tg_guard_last_admin.
 */

-- 1. EXTENSIONS
create extension if not exists "pg_trgm" with schema extensions;

-- 2. HELPERS

-- Trigger to update updated_at
create or replace function public.tg_set_updated_at()
returns trigger language plpgsql set search_path = public as $$
begin
  new.updated_at := now();
  return new;
end$$;

-- RBAC Helpers
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

-- Grant execute permissions
grant execute on function public.has_role(uuid, text) to authenticated;
grant execute on function public.is_admin() to authenticated;
