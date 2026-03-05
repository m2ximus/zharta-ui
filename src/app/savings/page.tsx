"use client";

import * as React from "react";
import { AppNav } from "@/components/layout/app-nav";
import { PageTransition } from "@/components/shared/page-transition";
import { AssetBadge } from "@/components/shared/asset-badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { MoreHorizontal } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

/* -------------------------------------------------------------------------- */
/*  Mock data                                                                  */
/* -------------------------------------------------------------------------- */

const savingsAssets = [
  { symbol: "USDC", apy: 4.0 },
  { symbol: "USDT", apy: 3.54 },
  { symbol: "DAI", apy: 4.0 },
  { symbol: "WETH", apy: 1.9 },
  { symbol: "wstETH", apy: 0.85 },
] as const;

const savingsRateData = [
  { date: "Dec", rate: 4.2 },
  { date: "Jan", rate: 4.15 },
  { date: "Feb", rate: 3.95 },
  { date: "Mar", rate: 3.98 },
];

const supportedAssets = [{ symbol: "USDC", balance: 10000 }];

type ChartTab = "savings-rate" | "collateral" | "liquidity";
type TimeRange = "1M" | "3M" | "1Y" | "All";

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function SavingsPage() {
  const [selectedAsset, setSelectedAsset] = React.useState<string>(
    savingsAssets[0].symbol
  );
  const [chartTab, setChartTab] = React.useState<ChartTab>("savings-rate");
  const [timeRange, setTimeRange] = React.useState<TimeRange>("3M");

  const current = savingsAssets.find((a) => a.symbol === selectedAsset)!;

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <AppNav />

      <main className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-6">
        <PageTransition>
          {/* ---------------------------------------------------------------- */}
          {/*  Page title                                                       */}
          {/* ---------------------------------------------------------------- */}
          <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl md:text-5xl text-[var(--foreground)] mb-8">
            Savings
          </h1>

          {/* ---------------------------------------------------------------- */}
          {/*  Top stat bar                                                     */}
          {/* ---------------------------------------------------------------- */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <StatPill label="TVL" value="$42.5M" />
            <StatPill label="Users" value="1,240" />
            <StatPill label="Deposit cap" value="500M USDC" />
            <StatPill label="Liquidity" value="125M USDC" />
          </div>

          {/* ---------------------------------------------------------------- */}
          {/*  Two-column layout                                                */}
          {/* ---------------------------------------------------------------- */}
          <div className="flex flex-col lg:flex-row gap-6 mb-10">
            {/* Left sidebar ------------------------------------------------ */}
            <aside className="w-full lg:w-[280px] flex-shrink-0">
              <span className="text-[10px] font-medium tracking-widest uppercase text-[var(--foreground-muted)] mb-3 block">
                Savings accounts
              </span>
              <div className="flex flex-col gap-2">
                {savingsAssets.map((asset) => (
                  <button
                    key={asset.symbol}
                    onClick={() => setSelectedAsset(asset.symbol)}
                    className={cn(
                      "flex items-center justify-between w-full px-4 py-3.5 rounded-[var(--radius-card)] border transition-all cursor-pointer",
                      "bg-[var(--card)] hover:bg-[var(--muted)]",
                      selectedAsset === asset.symbol
                        ? "border-[var(--color-primary)]"
                        : "border-[var(--border)]"
                    )}
                  >
                    <AssetBadge asset={asset.symbol} size="md" showName />
                    <span className="font-[family-name:var(--font-mono)] text-sm font-medium text-[var(--color-primary)]">
                      {asset.apy.toFixed(2)}%
                    </span>
                  </button>
                ))}
              </div>
            </aside>

            {/* Right main area --------------------------------------------- */}
            <div className="flex-1 min-w-0 flex flex-col gap-6">
              {/* Hero card */}
              <div
                className="relative overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)] p-8 md:p-10"
                style={{
                  background:
                    "linear-gradient(135deg, var(--color-dark-bg) 0%, var(--color-dark-bg-secondary) 50%, var(--color-dark-bg-tertiary) 100%)",
                }}
              >
                {/* Decorative glow */}
                <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[var(--color-primary)] opacity-[0.04] blur-3xl pointer-events-none" />
                <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-[var(--color-primary)] opacity-[0.03] blur-3xl pointer-events-none" />

                <div className="relative z-10">
                  <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl text-white mb-3">
                    Deposit your {current.symbol} and earn{" "}
                    <span className="text-[var(--color-primary)]">
                      {current.apy.toFixed(2)}%
                    </span>{" "}
                    APY!
                  </h2>
                  <p className="text-sm text-white/50 max-w-lg mb-6 leading-relaxed">
                    Earn yield on your idle {current.symbol} by depositing into
                    the Zharta savings vault. Withdraw anytime with no lock-up
                    period. Interest is accrued continuously and compounded
                    automatically.
                  </p>
                  <Button className="rounded-full px-8 h-11 text-sm font-semibold">
                    Deposit {current.symbol}
                  </Button>
                </div>
              </div>

              {/* Chart section */}
              <Card className="p-6">
                {/* Tab bar + time range */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                  {/* Chart tabs */}
                  <div className="inline-flex h-9 items-center rounded-[var(--radius-pill)] bg-[var(--muted)] p-1">
                    {(
                      [
                        { key: "savings-rate", label: "Savings Rate" },
                        { key: "collateral", label: "Collateral Composition" },
                        { key: "liquidity", label: "Liquidity" },
                      ] as const
                    ).map((tab) => (
                      <button
                        key={tab.key}
                        onClick={() => setChartTab(tab.key)}
                        className={cn(
                          "px-3.5 py-1 text-xs font-medium rounded-[var(--radius-pill)] transition-colors cursor-pointer whitespace-nowrap",
                          chartTab === tab.key
                            ? "bg-[var(--color-primary)] text-black"
                            : "text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
                        )}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Time range pills */}
                  <div className="inline-flex h-8 items-center rounded-[var(--radius-pill)] bg-[var(--muted)] p-1">
                    {(["1M", "3M", "1Y", "All"] as const).map((range) => (
                      <button
                        key={range}
                        onClick={() => setTimeRange(range)}
                        className={cn(
                          "px-3 py-0.5 text-[11px] font-medium rounded-[var(--radius-pill)] transition-colors cursor-pointer",
                          timeRange === range
                            ? "bg-[var(--card)] text-[var(--foreground)] shadow-sm"
                            : "text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
                        )}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Chart */}
                <div className="h-[280px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={savingsRateData}
                      margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id="savingsGrad"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="var(--color-primary)"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="var(--color-primary)"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="var(--border)"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="date"
                        tick={{
                          fontSize: 11,
                          fill: "var(--foreground-muted)",
                          fontFamily: "var(--font-mono)",
                        }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        domain={[3.5, 4.5]}
                        tick={{
                          fontSize: 11,
                          fill: "var(--foreground-muted)",
                          fontFamily: "var(--font-mono)",
                        }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(v: number) => `${v}%`}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "var(--card)",
                          border: "1px solid var(--border)",
                          borderRadius: "var(--radius-card)",
                          fontSize: 12,
                          fontFamily: "var(--font-mono)",
                        }}
                        labelStyle={{ color: "var(--foreground)" }}
                        itemStyle={{ color: "var(--color-primary)" }}
                        formatter={(value) => [
                          `${Number(value).toFixed(2)}%`,
                          "APY",
                        ]}
                      />
                      <Area
                        type="monotone"
                        dataKey="rate"
                        stroke="var(--color-primary)"
                        strokeWidth={2}
                        fill="url(#savingsGrad)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/*  Supported assets table                                           */}
          {/* ---------------------------------------------------------------- */}
          <div>
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">
              Supported assets
            </h2>
            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-[500px]">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left text-[10px] font-medium tracking-widest uppercase text-[var(--foreground-muted)] pb-3 pr-4">
                      Asset
                    </th>
                    <th className="text-left text-[10px] font-medium tracking-widest uppercase text-[var(--foreground-muted)] pb-3 px-4">
                      Balance
                    </th>
                    <th className="text-right text-[10px] font-medium tracking-widest uppercase text-[var(--foreground-muted)] pb-3 pl-4">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {supportedAssets.map((asset) => (
                    <tr
                      key={asset.symbol}
                      className="border-b border-[var(--border)] last:border-b-0 hover:bg-[var(--muted)]/50 transition-colors"
                    >
                      <td className="py-5 pr-4">
                        <AssetBadge asset={asset.symbol} size="lg" showName />
                      </td>
                      <td className="py-5 px-4">
                        <span className="font-[family-name:var(--font-mono)] text-sm text-[var(--foreground)]">
                          {asset.balance.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      </td>
                      <td className="py-5 pl-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            size="sm"
                            className="rounded-full text-xs font-medium px-5"
                          >
                            Deposit
                          </Button>
                          <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--muted)] transition-colors cursor-pointer">
                            <MoreHorizontal className="w-4 h-4 text-[var(--foreground-muted)]" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </PageTransition>
      </main>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Stat pill component (inline)                                               */
/* -------------------------------------------------------------------------- */

function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius-card)] px-5 py-4 flex flex-col items-center justify-center text-center">
      <span className="font-[family-name:var(--font-mono)] text-lg md:text-xl font-bold text-[var(--foreground)]">
        {value}
      </span>
      <span className="text-[10px] font-medium tracking-widest uppercase text-[var(--foreground-muted)] mt-1">
        {label}
      </span>
    </div>
  );
}
