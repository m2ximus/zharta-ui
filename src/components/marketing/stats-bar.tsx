"use client";

import { useEffect, useRef, useState } from "react";

interface StatItem {
  value: string;
  numericValue: number;
  prefix: string;
  suffix: string;
  label: string;
}

const stats: StatItem[] = [
  {
    value: "12",
    numericValue: 12,
    prefix: "$",
    suffix: "M+",
    label: "Total Loans",
  },
  {
    value: "20",
    numericValue: 20,
    prefix: "$",
    suffix: "M+",
    label: "Total Collateralized",
  },
  {
    value: "5",
    numericValue: 5,
    prefix: "",
    suffix: "K+",
    label: "Transactions",
  },
  {
    value: "1",
    numericValue: 1,
    prefix: "$",
    suffix: "M",
    label: "Biggest Loan",
  },
];

function AnimatedCounter({
  target,
  prefix,
  suffix,
  isVisible,
}: {
  target: number;
  prefix: string;
  suffix: string;
  isVisible: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const duration = 1500;
    const startTime = performance.now();

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(eased * target);
      setCount(start);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [isVisible, target]);

  return (
    <span className="font-[family-name:var(--font-mono)] text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-dark-text)] tabular-nums">
      {prefix}
      {count}
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
      className="bg-[var(--color-dark-bg-secondary)] py-16 md:py-20 border-y border-[var(--color-dark-border)]"
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
