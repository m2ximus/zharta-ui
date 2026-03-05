"use client";

import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface WalletButtonProps {
  className?: string;
}

export function WalletButton({ className }: WalletButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center gap-1.5",
        "border border-[var(--border)] hover:border-[var(--border-hover)]",
        "rounded-[var(--radius-card)] px-3 py-1.5",
        "font-[family-name:var(--font-mono)] text-xs text-[var(--foreground-muted)]",
        "transition-colors cursor-pointer",
        className
      )}
    >
      <span>0xe0...ABd9</span>
      <ChevronDown className="w-3 h-3" />
    </button>
  );
}
