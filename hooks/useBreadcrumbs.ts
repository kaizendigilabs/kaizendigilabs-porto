'use client';

import { useMemo } from 'react';
import { usePathname } from 'next/navigation';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface UseBreadcrumbsOptions {
  baseItems?: BreadcrumbItem[];
}

export function useBreadcrumbs(options?: UseBreadcrumbsOptions) {
  const pathname = usePathname();

  // Serialize baseItems to stabilize dependency comparison for React Compiler
  const serializedBaseItems = options?.baseItems
    ? JSON.stringify(options.baseItems)
    : null;

  return useMemo(() => {
    const segments = pathname.split('/').filter(Boolean);

    // If we are in dashboard, we want the first breadcrumb to be "Dashboard" pointing to /dashboard
    // But if we are AT /dashboard, we don't want a second "Dashboard"

    const items: BreadcrumbItem[] = [];

    if (segments[0] === 'dashboard') {
      items.push({ label: 'Dashboard', href: '/dashboard' });
    } else {
      items.push({ label: 'Home', href: '/' });
    }

    let cumulativePath = '';
    segments.forEach((segment, index) => {
      cumulativePath += `/${segment}`;

      // Skip the first segment if it's already handled (e.g. dashboard)
      if (index === 0 && segment === 'dashboard') return;

      const label = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      items.push({
        label,
        href: index === segments.length - 1 ? undefined : cumulativePath,
      });
    });

    return items;
  }, [pathname, serializedBaseItems]);
}
