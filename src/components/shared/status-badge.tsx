import { cn } from "@/lib/utils";

type LoanStatus =
  | "active"
  | "pending"
  | "matured"
  | "liquidated"
  | "defaulted"
  | "callable";

interface StatusBadgeProps {
  status: LoanStatus;
  className?: string;
}

const statusConfig: Record<
  LoanStatus,
  { label: string; dotColor: string; textColor: string; bgColor: string }
> = {
  active: {
    label: "Active",
    dotColor: "bg-emerald-400",
    textColor: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
  },
  pending: {
    label: "Pending",
    dotColor: "bg-yellow-400",
    textColor: "text-yellow-400",
    bgColor: "bg-yellow-500/10",
  },
  matured: {
    label: "Matured",
    dotColor: "bg-blue-400",
    textColor: "text-blue-400",
    bgColor: "bg-blue-500/10",
  },
  liquidated: {
    label: "Liquidated",
    dotColor: "bg-red-400",
    textColor: "text-red-400",
    bgColor: "bg-red-500/10",
  },
  defaulted: {
    label: "Defaulted",
    dotColor: "bg-red-400",
    textColor: "text-red-400",
    bgColor: "bg-red-500/10",
  },
  callable: {
    label: "Callable",
    dotColor: "bg-amber-400",
    textColor: "text-amber-400",
    bgColor: "bg-amber-500/10",
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[var(--radius-pill)] text-xs font-medium",
        config.bgColor,
        config.textColor,
        className
      )}
    >
      <span
        className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0", config.dotColor)}
      />
      {config.label}
    </span>
  );
}
