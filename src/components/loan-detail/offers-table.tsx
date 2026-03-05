"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/shared/data-table";
import { AssetBadge } from "@/components/shared/asset-badge";
import { Button } from "@/components/ui/button";
import { formatPercent, formatAddress, formatDaysRemaining } from "@/lib/utils";
import type { Offer } from "@/types";

function getDaysRemainingColor(expiresAt: string): string {
  const diff = new Date(expiresAt).getTime() - Date.now();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  if (days < 0) return "text-red-400";
  if (days < 3) return "text-red-400";
  if (days <= 7) return "text-amber-400";
  return "text-emerald-400";
}

interface OffersTableProps {
  offers: Offer[];
}

const columns: ColumnDef<Offer, unknown>[] = [
  {
    accessorKey: "principalAmount",
    header: "Principal",
    cell: ({ row }) => (
      <div className="flex items-center gap-1.5">
        <span className="font-[family-name:var(--font-mono)]">
          {row.original.principalAmount.toLocaleString()}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "minCollateral",
    header: "Min Collateral",
    cell: ({ row }) => (
      <span className="font-[family-name:var(--font-mono)]">
        {row.original.minCollateral.toLocaleString()}
      </span>
    ),
  },
  {
    accessorKey: "maxLtv",
    header: "Max LTV",
    cell: ({ row }) => (
      <span className="font-[family-name:var(--font-mono)]">
        {formatPercent(row.original.maxLtv, 0)}
      </span>
    ),
  },
  {
    accessorKey: "originFee",
    header: "Origin Fee",
    cell: ({ row }) => (
      <span className="font-[family-name:var(--font-mono)]">
        {formatPercent(row.original.originFee)}
      </span>
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
    accessorKey: "effectiveApr",
    header: "Eff. APR",
    cell: ({ row }) => (
      <span className="font-[family-name:var(--font-mono)]">
        {formatPercent(row.original.effectiveApr)}
      </span>
    ),
  },
  {
    accessorKey: "maturityDays",
    header: "Maturity",
    cell: ({ row }) => (
      <span className="font-[family-name:var(--font-mono)]">
        {row.original.maturityDays}d
      </span>
    ),
  },
  {
    accessorKey: "callable",
    header: "Callable",
    cell: ({ row }) => (
      <span className={row.original.callable ? "text-amber-400" : "text-[var(--foreground-muted)]"}>
        {row.original.callable ? "Yes" : "No"}
      </span>
    ),
  },
  {
    accessorKey: "callWindow",
    header: "Call Window",
    cell: ({ row }) => (
      <span className="font-[family-name:var(--font-mono)]">
        {row.original.callWindow > 0 ? `${row.original.callWindow}d` : "\u2014"}
      </span>
    ),
  },
  {
    accessorKey: "oracle",
    header: "Oracle",
    cell: ({ row }) => (
      <span className="text-xs">
        {row.original.oracle}
      </span>
    ),
  },
  {
    accessorKey: "liquidationLtv",
    header: "Liq. LTV",
    cell: ({ row }) => (
      <span className="font-[family-name:var(--font-mono)]">
        {formatPercent(row.original.liquidationLtv, 0)}
      </span>
    ),
  },
  {
    accessorKey: "lender",
    header: "Lender",
    cell: ({ row }) => (
      <span className="font-[family-name:var(--font-mono)] text-[var(--foreground-muted)]">
        {formatAddress(row.original.lender)}
      </span>
    ),
  },
  {
    accessorKey: "expiresAt",
    header: "Expires",
    cell: ({ row }) => (
      <span
        className={`font-[family-name:var(--font-mono)] ${getDaysRemainingColor(row.original.expiresAt)}`}
      >
        {formatDaysRemaining(row.original.expiresAt)}
      </span>
    ),
  },
  {
    id: "actions",
    header: "",
    enableSorting: false,
    cell: () => (
      <Button size="sm" className="h-7 px-3 text-xs">
        Accept
      </Button>
    ),
  },
];

export function OffersTable({ offers }: OffersTableProps) {
  return (
    <DataTable
      columns={columns}
      data={offers}
      searchable
      searchPlaceholder="Search offers..."
      pageSize={10}
    />
  );
}
