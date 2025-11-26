/*
 * Section: FAQ (Editorial Accordion)
 * Layout: Split Screen (Left: Header, Right: Accordion).
 * Design: Minimalist, Plus/Minus icons, clean typography.
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import { Plus, Minus, ArrowUpRight } from 'lucide-react';
import SectionDivider from '@/components/shared/section-divider';
import Link from 'next/link';

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
}

export function FAQSection({ faqs }: FAQSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-zinc-50 relative overflow-hidden">
      {/* DECORATIVE KANJI WATERMARK */}
      <div className="absolute bottom-0 right-16 pointer-events-none select-none z-0 opacity-5">
        <span className="font-body font-bold text-[15rem] leading-none text-zinc-900">
          質問
        </span>
      </div>

      <div className="mx-auto w-full max-w-7xl px-8 py-24 relative z-10">
        <SectionDivider label="FAQ" />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-16 lg:gap-24 items-start">
          {/* LEFT: Header & Intro */}
          <div className="space-y-8 sticky top-24">
            <div className="space-y-4">
              <h2 className="font-heading text-5xl font-bold tracking-tighter text-zinc-950 leading-tight">
                Common
                <br />
                Questions.
              </h2>
              <p className="max-w-md text-lg text-zinc-600 font-medium leading-relaxed">
                Everything you need to know about how we work and what we deliver. Still can&apos;t find the answer you&apos;re looking for?
              </p>
            </div>

            <Link href="/contact" className="group inline-flex items-center gap-2 text-sm font-mono tracking-widest uppercase text-red-600 hover:text-red-700 transition-colors">
              Contact Support
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* RIGHT: Accordion */}
          <div className="divide-y divide-zinc-200">
            {faqs.map((item, index) => (
              <FAQItem
                key={item.id}
                index={index}
                item={item}
                isActive={activeIndex === index}
                onToggle={handleToggle}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface FAQItemProps {
  index: number;
  item: FAQ;
  isActive: boolean;
  onToggle: (index: number) => void;
}

function FAQItem({ index, item, isActive, onToggle }: FAQItemProps) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (isActive && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isActive]);

  return (
    <div className="group">
      <button
        type="button"
        onClick={() => onToggle(index)}
        className="flex w-full items-start justify-between gap-4 py-6 lg:py-8 text-left transition-colors hover:bg-zinc-50/50"
      >
        <span
          className={`text-xl lg:text-2xl font-heading font-medium transition-colors duration-300 ${isActive ? 'text-zinc-900' : 'text-zinc-500 group-hover:text-zinc-900'
            }`}
        >
          {item.question}
        </span>

        <span
          className={`shrink-0 flex h-8 w-8 items-center justify-center text-zinc-400 transition-all duration-300 ${isActive ? 'text-zinc-900 rotate-180' : 'group-hover:text-zinc-900'
            }`}
        >
          {isActive ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </span>
      </button>

      <div
        style={{ height }}
        className="overflow-hidden transition-[height] duration-500 ease-[cubic-bezier(0.87,0,0.13,1)]"
      >
        <div
          ref={contentRef}
          className="pb-8 pr-12 text-base leading-relaxed text-zinc-600"
        >
          {item.answer}
        </div>
      </div>
    </div>
  );
}
