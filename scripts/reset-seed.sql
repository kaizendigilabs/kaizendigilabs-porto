-- Reset Seed Data
-- Usage: Run this script in the Supabase SQL Editor to clear all content tables.
-- WARNING: This will delete all data in the listed tables!
-- Note: Users table is preserved.

TRUNCATE TABLE analytics CASCADE;
TRUNCATE TABLE faqs CASCADE;
TRUNCATE TABLE testimonials CASCADE;
TRUNCATE TABLE inquiries CASCADE;
TRUNCATE TABLE project_services CASCADE;
TRUNCATE TABLE services CASCADE;
TRUNCATE TABLE projects CASCADE;
TRUNCATE TABLE article_tags CASCADE;
TRUNCATE TABLE tags CASCADE;
TRUNCATE TABLE articles CASCADE;
-- Note: profiles and roles are part of core schema and might be linked to auth.users, so we handle them carefully or leave them if not needed for content reset.
-- If you want to reset profiles (except the user itself), you'd need more complex logic.
-- For now, we focus on content tables.
