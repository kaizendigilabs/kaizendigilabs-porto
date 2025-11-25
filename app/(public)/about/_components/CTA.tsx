import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
        <Button
          asChild
          className="group inline-flex items-center gap-2 p-6 text-sm font-mono tracking-widest uppercase"
        >
          <Link href="/contact">
            GET IN TOUCH
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
