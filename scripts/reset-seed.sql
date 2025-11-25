-- Reset Seed Data
-- Usage: Run this script in the Supabase SQL Editor to clear all content tables.
-- WARNING: This will delete all data in the listed tables!
-- Note: Users table is preserved.

TRUNCATE TABLE analytics CASCADE;
TRUNCATE TABLE faqs CASCADE;
TRUNCATE TABLE team_members CASCADE;
TRUNCATE TABLE testimonials CASCADE;
TRUNCATE TABLE inquiries CASCADE;
TRUNCATE TABLE services CASCADE;
TRUNCATE TABLE projects CASCADE;
TRUNCATE TABLE articles CASCADE;
