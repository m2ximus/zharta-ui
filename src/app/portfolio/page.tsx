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

      <main className="mx-auto max-w-[1440px] px-6 lg:px-8 py-6">
        <PageTransition>
          {/* Page header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl text-[var(--foreground)]">
              {mode === "lending" ? "Lending Portfolio" : "Borrowing Portfolio"}
            </h1>
            <PortfolioToggle active={mode} onToggle={setMode} />
          </div>

          {/* Stat cards + Health factor */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
            <div className="lg:col-span-8">
              <StatCardsGrid mode={mode} />
            </div>
            <div className="lg:col-span-4">
              <HealthFactorGauge value={mode === "lending" ? 3.2 : 2.1} />
            </div>
          </div>

          {/* Chart */}
          <div className="mb-8">
            <HistoricalChart data={chartData} />
          </div>

          {/* Loan table - full width */}
          <PortfolioLoanTable />
        </PageTransition>
      </main>
    </div>
  );
}
