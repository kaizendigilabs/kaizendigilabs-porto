/*
 * Section: Testimonials (Editorial Quote)
 * Layout: Split screen (Nav Left, Quote Right).
 * Design: Big typography, minimalist, fade transitions.
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import SectionDivider from '@/components/shared/section-divider';

interface Testimonial {
  id: string;
  name: string;
  role: string | null;
  company: string | null;
  content: string;
  rating: number | null;
  avatar: string | null;
}

interface TestimonialSectionProps {
  testimonials: Testimonial[];
}

export function TestimonialSection({ testimonials }: TestimonialSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNext = useCallback(() => {
    if (isAnimating || !testimonials.length) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      setIsAnimating(false);
    }, 300); // Wait for fade out
  }, [isAnimating, testimonials.length]);

  const handlePrev = useCallback(() => {
    if (isAnimating || !testimonials.length) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      setIsAnimating(false);
    }, 300);
  }, [isAnimating, testimonials.length]);

  // Auto-play
  useEffect(() => {
    if (!testimonials || testimonials.length === 0) return;
    const timer = setInterval(handleNext, 6000);
    return () => clearInterval(timer);
  }, [handleNext, testimonials]);

  const activeTestimonial = testimonials[currentIndex];

  // Return early if no testimonials
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-zinc-50 relative overflow-hidden">
      {/* DECORATIVE KANJI WATERMARK */}
      <div className="absolute top-0 right-0 pointer-events-none select-none z-0 opacity-5">
        <span className="font-body font-bold text-[20rem] leading-none text-zinc-900 [writing-mode:vertical-rl]">
          信頼
        </span>
      </div>

      <div className="mx-auto max-w-7xl px-8 py-24 relative z-10">
        <SectionDivider label="TESTIMONIALS" />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-16 lg:gap-24 items-start">
          {/* LEFT: Header & Navigation */}
          <div className="flex flex-col justify-between space-y-12">
            <div className="space-y-4">
              <h2 className="font-heading text-4xl lg:text-5xl font-bold tracking-tighter text-zinc-950">
                Client
                <br />
                Stories.
              </h2>
              <p className="max-w-md text-lg text-zinc-600 font-medium leading-relaxed">
                Real results from long-term partnerships with our clients.
              </p>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center gap-4">
              <button
                onClick={handlePrev}
                className="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-600 hover:bg-zinc-900 hover:text-white hover:border-zinc-900 transition-all duration-300 cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-600 hover:bg-zinc-900 hover:text-white hover:border-zinc-900 transition-all duration-300 cursor-pointer"
                aria-label="Next testimonial"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Progress Indicator */}
            <div className="flex items-center gap-4 font-mono text-sm tracking-widest text-zinc-400">
              <span className="text-zinc-900">
                {String(currentIndex + 1).padStart(2, '0')}
              </span>
              <div className="w-12 h-0.5 bg-zinc-200">
                <div
                  className="h-full bg-zinc-900 transition-all duration-500"
                  style={{ width: `${((currentIndex + 1) / testimonials.length) * 100}% ` }}
                />
              </div>
              <span>
                {String(testimonials.length).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* RIGHT: The Quote */}
          <div className="relative min-h-[400px] flex flex-col justify-center">
            {/* Big Quote Mark Background */}
            <Quote className="absolute -top-12 -left-12 w-32 h-32 text-zinc-100 fill-zinc-100 -z-10" />

            <div
              className={`transition - opacity duration - 500 ease -in -out ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'} `}
            >
              <blockquote className="space-y-8">
                <p className="font-heading text-3xl lg:text-5xl font-medium leading-tight text-zinc-900">
                  &ldquo;{activeTestimonial.content}&rdquo;
                </p>

                <footer className="flex items-center gap-4 border-t border-zinc-200 pt-8 w-fit">
                  <div className="flex flex-col">
                    <cite className="not-italic font-heading text-xl font-semibold text-zinc-900">
                      {activeTestimonial.name}
                    </cite>
                    <span className="font-mono text-sm text-zinc-500 mt-1 uppercase tracking-wider">
                      {activeTestimonial.role}, {activeTestimonial.company}
                    </span>
                  </div>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
