'use client';

import { useState, useEffect } from 'react';
import { ArticleOutlineItem } from '@/data/articles';
import { cn } from '@/lib/utils';

interface ArticleTOCProps {
    outline: ArticleOutlineItem[];
}

export function ArticleTOC({ outline }: ArticleTOCProps) {
    const [activeId, setActiveId] = useState<string>('');

    useEffect(() => {
        // Scroll spy: detect which heading is currently visible
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            {
                rootMargin: '-100px 0px -80% 0px',
            }
        );

        // Observe all headings
        outline.forEach((item) => {
            const element = document.getElementById(item.id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => observer.disconnect();
    }, [outline]);

    if (outline.length === 0) return null;

    return (
        <div className="hidden lg:block sticky top-32 h-fit">
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">
                On this page
            </h3>
            <ul className="space-y-3 text-sm text-zinc-500 border-l border-zinc-200">
                {outline.map((item) => {
                    const isActive = activeId === item.id;
                    const isLevel2 = item.level === 2;

                    return (
                        <li key={item.id}>
                            <a
                                href={`#${item.id}`}
                                className={cn(
                                    'block transition-colors hover:text-zinc-900',
                                    isLevel2 ? 'pl-8' : 'pl-4',
                                    isActive
                                        ? 'text-zinc-900 font-medium border-l-2 border-brand -ml-px'
                                        : 'hover:text-brand'
                                )}
                            >
                                {item.title}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
