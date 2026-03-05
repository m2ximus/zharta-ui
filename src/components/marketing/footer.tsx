import Link from "next/link";
import { ZhartaLogo } from "@/components/layout/zharta-logo";
import { ExternalLink } from "lucide-react";

const socialLinks = [
  { label: "X", href: "https://x.com/zhaboratory", icon: "X" },
  { label: "Discord", href: "#", icon: "Discord" },
  { label: "Medium", href: "#", icon: "Medium" },
  { label: "LinkedIn", href: "#", icon: "LinkedIn" },
];

const navColumns = [
  {
    title: "Protocol",
    links: [
      { label: "Lend", href: "/loans" },
      { label: "Borrow", href: "/loans" },
      { label: "Markets", href: "/protocol" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Docs", href: "/docs" },
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms", href: "/terms" },
      { label: "Privacy", href: "/privacy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-[var(--color-dark-bg-secondary)] border-t border-[var(--color-dark-border)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand column */}
          <div className="md:col-span-5">
            <ZhartaLogo size="md" />
            <p className="mt-4 text-sm text-[var(--color-dark-text-muted)] max-w-xs leading-relaxed font-[family-name:var(--font-body)]">
              Institutional-grade onchain credit protocol for fixed-rate lending
              against tokenized assets.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[var(--color-dark-bg-tertiary)] border border-[var(--color-dark-border)] flex items-center justify-center text-[var(--color-dark-text-muted)] hover:text-[var(--color-dark-text)] hover:border-[var(--color-dark-border-hover)] transition-colors"
                  aria-label={social.label}
                >
                  <span className="text-xs font-semibold font-[family-name:var(--font-mono)]">
                    {social.icon.charAt(0)}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {navColumns.map((column) => (
            <div key={column.title} className="md:col-span-2">
              <h4 className="text-xs font-medium tracking-[0.15em] uppercase text-[var(--color-dark-text-muted)] mb-4 font-[family-name:var(--font-body)]">
                {column.title}
              </h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--color-dark-text-muted)] hover:text-[var(--color-dark-text)] transition-colors font-[family-name:var(--font-body)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-[var(--color-dark-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--color-dark-text-muted)] font-[family-name:var(--font-body)]">
            &copy; 2026 Zharta. All rights reserved.
          </p>
          <a
            href="https://ethereum.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-[var(--color-dark-text-muted)] hover:text-[var(--color-dark-text)] transition-colors font-[family-name:var(--font-body)]"
          >
            Built on Ethereum
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </footer>
  );
}
