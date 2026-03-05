"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { ChevronUp, ChevronDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface DataTableProps<T> {
  columns: ColumnDef<T, unknown>[];
  data: T[];
  searchable?: boolean;
  searchPlaceholder?: string;
  pageSize?: number;
  className?: string;
}

export function DataTable<T>({
  columns,
  data,
  searchable = false,
  searchPlaceholder = "Search...",
  pageSize = 10,
  className,
}: DataTableProps<T>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize,
      },
    },
  });

  return (
    <div className={cn("w-full", className)}>
      {searchable && (
        <div className="mb-4">
          <Input
            placeholder={searchPlaceholder}
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="max-w-sm"
          />
        </div>
      )}

      <div className="border border-[var(--border)] rounded-[var(--radius-card)] overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={cn(
                      "uppercase text-xs text-[var(--foreground-muted)] font-medium tracking-wider",
                      header.column.getCanSort() && "cursor-pointer select-none"
                    )}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center gap-1">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      {header.column.getCanSort() && (
                        <span className="flex flex-col ml-1">
                          <ChevronUp
                            className={cn(
                              "w-3 h-3 -mb-1",
                              header.column.getIsSorted() === "asc"
                                ? "text-[var(--foreground)]"
                                : "text-[var(--foreground-muted)]/40"
                            )}
                          />
                          <ChevronDown
                            className={cn(
                              "w-3 h-3",
                              header.column.getIsSorted() === "desc"
                                ? "text-[var(--foreground)]"
                                : "text-[var(--foreground-muted)]/40"
                            )}
                          />
                        </span>
                      )}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            <AnimatePresence mode="popLayout">
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <motion.tr
                    key={row.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="border-b border-[var(--border)] transition-colors hover:bg-[var(--muted)]/50"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="font-mono text-sm">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </motion.tr>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center text-[var(--foreground-muted)]"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </AnimatePresence>
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {table.getPageCount() > 1 && (
        <div className="flex items-center justify-between mt-4">
          <span className="text-sm text-[var(--foreground-muted)]">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className={cn(
                "px-3 py-1.5 text-sm rounded-[var(--radius-card)] border border-[var(--border)] transition-colors",
                table.getCanPreviousPage()
                  ? "text-[var(--foreground)] hover:bg-[var(--muted)]"
                  : "text-[var(--foreground-muted)] opacity-50 cursor-not-allowed"
              )}
            >
              Previous
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className={cn(
                "px-3 py-1.5 text-sm rounded-[var(--radius-card)] border border-[var(--border)] transition-colors",
                table.getCanNextPage()
                  ? "text-[var(--foreground)] hover:bg-[var(--muted)]"
                  : "text-[var(--foreground-muted)] opacity-50 cursor-not-allowed"
              )}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
