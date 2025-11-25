-- Seed Data for Kaizen Digital Labs
-- Usage: Run this script in the Supabase SQL Editor

-- ==========================================
-- 1. Services Seeding
-- ==========================================
INSERT INTO services (slug, title, description, capabilities, published, display_order, views)
VALUES
  (
    'digital-strategy',
    'Digital Strategy',
    'We build the foundation for your digital growth. Through in-depth market research and data-driven insights, we craft strategies that align with your business goals.',
    ARRAY['Market Research', 'Brand Positioning', 'Content Strategy', 'SEO & SEM', 'Social Media Strategy'],
    true,
    1,
    0
  ),
  (
    'brand-identity',
    'Brand Identity',
    'Your brand is more than just a logo. We create cohesive visual identities that tell your story and resonate with your audience across all touchpoints.',
    ARRAY['Logo Design', 'Visual Systems', 'Brand Guidelines', 'Typography', 'Art Direction'],
    true,
    2,
    0
  ),
  (
    'web-development',
    'Web Development',
    'We engineer high-performance websites that are beautiful, responsive, and built to scale. Using the latest technologies to ensure speed and security.',
    ARRAY['Custom Development', 'E-Commerce', 'CMS Integration', 'Performance Optimization', 'Web Applications'],
    true,
    3,
    0
  ),
  (
    'mobile-apps',
    'Mobile Apps',
    'Extend your reach with native and cross-platform mobile applications. We design intuitive interfaces and seamless user experiences for iOS and Android.',
    ARRAY['iOS & Android', 'React Native', 'UI/UX Design', 'App Store Optimization', 'Maintenance'],
    true,
    4,
    0
  )
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  capabilities = EXCLUDED.capabilities,
  published = EXCLUDED.published,
  display_order = EXCLUDED.display_order,
  views = EXCLUDED.views;

-- ==========================================
-- 2. Projects Seeding
-- ==========================================
INSERT INTO projects (title, slug, category, year, image_url, client, description, published, link, display_order, views)
VALUES
  (
    'Batik Nusantara Online',
    'batik-nusantara-online',
    'E-Commerce',
    '2024',
    '/images/placeholder.svg',
    'Batik Nusantara',
    'A modern e-commerce platform designed to help local batik artisans reach a global audience. Features include a seamless checkout process, inventory management, and a visual storytelling approach to showcase the heritage behind each pattern.',
    true,
    'https://example.com/batik',
    1,
    0
  ),
  (
    'EduSmart Academy LMS',
    'edusmart-academy-lms',
    'Education',
    '2024',
    '/images/placeholder.svg',
    'EduSmart Foundation',
    'A comprehensive Learning Management System (LMS) for a forward-thinking educational institution. The platform supports interactive lessons, student progress tracking, and automated assessments, fostering a more engaging learning environment.',
    true,
    'https://example.com/edusmart',
    2,
    0
  ),
  (
    'GreenEnergy Corp Profile',
    'greenenergy-corp-profile',
    'Corporate',
    '2023',
    '/images/placeholder.svg',
    'GreenEnergy Corp',
    'A sleek and professional corporate website for a renewable energy leader. The design emphasizes sustainability and innovation, featuring interactive data visualizations of energy impact and a robust investor relations section.',
    true,
    'https://example.com/greenenergy',
    3,
    0
  ),
  (
    'HealthTrack Mobile App',
    'healthtrack-mobile-app',
    'Mobile App',
    '2025',
    '/images/placeholder.svg',
    'HealthTrack Inc.',
    'A cross-platform mobile application for personal health monitoring. Users can track workouts, nutrition, and sleep patterns. The app integrates with wearable devices and provides personalized health insights using AI.',
    true,
    'https://example.com/healthtrack',
    4,
    0
  )
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  year = EXCLUDED.year,
  image_url = EXCLUDED.image_url,
  client = EXCLUDED.client,
  description = EXCLUDED.description,
  published = EXCLUDED.published,
  link = EXCLUDED.link,
  display_order = EXCLUDED.display_order,
  views = EXCLUDED.views;

