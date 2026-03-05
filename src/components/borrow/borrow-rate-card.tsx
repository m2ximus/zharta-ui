"use client";

import { AssetBadge } from "@/components/shared/asset-badge";

interface BorrowRateCardProps {
  rate: number;
  asset: string;
}

export function BorrowRateCard({ rate, asset }: BorrowRateCardProps) {
  return (
    <div className="relative overflow-hidden rounded-[var(--radius-card)] p-6 bg-[#141414]">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle teal glow top-right */}
        <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-[var(--color-primary)]/8 blur-3xl" />
        {/* Very faint grid texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="relative">
        {/* Label row */}
        <div className="flex items-center gap-2.5 mb-5">
          <AssetBadge asset={asset} size="lg" />
          <span className="text-sm text-white/50">Borrow Rate</span>
        </div>

        {/* Rate display */}
        <div className="flex items-baseline gap-1">
          <span className="text-6xl font-[family-name:var(--font-mono)] font-bold text-[var(--color-primary)] tracking-tight leading-none">
            {rate.toFixed(2)}
          </span>
          <span className="text-3xl font-[family-name:var(--font-mono)] font-bold text-[var(--color-primary)]">
            %
          </span>
        </div>

        {/* APR label */}
        <span className="text-xs text-white/40 uppercase tracking-wider mt-2 block">
          Annual Percentage Rate
        </span>
      </div>
    </div>
  );
}
