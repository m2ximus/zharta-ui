"use client";

import { use, useMemo } from "react";
import Link from "next/link";
import { type ColumnDef } from "@tanstack/react-table";
import { ArrowLeft, ExternalLink, Shield, Activity, Info } from "lucide-react";
import { AppNav } from "@/components/layout/app-nav";
import { PageTransition } from "@/components/shared/page-transition";
import { AssetBadge } from "@/components/shared/asset-badge";
import { StatusBadge } from "@/components/shared/status-badge";
import { DataTable } from "@/components/shared/data-table";
import { MiniAreaChart } from "@/components/shared/mini-area-chart";
import { LtvMeter } from "@/components/shared/ltv-meter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { markets } from "@/data/markets";
import { activeLoans } from "@/data/loans";
import { assets } from "@/data/assets";
import {
  cn,
  formatCurrency,
  formatCompactCurrency,
  formatPercent,
  formatAddress,
  formatDate,
} from "@/lib/utils";
import type { ActiveLoan } from "@/types";

// Generate 30 mock data points for supply/borrow charts
function generateChartData(
  baseValue: number,
  volatility: number = 0.05
): { date: string; value: number }[] {
  const data: { date: string; value: number }[] = [];
  let value = baseValue * 0.7;
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const change = 1 + (Math.random() - 0.4) * volatility;
    value = Math.max(value * change, baseValue * 0.3);
    data.push({
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      value: Math.round(value),
    });
  }
  // Ensure the last point is close to the actual value
  data[data.length - 1].value = baseValue;
  return data;
}

function ltvColorClass(ltv: number): string {
  if (ltv < 50) return "text-emerald-400";
  if (ltv <= 70) return "text-amber-400";
  return "text-red-400";
}

// Mock contract addresses
const MOCK_CONTRACTS: Record<string, string> = {
  WBTC: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
  WETH: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  cbBTC: "0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf",
  ACRED: "0x5B5d8C8a79b3B91E6a9b7A8F8D1D6aB2E3F4A5B6",
  wstETH: "0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0",
  rETH: "0xae78736Cd615f374D3085123A210448E74Fc6393",
  USDC: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  USDT: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  DAI: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
};

const loanColumns: ColumnDef<ActiveLoan, unknown>[] = [
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },
  {
    accessorKey: "principalAmount",
    header: "Principal",
    cell: ({ row }) => (
      <span className="font-[family-name:var(--font-mono)] text-sm">
        {formatCurrency(row.original.principalAmount)}
      </span>
    ),
  },
  {
    accessorKey: "outstandingDebt",
    header: "Out. Debt",
    cell: ({ row }) => (
      <span className="font-[family-name:var(--font-mono)] text-sm">
        {formatCurrency(row.original.outstandingDebt)}
      </span>
    ),
  },
  {
    accessorKey: "currentLtv",
    header: "Current LTV",
    cell: ({ row }) => (
      <span
        className={cn(
          "font-[family-name:var(--font-mono)] text-sm font-medium",
          ltvColorClass(row.original.currentLtv)
        )}
      >
        {row.original.currentLtv.toFixed(1)}%
      </span>
    ),
  },
  {
    accessorKey: "apr",
    header: "APR",
    cell: ({ row }) => (
      <span className="font-[family-name:var(--font-mono)] text-sm text-[var(--color-primary)]">
        {row.original.apr.toFixed(2)}%
      </span>
    ),
  },
  {
    accessorKey: "maturityDate",
    header: "Maturity",
    cell: ({ row }) => (
      <span className="text-sm">{formatDate(row.original.maturityDate)}</span>
    ),
  },
  {
    accessorKey: "lender",
    header: "Lender",
    cell: ({ row }) => (
      <span className="font-[family-name:var(--font-mono)] text-sm text-[var(--foreground-muted)]">
        {formatAddress(row.original.lender)}
      </span>
    ),
  },
  {
    accessorKey: "borrower",
    header: "Borrower",
    cell: ({ row }) => (
      <span className="font-[family-name:var(--font-mono)] text-sm text-[var(--foreground-muted)]">
        {formatAddress(row.original.borrower)}
      </span>
    ),
  },
  {
    id: "actions",
    header: "",
    enableSorting: false,
    cell: ({ row }) => (
      <Link href={`/loans/${row.original.id}`}>
        <Button variant="ghost" size="sm" className="text-xs">
          View
        </Button>
      </Link>
    ),
  },
];

