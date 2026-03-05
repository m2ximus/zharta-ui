"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface LtvMeterProps {
  currentLtv: number;
  maxLtv: number;
  liquidationLtv?: number;
  className?: string;
}

const ZONES = [
  { label: "Conservative", end: 40 },
  { label: "Moderate", end: 60 },
  { label: "Aggressive", endKey: "maxLtv" as const },
  { label: "Liquidation", end: 100 },
] as const;

export function LtvMeter({
  currentLtv,
  maxLtv,
  liquidationLtv,
  className,
}: LtvMeterProps) {
  const clampedLtv = Math.max(0, Math.min(100, currentLtv));
  const indicatorPosition = `${clampedLtv}%`;

  const zoneColor = React.useMemo(() => {
    if (clampedLtv <= 40) return "text-emerald-400";
    if (clampedLtv <= 60) return "text-amber-400";
    if (clampedLtv <= maxLtv) return "text-orange-400";
    return "text-red-400";
  }, [clampedLtv, maxLtv]);

  return (
    <div className={cn("w-full", className)}>
      {/* Current LTV label */}
      <div className="relative h-6 mb-1">
        <motion.div
          className="absolute -translate-x-1/2 flex flex-col items-center"
          animate={{ left: indicatorPosition }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <span
            className={cn("text-xs font-mono font-semibold", zoneColor)}
          >
            {clampedLtv.toFixed(1)}%
          </span>
        </motion.div>
      </div>

      {/* Bar */}
      <div className="relative h-2 rounded-full overflow-hidden bg-[var(--muted)]">
        {/* Gradient bar */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `linear-gradient(to right,
              #00D4AA 0%,
              #00D4AA 20%,
              #10b981 35%,
              #f59e0b 45%,
              #f59e0b 55%,
              #f97316 65%,
              #ef4444 ${maxLtv}%,
              #7f1d1d ${maxLtv}%,
              #451a1a 100%
            )`,
          }}
        />

        {/* Darkened area beyond maxLtv */}
        <div
          className="absolute top-0 bottom-0 right-0 bg-[var(--muted)]/70"
          style={{ left: `${maxLtv}%` }}
        />

        {/* Liquidation LTV marker */}
        {liquidationLtv !== undefined && (
          <div
            className="absolute top-0 bottom-0 w-[2px] bg-red-500"
            style={{ left: `${liquidationLtv}%` }}
          />
        )}

        {/* Indicator circle */}
        <motion.div
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-white shadow-md"
          animate={{
            left: indicatorPosition,
            backgroundColor:
              clampedLtv <= 40
                ? "#00D4AA"
                : clampedLtv <= 60
                  ? "#f59e0b"
                  : clampedLtv <= maxLtv
                    ? "#f97316"
                    : "#ef4444",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      </div>

      {/* Max LTV label */}
      <div className="flex justify-between items-start mt-1.5">
        <span className="text-[10px] text-[var(--foreground-muted)]">0%</span>
        <span className="text-[10px] text-[var(--foreground-muted)] font-mono">
          max. {maxLtv}%
        </span>
      </div>

      {/* Zone labels */}
      <div className="relative mt-2">
        <div className="flex text-[10px]">
          <div style={{ width: "40%" }} className="text-center text-emerald-400/70">
            Conservative
          </div>
          <div style={{ width: "20%" }} className="text-center text-amber-400/70">
            Moderate
          </div>
          <div
            style={{ width: `${maxLtv - 60}%` }}
            className="text-center text-orange-400/70"
          >
            Aggressive
          </div>
          <div
            style={{ width: `${100 - maxLtv}%` }}
            className="text-center text-red-400/70"
          >
            Liquidation
          </div>
        </div>
      </div>
    </div>
  );
}
