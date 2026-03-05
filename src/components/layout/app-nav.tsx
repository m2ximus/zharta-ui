"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ZhartaLogo } from "./zharta-logo";
import { WalletButton } from "./wallet-button";
import { ThemeToggle } from "./theme-toggle";

const appTabs = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "Lend", href: "/lend" },
  { label: "Borrow", href: "/borrow" },
];

export function AppNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/portfolio") {
      return pathname === "/portfolio" || pathname.startsWith("/portfolio/");
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-50 bg-[var(--background-secondary)] border-b border-[var(--border)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          {/* Logo - small */}
          <Link href="/" className="flex-shrink-0">
            <ZhartaLogo size="sm" />
          </Link>

          {/* Center: pill tab navigation */}
          <div className="flex items-center">
            <div className="flex items-center gap-1 rounded-full bg-[var(--background-tertiary)] p-1">
              {appTabs.map((tab) => (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={cn(
                    "px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200",
                    isActive(tab.href)
                      ? "bg-[var(--color-primary)] text-black"
                      : "text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
                  )}
                >
                  {tab.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right: wallet + theme */}
          <div className="flex items-center gap-3">
            <WalletButton className="hidden sm:inline-flex" />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
