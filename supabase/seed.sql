-- SEED DATA
-- This file is automatically applied by Supabase after migrations.

-- ROLES
insert into public.roles (name) values ('admin')
on conflict (name) do nothing;