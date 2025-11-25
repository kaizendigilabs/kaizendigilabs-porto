'use client';

import { cn } from '@/lib/utils';

interface SectionDividerProps {
  label: string
  className?: string
  lineClassName?: string
}

export default function SectionDivider({ label, className, lineClassName }: SectionDividerProps) {
  return (
    <div className={cn('mb-10 flex w-full items-center gap-2', className)}>
      <span className="text-xs font-mono font-semibold tracking-widest text-muted-foreground">
        {label}
      </span>
      <div
        className={cn(
          'h-px flex-1 bg-linear-to-r from-border to-transparent',
          lineClassName
        )}
      />
    </div>
  );
}
