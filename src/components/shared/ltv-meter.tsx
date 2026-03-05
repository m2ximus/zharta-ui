"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface LtvMeterProps {
  currentLtv: number;
  maxLtv: number;
  liquidationLtv?: number;
  className?: string;
  interactive?: boolean;
  onLtvChange?: (ltv: number) => void;
}

export function LtvMeter({
  currentLtv,
  maxLtv,
  liquidationLtv,
  className,
  interactive = false,
  onLtvChange,
}: LtvMeterProps) {
  const barRef = React.useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = React.useState(false);
  const clampedLtv = Math.max(0, Math.min(100, currentLtv));
  const indicatorPosition = `${clampedLtv}%`;

  const zoneColor = React.useMemo(() => {
    if (clampedLtv <= 40) return "text-emerald-400";
    if (clampedLtv <= 60) return "text-amber-400";
    if (clampedLtv <= maxLtv) return "text-orange-400";
    return "text-red-400";
  }, [clampedLtv, maxLtv]);

  const updateLtv = React.useCallback(
    (clientX: number) => {
      if (!barRef.current || !onLtvChange) return;
      const rect = barRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const pct = Math.max(0, Math.min(maxLtv, (x / rect.width) * 100));
      onLtvChange(Math.round(pct * 2) / 2); // snap to 0.5
    },
    [maxLtv, onLtvChange]
  );

  React.useEffect(() => {
    if (!interactive || !dragging) return;

    const handleMove = (e: MouseEvent) => updateLtv(e.clientX);
    const handleTouchMove = (e: TouchEvent) => updateLtv(e.touches[0].clientX);
    const handleUp = () => setDragging(false);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("touchend", handleUp);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("touchend", handleUp);
    };
  }, [interactive, dragging, updateLtv]);

  const handleBarClick = (e: React.MouseEvent) => {
    if (!interactive) return;
    updateLtv(e.clientX);
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Current LTV label */}
      <div className="relative h-6 mb-1">
        <motion.div
          className="absolute -translate-x-1/2 flex flex-col items-center"
          animate={{ left: indicatorPosition }}
          transition={
            dragging
              ? { type: "tween", duration: 0 }
              : { type: "spring", stiffness: 300, damping: 30 }
          }
        >
          <span
            className={cn("text-xs font-mono font-semibold", zoneColor)}
          >
            {clampedLtv.toFixed(1)}%
          </span>
        </motion.div>
      </div>

      {/* Bar — extra padding for larger grab target */}
      <div
        ref={barRef}
        className={cn(
          "relative h-3 rounded-full overflow-visible bg-[var(--muted)]",
          interactive && "cursor-pointer"
        )}
        onClick={handleBarClick}
      >
        {/* Gradient bar */}
        <div
          className="absolute inset-0 rounded-full overflow-hidden"
        >
          <div
            className="absolute inset-0"
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
        </div>

        {/* Liquidation LTV marker */}
        {liquidationLtv !== undefined && (
          <div
            className="absolute top-0 bottom-0 w-[2px] bg-red-500 z-10"
            style={{ left: `${liquidationLtv}%` }}
          />
        )}

        {/* Indicator — large thumb for easy grab */}
        <motion.div
          className={cn(
            "absolute top-1/2 -translate-x-1/2 -translate-y-1/2 z-20",
            interactive && "cursor-grab active:cursor-grabbing"
          )}
          animate={{ left: indicatorPosition }}
          transition={
            dragging
              ? { type: "tween", duration: 0 }
              : { type: "spring", stiffness: 300, damping: 30 }
          }
          onMouseDown={(e) => {
            if (!interactive) return;
            e.preventDefault();
            setDragging(true);
          }}
          onTouchStart={() => {
            if (!interactive) return;
            setDragging(true);
          }}
        >
          {/* Outer glow ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              boxShadow: dragging
                ? `0 0 0 6px ${
                    clampedLtv <= 40
                      ? "rgba(0,212,170,0.3)"
                      : clampedLtv <= 60
                        ? "rgba(245,158,11,0.3)"
                        : clampedLtv <= maxLtv
                          ? "rgba(249,115,22,0.3)"
                          : "rgba(239,68,68,0.3)"
                  }`
                : `0 0 0 3px ${
                    clampedLtv <= 40
                      ? "rgba(0,212,170,0.15)"
                      : clampedLtv <= 60
                        ? "rgba(245,158,11,0.15)"
                        : clampedLtv <= maxLtv
                          ? "rgba(249,115,22,0.15)"
                          : "rgba(239,68,68,0.15)"
                  }`,
            }}
            style={{ width: 24, height: 24, borderRadius: "50%" }}
          />
          {/* Main circle */}
          <motion.div
            className="w-6 h-6 rounded-full border-[3px] border-white shadow-lg"
            animate={{
              backgroundColor:
                clampedLtv <= 40
                  ? "#00D4AA"
                  : clampedLtv <= 60
                    ? "#f59e0b"
                    : clampedLtv <= maxLtv
                      ? "#f97316"
                      : "#ef4444",
              scale: dragging ? 1.15 : 1,
            }}
            transition={
              dragging
                ? { type: "tween", duration: 0 }
                : { type: "spring", stiffness: 300, damping: 30 }
            }
          />
        </motion.div>
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
