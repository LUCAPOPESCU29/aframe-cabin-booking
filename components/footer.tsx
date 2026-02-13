'use client';

import Link from 'next/link';
import { Instagram, Facebook, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const footerLinks = {
  'Quick Links': [
    { label: 'Home', href: '/' },
    { label: 'Our Cabins', href: '/#cabins' },
    { label: 'Gallery', href: '/#gallery' },
    { label: 'Experience', href: '/#experience' },
  ],
  'Our Cabins': [
    { label: 'The Pine', href: '/cabins/the-pine' },
    { label: 'The Cedar', href: '/cabins/the-cedar' },
  ],
  'Legal': [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cancellation Policy', href: '/cancellation' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[var(--espresso-deep)] text-[var(--cream-warm)] border-t border-[var(--green-deep)]">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="font-[family-name:var(--font-heading)] text-3xl font-semibold mb-4">
              THE A-FRAME
            </h3>
            <p className="text-[var(--cream-warm)]/80 mb-6 max-w-sm">
              Where the forest meets home. Two luxury A-frame cabins offering an unforgettable escape into nature.
            </p>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-[family-name:var(--font-body)] font-semibold text-sm uppercase tracking-wider mb-4">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[var(--cream-warm)]/80 hover:text-[var(--green-sage)] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4 className="font-[family-name:var(--font-body)] font-semibold text-sm uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-3 text-[var(--cream-warm)]/80">
              <li>
                <a href="mailto:hello@theaframe.com" className="hover:text-[var(--green-sage)] transition-colors">
                  hello@theaframe.com
                </a>
              </li>
              <li>
                <a href="tel:+15551234567" className="hover:text-[var(--green-sage)] transition-colors">
                  (555) 123-4567
                </a>
              </li>
              <li className="text-sm">
                Azuga, Prahova County<br />
                Carpathian Mountains<br />
                Romania
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-12 border-t border-[var(--cream-warm)]/20">
          <div className="max-w-md">
            <h4 className="font-[family-name:var(--font-heading)] text-xl font-semibold mb-2">
              Stay in the loop
            </h4>
            <p className="text-[var(--cream-warm)]/80 mb-4 text-sm">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-[var(--brown-rich)] border-[var(--cream-warm)]/30 text-[var(--cream-warm)] placeholder:text-[var(--cream-warm)]/50 focus-visible:ring-[var(--green-sage)]"
              />
              <Button
                type="submit"
                className="bg-[var(--green-deep)] text-[var(--cream-warm)] hover:bg-[var(--green-sage)] whitespace-nowrap"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[var(--cream-warm)]/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[var(--cream-warm)]/60 text-sm">
              © {new Date().getFullYear()} The A-Frame. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--cream-warm)]/60 hover:text-[var(--green-sage)] transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--cream-warm)]/60 hover:text-[var(--green-sage)] transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://airbnb.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--cream-warm)]/60 hover:text-[var(--green-sage)] transition-colors"
                aria-label="Airbnb"
              >
                <Home size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
