-- ==========================================
-- 1) Services (upsert by slug)
-- ==========================================
INSERT INTO public.services (
  title, slug, description, capabilities, published, display_order, views, created_at, updated_at
) VALUES
(
  'Brand Identity',
  'brand-identity',
  'Your brand is more than just a logo. We craft cohesive visual identities that tell your story clearly and keep your business easy to recognize across every touchpoint. From logo to guidelines and everyday brand assets, we help you build a solid and consistent foundation for your brand.',
  ARRAY['Logo Design','Brand Guidelines','Stationery & Brand Assets']::text[],
  true,
  1,
  0,
  now(),
  now()
),
(
  'Digital Creative',
  'digital-creative',
  'We design and produce visual content that supports your campaigns and social media presence. Feeds, reels, short videos, posters, brochures, and annual reports are all created to stay on-brand and look professional, so your communication feels consistent wherever your audience finds you.',
  ARRAY['Social Media Content Design','Video Editing','Graphic Design']::text[],
  true,
  2,
  0,
  now(),
  now()
),
(
  'Mobile Apps Development',
  'mobile-apps-development',
  'We build mobile applications that are intuitive to use and reliable in daily operation. From concept to deployment, we design and develop apps for iOS and Android, both native and cross-platform, with smooth user journeys, strong backend integration, and ongoing maintenance to keep everything running properly.',
  ARRAY['iOS & Android App Development','Cross-platform Development','Mobile UI/UX Design','API & Backend Integration','Maintenance & Feature Updates']::text[],
  true,
  3,
  0,
  now(),
  now()
),
(
  'Web Development',
  'web-development',
  'We develop websites and web applications that are fast, secure, and ready to scale with your business. Company profiles, e-commerce platforms, admin dashboards, and CMS-based sites are built with both frontend and backend in mind, combined with performance optimization and cloud hosting to keep your product stable and always accessible.',
  ARRAY['Company Profile Websites','Web Applications','Admin Dashboards','E-Commerce','CMS Integrations','API & Backend Integration','Maintenance & Support','Performance Optimization']::text[],
  true,
  4,
  0,
  now(),
  now()
)
ON CONFLICT (slug) DO UPDATE
SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  capabilities = EXCLUDED.capabilities,
  published = EXCLUDED.published,
  display_order = EXCLUDED.display_order,
  views = EXCLUDED.views,
  updated_at = now();

-- ==========================================
-- 2) Projects (upsert by slug)
-- ADAPTATION: Removed 'client', 'category'. Mapped 'category' to 'services'.
-- ==========================================
INSERT INTO public.projects (
  title, slug, year, image_url, description, published, project_link, display_order, views, created_at, updated_at,
  tech_stack, services
) VALUES
(
  'Rumah Tahfidz Tabia',
  'rumah-tahfidz-tabia',
  '2025',
  'https://djqltmlgiabwsbqbbyfy.supabase.co/storage/v1/object/public/project-images/tabia-preview.webp',
  'A charity and education website for Rumah Tahfidz Tabia, a Quran memorization program that aims to build a Qur’anic generation and support orphans and underprivileged children. The site presents their vision, programs, and activities in a clear way, while making it easier for parents, donors, and the community to learn about the tahfidz house and get involved through registration and donations.',
  true,
  'https://rumahtahfidztabia.com/',
  1,
  0,
  now(),
  now(),
  ARRAY[]::text[], -- Initialize empty tech_stack
  ARRAY['Web Development']::text[] -- Mapped from old category
),
(
  'XPENG Indonesia',
  'xpeng-indonesia',
  '2025',
  'https://djqltmlgiabwsbqbbyfy.supabase.co/storage/v1/object/public/project-images/xpeng-preview.webp',
  'A marketing website for XPENG Indonesia that introduces XPENG’s smart electric vehicles to the local market with clear product information, pricing, and test drive booking. The site is built as a fast, mobile-first experience that highlights the brand’s technology and design while capturing leads through focused calls to action.',
  true,
  'https://www.xpeng-indonesia.id/',
  2,
  0,
  now(),
  now(),
  ARRAY[]::text[], -- Initialize empty tech_stack
  ARRAY['Web Development']::text[] -- Mapped from old category
)
ON CONFLICT (slug) DO UPDATE
SET
  title = EXCLUDED.title,
  year = EXCLUDED.year,
  image_url = EXCLUDED.image_url,
  description = EXCLUDED.description,
  published = EXCLUDED.published,
  project_link = EXCLUDED.project_link,
  display_order = EXCLUDED.display_order,
  views = EXCLUDED.views,
  -- We don't overwrite tech_stack or services if they exist, or should we?
  -- User said "data asli", implies these are the source of truth.
  -- But if we overwrite, we might lose manual edits. 
  -- For seed script re-runnability representing the "base state", refreshing 'services' from category map seems acceptable.
  services = EXCLUDED.services, 
  updated_at = now();

