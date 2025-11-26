/*
 * Section: Projects (Editorial List)
 * Layout: Vertical list with hover-reveal images.
 * Design: Minimalist, typography-focused, interactive.
 */

import { ArrowUpRight } from 'lucide-react';
import { OptimizedImage } from '@/components/shared/optimized-image';
import Link from 'next/link';
import SectionDivider from '@/components/shared/section-divider';

interface ProjectItem {
  id: string;
  year: string;
  title: string;
  category: string;
  image_url: string;
  slug: string;
}

interface ProjectsSectionProps {
  projects: any[]; // Replace 'any' with proper type if available
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section className="w-full bg-zinc-50 relative overflow-hidden">
      {/* DECORATIVE KANJI WATERMARK */}
      <div className="absolute bottom-0 left-0 pointer-events-none select-none z-0 opacity-5">
        <span className="font-body font-bold text-[20rem] leading-none text-zinc-900">
          創造
        </span>
      </div>

      <div className="mx-auto max-w-7xl px-8 py-24 relative z-10">
        <SectionDivider label="SELECTED WORKS" />

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="space-y-4">
            <h2 className="font-heading text-5xl lg:text-7xl font-bold tracking-tighter text-zinc-950">
              Case
              <br />
              Studies.
            </h2>
            <p className="max-w-md text-lg text-zinc-600 font-medium leading-relaxed">
              Real-world projects that show how we solve problems with design and technology.
            </p>
          </div>
          <Link href="/projects" className="group flex items-center gap-2 text-sm font-mono tracking-widest uppercase text-zinc-600 hover:text-zinc-900 transition-colors">
            View All Projects
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* PROJECT LIST */}
        <div className="flex flex-col">
          {projects.map((project) => (
            <ProjectItem key={project.id} project={project} />
          ))}
          <div className="w-full h-px bg-zinc-200" />
        </div>
      </div>
    </section>
  );
}

function ProjectItem({ project }: { project: ProjectItem }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative w-full border-t border-zinc-200 py-12 flex flex-col md:flex-row items-baseline md:items-center justify-between gap-4 hover:bg-background-70 hover:backdrop-blur-md transition-colors duration-500"
    >
      {/* HOVER IMAGE REVEAL */}
      <div className="hidden lg:block absolute right-16 top-1/2 -translate-y-1/2 w-[400px] h-[250px] opacity-0 z-20 group-hover:opacity-100 transition-all duration-500 pointer-events-none rotate-3 group-hover:rotate-0 scale-90 group-hover:scale-100 origin-center">
        <div className="relative w-full h-full overflow-hidden shadow-sm">
          <OptimizedImage
            src={project.image_url}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* TEXT CONTENT */}
      <div className="flex items-baseline gap-8 md:gap-16 z-10 relative">
        <span className="font-mono text-sm text-zinc-400 group-hover:text-zinc-600 transition-colors">
          {project.year}
        </span>
        <h3 className="font-heading text-3xl md:text-5xl font-semibold text-zinc-900 group-hover:translate-x-4 transition-transform duration-500">
          {project.title}
        </h3>
      </div>

      <div className="flex items-center gap-4 z-10 relative">
        <span className="font-mono text-xs tracking-widest uppercase text-zinc-500 group-hover:text-zinc-900 transition-colors">
          {project.category}
        </span>
      </div>
    </Link>
  );
}
