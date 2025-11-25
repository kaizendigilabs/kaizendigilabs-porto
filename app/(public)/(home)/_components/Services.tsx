/*
 * Section: Services Grid (Neo-Minimal Editorial)
 * Layout: Typography-first grid with borders and inverted hover effects.
 * Design: High contrast, precision, editorial feel.
 */

import { ArrowUpRight } from 'lucide-react';
import SectionDivider from '@/components/shared/section-divider';

interface ServiceItem {
  id: string;
  title: string;
  description: string;
}

interface ServicesSectionProps {
  services: any[]; // Replace 'any' with proper type if available
}

export function ServicesSection({ services }: ServicesSectionProps) {
  // Map services to include display ID (01, 02, etc.)
  const mappedServices = services.map((service, index) => ({
    ...service,
    displayId: String(index + 1).padStart(2, '0')
  }));
  return (
    <section className="w-full bg-zinc-50 relative overflow-hidden">
      {/* DECORATIVE KANJI WATERMARK */}
      <div className="absolute top-0 right-0 pointer-events-none select-none z-0 opacity-5">
        <span className="font-body font-bold text-[20rem] leading-none text-zinc-900 [writing-mode:vertical-rl]">
          奉仕
        </span>
      </div>

      <div className="mx-auto max-w-7xl px-8 py-24 relative z-10">
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
          <div className="space-y-4">
            <SectionDivider label="02 — SERVICES" />
            <h2 className="font-heading text-5xl lg:text-7xl font-bold tracking-tighter text-zinc-950">
              Digital
              <br />
              Capabilities.
            </h2>
          </div>
          <p className="max-w-md text-lg text-zinc-600 font-medium leading-relaxed pb-2">
            We combine strategy, design, and technology to build brands that lead their industry.
          </p>
        </div>

        {/* GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 border-t border-l border-zinc-200">
          {mappedServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* QUOTE SECTION */}
        <div className="mt-24 pt-12">
          <blockquote className="max-w-4xl mx-auto text-center space-y-6">
            <p className="font-heading text-3xl lg:text-5xl font-medium leading-tight text-zinc-900">
              &ldquo;Good design is like a refrigerator—when it works, no one
              notices, but when it doesn&apos;t, it sure stinks.&rdquo;
            </p>
            <footer className="text-sm font-mono tracking-widest uppercase text-zinc-500">
              — Irene Au
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

// =====================================
// Service Card (Typography & Interaction)
// =====================================

interface ServiceCardProps {
  service: ServiceItem & { displayId: string };
}

function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="group relative border-r border-b border-zinc-200 bg-zinc-50 p-8 lg:p-12 flex flex-col justify-between min-h-[320px] transition-colors duration-500 hover:bg-zinc-950">
      {/* TOP: Number & Icon */}
      <div className="flex justify-between items-start w-full">
        <span className="font-mono text-sm tracking-widest text-zinc-400 group-hover:text-zinc-500 transition-colors">
          {service.displayId}
        </span>
        <ArrowUpRight className="w-6 h-6 text-zinc-300 group-hover:text-white transition-colors duration-300" />
      </div>

      {/* BOTTOM: Content */}
      <div className="space-y-4 mt-auto">
        <h3 className="font-heading text-3xl font-semibold text-zinc-900 group-hover:text-white transition-colors duration-300">
          {service.title}
        </h3>
        <p className="text-zinc-600 leading-relaxed max-w-sm group-hover:text-zinc-400 transition-colors duration-300">
          {service.description}
        </p>
      </div>
    </article>
  );
}
