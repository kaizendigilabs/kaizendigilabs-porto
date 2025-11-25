'use client';

import { useEffect, useRef } from 'react';
import { track } from '@vercel/analytics';
import { incrementArticleViews } from '@/app/actions/views';

interface ArticleViewTrackerProps {
    articleId: string;
    slug: string;
    title: string;
}

export function ArticleViewTracker({ articleId, slug, title }: ArticleViewTrackerProps) {
    const tracked = useRef(false);

    useEffect(() => {
        // Prevent double tracking in same session
        if (tracked.current) return;
        tracked.current = true;

        // Wait 3 seconds to filter out bots and accidental clicks
        const timer = setTimeout(() => {
            // 1. Track to Vercel Analytics (admin dashboard insights)
            track('Article View', { slug, title });

            // 2. Increment database views counter (public display)
            incrementArticleViews(articleId);
        }, 3000);

        return () => clearTimeout(timer);
    }, [articleId, slug, title]);

    return null;
}
