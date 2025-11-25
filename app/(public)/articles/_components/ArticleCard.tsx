'use client';

import Link from 'next/link';
import { OptimizedImage } from '@/components/shared/optimized-image';
import { ArrowUpRight, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Article } from '@/lib/types/articles';

interface ArticleCardProps {
    article: Article;
    variant: 'list' | 'grid';
    className?: string;
}

export function ArticleCard({ article, variant, className }: ArticleCardProps) {
    if (variant === 'list') {
        return (
            <article className={cn("group flex flex-col-reverse md:flex-row gap-0 items-stretch frosted-glass/70 transition-all hover:shadow-md overflow-hidden last:border-0", className)}>
                {/* CONTENT SECTION */}
                <div className="flex-1 flex flex-col gap-2 p-6 bg-white">
                    <div className="flex items-center gap-3 text-xs font-mono text-zinc-500 mb-1">
                        <span>{article.date}</span>
                    </div>

                    <Link href={`/articles/${article.slug}`} className="group-hover:text-red-600 transition-colors">
                        <h3 className="font-heading text-xl md:text-2xl font-bold text-zinc-900 leading-tight line-clamp-2">
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
                        <span className="ml-4">
                            {article.author}
                        </span>
                    </div>
                </div>

                {/* IMAGE SECTION */}
                <Link href={`/articles/${article.slug}`} className="block w-full md:w-[200px] lg:w-[250px] aspect-video md:aspect-square bg-zinc-50 shrink-0 overflow-hidden relative">
                    <OptimizedImage
                        src={article.imageURL}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </Link>
            </article>
        );
    }

    // GRID VARIANT
    return (
        <article className="group flex flex-col h-full overflow-hidden frosted-glass/70 transition-all hover:shadow-md">
            <Link href={`/articles/${article.slug}`} className="block overflow-hidden aspect-3/2 bg-zinc-50 relative">
                <OptimizedImage
                    src={article.imageURL}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </Link>

            <div className="flex flex-col grow p-4">
                <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center gap-1 font-mono text-xs text-zinc-400">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                    </span>

                    <span className="font-mono text-xs text-zinc-400">
                        {article.author}
                    </span>
                </div>

                <Link href={`/articles/${article.slug}`} className="group-hover:text-red-600 transition-colors duration-300">
                    <h3 className="font-heading text-xl font-bold text-zinc-900 mb-3 leading-tight line-clamp-2">
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
