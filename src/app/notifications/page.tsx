"use client";

import * as React from "react";
import { AppNav } from "@/components/layout/app-nav";
import { PageTransition } from "@/components/shared/page-transition";
import {
  Bell,
  AlertTriangle,
  Info,
  Settings,
  Clock,
  TrendingDown,
  Banknote,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { alerts } from "@/data/alerts";
import type { Alert } from "@/types";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function getSeverityIcon(alert: Alert) {
  switch (alert.type) {
    case "callable":
      return <Bell className="w-4 h-4" />;
    case "maturity":
      return <Clock className="w-4 h-4" />;
    case "ltv-warning":
      return <AlertTriangle className="w-4 h-4" />;
    case "liquidation":
      return <TrendingDown className="w-4 h-4" />;
    case "payment":
      return <Banknote className="w-4 h-4" />;
    default:
      return <Info className="w-4 h-4" />;
  }
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

function getSeverityBorder(severity: Alert["severity"]) {
  switch (severity) {
    case "critical":
      return "border-l-red-400";
    case "warning":
      return "border-l-amber-400";
    case "info":
      return "border-l-blue-400";
  }
}

function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/* ------------------------------------------------------------------ */
/*  Toggle component                                                   */
/* ------------------------------------------------------------------ */

function Toggle({
  enabled,
  onToggle,
}: {
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={onToggle}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out",
        enabled ? "bg-[var(--color-primary)]" : "bg-[var(--muted)]"
      )}
    >
      <span
        className={cn(
          "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-sm ring-0 transition-transform duration-200 ease-in-out",
          enabled ? "translate-x-5" : "translate-x-0"
        )}
      />
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Alert preference config                                            */
/* ------------------------------------------------------------------ */

interface AlertPreference {
  type: Alert["type"];
  label: string;
  description: string;
  icon: React.ReactNode;
}

const alertPreferences: AlertPreference[] = [
  {
    type: "callable",
    label: "Callable alerts",
    description: "When loans enter their callable window",
    icon: <Bell className="w-4 h-4" />,
  },
  {
    type: "maturity",
    label: "Maturity alerts",
    description: "Approaching loan maturity dates",
    icon: <Clock className="w-4 h-4" />,
  },
  {
    type: "ltv-warning",
    label: "LTV warnings",
    description: "LTV ratio approaching liquidation threshold",
    icon: <AlertTriangle className="w-4 h-4" />,
  },
  {
    type: "liquidation",
    label: "Liquidation alerts",
    description: "High liquidation risk requiring immediate action",
    icon: <TrendingDown className="w-4 h-4" />,
  },
  {
    type: "payment",
    label: "Payment notifications",
    description: "Interest accrued and payment updates",
    icon: <Banknote className="w-4 h-4" />,
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function NotificationsPage() {
  const [enabledTypes, setEnabledTypes] = React.useState<
    Record<Alert["type"], boolean>
  >({
    callable: true,
    maturity: true,
    "ltv-warning": true,
    liquidation: true,
    payment: true,
  });

  const toggleType = (type: Alert["type"]) => {
    setEnabledTypes((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  /* Filter alerts by enabled preferences */
  const visibleAlerts = alerts.filter((a) => enabledTypes[a.type]);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <AppNav />

      <main className="mx-auto max-w-[1440px] px-6 lg:px-8 py-6">
        <PageTransition>
          {/* Page header */}
          <div className="mb-8">
            <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl text-[var(--foreground)]">
              Notifications
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* ---- Alert list ---- */}
            <div className="lg:col-span-2 space-y-3">
              <h2 className="text-sm font-medium text-[var(--foreground-muted)] uppercase tracking-wider mb-4">
                All Alerts
              </h2>

              {visibleAlerts.length === 0 && (
                <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-8 text-center">
                  <Bell className="w-8 h-8 text-[var(--foreground-muted)] mx-auto mb-3" />
                  <p className="text-sm text-[var(--foreground-muted)]">
                    No notifications to show. Adjust your settings to see
                    alerts.
                  </p>
                </div>
              )}

              {visibleAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={cn(
                    "rounded-lg border border-[var(--border)] bg-[var(--card)] p-4 border-l-4 transition-colors hover:bg-[var(--muted)]/30",
                    getSeverityBorder(alert.severity)
                  )}
                >
                  <div className="flex items-start gap-3">
                    {/* Severity icon */}
                    <span
                      className={cn(
                        "mt-0.5 shrink-0",
                        getSeverityColor(alert.severity)
                      )}
                    >
                      {getSeverityIcon(alert)}
                    </span>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-4 mb-1">
                        <h3 className="text-sm font-medium text-[var(--foreground)]">
                          {alert.title}
                        </h3>
                        <span className="text-xs text-[var(--foreground-muted)] shrink-0 font-[family-name:var(--font-mono)]">
                          {formatTimestamp(alert.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-[var(--foreground-muted)] leading-relaxed mb-2">
                        {alert.description}
                      </p>
                      <span className="inline-block text-xs font-[family-name:var(--font-mono)] text-[var(--foreground-muted)] bg-[var(--muted)] px-2 py-0.5 rounded">
                        {alert.loanId}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ---- Settings panel ---- */}
            <div className="lg:col-span-1">
              <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-5 sticky top-20">
                <div className="flex items-center gap-2 mb-5">
                  <Settings className="w-4 h-4 text-[var(--foreground-muted)]" />
                  <h2 className="text-sm font-medium text-[var(--foreground-muted)] uppercase tracking-wider">
                    Settings
                  </h2>
                </div>

                <div className="space-y-5">
                  {alertPreferences.map((pref) => (
                    <div
                      key={pref.type}
                      className="flex items-center justify-between gap-4"
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <span className="text-[var(--foreground-muted)] mt-0.5 shrink-0">
                          {pref.icon}
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-[var(--foreground)]">
                            {pref.label}
                          </p>
                          <p className="text-xs text-[var(--foreground-muted)] mt-0.5">
                            {pref.description}
                          </p>
                        </div>
                      </div>
                      <Toggle
                        enabled={enabledTypes[pref.type]}
                        onToggle={() => toggleType(pref.type)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </PageTransition>
      </main>
    </div>
  );
}
