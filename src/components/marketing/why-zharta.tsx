"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  Check,
  TrendingUp,
  Shield,
  Layers,
  Clock,
  Lock,
  Settings,
  Target,
  Gauge,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Tab = "borrow" | "lend";

const tabData = {
  borrow: {
    headline: "Access instant liquidity against your tokenized assets",
    features: [
      {
        icon: Lock,
        title: "Fixed rates",
        description: "Know your costs upfront",
      },
      {
        icon: Shield,
        title: "No margin calls",
        description: "Within LTV range",
      },
      {
        icon: Layers,
        title: "Multiple collateral types",
        description: "Supported",
      },
      {
        icon: Clock,
        title: "Flexible maturity",
        description: "Terms",
      },
    ],
    cta: "Start Borrowing",
  },
  lend: {
    headline: "Earn predictable yield on institutional-grade loans",
    features: [
      {
        icon: TrendingUp,
        title: "Fixed APR",
        description: "No variable rate risk",
      },
      {
        icon: Shield,
        title: "Full collateral coverage",
        description: "Always backed",
      },
      {
        icon: Settings,
        title: "Customizable offer terms",
        description: "Your parameters",
      },
      {
        icon: Gauge,
        title: "Automated loan management",
        description: "Set and forget",
      },
    ],
    cta: "Start Lending",
  },
};

export function WhyZharta() {
  const [activeTab, setActiveTab] = useState<Tab>("borrow");
  const data = tabData[activeTab];

  return (
    <section className="relative py-20 md:py-28 bg-[var(--color-dark-bg)] overflow-hidden">
      {/* Decorative diamond pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="diamond-pattern-why"
              x="0"
              y="0"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M40 5L75 40L40 75L5 40Z"
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diamond-pattern-why)" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center mb-12">
          <p className="text-xs font-medium tracking-[0.25em] uppercase text-[var(--color-dark-text-muted)] mb-4 font-[family-name:var(--font-body)]">
            Why Zharta
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl text-[var(--color-dark-text)]">
            Two sides. One protocol.
          </h2>
        </div>

        {/* Tab switcher */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-[var(--color-dark-bg-secondary)] border border-[var(--color-dark-border)] rounded-full p-1">
            {(["borrow", "lend"] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "relative px-8 py-2.5 text-sm font-medium rounded-full transition-all duration-300 cursor-pointer",
                  activeTab === tab
                    ? "bg-[var(--color-primary)] text-black"
                    : "text-[var(--color-dark-text-muted)] hover:text-[var(--color-dark-text)]"
                )}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Content card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-[var(--color-dark-bg-secondary)] border border-[var(--color-dark-border)] rounded-[var(--radius-card)] p-8 md:p-12">
              <h3 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl text-[var(--color-dark-text)] mb-8">
                {data.headline}
              </h3>

              <div className="grid gap-5">
                {data.features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--color-primary-muted)] flex items-center justify-center">
                      <feature.icon className="w-4 h-4 text-[var(--color-primary)]" />
                    </div>
                    <div>
                      <span className="text-[var(--color-dark-text)] font-medium font-[family-name:var(--font-body)]">
                        {feature.title}
                      </span>
                      <span className="text-[var(--color-dark-text-muted)] font-[family-name:var(--font-body)]">
                        {" "}
                        &mdash; {feature.description}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-10">
                <button className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium bg-[var(--color-primary)] text-black rounded-full hover:bg-[var(--color-primary-hover)] transition-colors cursor-pointer">
                  {data.cta}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
