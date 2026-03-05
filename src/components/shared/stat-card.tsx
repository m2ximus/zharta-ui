"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon?: React.ReactNode;
  sparklineData?: number[];
  className?: string;
}

function Sparkline({ data, className }: { data: number[]; className?: string }) {
  const width = 80;
  const height = 28;
  const padding = 2;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data
    .map((value, index) => {
      const x = padding + (index / (data.length - 1)) * (width - padding * 2);
      const y =
        height - padding - ((value - min) / range) * (height - padding * 2);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={cn("overflow-visible", className)}
    >
      <defs>
        <linearGradient id="sparkline-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon
        points={`${padding},${height} ${points} ${width - padding},${height}`}
        fill="url(#sparkline-gradient)"
      />
      <polyline
        points={points}
        fill="none"
        stroke="var(--color-primary)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function StatCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon,
  sparklineData,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "bg-[var(--card)] border border-[var(--border)] rounded-[3px] border-l-[3px] border-l-[var(--color-primary)] p-4",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {icon && (
              <span className="text-[var(--foreground-muted)]">{icon}</span>
            )}
            <span className="text-sm text-[var(--foreground-muted)] truncate">
              {title}
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-mono font-semibold text-[var(--foreground)]">
              {value}
            </span>

            {change && (
              <span
                className={cn(
                  "text-xs font-medium px-1.5 py-0.5 rounded-[var(--radius-card)]",
                  changeType === "positive" &&
                    "text-emerald-400 bg-emerald-500/10",
                  changeType === "negative" && "text-red-400 bg-red-500/10",
                  changeType === "neutral" &&
                    "text-[var(--foreground-muted)] bg-[var(--muted)]"
                )}
              >
                {change}
              </span>
            )}
          </div>
        </div>

        {sparklineData && sparklineData.length > 1 && (
          <div className="ml-4 flex-shrink-0 self-end">
            <Sparkline data={sparklineData} />
          </div>
        )}
      </div>
    </div>
  );
}
