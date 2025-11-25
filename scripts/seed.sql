-- Seed Data for Kaizen Digital Labs
-- Usage: Run this script in the Supabase SQL Editor

-- ==========================================
-- 1. Services Seeding
-- ==========================================
INSERT INTO services (slug, title, description, capabilities, icon)
VALUES
  (
    'digital-strategy',
    'Digital Strategy',
    'We build the foundation for your digital growth. Through in-depth market research and data-driven insights, we craft strategies that align with your business goals.',
    ARRAY['Market Research', 'Brand Positioning', 'Content Strategy', 'SEO & SEM', 'Social Media Strategy'],
    'LineChart'
  ),
  (
    'brand-identity',
    'Brand Identity',
    'Your brand is more than just a logo. We create cohesive visual identities that tell your story and resonate with your audience across all touchpoints.',
    ARRAY['Logo Design', 'Visual Systems', 'Brand Guidelines', 'Typography', 'Art Direction'],
    'Palette'
  ),
  (
    'web-development',
    'Web Development',
    'We engineer high-performance websites that are beautiful, responsive, and built to scale. Using the latest technologies to ensure speed and security.',
    ARRAY['Custom Development', 'E-Commerce', 'CMS Integration', 'Performance Optimization', 'Web Applications'],
    'Code'
  ),
  (
    'mobile-apps',
    'Mobile Apps',
    'Extend your reach with native and cross-platform mobile applications. We design intuitive interfaces and seamless user experiences for iOS and Android.',
    ARRAY['iOS & Android', 'React Native', 'UI/UX Design', 'App Store Optimization', 'Maintenance'],
    'Smartphone'
  )
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  capabilities = EXCLUDED.capabilities,
  icon = EXCLUDED.icon;

-- ==========================================
-- 2. Projects Seeding
-- ==========================================
INSERT INTO projects (title, slug, category, year, image_url, size, client, description, services, images, published, link)
VALUES
  (
    'Batik Nusantara Online',
    'batik-nusantara-online',
    'E-Commerce',
    '2024',
    'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=2056&auto=format&fit=crop',
    'Full Width',
    'Batik Nusantara',
    'A modern e-commerce platform designed to help local batik artisans reach a global audience. Features include a seamless checkout process, inventory management, and a visual storytelling approach to showcase the heritage behind each pattern.',
    ARRAY['Web Development', 'UI/UX Design', 'Digital Strategy'],
    ARRAY['https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=2056&auto=format&fit=crop'],
    true,
    'https://example.com/batik'
  ),
  (
    'EduSmart Academy LMS',
    'edusmart-academy-lms',
    'Education',
    '2024',
    'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1974&auto=format&fit=crop',
    'Half Width',
    'EduSmart Foundation',
    'A comprehensive Learning Management System (LMS) for a forward-thinking educational institution. The platform supports interactive lessons, student progress tracking, and automated assessments, fostering a more engaging learning environment.',
    ARRAY['Web Development', 'Mobile Apps', 'UI/UX Design'],
    ARRAY['https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1974&auto=format&fit=crop'],
    true,
    'https://example.com/edusmart'
  ),
  (
    'GreenEnergy Corp Profile',
    'greenenergy-corp-profile',
    'Corporate',
    '2023',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop',
    'Half Width',
    'GreenEnergy Corp',
    'A sleek and professional corporate website for a renewable energy leader. The design emphasizes sustainability and innovation, featuring interactive data visualizations of energy impact and a robust investor relations section.',
    ARRAY['Web Development', 'Brand Identity', 'Digital Strategy'],
    ARRAY['https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop'],
    true,
    'https://example.com/greenenergy'
  ),
  (
    'HealthTrack Mobile App',
    'healthtrack-mobile-app',
    'Mobile App',
    '2025',
    'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop',
    'Full Width',
    'HealthTrack Inc.',
    'A cross-platform mobile application for personal health monitoring. Users can track workouts, nutrition, and sleep patterns. The app integrates with wearable devices and provides personalized health insights using AI.',
    ARRAY['Mobile Apps', 'UI/UX Design', 'Digital Strategy'],
    ARRAY['https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop'],
    true,
    'https://example.com/healthtrack'
  )
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  year = EXCLUDED.year,
  image_url = EXCLUDED.image_url,
  size = EXCLUDED.size,
  client = EXCLUDED.client,
  description = EXCLUDED.description,
  services = EXCLUDED.services,
  images = EXCLUDED.images,
  published = EXCLUDED.published,
  link = EXCLUDED.link;

-- ==========================================
-- 3. Articles Seeding
-- ==========================================
-- We use a CTE to fetch the first user to assign as author
WITH first_user AS (
  SELECT id, email FROM auth.users ORDER BY created_at ASC LIMIT 1
)
INSERT INTO articles (slug, title, excerpt, category, author, date, read_time, views, likes, comments, image_url, hero_image, tags, author_info, content, published)
SELECT
  slug,
  title,
  excerpt,
  category,
  COALESCE((SELECT email FROM first_user), 'admin@kaizendigilabs.com'), -- Fallback if no user exists
  date,
  read_time,
  views,
  likes,
  comments,
  image_url,
  hero_image,
  tags,
  jsonb_build_object(
    'name', 'Kaizen Team',
    'avatar', 'https://github.com/shadcn.png',
    'role', 'Editor'
  ),
  content,
  published
