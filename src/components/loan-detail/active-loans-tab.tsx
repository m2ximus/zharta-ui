"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/shared/data-table";
import { StatusBadge } from "@/components/shared/status-badge";
import { formatCurrency, formatPercent, formatDate, formatAddress } from "@/lib/utils";
import { FileX } from "lucide-react";
import type { ActiveLoan } from "@/types";

interface ActiveLoansTabProps {
  loans: ActiveLoan[];
}

const columns: ColumnDef<ActiveLoan, unknown>[] = [
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <StatusBadge status={row.original.status} />
    ),
  },
  {
    accessorKey: "principalAmount",
    header: "Principal",
    cell: ({ row }) => (
      <span className="font-[family-name:var(--font-mono)]">
        {formatCurrency(row.original.principalAmount)}
      </span>
    ),
  },
  {
    accessorKey: "outstandingDebt",
    header: "Outstanding Debt",
    cell: ({ row }) => (
      <span className="font-[family-name:var(--font-mono)]">
        {formatCurrency(row.original.outstandingDebt)}
      </span>
    ),
  },
  {
    accessorKey: "currentLtv",
    header: "Current LTV",
    cell: ({ row }) => {
      const ltv = row.original.currentLtv;
      const color =
        ltv > 70
          ? "text-red-400"
          : ltv > 60
            ? "text-amber-400"
            : "text-emerald-400";
      return (
        <span className={`font-[family-name:var(--font-mono)] ${color}`}>
          {formatPercent(ltv)}
        </span>
      );
    },
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
      <span className="font-[family-name:var(--font-mono)]">
        {formatDate(row.original.maturityDate)}
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
    accessorKey: "borrower",
    header: "Borrower",
    cell: ({ row }) => (
      <span className="font-[family-name:var(--font-mono)] text-[var(--foreground-muted)]">
        {formatAddress(row.original.borrower)}
      </span>
    ),
  },
];

export function ActiveLoansTab({ loans }: ActiveLoansTabProps) {
  if (loans.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-4 rounded-[3px] bg-[var(--background-secondary)] p-3">
          <FileX className="w-8 h-8 text-[var(--foreground-muted)]" />
        </div>
        <p className="text-sm text-[var(--foreground-muted)]">
          No active loans for this request
        </p>
      </div>
    );
  }

  return (
    <DataTable
      columns={columns}
      data={loans}
      pageSize={10}
    />
  );
}
