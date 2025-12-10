import { PageHero } from '@/components/shared/page-hero';
import { ProjectSection } from './_components/Projects';
import { EmptyState } from '@/components/shared/empty-state';
import { createServerClient } from '@/lib/supabase/server';
import { FolderKanban } from 'lucide-react';
import { CTASection } from '@/components/shared/cta-section';

export const revalidate = 0;

export default async function Projects() {
  const supabase = await createServerClient();
  const { data: projects } = await supabase
    .from('projects')
    .select('*, testimonials(name, company)')
    .eq('published', true)
    .order('year', { ascending: false });

  return (
    <main className="min-h-screen pt-(--header-h)">
      <PageHero
        title="OUR WORK"
        description="A curated selection of projects we have shipped for clients. Each one shows how we bring design and engineering together to solve real problems on the web and mobile."
        kanji="作品"
      />
      {(projects && projects.length > 0) ? (
        <ProjectSection projects={projects || []} />
      ) : (
        <div className="mx-auto w-full max-w-7xl px-8 py-16 lg:py-24">
          <EmptyState
            icon={<FolderKanban className="w-16 h-16" />}
            title="No Projects Yet"
            description="We're currently building our portfolio. Stay tuned for exciting projects showcasing our expertise in design and development."
          />
        </div>
      )}
      <CTASection />
    </main>
  );
}
