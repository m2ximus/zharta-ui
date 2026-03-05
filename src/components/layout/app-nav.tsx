"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ZhartaLogo } from "./zharta-logo";
import { WalletButton } from "./wallet-button";
import { NetworkSelector } from "./network-selector";
import { NotificationsBell } from "./notifications-bell";
import { SettingsDropdown } from "./settings-dropdown";
import { ChevronDown } from "lucide-react";

const appTabs = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "Lend", href: "/lend" },
  { label: "Borrow", href: "/borrow" },
];

export function AppNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const isActive = (href: string) => {
    if (href === "/portfolio") {
      return pathname === "/portfolio" || pathname.startsWith("/portfolio/");
    }
    if (href === "/lend") {
      return pathname.startsWith("/lend") || pathname.startsWith("/markets");
    }
    return pathname.startsWith(href);
  };

  const currentTab = appTabs.find((t) => isActive(t.href)) ?? appTabs[0];

  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  React.useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <nav className="sticky top-0 z-50 bg-[var(--background-secondary)] border-b border-[var(--border)]">
      <div className="mx-auto max-w-[1440px] px-3 sm:px-6 lg:px-8">
        <div className="relative flex h-14 items-center justify-between">

          {/* Left: logo glyph + nav */}
          <div className="flex items-center gap-3 sm:gap-6">
            {/* Logo glyph — always visible */}
            <Link href="/" className="flex-shrink-0">
              <ZhartaLogo size="sm" showText={false} />
            </Link>

            {/* Mobile: dropdown selector */}
            <div className="sm:hidden relative" ref={dropdownRef}>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="flex items-center gap-1.5 h-14 text-sm font-medium text-[var(--foreground)] cursor-pointer"
              >
                {currentTab.label}
                <ChevronDown
                  className={cn(
                    "w-3.5 h-3.5 text-[var(--foreground-muted)] transition-transform",
                    mobileOpen && "rotate-180"
                  )}
                />
              </button>

              {mobileOpen && (
                <div className="absolute top-full left-0 mt-1 w-44 bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius-card)] shadow-lg z-50 py-1 overflow-hidden">
                  {appTabs.map((tab) => (
                    <Link
                      key={tab.href}
                      href={tab.href}
                      className={cn(
                        "flex items-center px-4 py-2.5 text-sm transition-colors",
                        isActive(tab.href)
                          ? "text-[var(--foreground)] bg-[var(--muted)]"
                          : "text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--muted)]"
                      )}
                    >
                      {tab.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Desktop: underline tabs */}
            <div className="hidden sm:flex items-center gap-8">
              {appTabs.map((tab) => (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={cn(
                    "relative h-14 flex items-center text-sm font-medium transition-colors whitespace-nowrap",
                    isActive(tab.href)
                      ? "text-[var(--foreground)]"
                      : "text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
                  )}
                >
                  {tab.label}
                  {isActive(tab.href) && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--color-primary)]" />
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Right: network (desktop) + notifications + wallet + settings */}
          <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
            <span className="hidden sm:inline-flex">
              <NetworkSelector />
            </span>
            <NotificationsBell />
            <WalletButton className="hidden sm:inline-flex" />
            <SettingsDropdown />
          </div>
        </div>
      </div>
    </nav>
  );
}
