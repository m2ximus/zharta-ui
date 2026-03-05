"use client";

import * as React from "react";
import { AssetBadge } from "@/components/shared/asset-badge";
import { cn, formatCurrency } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import type { PrincipalType } from "@/types";

const PRINCIPAL_ASSETS: PrincipalType[] = ["USDC", "USDT", "DAI"];

interface PrincipalInputProps {
  asset: PrincipalType;
  amount: string;
  onAssetChange: (asset: PrincipalType) => void;
  onAmountChange: (amount: string) => void;
  compact?: boolean;
}

export function PrincipalInput({
  asset,
  amount,
  onAssetChange,
  onAmountChange,
}: PrincipalInputProps) {
  const [open, setOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const numericAmount = parseFloat(amount) || 0;
  const usdValue = numericAmount;

  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div>
      {/* Input row */}
      <div className="flex items-center gap-3">
        {/* Asset selector */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 h-11 px-3 bg-[var(--background-tertiary)] border border-[var(--border)] rounded-full hover:border-[var(--border-hover)] transition-colors cursor-pointer"
          >
            <AssetBadge asset={asset} size="md" />
            <ChevronDown className="w-3.5 h-3.5 text-[var(--foreground-muted)]" />
          </button>

          {open && (
            <div className="absolute top-full left-0 mt-2 w-44 bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius-card)] shadow-lg z-50 py-1">
              {PRINCIPAL_ASSETS.map((a) => (
                <button
                  key={a}
                  onClick={() => {
                    onAssetChange(a);
                    setOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-[var(--muted)] transition-colors cursor-pointer",
                    a === asset && "bg-[var(--muted)]"
                  )}
                >
                  <AssetBadge asset={a} size="md" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Amount input */}
        <input
          type="text"
          inputMode="decimal"
          value={amount}
          onChange={(e) => {
            const val = e.target.value;
            if (val === "" || /^\d*\.?\d*$/.test(val)) {
              onAmountChange(val);
            }
          }}
          placeholder="0"
          className={cn(
            "w-full bg-transparent text-right text-lg font-[family-name:var(--font-mono)] font-medium",
            "text-[var(--foreground)] placeholder:text-[var(--foreground-muted)]/30",
            "outline-none border-none focus:ring-0"
          )}
        />
      </div>

      {/* USD value */}
      <div className="flex justify-start mt-1">
        <span className="text-[11px] text-[var(--foreground-muted)] font-[family-name:var(--font-mono)]">
          {formatCurrency(usdValue, 2)}
        </span>
      </div>
    </div>
  );
}
