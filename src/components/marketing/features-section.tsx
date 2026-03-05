"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Settings2,
  Coins,
  RefreshCw,
  Lock,
  Code2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureTab {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  preview: React.ReactNode;
}

const features: FeatureTab[] = [
  {
    id: "offers",
    icon: Settings2,
    title: "Customizable Offers",
    description:
      "Set your own terms — APR, LTV, maturity, callable options. Full control over every parameter of your lending and borrowing positions.",
    preview: (
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-[var(--color-dark-text-muted)] border-b border-[var(--color-dark-border)] pb-3 font-[family-name:var(--font-body)]">
          <span>Parameter</span>
          <span>Value</span>
        </div>
        {[
          { label: "APR", value: "6.50%" },
          { label: "LTV Ratio", value: "65%" },
          { label: "Maturity", value: "90 days" },
          { label: "Callable", value: "Yes" },
          { label: "Liquidation LTV", value: "80%" },
          { label: "Origin Fee", value: "0.5%" },
        ].map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between text-sm"
          >
            <span className="text-[var(--color-dark-text-muted)] font-[family-name:var(--font-body)]">
              {row.label}
            </span>
            <span className="text-[var(--color-dark-text)] font-[family-name:var(--font-mono)] font-medium">
              {row.value}
            </span>
          </div>
        ))}
        <div className="pt-4 border-t border-[var(--color-dark-border)]">
          <div className="w-full h-9 bg-[var(--color-primary)] rounded-[var(--radius-card)] flex items-center justify-center text-sm font-medium text-black font-[family-name:var(--font-body)]">
            Submit Offer
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "collateral",
    icon: Coins,
    title: "Diverse Collateral",
    description:
      "WBTC, WETH, cbBTC, ACRED and more tokenized assets. Expand your borrowing power with a growing list of supported collateral types.",
    preview: (
      <div className="space-y-3">
        {[
          { asset: "WBTC", price: "$67,234.50", change: "+2.4%", supported: true },
          { asset: "WETH", price: "$3,456.78", change: "+1.8%", supported: true },
          { asset: "cbBTC", price: "$67,198.20", change: "+2.3%", supported: true },
          { asset: "ACRED", price: "$1.02", change: "+0.1%", supported: true },
          { asset: "wstETH", price: "$4,012.30", change: "+1.5%", supported: true },
        ].map((item) => (
          <div
            key={item.asset}
            className="flex items-center justify-between py-2.5 px-3 bg-[var(--color-dark-bg)] rounded-[var(--radius-card)]"
          >
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-[var(--color-primary-muted)] flex items-center justify-center text-xs font-bold text-[var(--color-primary)] font-[family-name:var(--font-mono)]">
                {item.asset.charAt(0)}
              </div>
              <span className="text-sm font-medium text-[var(--color-dark-text)] font-[family-name:var(--font-body)]">
                {item.asset}
              </span>
            </div>
            <div className="text-right">
              <p className="text-sm text-[var(--color-dark-text)] font-[family-name:var(--font-mono)]">
                {item.price}
              </p>
              <p className="text-xs text-[var(--color-primary)]">{item.change}</p>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "refinance",
    icon: RefreshCw,
    title: "Refinance Pro",
    description:
      "Seamlessly refinance active loans with better terms. Roll existing positions into new offers without disrupting your collateral.",
    preview: (
      <div className="space-y-4">
        <div className="p-3 bg-[var(--color-dark-bg)] rounded-[var(--radius-card)] border border-[var(--color-dark-border)]">
          <p className="text-xs text-[var(--color-dark-text-muted)] mb-2 font-[family-name:var(--font-body)]">
            Current Loan
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-[var(--color-dark-text)] font-[family-name:var(--font-mono)]">
              8.00% APR
            </span>
            <span className="text-xs text-[var(--color-dark-text-muted)] font-[family-name:var(--font-body)]">
              45 days remaining
            </span>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-8 h-8 rounded-full bg-[var(--color-primary-muted)] flex items-center justify-center">
            <RefreshCw className="w-4 h-4 text-[var(--color-primary)]" />
          </div>
        </div>

        <div className="p-3 bg-[var(--color-dark-bg)] rounded-[var(--radius-card)] border border-[var(--color-primary)] border-opacity-30">
          <p className="text-xs text-[var(--color-primary)] mb-2 font-[family-name:var(--font-body)]">
            New Terms
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-[var(--color-dark-text)] font-[family-name:var(--font-mono)]">
              6.25% APR
            </span>
            <span className="text-xs text-[var(--color-primary)] font-[family-name:var(--font-body)]">
              Save 1.75%
            </span>
          </div>
        </div>

        <div className="w-full h-9 bg-[var(--color-primary)] rounded-[var(--radius-card)] flex items-center justify-center text-sm font-medium text-black font-[family-name:var(--font-body)]">
          Refinance Now
        </div>
      </div>
    ),
  },
  {
    id: "escrow",
    icon: Lock,
    title: "Smart Escrow",
    description:
      "Automated collateral management with oracle-based liquidation. Your assets are securely escrowed with real-time LTV monitoring.",
    preview: (
      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-[var(--color-dark-text-muted)] font-[family-name:var(--font-body)]">
            Collateral
          </span>
          <span className="text-[var(--color-dark-text)] font-[family-name:var(--font-mono)]">
            2.5 WBTC
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-[var(--color-dark-text-muted)] font-[family-name:var(--font-body)]">
            Value
          </span>
          <span className="text-[var(--color-dark-text)] font-[family-name:var(--font-mono)]">
            $168,086.25
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[var(--color-dark-text-muted)] font-[family-name:var(--font-body)]">
              Current LTV
            </span>
            <span className="text-[var(--color-primary)] font-[family-name:var(--font-mono)]">
              58%
            </span>
          </div>
          <div className="w-full h-2 bg-[var(--color-dark-bg)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--color-primary)] rounded-full"
              style={{ width: "58%" }}
            />
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-[var(--color-dark-text-muted)] font-[family-name:var(--font-body)]">
              Safe
            </span>
            <span className="text-[var(--color-dark-text-muted)] font-[family-name:var(--font-body)]">
              Liquidation: 80%
            </span>
          </div>
        </div>

        <div className="p-3 bg-[var(--color-dark-bg)] rounded-[var(--radius-card)] flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse" />
          <span className="text-xs text-[var(--color-dark-text-muted)] font-[family-name:var(--font-body)]">
            Oracle: Chainlink &middot; Updated 12s ago
          </span>
        </div>
      </div>
    ),
  },
  {
    id: "api",
    icon: Code2,
    title: "API & Pipes",
    description:
      "Full programmatic access — integrate Zharta into your existing infrastructure. REST API, WebSocket feeds, and SDK support.",
    preview: (
      <div className="space-y-1">
        <div className="font-[family-name:var(--font-mono)] text-xs leading-relaxed">
          <p className="text-[var(--color-dark-text-muted)]">
            <span className="text-[var(--color-primary)]">const</span> zharta ={" "}
            <span className="text-[var(--color-primary)]">new</span>{" "}
            <span className="text-[var(--color-dark-text)]">ZhartaSDK</span>
            {"({"}
          </p>
          <p className="pl-4 text-[var(--color-dark-text-muted)]">
            apiKey:{" "}
            <span className="text-amber-400">
              &apos;zh_live_...&apos;
            </span>
            ,
          </p>
          <p className="pl-4 text-[var(--color-dark-text-muted)]">
            network:{" "}
            <span className="text-amber-400">
              &apos;ethereum&apos;
            </span>
          </p>
          <p className="text-[var(--color-dark-text-muted)]">{"});"}</p>
          <p className="text-[var(--color-dark-text-muted)] mt-3">
            <span className="text-[var(--color-primary)]">const</span> loan ={" "}
            <span className="text-[var(--color-primary)]">await</span>{" "}
            zharta.loans.
            <span className="text-[var(--color-dark-text)]">create</span>
            {"({"}
          </p>
          <p className="pl-4 text-[var(--color-dark-text-muted)]">
            collateral:{" "}
            <span className="text-amber-400">
              &apos;WBTC&apos;
            </span>
            ,
          </p>
          <p className="pl-4 text-[var(--color-dark-text-muted)]">
            amount: <span className="text-[var(--color-primary)]">2.5</span>,
          </p>
          <p className="pl-4 text-[var(--color-dark-text-muted)]">
            principal:{" "}
            <span className="text-amber-400">
              &apos;USDC&apos;
            </span>
          </p>
          <p className="text-[var(--color-dark-text-muted)]">{"});"}</p>
        </div>
      </div>
    ),
  },
];

export function FeaturesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeFeature = features[activeIndex];

  return (
    <section className="py-20 md:py-28 bg-[var(--color-dark-bg-secondary)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center mb-16">
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl lg:text-6xl text-[var(--color-dark-text)]">
            Predictable. Flexible. Compliant.
          </h2>
          <p className="mt-4 text-[var(--color-dark-text-muted)] text-lg max-w-xl mx-auto font-[family-name:var(--font-body)]">
            Everything you need to lend and borrow with confidence
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {features.map((feature, index) => (
            <button
              key={feature.id}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "inline-flex items-center gap-2 px-4 py-2.5 text-sm rounded-full border transition-all duration-300 cursor-pointer font-[family-name:var(--font-body)]",
                activeIndex === index
                  ? "bg-[var(--color-primary)] text-black border-[var(--color-primary)]"
                  : "bg-transparent text-[var(--color-dark-text-muted)] border-[var(--color-dark-border)] hover:border-[var(--color-dark-border-hover)] hover:text-[var(--color-dark-text)]"
              )}
            >
              <feature.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{feature.title}</span>
            </button>
          ))}
        </div>

        {/* Feature content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFeature.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 gap-8 items-start"
          >
            {/* Description */}
            <div className="flex flex-col justify-center py-4 md:py-8">
              <div className="w-12 h-12 rounded-full bg-[var(--color-primary-muted)] flex items-center justify-center mb-6">
                <activeFeature.icon className="w-6 h-6 text-[var(--color-primary)]" />
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl text-[var(--color-dark-text)] mb-4">
                {activeFeature.title}
              </h3>
              <p className="text-[var(--color-dark-text-muted)] text-base leading-relaxed font-[family-name:var(--font-body)]">
                {activeFeature.description}
              </p>
            </div>

            {/* Mock UI preview */}
            <div className="bg-[var(--color-dark-bg-tertiary)] border border-[var(--color-dark-border)] rounded-[var(--radius-card)] p-6">
              {/* Mock window bar */}
              <div className="flex items-center gap-1.5 mb-5 pb-4 border-b border-[var(--color-dark-border)]">
                <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-dark-text-muted)] opacity-30" />
                <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-dark-text-muted)] opacity-30" />
                <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-dark-text-muted)] opacity-30" />
              </div>
              {activeFeature.preview}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
