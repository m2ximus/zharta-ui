import { cn } from "@/lib/utils";

interface AprBadgeProps {
  value: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeStyles = {
  sm: {
    value: "text-sm",
    label: "text-[10px]",
  },
  md: {
    value: "text-base",
    label: "text-xs",
  },
  lg: {
    value: "text-xl",
    label: "text-sm",
  },
} as const;

export function AprBadge({ value, size = "md", className }: AprBadgeProps) {
  const styles = sizeStyles[size];

  return (
    <span className={cn("inline-flex items-baseline gap-1", className)}>
      <span
        className={cn(
          "font-mono font-semibold text-[var(--color-primary)]",
          styles.value
        )}
      >
        {value.toFixed(2)}%
      </span>
      <span
        className={cn(
          "font-medium text-[var(--foreground-muted)] uppercase tracking-wide",
          styles.label
        )}
      >
        APR
      </span>
    </span>
  );
}
