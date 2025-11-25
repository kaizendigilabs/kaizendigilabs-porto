'use client';

import { cn } from '@/lib/utils';

interface SectionDividerProps {
  label: string
  className?: string
  lineClassName?: string
}

export default function SectionDivider({ label, className, lineClassName }: SectionDividerProps) {
  return (
    <div className={cn('mb-10 flex w-full items-center gap-4', className)}>
      <span className="text-xs font-semibold tracking-[0.25em] text-muted-foreground">
        {label}
      </span>
      <div
        aria-hidden="true"
        className={cn('flex-1 border-t opacity-70', lineClassName)}
        style={{ borderColor: 'var(--color-border)' }}
      />
    </div>
  );
}
