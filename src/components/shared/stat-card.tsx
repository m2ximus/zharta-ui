"use client";

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

export function StatCard({
  title,
  value,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius-card)] p-6 flex flex-col items-center justify-center text-center",
        className
      )}
    >
      <span className="font-[family-name:var(--font-mono)] text-2xl md:text-3xl font-bold text-[var(--color-primary)]">
        {value}
      </span>
      <span className="text-xs text-[var(--foreground-muted)] mt-1.5">
        {title}
      </span>
    </div>
  );
}
