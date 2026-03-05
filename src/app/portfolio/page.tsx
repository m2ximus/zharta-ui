"use client";

import * as React from "react";
import { AppNav } from "@/components/layout/app-nav";
import { PageTransition } from "@/components/shared/page-transition";
import { PortfolioToggle } from "@/components/portfolio/portfolio-toggle";
import { StatCardsGrid } from "@/components/portfolio/stat-cards-grid";
import { HistoricalChart } from "@/components/portfolio/historical-chart";
import { PortfolioLoanTable } from "@/components/portfolio/portfolio-loan-table";
import { AlertsSidebar } from "@/components/portfolio/alerts-sidebar";
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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h1 className="text-3xl font-[family-name:var(--font-display)] font-bold text-[var(--foreground)]">
              Portfolio
            </h1>
            <PortfolioToggle active={mode} onToggle={setMode} />
          </div>

          {/* Stat cards */}
          <div className="mb-6">
            <StatCardsGrid mode={mode} />
          </div>

          {/* Main content: chart + table on left, alerts sidebar on right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left column */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              <HistoricalChart data={chartData} />
              <PortfolioLoanTable />
            </div>

            {/* Right column: alerts sidebar */}
            <div className="lg:col-span-4">
              <AlertsSidebar />
            </div>
          </div>
        </PageTransition>
      </main>
    </div>
  );
}
