"use client";

import { AssetBadge } from "@/components/shared/asset-badge";

interface BorrowRateCardProps {
  rate: number;
  asset: string;
}

export function BorrowRateCard({ rate, asset }: BorrowRateCardProps) {
  return (
    <div className="relative overflow-hidden rounded-[3px] border border-[var(--border)] bg-black/50 p-6">
      {/* Subtle gradient glow behind the card */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative">
        {/* Label row */}
        <div className="flex items-center gap-2 mb-3">
          <AssetBadge asset={asset} size="sm" />
          <span className="text-sm text-[var(--foreground-muted)]">
            Borrow Rate
          </span>
        </div>

        {/* Rate display */}
        <div className="flex items-baseline gap-1">
          <span className="text-5xl font-[family-name:var(--font-mono)] font-bold text-[var(--color-primary)] tracking-tight">
            {rate.toFixed(2)}
          </span>
          <span className="text-2xl font-[family-name:var(--font-mono)] font-bold text-[var(--color-primary)]">
            %
          </span>
        </div>

        {/* Subtle APR label */}
        <span className="text-xs text-[var(--foreground-muted)] uppercase tracking-wider mt-1 block">
          Annual Percentage Rate
        </span>
      </div>
    </div>
  );
}