-- ==========================================
-- 3) Tags (upsert by slug)
-- ==========================================
INSERT INTO public.tags (name, slug, description, created_at, updated_at)
VALUES
  ('Kaizen (Seed)', 'kaizen', 'Seed tag for Kaizen', now(), now())
ON CONFLICT (slug) DO UPDATE
SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  updated_at = now();

-- ==========================================
-- 4) Articles (upsert by slug) — only if admin author exists
-- ==========================================
WITH first_admin AS (
  SELECT u.id
  FROM auth.users u
  JOIN public.profiles p ON p.user_id = u.id
  JOIN public.user_roles ur ON ur.user_id = p.user_id
  JOIN public.roles r ON r.id = ur.role_id
  WHERE r.name = 'admin'
  ORDER BY u.created_at ASC, u.id ASC
  LIMIT 1
)
INSERT INTO public.articles (
  slug, title, excerpt, author_id, published, display_order, image_url, content, views, created_at, updated_at
)
SELECT
  'why-continuous-improvement-matters'::text AS slug,
  'Why Continuous Improvement Matters in Digital Development (Seed)'::text AS title,
  'Seed excerpt: How Kaizen improves digital development.'::text AS excerpt,
  (SELECT id FROM first_admin) AS author_id,
  true AS published,
  1 AS display_order,
  '/images/placeholder.svg'::text AS image_url,
  ('{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Seed content for article."}]}]}'::jsonb) AS content,
  0 AS views,
  now() AS created_at,
  now() AS updated_at
WHERE (SELECT id FROM first_admin) IS NOT NULL
ON CONFLICT (slug) DO UPDATE
SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  author_id = EXCLUDED.author_id,
  published = EXCLUDED.published,
  display_order = EXCLUDED.display_order,
  image_url = EXCLUDED.image_url,
  content = EXCLUDED.content,
  views = EXCLUDED.views,
  updated_at = now();

-- ==========================================
-- 5) Link tag 'kaizen' ke article 'why-continuous-improvement-matters' (idempotent)
-- ==========================================
INSERT INTO public.article_tags (article_id, tag_id, created_at)
SELECT a.id, t.id, now()
FROM public.articles a
JOIN public.tags t ON t.slug = 'kaizen'
WHERE a.slug = 'why-continuous-improvement-matters'
ON CONFLICT (article_id, tag_id) DO NOTHING;

-- ==========================================
-- 6) Testimonials
-- ADAPTATION: Linked to Projects via slug.
-- Strategy: DELETE testimonials for these specific projects (by slug lookup) then INSERT.
-- This handles "replace" securely without relying on names.
-- ==========================================

-- Clean up testimonials for the seed projects to ensure fresh insert
DELETE FROM public.testimonials
WHERE project_id IN (
  SELECT id FROM public.projects 
  WHERE slug IN ('rumah-tahfidz-tabia', 'xpeng-indonesia')
);

INSERT INTO public.testimonials (
  project_id, name, role, company, content, display_order, published, created_at, updated_at
)
SELECT 
  p.id as project_id,
  t.name,
  t.role,
  t.company,
  t.content,
  t.display_order,
  t.published,
  now(),
  now()
FROM 
  public.projects p
JOIN 
  (VALUES 
    (
      'rumah-tahfidz-tabia', 
      'Rifqie Asyari Fadillah', 
      'Principal', 
      'SMK Bina Insan Mulia', 
      'The website is clean, fast, and easy to use, making it easier for people to understand our activities and get involved. We really appreciate the clear process and communication, and the result exceeded our expectations.', 
      1, 
      true
    ),
    (
      'xpeng-indonesia', 
      'Calvin', 
      'Premium Sales', 
      'XPENG Indonesia', 
      'Good and professional work — I’m very satisfied with the final website.', 
      2, 
      true
    )
  ) AS t(slug, name, role, company, content, display_order, published)
