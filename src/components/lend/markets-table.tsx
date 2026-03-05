"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { AssetBadge } from "@/components/shared/asset-badge";
import { DataTable } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { formatCompactCurrency } from "@/lib/utils";
import { markets } from "@/data/markets";
import type { Market } from "@/types";

const columns: ColumnDef<Market, unknown>[] = [
  {
    accessorKey: "collateralAsset",
    header: "Collateral",
    cell: ({ row }) => (
      <AssetBadge asset={row.original.collateralAsset} size="sm" />
    ),
  },
  {
    accessorKey: "principalAsset",
    header: "Principal",
    cell: ({ row }) => (
      <AssetBadge asset={row.original.principalAsset} size="sm" />
    ),
  },
  {
    accessorKey: "oracle",
    header: "Oracle",
    cell: ({ row }) => (
      <span className="text-sm text-[var(--foreground-muted)]">
        {row.original.oracle}
      </span>
    ),
  },
  {
    accessorKey: "availableLiquidity",
    header: "Available Liq.",
    cell: ({ row }) => (
      <span className="font-[family-name:var(--font-mono)] text-sm">
        {formatCompactCurrency(row.original.availableLiquidity)}
      </span>
    ),
  },
  {
    accessorKey: "totalDebt",
    header: "Total Debt",
    cell: ({ row }) => (
      <span className="font-[family-name:var(--font-mono)] text-sm">
        {formatCompactCurrency(row.original.totalDebt)}
      </span>
    ),
  },
  {
    accessorKey: "totalCollateral",
    header: "Total Collateral",
    cell: ({ row }) => (
      <span className="font-[family-name:var(--font-mono)] text-sm">
        {formatCompactCurrency(row.original.totalCollateral)}
      </span>
    ),
  },
  {
    accessorKey: "avgLtv",
    header: "Avg LTV",
    cell: ({ row }) => (
      <span className="font-[family-name:var(--font-mono)] text-sm">
        {row.original.avgLtv.toFixed(1)}%
      </span>
    ),
  },
  {
    accessorKey: "activeLoans",
    header: "Active Loans",
    cell: ({ row }) => (
      <span className="font-[family-name:var(--font-mono)] text-sm">
        {row.original.activeLoans}
      </span>
    ),
  },
  {
    accessorKey: "loanRequests",
    header: "Loan Requests",
    cell: ({ row }) => (
      <span className="font-[family-name:var(--font-mono)] text-sm">
        {row.original.loanRequests}
      </span>
    ),
  },
  {
    id: "actions",
    header: "",
    enableSorting: false,
    cell: () => (
      <Button size="sm" className="rounded-full">
        Add Open Offer
      </Button>
    ),
  },
];

export function MarketsTable() {
  return <DataTable columns={columns} data={markets} pageSize={10} />;
}
