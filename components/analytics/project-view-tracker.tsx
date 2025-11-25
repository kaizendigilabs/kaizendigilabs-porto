'use client';

import { useEffect } from 'react';
import { track } from '@vercel/analytics';

export function ProjectViewTracker({ slug, title }: { slug: string; title: string }) {
    useEffect(() => {
        // Track project view
        track('Project View', {
            slug,
            title,
        });
    }, [slug, title]);

    return null;
}
