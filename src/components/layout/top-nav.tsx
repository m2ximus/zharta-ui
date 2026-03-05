"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { ZhartaLogo } from "./zharta-logo";
import { ThemeToggle } from "./theme-toggle";

const resourceLinks = [
  { label: "Documentation", href: "/docs" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
];

export function TopNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-[var(--background)]/80 backdrop-blur-xl border-b border-[var(--border)]"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <ZhartaLogo size="md" />
            </Link>

            {/* Desktop right */}
            <div className="hidden md:flex items-center gap-3">
              {/* Resources dropdown */}
              <div className="relative">
                <button
                  onClick={() => setResourcesOpen(!resourcesOpen)}
                  onBlur={() =>
                    setTimeout(() => setResourcesOpen(false), 150)
                  }
                  className={cn(
                    "inline-flex items-center gap-1 px-4 py-2 text-sm rounded-full transition-colors cursor-pointer",
                    "text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
                  )}
                >
                  Resources
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 transition-transform",
                      resourcesOpen && "rotate-180"
                    )}
                  />
                </button>
                {resourcesOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--popover)] p-1 shadow-xl">
                    {resourceLinks.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-3 py-2 text-sm rounded-[var(--radius-card)] text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--background-tertiary)] transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <ThemeToggle />

              <Link
                href="/portfolio"
                className="inline-flex items-center px-5 py-2 text-sm font-medium rounded-full bg-[var(--color-primary)] text-black hover:bg-[var(--color-primary-hover)] transition-colors"
              >
                Launch App
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--background-tertiary)] transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />

          <div className="absolute top-0 right-0 h-full w-[280px] bg-[var(--background)] border-l border-[var(--border)] p-6 pt-20">
            <div className="flex flex-col gap-1">
              {/* Resources expandable */}
              <div className="flex flex-col">
                <button
                  onClick={() => setResourcesOpen(!resourcesOpen)}
                  className="flex items-center justify-between px-3 py-3 text-sm text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
                >
                  Resources
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 transition-transform",
                      resourcesOpen && "rotate-180"
                    )}
                  />
                </button>
                {resourcesOpen && (
                  <div className="flex flex-col pl-4">
                    {resourceLinks.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="px-3 py-2.5 text-sm text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-[var(--border)] flex flex-col gap-4">
              <ThemeToggle />
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded-full bg-[var(--color-primary)] text-black hover:bg-[var(--color-primary-hover)] transition-colors"
              >
                Launch App
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
