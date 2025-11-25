'use client';

import { useEffect, useRef } from 'react';
import { track } from '@vercel/analytics';
import { incrementServiceViews } from '@/app/actions/views';

interface ServiceViewTrackerProps {
    serviceId: string;
    slug: string;
    title: string;
}

export function ServiceViewTracker({ serviceId, slug, title }: ServiceViewTrackerProps) {
    const tracked = useRef(false);

    useEffect(() => {
        if (tracked.current) return;
        tracked.current = true;

        const timer = setTimeout(() => {
            // Dual tracking: Vercel + Database
            track('Service View', { slug, title });
            incrementServiceViews(serviceId);
        }, 3000);

        return () => clearTimeout(timer);
    }, [serviceId, slug, title]);

    return null;
}
