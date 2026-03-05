"use client";

import * as React from "react";
import { AssetBadge } from "@/components/shared/asset-badge";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { cn, formatCurrency } from "@/lib/utils";
import type { CollateralType } from "@/types";

const MOCK_PRICES: Record<string, number> = {
  WBTC: 67500,
  WETH: 3800,
  cbBTC: 67000,
  ACRED: 1.02,
};

const MOCK_BALANCES: Record<string, number> = {
  WBTC: 2.4531,
  WETH: 18.72,
  cbBTC: 1.085,
  ACRED: 150000,
};

const COLLATERAL_ASSETS: CollateralType[] = ["WBTC", "WETH", "cbBTC", "ACRED"];

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
  const price = MOCK_PRICES[asset] ?? 0;
  const balance = MOCK_BALANCES[asset] ?? 0;
  const numericAmount = parseFloat(amount) || 0;
  const usdValue = numericAmount * price;

  const Wrapper = compact ? React.Fragment : WrapCard;

  return (
    <Wrapper>
      {/* Input row */}
      <div className="flex items-center gap-3">
        {/* Asset selector */}
        <Select
          value={asset}
          onValueChange={(v) => onAssetChange(v as CollateralType)}
        >
          <SelectTrigger className="w-[140px] h-12 bg-[var(--background-tertiary)] border-[var(--border)] rounded-full">
            <SelectValue>
              <div className="flex items-center gap-2">
                <AssetBadge asset={asset} size="md" />
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {COLLATERAL_ASSETS.map((a) => (
              <SelectItem key={a} value={a}>
                <div className="flex items-center gap-2">
                  <AssetBadge asset={a} size="sm" />
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Amount input + MAX */}
        <div className="flex-1 relative">
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
            placeholder="0.00"
            className={cn(
              "w-full h-12 bg-transparent text-right text-xl font-[family-name:var(--font-mono)] font-medium",
              "text-[var(--foreground)] placeholder:text-[var(--foreground-muted)]/30",
              "outline-none border-none focus:ring-0"
            )}
          />
          <button
            onClick={() =>
              onAmountChange(balance.toFixed(asset === "ACRED" ? 0 : 4))
            }
            className="absolute right-0 top-0 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition-colors cursor-pointer"
          >
            MAX
          </button>
        </div>
      </div>

      {/* USD value + balance */}
      <div className="flex items-center justify-between mt-1.5">
        <span className="text-xs text-[var(--foreground-muted)]">
          {balance.toLocaleString(undefined, { maximumFractionDigits: 4 })}{" "}
          {asset}
        </span>
        <span className="text-xs text-[var(--foreground-muted)] font-[family-name:var(--font-mono)]">
          {formatCurrency(usdValue, 2)}
        </span>
      </div>
    </Wrapper>
  );
}

function WrapCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-5 bg-[var(--card)] border border-[var(--border)] rounded-[3px]">
      {children}
    </div>
  );
}
