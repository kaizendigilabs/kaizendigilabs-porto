'use client';

import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import {
    TrendingUp,
    Users,
    Lightbulb,
    Award,
    FileText,
    Handshake,
    Zap
} from 'lucide-react';

const values = [
    {
        id: '01',
        title: 'Continuous Improvement (Kaizen)',
        description: 'Never settling for good enough. Always iterating, learning, and improving.',
        icon: TrendingUp,
    },
    {
        id: '02',
        title: 'Client-Centric',
        description: 'Your success is our success. We listen, understand, and deliver solutions that matter.',
        icon: Users,
    },
    {
        id: '03',
        title: 'Innovation & Creativity',
        description: 'Thinking outside the box to create unique solutions that stand out.',
        icon: Lightbulb,
    },
    {
        id: '04',
        title: 'Quality & Excellence',
        description: 'Commitment to delivering high-quality work with attention to detail.',
        icon: Award,
    },
    {
        id: '05',
        title: 'Transparency & Integrity',
        description: 'Honest communication, clear pricing, and ethical business practices.',
        icon: FileText,
    },
    {
        id: '06',
        title: 'Collaboration',
        description: 'Working together with clients as partners, not just vendors.',
        icon: Handshake,
    },
    {
        id: '07',
        title: 'Adaptability',
        description: 'Flexible and responsive to changing needs and market conditions.',
        icon: Zap,
    },
];

export function WhyChooseUs() {
    const [activeId, setActiveId] = useState(values[0].id);
    const [indicatorStyle, setIndicatorStyle] = useState({ top: 0, height: 0 });
    const containerRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Update indicator position when activeId changes
    useEffect(() => {
        const activeIndex = values.findIndex(v => v.id === activeId);
        const activeElement = itemRefs.current[activeIndex];

        if (activeElement && containerRef.current) {
            const containerRect = containerRef.current.getBoundingClientRect();
            const itemRect = activeElement.getBoundingClientRect();

            // Calculate position relative to the container
            const top = itemRect.top - containerRect.top;
            const height = itemRect.height;

            setIndicatorStyle({ top, height });
        }
    }, [activeId]);

    // Intersection Observer for scroll spy
    useEffect(() => {
        const observers = values.map((value, index) => {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setActiveId(value.id);
                        }
                    });
                },
                {
                    root: null,
                    rootMargin: '-45% 0px -45% 0px', // Adjusted to be slightly more precise
                    threshold: 0,
                }
            );

            if (itemRefs.current[index]) {
                observer.observe(itemRefs.current[index]!);
            }

            return observer;
        });

        return () => {
            observers.forEach((observer) => observer.disconnect());
        };
    }, []);

    const scrollToItem = (index: number) => {
        if (itemRefs.current[index]) {
            const element = itemRefs.current[index]!;
            const yOffset = -(window.innerHeight / 2) + (element.offsetHeight / 2);
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    return (
        <section className="w-full bg-zinc-50 py-24 lg:py-32 relative">
            {/* DECORATIVE KANJI WATERMARK */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0 opacity-[0.02] overflow-hidden">
                <span className="font-body font-bold text-[20rem] leading-none text-zinc-900">
                    選択
                </span>
            </div>

            <div className="mx-auto max-w-7xl px-8">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-24">

                    {/* LEFT COLUMN: STICKY HEADER */}
                    <div className="hidden lg:block sticky top-32 self-start h-fit">
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h2 className="font-mono text-sm font-semibold uppercase tracking-widest text-red-600">
                                    Why Choose Us
                                </h2>
                                <h3 className="font-heading text-5xl font-bold tracking-tight text-zinc-950 leading-tight">
                                    Built on Values,<br />
                                    Driven by Results.
                                </h3>
                                <p className="font-body text-lg text-zinc-600 leading-relaxed max-w-md">
                                    We don't just build software; we build partnerships. Our philosophy is rooted in continuous improvement and a deep commitment to your success.
                                </p>
                            </div>

                            <div className="flex items-center gap-2 text-sm font-mono text-zinc-400">
                                <span>{activeId}</span>
                                <div className="relative h-0.5 w-12 bg-zinc-200 overflow-hidden">
                                    <div
                                        className="absolute left-0 top-0 h-full bg-zinc-950 transition-all duration-500"
                                        style={{
                                            width: `${((values.findIndex(v => v.id === activeId) + 1) / values.length) * 100}%`
                                        }}
                                    />
                                </div>
                                <span>{String(values.length).padStart(2, '0')}</span>
                            </div>
                        </div>
                    </div>

                    {/* MOBILE HEADER */}
                    <div className="lg:hidden space-y-4 mb-8">
                        <h2 className="font-mono text-sm font-semibold uppercase tracking-widest text-red-600">
                            Why Choose Us
                        </h2>
                        <h3 className="font-heading text-4xl font-bold tracking-tight text-zinc-950 leading-tight">
                            Built on Values,<br />
                            Driven by Results.
                        </h3>
                    </div>

                    {/* RIGHT COLUMN: SCROLLABLE LIST */}
                    <div className="relative pl-8 lg:pl-12" ref={containerRef}>

                        {/* BACKGROUND RAIL */}
                        <div className="absolute left-0 top-0 bottom-0 w-px bg-zinc-200" />

                        {/* SLIDING ACTIVE INDICATOR */}
                        <div
                            className="absolute left-0 w-[2px] bg-red-600 transition-all duration-500 ease-out"
                            style={{
                                top: `${indicatorStyle.top}px`,
                                height: `${indicatorStyle.height}px`,
                            }}
                        />

                        <div className="space-y-12 lg:space-y-24">
                            {values.map((value, index) => (
                                <div
                                    key={value.id}
                                    ref={(el) => { itemRefs.current[index] = el; }}
                                    onClick={() => scrollToItem(index)}
                                    className={cn(
                                        "group cursor-pointer relative",
                                        activeId === value.id ? "opacity-100" : "opacity-30 hover:opacity-60"
                                    )}
                                >
                                    <div className={cn(
                                        "space-y-4 transition-all duration-500 ease-out",
                                        activeId === value.id ? "translate-x-0" : "-translate-x-4"
                                    )}>
                                        <h4 className={cn(
                                            "font-heading text-2xl lg:text-3xl font-bold transition-colors duration-300",
                                            activeId === value.id ? "text-zinc-950" : "text-zinc-400 group-hover:text-zinc-600"
                                        )}>
                                            {value.title}
                                        </h4>

                                        <p className={cn(
                                            "font-body text-base lg:text-lg leading-relaxed transition-all duration-500",
                                            activeId === value.id ? "text-zinc-600 max-h-40 opacity-100" : "text-zinc-400 max-h-0 opacity-0 overflow-hidden lg:max-h-40 lg:opacity-100"
                                        )}>
                                            {value.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
