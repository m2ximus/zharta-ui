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
import type { PrincipalType } from "@/types";

const STABLECOIN_PRICE = 1;

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
  compact = false,
}: PrincipalInputProps) {
  const numericAmount = parseFloat(amount) || 0;
  const usdValue = numericAmount * STABLECOIN_PRICE;

  const content = (
    <>
      {/* Input row */}
      <div className="flex items-center gap-3">
        {/* Asset selector */}
        <Select
          value={asset}
          onValueChange={(v) => onAssetChange(v as PrincipalType)}
        >
          <SelectTrigger className="w-[140px] h-12 bg-[var(--background-tertiary)] border-[var(--border)] rounded-full">
            <SelectValue>
              <div className="flex items-center gap-2">
                <AssetBadge asset={asset} size="md" />
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {PRINCIPAL_ASSETS.map((a) => (
              <SelectItem key={a} value={a}>
                <div className="flex items-center gap-2">
                  <AssetBadge asset={a} size="sm" />
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Amount input */}
        <div className="flex-1">
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
        </div>
      </div>

      {/* USD value */}
      <div className="flex justify-end mt-1.5">
        <span className="text-xs text-[var(--foreground-muted)] font-[family-name:var(--font-mono)]">
          {formatCurrency(usdValue, 2)}
        </span>
      </div>
    </>
  );

  if (compact) return content;

  return (
    <div className="p-5 bg-[var(--card)] border border-[var(--border)] rounded-[3px]">
      {content}
    </div>
  );
}
