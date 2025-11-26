/*
 * Section: Process (Editorial Steps)
 * Layout: Responsive Grid (Stack on Mobile, 4-Col on Desktop).
 * Interaction: Auto-rotating focus that pauses on hover.
 */

'use client';

import { useEffect, useState, useRef } from 'react';
import SectionDivider from '@/components/shared/section-divider';

interface ProcessStep {
  id: string;
  number: string;
  title: string;
  description: string;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 'discovery',
    number: '01',
    title: 'Discovery & Research',
    description:
      'We dive deep into your brand, analyzing competitors and market trends to build a solid foundation.',
  },
  {
    id: 'ideation',
    number: '02',
    title: 'Ideation & Concept',
    description:
      'We explore multiple creative directions, refining concepts that align perfectly with your goals.',
  },
  {
    id: 'design',
    number: '03',
    title: 'Design & Development',
    description:
      'We transform concepts into tangible, high-fidelity designs and robust, scalable code.',
  },
  {
    id: 'delivery',
    number: '04',
    title: 'Finalization & Delivery',
    description:
      'We rigorously test, polish, and launch your project, ensuring a flawless user experience.',
  },
];

export function ProcessSection() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-rotation logic
  useEffect(() => {
    if (isPaused) return;

    intervalRef.current = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % PROCESS_STEPS.length);
    }, 3000); // Rotate every 3 seconds

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused]);

  return (
    <section className="w-full bg-zinc-50 relative overflow-hidden">
      {/* DECORATIVE KANJI WATERMARK */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0 opacity-5">
        <span className="font-body font-bold text-[20rem] leading-none text-zinc-900">
          方法
        </span>
      </div>

      <div className="mx-auto max-w-7xl px-8 py-24 relative z-10">
        {/* HEADER */}
        <SectionDivider label="THE PROCESS" />

        <div className="mb-16 space-y-4">
          <h2 className="font-heading text-5xl lg:text-7xl font-bold tracking-tighter text-zinc-950">
            How We
            <br />
            Work.
          </h2>
          <p className="max-w-md text-lg text-zinc-600 font-medium leading-relaxed">
            A practical, step-by-step way to plan, build, and improve your digital products.
          </p>
        </div>

        {/* RESPONSIVE GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-4">
          {PROCESS_STEPS.map((step, index) => {
            const isActive = index === activeStepIndex;

            return (
              <div
                key={step.id}
                className={`group relative p-8 lg:p-10 min-h-[300px] flex flex-col justify-between transition-all duration-500 ease-out cursor-pointer
                  ${isActive ? 'bg-white shadow-sm opacity-100 scale-[1.02] z-10' : 'frosted-glass/70 opacity-60 hover:bg-zinc-100 hover:opacity-100 hover:scale-[1.02]'}
                `}
                onMouseEnter={() => {
                  setIsPaused(true);
                  setActiveStepIndex(index);
                }}
                onMouseLeave={() => {
                  setIsPaused(false);
                }}
              >
                {/* Step Number */}
                <span className={`font-mono text-sm tracking-widest transition-colors duration-300 ${isActive ? 'text-zinc-900' : 'text-zinc-400'}`}>
                  {step.number}
                </span>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className={`font-heading text-2xl font-semibold transition-colors duration-300 ${isActive ? 'text-zinc-900' : 'text-zinc-700'}`}>
                    {step.title}
                  </h3>
                  <p className={`text-sm leading-relaxed transition-colors duration-300 ${isActive ? 'text-zinc-600' : 'text-zinc-400'}`}>
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
