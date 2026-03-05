"use client";

import * as React from "react";
import { AppNav } from "@/components/layout/app-nav";
import { PageTransition } from "@/components/shared/page-transition";
import { PortfolioToggle } from "@/components/portfolio/portfolio-toggle";
import { StatCardsGrid } from "@/components/portfolio/stat-cards-grid";
import { HealthFactorGauge } from "@/components/portfolio/health-factor-gauge";
import { HistoricalChart } from "@/components/portfolio/historical-chart";
import { PortfolioLoanTable } from "@/components/portfolio/portfolio-loan-table";
import {
  historicalData,
  borrowingHistoricalData,
} from "@/data/portfolio";

export default function PortfolioPage() {
  const [mode, setMode] = React.useState<"lending" | "borrowing">("lending");

  const chartData =
    mode === "lending" ? historicalData : borrowingHistoricalData;

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <AppNav />

      <main className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-6">
        <PageTransition>
          {/* Page header */}
          <div className="flex items-center justify-between gap-4 mb-8">
            <h1 className="font-[family-name:var(--font-display)] text-2xl sm:text-4xl md:text-5xl text-[var(--foreground)]">
              {mode === "lending" ? "Lending Portfolio" : "Borrowing Portfolio"}
            </h1>
            <PortfolioToggle active={mode} onToggle={setMode} />
          </div>

          {/* Stat cards */}
          <div className="mb-6">
            <StatCardsGrid mode={mode} />
          </div>

          {/* Chart + Health factor side-by-side on desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <HistoricalChart data={chartData} />
            </div>
            <div className="lg:col-span-1">
              <HealthFactorGauge value={mode === "lending" ? 3.2 : 2.1} />
            </div>
          </div>

          {/* Loan table - full width */}
          <PortfolioLoanTable />
        </PageTransition>
      </main>
    </div>
  );
}
