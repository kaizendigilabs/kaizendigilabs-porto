'use client';

import { OptimizedImage } from '@/components/shared/optimized-image';
import Link from 'next/link';
import {
  IconInstagram,
  IconX,
  IconFacebook,
  IconGithub,
  IconLinkedin,
  IconWebsite
} from '@/components/shared/icons';

export interface TeamMember {
  user_id: string;
  full_name: string | null;
  job_title: string | null;
  bio: string | null;
  avatar: string | null;
  social_links: any | null; // Using any for JSONB for now
  display_order?: number | null;
  status?: 'active' | 'inactive' | null;
  created_at?: string;
  updated_at?: string;
}

interface TeamsSectionProps {
  teamMembers: TeamMember[];
}

const SOCIAL_PLATFORMS = {
  instagram: { icon: IconInstagram, label: 'Instagram' },
  twitter: { icon: IconX, label: 'X (Twitter)' },
  facebook: { icon: IconFacebook, label: 'Facebook' },
  github: { icon: IconGithub, label: 'GitHub' },
  linkedin: { icon: IconLinkedin, label: 'LinkedIn' },
  website: { icon: IconWebsite, label: 'Website' },
};

export function TeamsSection({ teamMembers }: TeamsSectionProps) {
  // Return early if no team members
  if (!teamMembers || teamMembers.length === 0) {
    return null;
  }
  return (
    <section className="w-full bg-zinc-50">
      <div className="mx-auto w-full max-w-7xl px-8 py-32">

        {/* Section Header */}
        <div className="mb-16">
          <h2 className="font-heading text-5xl lg:text-6xl font-bold text-zinc-900 mb-4">
            Our Team
          </h2>
          <p className="max-w-md text-lg text-zinc-600 font-medium leading-relaxed">
            Meet the team behind our digital work.
          </p>
        </div>

        {/* Responsive grid: 2-col on tablet+, 3-col on large screens if 5+ members */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {teamMembers.map((member: TeamMember) => (
            <TeamCard key={member.user_id} member={member} />
          ))}
        </div>

      </div>
    </section>
  );
}

interface TeamCardProps {
  member: TeamMember;
}

function TeamCard({ member }: TeamCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden frosted-glass/70 hover:shadow-md transition-all duration-300">
      {/* Portrait image - square aspect ratio */}
      <div className="relative aspect-square w-full overflow-hidden">
        <OptimizedImage
          src={member.avatar || '/images/placeholder.svg'}
          alt={member.full_name || 'Team Member'}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Name, role, bio, and social media below image */}
      <div className="p-4 space-y-4">
        <div>
          <h3 className="font-heading text-2xl font-semibold text-zinc-900 mb-1">
            {member.full_name}
          </h3>
          <p className="text-sm font-mono uppercase tracking-wider text-zinc-500">
            {member.job_title}
          </p>
        </div>

        {/* Bio - only show if exists */}
        {member.bio && (
          <p className="text-zinc-600 leading-relaxed">
            {member.bio}
          </p>
        )}

        {/* Social Media Links */}
        {member.social_links && (
          <div className="flex gap-3">
            {Object.entries(member.social_links).map(([platform, url]) => {
              const config = SOCIAL_PLATFORMS[platform as keyof typeof SOCIAL_PLATFORMS];
              if (!config || !url) return null;

              const Icon = config.icon;

              return (
                <Link
                  key={platform}
                  href={url as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-zinc-900 transition-colors"
                  aria-label={config.label}
                >
                  <Icon className="w-5 h-5" />
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </article>
  );
}
