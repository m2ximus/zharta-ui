"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

interface AssetBadgeProps {
  asset: string;
  size?: "sm" | "md" | "lg";
  showName?: boolean;
  iconOnly?: boolean;
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

const ASSET_ICON_MAP: Record<string, string | null> = {
  WBTC: "btc",
  WETH: "eth",
  cbBTC: "btc",
  ACRED: null,
  wstETH: "eth",
  rETH: "eth",
  USDC: "usdc",
  USDT: "usdt",
  DAI: "dai",
};

function getCryptoIconUrl(asset: string): string | null {
  const iconName = ASSET_ICON_MAP[asset];
  if (!iconName) return null;
  return `https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/svg/color/${iconName}.svg`;
}

const ICON_SIZES: Record<"sm" | "md" | "lg", number> = {
  sm: 16,
  md: 20,
  lg: 28,
};

const sizeStyles = {
  sm: {
    dot: "w-4 h-4",
    dotFallback: "w-1.5 h-1.5",
    text: "text-xs",
    gap: "gap-1",
  },
  md: {
    dot: "w-5 h-5",
    dotFallback: "w-2 h-2",
    text: "text-sm",
    gap: "gap-1.5",
  },
  lg: {
    dot: "w-7 h-7",
    dotFallback: "w-2.5 h-2.5",
    text: "text-base",
    gap: "gap-2",
  },
} as const;

export function AssetBadge({
  asset,
  size = "md",
  showName = false,
  iconOnly = false,
  className,
}: AssetBadgeProps) {
  const color = ASSET_COLORS[asset] || "var(--foreground-muted)";
  const name = ASSET_NAMES[asset];
  const styles = sizeStyles[size];
  const iconUrl = getCryptoIconUrl(asset);
  const iconSize = ICON_SIZES[size];
  const [imgError, setImgError] = useState(false);

  return (
    <span
      className={cn(
        "inline-flex items-center font-mono",
        styles.gap,
        className
      )}
    >
      {iconUrl && !imgError ? (
        <Image
          src={iconUrl}
          alt={`${asset} icon`}
          width={iconSize}
          height={iconSize}
          className="flex-shrink-0"
          onError={() => setImgError(true)}
        />
      ) : (
        <span
          className={cn("rounded-full flex-shrink-0", styles.dotFallback)}
          style={{ backgroundColor: color }}
        />
      )}
      {!iconOnly && (
        <span className={cn("font-medium text-[var(--foreground)]", styles.text)}>
          {asset}
        </span>
      )}
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
