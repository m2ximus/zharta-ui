"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface PortfolioToggleProps {
  active: "lending" | "borrowing";
  onToggle: (value: "lending" | "borrowing") => void;
}

export function PortfolioToggle({ active, onToggle }: PortfolioToggleProps) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full bg-[var(--background-tertiary)] p-1">
      {(["lending", "borrowing"] as const).map((mode) => (
        <button
          key={mode}
          onClick={() => onToggle(mode)}
          className={cn(
            "relative px-5 py-1.5 text-sm font-medium rounded-full transition-colors duration-200",
            active === mode
              ? "text-black"
              : "text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
          )}
        >
          {active === mode && (
            <motion.div
              layoutId="portfolio-toggle-active"
              className="absolute inset-0 rounded-full bg-[var(--color-primary)]"
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
            />
          )}
          <span className="relative z-10">
            {mode === "lending" ? "Lending" : "Borrowing"}
          </span>
        </button>
      ))}
    </div>
  );
}
