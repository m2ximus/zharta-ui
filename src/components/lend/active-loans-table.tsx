"use client";

import * as React from "react";
import Link from "next/link";
import { type ColumnDef } from "@tanstack/react-table";
import { AssetBadge } from "@/components/shared/asset-badge";
import { StatusBadge } from "@/components/shared/status-badge";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn, formatAddress, formatDateShort, formatCurrency } from "@/lib/utils";
import { activeLoans } from "@/data/loans";
import type { ActiveLoan } from "@/types";
import type { FilterState } from "@/components/lend/filter-modal";

function ltvColorClass(ltv: number): string {
  if (ltv < 50) return "text-emerald-400";
  if (ltv <= 70) return "text-amber-400";
  return "text-red-400";
}

function getMaturityDays(maturityDate: string): number {
  const diff = new Date(maturityDate).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function matchesMaturityRange(days: number, range: string): boolean {
  switch (range) {
    case "<30d":
      return days < 30;
    case "30-90d":
      return days >= 30 && days < 90;
    case "90-180d":
      return days >= 90 && days < 180;
    case "180-365d":
      return days >= 180 && days < 365;
    case ">365d":
      return days >= 365;
    default:
      return true;
  }
}

function applyFilters(
  data: ActiveLoan[],
  filters: FilterState
): ActiveLoan[] {
  return data.filter((loan) => {
    // Collateral type
    if (!filters.collateralTypes.includes(loan.collateralAsset)) return false;

    // Principal type
    if (!filters.principalTypes.includes(loan.principalAsset)) return false;

    // APR range
    if (loan.apr < filters.aprRange[0] || loan.apr > filters.aprRange[1])
      return false;

    // LTV range
    if (
      loan.currentLtv < filters.ltvRange[0] ||
      loan.currentLtv > filters.ltvRange[1]
    )
      return false;

    // Maturity ranges
    if (filters.maturityRanges.length > 0) {
      const days = getMaturityDays(loan.maturityDate);
      if (
        !filters.maturityRanges.some((range) =>
          matchesMaturityRange(days, range)
        )
      )
        return false;
    }

    // Callable
    if (filters.callable === "callable" && !loan.callable) return false;
    if (filters.callable === "non-callable" && loan.callable) return false;

    // Min principal
    if (
      filters.minPrincipal !== null &&
      loan.principalAmount < filters.minPrincipal
    )
      return false;

    // Max principal
    if (
      filters.maxPrincipal !== null &&
      loan.principalAmount > filters.maxPrincipal
    )
      return false;

    return true;
  });
}

const columns: ColumnDef<ActiveLoan, unknown>[] = [
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },
  {
    accessorKey: "collateralAsset",
    header: "Collateral",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <AssetBadge asset={row.original.collateralAsset} size="md" />
        <span className="font-[family-name:var(--font-mono)] text-sm">
          {row.original.collateralAmount.toLocaleString()}
        </span>
      </div>
    ),
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
    accessorKey: "originFee",
    header: "Origin Fee",
    cell: ({ row }) => (
      <span className="font-[family-name:var(--font-mono)] text-sm">
        {row.original.originFee.toFixed(2)}%
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
    accessorKey: "liquidationLtv",
    header: "Liq. LTV",
    cell: ({ row }) => (
      <span className="font-[family-name:var(--font-mono)] text-sm">
        {row.original.liquidationLtv}%
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
    accessorKey: "effectiveApr",
    header: "Eff. APR",
    cell: ({ row }) => (
      <span className="font-[family-name:var(--font-mono)] text-sm">
        {row.original.effectiveApr.toFixed(2)}%
      </span>
    ),
  },
  {
    accessorKey: "maturityDate",
    header: "Maturity",
    cell: ({ row }) => (
      <span className="text-sm">{formatDateShort(row.original.maturityDate)}</span>
    ),
  },
  {
    accessorKey: "callable",
    header: "Callable",
    cell: ({ row }) =>
      row.original.callable ? (
        <Badge variant="warning">Yes</Badge>
      ) : (
        <Badge variant="secondary">No</Badge>
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
        <Button variant="ghost" size="sm">
          See Loan
        </Button>
      </Link>
    ),
  },
];

interface ActiveLoansTableProps {
  filters?: FilterState;
}

export function ActiveLoansTable({ filters }: ActiveLoansTableProps) {
  const filteredData = React.useMemo(
    () => (filters ? applyFilters(activeLoans, filters) : activeLoans),
    [filters]
  );

  return (
    <DataTable
      columns={columns}
      data={filteredData}
      searchable
      searchPlaceholder="Search active loans..."
      pageSize={10}
    />
  );
}
