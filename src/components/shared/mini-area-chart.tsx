"use client";

import * as React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { cn } from "@/lib/utils";

interface MiniAreaChartProps {
  data: { date: string; value: number }[];
  height?: number;
  color?: string;
  showGrid?: boolean;
  timeRanges?: string[];
  activeRange?: string;
  onRangeChange?: (range: string) => void;
  className?: string;
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-[3px] px-3 py-2 shadow-lg">
      <p className="text-xs text-[var(--foreground-muted)] mb-0.5">{label}</p>
      <p className="text-sm font-mono font-semibold text-[var(--foreground)]">
        {payload[0].value.toLocaleString()}
      </p>
    </div>
  );
}

export function MiniAreaChart({
  data,
  height = 200,
  color = "#00D4AA",
  showGrid = false,
  timeRanges,
  activeRange,
  onRangeChange,
  className,
}: MiniAreaChartProps) {
  const gradientId = React.useId().replace(/:/g, "");

  return (
    <div className={cn("w-full", className)}>
      {timeRanges && timeRanges.length > 0 && (
        <div className="flex items-center gap-1 mb-3">
          {timeRanges.map((range) => (
            <button
              key={range}
              onClick={() => onRangeChange?.(range)}
              className={cn(
                "px-3 py-1 text-xs font-medium rounded-[var(--radius-pill)] transition-colors",
                activeRange === range
                  ? "bg-[var(--color-primary)] text-black"
                  : "text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--muted)]"
              )}
            >
              {range}
            </button>
          ))}
        </div>
      )}

      <ResponsiveContainer width="100%" height={height}>
        <AreaChart
          data={data}
          margin={{ top: 4, right: 4, left: 4, bottom: 0 }}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.2} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>

          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--border)"
              vertical={false}
            />
          )}

          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: "var(--foreground-muted)" }}
            dy={8}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: "var(--foreground-muted)" }}
            width={40}
          />

          <Tooltip
            content={<CustomTooltip />}
            cursor={{
              stroke: "var(--foreground-muted)",
              strokeWidth: 1,
              strokeDasharray: "4 4",
            }}
          />

          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            fill={`url(#${gradientId})`}
            dot={false}
            activeDot={{
              r: 4,
              stroke: color,
              strokeWidth: 2,
              fill: "var(--card)",
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
