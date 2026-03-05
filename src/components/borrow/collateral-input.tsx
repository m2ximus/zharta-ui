"use client";

import * as React from "react";
import { AssetBadge } from "@/components/shared/asset-badge";
import { cn, formatCurrency } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { assets } from "@/data/assets";
import type { CollateralType } from "@/types";

const MOCK_PRICES: Record<string, number> = {
  WBTC: 67500,
  WETH: 3800,
  cbBTC: 67000,
  ACRED: 1.02,
  wstETH: 4200,
  rETH: 4100,
};

const MOCK_BALANCES: Record<string, string> = {
  WBTC: "10K",
  WETH: "10K",
  cbBTC: "10K",
  ACRED: "150K",
  wstETH: "10K",
  rETH: "10K",
};

const COLLATERAL_ASSETS: CollateralType[] = ["WBTC", "WETH", "cbBTC", "ACRED", "wstETH", "rETH"];

interface CollateralInputProps {
  asset: CollateralType;
  amount: string;
  onAssetChange: (asset: CollateralType) => void;
  onAmountChange: (amount: string) => void;
  compact?: boolean;
}

export function CollateralInput({
  asset,
  amount,
  onAssetChange,
  onAmountChange,
  compact = false,
}: CollateralInputProps) {
  const [open, setOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const price = MOCK_PRICES[asset] ?? 0;
  const numericAmount = parseFloat(amount) || 0;
  const usdValue = numericAmount * price;
  const assetInfo = assets[asset];

  // Close on outside click
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
        {/* Asset selector — custom dropdown like Spark */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 h-11 px-3 bg-[var(--background-tertiary)] border border-[var(--border)] rounded-full hover:border-[var(--border-hover)] transition-colors cursor-pointer"
          >
            <AssetBadge asset={asset} size="md" />
            <ChevronDown className="w-3.5 h-3.5 text-[var(--foreground-muted)]" />
          </button>

          {/* Dropdown */}
          {open && (
            <div className="absolute top-full left-0 mt-2 w-56 bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius-card)] shadow-lg z-50 py-1 overflow-hidden">
              {COLLATERAL_ASSETS.map((a) => (
                <button
                  key={a}
                  onClick={() => {
                    onAssetChange(a);
                    setOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2.5 hover:bg-[var(--muted)] transition-colors cursor-pointer",
                    a === asset && "bg-[var(--muted)]"
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <AssetBadge asset={a} size="md" />
                    <span className="text-sm font-medium text-[var(--foreground)]">
                      {assets[a]?.name || a}
                    </span>
                  </div>
                  <span className="text-xs text-[var(--foreground-muted)] font-[family-name:var(--font-mono)]">
                    Balance{"\u00A0"}{MOCK_BALANCES[a] || "0"}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Amount input */}
        <div className="flex-1 flex items-center gap-2">
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
          <button
            onClick={() => onAmountChange("10000")}
            className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition-colors cursor-pointer whitespace-nowrap"
          >
            MAX
          </button>
        </div>
      </div>

      {/* USD value + balance */}
      <div className="flex items-center justify-between mt-1">
        <span className="text-[11px] text-[var(--foreground-muted)] font-[family-name:var(--font-mono)]">
          {formatCurrency(usdValue, 2)}
        </span>
        <span className="text-[11px] text-[var(--foreground-muted)]">
          {assetInfo ? `${numericAmount.toLocaleString()} ${asset}` : asset}
        </span>
      </div>
    </div>
  );
}
