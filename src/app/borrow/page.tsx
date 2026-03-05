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
import { Button } from "@/components/ui/button";
import { ArrowRightLeft } from "lucide-react";
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
    React.useState<CollateralType>("WETH");
  const [collateralAmount, setCollateralAmount] = React.useState("10000");
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
              Borrow
            </h1>
            <SandboxToggle
              enabled={sandboxEnabled}
              onToggle={setSandboxEnabled}
            />
          </div>

          {/* Main layout: Form + Rate card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Deposit + Borrow side-by-side, LTV below */}
            <div className="lg:col-span-8 space-y-4">
              {/* Side-by-side Deposit / Borrow cards (like Spark) */}
              <Card className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 relative">
                  {/* Deposit card */}
                  <div className="pr-0 md:pr-4 md:border-r border-[var(--border)]">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium text-[var(--foreground-muted)] uppercase tracking-wider">
                        Deposit
                      </span>
                      <span className="text-xs text-[var(--foreground-muted)] cursor-pointer hover:text-[var(--color-primary)] transition-colors">
                        Add more +
                      </span>
                    </div>
                    <CollateralInput
                      asset={collateralAsset}
                      amount={collateralAmount}
                      onAssetChange={setCollateralAsset}
                      onAmountChange={setCollateralAmount}
                      compact
                    />
                  </div>

                  {/* Center connector */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:flex">
                    <div className="w-10 h-10 rounded-full bg-[var(--background)] border border-[var(--border)] flex items-center justify-center">
                      <ArrowRightLeft className="w-4 h-4 text-[var(--color-primary)]" />
                    </div>
                  </div>

                  {/* Borrow card */}
                  <div className="pl-0 md:pl-4 pt-4 md:pt-0">
                    <div className="mb-4">
                      <span className="text-sm font-medium text-[var(--foreground-muted)] uppercase tracking-wider">
                        Borrow
                      </span>
                    </div>
                    <PrincipalInput
                      asset={principalAsset}
                      amount={principalAmount}
                      onAssetChange={setPrincipalAsset}
                      onAmountChange={setPrincipalAmount}
                      compact
                    />
                  </div>
                </div>
              </Card>

              {/* LTV Section */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-1">
                  <div>
                    <h3 className="text-base font-medium text-[var(--foreground)]">
                      Loan to Value (LTV)
                    </h3>
                    <p className="text-sm text-[var(--foreground-muted)]">
                      Ratio of the collateral to the borrowed value
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-[family-name:var(--font-mono)] text-xl font-semibold text-[var(--foreground)]">
                      {ltv > 0 ? `${ltv.toFixed(2)}%` : "--"}
                    </span>
                    <p className="text-xs text-[var(--foreground-muted)] font-[family-name:var(--font-mono)]">
                      max. 75.00%
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <LtvMeter
                    currentLtv={ltv}
                    maxLtv={75}
                    liquidationLtv={84}
                  />
                </div>
              </Card>

              {/* Loan terms */}
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

              {/* Borrow button - full width, gradient like Spark */}
              <Button
                size="lg"
                className="w-full h-14 rounded-[var(--radius-pill)] text-lg font-semibold bg-gradient-to-r from-[var(--color-primary)] to-[#00B894] text-black hover:opacity-90 transition-opacity"
                disabled={numericCollateral === 0 || numericPrincipal === 0}
              >
                Borrow
              </Button>
            </div>

            {/* Right: Borrow Rate + Summary */}
            <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
              >
                <BorrowRateCard rate={apr} asset={principalAsset} />
              </motion.div>

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
