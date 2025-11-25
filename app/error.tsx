'use client';

/*
 * Page: Global Error Handler
 * Design: Minimalist "Something Went Wrong" with alert indicator.
 * Note: This is a Client Component required by Next.js error boundary.
 */

import Link from 'next/link';
import { AlertTriangle, ArrowLeft, RotateCcw } from 'lucide-react';
import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log error to error reporting service
        console.error('Error boundary caught:', error);
    }, [error]);

    return (
        <div className="min-h-screen w-full bg-zinc-50 flex items-center justify-center relative overflow-hidden">
            {/* DECORATIVE KANJI WATERMARK */}
            <div className="absolute bottom-8 right-8 pointer-events-none select-none opacity-5">
                <span className="font-body font-bold text-[15rem] lg:text-[20rem] leading-none text-zinc-900">
                    錯
                </span>
            </div>

            {/* MAIN CONTENT */}
            <div className="relative z-10 max-w-2xl mx-auto px-8 py-24 space-y-8 text-center">
                {/* RED DOT INDICATOR WITH RIPPLE */}
                <div className="flex justify-center mb-8">
 <div className="relative">
    <AlertTriangle className="w-16 h-16 text-destructive animate-pulse" />
  </div>
                </div>

                {/* HEADING */}
                <h1 className="font-heading text-4xl lg:text-5xl font-bold tracking-tight text-zinc-950">
                    Something went wrong.
                </h1>

                {/* DESCRIPTION */}
                <p className="font-body text-lg lg:text-xl text-zinc-600 max-w-lg mx-auto mb-4 leading-relaxed">
                    We're experiencing technical difficulties. <br />
                    Our team has been notified and is working on a fix.
                </p>

                {/* CTA BUTTONS */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                    <button
                        onClick={reset}
                        className="group inline-flex items-center gap-2 text-sm font-mono tracking-widest uppercase bg-destructive text-white px-6 py-3 rounded-full hover:bg-red-700 transition-all duration-30 cursor-pointer"
                    >
                        <RotateCcw className="w-4 h-4 transition-transform group-hover:rotate-180" />
                        Try Again
                    </button>

                    <Link
                        href="/"
                        className="group inline-flex items-center gap-2 text-sm font-mono tracking-widest uppercase border-2 border-zinc-950 text-zinc-950 px-6 py-3 rounded-full hover:bg-zinc-950 hover:text-white transition-all duration-300"
                    >
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        Back to Home
                    </Link>
                </div>

                {/* ERROR DETAILS (Development Only) */}
                {process.env.NODE_ENV === 'development' && (
                    <details className="mt-12 mb-8 text-left max-w-lg mx-auto">
                        <summary className="font-mono text-xs text-zinc-500 cursor-pointer hover:text-zinc-700 uppercase tracking-wider">
                            Error Details (Dev Only)
                        </summary>
                        <pre className="mt-4 p-4 bg-zinc-100 rounded-lg text-xs text-zinc-800 overflow-auto max-h-48">
                            {error.message}
                            {error.digest && `\nDigest: ${error.digest}`}
                        </pre>
                    </details>
                )}

            </div>
        </div>
    );
}
