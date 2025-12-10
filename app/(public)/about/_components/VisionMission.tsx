'use client';

import { Quote } from 'lucide-react';
import React from 'react';

const MISSIONS = [
    {
        id: '01',
        title: 'Solutions for Business',
        description: 'Providing technology solutions and creative services that improve efficiency, competitiveness, and long-term sustainability for businesses in the digital era.'
    },
    {
        id: '02',
        title: 'Collaboration with Educational Institutions',
        description: 'Working with educational institutions to build digital platforms that are interactive, adaptive, and aligned with the needs of modern learning.'
    },
    {
        id: '03',
        title: 'Empowering the Younger Generation',
        description: 'Empowering Indonesia’s younger generation through training, digital projects, and collaborative spaces that help them grow their creativity and technology skills.'
    },
    {
        id: '04',
        title: 'Kaizen Culture',
        description: 'We practice a Kaizen (改善) culture of continuous improvement in every work process to drive innovation, service quality, and sustainable growth.'
    }
];

export function VisionMissionSection() {
    // Animation refs and effect
    const missionRefs = React.useRef<Array<HTMLElement | null>>([]);

    React.useEffect(() => {
        const observers: IntersectionObserver[] = [];
        missionRefs.current.forEach((el, idx) => {
            if (!el) return;
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setTimeout(() => {
                                entry.target.classList.remove('opacity-0', 'translate-y-4');
                                entry.target.classList.add('animate-in');
                            }, idx * 250);
                        }
                    });
                },
                { threshold: 0.2 }
            );
            observer.observe(el);
            observers.push(observer);
        });
        return () => {
            observers.forEach((obs) => obs.disconnect());
        };
    }, []);

    return (
        <section className="w-full bg-white">
            <div className="mx-auto w-full max-w-7xl px-8 py-32">

                {/* Vision Statement - Large and Centered */}
                <div className="mb-24 text-center max-w-4xl mx-auto">
                    <h2 className="font-heading text-sm font-bold tracking-widest uppercase text-zinc-400 mb-8">
                        Our Vision
                    </h2>
                    <div className="relative">
                        <Quote className="absolute -top-12 -left-12 w-32 h-32 text-zinc-100 fill-zinc-100 z-1" />
                        <p className="relative font-heading text-3xl lg:text-4xl font-bold text-zinc-900 leading-tight z-2">
                            To be a trusted partner in building a digital ecosystem that creates real impact for businesses, educational institutions, and the younger generation in Indonesia.
                        </p>
                    </div>
                </div>

                {/* Mission - Numbered List */}
                <div className="mb-12">
                    <h2 className="font-heading text-sm font-bold tracking-widest uppercase text-zinc-400 mb-12">
                        Our Mission
                    </h2>
                </div>

                <div className="space-y-6">
                    {MISSIONS.map((mission, index) => (
                        <article
                            key={mission.id}
                            ref={(el) => { missionRefs.current[index] = el; }}
                            className="group border-t border-zinc-200 opacity-0 translate-y-4 transition-all duration-500 frosted-glass/70 hover:border-t-brand hover:scale-[1.02]"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 p-8">
                                <div className="space-y-2 flex gap-4">
                                    <span className="font-mono text-md text-zinc-400 group-hover:text-brand transition-colors">
                                        {mission.id}
                                    </span>
                                    <h3 className="font-heading text-2xl font-bold text-zinc-900">
                                        {mission.title}
                                    </h3>
                                </div>
                                <p className="text-base leading-relaxed text-zinc-600 max-w-2xl">
                                    {mission.description}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>

            </div>
        </section>
    );
}
