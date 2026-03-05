"use client";

import * as React from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { AssetBadge } from "@/components/shared/asset-badge";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatAddress, formatDate, formatDaysRemaining, formatCurrency } from "@/lib/utils";
import { loanRequests } from "@/data/loans";
import type { LoanRequest } from "@/types";
import type { FilterState } from "@/components/lend/filter-modal";

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
  data: LoanRequest[],
  filters: FilterState
): LoanRequest[] {
  return data.filter((loan) => {
    // Collateral type
    if (!filters.collateralTypes.includes(loan.collateralAsset)) return false;

    // Principal type
    if (!filters.principalTypes.includes(loan.principalAsset)) return false;

    // APR range
    if (loan.apr < filters.aprRange[0] || loan.apr > filters.aprRange[1])
      return false;

    // LTV range
    if (loan.maxLtv < filters.ltvRange[0] || loan.maxLtv > filters.ltvRange[1])
      return false;

    // Maturity ranges
    if (filters.maturityRanges.length > 0) {
      const days = getMaturityDays(loan.maturityDate);
      if (!filters.maturityRanges.some((range) => matchesMaturityRange(days, range)))
        return false;
    }

    // Callable
    if (filters.callable === "callable" && !loan.callable) return false;
    if (filters.callable === "non-callable" && loan.callable) return false;

    // Liquidation
    if (filters.liquidation === "full" && loan.liquidationType !== "full")
      return false;
    if (filters.liquidation === "partial" && loan.liquidationType !== "partial")
      return false;

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

const columns: ColumnDef<LoanRequest, unknown>[] = [
  {
    accessorKey: "collateralAsset",
    header: "Collateral",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <AssetBadge asset={row.original.collateralAsset} size="sm" />
        <span className="font-[family-name:var(--font-mono)] text-sm">
          {row.original.collateralAmount.toLocaleString()}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "principalAsset",
    header: "Principal",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <AssetBadge asset={row.original.principalAsset} size="sm" />
        <span className="font-[family-name:var(--font-mono)] text-sm">
          {formatCurrency(row.original.principalAmount)}
        </span>
      </div>
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
    accessorKey: "maxLtv",
    header: "Max LTV",
    cell: ({ row }) => (
      <span className="font-[family-name:var(--font-mono)] text-sm">
        {row.original.maxLtv}%
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
    accessorKey: "expiresAt",
    header: "Expires",
    cell: ({ row }) => (
      <span className="text-sm text-[var(--foreground-muted)]">
        {formatDaysRemaining(row.original.expiresAt)}
      </span>
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
    accessorKey: "liquidationType",
    header: "Liquidation",
    cell: ({ row }) =>
      row.original.liquidationType === "partial" ? (
        <Badge variant="outline">Partial</Badge>
      ) : (
        <Badge variant="secondary">Full</Badge>
      ),
  },
  {
    accessorKey: "owner",
    header: "Owner",
    cell: ({ row }) => (
      <span className="font-[family-name:var(--font-mono)] text-sm text-[var(--foreground-muted)]">
        {formatAddress(row.original.owner)}
      </span>
    ),
  },
  {
    accessorKey: "totalOffers",
    header: "Total Offers",
    cell: ({ row }) => (
      <span className="font-[family-name:var(--font-mono)] text-sm">
        {row.original.totalOffers}
      </span>
    ),
  },
  {
    id: "actions",
    header: "",
    enableSorting: false,
    cell: () => (
      <div className="flex items-center gap-2 justify-end">
        <Button variant="secondary" size="sm">
          Check Offers
        </Button>
        <Button size="sm">Make Offer</Button>
      </div>
    ),
  },
];

interface LoanRequestsTableProps {
  filters?: FilterState;
}

export function LoanRequestsTable({ filters }: LoanRequestsTableProps) {
  const filteredData = React.useMemo(
    () => (filters ? applyFilters(loanRequests, filters) : loanRequests),
    [filters]
  );

  return (
    <DataTable
      columns={columns}
      data={filteredData}
      searchable
      searchPlaceholder="Search loan requests..."
      pageSize={10}
    />
  );
}
