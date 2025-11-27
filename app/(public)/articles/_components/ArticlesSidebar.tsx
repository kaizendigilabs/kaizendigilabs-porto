'use client';

import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import { useMemo } from 'react';
import { ArticleWithAuthor } from '@/lib/types/articles';
import { Button } from '@/components/ui/button';

interface ArticlesSidebarProps {
  articles: ArticleWithAuthor[];
}

export function ArticlesSidebar({ articles }: ArticlesSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get('search') || '';

  // Extract unique topics from all articles
  const topics = useMemo(() => {
    const topicMap = new Map<string, { name: string; slug: string }>();
    articles.forEach((article) => {
      article.tags?.forEach((tag) => {
        if (!topicMap.has(tag.slug)) {
          topicMap.set(tag.slug, tag);
        }
      });
    });
    return Array.from(topicMap.values()).slice(0, 8); // Limit to 8 topics
  }, [articles]);

  // Top 3 insights - sort by views (most viewed articles)
  const topInsights = useMemo(() => {
    return articles
      .filter(a => a.views && a.views > 0) // Only articles with views
      .sort((a, b) => (b.views || 0) - (a.views || 0)) // Sort by views DESC
      .slice(0, 3)
      .map((article, index) => ({
        slug: article.slug,
        title: article.title,
        views: article.views,
        index: index + 1,
      }));
  }, [articles]);

  const handleTopicClick = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tag', slug);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (term) {
      params.set('search', term);
    } else {
      params.delete('search');
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <aside className="w-full flex flex-col gap-12">
      {/* SEARCH */}
      <div>
        <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-zinc-400 mb-6">
          Search
        </h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search articles..."
            defaultValue={currentSearch}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm border border-zinc-200 focus:outline-none focus:border-zinc-900 bg-white rounded-sm"
          />
        </div>
      </div>

      {/* TOP INSIGHTS */}
      {topInsights.length > 0 && (
        <div>
          <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-zinc-400 mb-6">
            Top Insights
          </h3>
          <ul className="space-y-4">
            {topInsights.map((insight) => (
              <li key={insight.slug} className="group">
                <Link href={`/articles/${insight.slug}`} className="flex gap-3 items-center">
                  <span className="font-mono text-xl text-zinc-200 font-bold leading-none group-hover:text-red-600 transition-colors">
                    0{insight.index}
                  </span>
                  <span className="font-heading text-zinc-700 font-bold leading-tight group-hover:text-zinc-900 transition-colors">
                    {insight.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* TOPICS */}
      {topics.length > 0 && (
        <div>
          <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-zinc-400 mb-6">
            Topics
          </h3>
          <div className="flex flex-wrap gap-2">
            {topics.map((topic) => (
              <Button
                key={topic.slug}
                onClick={() => handleTopicClick(topic.slug)}
                size="sm"
                className="text-xs font-mono font-medium bg-zinc-100 text-muted-foreground hover:text-primary-foreground"
              >
                {topic.name}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* NEWSLETTER */}
      {/* <div className="bg-zinc-100 p-6 rounded-sm">
        <h3 className="font-heading text-lg font-bold text-zinc-900 mb-2">
          Weekly Digest
        </h3>
        <p className="text-sm text-zinc-600 mb-4 leading-relaxed">
          Get the latest insights on design and engineering delivered to your inbox.
        </p>
        <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="Email address"
            className="w-full px-3 py-2 text-sm border border-zinc-200 focus:outline-none focus:border-zinc-900 bg-white"
          />
          <button
            type="submit"
            className="w-full px-3 py-2 text-sm font-bold bg-zinc-900 text-white hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
          >
            Subscribe
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </form>
      </div> */}
    </aside>
  );
}
