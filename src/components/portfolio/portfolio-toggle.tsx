"use client";

import { cn } from "@/lib/utils";

interface PortfolioToggleProps {
  active: "lending" | "borrowing";
  onToggle: (value: "lending" | "borrowing") => void;
}

export function PortfolioToggle({ active, onToggle }: PortfolioToggleProps) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full bg-[var(--background-tertiary)] p-1">
      <button
        onClick={() => onToggle("lending")}
        className={cn(
          "px-5 py-1.5 text-sm font-medium rounded-full transition-all duration-200",
          active === "lending"
            ? "bg-[var(--color-primary)] text-black"
            : "text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
        )}
      >
        Lending
      </button>
      <button
        onClick={() => onToggle("borrowing")}
        className={cn(
          "px-5 py-1.5 text-sm font-medium rounded-full transition-all duration-200",
          active === "borrowing"
            ? "bg-[var(--color-primary)] text-black"
            : "text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
        )}
      >
        Borrowing
      </button>
    </div>
  );
}
