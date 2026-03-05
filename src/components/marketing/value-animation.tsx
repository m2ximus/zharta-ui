"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Diamond, FileText, CheckCircle } from "lucide-react";

interface Step {
  number: string;
  icon: React.ElementType;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: "01",
    icon: Diamond,
    title: "Post Collateral",
    description:
      "Deposit your tokenized assets — WBTC, WETH, cbBTC, or RWAs — into Zharta's secure smart contract escrow. Oracle-verified valuations ensure fair pricing.",
  },
  {
    number: "02",
    icon: FileText,
    title: "Receive Fixed-Rate Loan",
    description:
      "Get instant liquidity at a fixed interest rate. No variable rate surprises. Terms are locked at origination — APR, maturity, and LTV are all pre-agreed.",
  },
  {
    number: "03",
    icon: CheckCircle,
    title: "Repay & Reclaim",
    description:
      "Repay your loan at or before maturity and reclaim your full collateral. Early repayment is always an option with no hidden penalties.",
  },
];

function StepCard({
  step,
  index,
  isVisible,
}: {
  step: Step;
  index: number;
  isVisible: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
      transition={{
        duration: 0.6,
        delay: index * 0.25,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="relative flex gap-6 md:gap-8"
    >
      {/* Step number + vertical line */}
      <div className="flex flex-col items-center flex-shrink-0">
        <span className="font-[family-name:var(--font-mono)] text-3xl md:text-4xl font-bold text-[var(--color-primary)]">
          {step.number}
        </span>
        {index < steps.length - 1 && (
          <div className="flex-1 w-px bg-[var(--color-dark-border)] mt-4" />
        )}
      </div>

      {/* Content */}
      <div className="pb-16 md:pb-20">
        <div className="w-12 h-12 rounded-full bg-[var(--color-primary-muted)] flex items-center justify-center mb-4">
          <step.icon className="w-5 h-5 text-[var(--color-primary)]" />
        </div>
        <h3 className="font-[family-name:var(--font-display)] text-xl md:text-2xl text-[var(--color-dark-text)] mb-3">
          {step.title}
        </h3>
        <p className="text-[var(--color-dark-text-muted)] text-sm md:text-base max-w-md leading-relaxed font-[family-name:var(--font-body)]">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}

export function ValueAnimation() {
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
      { threshold: 0.15 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="py-20 md:py-28 bg-[var(--color-dark-bg)]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center mb-16 md:mb-20">
          <p className="text-xs font-medium tracking-[0.25em] uppercase text-[var(--color-dark-text-muted)] mb-4 font-[family-name:var(--font-body)]">
            Simple Process
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl text-[var(--color-dark-text)]">
            How It Works
          </h2>
        </div>

        {/* Steps */}
        <div className="max-w-2xl mx-auto">
          {steps.map((step, index) => (
            <StepCard
              key={step.number}
              step={step}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