-- ==========================================
-- 3. Project Services Seeding (Junction)
-- ==========================================
-- Clear existing links for seeded projects to avoid duplicates/conflicts if re-running without reset
DELETE FROM project_services 
WHERE project_id IN (SELECT id FROM projects WHERE slug IN ('batik-nusantara-online', 'edusmart-academy-lms', 'greenenergy-corp-profile', 'healthtrack-mobile-app'));

INSERT INTO project_services (project_id, service_id)
SELECT p.id, s.id
FROM projects p, services s
WHERE 
  (p.slug = 'batik-nusantara-online' AND s.slug IN ('web-development', 'digital-strategy')) OR
  (p.slug = 'edusmart-academy-lms' AND s.slug IN ('web-development', 'mobile-apps')) OR
  (p.slug = 'greenenergy-corp-profile' AND s.slug IN ('web-development', 'brand-identity')) OR
  (p.slug = 'healthtrack-mobile-app' AND s.slug IN ('mobile-apps', 'digital-strategy'));


-- ==========================================
-- 4. Tags Seeding
-- ==========================================
INSERT INTO tags (name, slug, description)
VALUES
  ('Kaizen', 'kaizen', 'Continuous improvement philosophy'),
  ('Agile', 'agile', 'Agile development methodology'),
  ('Development', 'development', 'Software development topics'),
  ('UMKM', 'umkm', 'Micro, Small, and Medium Enterprises'),
  ('Digital Transformation', 'digital-transformation', 'Digitizing business processes'),
  ('Business Growth', 'business-growth', 'Strategies for growing business'),
  ('EdTech', 'edtech', 'Educational Technology'),
  ('Education', 'education', 'General education topics'),
  ('Innovation', 'innovation', 'New ideas and methods')
ON CONFLICT (slug) DO NOTHING;

-- ==========================================
-- 5. Articles Seeding
-- ==========================================
-- We use a CTE to fetch the first admin to assign as author
WITH first_admin AS (
  SELECT u.id
  FROM auth.users u
  JOIN public.profiles p ON p.user_id = u.id
  JOIN public.user_roles ur ON ur.user_id = p.user_id
  JOIN public.roles r ON r.id = ur.role_id
  WHERE r.name = 'admin'
  ORDER BY u.created_at ASC, u.id ASC
  LIMIT 1
),
-- Update the admin profile to ensure it's visible and has data
update_admin_profile AS (
  UPDATE public.profiles
  SET 
    status = 'active',
    full_name = COALESCE(full_name, 'Kaizen Admin'),
    avatar = COALESCE(avatar, '/images/placeholder.svg'),
    job_title = COALESCE(job_title, 'Administrator')
  WHERE user_id = (SELECT id FROM first_admin)
  RETURNING user_id
)
INSERT INTO articles (slug, title, excerpt, author_id, published, display_order, image_url, content, views)
SELECT
  slug,
  title,
  excerpt,
  (SELECT id FROM first_admin), -- Use the first admin found
  published,
  display_order,
  image_url,
  content,
  views
