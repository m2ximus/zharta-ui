"use client";

import { StatCard } from "@/components/shared/stat-card";
import { formatCompactCurrency, formatPercent } from "@/lib/utils";
import { lendingStats, borrowingStats } from "@/data/portfolio";

interface StatCardsGridProps {
  mode: "lending" | "borrowing";
}

export function StatCardsGrid({ mode }: StatCardsGridProps) {
  const stats = mode === "lending" ? lendingStats : borrowingStats;

  const cards =
    mode === "lending"
      ? [
          { title: "Total deployed", value: formatCompactCurrency(stats.totalDeployed) },
          { title: "Active loans", value: String(stats.activeLoans) },
          { title: "Avg. APR", value: formatPercent(stats.avgApr) },
          { title: "Accrued interest", value: formatCompactCurrency(stats.accruedInterest) },
        ]
      : [
          { title: "Outstanding debt", value: formatCompactCurrency(stats.totalDeployed) },
          { title: "Active loans", value: String(stats.activeLoans) },
          { title: "Avg. APR", value: formatPercent(stats.avgApr) },
          { title: "Total costs", value: formatCompactCurrency(stats.accruedInterest) },
        ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <StatCard key={card.title} title={card.title} value={card.value} />
      ))}
    </div>
  );
}
