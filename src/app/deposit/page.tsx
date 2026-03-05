"use client";

import * as React from "react";
import { AppNav } from "@/components/layout/app-nav";
import { PageTransition } from "@/components/shared/page-transition";
import { AssetBadge } from "@/components/shared/asset-badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

const depositAssets = [
  { symbol: "DAI", balance: 10000, usdValue: 10000, deposited: 0, apy: 2.89, collateral: true },
  { symbol: "USDC", balance: 10000, usdValue: 10000, deposited: 0, apy: 3.09, collateral: true },
  { symbol: "USDT", balance: 10000, usdValue: 10000, deposited: 0, apy: 2.26, collateral: false },
  { symbol: "WETH", balance: 20000, usdValue: 42567651.73, deposited: 0, apy: 1.90, collateral: true },
  { symbol: "wstETH", balance: 10000, usdValue: 26146144.51, deposited: 0, apy: 0.01, collateral: true },
  { symbol: "WBTC", balance: 10000, usdValue: 727238718.42, deposited: 0, apy: 0.01, collateral: false },
  { symbol: "rETH", balance: 10000, usdValue: 24662323.83, deposited: 0, apy: 0.01, collateral: true },
  { symbol: "ACRED", balance: 50000, usdValue: 51000, deposited: 0, apy: 1.45, collateral: false },
];

function formatAmount(value: number): string {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export default function DepositPage() {
  const [collateralState, setCollateralState] = React.useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    for (const asset of depositAssets) {
      initial[asset.symbol] = asset.collateral;
    }
    return initial;
  });

  const toggleCollateral = (symbol: string) => {
    setCollateralState((prev) => ({
      ...prev,
      [symbol]: !prev[symbol],
    }));
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <AppNav />

      <main className="mx-auto max-w-[1440px] px-6 lg:px-8 py-6">
        <PageTransition>
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl text-[var(--foreground)]">
              Deposit
            </h1>
          </div>

          {/* Table */}
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left text-[10px] font-medium tracking-widest uppercase text-[var(--foreground-muted)] pb-3 pr-4">
                    Assets
                  </th>
                  <th className="text-left text-[10px] font-medium tracking-widest uppercase text-[var(--foreground-muted)] pb-3 px-4">
                    In Wallet
                  </th>
                  <th className="text-left text-[10px] font-medium tracking-widest uppercase text-[var(--foreground-muted)] pb-3 px-4">
                    Deposit
                  </th>
                  <th className="text-left text-[10px] font-medium tracking-widest uppercase text-[var(--foreground-muted)] pb-3 px-4">
                    APY
                  </th>
                  <th className="text-left text-[10px] font-medium tracking-widest uppercase text-[var(--foreground-muted)] pb-3 px-4">
                    Collateral
                  </th>
                  <th className="text-right text-[10px] font-medium tracking-widest uppercase text-[var(--foreground-muted)] pb-3 pl-4">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {depositAssets.map((asset) => (
                  <tr
                    key={asset.symbol}
                    className="border-b border-[var(--border)] last:border-b-0 hover:bg-[var(--muted)]/50 transition-colors"
                  >
                    {/* Asset */}
                    <td className="py-5 pr-4">
                      <AssetBadge asset={asset.symbol} size="lg" />
                    </td>

                    {/* In Wallet */}
                    <td className="py-5 px-4">
                      <div className="flex flex-col">
                        <span className="font-[family-name:var(--font-mono)] text-sm text-[var(--foreground)]">
                          {formatAmount(asset.balance)}
                        </span>
                        <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--foreground-muted)] mt-0.5">
                          {formatCurrency(asset.usdValue, 2)}
                        </span>
                      </div>
                    </td>

                    {/* Deposit */}
                    <td className="py-5 px-4">
                      <span className="font-[family-name:var(--font-mono)] text-sm text-[var(--foreground)]">
                        {asset.deposited > 0 ? formatAmount(asset.deposited) : "\u2014"}
                      </span>
                    </td>

                    {/* APY */}
                    <td className="py-5 px-4">
                      <span className="font-[family-name:var(--font-mono)] text-sm text-[var(--foreground)]">
                        {asset.apy.toFixed(2)}%
                      </span>
                    </td>

                    {/* Collateral Toggle */}
                    <td className="py-5 px-4">
                      <button
                        type="button"
                        role="switch"
                        aria-checked={collateralState[asset.symbol]}
                        onClick={() => toggleCollateral(asset.symbol)}
                        className={`
                          relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full
                          transition-colors duration-200 ease-in-out focus:outline-none
                          ${collateralState[asset.symbol]
                            ? "bg-[var(--color-primary)]"
                            : "bg-[var(--border)]"
                          }
                        `}
                      >
                        <span
                          className={`
                            pointer-events-none inline-block h-4 w-4 transform rounded-full
                            bg-white shadow-sm ring-0 transition duration-200 ease-in-out
                            mt-0.5
                            ${collateralState[asset.symbol]
                              ? "translate-x-[18px]"
                              : "translate-x-0.5"
                            }
                          `}
                        />
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-5 pl-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          className="rounded-full text-xs font-medium px-5"
                        >
                          Deposit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="rounded-full text-xs font-medium px-3 text-[var(--foreground-muted)]"
                        >
                          Withdraw
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </PageTransition>
      </main>
    </div>
  );
}
