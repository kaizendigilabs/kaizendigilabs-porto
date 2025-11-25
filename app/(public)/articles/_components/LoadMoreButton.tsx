'use client';

import { Loader2 } from 'lucide-react';

interface LoadMoreButtonProps {
    isLoading: boolean;
    remainingCount: number;
    onLoadMore: () => void;
}

export function LoadMoreButton({ isLoading, remainingCount, onLoadMore }: LoadMoreButtonProps) {
    return (
        <div className="w-full flex justify-center mt-16">
            <button
                onClick={onLoadMore}
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
                            ({remainingCount})
                        </span>
                    </>
                )}
            </button>
        </div>
    );
}
