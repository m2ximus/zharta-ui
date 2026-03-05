"use client";

import * as React from "react";
import { motion } from "motion/react";
import { AppNav } from "@/components/layout/app-nav";
import { PageTransition } from "@/components/shared/page-transition";
import { SandboxToggle } from "@/components/shared/sandbox-toggle";
import { LtvMeter } from "@/components/shared/ltv-meter";
import { CollateralInput } from "@/components/borrow/collateral-input";
import { PrincipalInput } from "@/components/borrow/principal-input";
import { LoanTerms } from "@/components/borrow/loan-terms";
import { BorrowRateCard } from "@/components/borrow/borrow-rate-card";
import { BorrowSummary } from "@/components/borrow/borrow-summary";
import { Card } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import type { CollateralType, PrincipalType } from "@/types";

const MOCK_PRICES: Record<string, number> = {
  WBTC: 67500,
  WETH: 3800,
  cbBTC: 67000,
  ACRED: 1.02,
};

export default function BorrowPage() {
  const [sandboxEnabled, setSandboxEnabled] = React.useState(false);
  const [collateralAsset, setCollateralAsset] =
    React.useState<CollateralType>("WBTC");
  const [collateralAmount, setCollateralAmount] = React.useState("");
  const [principalAsset, setPrincipalAsset] =
    React.useState<PrincipalType>("USDC");
  const [principalAmount, setPrincipalAmount] = React.useState("");
  const [apr, setApr] = React.useState(6.5);
  const [maturityDays, setMaturityDays] = React.useState(90);
  const [callable, setCallable] = React.useState(false);
  const [callWindow, setCallWindow] = React.useState(7);

  // Derived values
  const price = MOCK_PRICES[collateralAsset] ?? 0;
  const numericCollateral = parseFloat(collateralAmount) || 0;
  const numericPrincipal = parseFloat(principalAmount) || 0;
  const collateralValueUsd = numericCollateral * price;
  const ltv =
    collateralValueUsd > 0
      ? (numericPrincipal / collateralValueUsd) * 100
      : 0;

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <AppNav />

      <main className="mx-auto max-w-[1440px] px-6 lg:px-8 py-6">
        <PageTransition>
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="font-[family-name:var(--font-display)] text-3xl text-[var(--foreground)]">
              Easy Borrow
            </h1>
            <SandboxToggle
              enabled={sandboxEnabled}
              onToggle={setSandboxEnabled}
            />
          </div>

          {/* Two-panel layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left panel - Form inputs */}
            <div className="lg:col-span-7 space-y-1">
              {/* Collateral */}
              <CollateralInput
                asset={collateralAsset}
                amount={collateralAmount}
                onAssetChange={setCollateralAsset}
                onAmountChange={setCollateralAmount}
              />

              {/* Arrow separator */}
              <div className="flex justify-center -my-2 relative z-10">
                <div className="w-10 h-10 rounded-[3px] bg-[var(--background-tertiary)] border border-[var(--border)] flex items-center justify-center">
                  <ChevronDown className="w-5 h-5 text-[var(--foreground-muted)]" />
                </div>
              </div>

              {/* Principal */}
              <PrincipalInput
                asset={principalAsset}
                amount={principalAmount}
                onAssetChange={setPrincipalAsset}
                onAmountChange={setPrincipalAmount}
              />

              {/* Loan terms */}
              <div className="pt-4">
                <LoanTerms
                  apr={apr}
                  maturityDays={maturityDays}
                  callable={callable}
                  callWindow={callWindow}
                  onAprChange={setApr}
                  onMaturityChange={setMaturityDays}
                  onCallableChange={setCallable}
                  onCallWindowChange={setCallWindow}
                />
              </div>
            </div>

            {/* Right panel - Rate card, LTV, Summary */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
              {/* Borrow Rate Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
              >
                <BorrowRateCard rate={apr} asset={principalAsset} />
              </motion.div>

              {/* LTV Section */}
              <Card className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-[var(--foreground-muted)] uppercase tracking-wider">
                    Loan-to-Value
                  </h3>
                  <span className="font-[family-name:var(--font-mono)] text-lg font-semibold text-[var(--foreground)]">
                    {ltv > 0 ? `${ltv.toFixed(1)}%` : "--"}
                  </span>
                </div>
                <LtvMeter
                  currentLtv={ltv}
                  maxLtv={75}
                  liquidationLtv={85}
                />
              </Card>

              {/* Summary */}
              <BorrowSummary
                collateralValue={collateralValueUsd}
                principalAmount={numericPrincipal}
                ltv={ltv}
                apr={apr}
                maturityDays={maturityDays}
                asset={principalAsset}
              />
            </div>
          </div>
        </PageTransition>
      </main>
    </div>
  );
}
