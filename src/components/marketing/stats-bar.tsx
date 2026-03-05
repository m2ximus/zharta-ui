"use client";

import { useEffect, useRef, useState } from "react";

interface StatItem {
  value: string;
  numericValue: number;
  prefix: string;
  suffix: string;
  label: string;
  decimals?: number;
}

const stats: StatItem[] = [
  {
    value: "30",
    numericValue: 30,
    prefix: "$",
    suffix: "M+",
    label: "Loans originated",
  },
  {
    value: "5000",
    numericValue: 5000,
    prefix: "",
    suffix: "+",
    label: "Transactions settled",
  },
  {
    value: "10",
    numericValue: 10,
    prefix: "",
    suffix: "/10",
    label: "Multiple audits",
  },
  {
    value: "4.5",
    numericValue: 4.5,
    prefix: "$",
    suffix: "M",
    label: "Raised to date",
    decimals: 1,
  },
];

function AnimatedCounter({
  target,
  prefix,
  suffix,
  isVisible,
  decimals = 0,
}: {
  target: number;
  prefix: string;
  suffix: string;
  isVisible: boolean;
  decimals?: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 1500;
    const startTime = performance.now();

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [isVisible, target]);

  const displayValue =
    decimals > 0
      ? count.toFixed(decimals)
      : target >= 1000
        ? Math.round(count).toLocaleString()
        : Math.round(count);

  return (
    <span className="font-[family-name:var(--font-mono)] text-3xl md:text-4xl font-bold text-[var(--color-dark-text)] tabular-nums">
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}

export function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="bg-[var(--color-dark-bg)] py-16 md:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center text-center ${
                index < stats.length - 1
                  ? "md:border-r md:border-[var(--color-dark-border)]"
                  : ""
              }`}
            >
              <div
                className={`transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-3"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <AnimatedCounter
                  target={stat.numericValue}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  isVisible={isVisible}
                  decimals={stat.decimals}
                />
                <p className="mt-2 text-sm text-[var(--color-dark-text-muted)] font-[family-name:var(--font-body)]">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
