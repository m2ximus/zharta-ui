"use client";

import { AppNav } from "@/components/layout/app-nav";
import { PageTransition } from "@/components/shared/page-transition";
import { SandboxToggle } from "@/components/shared/sandbox-toggle";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LoanRequestsTable } from "@/components/lend/loan-requests-table";
import { ActiveLoansTable } from "@/components/lend/active-loans-table";
import { MarketsTable } from "@/components/lend/markets-table";
import {
  FilterModal,
  DEFAULT_FILTERS,
  type FilterState,
} from "@/components/lend/filter-modal";
import { Plus, TrendingUp, Landmark, Banknote } from "lucide-react";
import { markets } from "@/data/markets";
import { activeLoans } from "@/data/loans";
import { formatCompactCurrency } from "@/lib/utils";
import * as React from "react";

export default function LendPage() {
  const [sandboxEnabled, setSandboxEnabled] = React.useState(false);
  const [filters, setFilters] = React.useState<FilterState>(DEFAULT_FILTERS);

  // Compute aggregate stats
  const totalMarketSize = markets.reduce(
    (sum, m) => sum + m.availableLiquidity + m.totalDebt,
    0
  );
  const totalLiquidity = markets.reduce(
    (sum, m) => sum + m.availableLiquidity,
    0
  );
  const totalBorrowed = markets.reduce((sum, m) => sum + m.totalDebt, 0);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <AppNav />

      <main className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-6">
        <PageTransition>
          {/* Header */}
          <div className="flex items-center justify-between gap-3 mb-8">
            <div className="flex items-center gap-4">
              <h1 className="font-[family-name:var(--font-display)] text-2xl sm:text-4xl md:text-5xl text-[var(--foreground)]">
                Markets
              </h1>
              <SandboxToggle
                enabled={sandboxEnabled}
                onToggle={setSandboxEnabled}
              />
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <FilterModal filters={filters} onFiltersChange={setFilters} />
              <Button className="rounded-full gap-2 text-sm">
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Open Offer</span>
                <span className="sm:hidden">Add</span>
              </Button>
            </div>
          </div>

          {/* Stat cards row — Spark style */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-10">
            {/* Total Market Size — dark accent card */}
            <div className="relative overflow-hidden rounded-2xl bg-[var(--color-dark-bg)] border border-[var(--color-dark-border)] p-4 sm:p-6 md:p-8">
              {/* Decorative circles */}
              <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-40 h-40 rounded-full border border-[var(--color-primary)]/20 opacity-30 hidden sm:block" />
              <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-28 h-28 rounded-full border border-[var(--color-primary)]/15 opacity-20 hidden sm:block" />
              <div className="relative z-10">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                  <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--color-primary)]" />
                  <span className="text-[10px] sm:text-xs font-medium tracking-wide uppercase text-[var(--color-dark-text-muted)]">
                    <span className="hidden sm:inline">Total Market Size</span>
                    <span className="sm:hidden">Market Size</span>
                  </span>
                </div>
                <span className="font-[family-name:var(--font-mono)] text-lg sm:text-3xl md:text-4xl font-bold text-[var(--color-dark-text)]">
                  {formatCompactCurrency(totalMarketSize)}
                </span>
              </div>
            </div>

            {/* Total Value Locked */}
            <div className="rounded-2xl bg-[var(--card)] border border-[var(--border)] p-4 sm:p-6 md:p-8 flex flex-col justify-center items-center text-center">
              <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                <Landmark className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--foreground-muted)]" />
                <span className="text-[10px] sm:text-xs font-medium tracking-wide uppercase text-[var(--foreground-muted)]">
                  TVL
                </span>
              </div>
              <span className="font-[family-name:var(--font-mono)] text-lg sm:text-3xl md:text-4xl font-bold text-[var(--foreground)]">
                {formatCompactCurrency(totalLiquidity)}
              </span>
            </div>

            {/* Total Borrows */}
            <div className="rounded-2xl bg-[var(--card)] border border-[var(--border)] p-4 sm:p-6 md:p-8 flex flex-col justify-center items-center text-center">
              <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                <Banknote className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--foreground-muted)]" />
                <span className="text-[10px] sm:text-xs font-medium tracking-wide uppercase text-[var(--foreground-muted)]">
                  <span className="hidden sm:inline">Total Borrows</span>
                  <span className="sm:hidden">Borrows</span>
                </span>
              </div>
              <span className="font-[family-name:var(--font-mono)] text-lg sm:text-3xl md:text-4xl font-bold text-[var(--foreground)]">
                {formatCompactCurrency(totalBorrowed)}
              </span>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="markets">
            <TabsList>
              <TabsTrigger value="markets">Markets</TabsTrigger>
              <TabsTrigger value="loan-requests">Loan Requests</TabsTrigger>
              <TabsTrigger value="active-loans">
                Active Loans
                <span className="ml-1.5 text-[10px] bg-[var(--color-primary-muted)] text-[var(--color-primary)] rounded-full px-1.5 py-0.5 font-[family-name:var(--font-mono)]">
                  {activeLoans.length}
                </span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="markets" className="mt-6">
              <MarketsTable />
            </TabsContent>

            <TabsContent value="loan-requests" className="mt-6">
              <LoanRequestsTable filters={filters} />
            </TabsContent>

            <TabsContent value="active-loans" className="mt-6">
              <ActiveLoansTable filters={filters} />
            </TabsContent>
          </Tabs>
        </PageTransition>
      </main>
    </div>
  );
}
