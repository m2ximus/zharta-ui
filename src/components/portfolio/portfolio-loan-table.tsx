"use client";

import Link from "next/link";
import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/shared/data-table";
import { AssetBadge } from "@/components/shared/asset-badge";
import { formatCompactCurrency, formatPercent, cn } from "@/lib/utils";
import { portfolioLoans } from "@/data/portfolio";
import type { PortfolioLoan } from "@/types";

function getLtvStatus(ltv: number): { label: string; className: string } {
  if (ltv > 75)
    return {
      label: "AT RISK",
      className:
        "text-amber-400 bg-amber-500/10 border border-amber-500/20",
    };
  return {
    label: "ACTIVE",
    className:
      "text-[var(--color-primary)] bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20",
  };
}

function formatShortDate(dateStr: string): string {
  const d = new Date(dateStr);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yy = String(d.getFullYear()).slice(2);
  return `${dd}/${mm}/${yy}`;
}

const columns: ColumnDef<PortfolioLoan, unknown>[] = [
  {
    accessorKey: "collateralAsset",
    header: "Collateral",
    cell: ({ row }) => (
      <div className="flex items-center gap-2.5">
        <AssetBadge asset={row.original.collateralAsset} size="sm" />
        <span className="font-medium text-[var(--foreground)]">
          {row.original.collateralAsset}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "principalAmount",
    header: "Principal",
    cell: ({ row }) => (
      <span className="font-[family-name:var(--font-mono)] text-[var(--foreground)]">
        {formatCompactCurrency(row.original.principalAmount)}{" "}
        <span className="text-[var(--foreground-muted)]">
          {row.original.principalAsset}
        </span>
      </span>
    ),
  },
  {
    accessorKey: "apr",
    header: "APR",
    cell: ({ row }) => (
      <span className="font-[family-name:var(--font-mono)] text-[var(--foreground)]">
        {formatPercent(row.original.apr)}
      </span>
    ),
  },
  {
    accessorKey: "currentLtv",
    header: "LTV",
    cell: ({ row }) => (
      <span className="font-[family-name:var(--font-mono)] text-[var(--foreground)]">
        {row.original.currentLtv.toFixed(1)}%
      </span>
    ),
  },
  {
    accessorKey: "maturityDate",
    header: "Maturity",
    cell: ({ row }) => (
      <span className="font-[family-name:var(--font-mono)] text-[var(--foreground)]">
        {formatShortDate(row.original.maturityDate)}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = getLtvStatus(row.original.currentLtv);
      return (
        <span
          className={cn(
            "inline-flex items-center px-2.5 py-1 rounded-[var(--radius-card)] text-[10px] font-[family-name:var(--font-mono)] font-semibold tracking-wider",
            status.className
          )}
        >
          {status.label}
        </span>
      );
    },
    enableSorting: false,
  },
];

export function PortfolioLoanTable() {
  return <DataTable columns={columns} data={portfolioLoans} pageSize={10} />;
}
