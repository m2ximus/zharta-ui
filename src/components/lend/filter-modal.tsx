"use client";

import * as React from "react";
import Link from "next/link";
import { SlidersHorizontal, RotateCcw, Key, ArrowRight } from "lucide-react";
import { AssetBadge } from "@/components/shared/asset-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { CollateralType, PrincipalType } from "@/types";

export interface FilterState {
  collateralTypes: CollateralType[];
  principalTypes: PrincipalType[];
  aprRange: [number, number];
  ltvRange: [number, number];
  maturityRanges: string[];
  callable: "any" | "callable" | "non-callable";
  liquidation: "any" | "full" | "partial";
  minPrincipal: number | null;
  maxPrincipal: number | null;
}

export const DEFAULT_FILTERS: FilterState = {
  collateralTypes: ["WBTC", "WETH", "cbBTC", "ACRED", "wstETH", "rETH"],
  principalTypes: ["USDC", "USDT", "DAI"],
  aprRange: [0, 15],
  ltvRange: [0, 100],
  maturityRanges: [],
  callable: "any",
  liquidation: "any",
  minPrincipal: null,
  maxPrincipal: null,
};

interface FilterModalProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

const COLLATERAL_OPTIONS: CollateralType[] = [
  "WBTC",
  "WETH",
  "cbBTC",
  "ACRED",
  "wstETH",
  "rETH",
];

const PRINCIPAL_OPTIONS: PrincipalType[] = ["USDC", "USDT", "DAI"];

const MATURITY_OPTIONS = [
  { label: "<30d", value: "<30d" },
  { label: "30-90d", value: "30-90d" },
  { label: "90-180d", value: "90-180d" },
  { label: "180-365d", value: "180-365d" },
  { label: ">365d", value: ">365d" },
];

const CALLABLE_OPTIONS = [
  { label: "Any", value: "any" as const },
  { label: "Callable only", value: "callable" as const },
  { label: "Non-callable only", value: "non-callable" as const },
];

const LIQUIDATION_OPTIONS = [
  { label: "Any", value: "any" as const },
  { label: "Full only", value: "full" as const },
  { label: "Partial only", value: "partial" as const },
];

function countActiveFilters(filters: FilterState): number {
  let count = 0;
  if (filters.collateralTypes.length < COLLATERAL_OPTIONS.length) count++;
  if (filters.principalTypes.length < PRINCIPAL_OPTIONS.length) count++;
  if (filters.aprRange[0] > 0 || filters.aprRange[1] < 15) count++;
  if (filters.ltvRange[0] > 0 || filters.ltvRange[1] < 100) count++;
  if (filters.maturityRanges.length > 0) count++;
  if (filters.callable !== "any") count++;
  if (filters.liquidation !== "any") count++;
  if (filters.minPrincipal !== null) count++;
  if (filters.maxPrincipal !== null) count++;
  return count;
}

function CheckboxItem({
  checked,
  onToggle,
  children,
}: {
  checked: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "flex items-center gap-2.5 px-3 py-2 rounded-[3px] border transition-colors text-sm",
        checked
          ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5"
          : "border-[var(--border)] bg-transparent hover:border-[var(--foreground-muted)]/30"
      )}
    >
      <span
        className={cn(
          "flex items-center justify-center w-4 h-4 rounded-[2px] border-2 transition-colors flex-shrink-0",
          checked
            ? "border-[var(--color-primary)] bg-[var(--color-primary)]"
            : "border-[var(--foreground-muted)]/40 bg-transparent"
        )}
      >
        {checked && (
          <svg
            className="w-2.5 h-2.5 text-black"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </span>
      {children}
    </button>
  );
}

