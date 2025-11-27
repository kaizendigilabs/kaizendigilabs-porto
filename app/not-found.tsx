/*
 * Page: 404 Not Found
 * Design: Minimalist "Lost in Space" with Kaizen Neo-Minimal Editorial aesthetic.
 */

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen w-full bg-zinc-50 flex items-center justify-center relative overflow-hidden">
            {/* DECORATIVE KANJI WATERMARK */}
            <div className="absolute bottom-8 right-8 pointer-events-none select-none opacity-5">
                <span className="font-body font-bold text-[15rem] lg:text-[20rem] leading-none text-zinc-900">
                    迷
                </span>
            </div>

            {/* MAIN CONTENT */}
            <div className="relative z-10 max-w-4xl mx-auto px-8 py-24 text-center">
                {/* 404 NUMBER (Outline Effect) */}
                <h1 className="font-heading font-bold text-[8rem] lg:text-[20rem] leading-none tracking-tighter mb-8 text-transparent [-webkit-text-stroke:2px_var(--color-zinc-950)] opacity-30">
                    404
                </h1>

                {/* HEADING */}
                <h2 className="font-heading text-4xl lg:text-5xl font-bold tracking-tight text-zinc-950 mb-6">
                    Page not found.
                </h2>

                {/* DESCRIPTION */}
                <p className="font-body text-lg lg:text-xl text-zinc-600 max-w-md mx-auto mb-12 leading-relaxed">
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>

                {/* CTA BUTTONS */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/"
                        className="group inline-flex items-center gap-2 text-sm font-mono tracking-widest uppercase bg-zinc-950 text-white px-6 py-3 rounded-full hover:bg-red-600 transition-all duration-300"
                    >
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        Back to Home
                    </Link>

                    <Link
                        href="/contact"
                        className="group inline-flex items-center gap-2 text-sm font-mono tracking-widest uppercase border-2 border-zinc-950 text-zinc-950 px-6 py-3 rounded-full hover:bg-zinc-950 hover:text-white transition-all duration-300"
                    >
                        Contact Support
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
