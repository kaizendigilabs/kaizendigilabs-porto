'use client';

import Link from 'next/link';
import { OptimizedImage } from '@/components/shared/optimized-image';
import { ArrowUpRight, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Article {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    imageURL: string;
    readTime: string;
    author: string;
    authorAvatar?: string | null;
}

interface ArticleCardProps {
    article: Article;
    variant: 'list' | 'grid';
    className?: string;
}

export function ArticleCard({ article, variant, className }: ArticleCardProps) {
    if (variant === 'list') {
        return (
            <article className={cn("group flex flex-col-reverse md:flex-row gap-6 md:gap-8 items-start border-b border-zinc-100 pb-8 last:border-0", className)}>
                <div className="flex-1 flex flex-col gap-2">
                    <div className="flex items-center gap-3 text-xs font-mono text-zinc-500 mb-1">
                        <span className="font-bold text-red-600 uppercase tracking-wider">{article.category}</span>
                        <span>•</span>
                        <span>{article.date}</span>
                    </div>

                    <Link href={`/articles/${article.slug}`} className="group-hover:text-red-600 transition-colors">
                        <h3 className="font-heading text-xl md:text-2xl font-bold text-zinc-900 leading-tight">
                            {article.title}
                        </h3>
                    </Link>

                    <p className="font-body text-zinc-600 leading-relaxed line-clamp-2 md:line-clamp-3 mb-2">
                        {article.excerpt}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-zinc-400 mt-auto">
                        <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {article.readTime}
                        </span>
                        <span className="flex items-center gap-2 ml-4">
                            <div className="relative w-5 h-5 rounded-full overflow-hidden bg-zinc-200">
                                <OptimizedImage
                                    src={article.authorAvatar || '/images/placeholder.svg'}
                                    alt={article.author}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <span>{article.author}</span>
                        </span>
                        {/* Optional: Bookmark or Share actions */}
                    </div>
                </div>

                <Link href={`/articles/${article.slug}`} className="block w-full md:w-[160px] lg:w-[200px] aspect-4/3 bg-zinc-100 shrink-0 overflow-hidden relative">
                    {article.imageURL ? (
                        <OptimizedImage
                            src={article.imageURL}
                            alt={article.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div className="w-full h-full bg-zinc-200 flex items-center justify-center text-zinc-400">
                            <span className="text-xs">No Image</span>
                        </div>
                    )}
                </Link>
            </article>
        );
    }

    // GRID VARIANT
    return (
        <article className="group flex flex-col h-full">
            <Link href={`/articles/${article.slug}`} className="block overflow-hidden aspect-3/2 bg-zinc-100 mb-6 relative">
                {article.imageURL ? (
                    <OptimizedImage
                        src={article.imageURL}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full bg-zinc-200 flex items-center justify-center text-zinc-400">
                        <span className="text-xs">No Image</span>
                    </div>
                )}
            </Link>

            <div className="flex flex-col grow">
                <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-red-600 uppercase tracking-wider">
                        {article.category}
                    </span>
                    <span className="font-mono text-xs text-zinc-400">
                        {article.readTime}
                    </span>
                </div>

                <Link href={`/articles/${article.slug}`} className="group-hover:text-red-600 transition-colors duration-300">
                    <h3 className="font-heading text-xl font-bold text-zinc-900 mb-3 leading-tight">
                        {article.title}
                    </h3>
                </Link>

                <p className="font-body text-sm text-zinc-500 leading-relaxed mb-4 line-clamp-3 grow">
                    {article.excerpt}
                </p>

                <div className="flex items-center justify-between border-t border-zinc-100 pt-4 mt-auto">
                    <span className="font-mono text-xs text-zinc-400">
                        {article.date}
                    </span>
                    <Link
                        href={`/articles/${article.slug}`}
                        className="flex items-center gap-1 text-xs font-bold text-zinc-900 group-hover:text-red-600 transition-colors"
                    >
                        Read
                        <ArrowUpRight className="w-3 h-3" />
                    </Link>
                </div>
            </div>
        </article>
    );
}
