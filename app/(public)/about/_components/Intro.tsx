// =========================
// 2. ABOUT INTRO SECTION
// =========================

import Image from 'next/image';

const ABOUT_BENTO_IMAGES = [
  '/images/about/bento-1.jpg',
  '/images/about/bento-2.jpg',
  '/images/about/bento-3.jpg',
  '/images/about/bento-4.jpg',
];

export function IntroSection() {
  return (
    <section className="w-full bg-zinc-50">
      <div className="mx-auto w-full max-w-7xl px-8 py-32">
        {/* Split-screen layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left side: Heading with red accent */}
          <div className="space-y-8">
            <div className="relative">
              <div className="absolute -left-4 top-0 w-1 h-24 bg-red-600" />
              <h2 className="font-heading text-5xl lg:text-6xl font-bold text-zinc-900 leading-tight">
                Our Story
              </h2>
            </div>
          </div>

          {/* Right side: Multi-paragraph narrative */}
          <div className="space-y-6 text-zinc-600 leading-relaxed">
            <p className="text-lg">
              Founded in 2020, Kaizen Digilabs emerged from a simple belief: that continuous improvement isn't just a philosophy, but a practice that transforms how businesses connect with their audiences.
            </p>

            <p>
              We started as a small team of designers and strategists who saw the gap between beautiful design and meaningful business outcomes. Today, we bridge that gap for companies ready to evolve their digital presence with intention and clarity.
            </p>

            {/* Philosophy Callout */}
            <div className="my-8 py-8 border-l-4 border-zinc-500 pl-8 bg-zinc-50">
              <p className="font-heading text-2xl lg:text-3xl font-bold text-zinc-900 mb-2">
                "Iterate, Innovate, Improve"
              </p>
              <p className="text-sm text-zinc-600">
                Our philosophy of continuous improvement in action
              </p>
            </div>

            <p>
              Our mission is to help organizations build brands that resonate. We believe in the power of thoughtful design, strategic thinking, and collaborative partnerships. Every project is an opportunity to refine, improve, and create something that lasts.
            </p>

            <p className="text-zinc-900 font-medium">
              We believe in progress over perfection, clarity over complexity, and results that speak for themselves.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
