"use client";

import Link from "next/link";
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
    header: "Market",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <AssetBadge asset={row.original.collateralAsset} size="md" />
        <span className="font-medium text-[var(--foreground)]">
          {row.original.collateralAsset}
          <span className="text-[var(--foreground-muted)] font-normal">
            {" "}/ {row.original.principalAsset}
          </span>
        </span>
      </div>
    ),
  },
  {
    accessorKey: "availableLiquidity",
    header: "Total supplied",
    cell: ({ row }) => (
      <span className="font-[family-name:var(--font-mono)] text-sm text-[var(--foreground)]">
        {formatCompactCurrency(
          row.original.availableLiquidity + row.original.totalDebt
        )}
      </span>
    ),
  },
  {
    accessorKey: "totalDebt",
    header: "Total borrowed",
    cell: ({ row }) => (
      <span className="font-[family-name:var(--font-mono)] text-sm text-[var(--foreground)]">
        {formatCompactCurrency(row.original.totalDebt)}
      </span>
    ),
  },
  {
    accessorKey: "avgLtv",
    header: "Avg LTV",
    cell: ({ row }) => (
      <span className="font-[family-name:var(--font-mono)] text-sm text-[var(--foreground)]">
        {row.original.avgLtv.toFixed(1)}%
      </span>
    ),
  },
  {
    accessorKey: "oracle",
    header: "Oracle",
    cell: ({ row }) => (
      <span className="text-sm text-[var(--foreground-muted)]">
        {row.original.oracle.split(" ")[0]}
      </span>
    ),
  },
  {
    id: "actions",
    header: "",
    enableSorting: false,
    cell: ({ row }) => (
      <Link href={`/markets/${row.original.id}`}>
        <Button
          variant="outline"
          size="sm"
          className="rounded-full text-xs font-medium px-4"
        >
          Details
        </Button>
      </Link>
    ),
  },
];

export function MarketsTable() {
  return <DataTable columns={columns} data={markets} pageSize={10} />;
}
