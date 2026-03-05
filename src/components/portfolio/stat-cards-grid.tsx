"use client";

import { DollarSign, FileText, TrendingUp, Percent } from "lucide-react";
import { StatCard } from "@/components/shared/stat-card";
import { StaggerChildren, StaggerItem } from "@/components/shared/stagger-children";
import { formatCompactCurrency, formatPercent } from "@/lib/utils";
import { lendingStats, borrowingStats } from "@/data/portfolio";

interface StatCardsGridProps {
  mode: "lending" | "borrowing";
}

const lendingSparklines = {
  deployed: [320, 345, 360, 375, 390, 398, 405, 412, 418, 420],
  loans: [3, 3, 4, 4, 4, 5, 5, 5, 5, 5],
  apr: [7.1, 7.0, 6.9, 6.95, 6.88, 6.85, 6.82, 6.80, 6.83, 6.82],
  interest: [2.1, 3.8, 5.2, 6.5, 7.8, 8.9, 10.1, 11.0, 11.8, 12.4],
};

const borrowingSparklines = {
  deployed: [140, 148, 155, 160, 168, 172, 178, 182, 186, 185],
  loans: [2, 2, 2, 3, 3, 3, 3, 3, 3, 3],
  apr: [7.2, 7.3, 7.35, 7.4, 7.45, 7.48, 7.5, 7.5, 7.5, 7.5],
  interest: [1.0, 1.6, 2.2, 2.8, 3.3, 3.8, 4.2, 4.6, 4.9, 5.2],
};

export function StatCardsGrid({ mode }: StatCardsGridProps) {
  const stats = mode === "lending" ? lendingStats : borrowingStats;
  const sparklines = mode === "lending" ? lendingSparklines : borrowingSparklines;

  const cards =
    mode === "lending"
      ? [
          {
            title: "Total Deployed",
            value: formatCompactCurrency(stats.totalDeployed),
            icon: <DollarSign className="w-4 h-4" />,
            sparklineData: sparklines.deployed,
          },
          {
            title: "Active Loans",
            value: String(stats.activeLoans),
            icon: <FileText className="w-4 h-4" />,
            sparklineData: sparklines.loans,
          },
          {
            title: "Avg APR",
            value: formatPercent(stats.avgApr),
            icon: <TrendingUp className="w-4 h-4" />,
            sparklineData: sparklines.apr,
          },
          {
            title: "Accrued Interest",
            value: formatCompactCurrency(stats.accruedInterest),
            icon: <Percent className="w-4 h-4" />,
            sparklineData: sparklines.interest,
          },
        ]
      : [
          {
            title: "Outstanding Debt",
            value: formatCompactCurrency(stats.totalDeployed),
            icon: <DollarSign className="w-4 h-4" />,
            sparklineData: sparklines.deployed,
          },
          {
            title: "Active Loans",
            value: String(stats.activeLoans),
            icon: <FileText className="w-4 h-4" />,
            sparklineData: sparklines.loans,
          },
          {
            title: "Avg APR",
            value: formatPercent(stats.avgApr),
            icon: <TrendingUp className="w-4 h-4" />,
            sparklineData: sparklines.apr,
          },
          {
            title: "Total Costs",
            value: formatCompactCurrency(stats.accruedInterest),
            icon: <Percent className="w-4 h-4" />,
            sparklineData: sparklines.interest,
          },
        ];

  return (
    <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <StaggerItem key={card.title}>
          <StatCard
            title={card.title}
            value={card.value}
            icon={card.icon}
            sparklineData={card.sparklineData}
          />
        </StaggerItem>
      ))}
    </StaggerChildren>
  );
}
