"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

interface BorrowSummaryProps {
  collateralValue: number;
  principalAmount: number;
  ltv: number;
  apr: number;
  maturityDays: number;
  asset: string;
}

export function BorrowSummary({
  collateralValue,
  principalAmount,
  ltv,
  apr,
  maturityDays,
  asset,
}: BorrowSummaryProps) {
  const originFeeRate = 0.5;
  const originFee = principalAmount * (originFeeRate / 100);
  const totalInterest = principalAmount * (apr / 100) * (maturityDays / 365);
  const totalRepayment = principalAmount + originFee + totalInterest;

  const lines: { label: string; value: string; mono?: boolean }[] = [
    {
      label: "Collateral Value",
      value: formatCurrency(collateralValue, 2),
      mono: true,
    },
    {
      label: "Principal",
      value: `${formatCurrency(principalAmount, 2)} ${asset}`,
      mono: true,
    },
    {
      label: "LTV",
      value: isFinite(ltv) && ltv > 0 ? `${ltv.toFixed(1)}%` : "--",
      mono: true,
    },
    {
      label: "APR",
      value: `${apr.toFixed(1)}%`,
      mono: true,
    },
    {
      label: "Maturity",
      value: `${maturityDays} days`,
      mono: true,
    },
    {
      label: `Origin Fee (${originFeeRate}%)`,
      value: formatCurrency(originFee, 2),
      mono: true,
    },
    {
      label: "Total Interest",
      value: formatCurrency(totalInterest, 2),
      mono: true,
    },
  ];

  return (
    <Card className="p-5">
      <h3 className="text-sm font-medium text-[var(--foreground-muted)] uppercase tracking-wider mb-4">
        Summary
      </h3>

      <div className="space-y-3">
        {lines.map((line) => (
          <div
            key={line.label}
            className="flex items-center justify-between text-sm"
          >
            <span className="text-[var(--foreground-muted)]">{line.label}</span>
            <span
              className={
                line.mono
                  ? "font-[family-name:var(--font-mono)] text-[var(--foreground)]"
                  : "text-[var(--foreground)]"
              }
            >
              {line.value}
            </span>
          </div>
        ))}

        {/* Divider */}
        <div className="border-t border-[var(--border)] my-2" />

        {/* Total repayment */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-[var(--foreground)]">
            Total Repayment
          </span>
          <span className="font-[family-name:var(--font-mono)] text-base font-bold text-[var(--foreground)]">
            {principalAmount > 0
              ? `${formatCurrency(totalRepayment, 2)}`
              : "--"}
          </span>
        </div>
      </div>

      {/* Submit button */}
      <Button
        className="w-full mt-6 rounded-full h-12 text-base font-semibold"
        disabled={principalAmount <= 0 || collateralValue <= 0}
      >
        Submit Borrow Request
      </Button>
    </Card>
  );
}
