"use client";

import * as React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "motion/react";
import { Settings, Sun, Moon, Key, Bell, ExternalLink } from "lucide-react";

export function SettingsDropdown() {
  const [open, setOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
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
        aria-label="Settings"
      >
        <Settings className="h-4 w-4" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-52 bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius-card)] shadow-lg z-50 overflow-hidden py-1"
          >
            {/* Theme toggle */}
            <button
              onClick={() => {
                if (mounted) setTheme(theme === "dark" ? "light" : "dark");
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
            >
              {mounted && theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
              {mounted
                ? theme === "dark"
                  ? "Light mode"
                  : "Dark mode"
                : "Toggle theme"}
            </button>

            {/* Divider */}
            <div className="border-t border-[var(--border)] my-1" />

            {/* API Settings */}
            <Link
              href="/settings/api"
              onClick={() => setOpen(false)}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
            >
              <Key className="w-4 h-4" />
              API settings
            </Link>

            {/* Notification settings */}
            <Link
              href="/notifications"
              onClick={() => setOpen(false)}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
            >
              <Bell className="w-4 h-4" />
              Notification settings
            </Link>

            {/* Divider */}
            <div className="border-t border-[var(--border)] my-1" />

            {/* Docs link */}
            <a
              href="#"
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Documentation
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
