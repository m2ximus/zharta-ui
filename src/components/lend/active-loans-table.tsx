"use client";

import Link from "next/link";
import { type ColumnDef } from "@tanstack/react-table";
import { AssetBadge } from "@/components/shared/asset-badge";
import { StatusBadge } from "@/components/shared/status-badge";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn, formatAddress, formatDate, formatCurrency } from "@/lib/utils";
import { activeLoans } from "@/data/loans";
import type { ActiveLoan } from "@/types";

function ltvColorClass(ltv: number): string {
  if (ltv < 50) return "text-emerald-400";
  if (ltv <= 70) return "text-amber-400";
  return "text-red-400";
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
        <AssetBadge asset={row.original.collateralAsset} size="sm" />
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
      <span className="text-sm">{formatDate(row.original.maturityDate)}</span>
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

export function ActiveLoansTable() {
  return (
    <DataTable
      columns={columns}
      data={activeLoans}
      searchable
      searchPlaceholder="Search active loans..."
      pageSize={10}
    />
  );
}
