"use client";

import { cn } from "@/lib/utils";

interface PortfolioToggleProps {
  active: "lending" | "borrowing";
  onToggle: (value: "lending" | "borrowing") => void;
}

export function PortfolioToggle({ active, onToggle }: PortfolioToggleProps) {
  return (
    <div className="flex items-center gap-6">
      {(["lending", "borrowing"] as const).map((mode) => (
        <button
          key={mode}
          onClick={() => onToggle(mode)}
          className={cn(
            "relative pb-1 text-sm font-medium transition-colors",
            active === mode
              ? "text-[var(--foreground)]"
              : "text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
          )}
        >
          {mode === "lending" ? "Lending" : "Borrowing"}
          {active === mode && (
            <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--color-primary)]" />
          )}
        </button>
      ))}
    </div>
  );
}
