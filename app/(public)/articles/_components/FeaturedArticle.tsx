'use client';

import Link from 'next/link';
import { OptimizedImage } from '@/components/shared/optimized-image';
import { ArrowUpRight, Clock } from 'lucide-react';
import { ArticleWithAuthor } from '@/lib/types/articles';
import { calculateReadTime } from '@/lib/utils';

interface FeaturedArticleProps {
    article: ArticleWithAuthor;
}

export function FeaturedArticle({ article }: FeaturedArticleProps) {
    const author = article.profiles?.full_name || '';
    const date = new Date(article.created_at).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
    const imageURL = article.image_url || '/images/placeholder.svg';
    const readTime = calculateReadTime(article.content);

    return (
        <section className="w-full border-b border-zinc-200 pb-16 lg:pb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                {/* IMAGE */}
                <Link href={`/articles/${article.slug}`} className="group relative overflow-hidden aspect-4/3 lg:aspect-16/10 block bg-zinc-100">
                    <OptimizedImage
                        src={imageURL}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                </Link>

                {/* CONTENT */}
                <div className="flex flex-col gap-6 lg:pr-12">
                    <div className="flex items-center gap-4 text-xs font-mono tracking-widest uppercase text-zinc-500">
                        <span>{date}</span>
                        <span>•</span>
                        <span className="inline-flex items-center gap-2">
                            <Clock className="w-3 h-3" />
                            {readTime}
                        </span>
                    </div>

                    <Link href={`/articles/${article.slug}`} className="group">
                        <h2 className="font-heading text-4xl lg:text-5xl font-bold text-zinc-950 leading-[1.1] group-hover:text-zinc-700 transition-colors duration-300">
                            {article.title}
                        </h2>
                    </Link>

                    <p className="font-body text-lg text-zinc-600 leading-relaxed line-clamp-3">
                        {article.excerpt || ''}
                    </p>

                    <div className="flex items-center justify-between gap-4 pt-4">
                        <span className="font-mono text-xs text-zinc-500">
                            {author}
                        </span>

                        <Link
                            href={`/articles/${article.slug}`}
                            className="group flex items-center gap-2 text-sm font-bold text-zinc-900 hover:text-brand transition-colors"
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
