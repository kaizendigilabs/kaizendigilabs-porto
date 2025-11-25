'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { LayoutList, LayoutGrid, X, Loader2, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ArticleCard } from './ArticleCard';
import { EmptyState } from '@/components/shared/empty-state';

const ARTICLES_PER_PAGE = 5;

interface ArticleFeedProps {
    articles: any[]; // Replace 'any' with proper type if available
}

export function ArticleFeed({ articles }: ArticleFeedProps) {
    const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
    const [displayCount, setDisplayCount] = useState(ARTICLES_PER_PAGE);
    const [isLoading, setIsLoading] = useState(false);
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const topicFilter = searchParams.get('topic');
    const searchQuery = searchParams.get('search')?.toLowerCase() || '';

    // Filter articles by topic and search query
    const filteredArticles = useMemo(() => {
        let result = articles;

        // Filter by topic
        if (topicFilter) {
            // Filter by topic logic removed as tags are not in schema
            // If you want to filter by category, use article.category
            // result = result.filter((article) => article.category === normalizedFilter);
        }

        // Filter by search query
        if (searchQuery) {
            result = result.filter((article) =>
                article.title.toLowerCase().includes(searchQuery) ||
                article.excerpt?.toLowerCase().includes(searchQuery)
            );
        }

        return result;
    }, [articles, topicFilter, searchQuery]);

    // Convert articles to ArticleCard format
    const articleCards = useMemo(() => {
        return filteredArticles.map((article) => ({
            id: article.slug,
            slug: article.slug,
            title: article.title,
            excerpt: article.excerpt,
            category: article.category,
            date: new Date(article.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
            imageURL: article.image_url || article.hero_image || '/images/placeholder.svg',
            readTime: '5 min read', // Placeholder or calculate
            author: article.author?.full_name || 'Kaizen Digital Labs',
            authorAvatar: article.author?.avatar,
        }));
    }, [filteredArticles]);

    // Articles to display (paginated)
    const displayedArticles = useMemo(() => {
        return articleCards.slice(0, displayCount);
    }, [articleCards, displayCount]);

    const hasMore = displayCount < articleCards.length;

    // Reset display count when filter changes
    useEffect(() => {
        setDisplayCount(ARTICLES_PER_PAGE);
    }, [topicFilter, searchQuery]);

    const handleLoadMore = () => {
        setIsLoading(true);
        // Simulate loading delay for smooth UX
        setTimeout(() => {
            setDisplayCount((prev) => prev + ARTICLES_PER_PAGE);
            setIsLoading(false);
        }, 500);
    };

    const handleClearFilter = () => {
        router.push(pathname, { scroll: false });
    };

    return (
        <div className="w-full">
            {/* HEADER & TOGGLE */}
            <div className="flex items-center justify-between mb-8 border-b border-zinc-200 pb-4">
                <div className="flex flex-col gap-2">
                    {(topicFilter || searchQuery) && (
                        <p className="font-mono text-sm text-zinc-500">
                            {articleCards.length} article{articleCards.length !== 1 ? 's' : ''} found
                            {topicFilter && ` on `}
                            {searchQuery && ` for "${searchQuery}"`}
                        </p>
                    )}

                    <div className="flex items-center gap-2">
                        {/* Clear Filter Button */}
                        {(topicFilter || searchQuery) && (
                            <button
                                onClick={handleClearFilter}
                                className="p-1 text-zinc-400 hover:text-red-600 hover:bg-zinc-100 rounded-sm transition-colors"
                                aria-label="Clear filter"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}

                        <h2 className="font-heading text-2xl font-bold text-zinc-950">
                            {topicFilter
                                ? decodeURIComponent(topicFilter)
                                    .split(' ')
                                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                    .join(' ')
                                : searchQuery ? 'Search Results' : 'Latest Articles'}
                        </h2>
                    </div>
                </div>

                {/* Toggle only visible on desktop */}
                <div className="hidden lg:flex items-center gap-2">
                    <button
                        onClick={() => setViewMode('list')}
                        className={cn(
                            "p-2 rounded-sm transition-colors",
                            viewMode === 'list' ? "bg-zinc-100 text-zinc-900" : "text-zinc-400 hover:text-zinc-900"
                        )}
                        aria-label="List View"
                    >
                        <LayoutList className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => setViewMode('grid')}
                        className={cn(
                            "p-2 rounded-sm transition-colors",
                            viewMode === 'grid' ? "bg-zinc-100 text-zinc-900" : "text-zinc-400 hover:text-zinc-900"
                        )}
                        aria-label="Grid View"
                    >
                        <LayoutGrid className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* FEED - Always list on mobile/tablet, toggleable on desktop */}
            {articleCards.length === 0 ? (
                <EmptyState
                    icon={<Search className="w-16 h-16" />}
                    title="No Articles Found"
                    description={
                        topicFilter || searchQuery
                            ? "No articles match your current filters. Try adjusting your search or topic selection."
                            : "No articles available at the moment."
                    }
                />
            ) : (
                <>
                    <div className={cn(
                        "w-full",
                        // Mobile/Tablet: always list view
                        "flex flex-col gap-8",
                        // Desktop: respect viewMode state
                        "lg:flex-none",
                        viewMode === 'grid'
                            ? "lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-12"
                            : "lg:flex lg:flex-col lg:gap-8"
                    )}>
                        {displayedArticles.map((article) => (
                            <ArticleCard
                                key={article.id}
                                article={article}
                                // Always list view on mobile, respect viewMode on desktop
                                variant="list"
                                className="lg:hidden"
                            />
                        ))}
                        {/* Desktop cards that respect viewMode */}
                        <div className="hidden lg:contents">
                            {displayedArticles.map((article) => (
                                <ArticleCard key={article.id} article={article} variant={viewMode} />
                            ))}
                        </div>
                    </div>

                    {/* Load More Button */}
                    {hasMore && (
                        <div className="w-full flex justify-center mt-16">
                            <button
                                onClick={handleLoadMore}
                                disabled={isLoading}
                                className="group font-mono text-sm uppercase tracking-widest text-zinc-600 hover:text-zinc-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Loading...
                                    </>
                                ) : (
                                    <>
                                        Load More
                                        <span className="text-zinc-400">
                                            ({articleCards.length - displayCount})
                                        </span>
                                    </>
                                )}
                            </button>
                        </div>
                    )}

                    {/* End of results indicator */}
                    {!hasMore && displayedArticles.length > ARTICLES_PER_PAGE && (
                        <div className="w-full py-12 text-center">
                            <p className="text-sm font-mono text-zinc-400">
                                You've reached the end
                            </p>
                        </div>
                    )}
                </>
            )}

        </div>
    );
}
