import { PageHero } from '@/components/shared/page-hero';
import { ServicesSection } from './_components/Services';
import { ProcessSection } from '@/app/(public)/(home)/_components/Process';
import { FAQSection } from '@/components/shared/faq-section';
import { CTASection } from '@/components/shared/cta-section';
import { WhyChooseUs } from './_components/WhyChooseUs';
import { EmptyState } from '@/components/shared/empty-state';
import { createServerClient } from '@/lib/supabase/server';
import { Briefcase } from 'lucide-react';
import type { Metadata } from 'next';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Our Services | Kaizen Digital Labs',
  description: 'We craft end-to-end digital experiences, covering strategy, production, and continuous optimization, so every service launch feels bold on the big screen.',
  openGraph: {
    title: 'Our Services | Kaizen Digital Labs',
    description: 'We craft end-to-end digital experiences, covering strategy, production, and continuous optimization.',
    type: 'website',
  },
};

export default async function Services() {
  const supabase = await createServerClient();
  const { data: services } = await supabase
    .from('services')
    .select('*')
    .order('title', { ascending: true });

  const { data: faqs } = await supabase
    .from('faqs')
    .select('*')
    .eq('published', true)
    .order('display_order', { ascending: true });

  return (
    <main className="min-h-screen pt-(--header-h)">
      <PageHero
        title="OUR SERVICES"
        description="We help you plan, design, build, and improve your digital products. From brand identity and content to websites and mobile apps, every service is crafted to be useful today and ready to scale tomorrow."
        kanji="奉仕"
      />
      {(services && services.length > 0) ? (
        <ServicesSection services={services || []} />
      ) : (
        <div className="mx-auto w-full max-w-7xl px-8 py-16 lg:py-24">
          <EmptyState
            icon={<Briefcase className="w-16 h-16" />}
            title="No Services Yet"
            description="We're preparing our service offerings. Check back soon to discover how we can help transform your digital presence."
          />
        </div>
      )}

      <ProcessSection />
      <WhyChooseUs />

      {faqs && faqs.length > 0 && (
        <FAQSection faqs={faqs} />
      )}
      <CTASection />
    </main>
  );
}
