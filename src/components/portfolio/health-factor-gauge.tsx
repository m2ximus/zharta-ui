"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface HealthFactorGaugeProps {
  value: number;
  className?: string;
}

const GAUGE_MIN = 1;
const GAUGE_MAX = 4;
const ARC_RADIUS = 80;
const CENTER_X = 100;
const CENTER_Y = 100;

const TICKS = [1, 1.5, 2, 2.5, 3, 3.5, 4];

const ZONES: [number, number, string][] = [
  [1, 1.5, "#ef4444"],
  [1.5, 2, "#f59e0b"],
  [2, 4, "#00D4AA"],
];

function valueToAngle(value: number): number {
  const clamped = Math.max(GAUGE_MIN, Math.min(GAUGE_MAX, value));
  const ratio = (clamped - GAUGE_MIN) / (GAUGE_MAX - GAUGE_MIN);
  return 180 - ratio * 180;
}

function polarToCartesian(
  cx: number,
  cy: number,
  radius: number,
  angleDeg: number
): { x: number; y: number } {
  const angleRad = (angleDeg * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(angleRad),
    y: cy - radius * Math.sin(angleRad),
  };
}

function describeArc(
  cx: number,
  cy: number,
  radius: number,
  startAngleDeg: number,
  endAngleDeg: number
): string {
  const start = polarToCartesian(cx, cy, radius, startAngleDeg);
  const end = polarToCartesian(cx, cy, radius, endAngleDeg);
  const angularSpan = startAngleDeg - endAngleDeg;
  const largeArcFlag = angularSpan > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
}

function getValueColor(value: number): string {
  if (value < 1.5) return "#ef4444";
  if (value < 2) return "#f59e0b";
  return "#00D4AA";
}

export function HealthFactorGauge({ value, className }: HealthFactorGaugeProps) {
  const clampedValue = Math.max(GAUGE_MIN, Math.min(GAUGE_MAX, value));
  const needleAngle = valueToAngle(clampedValue);
  const needleTip = polarToCartesian(CENTER_X, CENTER_Y, ARC_RADIUS - 6, needleAngle);

  return (
    <div
      className={cn(
        "bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius-card)] p-6 flex flex-col items-center justify-center h-full",
        className
      )}
    >
      {/* Gauge SVG */}
      <div className="flex justify-center w-full">
        <svg viewBox="0 10 200 105" className="w-full max-w-[240px]">
          {/* Background track */}
          <path
            d={describeArc(CENTER_X, CENTER_Y, ARC_RADIUS, 180, 0)}
            fill="none"
            stroke="var(--border)"
            strokeWidth={12}
            strokeLinecap="round"
          />

          {/* Colored arc zones */}
          {ZONES.map(([zoneStart, zoneEnd, color], i) => {
            const startAngle = valueToAngle(zoneStart);
            const endAngle = valueToAngle(zoneEnd);
            return (
              <path
                key={i}
                d={describeArc(CENTER_X, CENTER_Y, ARC_RADIUS, startAngle, endAngle)}
                fill="none"
                stroke={color}
                strokeWidth={12}
                strokeLinecap={
                  i === 0 ? "round" : i === ZONES.length - 1 ? "round" : "butt"
                }
                strokeOpacity={0.8}
              />
            );
          })}

          {/* Tick labels only */}
          {TICKS.filter((t) => t % 1 === 0).map((tick) => {
            const angle = valueToAngle(tick);
            const labelPoint = polarToCartesian(CENTER_X, CENTER_Y, ARC_RADIUS + 16, angle);
            return (
              <text
                key={tick}
                x={labelPoint.x}
                y={labelPoint.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="var(--foreground-muted)"
                fontSize={9}
                fontFamily="monospace"
                opacity={0.6}
              >
                {tick}
              </text>
            );
          })}

          {/* Needle */}
          <motion.line
            x1={CENTER_X}
            y1={CENTER_Y}
            x2={needleTip.x}
            y2={needleTip.y}
            stroke="var(--foreground)"
            strokeWidth={2}
            strokeLinecap="round"
            initial={false}
            animate={{
              x2: needleTip.x,
              y2: needleTip.y,
            }}
            transition={{
              type: "spring",
              stiffness: 60,
              damping: 15,
            }}
          />

          {/* Needle center dot */}
          <circle
            cx={CENTER_X}
            cy={CENTER_Y}
            r={4}
            fill="var(--card)"
            stroke="var(--foreground)"
            strokeWidth={1.5}
          />

          {/* Label inside arc */}
          <text
            x={CENTER_X}
            y={CENTER_Y - 32}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="var(--foreground-muted)"
            fontSize={9}
          >
            Health Factor
          </text>

          {/* Value inside arc */}
          <text
            x={CENTER_X}
            y={CENTER_Y - 16}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={getValueColor(clampedValue)}
            fontSize={22}
            fontWeight="bold"
            fontFamily="var(--font-mono), monospace"
          >
            {clampedValue.toFixed(2)}
          </text>
        </svg>
      </div>
    </div>
  );
}
