"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { AssetBadge } from "@/components/shared/asset-badge";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatAddress, formatDate, formatDaysRemaining, formatCurrency } from "@/lib/utils";
import { loanRequests } from "@/data/loans";
import type { LoanRequest } from "@/types";

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

export function LoanRequestsTable() {
  return (
    <DataTable
      columns={columns}
      data={loanRequests}
      searchable
      searchPlaceholder="Search loan requests..."
      pageSize={10}
    />
  );
}
