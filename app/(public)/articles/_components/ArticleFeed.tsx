'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ArticleCard } from './ArticleCard';
import { FeedHeader } from './FeedHeader';
import { LoadMoreButton } from './LoadMoreButton';
import { EmptyState } from '@/components/shared/empty-state';
import { ArticleWithAuthor, formatArticleForCard } from '@/lib/types/articles';

const ARTICLES_PER_PAGE = 5;

interface ArticleFeedProps {
    articles: ArticleWithAuthor[];
}

export function ArticleFeed({ articles }: ArticleFeedProps) {
    const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
    const [displayCount, setDisplayCount] = useState(ARTICLES_PER_PAGE);
    const [isLoading, setIsLoading] = useState(false);

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const tagFilter = searchParams.get('tag');
    const searchQuery = searchParams.get('search')?.toLowerCase() || '';

    // Filter articles by search query
    const filteredArticles = useMemo(() => {
        if (!searchQuery) return articles;

        return articles.filter((article) =>
            article.title.toLowerCase().includes(searchQuery) ||
            article.excerpt?.toLowerCase().includes(searchQuery)
        );
    }, [articles, searchQuery]);

    // Convert to ArticleCard format
    const articleCards = useMemo(() => {
        return filteredArticles.map((article) => formatArticleForCard(article));
    }, [filteredArticles]);

    // Paginated articles
    const displayedArticles = useMemo(() => {
        return articleCards.slice(0, displayCount);
    }, [articleCards, displayCount]);

    const hasMore = displayCount < articleCards.length;

    // Reset display count when filter changes
    useEffect(() => {
        setDisplayCount(ARTICLES_PER_PAGE);
    }, [tagFilter, searchQuery]);

    const handleLoadMore = () => {
        setIsLoading(true);
        setTimeout(() => {
            setDisplayCount((prev) => prev + ARTICLES_PER_PAGE);
            setIsLoading(false);
        }, 500);
    };

    const handleClearFilter = () => {
        router.replace(pathname, { scroll: false });
    };

    return (
        <div className="w-full">
            <FeedHeader
                resultCount={articleCards.length}
                topicFilter={tagFilter}
                searchQuery={searchQuery}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                onClearFilter={handleClearFilter}
            />

            {articleCards.length === 0 ? (
                <EmptyState
                    icon={<Search className="w-16 h-16" />}
                    title="No Articles Found"
                    description={
                        tagFilter || searchQuery
                            ? "No articles match your current filters. Try adjusting your search or topic selection."
                            : "No articles available at the moment."
                    }
                />
            ) : (
                <>
                    <div className={cn(
                        "w-full",
                        "flex flex-col gap-8",
                        "lg:flex-none",
                        viewMode === 'grid'
                            ? "lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-12"
                            : "lg:flex lg:flex-col lg:gap-8"
                    )}>
                        {/* Mobile: always list */}
                        {displayedArticles.map((article) => (
                            <ArticleCard
                                key={article.id}
                                article={article}
                                variant="list"
                                className="lg:hidden"
                            />
                        ))}

                        {/* Desktop: respect viewMode */}
                        <div className="hidden lg:contents">
                            {displayedArticles.map((article) => (
                                <ArticleCard
                                    key={article.id}
                                    article={article}
                                    variant={viewMode}
                                />
                            ))}
                        </div>
                    </div>

                    {hasMore && (
                        <LoadMoreButton
                            isLoading={isLoading}
                            remainingCount={articleCards.length - displayCount}
                            onLoadMore={handleLoadMore}
                        />
                    )}

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
