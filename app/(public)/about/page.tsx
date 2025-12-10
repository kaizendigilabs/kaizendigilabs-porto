import { PageHero } from '@/components/shared/page-hero';
import { IntroSection } from './_components/Intro';
import { TeamsSection, TeamMember } from './_components/Teams';
import { ValuesSection } from './_components/Values';
import { VisionMissionSection } from './_components/VisionMission';
import { CTASection } from './_components/CTA';
import { createServerClient } from '@/lib/supabase/server';

export default async function About() {
  const supabase = await createServerClient();

  // Fetch active team members (profiles)
  const { data: teamMembers } = await supabase
    .from('profiles')
    .select('*')
    .eq('status', 'active')
    .order('display_order', { ascending: true });

  const typedTeamMembers = (teamMembers as unknown as TeamMember[]) || [];

  return (
    <main className="min-h-screen pt-(--header-h)">
      <PageHero
        title="ABOUT US"
        description="Kaizen Digital Labs is built on a simple idea: small improvements, done consistently, create real impact. Get to know the people and principles behind how we work with our clients."
        kanji="会社"
      />
      <IntroSection />
      <VisionMissionSection />
      <ValuesSection />

      {typedTeamMembers && typedTeamMembers.length > 0 && (
        <TeamsSection teamMembers={typedTeamMembers} />
      )}

      <CTASection />
    </main>
  );
}
