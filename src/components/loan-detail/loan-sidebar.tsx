import { AssetBadge } from "@/components/shared/asset-badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatAddress } from "@/lib/utils";
import { Wallet, Activity, Radio } from "lucide-react";

interface LoanSidebarProps {
  collateralAsset: string;
  owner: string;
}

const MOCK_WALLET_BALANCES: Record<string, string> = {
  WBTC: "12.5 WBTC",
  WETH: "145.2 WETH",
  cbBTC: "8.3 cbBTC",
  ACRED: "1,250,000 ACRED",
  wstETH: "89.7 wstETH",
  rETH: "62.4 rETH",
};

const MOCK_ORACLE_RATES: Record<string, string> = {
  WBTC: "$67,500.00",
  WETH: "$3,850.00",
  cbBTC: "$67,200.00",
  ACRED: "$1.02",
  wstETH: "$4,420.00",
  rETH: "$4,180.00",
};

const MOCK_ORACLES: Record<string, string> = {
  WBTC: "Chainlink",
  WETH: "Chainlink",
  cbBTC: "Chainlink",
  ACRED: "Ondo",
  wstETH: "Chainlink",
  rETH: "Chainlink",
};

export function LoanSidebar({ collateralAsset, owner }: LoanSidebarProps) {
  const walletBalance = MOCK_WALLET_BALANCES[collateralAsset] ?? "0.00";
  const oracleRate = MOCK_ORACLE_RATES[collateralAsset] ?? "$0.00";
  const oracle = MOCK_ORACLES[collateralAsset] ?? "Chainlink";

  return (
    <Card>
      <CardContent className="p-5">
        {/* Asset display */}
        <div className="flex flex-col items-center text-center mb-6 pt-1">
          <div className="mb-3 p-3 rounded-[3px] bg-[var(--background-secondary)]">
            <AssetBadge asset={collateralAsset} size="lg" showName />
          </div>
          <p className="text-xs text-[var(--foreground-muted)] mt-1">Collateral Asset</p>
        </div>

        {/* Divider */}
        <div className="h-px bg-[var(--border)] mb-5" />

        {/* Owner */}
        <div className="mb-5">
          <p className="text-xs text-[var(--foreground-muted)] mb-1.5">Owner</p>
          <p className="font-[family-name:var(--font-mono)] text-sm text-[var(--foreground)]">
            {formatAddress(owner)}
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-[var(--border)] mb-5" />

        {/* Info rows */}
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Wallet className="w-4 h-4 text-[var(--foreground-muted)] mt-0.5 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-xs text-[var(--foreground-muted)] mb-0.5">Wallet Balance</p>
              <p className="font-[family-name:var(--font-mono)] text-sm text-[var(--foreground)]">
                {walletBalance}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Activity className="w-4 h-4 text-[var(--foreground-muted)] mt-0.5 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-xs text-[var(--foreground-muted)] mb-0.5">Oracle Rate</p>
              <p className="font-[family-name:var(--font-mono)] text-sm text-[var(--color-primary)]">
                {oracleRate}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Radio className="w-4 h-4 text-[var(--foreground-muted)] mt-0.5 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-xs text-[var(--foreground-muted)] mb-0.5">Oracle</p>
              <p className="text-sm text-[var(--foreground)]">
                {oracle}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