function ToggleGroup<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { label: string; value: T }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div className="flex gap-1 rounded-[3px] bg-[var(--muted)] p-1">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={cn(
            "flex-1 px-3 py-1.5 text-xs font-medium rounded-[2px] transition-colors whitespace-nowrap",
            value === option.value
              ? "bg-[var(--card)] text-[var(--foreground)] shadow-sm"
              : "text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export function FilterModal({ filters, onFiltersChange }: FilterModalProps) {
  const [open, setOpen] = React.useState(false);
  const [draft, setDraft] = React.useState<FilterState>(filters);

  const activeCount = countActiveFilters(filters);

  // Sync draft when opening
  React.useEffect(() => {
    if (open) setDraft(filters);
  }, [open, filters]);

  function toggleCollateral(asset: CollateralType) {
    setDraft((prev) => ({
      ...prev,
      collateralTypes: prev.collateralTypes.includes(asset)
        ? prev.collateralTypes.filter((a) => a !== asset)
        : [...prev.collateralTypes, asset],
    }));
  }

  function togglePrincipal(asset: PrincipalType) {
    setDraft((prev) => ({
      ...prev,
      principalTypes: prev.principalTypes.includes(asset)
        ? prev.principalTypes.filter((a) => a !== asset)
        : [...prev.principalTypes, asset],
    }));
  }

  function toggleMaturity(value: string) {
    setDraft((prev) => ({
      ...prev,
      maturityRanges: prev.maturityRanges.includes(value)
        ? prev.maturityRanges.filter((v) => v !== value)
        : [...prev.maturityRanges, value],
    }));
  }

  function handleApply() {
    onFiltersChange(draft);
    setOpen(false);
  }

  function handleReset() {
    setDraft(DEFAULT_FILTERS);
  }

  return (
    <>
      <Button
        variant="outline"
        className="rounded-full gap-2"
        onClick={() => setOpen(true)}
      >
        <SlidersHorizontal className="w-4 h-4" />
        Filters
        {activeCount > 0 && (
          <span className="ml-1 flex items-center justify-center w-5 h-5 rounded-full bg-[var(--color-primary)] text-black text-[10px] font-bold font-[family-name:var(--font-mono)]">
            {activeCount}
          </span>
        )}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-[family-name:var(--font-display)] text-2xl md:text-3xl">
              Customize
            </DialogTitle>
            <DialogDescription>
              Set your lending criteria to find matching opportunities
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-2">
            {/* Collateral Type */}
            <div>
              <Label className="text-xs uppercase tracking-wider text-[var(--foreground-muted)] mb-3 block">
                Collateral Type
              </Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {COLLATERAL_OPTIONS.map((asset) => (
                  <CheckboxItem
                    key={asset}
                    checked={draft.collateralTypes.includes(asset)}
                    onToggle={() => toggleCollateral(asset)}
                  >
                    <AssetBadge asset={asset} size="sm" />
                  </CheckboxItem>
                ))}
              </div>
            </div>

            <Separator />

            {/* Principal */}
            <div>
              <Label className="text-xs uppercase tracking-wider text-[var(--foreground-muted)] mb-3 block">
                Principal
              </Label>
              <div className="grid grid-cols-3 gap-2">
                {PRINCIPAL_OPTIONS.map((asset) => (
                  <CheckboxItem
                    key={asset}
                    checked={draft.principalTypes.includes(asset)}
                    onToggle={() => togglePrincipal(asset)}
                  >
                    <AssetBadge asset={asset} size="sm" />
                  </CheckboxItem>
                ))}
              </div>
            </div>

            <Separator />

            {/* APR & LTV Range — 2 column grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* APR Range */}
              <div>
                <Label className="text-xs uppercase tracking-wider text-[var(--foreground-muted)] mb-3 block">
                  APR Range
                </Label>
                <div className="px-1">
                  <Slider
                    value={draft.aprRange}
                    onValueChange={(val) =>
                      setDraft((prev) => ({
                        ...prev,
                        aprRange: val as [number, number],
                      }))
                    }
                    min={0}
                    max={15}
                    step={0.1}
                  />
                  <div className="flex justify-between mt-2">
                    <span className="text-xs font-[family-name:var(--font-mono)] text-[var(--foreground-muted)]">
                      {draft.aprRange[0].toFixed(1)}%
                    </span>
                    <span className="text-xs font-[family-name:var(--font-mono)] text-[var(--foreground-muted)]">
                      {draft.aprRange[1].toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* LTV Range */}
              <div>
                <Label className="text-xs uppercase tracking-wider text-[var(--foreground-muted)] mb-3 block">
                  LTV Range
                </Label>
                <div className="px-1">
                  <Slider
                    value={draft.ltvRange}
                    onValueChange={(val) =>
                      setDraft((prev) => ({
                        ...prev,
                        ltvRange: val as [number, number],
                      }))
                    }
                    min={0}
                    max={100}
                    step={1}
                  />
                  <div className="flex justify-between mt-2">
                    <span className="text-xs font-[family-name:var(--font-mono)] text-[var(--foreground-muted)]">
                      {draft.ltvRange[0]}%
                    </span>
                    <span className="text-xs font-[family-name:var(--font-mono)] text-[var(--foreground-muted)]">
                      {draft.ltvRange[1]}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Maturity */}
            <div>
              <Label className="text-xs uppercase tracking-wider text-[var(--foreground-muted)] mb-3 block">
                Maturity
              </Label>
              <div className="flex flex-wrap gap-2">
                {MATURITY_OPTIONS.map((opt) => (
                  <CheckboxItem
                    key={opt.value}
                    checked={draft.maturityRanges.includes(opt.value)}
                    onToggle={() => toggleMaturity(opt.value)}
                  >
                    <span className="font-[family-name:var(--font-mono)] text-xs">
                      {opt.label}
                    </span>
                  </CheckboxItem>
                ))}
              </div>
            </div>

            <Separator />

            {/* Callable & Liquidation — 2 column grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Callable */}
              <div>
                <Label className="text-xs uppercase tracking-wider text-[var(--foreground-muted)] mb-3 block">
                  Callable
                </Label>
                <ToggleGroup
                  options={CALLABLE_OPTIONS}
                  value={draft.callable}
                  onChange={(val) =>
                    setDraft((prev) => ({ ...prev, callable: val }))
                  }
                />
              </div>

              {/* Liquidation */}
              <div>
                <Label className="text-xs uppercase tracking-wider text-[var(--foreground-muted)] mb-3 block">
                  Liquidation
                </Label>
                <ToggleGroup
                  options={LIQUIDATION_OPTIONS}
                  value={draft.liquidation}
                  onChange={(val) =>
                    setDraft((prev) => ({ ...prev, liquidation: val }))
                  }
                />
              </div>
            </div>

            <Separator />

            {/* Principal Amount Range — 2 column grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label className="text-xs uppercase tracking-wider text-[var(--foreground-muted)] mb-3 block">
                  Min Principal Amount
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[var(--foreground-muted)]">
                    $
                  </span>
                  <Input
                    type="number"
                    placeholder="No minimum"
                    className="pl-7 font-[family-name:var(--font-mono)]"
                    value={draft.minPrincipal ?? ""}
                    onChange={(e) =>
                      setDraft((prev) => ({
                        ...prev,
                        minPrincipal: e.target.value
                          ? Number(e.target.value)
                          : null,
                      }))
                    }
                  />
                </div>
              </div>

              <div>
                <Label className="text-xs uppercase tracking-wider text-[var(--foreground-muted)] mb-3 block">
                  Max Principal Amount
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[var(--foreground-muted)]">
                    $
                  </span>
                  <Input
                    type="number"
                    placeholder="No maximum"
                    className="pl-7 font-[family-name:var(--font-mono)]"
                    value={draft.maxPrincipal ?? ""}
                    onChange={(e) =>
                      setDraft((prev) => ({
                        ...prev,
                        maxPrincipal: e.target.value
                          ? Number(e.target.value)
                          : null,
                      }))
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* API prompt */}
          <div className="flex items-center gap-3 rounded-[var(--radius-card)] border border-[var(--color-primary)]/20 bg-[var(--color-primary)]/5 px-4 py-3">
            <Key className="w-4 h-4 text-[var(--color-primary)] flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-[var(--foreground)]">
                Automate this filter via the API
              </p>
              <p className="text-xs text-[var(--foreground-muted)] mt-0.5">
                Use custom filters programmatically with your API key
              </p>
            </div>
            <Link
              href="/settings/api"
              className="flex items-center gap-1 text-xs font-medium text-[var(--color-primary)] hover:underline whitespace-nowrap flex-shrink-0"
            >
              API Settings
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <DialogFooter className="flex flex-row items-center justify-between sm:justify-between gap-2 pt-2">
            <Button variant="ghost" className="gap-2" onClick={handleReset}>
              <RotateCcw className="w-3.5 h-3.5" />
              Reset All
            </Button>
            <Button className="rounded-full px-8" onClick={handleApply}>
              Apply Filters
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
