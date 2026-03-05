"use client";

import Link from "next/link";
import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/shared/data-table";
import { AssetBadge } from "@/components/shared/asset-badge";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import {
  formatCurrency,
  formatPercent,
  formatDate,
  formatDaysRemaining,
  cn,
} from "@/lib/utils";
import { portfolioLoans } from "@/data/portfolio";
import type { PortfolioLoan } from "@/types";

function getLtvColor(ltv: number): string {
  if (ltv > 70) return "text-red-400";
  if (ltv >= 50) return "text-amber-400";
  return "text-emerald-400";
}

const columns: ColumnDef<PortfolioLoan, unknown>[] = [
  {
    accessorKey: "collateralAsset",
    header: "Collateral",
    cell: ({ row }) => (
      <AssetBadge asset={row.original.collateralAsset} size="sm" />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "principalAmount",
    header: "Principal",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <span className="font-[family-name:var(--font-mono)] text-[var(--foreground)]">
          {formatCurrency(row.original.principalAmount)}
        </span>
        <AssetBadge asset={row.original.principalAsset} size="sm" />
      </div>
    ),
  },
  {
    accessorKey: "apr",
    header: "APR",
    cell: ({ row }) => (
      <span className="font-[family-name:var(--font-mono)] text-[var(--color-primary)]">
        {formatPercent(row.original.apr)}
      </span>
    ),
  },
  {
    accessorKey: "maturityDate",
    header: "Maturity",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="text-sm text-[var(--foreground)]">
          {formatDate(row.original.maturityDate)}
        </span>
        <span className="text-xs text-[var(--foreground-muted)]">
          {formatDaysRemaining(row.original.maturityDate)}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
    enableSorting: false,
  },
  {
    accessorKey: "currentLtv",
    header: "LTV",
    cell: ({ row }) => (
      <span
        className={cn(
          "font-[family-name:var(--font-mono)]",
          getLtvColor(row.original.currentLtv)
        )}
      >
        {formatPercent(row.original.currentLtv, 1)}
      </span>
    ),
  },
  {
    accessorKey: "accruedInterest",
    header: "Accrued Interest",
    cell: ({ row }) => (
      <span className="font-[family-name:var(--font-mono)] text-[var(--foreground)]">
        {formatCurrency(row.original.accruedInterest)}
      </span>
    ),
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <Link href={`/loans/${row.original.id}`}>
        <Button variant="ghost" size="sm" className="text-[var(--color-primary)] hover:text-[var(--color-primary)]">
          View
        </Button>
      </Link>
    ),
    enableSorting: false,
  },
];

export function PortfolioLoanTable() {
  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-[3px] p-6">
      <h3 className="text-base font-semibold text-[var(--foreground)] mb-4">
        Active Loans
      </h3>
      <DataTable
        columns={columns}
        data={portfolioLoans}
        searchable
        searchPlaceholder="Search loans..."
        pageSize={10}
      />
    </div>
  );
}
