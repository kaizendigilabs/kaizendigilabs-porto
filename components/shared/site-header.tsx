/*
 * Section: Sticky Header
 * Layout: Desktop-first toolbar with logo, inline links, dan CTA.
 * Behavior: Tetap menempel di atas selama scroll, fokus pada viewport besar.
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';
import { useScrollDirection } from '@/hooks/useScrollDirection';

import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet';
import { useState } from 'react';

const NAV_ITEMS = [
  { href: '/', label: 'HOME' },
  { href: '/services', label: 'SERVICES' },
  { href: '/projects', label: 'PROJECTS' },
  { href: '/articles', label: 'ARTICLES' },
  { href: '/about', label: 'ABOUT' },
];

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const isVisible = useScrollDirection();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname?.startsWith(href);
  };

  return (
    <header className={`fixed w-full top-0 z-40 border-b border-foreground/10 bg-white/60 text-foreground backdrop-blur transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      {/* Primary toolbar: brand, desktop nav, CTA */}
      <div className="mx-auto flex gap-8 h-(--header-h) items-center px-8 lg:px-16 justify-between lg:justify-start">
        <Link
          href="/"
          className="text-sm font-semibold tracking-[0.65em] text-foreground transition-colors hover:text-foreground/60"
        >
          KAIZEN
        </Link>

        {/* Desktop navigation */}
        <nav className="ml-auto hidden lg:flex items-center gap-8 text-[0.7rem] tracking-[0.4em] group">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative font-mono transition-colors hover:text-foreground hover:font-medium group-hover:text-foreground/50 ${active ? 'text-foreground font-medium' : ''
                  }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <Button
          asChild
          variant="ghost"
          className="hidden lg:inline-flex rounded-md border border-foreground/30 py-1 px-4 bg-transparent uppercase text-[0.7rem] font-mono font-semibold tracking-[0.35em] text-foreground transition hover:bg-foreground hover:text-background"
        >
          <Link href="/contact">HIRE US</Link>
        </Button>

        {/* Mobile Menu Trigger */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" className="-mr-4">
              <Menu className="h-6 w-6" suppressHydrationWarning />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-white/95 backdrop-blur-xl border-l border-foreground/10">
            <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
            <nav className="flex flex-col gap-8 mt-12">
              {NAV_ITEMS.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg font-mono tracking-[0.2em] transition-colors hover:text-primary ${active ? 'text-primary font-medium' : 'text-foreground/80'
                      }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Button
                asChild
                variant="outline"
                className="mt-4 w-full justify-center rounded-md border border-foreground/30 py-6 uppercase text-sm font-mono font-semibold tracking-[0.35em] hover:bg-foreground hover:text-background"
              >
                <Link href="/contact" onClick={() => setIsOpen(false)}>HIRE US</Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
