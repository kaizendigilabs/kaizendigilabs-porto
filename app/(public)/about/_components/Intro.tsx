// =========================
// 2. ABOUT INTRO SECTION
// =========================

export function IntroSection() {
  return (
    <section className="w-full bg-zinc-50">
      <div className="mx-auto w-full max-w-7xl px-8 py-32">
        {/* Split-screen layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left side: Heading with brand accent */}
          <div className="space-y-8">
            <div className="relative">
              <div className="absolute -left-4 top-0 w-1 h-24 bg-brand" />
              <h2 className="font-heading text-5xl lg:text-6xl font-bold text-zinc-900 leading-tight">
                Our Story
              </h2>
            </div>
          </div>

          {/* Right side: Multi-paragraph narrative */}
          <div className="space-y-6 text-zinc-600 leading-relaxed">
            <p className="text-lg">
              Founded in 2025, <span className="font-semibold">PT Kaizen Digital Labs (Indonesia Ltd.)</span> grew from a simple belief that continuous improvement is not only a philosophy, but a daily practice that changes how businesses connect with their audiences.
            </p>

            <p className='text-lg'>
              We started as a small team of designers and technologists who saw a gap between beautiful design and real business results. Today, we help close that gap for companies that want to evolve their digital presence with intention and clarity.
            </p>

            {/* Philosophy Callout */}
            <div className="my-8 py-8 border-l-4 border-brand pl-8 bg-zinc-50">
              <p className="font-heading text-2xl lg:text-3xl font-bold text-brand mb-2">
                &quot;Iterate, Innovate, Improve&quot;
              </p>
              <p className="text-sm text-zinc-600">
                Our philosophy of continuous improvement in action
              </p>
            </div>

            <p className='text-lg'>
              Our mission is to help organizations build brands and products that truly resonate. We believe in thoughtful design, clear strategy, and collaborative partnerships. Every project is a chance to refine, improve, and create something that lasts. We believe in progress over perfection, clarity over complexity, and results that speak for themselves.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