export default function MarketDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const market = markets.find((m) => m.id === id) ?? markets[0];

  const collateralAsset = assets[market.collateralAsset];
  const principalAsset = assets[market.principalAsset];

  const totalSupplied = market.availableLiquidity + market.totalDebt;

  // Filter active loans for this market
  const marketLoans = useMemo(
    () =>
      activeLoans.filter(
        (loan) =>
          loan.collateralAsset === market.collateralAsset &&
          loan.principalAsset === market.principalAsset
      ),
    [market.collateralAsset, market.principalAsset]
  );

  // Generate chart data
  const supplyChartData = useMemo(
    () => generateChartData(totalSupplied),
    [totalSupplied]
  );
  const borrowChartData = useMemo(
    () => generateChartData(market.totalDebt, 0.06),
    [market.totalDebt]
  );

  // Compute derived stats
  const avgApr =
    marketLoans.length > 0
      ? marketLoans.reduce((sum, l) => sum + l.apr, 0) / marketLoans.length
      : 0;
  const maxLtv =
    marketLoans.length > 0
      ? Math.max(...marketLoans.map((l) => l.liquidationLtv))
      : 80;
  const avgLiquidationLtv =
    marketLoans.length > 0
      ? marketLoans.reduce((sum, l) => sum + l.liquidationLtv, 0) /
        marketLoans.length
      : 80;
  const originFeeRange =
    marketLoans.length > 0
      ? `${Math.min(...marketLoans.map((l) => l.originFee)).toFixed(2)}% - ${Math.max(...marketLoans.map((l) => l.originFee)).toFixed(2)}%`
      : "N/A";

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <AppNav />

      <main className="mx-auto max-w-[1440px] px-6 lg:px-8 py-6">
        <PageTransition>
          {/* Back link */}
          <Link
            href="/lend"
            className="inline-flex items-center gap-1.5 text-sm text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Markets
          </Link>

          {/* Asset header */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
            <AssetBadge asset={market.collateralAsset} size="lg" />
            <div>
              <div className="flex items-center gap-3">
                <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-[var(--foreground)]">
                  {collateralAsset?.name || market.collateralAsset}
                </h1>
                <Badge variant="outline" className="text-xs font-[family-name:var(--font-mono)]">
                  {market.collateralAsset}
                </Badge>
              </div>
              <p className="text-sm text-[var(--foreground-muted)] mt-1">
                Paired with{" "}
                <span className="font-medium text-[var(--foreground)]">
                  {market.principalAsset}
                </span>
                {" "}-- Oracle: {market.oracle}
              </p>
            </div>
          </div>

          {/* Top stats row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-5">
                <p className="text-xs font-medium uppercase tracking-wider text-[var(--foreground-muted)] mb-2">
                  Total Supplied
                </p>
                <p className="font-[family-name:var(--font-mono)] text-2xl font-bold text-[var(--foreground)]">
                  {formatCompactCurrency(totalSupplied)}
                </p>
                <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--foreground-muted)] mt-0.5">
                  {formatCurrency(totalSupplied)}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5">
                <p className="text-xs font-medium uppercase tracking-wider text-[var(--foreground-muted)] mb-2">
                  Total Borrowed
                </p>
                <p className="font-[family-name:var(--font-mono)] text-2xl font-bold text-[var(--foreground)]">
                  {formatCompactCurrency(market.totalDebt)}
                </p>
                <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--foreground-muted)] mt-0.5">
                  {formatCurrency(market.totalDebt)}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5">
                <p className="text-xs font-medium uppercase tracking-wider text-[var(--foreground-muted)] mb-2">
                  Available Liquidity
                </p>
                <p className="font-[family-name:var(--font-mono)] text-2xl font-bold text-[var(--color-primary)]">
                  {formatCompactCurrency(market.availableLiquidity)}
                </p>
                <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--foreground-muted)] mt-0.5">
                  {formatCurrency(market.availableLiquidity)}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5">
                <p className="text-xs font-medium uppercase tracking-wider text-[var(--foreground-muted)] mb-2">
                  Average LTV
                </p>
                <p className="font-[family-name:var(--font-mono)] text-2xl font-bold text-[var(--foreground)]">
                  {formatPercent(market.avgLtv)}
                </p>
                <p className="text-xs text-[var(--foreground-muted)] mt-0.5">
                  {market.activeLoans} active loans
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Two column layout */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left column */}
            <div className="flex-1 min-w-0 space-y-6">
              {/* Supply & Borrow chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-[family-name:var(--font-display)] text-lg flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[var(--color-primary)]" />
                    Supply & Borrow History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-[var(--foreground-muted)] mb-3">
                        Total Supplied
                      </p>
                      <MiniAreaChart
                        data={supplyChartData}
                        height={180}
                        color="#00D4AA"
                        showGrid
                      />
                    </div>
                    <Separator />
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-[var(--foreground-muted)] mb-3">
                        Total Borrowed
                      </p>
                      <MiniAreaChart
                        data={borrowChartData}
                        height={180}
                        color="#627EEA"
                        showGrid
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Market Parameters */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-[family-name:var(--font-display)] text-lg flex items-center gap-2">
                    <Info className="w-4 h-4 text-[var(--foreground-muted)]" />
                    Market Parameters
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-y-5 gap-x-6">
                    <div>
                      <p className="text-xs text-[var(--foreground-muted)] mb-1">
                        Oracle
                      </p>
                      <p className="text-sm font-medium text-[var(--foreground)]">
                        {market.oracle}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[var(--foreground-muted)] mb-1">
                        Max LTV
                      </p>
                      <p className="font-[family-name:var(--font-mono)] text-sm font-medium text-[var(--foreground)]">
                        {maxLtv}%
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[var(--foreground-muted)] mb-1">
                        Liquidation LTV
                      </p>
                      <p className="font-[family-name:var(--font-mono)] text-sm font-medium text-[var(--foreground)]">
                        {avgLiquidationLtv.toFixed(1)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[var(--foreground-muted)] mb-1">
                        Min Collateral
                      </p>
                      <p className="font-[family-name:var(--font-mono)] text-sm font-medium text-[var(--foreground)]">
                        0.01 {market.collateralAsset}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[var(--foreground-muted)] mb-1">
                        Origin Fee Range
                      </p>
                      <p className="font-[family-name:var(--font-mono)] text-sm font-medium text-[var(--foreground)]">
                        {originFeeRange}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[var(--foreground-muted)] mb-1">
                        Avg APR
                      </p>
                      <p className="font-[family-name:var(--font-mono)] text-sm font-medium text-[var(--color-primary)]">
                        {avgApr.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Active Loans for this market */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-[family-name:var(--font-display)] text-lg">
                      Active Loans
                    </CardTitle>
                    <Badge variant="secondary" className="font-[family-name:var(--font-mono)]">
                      {marketLoans.length}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {marketLoans.length > 0 ? (
                    <DataTable
                      columns={loanColumns}
                      data={marketLoans}
                      pageSize={5}
                    />
                  ) : (
                    <div className="text-center py-12 text-[var(--foreground-muted)]">
                      <p className="text-sm">No active loans in this market</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right column (sidebar) */}
            <div className="w-full lg:w-[380px] flex-shrink-0 space-y-6 lg:sticky lg:top-20 lg:self-start">
              {/* Your Position */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-[family-name:var(--font-display)] text-lg">
                    Your Position
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-6">
                    <div className="w-12 h-12 rounded-full bg-[var(--muted)] flex items-center justify-center mx-auto mb-3">
                      <Shield className="w-5 h-5 text-[var(--foreground-muted)]" />
                    </div>
                    <p className="text-sm text-[var(--foreground-muted)] mb-4">
                      No active position
                    </p>
                    <div className="flex gap-3">
                      <Button className="flex-1 rounded-full">Supply</Button>
                      <Button variant="outline" className="flex-1 rounded-full">
                        Borrow
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Market Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-[family-name:var(--font-display)] text-lg">
                    Market Info
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-xs text-[var(--foreground-muted)] mb-1">
                      Oracle
                    </p>
                    <p className="text-sm font-medium text-[var(--foreground)]">
                      {market.oracle}
                    </p>
                  </div>

                  <Separator />

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-[var(--foreground-muted)] mb-3">
                      Collateral Asset
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-[var(--foreground-muted)]">
                          Asset
                        </span>
                        <div className="flex items-center gap-1.5">
                          <AssetBadge
                            asset={market.collateralAsset}
                            size="sm"
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-[var(--foreground-muted)]">
                          Decimals
                        </span>
                        <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--foreground)]">
                          {collateralAsset?.decimals ?? 18}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-[var(--foreground-muted)]">
                          Contract
                        </span>
                        <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--foreground-muted)] flex items-center gap-1">
                          {formatAddress(
                            MOCK_CONTRACTS[market.collateralAsset] ??
                              "0x0000000000000000000000000000000000000000"
                          )}
                          <ExternalLink className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-[var(--foreground-muted)] mb-3">
                      Principal Asset
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-[var(--foreground-muted)]">
                          Asset
                        </span>
                        <div className="flex items-center gap-1.5">
                          <AssetBadge
                            asset={market.principalAsset}
                            size="sm"
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-[var(--foreground-muted)]">
                          Decimals
                        </span>
                        <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--foreground)]">
                          {principalAsset?.decimals ?? 6}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-[var(--foreground-muted)]">
                          Contract
                        </span>
                        <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--foreground-muted)] flex items-center gap-1">
                          {formatAddress(
                            MOCK_CONTRACTS[market.principalAsset] ??
                              "0x0000000000000000000000000000000000000000"
                          )}
                          <ExternalLink className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Risk Parameters */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-[family-name:var(--font-display)] text-lg flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[var(--foreground-muted)]" />
                    Risk Parameters
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div>
                    <p className="text-xs text-[var(--foreground-muted)] mb-3">
                      Max LTV Visualization
                    </p>
                    <LtvMeter
                      currentLtv={market.avgLtv}
                      maxLtv={maxLtv}
                      liquidationLtv={avgLiquidationLtv}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[var(--foreground-muted)]">
                        Liquidation Penalty
                      </span>
                      <span className="font-[family-name:var(--font-mono)] text-sm font-medium text-[var(--foreground)]">
                        5.00%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[var(--foreground-muted)]">
                        Reserve Factor
                      </span>
                      <span className="font-[family-name:var(--font-mono)] text-sm font-medium text-[var(--foreground)]">
                        10.00%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[var(--foreground-muted)]">
                        Max LTV
                      </span>
                      <span className="font-[family-name:var(--font-mono)] text-sm font-medium text-[var(--foreground)]">
                        {maxLtv}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[var(--foreground-muted)]">
                        Liquidation LTV
                      </span>
                      <span className="font-[family-name:var(--font-mono)] text-sm font-medium text-red-400">
                        {avgLiquidationLtv.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </PageTransition>
      </main>
    </div>
  );
}
