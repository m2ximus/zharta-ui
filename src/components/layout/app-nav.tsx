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
import { ChevronDown, BarChart3, Landmark, HandCoins } from "lucide-react";

const appTabs = [
  { label: "Portfolio", href: "/portfolio", icon: BarChart3 },
  { label: "Lend", href: "/lend", icon: Landmark },
  { label: "Borrow", href: "/borrow", icon: HandCoins },
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

  // Close dropdown on route change
  React.useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <nav className="sticky top-0 z-50 bg-[var(--background-secondary)] border-b border-[var(--border)]">
      <div className="mx-auto max-w-[1440px] px-3 sm:px-6 lg:px-8">
        <div className="relative flex h-14 items-center justify-between">

          {/* Mobile: dropdown selector */}
          <div className="sm:hidden relative" ref={dropdownRef}>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex items-center gap-2 h-14 text-sm font-medium text-[var(--foreground)] cursor-pointer"
            >
              <currentTab.icon className="w-4 h-4 text-[var(--color-primary)]" />
              {currentTab.label}
              <ChevronDown
                className={cn(
                  "w-3.5 h-3.5 text-[var(--foreground-muted)] transition-transform",
                  mobileOpen && "rotate-180"
                )}
              />
            </button>

            {mobileOpen && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius-card)] shadow-lg z-50 py-1 overflow-hidden">
                {appTabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <Link
                      key={tab.href}
                      href={tab.href}
                      className={cn(
                        "flex items-center gap-3 px-4 py-2.5 text-sm transition-colors",
                        isActive(tab.href)
                          ? "text-[var(--foreground)] bg-[var(--muted)]"
                          : "text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--muted)]"
                      )}
                    >
                      <Icon
                        className={cn(
                          "w-4 h-4",
                          isActive(tab.href)
                            ? "text-[var(--color-primary)]"
                            : "text-[var(--foreground-muted)]"
                        )}
                      />
                      {tab.label}
                    </Link>
                  );
                })}
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

          {/* Center: logo — hidden on small screens */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 flex-shrink-0 hidden md:flex"
          >
            <ZhartaLogo size="md" showText={false} />
          </Link>

          {/* Right: network + notifications + wallet + settings */}
          <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
            <NetworkSelector />
            <NotificationsBell />
            <WalletButton className="hidden sm:inline-flex" />
            <SettingsDropdown />
          </div>
        </div>
      </div>
    </nav>
  );
}
