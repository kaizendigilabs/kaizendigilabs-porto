/*
 * Section: Articles (Editorial Insights)
 * Layout: Clean Grid (3-Col Desktop, Stack Mobile).
 * Design: Typography-led, minimalist card, hover zoom.
 */

import Link from 'next/link';
import SectionDivider from '@/components/shared/section-divider';
import { ArrowUpRight } from 'lucide-react';
import { ArticleWithAuthor, formatArticleForCard } from '@/lib/types/articles';
import { ArticleCard } from '@/app/(public)/articles/_components/ArticleCard';

interface ArticleSectionProps {
  articles: ArticleWithAuthor[];
}

export function ArticleSection({ articles }: ArticleSectionProps) {
  // Convert ArticleWithAuthor to Article format for ArticleCard
  const formattedArticles = articles.map(article => formatArticleForCard(article));

  return (
    <section className="w-full bg-zinc-50 relative overflow-hidden">
      {/* DECORATIVE KANJI WATERMARK */}
      <div className="absolute bottom-0 left-0 pointer-events-none select-none z-0 opacity-5">
        <span className="font-body font-bold text-[20rem] leading-none text-zinc-900">
          知識
        </span>
      </div>

      <div className="mx-auto max-w-7xl px-8 py-24 relative z-10">
        <SectionDivider label="LATEST INSIGHTS" />

        {/* HEADER */}
        <div className="mt-16 mb-16 flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="space-y-4">
            <h2 className="font-heading text-5xl lg:text-7xl font-bold tracking-tighter text-zinc-950">
              Knowledge
              <br />
              Base.
            </h2>

            <p className="max-w-md text-lg text-zinc-600 font-medium leading-relaxed">
              A growing library of articles and resources <br />
              to help you design, build, and ship better digital products.
            </p>
          </div>
          <Link href="/articles" className="group flex items-center gap-2 text-sm font-mono tracking-widest uppercase text-zinc-600 hover:text-zinc-900 transition-colors">
            View All Articles
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* ARTICLES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {formattedArticles.map((article) => (
            <ArticleCard
              key={article.slug}
              article={article}
              variant="grid"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
