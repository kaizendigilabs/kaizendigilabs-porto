/*
 * Section: Hero
 * Layout: Split Screen with Center Kanji Overlay
 * Left: Black background, Heading (Geist Sans)
 * Right: White background, Paragraph, CTA
 * Center: Kanji Watermark (Decorative Noto Sans JP)
 */

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative grid grid-cols-1 lg:grid-cols-2 w-full min-h-[calc(100vh-var(--header-h))] font-sans overflow-hidden">
      {/* LEFT PANEL - DARK */}
      <div className="w-full bg-zinc-950 text-zinc-50 flex flex-col justify-center px-6 sm:px-8 lg:pl-12 lg:pr-16 xl:pl-16 xl:pr-32 py-12 lg:py-8 relative">
        {/* Main Heading */}
        <div className="relative z-10">
          <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.9] tracking-tighter uppercase lg:text-end">
            Transform
            <br />
            Ideas
            <br />
            <span className="block text-xl sm:text-2xl lg:text-3xl xl:text-4xl tracking-normal lowercase mt-1 lg:mt-2">into</span>
            <span className="block text-zinc-500 mt-1 lg:mt-2">
              Digital
              <br />
              Solutions.
            </span>
          </h1>
        </div>
      </div>

      {/* RIGHT PANEL - LIGHT */}
      <div className="w-full bg-zinc-50 text-zinc-950 flex flex-col justify-center items-end lg:items-start px-6 sm:px-8 lg:pl-16 lg:pr-12 xl:pl-32 xl:pr-16 py-12 relative">
        {/* Content Right */}
        <div className="flex flex-col relative z-10 space-y-6 lg:space-y-8 items-end lg:items-start">
          <p className="max-w-md lg:max-w-xl xl:max-w-2xl text-2xl sm:text-3xl lg:text-4xl xl:text-5xl leading-tight font-medium text-zinc-800 text-end lg:text-start">
            Get innovative and creative ideas to grow your business. We help you
            craft digital experiences that feel modern, human, and profitable.
          </p>

          {/* CTA Button */}
          <Button
            variant="ghost"
            className="group text-sm font-semibold tracking-widest uppercase hover:bg-transparent hover:text-zinc-600 p-0"
          >
            Start Project
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>

      {/* SCROLL INDICATOR - CENTER BOTTOM */}
      <div className="hidden sm:flex flex-col items-center gap-3 absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-20 mix-blend-difference">
        <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.3em] uppercase text-white/80">
          Scroll
        </span>
        <div className="relative w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white/80 rounded-full animate-bounce"></div>
        </div>
      </div>

      {/* CENTER KANJI OVERLAY */}
      {/* Centered, large, decorative Kanji with difference blend mode for visibility on both backgrounds */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0 mix-blend-difference opacity-20">
        <span className="[writing-mode:vertical-rl] font-body font-bold text-[12rem] sm:text-[15rem] lg:text-[20rem] xl:text-[25rem] leading-none text-zinc-600">
          改善
        </span>
      </div>
    </section>
  );
}
