'use client';

import { useMemo, useState } from 'react';
import { OptimizedImage } from '@/components/shared/optimized-image';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tables } from '@/lib/types/database';

// =============================================================
// PROJECTS DATA
// =============================================================

// =============================================================
// PROJECTS DATA
// =============================================================

// Helpers
function getCategories(projects: Tables<'projects'>[]): string[] {
  const set = new Set<string>();
  for (const p of projects) {
    if (p.category) set.add(p.category);
  }
  return ['All', ...Array.from(set)];
}

// =========================
// MAIN PAGE SECTION
// =========================

interface ProjectSectionProps {
  projects: Tables<'projects'>[];
}

export function ProjectSection({ projects }: ProjectSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isAnimating, setIsAnimating] = useState(false);

  const categories = useMemo(() => getCategories(projects), [projects]);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [activeCategory, projects]);

  const handleCategoryChange = (category: string) => {
    if (category === activeCategory) return;

    setIsAnimating(true);
    setActiveCategory(category);

    // Reset scroll to top of the grid section smoothly
    const gridElement = document.getElementById('project-grid-top');
    if (gridElement) {
      const offset = 100; // Adjust for sticky header
      const elementPosition = gridElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }

    // Reset animation state
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <section className="w-full bg-zinc-50 min-h-screen py-24 lg:py-32">
      <div className="mx-auto w-full max-w-7xl px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-12 lg:gap-24">

          {/* LEFT: STICKY SIDEBAR FILTER */}
          <div className="hidden lg:block relative">
            <div className="sticky top-32">
              <h2 className="font-heading text-sm font-bold tracking-widest uppercase text-zinc-400 mb-8">
                Filter By
              </h2>

              <div className="flex flex-col gap-4">
                {categories.map((category) => {
                  const isActive = category === activeCategory;
                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => handleCategoryChange(category)}
                      className={cn(
                        "text-left text-sm font-mono tracking-widest uppercase transition-all duration-300 flex items-center gap-3 group cursor-pointer",
                        isActive
                          ? "text-red-600 font-bold translate-x-2"
                          : "text-zinc-400 hover:text-zinc-900 hover:translate-x-1"
                      )}
                    >
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                      )}
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* MOBILE FILTER (Horizontal Scroll) */}
          <div className="lg:hidden mb-8 overflow-x-auto pb-4 scrollbar-hide">
            <div className="flex gap-4 min-w-max">
              {categories.map((category) => {
                const isActive = category === activeCategory;
                return (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={cn(
                      "px-4 py-2 text-xs font-mono tracking-widest uppercase border transition-colors",
                      isActive
                        ? "border-red-600 text-red-600 font-bold bg-red-50"
                        : "border-zinc-200 text-zinc-500 hover:border-zinc-900 hover:text-zinc-900"
                    )}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT: PROJECT GRID */}
          <div id="project-grid-top" className="flex flex-col">
            {/* Category Title (Visible on Grid Top) */}
            <div className="mb-12 border-b border-zinc-200 pb-6 flex justify-between items-end">
              <h2 className="font-heading text-4xl lg:text-5xl font-bold text-zinc-950">
                {activeCategory === 'All' ? 'All Projects' : activeCategory}
              </h2>
              <span className="font-mono text-zinc-400 text-sm">
                {filteredProjects.length} Result{filteredProjects.length !== 1 ? 's' : ''}
              </span>
            </div>

            <div className={cn(
              "grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 lg:gap-y-24 transition-opacity duration-500",
              isAnimating ? "opacity-50" : "opacity-100"
            )}>
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  className={cn(
                    "md:col-span-1",
                    "animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-backwards"
                  )}
                  style={{ animationDelay: `${index * 100}ms` }}
                />
              ))}

              {filteredProjects.length === 0 && (
                <div className="col-span-full py-24 text-center">
                  <p className="font-heading text-2xl text-zinc-400">
                    No projects found in this category.
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ==============================
// Single project card
// ==============================

interface ProjectCardProps {
  project: Tables<'projects'>;
  className?: string;
  style?: React.CSSProperties;
}

function ProjectCard({ project, className, style }: ProjectCardProps) {
  return (
    <article className={cn("group flex flex-col gap-6 cursor-pointer", className)} style={style}>
      {/* IMAGE CONTAINER */}
      <div className="relative overflow-hidden w-full bg-zinc-200 aspect-16/10">
        <OptimizedImage
          src={project.image_url || '/images/placeholder.svg'}
          alt={project.title || 'Project'}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          fallbackSrc="/images/placeholder.svg"
        />

        {/* OVERLAY (Optional: Darken on hover) */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
      </div>

      {/* INFO */}
      <div className="flex flex-col gap-1">
        <div className="flex items-baseline justify-between border-b border-zinc-200 pb-4 transition-colors group-hover:border-zinc-900">
          <h3 className="font-heading text-2xl lg:text-3xl font-bold text-zinc-900 group-hover:text-red-600 transition-colors duration-300">
            {project.title}
          </h3>
          <ArrowUpRight className="w-5 h-5 text-zinc-400 group-hover:text-red-600 transition-colors duration-300 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transform" />
        </div>

        <div className="flex justify-between items-center pt-2">
          <span className="font-mono text-xs tracking-widest uppercase text-zinc-500">
            {project.category}
          </span>
          <span className="font-mono text-xs text-zinc-400">
            {project.year}
          </span>
        </div>
      </div>
    </article>
  );
}
