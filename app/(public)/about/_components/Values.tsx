'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';

interface ValueItem {
  id: string;
  slug: string;
  title: string;
  description: string;
}

const VALUES: ValueItem[] = [
  {
    id: '01',
    slug: 'creativity',
    title: 'Creativity',
    description:
      'We bring fresh, imaginative ideas and perspectives to every project. Our creative process is rooted in curiosity and exploration so we can discover solutions that stand out in the market.',
  },
  {
    id: '02',
    slug: 'excellence',
    title: 'Excellence',
    description:
      'We are committed to delivering work that meets a higher standard in every detail. Excellence is not only about the final output, but also about the process, the craft, and the dedication we bring to every interaction.',
  },
  {
    id: '03',
    slug: 'innovation',
    title: 'Innovation',
    description:
      'We embrace experimentation and stay ahead of the curve with our solutions. Innovation means challenging the status quo, testing new approaches, and continuously improving to meet the changing needs of our clients.',
  },
  {
    id: '04',
    slug: 'teamwork',
    title: 'Teamwork',
    description:
      'We value collaboration, shared ownership, and open communication. Great work happens when diverse perspectives come together, and we foster an environment where every voice is heard and valued.',
  },
];

export function ValuesSection() {
  const [activeId, setActiveId] = useState(VALUES[0].slug);

  useEffect(() => {
    const handleScroll = () => {
      const sections = VALUES.map((value) =>
        document.getElementById(value.slug)
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
  }, []);

  const scrollToValue = (slug: string) => {
    const element = document.getElementById(slug);
    if (element) {
      const offset = 175;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="w-full bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-24">

          {/* LEFT: STICKY NAVIGATION (Desktop Only) */}
          <div className="hidden lg:block relative">
            <div className="sticky top-32">
              <h2 className="font-heading text-sm font-bold tracking-widest uppercase text-zinc-400 mb-12">
                Our Values
              </h2>

              <div className="flex flex-col gap-6">
                {VALUES.map((value) => (
                  <button
                    key={value.slug}
                    onClick={() => scrollToValue(value.slug)}
                    className={cn(
                      "group flex items-center gap-4 text-left transition-all duration-300",
                      activeId === value.slug ? "opacity-100 translate-x-4" : "opacity-40 hover:opacity-100 hover:translate-x-2"
                    )}
                  >
                    <span className={cn(
                      "font-mono text-sm transition-colors duration-300",
                      activeId === value.slug ? "text-brand" : "text-zinc-400"
                    )}>
                      {value.id}
                    </span>
                    <span className={cn(
                      "font-heading text-3xl font-bold transition-colors duration-300",
                      activeId === value.slug ? "text-zinc-950" : "text-zinc-500"
                    )}>
                      {value.title}
                    </span>
                    {activeId === value.slug && (
                      <ArrowUpRight className="w-5 h-5 text-brand animate-pulse" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: SCROLLABLE CONTENT */}
          <div className="flex flex-col gap-24 lg:gap-32">
            {VALUES.map((value) => (
              <div
                key={value.slug}
                id={value.slug}
                className={cn(
                  "scroll-mt-32 group transition-all duration-500 ease-in-out",
                  activeId === value.slug ? "opacity-100 scale-100 blur-none" : "opacity-20 scale-95 blur-[2px]"
                )}
              >
                {/* Mobile Title (Visible only on mobile) */}
                <div className="lg:hidden mb-8">
                  <span className="font-mono text-sm text-brand mb-2 block">
                    {value.id}
                  </span>
                  <h2 className="font-heading text-4xl font-bold text-zinc-950">
                    {value.title}
                  </h2>
                </div>

                <div className="space-y-8 lg:space-y-12">
                  <p className="font-body text-lg lg:text-2xl text-zinc-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
