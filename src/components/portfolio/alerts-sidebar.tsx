import { AlertTriangle, Info, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { alerts } from "@/data/alerts";
import type { Alert } from "@/types";

function getSeverityIcon(alert: Alert) {
  if (alert.severity === "critical" || alert.severity === "warning") {
    return <AlertTriangle className="w-4 h-4 flex-shrink-0" />;
  }
  if (alert.type === "payment") {
    return <Bell className="w-4 h-4 flex-shrink-0" />;
  }
  return <Info className="w-4 h-4 flex-shrink-0" />;
}

function getSeverityStyles(severity: Alert["severity"]) {
  switch (severity) {
    case "critical":
      return {
        border: "border-l-red-500",
        icon: "text-red-400",
        bg: "bg-red-500/5",
      };
    case "warning":
      return {
        border: "border-l-amber-500",
        icon: "text-amber-400",
        bg: "bg-amber-500/5",
      };
    case "info":
      return {
        border: "border-l-blue-500",
        icon: "text-blue-400",
        bg: "bg-blue-500/5",
      };
  }
}

function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) {
    return `${diffDays}d ago`;
  }
  if (diffHours > 0) {
    return `${diffHours}h ago`;
  }
  return "Just now";
}

export function AlertsSidebar() {
  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-[3px] overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
        <h3 className="text-sm font-semibold text-[var(--foreground)]">
          Alerts
        </h3>
        <Badge variant="secondary" className="text-[10px] px-2 py-0.5">
          {alerts.length}
        </Badge>
      </div>

      <div className="overflow-y-auto max-h-[480px]">
        <div className="flex flex-col">
          {alerts.map((alert) => {
            const styles = getSeverityStyles(alert.severity);

            return (
              <div
                key={alert.id}
                className={cn(
                  "p-4 border-b border-[var(--border)] last:border-b-0 border-l-[3px] transition-colors hover:bg-[var(--background-secondary)]",
                  styles.border,
                  styles.bg
                )}
              >
                <div className="flex items-start gap-3">
                  <span className={cn("mt-0.5", styles.icon)}>
                    {getSeverityIcon(alert)}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className="text-sm font-medium text-[var(--foreground)] truncate">
                        {alert.title}
                      </h4>
                    </div>
                    <p className="text-xs text-[var(--foreground-muted)] leading-relaxed line-clamp-3 mb-2">
                      {alert.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-[var(--foreground-muted)]">
                        {alert.loanId}
                      </span>
                      <span className="text-[10px] text-[var(--foreground-muted)]">
                        {formatTimestamp(alert.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
