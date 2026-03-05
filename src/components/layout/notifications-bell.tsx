"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Bell, AlertTriangle, Info, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { alerts } from "@/data/alerts";
import type { Alert } from "@/types";

function getSeverityIcon(alert: Alert) {
  if (alert.severity === "critical" || alert.severity === "warning") {
    return <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />;
  }
  return <Info className="w-3.5 h-3.5 flex-shrink-0" />;
}

function getSeverityColor(severity: Alert["severity"]) {
  switch (severity) {
    case "critical":
      return "text-red-400";
    case "warning":
      return "text-amber-400";
    case "info":
      return "text-blue-400";
  }
}

function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) return `${diffDays}d ago`;
  if (diffHours > 0) return `${diffHours}h ago`;
  return "Just now";
}

export function NotificationsBell() {
  const [open, setOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const unreadCount = alerts.length;

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
        className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-[var(--muted)] transition-colors"
      >
        <Bell className="w-4 h-4 text-[var(--foreground-muted)]" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[var(--color-primary)]" />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-80 bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius-card)] shadow-lg z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)]">
              <span className="text-sm font-medium text-[var(--foreground)]">
                Notifications
              </span>
              <Link
                href="/notifications"
                onClick={() => setOpen(false)}
                className="text-xs text-[var(--color-primary)] hover:underline"
              >
                View all
              </Link>
            </div>

            {/* Alert items */}
            <div className="max-h-80 overflow-y-auto">
              {alerts.slice(0, 5).map((alert) => (
                <div
                  key={alert.id}
                  className="px-4 py-3 border-b border-[var(--border)] last:border-b-0 hover:bg-[var(--muted)]/50 transition-colors"
                >
                  <div className="flex items-start gap-2.5">
                    <span
                      className={cn("mt-0.5", getSeverityColor(alert.severity))}
                    >
                      {getSeverityIcon(alert)}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-[var(--foreground)] truncate">
                        {alert.title}
                      </p>
                      <p className="text-[11px] text-[var(--foreground-muted)] line-clamp-2 mt-0.5">
                        {alert.description}
                      </p>
                      <span className="text-[10px] text-[var(--foreground-muted)] mt-1 block">
                        {formatTimestamp(alert.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-4 py-2.5 border-t border-[var(--border)]">
              <Link
                href="/notifications"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 text-xs text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
              >
                <Settings className="w-3 h-3" />
                Notification settings
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
