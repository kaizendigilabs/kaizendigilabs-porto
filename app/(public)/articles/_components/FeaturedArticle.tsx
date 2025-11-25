'use client';

import Link from 'next/link';
import { OptimizedImage } from '@/components/shared/optimized-image';
import { ArrowUpRight } from 'lucide-react';

interface FeaturedArticleProps {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    imageURL: string;
    author: string;
}

export function FeaturedArticle({
    slug,
    title,
    excerpt,
    category,
    date,
    imageURL,
    author,
}: FeaturedArticleProps) {
    return (
        <section className="w-full border-b border-zinc-200 pb-16 lg:pb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                {/* IMAGE */}
                <Link href={`/articles/${slug}`} className="group relative overflow-hidden aspect-4/3 lg:aspect-16/10 block bg-zinc-100">
                    <OptimizedImage
                        src={imageURL}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                </Link>

                {/* CONTENT */}
                <div className="flex flex-col gap-6 lg:pr-12">
                    <div className="flex items-center gap-4 text-xs font-mono tracking-widest uppercase text-zinc-500">
                        <span className="text-red-600 font-bold">{category}</span>
                        <span>•</span>
                        <span>{date}</span>
                    </div>

                    <Link href={`/articles/${slug}`} className="group">
                        <h2 className="font-heading text-4xl lg:text-5xl font-bold text-zinc-950 leading-[1.1] group-hover:text-zinc-700 transition-colors duration-300">
                            {title}
                        </h2>
                    </Link>

                    <p className="font-body text-lg text-zinc-600 leading-relaxed line-clamp-3">
                        {excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-zinc-200 overflow-hidden relative">
                                {/* TODO: Implement Author Avatar */}
                                <div className="absolute inset-0 bg-zinc-300" />
                            </div>
                            <span className="font-mono text-xs text-zinc-900 uppercase tracking-wider">
                                {author}
                            </span>
                        </div>

                        <Link
                            href={`/articles/${slug}`}
                            className="group flex items-center gap-2 text-sm font-bold text-zinc-900 hover:text-red-600 transition-colors"
                        >
                            Read Article
                            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
