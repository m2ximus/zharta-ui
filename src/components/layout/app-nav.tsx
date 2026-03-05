"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ZhartaLogo } from "./zharta-logo";
import { WalletButton } from "./wallet-button";
import { NotificationsBell } from "./notifications-bell";
import { SettingsDropdown } from "./settings-dropdown";

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
    if (href === "/lend") {
      return pathname.startsWith("/lend") || pathname.startsWith("/markets");
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-50 bg-[var(--background-secondary)] border-b border-[var(--border)]">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-8">
        <div className="relative flex h-14 items-center justify-between">
          {/* Left: plain text tabs with underline */}
          <div className="flex items-center gap-8">
            {appTabs.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  "relative h-14 flex items-center text-sm font-medium transition-colors",
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

          {/* Center: logo */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 flex-shrink-0"
          >
            <ZhartaLogo size="md" showText={false} />
          </Link>

          {/* Right: notifications + wallet + settings */}
          <div className="flex items-center gap-3">
            <NotificationsBell />
            <WalletButton className="hidden sm:inline-flex" />
            <SettingsDropdown />
          </div>
        </div>
      </div>
    </nav>
  );
}
