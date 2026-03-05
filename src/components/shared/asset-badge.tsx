import { cn } from "@/lib/utils";

interface AssetBadgeProps {
  asset: string;
  size?: "sm" | "md" | "lg";
  showName?: boolean;
  className?: string;
}

const ASSET_COLORS: Record<string, string> = {
  WBTC: "#F7931A",
  WETH: "#627EEA",
  cbBTC: "#0052FF",
  ACRED: "#00D4AA",
  wstETH: "#00A3FF",
  rETH: "#CC9B00",
  USDC: "#2775CA",
  USDT: "#26A17B",
  DAI: "#F5AC37",
};

const ASSET_NAMES: Record<string, string> = {
  WBTC: "Wrapped Bitcoin",
  WETH: "Wrapped Ether",
  cbBTC: "Coinbase Bitcoin",
  ACRED: "Zharta ACRED",
  wstETH: "Wrapped stETH",
  rETH: "Rocket Pool ETH",
  USDC: "USD Coin",
  USDT: "Tether USD",
  DAI: "Dai Stablecoin",
};

const sizeStyles = {
  sm: {
    dot: "w-1.5 h-1.5",
    text: "text-xs",
    gap: "gap-1",
  },
  md: {
    dot: "w-2 h-2",
    text: "text-sm",
    gap: "gap-1.5",
  },
  lg: {
    dot: "w-2.5 h-2.5",
    text: "text-base",
    gap: "gap-2",
  },
} as const;

export function AssetBadge({
  asset,
  size = "md",
  showName = false,
  className,
}: AssetBadgeProps) {
  const color = ASSET_COLORS[asset] || "var(--foreground-muted)";
  const name = ASSET_NAMES[asset];
  const styles = sizeStyles[size];

  return (
    <span
      className={cn(
        "inline-flex items-center font-mono",
        styles.gap,
        className
      )}
    >
      <span
        className={cn("rounded-full flex-shrink-0", styles.dot)}
        style={{ backgroundColor: color }}
      />
      <span className={cn("font-medium text-[var(--foreground)]", styles.text)}>
        {asset}
      </span>
      {showName && name && (
        <span
          className={cn(
            "text-[var(--foreground-muted)]",
            size === "sm" ? "text-[10px]" : "text-xs"
          )}
        >
          {name}
        </span>
      )}
    </span>
  );
}
