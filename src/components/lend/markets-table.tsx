"use client";

import Link from "next/link";
import { type ColumnDef } from "@tanstack/react-table";
import { AssetBadge } from "@/components/shared/asset-badge";
import { DataTable } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatCompactCurrency } from "@/lib/utils";
import { markets } from "@/data/markets";
import { assets } from "@/data/assets";
import { Download, Send, Upload } from "lucide-react";
import type { Market } from "@/types";

const columns: ColumnDef<Market, unknown>[] = [
  {
    accessorKey: "collateralAsset",
    header: "Assets",
    cell: ({ row }) => {
      const asset = assets[row.original.collateralAsset];
      const principal = row.original.principalAsset;
      return (
        <div className="flex items-center gap-3">
          <AssetBadge asset={row.original.collateralAsset} size="lg" />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-[var(--foreground)] text-base">
                {asset?.name || row.original.collateralAsset}
              </span>
              <span className="text-xs text-[var(--foreground-muted)] font-[family-name:var(--font-mono)]">
                {row.original.collateralAsset}
              </span>
            </div>
            <span className="text-xs text-[var(--foreground-muted)]">
              / {principal}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "availableLiquidity",
    header: "Total supplied",
    cell: ({ row }) => (
      <div className="text-right">
        <div className="font-[family-name:var(--font-mono)] text-sm font-medium text-[var(--foreground)]">
          {formatCompactCurrency(
            row.original.availableLiquidity + row.original.totalDebt
          )}
        </div>
        <div className="font-[family-name:var(--font-mono)] text-xs text-[var(--foreground-muted)]">
          {formatCurrency(
            row.original.availableLiquidity + row.original.totalDebt
          )}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "avgLtv",
    header: "Avg LTV",
    cell: ({ row }) => (
      <span className="font-[family-name:var(--font-mono)] text-sm text-[var(--foreground)]">
        {row.original.avgLtv.toFixed(2)}%
      </span>
    ),
  },
  {
    accessorKey: "totalDebt",
    header: "Total borrowed",
    cell: ({ row }) => (
      <div className="text-right">
        <div className="font-[family-name:var(--font-mono)] text-sm font-medium text-[var(--foreground)]">
          {formatCompactCurrency(row.original.totalDebt)}
        </div>
        <div className="font-[family-name:var(--font-mono)] text-xs text-[var(--foreground-muted)]">
          {formatCurrency(row.original.totalDebt)}
        </div>
      </div>
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
    id: "status",
    header: "Status",
    enableSorting: false,
    cell: ({ row }) => (
      <div className="flex items-center gap-1.5">
        <button className="w-8 h-8 rounded-[var(--radius-card)] border border-[var(--border)] flex items-center justify-center hover:bg-[var(--muted)] transition-colors">
          <Download className="w-3.5 h-3.5 text-[var(--foreground-muted)]" />
        </button>
        <button className="w-8 h-8 rounded-[var(--radius-card)] border border-[var(--border)] flex items-center justify-center hover:bg-[var(--muted)] transition-colors">
          <Send className="w-3.5 h-3.5 text-[var(--foreground-muted)]" />
        </button>
        <button className="w-8 h-8 rounded-[var(--radius-card)] border border-[var(--border)] flex items-center justify-center hover:bg-[var(--muted)] transition-colors">
          <Upload className="w-3.5 h-3.5 text-[var(--foreground-muted)]" />
        </button>
      </div>
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
