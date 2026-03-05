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

// Tick marks at these values
const TICKS = [1, 1.5, 2, 2.5, 3, 3.5, 4];

// Color zones: [startValue, endValue, color]
const ZONES: [number, number, string][] = [
  [1, 1.5, "#ef4444"],   // red - danger
  [1.5, 2, "#f59e0b"],   // orange/yellow - warning
  [2, 4, "#00D4AA"],     // teal/green - healthy
];

/**
 * Maps a health factor value to an angle in degrees.
 * Value 1 = 180 degrees (far left), Value 4 = 0 degrees (far right).
 */
function valueToAngle(value: number): number {
  const clamped = Math.max(GAUGE_MIN, Math.min(GAUGE_MAX, value));
  const ratio = (clamped - GAUGE_MIN) / (GAUGE_MAX - GAUGE_MIN);
  // 180 degrees at value=1, 0 degrees at value=4
  return 180 - ratio * 180;
}

/**
 * Converts polar coordinates (angle in degrees, radius) to cartesian (x, y)
 * centered at (cx, cy). 0 degrees = right (3 o'clock).
 */
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

/**
 * Creates an SVG arc path from startAngle to endAngle (in degrees).
 * Angles go counter-clockwise: 180 = left, 0 = right.
 */
function describeArc(
  cx: number,
  cy: number,
  radius: number,
  startAngleDeg: number,
  endAngleDeg: number
): string {
  // SVG arcs go clockwise, but our angles go counter-clockwise
  // So we swap: SVG draws from the "end" angle to the "start" angle
  const start = polarToCartesian(cx, cy, radius, startAngleDeg);
  const end = polarToCartesian(cx, cy, radius, endAngleDeg);
  // The arc sweep: since startAngle > endAngle (e.g., 180 -> 120),
  // the angular span in SVG terms
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
        "bg-[var(--color-dark-bg)] border border-[rgba(255,255,255,0.08)] rounded-[var(--radius-card)] p-6",
        className
      )}
    >
      {/* Title */}
      <h3 className="text-base font-semibold text-white mb-2">Health factor</h3>

      {/* Gauge SVG */}
      <div className="flex justify-center">
        <svg viewBox="0 20 200 100" className="w-full max-w-[280px]">
          {/* Background track */}
          <path
            d={describeArc(CENTER_X, CENTER_Y, ARC_RADIUS, 180, 0)}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={14}
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
                strokeWidth={14}
                strokeLinecap={
                  i === 0 ? "round" : i === ZONES.length - 1 ? "round" : "butt"
                }
                strokeOpacity={0.85}
              />
            );
          })}

          {/* Tick marks and labels */}
          {TICKS.map((tick) => {
            const angle = valueToAngle(tick);
            const outerPoint = polarToCartesian(CENTER_X, CENTER_Y, ARC_RADIUS + 12, angle);
            const innerPoint = polarToCartesian(CENTER_X, CENTER_Y, ARC_RADIUS + 7, angle);
            const labelPoint = polarToCartesian(CENTER_X, CENTER_Y, ARC_RADIUS + 21, angle);
            return (
              <g key={tick}>
                {/* Tick line */}
                <line
                  x1={innerPoint.x}
                  y1={innerPoint.y}
                  x2={outerPoint.x}
                  y2={outerPoint.y}
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                />
                {/* Tick label */}
                <text
                  x={labelPoint.x}
                  y={labelPoint.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="rgba(255,255,255,0.45)"
                  fontSize={8}
                  fontFamily="monospace"
                >
                  {tick % 1 === 0 ? tick : tick.toFixed(1)}
                </text>
              </g>
            );
          })}

          {/* Needle */}
          <motion.line
            x1={CENTER_X}
            y1={CENTER_Y}
            x2={needleTip.x}
            y2={needleTip.y}
            stroke="white"
            strokeWidth={2.5}
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
            r={5}
            fill="#1a1a1a"
            stroke="white"
            strokeWidth={2}
          />
        </svg>
      </div>

      {/* Current value display */}
      <div className="flex justify-center -mt-2">
        <span
          className="text-3xl font-mono font-bold"
          style={{ color: getValueColor(clampedValue) }}
        >
          {clampedValue.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
