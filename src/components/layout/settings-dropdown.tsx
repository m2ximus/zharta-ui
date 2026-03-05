"use client";

import * as React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "motion/react";
import {
  MoreHorizontal,
  Sun,
  Moon,
  Eye,
  BarChart3,
  FileText,
  Shield,
  ExternalLink,
  PiggyBank,
  ArrowDownToLine,
  ArrowLeftRight,
} from "lucide-react";

export function SettingsDropdown() {
  const [open, setOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const [sandbox, setSandbox] = React.useState(true);
  const [watchWallet, setWatchWallet] = React.useState(false);
  const { theme, setTheme } = useTheme();
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--background-tertiary)] transition-colors cursor-pointer"
        aria-label="More"
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="fixed sm:absolute right-2 sm:right-0 top-14 sm:top-full sm:mt-2 w-[calc(100vw-1rem)] sm:w-64 max-w-[280px] bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius-card)] shadow-lg z-50 overflow-hidden py-1 max-h-[calc(100vh-4rem)] overflow-y-auto"
          >
            {/* Theme toggle */}
            <button
              onClick={() => {
                if (mounted) setTheme(theme === "dark" ? "light" : "dark");
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors cursor-pointer"
            >
              {mounted && theme === "dark" ? (
                <Sun className="w-4 h-4 flex-shrink-0" />
              ) : (
                <Moon className="w-4 h-4 flex-shrink-0" />
              )}
              {mounted
                ? theme === "dark"
                  ? "Light mode"
                  : "Dark mode"
                : "Toggle theme"}
            </button>

            {/* Divider */}
            <div className="border-t border-[var(--border)] my-1" />

            {/* Sandbox toggle */}
            <button
              onClick={() => setSandbox(!sandbox)}
              className="w-full flex items-start gap-3 px-4 py-2.5 text-sm hover:bg-[var(--muted)] transition-colors cursor-pointer"
            >
              <div className="flex-1 text-left">
                <div className="text-[var(--foreground)] font-medium">
                  Sandbox Mode
                </div>
                <div className="text-[11px] text-[var(--foreground-muted)] mt-0.5 leading-tight">
                  Explore with unlimited test tokens
                </div>
              </div>
              <div
                className={`relative mt-0.5 w-9 h-5 rounded-full flex-shrink-0 transition-colors ${
                  sandbox
                    ? "bg-[var(--color-primary)]"
                    : "bg-[var(--foreground-muted)]/30"
                }`}
              >
                <div
                  className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                    sandbox ? "left-[18px]" : "left-0.5"
                  }`}
                />
              </div>
            </button>

            {/* Watch Wallet toggle */}
            <button
              onClick={() => setWatchWallet(!watchWallet)}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-[var(--muted)] transition-colors cursor-pointer"
            >
              <Eye className="w-4 h-4 flex-shrink-0 text-[var(--foreground)]" />
              <span className="flex-1 text-left text-[var(--foreground)]">
                Watch Wallet
              </span>
              <div
                className={`relative w-9 h-5 rounded-full flex-shrink-0 transition-colors ${
                  watchWallet
                    ? "bg-[var(--color-primary)]"
                    : "bg-[var(--foreground-muted)]/30"
                }`}
              >
                <div
                  className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                    watchWallet ? "left-[18px]" : "left-0.5"
                  }`}
                />
              </div>
            </button>

            {/* Divider */}
            <div className="border-t border-[var(--border)] my-1" />

            {/* Savings */}
            <Link
              href="/savings"
              onClick={() => setOpen(false)}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
            >
              <PiggyBank className="w-4 h-4 flex-shrink-0" />
              Savings
            </Link>

            {/* Deposit */}
            <Link
              href="/deposit"
              onClick={() => setOpen(false)}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
            >
              <ArrowDownToLine className="w-4 h-4 flex-shrink-0" />
              Deposit
            </Link>

            {/* Swap */}
            <Link
              href="/swap"
              onClick={() => setOpen(false)}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
            >
              <ArrowLeftRight className="w-4 h-4 flex-shrink-0" />
              Swap
            </Link>

            {/* Divider */}
            <div className="border-t border-[var(--border)] my-1" />

            {/* Data Dashboard */}
            <Link
              href="/portfolio"
              onClick={() => setOpen(false)}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
            >
              <BarChart3 className="w-4 h-4 flex-shrink-0" />
              Data Dashboard
            </Link>

            {/* Divider */}
            <div className="border-t border-[var(--border)] my-1" />

            {/* Terms of Service */}
            <a
              href="#"
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
            >
              <FileText className="w-4 h-4 flex-shrink-0" />
              Terms of Service
              <ExternalLink className="w-3 h-3 ml-auto flex-shrink-0" />
            </a>

            {/* Privacy Policy */}
            <a
              href="#"
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
            >
              <Shield className="w-4 h-4 flex-shrink-0" />
              Privacy Policy
              <ExternalLink className="w-3 h-3 ml-auto flex-shrink-0" />
            </a>

            {/* Build info */}
            <div className="border-t border-[var(--border)] my-1" />
            <div className="px-4 py-2.5 text-[11px] text-[var(--foreground-muted)]/60 font-[family-name:var(--font-mono)]">
              <div>v0.1.0-beta</div>
              <div className="mt-0.5">Built Mar 5, 2026 — 14:32 UTC</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
