import type { Asset } from "@/types";

export const assets: Record<string, Asset> = {
  WBTC: {
    symbol: "WBTC",
    name: "Wrapped Bitcoin",
    icon: "btc",
    color: "#F7931A",
    decimals: 8,
  },
  WETH: {
    symbol: "WETH",
    name: "Wrapped Ether",
    icon: "eth",
    color: "#627EEA",
    decimals: 18,
  },
  cbBTC: {
    symbol: "cbBTC",
    name: "Coinbase Wrapped BTC",
    icon: "cbbtc",
    color: "#0052FF",
    decimals: 8,
  },
  ACRED: {
    symbol: "ACRED",
    name: "Ondo ACRED",
    icon: "acred",
    color: "#1A73E8",
    decimals: 18,
  },
  wstETH: {
    symbol: "wstETH",
    name: "Wrapped stETH",
    icon: "wsteth",
    color: "#00A3FF",
    decimals: 18,
  },
  rETH: {
    symbol: "rETH",
    name: "Rocket Pool ETH",
    icon: "reth",
    color: "#FF6E4A",
    decimals: 18,
  },
  USDC: {
    symbol: "USDC",
    name: "USD Coin",
    icon: "usdc",
    color: "#2775CA",
    decimals: 6,
  },
  USDT: {
    symbol: "USDT",
    name: "Tether USD",
    icon: "usdt",
    color: "#26A17B",
    decimals: 6,
  },
  DAI: {
    symbol: "DAI",
    name: "Dai Stablecoin",
    icon: "dai",
    color: "#F5AC37",
    decimals: 18,
  },
};

export const collateralAssets = [
  assets.WBTC,
  assets.WETH,
  assets.cbBTC,
  assets.ACRED,
  assets.wstETH,
  assets.rETH,
];

export const principalAssets = [assets.USDC, assets.USDT, assets.DAI];