FROM (VALUES
  (
    'why-continuous-improvement-matters',
    'Why Continuous Improvement Matters in Digital Development',
    'Explore how the philosophy of Kaizen can transform your digital product development process, ensuring long-term success and adaptability.',
    'Philosophy',
    NOW() - INTERVAL '2 days',
    '5 min read',
    1250,
    45,
    12,
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop',
    ARRAY['Kaizen', 'Agile', 'Development'],
    '{"type": "doc", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "In the fast-paced world of digital technology, standing still is equivalent to moving backward. This is where the philosophy of Kaizen—continuous improvement—becomes vital. By focusing on small, consistent changes, businesses can achieve significant growth over time."}]}]}'::jsonb,
    true
  ),
  (
    'digital-transformation-for-umkm',
    'Digital Transformation for UMKM: Where to Start?',
    'A practical guide for Micro, Small, and Medium Enterprises (UMKM) in Indonesia to begin their digital transformation journey effectively.',
    'Business',
    NOW() - INTERVAL '5 days',
    '7 min read',
    3400,
    120,
    34,
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
    ARRAY['UMKM', 'Digital Transformation', 'Business Growth'],
    '{"type": "doc", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "For many UMKMs, going digital can seem daunting. However, it doesn''t have to be. Starting with a strong digital identity and leveraging social media can open doors to new markets. This article outlines the first steps to take."}]}]}'::jsonb,
    true
  ),
  (
    'future-of-edtech-indonesia',
    'The Future of EdTech in Indonesia',
    'Analyzing the trends and technologies that are shaping the future of education in Indonesia, from LMS to interactive learning apps.',
    'Technology',
    NOW() - INTERVAL '10 days',
    '6 min read',
    2100,
    89,
    21,
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop',
    ARRAY['EdTech', 'Education', 'Innovation'],
    '{"type": "doc", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Education technology is revolutionizing how we learn. In Indonesia, the adoption of LMS and mobile learning apps is bridging the gap between urban and rural education, providing equal opportunities for all students."}]}]}'::jsonb,
    true
  )
) AS data(slug, title, excerpt, category, date, read_time, views, likes, comments, image_url, hero_image, tags, content, published)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  category = EXCLUDED.category,
  author = EXCLUDED.author,
  date = EXCLUDED.date,
  read_time = EXCLUDED.read_time,
  views = EXCLUDED.views,
  likes = EXCLUDED.likes,
  comments = EXCLUDED.comments,
  image_url = EXCLUDED.image_url,
  hero_image = EXCLUDED.hero_image,
  tags = EXCLUDED.tags,
  author_info = EXCLUDED.author_info,
  content = EXCLUDED.content,
  published = EXCLUDED.published;

-- ==========================================
-- 4. Testimonials Seeding
-- ==========================================
-- Note: Testimonials table does not have a unique slug, so we use simple INSERTs.
-- To prevent duplicates on re-runs, you might want to clear the table first (optional):
-- TRUNCATE TABLE testimonials;

INSERT INTO testimonials (name, role, company, text, display_order, published)
VALUES
  (
    'Budi Santoso',
    'Owner',
    'Batik Warisan',
    'Kaizen Digital Labs helped us transform our traditional batik business into a modern online brand. Their understanding of our heritage and digital trends was impressive.',
    1,
    true
  ),
  (
    'Sarah Wijaya',
    'Principal',
    'Global Mandiri School',
    'The LMS platform developed by Kaizen has revolutionized how our teachers and students interact. It is intuitive, fast, and reliable.',
    2,
    true
  ),
  (
    'Michael Tan',
    'CEO',
    'TechStart Indonesia',
    'Professional, responsive, and innovative. Kaizen Digital Labs is the partner you need for scaling your digital product.',
    3,
    true
  );

-- ==========================================
-- 5. Team Members Seeding
-- ==========================================
-- Note: Team Members table does not have a unique slug.

INSERT INTO team_members (name, role, bio, image_url, linkedin_url, display_order, published)
VALUES
  (
    'Andi Pratama',
    'CEO & Founder',
    'Visionary leader with over 10 years of experience in software engineering and digital transformation. Passionate about empowering local businesses.',
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop',
    'https://linkedin.com/in/andipratama',
    1,
    true
  ),
  (
    'Siti Rahma',
    'Creative Director',
    'Award-winning designer with a keen eye for aesthetics and user experience. She ensures every pixel serves a purpose.',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop',
    'https://linkedin.com/in/sitirahma',
    2,
    true
  ),
  (
    'Rizky Fauzi',
    'Lead Developer',
    'Full-stack wizard who loves solving complex technical challenges. Expert in modern web technologies and scalable architecture.',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop',
    'https://linkedin.com/in/rizkyfauzi',
    3,
    true
  );

-- ==========================================
-- 6. FAQs Seeding
-- ==========================================
-- Note: FAQs table does not have a unique slug.

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
