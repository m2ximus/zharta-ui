"use client";

import { Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

interface WalletButtonProps {
  className?: string;
}

export function WalletButton({ className }: WalletButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center gap-2",
        "bg-[var(--color-primary)] text-black",
        "rounded-full px-4 py-2",
        "font-mono text-sm font-medium",
        "hover:bg-[var(--color-primary-hover)] transition-colors cursor-pointer",
        className
      )}
    >
      <Wallet className="h-4 w-4" />
      <span>0x1a2B...9f4E</span>
    </button>
  );
}