FROM (VALUES
  (
    'why-continuous-improvement-matters',
    'Why Continuous Improvement Matters in Digital Development',
    'Explore how the philosophy of Kaizen can transform your digital product development process, ensuring long-term success and adaptability.',
    true,
    1,
    '/images/placeholder.svg',
    '{"type": "doc", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "In the fast-paced world of digital technology, standing still is equivalent to moving backward. This is where the philosophy of Kaizen—continuous improvement—becomes vital. By focusing on small, consistent changes, businesses can achieve significant growth over time."}]}]}'::jsonb,
    0
  ),
  (
    'digital-transformation-for-umkm',
    'Digital Transformation for UMKM: Where to Start?',
    'A practical guide for Micro, Small, and Medium Enterprises (UMKM) in Indonesia to begin their digital transformation journey effectively.',
    true,
    2,
    '/images/placeholder.svg',
    '{"type": "doc", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "For many UMKMs, going digital can seem daunting. However, it doesn''t have to be. Starting with a strong digital identity and leveraging social media can open doors to new markets. This article outlines the first steps to take."}]}]}'::jsonb,
    0
  ),
  (
    'future-of-edtech-indonesia',
    'The Future of EdTech in Indonesia',
    'Analyzing the trends and technologies that are shaping the future of education in Indonesia, from LMS to interactive learning apps.',
    true,
    3,
    '/images/placeholder.svg',
    '{"type": "doc", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Education technology is revolutionizing how we learn. In Indonesia, the adoption of LMS and mobile learning apps is bridging the gap between urban and rural education, providing equal opportunities for all students."}]}]}'::jsonb,
    0
  )
) AS data(slug, title, excerpt, published, display_order, image_url, content, views)
WHERE (SELECT id FROM first_admin) IS NOT NULL
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  author_id = EXCLUDED.author_id,
  published = EXCLUDED.published,
  display_order = EXCLUDED.display_order,
  image_url = EXCLUDED.image_url,
  content = EXCLUDED.content,
  views = EXCLUDED.views;

-- ==========================================
-- 6. Article Tags Seeding (Junction)
-- ==========================================
-- Clear existing links
DELETE FROM article_tags
WHERE article_id IN (SELECT id FROM articles WHERE slug IN ('why-continuous-improvement-matters', 'digital-transformation-for-umkm', 'future-of-edtech-indonesia'));

INSERT INTO article_tags (article_id, tag_id)
SELECT a.id, t.id
FROM articles a, tags t
WHERE
  (a.slug = 'why-continuous-improvement-matters' AND t.slug IN ('kaizen', 'agile', 'development')) OR
  (a.slug = 'digital-transformation-for-umkm' AND t.slug IN ('umkm', 'digital-transformation', 'business-growth')) OR
  (a.slug = 'future-of-edtech-indonesia' AND t.slug IN ('edtech', 'education', 'innovation'));

-- ==========================================
-- 7. Testimonials Seeding
-- ==========================================
INSERT INTO testimonials (name, role, company, content, display_order, published, rating)
VALUES
  (
    'Budi Santoso',
    'Owner',
    'Batik Warisan',
    'Kaizen Digital Labs helped us transform our traditional batik business into a modern online brand. Their understanding of our heritage and digital trends was impressive.',
    1,
    true,
    5
  ),
  (
    'Sarah Wijaya',
    'Principal',
    'Global Mandiri School',
    'The LMS platform developed by Kaizen has revolutionized how our teachers and students interact. It is intuitive, fast, and reliable.',
    2,
    true,
    5
  ),
  (
    'Michael Tan',
    'CEO',
    'TechStart Indonesia',
    'Professional, responsive, and innovative. Kaizen Digital Labs is the partner you need for scaling your digital product.',
    3,
    true,
    5
  );
-- Note: No unique constraint on testimonials usually, so this might duplicate if run multiple times without reset.
-- Ideally, we'd have a slug or unique ID, but for now, we rely on reset-seed.sql to clear.

-- ==========================================
-- 8. FAQs Seeding
-- ==========================================
INSERT INTO faqs (question, answer, display_order, published)
VALUES
  (
    'What services do you offer?',
    'We offer a comprehensive range of digital services including Web & Mobile App Development, UI/UX Design, Digital Strategy, and Brand Identity creation.',
    1,
    true
  ),
  (
    'Do you work with small businesses?',
    'Absolutely! One of our core missions is to help UMKMs (Micro, Small, and Medium Enterprises) go digital. We have tailored packages specifically for small business needs.',
    2,
    true
  ),
  (
    'How long does a typical project take?',
    'Project timelines vary depending on complexity. A standard company profile website might take 2-4 weeks, while a custom mobile app or e-commerce platform could take 2-4 months. We provide detailed timelines during the discovery phase.',
    3,
    true
  ),
  (
    'Do you provide post-launch support?',
    'Yes, we believe in long-term partnerships. We offer various maintenance and support packages to ensure your digital product remains secure, up-to-date, and performs optimally.',
    4,
    true
  );

