import { HeroSection } from './_components/Hero';
import { ServicesSection } from './_components/Services';
import { ProjectsSection } from './_components/Projects';
import { ProcessSection } from './_components/Process';
import { TestimonialSection } from './_components/Testimonials';
import { ArticleSection } from './_components/Articles';
import { FAQSection } from '@/components/shared/faq-section';
import { CTASection } from '@/components/shared/cta-section';
import { createServerClient } from '@/lib/supabase/server';

export default async function Home() {
  const supabase = await createServerClient();

  const [
    { data: services },
    { data: projects },
    { data: testimonials },
    { data: articles },
    { data: faqs }
  ] = await Promise.all([
    supabase.from('services').select('*').order('title', { ascending: true }).limit(6),
    supabase.from('projects').select('*').eq('published', true).order('created_at', { ascending: false }).limit(4),
    supabase.from('testimonials').select('*').eq('published', true).order('rating', { ascending: false }),
    supabase.from('articles').select('*, profiles(full_name, avatar)').eq('published', true).order('created_at', { ascending: false }).limit(3),
    supabase.from('faqs').select('*').eq('published', true).order('created_at', { ascending: false })
  ]);

  return (
    <main className="min-h-screen pt-(--header-h)">
      <HeroSection />

      {services && services.length > 0 && (
        <ServicesSection services={services} />
      )}

      {projects && projects.length > 0 && (
        <ProjectsSection projects={projects} />
      )}

      <ProcessSection />

      {testimonials && testimonials.length > 0 && (
        <TestimonialSection testimonials={testimonials} />
      )}

      {articles && articles.length > 0 && (
        <ArticleSection articles={articles} />
      )}

      {faqs && faqs.length > 0 && (
        <FAQSection faqs={faqs} />
      )}

      <CTASection />
    </main>
  );
}
