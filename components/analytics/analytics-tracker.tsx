'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackPageView } from '@/app/actions/analytics';
import { useIsMobile } from '@/hooks/use-mobile';

export function AnalyticsTracker() {
    const pathname = usePathname();
    const isMobile = useIsMobile();

    useEffect(() => {
        // Simple device detection
        const device = isMobile ? 'mobile' : 'desktop';

        // Track page view
        trackPageView(pathname, device);
    }, [pathname, isMobile]);

    return null;
}
