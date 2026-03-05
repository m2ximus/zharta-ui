"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const MATURITY_OPTIONS = [
  { label: "30d", value: 30 },
  { label: "60d", value: 60 },
  { label: "90d", value: 90 },
  { label: "180d", value: 180 },
  { label: "365d", value: 365 },
];

interface LoanTermsProps {
  apr: number;
  maturityDays: number;
  callable: boolean;
  callWindow: number;
  onAprChange: (apr: number) => void;
  onMaturityChange: (days: number) => void;
  onCallableChange: (callable: boolean) => void;
  onCallWindowChange: (days: number) => void;
}

export function LoanTerms({
  apr,
  maturityDays,
  callable,
  callWindow,
  onAprChange,
  onMaturityChange,
  onCallableChange,
  onCallWindowChange,
}: LoanTermsProps) {
  return (
    <Card className="p-5">
      <h3 className="text-sm font-medium text-[var(--foreground-muted)] uppercase tracking-wider mb-5">
        Loan Terms
      </h3>

      <div className="space-y-6">
        {/* APR Input + Slider */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm text-[var(--foreground)]">APR</Label>
            <div className="flex items-center gap-1">
              <span className="font-[family-name:var(--font-mono)] text-lg font-semibold text-[var(--color-primary)]">
                {apr.toFixed(1)}
              </span>
              <span className="text-sm text-[var(--foreground-muted)]">%</span>
            </div>
          </div>
          <Slider
            min={1}
            max={15}
            step={0.1}
            value={[apr]}
            onValueChange={([v]) => onAprChange(v)}
          />
          <div className="flex justify-between text-[10px] text-[var(--foreground-muted)] font-[family-name:var(--font-mono)]">
            <span>1%</span>
            <span>15%</span>
          </div>
        </div>

        {/* Maturity pills */}
        <div className="space-y-3">
          <Label className="text-sm text-[var(--foreground)]">Maturity</Label>
          <div className="flex gap-2">
            {MATURITY_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => onMaturityChange(opt.value)}
                className={cn(
                  "flex-1 py-2 rounded-full text-sm font-medium transition-all duration-150",
                  maturityDays === opt.value
                    ? "bg-[var(--color-primary)] text-black"
                    : "bg-[var(--background-tertiary)] text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--border)]"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Callable toggle */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm text-[var(--foreground)]">
              Callable
            </Label>
            <Switch checked={callable} onCheckedChange={onCallableChange} />
          </div>

          {/* Call window - only shown when callable */}
          {callable && (
            <div className="flex items-center justify-between pl-0 pt-1">
              <Label className="text-sm text-[var(--foreground-muted)]">
                Call window (days)
              </Label>
              <Input
                type="number"
                min={1}
                max={maturityDays}
                value={callWindow}
                onChange={(e) =>
                  onCallWindowChange(parseInt(e.target.value) || 7)
                }
                className="w-20 h-9 text-center font-[family-name:var(--font-mono)] text-sm"
              />
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
