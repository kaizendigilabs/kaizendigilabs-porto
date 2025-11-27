'use client';

import { LayoutGrid, List, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FeedHeaderProps {
    resultCount: number;
    topicFilter: string | null;
    searchQuery: string;
    viewMode: 'list' | 'grid';
    onViewModeChange: (mode: 'list' | 'grid') => void;
    onClearFilter: () => void;
}

export function FeedHeader({
    resultCount,
    topicFilter,
    searchQuery,
    viewMode,
    onViewModeChange,
    onClearFilter,
}: FeedHeaderProps) {
    const getTitle = () => {
        if (topicFilter) {
            return decodeURIComponent(topicFilter)
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
        }
        if (searchQuery) {
            return 'Search Results';
        }
        return 'Latest Articles';
    };

    return (
        <div className="flex items-center justify-between mb-8 border-b border-zinc-200 pb-4">
            <div className="flex flex-col gap-2">
                {(topicFilter || searchQuery) && (
                    <p className="font-mono text-sm text-zinc-500">
                        {resultCount} article{resultCount !== 1 ? 's' : ''} found
                        {topicFilter && ` on `}
                        {searchQuery && ` for "${searchQuery}"`}
                    </p>
                )}

                <div className="flex items-center gap-2">
                    {/* Clear Filter Button */}
                    {(topicFilter || searchQuery) && (
                        <Button
                            onClick={onClearFilter}
                            variant="ghost"
                            size="icon"
                            aria-label="Clear filter"
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    )}

                    <h2 className="font-heading text-2xl font-bold text-zinc-950">
                        {getTitle()}
                    </h2>
                </div>
            </div>

            {/* Toggle only visible on desktop */}
            <div className="hidden lg:flex items-center gap-2">
                <Button
                    onClick={() => onViewModeChange('list')}
                    variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                    size="icon"
                    aria-label="List View"
                >
                    <List className="w-5 h-5" />
                </Button>
                <Button
                    onClick={() => onViewModeChange('grid')}
                    variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                    size="icon"
                    aria-label="Grid View"
                >
                    <LayoutGrid className="w-5 h-5" />
                </Button>
            </div>
        </div>
    );
}
