import { cn } from "@/lib/utils";

interface CurrencyDisplayProps {
  amount: number;
  asset: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeStyles = {
  sm: {
    amount: "text-sm",
    badge: "text-[10px] px-1 py-0.5",
  },
  md: {
    amount: "text-base",
    badge: "text-xs px-1.5 py-0.5",
  },
  lg: {
    amount: "text-xl",
    badge: "text-xs px-1.5 py-0.5",
  },
} as const;

function formatAmount(value: number): string {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 6,
  }).format(value);
}

export function CurrencyDisplay({
  amount,
  asset,
  size = "md",
  className,
}: CurrencyDisplayProps) {
  const styles = sizeStyles[size];

  return (
    <span className={cn("inline-flex items-center gap-1.5 font-mono", className)}>
      <span
        className={cn(
          "font-semibold text-[var(--foreground)]",
          styles.amount
        )}
      >
        {formatAmount(amount)}
      </span>
      <span
        className={cn(
          "rounded-[var(--radius-card)] bg-[var(--muted)] text-[var(--foreground-muted)] font-medium",
          styles.badge
        )}
      >
        {asset}
      </span>
    </span>
  );
}
