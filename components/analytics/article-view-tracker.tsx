'use client';

import { useEffect } from 'react';
import { track } from '@vercel/analytics';

export function ArticleViewTracker({ slug, title }: { slug: string; title: string }) {
    useEffect(() => {
        // Track article view
        track('Article View', {
            slug,
            title,
        });
    }, [slug, title]);

    return null;
}
