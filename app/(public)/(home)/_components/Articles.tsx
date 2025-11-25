/*
 * Section: Articles (Editorial Insights)
 * Layout: Clean Grid (3-Col Desktop, Stack Mobile).
 * Design: Typography-led, minimalist card, hover zoom.
 */

import { OptimizedImage } from '@/components/shared/optimized-image';
import Link from 'next/link';
import SectionDivider from '@/components/shared/section-divider';
import { ArrowUpRight } from 'lucide-react';

interface ArticleSectionProps {
  articles: any[]; // Replace 'any' with proper type if available
}

export function ArticleSection({ articles }: ArticleSectionProps) {
  return (
    <section className="w-full bg-zinc-50 relative overflow-hidden">
      {/* DECORATIVE KANJI WATERMARK */}
      <div className="absolute bottom-0 left-0 pointer-events-none select-none z-0 opacity-5">
        <span className="font-body font-bold text-[20rem] leading-none text-zinc-900">
          知識
        </span>
      </div>

      <div className="mx-auto max-w-7xl px-8 py-24 relative z-10">
        <SectionDivider label="06 — LATEST INSIGHTS" />

        {/* HEADER */}
        <div className="mt-16 mb-16 flex flex-col md:flex-row justify-between items-end gap-8">
          <h2 className="font-heading text-5xl lg:text-7xl font-bold tracking-tighter text-zinc-950">
            Knowledge
            <br />
            Base.
          </h2>

          <Link href="/articles" className="group flex items-center gap-2 text-sm font-mono tracking-widest uppercase text-zinc-600 hover:text-zinc-900 transition-colors">
            View All Articles
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* ARTICLES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}

type ArticleCardProps = {
  article: any; // Replace with proper type
};

function ArticleCard({ article }: ArticleCardProps) {
  const imageURL = article.hero_image;

  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group flex flex-col gap-6 cursor-pointer"
    >
      {/* IMAGE */}
      <div className="relative aspect-3/2 w-full overflow-hidden bg-zinc-200">
        <OptimizedImage
          src={imageURL}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>

      {/* CONTENT */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
          <span className="font-mono text-xs tracking-widest uppercase text-red-600">
            {article.category}
          </span>
          <span className="font-mono text-xs text-zinc-400">
            {new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>

        <h3 className="font-heading text-2xl font-semibold leading-tight text-zinc-900 group-hover:text-zinc-600 transition-colors duration-300">
          {article.title}
        </h3>

        <p className="text-zinc-500 line-clamp-2 text-sm leading-relaxed">
          Explore the latest trends and strategies in digital innovation with our expert analysis.
        </p>
      </div>
    </Link>
  );
}