ON p.slug = t.slug;

-- ==========================================
-- 7) FAQs
-- Strategy: DELETE existing FAQ with same question then INSERT (ensures replace)
-- ==========================================
DELETE FROM public.faqs
WHERE question IN (
  'What services do you offer?',
  'Do you work with small businesses?',
  'How much does a project cost?',
  'How do we get started?',
  'How long does a typical project take?',
  'Do you also provide content (text, photos, copywriting)?',
  'Who owns the design and source code after the project is completed?',
  'Do you provide post-launch support?',
  'Can you improve or redesign an existing website or app?',
  'Do you work with clients outside your city or country?'
);

INSERT INTO public.faqs (
  question, answer, published, display_order, created_at, updated_at
) VALUES
(
  'What services do you offer?',
  'We offer a comprehensive range of digital services including Web Development, Mobile Apps Development, Digital Creative, UI/UX Design, and Brand Identity.',
  true, 1, now(), now()
),
(
  'Do you work with small businesses?',
  'Absolutely. One of our core missions is to help Micro, Small, and Medium Enterprises (MSMEs) go digital. We offer tailored packages specifically designed for small business needs.',
  true, 2, now(), now()
),
(
  'How much does a project cost?',
  'It depends on the scope and complexity of the project. We don’t offer “one-price-for-all” packages, but we do provide transparent proposals with a breakdown of features, timelines, and costs. For reference, a basic company profile website usually takes a smaller budget range, while custom web or mobile apps are estimated based on features and integrations.',
  true, 3, now(), now()
),
(
  'How do we get started?',
  'First, we schedule a short discovery call to understand your goals, target audience, and requirements. Then we prepare a proposal containing the scope, timeline, and cost. Once everything is agreed and the initial payment is made, we move into design, development, testing, and launch with regular check-ins along the way.',
  true, 4, now(), now()
),
(
  'How long does a typical project take?',
  'Project timelines vary depending on complexity. A standard company profile website might take around 2–4 weeks, while a custom mobile app or e-commerce platform could take 2–4 months. We provide a clear timeline and milestones during the discovery phase.',
  true, 5, now(), now()
),
(
  'Do you also provide content (text, photos, copywriting)?',
  'By default, we ask clients to provide main content such as company profile, product information, and photos. However, we can help refine your content, or provide copywriting and content production as an additional service if needed.',
  true, 6, now(), now()
),
(
  'Who owns the design and source code after the project is completed?',
  'Once the project is fully paid, you own the final design assets and the source code for the delivered product, unless specified otherwise in the contract. We may keep a copy for maintenance and portfolio purposes, but the product itself belongs to you.',
  true, 7, now(), now()
),
(
  'Do you provide post-launch support?',
  'Yes. We believe in long-term partnerships. We offer several maintenance and support options to keep your website or app secure, up-to-date, and performing optimally.',
  true, 8, now(), now()
),
(
  'Can you improve or redesign an existing website or app?',
  'Yes. We can audit your existing website or app, then recommend whether it’s better to improve the current system or rebuild from scratch, depending on your goals and budget.',
  true, 9, now(), now()
),
(
  'Do you work with clients outside your city or country?',
  'Yes. Most of our collaboration is done online via email, chat, and video calls. We’re comfortable working remotely and adapting to different time zones when needed.',
  true, 10, now(), now()
);

-- ==========================================
-- 8) (Optional) Link existing projects to services via project_services
-- Not critical since we are using 'services' array now, but keeps constraints consistent if used.
-- ==========================================
-- Example: Link 'Rumah Tahfidz Tabia' to 'Web Development' service
INSERT INTO public.project_services (project_id, service_id)
SELECT p.id, s.id 
FROM public.projects p 
JOIN public.services s ON s.slug = 'web-development'
WHERE p.slug = 'rumah-tahfidz-tabia'
ON CONFLICT (project_id, service_id) DO NOTHING;

-- End of seeder