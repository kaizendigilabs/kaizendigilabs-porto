'use client'

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';

interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  capabilities: string[] | null;
}

interface ServicesSectionProps {
  services: any[]; // Replace 'any' with proper type if available
}

export function ServicesSection({ services }: ServicesSectionProps) {
  // Map services to include display ID (01, 02, etc.)
  const mappedServices = services.map((service, index) => ({
    ...service,
    displayId: String(index + 1).padStart(2, '0'),
  }));

  const [activeId, setActiveId] = useState(mappedServices[0]?.slug || '');

  useEffect(() => {
    if (mappedServices.length > 0 && !activeId) {
      setActiveId(mappedServices[0].slug);
    }
  }, [mappedServices, activeId]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = mappedServices.map((service) =>
        document.getElementById(service.slug)
      );

      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveId(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mappedServices]);

  const scrollToSection = (slug: string) => {
    const element = document.getElementById(slug);
    if (element) {
      const offset = 100; // Adjust for sticky header/padding
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };


  return (
    <section className="w-full bg-zinc-50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-24">

          {/* LEFT: STICKY NAVIGATION (Desktop Only) */}
          <div className="hidden lg:block relative">
            <div className="sticky top-32">
              <h2 className="font-heading text-sm font-bold tracking-widest uppercase text-zinc-400 mb-12">
                Our Expertise
              </h2>

              <div className="flex flex-col gap-6">
                {mappedServices.map((service) => (
                  <button
                    key={service.slug}
                    onClick={() => scrollToSection(service.slug)}
                    className={cn(
                      "group flex items-center gap-4 text-left transition-all duration-300",
                      activeId === service.slug ? "opacity-100 translate-x-4" : "opacity-40 hover:opacity-100 hover:translate-x-2"
                    )}
                  >
                    <span className={cn(
                      "font-mono text-sm transition-colors duration-300",
                      activeId === service.slug ? "text-red-600" : "text-zinc-400"
                    )}>
                      {service.displayId}
                    </span>
                    <span className={cn(
                      "font-heading text-3xl font-bold transition-colors duration-300",
                      activeId === service.slug ? "text-zinc-950" : "text-zinc-500"
                    )}>
                      {service.title}
                    </span>
                    {activeId === service.slug && (
                      <ArrowUpRight className="w-5 h-5 text-red-600 animate-pulse" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: SCROLLABLE CONTENT */}
          <div className="flex flex-col gap-24 lg:gap-40">
            {mappedServices.map((service) => (
              <div
                key={service.slug}
                id={service.slug}
                className={cn(
                  "scroll-mt-32 group transition-all duration-500 ease-in-out",
                  activeId === service.slug ? "opacity-100 scale-100 blur-none" : "opacity-20 scale-95 blur-[2px]"
                )}
              >
                {/* Mobile Title (Visible only on mobile) */}
                <div className="lg:hidden mb-8">
                  <span className="font-mono text-sm text-red-600 mb-2 block">
                    {service.displayId}
                  </span>
                  <h2 className="font-heading text-4xl font-bold text-zinc-950">
                    {service.title}
                  </h2>
                </div>

                <div className="space-y-8 lg:space-y-12">
                  <p className="font-body text-lg lg:text-2xl text-zinc-600 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="border-t border-zinc-200 pt-8">
                    <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-6">
                      Capabilities
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {service.capabilities.map((capability: string) => (
                        <div key={capability} className="flex items-center gap-3 group/item">
                          <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 group-hover/item:bg-red-600 transition-colors duration-300" />
                          <span className="font-body text-zinc-700 group-hover/item:text-zinc-900 transition-colors">
                            {capability}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
