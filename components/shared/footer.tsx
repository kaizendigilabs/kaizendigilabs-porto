/*
 * Section: Footer (Compact & Split)
 * Layout: 
 *  - Top: Light CTA Section (Compact).
 *  - Bottom: Dark Main Footer (Logo, Links, Social Icons).
 */

import Link from 'next/link';
import { Github, Instagram, Globe } from 'lucide-react';

const COLUMNS = [
  {
    title: 'Services',
    links: [
      { href: '/services', label: 'Strategy' },
      { href: '/services', label: 'Branding' },
      { href: '/services', label: 'Development' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'About' },
      { href: '/careers', label: 'Careers' },
      { href: '/contact', label: 'Contact' },
    ],
  },
];

const SOCIALS = [
  { href: 'https://instagram.com', icon: Instagram, label: 'Instagram' },
  { href: 'https://github.com', icon: Github, label: 'Github' },
  { href: 'https://kaizendigilabs.com', icon: Globe, label: 'Website' },
];

export function Footer() {
  return (
    <footer className="w-full bg-zinc-950 text-zinc-400">
      {/* MAIN FOOTER (Dark Background) */}
      <div className="mx-auto max-w-7xl">
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_auto] gap-12 lg:gap-24">

          {/* Brand & Socials */}
          <div className="space-y-6">
            <Link
              href="/"
              className="text-sm font-semibold tracking-[0.65em] text-background transition-colors hover:text-background/60"
            >
              KAIZEN
            </Link>
            <p className="mt-4 text-sm leading-relaxed max-w-xs">
              Crafting digital excellence through precision and continuous improvement.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4 pt-2">
              {SOCIALS.map(({ href, icon: Icon, label }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border border-zinc-800 hover:border-zinc-50 hover:text-zinc-50 transition-all duration-300"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 gap-8 md:gap-12">
            {COLUMNS.map((column) => (
              <div key={column.title} className="space-y-4">
                <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-zinc-600">
                  {column.title}
                </h3>
                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm hover:text-zinc-50 transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-zinc-600 uppercase tracking-wider">
          <p>© {new Date().getFullYear()} Kaizen Digilabs.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-zinc-400 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-zinc-400 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer >
  );
}
