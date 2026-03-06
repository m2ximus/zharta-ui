"use client";

import { cn } from "@/lib/utils";

interface PortfolioToggleProps {
  active: "lending" | "borrowing";
  onToggle: (value: "lending" | "borrowing") => void;
}

export function PortfolioToggle({ active, onToggle }: PortfolioToggleProps) {
  return (
    <div className="flex items-baseline gap-2 sm:gap-3">
      <button
        onClick={() => onToggle("borrowing")}
        className={cn(
          "font-[family-name:var(--font-display)] transition-all duration-300 ease-in-out leading-tight",
          active === "borrowing"
            ? "text-2xl sm:text-4xl md:text-5xl text-[var(--foreground)]"
            : "text-xs sm:text-sm md:text-base text-[var(--foreground-muted)] hover:text-[var(--foreground)] cursor-pointer"
        )}
      >
        Borrowing
      </button>
      <button
        onClick={() => onToggle("lending")}
        className={cn(
          "font-[family-name:var(--font-display)] transition-all duration-300 ease-in-out leading-tight",
          active === "lending"
            ? "text-2xl sm:text-4xl md:text-5xl text-[var(--foreground)]"
            : "text-xs sm:text-sm md:text-base text-[var(--foreground-muted)] hover:text-[var(--foreground)] cursor-pointer"
        )}
      >
        Lending
      </button>
    </div>
  );
}
