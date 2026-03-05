"use client";

import * as React from "react";
import { AppNav } from "@/components/layout/app-nav";
import { PageTransition } from "@/components/shared/page-transition";
import { AssetBadge } from "@/components/shared/asset-badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronDown, ArrowDownUp } from "lucide-react";

type SwapAsset = "USDC" | "USDT" | "DAI" | "WETH" | "wstETH" | "WBTC" | "rETH";

const SWAP_ASSETS: SwapAsset[] = ["USDC", "USDT", "DAI", "WETH", "wstETH", "WBTC", "rETH"];

const MOCK_BALANCES: Record<string, number> = {
  USDC: 10000,
  USDT: 10000,
  DAI: 10000,
  WETH: 20000,
  wstETH: 10000,
  WBTC: 10000,
  rETH: 10000,
};

const MOCK_PRICES: Record<string, number> = {
  USDC: 1,
  USDT: 1,
  DAI: 1,
  WETH: 3800,
  wstETH: 4200,
  WBTC: 67500,
  rETH: 4100,
};

function AssetSelector({
  asset,
  onAssetChange,
  exclude,
}: {
  asset: SwapAsset;
  onAssetChange: (a: SwapAsset) => void;
  exclude?: SwapAsset;
}) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 h-11 px-3 bg-[var(--background-tertiary)] border border-[var(--border)] rounded-full hover:border-[var(--border-hover)] transition-colors cursor-pointer"
      >
        <AssetBadge asset={asset} size="md" />
        <ChevronDown className="w-3.5 h-3.5 text-[var(--foreground-muted)]" />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 w-48 max-w-[calc(100vw-2rem)] bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius-card)] shadow-lg z-50 py-1">
          {SWAP_ASSETS.filter((a) => a !== exclude).map((a) => (
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
  );
}

export default function SwapPage() {
  const [fromAsset, setFromAsset] = React.useState<SwapAsset>("USDC");
  const [toAsset, setToAsset] = React.useState<SwapAsset>("WETH");
  const [fromAmount, setFromAmount] = React.useState("");
  const [toAmount, setToAmount] = React.useState("");

  const fromPrice = MOCK_PRICES[fromAsset] ?? 1;
  const toPrice = MOCK_PRICES[toAsset] ?? 1;
  const rate = fromPrice / toPrice;

  // Update "to" when "from" changes
  React.useEffect(() => {
    const num = parseFloat(fromAmount);
    if (num > 0) {
      setToAmount((num * rate).toFixed(6));
    } else {
      setToAmount("");
    }
  }, [fromAmount, rate]);

  const handleFlip = () => {
    setFromAsset(toAsset);
    setToAsset(fromAsset);
    setFromAmount(toAmount);
  };

  const fromBalance = MOCK_BALANCES[fromAsset] ?? 0;
  const toBalance = MOCK_BALANCES[toAsset] ?? 0;

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <AppNav />

      <main className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-6">
        <PageTransition>
          <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl text-[var(--foreground)] mb-8">
            Swap
          </h1>

          <div className="flex justify-center">
            <div className="w-full max-w-lg">
              {/* From */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-[var(--foreground)]">
                    From
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <AssetSelector
                    asset={fromAsset}
                    onAssetChange={setFromAsset}
                    exclude={toAsset}
                  />
                  <input
                    type="text"
                    inputMode="decimal"
                    value={fromAmount}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === "" || /^\d*\.?\d*$/.test(val)) setFromAmount(val);
                    }}
                    placeholder="0"
                    className="w-full bg-transparent text-right text-lg font-[family-name:var(--font-mono)] font-medium text-[var(--foreground)] placeholder:text-[var(--foreground-muted)]/30 outline-none"
                  />
                  <div className="flex flex-col items-end flex-shrink-0">
                    <button
                      onClick={() => setFromAmount(String(fromBalance))}
                      className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition-colors cursor-pointer"
                    >
                      MAX
                    </button>
                    <span className="text-[11px] text-[var(--foreground-muted)] font-[family-name:var(--font-mono)] whitespace-nowrap">
                      {fromBalance.toLocaleString()} {fromAsset}
                    </span>
                  </div>
                </div>
              </Card>

              {/* Flip button */}
              <div className="flex justify-center -my-3 relative z-10">
                <button
                  onClick={handleFlip}
                  className="w-10 h-10 rounded-full bg-[var(--card)] border border-[var(--border)] flex items-center justify-center shadow-sm hover:bg-[var(--muted)] transition-colors cursor-pointer"
                >
                  <ArrowDownUp className="w-4 h-4 text-[var(--color-primary)]" />
                </button>
              </div>

              {/* To */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-[var(--foreground)]">
                    To
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <AssetSelector
                    asset={toAsset}
                    onAssetChange={setToAsset}
                    exclude={fromAsset}
                  />
                  <input
                    type="text"
                    inputMode="decimal"
                    value={toAmount}
                    readOnly
                    placeholder="0"
                    className="w-full bg-transparent text-right text-lg font-[family-name:var(--font-mono)] font-medium text-[var(--foreground)] placeholder:text-[var(--foreground-muted)]/30 outline-none"
                  />
                  <div className="flex flex-col items-end flex-shrink-0">
                    <span className="text-[11px] text-[var(--foreground-muted)] font-[family-name:var(--font-mono)] whitespace-nowrap">
                      {toBalance.toLocaleString()} {toAsset}
                    </span>
                  </div>
                </div>
              </Card>

              {/* Rate info */}
              {parseFloat(fromAmount) > 0 && (
                <div className="mt-4 px-2 flex items-center justify-between text-xs text-[var(--foreground-muted)]">
                  <span>Rate</span>
                  <span className="font-[family-name:var(--font-mono)]">
                    1 {fromAsset} = {rate.toFixed(6)} {toAsset}
                  </span>
                </div>
              )}

              {/* Swap button */}
              <Button
                size="lg"
                className="w-full h-14 mt-4 rounded-[var(--radius-pill)] text-lg font-semibold"
                disabled={!fromAmount || parseFloat(fromAmount) === 0}
              >
                Swap
              </Button>
            </div>
          </div>
        </PageTransition>
      </main>
    </div>
  );
}
