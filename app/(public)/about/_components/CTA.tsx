import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export function CTASection() {
  return (
    <section className="w-full bg-zinc-50 py-24 lg:py-32">
      <div className="max-w-4xl mx-auto text-center px-8">
        <h2 className="font-heading text-4xl lg:text-5xl font-bold text-zinc-900 mb-4">
          Let's Work Together
        </h2>
        <p className="text-lg text-zinc-600 mb-8 max-w-2xl mx-auto">
          Ready to start your next project? We'd love to hear from you and discuss how we can help bring your vision to life.
        </p>
        <Link 
          href="/contact"
          className="inline-flex items-center gap-2 px-8 py-4 bg-zinc-900 text-white font-bold hover:bg-red-600 transition-colors group"
        >
          Get in Touch
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>
    </section>
  );
}
