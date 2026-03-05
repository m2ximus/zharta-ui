"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

interface DealParametersConfigProps {
  /** When true sliders / selects are interactive; when false they render as
   *  static marketing display with subtle idle animations. */
  interactive?: boolean;
  className?: string;
}

type OracleOption = "Chainlink" | "RedStone" | "Custom";
type PrincipalOption = "USDC" | "USDT" | "DAI";
type ChainOption = "Ethereum Mainnet" | "Arbitrum" | "Base";

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

function pct(value: number, min: number, max: number) {
  return ((value - min) / (max - min)) * 100;
}

function formatK(value: number) {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(value % 1_000_000 === 0 ? 0 : 1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(value % 1_000 === 0 ? 0 : 1)}K`;
  return String(value);
}

/* -------------------------------------------------------------------------- */
/*  Sub-components                                                            */
/* -------------------------------------------------------------------------- */

/** Section label */
function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="block text-[11px] font-semibold uppercase tracking-widest text-[var(--foreground-muted)] mb-2 select-none">
      {children}
    </span>
  );
}

/** Value readout */
function Value({ children }: { children: React.ReactNode }) {
  return (
    <span className="block font-[family-name:var(--font-mono)] text-sm font-bold text-white mb-3">
      {children}
    </span>
  );
}

/** Styled range slider */
function Slider({
  min,
  max,
  step,
  value,
  onChange,
  disabled,
}: {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
  disabled?: boolean;
}) {
  const p = pct(value, min, max);
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(Number(e.target.value))}
      className={cn(
        "w-full h-1.5 rounded-full appearance-none",
        disabled ? "cursor-default" : "cursor-pointer",
        "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-[0_0_6px_rgba(0,212,170,0.5)] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[var(--color-primary)] [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-150",
        !disabled && "[&::-webkit-slider-thumb]:hover:scale-125",
        "[&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-3.5 [&::-moz-range-thumb]:h-3.5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[var(--color-primary)]"
      )}
      style={{
        background: `linear-gradient(to right, #00D4AA ${p}%, rgba(255,255,255,0.1) ${p}%)`,
      }}
    />
  );
}

/** Dual-track range (two thumbs are not natively supported -- we layer two
 *  sliders on top of each other so they share a visual track). */
function DualSlider({
  min,
  max,
  step,
  valueLow,
  valueHigh,
  onChangeLow,
  onChangeHigh,
  disabled,
}: {
  min: number;
  max: number;
  step: number;
  valueLow: number;
  valueHigh: number;
  onChangeLow: (v: number) => void;
  onChangeHigh: (v: number) => void;
  disabled?: boolean;
}) {
  const pLow = pct(valueLow, min, max);
  const pHigh = pct(valueHigh, min, max);

  return (
    <div className="relative h-5">
      {/* Track background */}
      <div
        className="absolute top-[9px] left-0 right-0 h-1.5 rounded-full"
        style={{
          background: `linear-gradient(to right, rgba(255,255,255,0.1) ${pLow}%, #00D4AA ${pLow}%, #00D4AA ${pHigh}%, rgba(255,255,255,0.1) ${pHigh}%)`,
        }}
      />
      {/* Low thumb */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={valueLow}
        disabled={disabled}
        onChange={(e) => {
          const v = Number(e.target.value);
          if (v < valueHigh) onChangeLow(v);
        }}
        className={cn(
          "absolute inset-0 w-full h-full appearance-none bg-transparent pointer-events-none",
          "[&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-[0_0_6px_rgba(0,212,170,0.5)] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[var(--color-primary)]",
          !disabled && "[&::-webkit-slider-thumb]:cursor-pointer",
          "[&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-3.5 [&::-moz-range-thumb]:h-3.5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[var(--color-primary)]"
        )}
      />
      {/* High thumb */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={valueHigh}
        disabled={disabled}
        onChange={(e) => {
          const v = Number(e.target.value);
          if (v > valueLow) onChangeHigh(v);
        }}
        className={cn(
          "absolute inset-0 w-full h-full appearance-none bg-transparent pointer-events-none",
          "[&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-[0_0_6px_rgba(0,212,170,0.5)] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[var(--color-primary)]",
          !disabled && "[&::-webkit-slider-thumb]:cursor-pointer",
          "[&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-3.5 [&::-moz-range-thumb]:h-3.5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[var(--color-primary)]"
        )}
      />
    </div>
  );
}

/** Toggle switch */
function Toggle({
  label,
  enabled,
  onChange,
  disabled,
}: {
  label: string;
  enabled: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={() => !disabled && onChange(!enabled)}
      className={cn(
        "flex items-center gap-2.5 group",
        disabled ? "cursor-default" : "cursor-pointer"
      )}
    >
      <div
        className={cn(
          "relative w-9 h-5 rounded-full transition-colors duration-200 shrink-0",
          enabled ? "bg-[var(--color-primary)]" : "bg-[rgba(255,255,255,0.15)]"
        )}
      >
        <div
          className={cn(
            "absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200",
            enabled ? "translate-x-[18px]" : "translate-x-0.5"
          )}
        />
      </div>
      <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--foreground-muted)] group-hover:text-white transition-colors select-none">
        {label}
      </span>
    </button>
  );
}

/** Select dropdown */
function Select<T extends string>({
  value,
  options,
  onChange,
  disabled,
}: {
  value: T;
  options: T[];
  onChange: (v: T) => void;
  disabled?: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => !disabled && setOpen(!open)}
        className={cn(
          "w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] font-[family-name:var(--font-mono)] text-sm text-white transition-colors",
          !disabled && "hover:border-[rgba(255,255,255,0.2)] cursor-pointer",
          disabled && "cursor-default opacity-80"
        )}
      >
        <span className="truncate">{value}</span>
        <ChevronDown
          className={cn(
            "w-4 h-4 text-[var(--foreground-muted)] transition-transform duration-200 shrink-0",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-lg border border-[rgba(255,255,255,0.08)] bg-[#222222] shadow-xl overflow-hidden">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={cn(
                "w-full text-left px-3 py-2 font-[family-name:var(--font-mono)] text-sm transition-colors cursor-pointer",
                opt === value
                  ? "text-[var(--color-primary)] bg-[rgba(0,212,170,0.08)]"
                  : "text-white hover:bg-[rgba(255,255,255,0.06)]"
              )}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main Component                                                            */
/* -------------------------------------------------------------------------- */

export function DealParametersConfig({
  interactive = true,
  className,
}: DealParametersConfigProps) {
  /* ---- State (left column) ---- */
  const [oracle, setOracle] = React.useState<OracleOption>("Chainlink");
  const [apr, setApr] = React.useState(7); // 0 - 15
  const [maxLiquidity, setMaxLiquidity] = React.useState(500_000); // 10K - 2M
  const [callEligibility, setCallEligibility] = React.useState(true);
  const [callWindow, setCallWindow] = React.useState(true);
  const [minCollateral, setMinCollateral] = React.useState(10_000); // 1K - 500K

  /* ---- State (right column) ---- */
  const [principal, setPrincipal] = React.useState<PrincipalOption>("USDC");
  const [loanLtv, setLoanLtv] = React.useState(80); // 0 - 100
  const [liquidationLtv, setLiquidationLtv] = React.useState(85); // 0 - 100
  const [maturity, setMaturity] = React.useState(90); // 7 - 365
  const [offerDuration, setOfferDuration] = React.useState(7); // 1 - 30
  const [chain, setChain] = React.useState<ChainOption>("Ethereum Mainnet");

  /* ---- Idle pulse animation (non-interactive / marketing mode) ---- */
  const [pulse, setPulse] = React.useState(false);
  React.useEffect(() => {
    if (interactive) return;
    const id = setInterval(() => setPulse((p) => !p), 2000);
    return () => clearInterval(id);
  }, [interactive]);

  return (
    <div
      className={cn(
        "rounded-lg border border-[rgba(255,255,255,0.08)] overflow-hidden",
        !interactive && "select-none",
        className
      )}
    >
      {/* ---- Title bar ---- */}
      <div className="flex items-center h-10 px-4 bg-[#222222] border-b border-[rgba(255,255,255,0.08)]">
        {/* Traffic-light dots */}
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <span className="w-3 h-3 rounded-full bg-[#28CA42]" />
        </div>
        {/* Centered title */}
        <span className="flex-1 text-center text-[12px] font-[family-name:var(--font-mono)] text-[var(--foreground-muted)] tracking-wide select-none">
          deal-parameters.config
        </span>
        {/* Spacer to balance dots */}
        <div className="w-[52px]" />
      </div>

      {/* ---- Body ---- */}
      <div
        className={cn(
          "bg-[#1a1a1a] p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 transition-opacity duration-1000",
          !interactive && pulse && "opacity-95"
        )}
      >
        {/* ======================== LEFT COLUMN ======================== */}
        <div className="flex flex-col gap-6">
          {/* 1. ORACLE SELECTION */}
          <div>
            <Label>Oracle Selection</Label>
            <Select<OracleOption>
              value={oracle}
              options={["Chainlink", "RedStone", "Custom"]}
              onChange={setOracle}
              disabled={!interactive}
            />
          </div>

          {/* 2. APR */}
          <div>
            <Label>APR</Label>
            <Value>
              Fixed {apr}% + 2% o.fee
            </Value>
            <Slider
              min={0}
              max={15}
              step={0.5}
              value={apr}
              onChange={setApr}
              disabled={!interactive}
            />
          </div>

          {/* 3. MAX LIQUIDITY CAP */}
          <div>
            <Label>Max Liquidity Cap</Label>
            <Value>{formatK(maxLiquidity)} USDC</Value>
            <Slider
              min={10_000}
              max={2_000_000}
              step={10_000}
              value={maxLiquidity}
              onChange={setMaxLiquidity}
              disabled={!interactive}
            />
          </div>

          {/* 4. CALL OPTION */}
          <div>
            <Label>Call Option</Label>
            <div className="flex flex-col gap-3">
              <Toggle
                label="Eligibility: 30 days"
                enabled={callEligibility}
                onChange={setCallEligibility}
                disabled={!interactive}
              />
              <Toggle
                label="Window: 48h"
                enabled={callWindow}
                onChange={setCallWindow}
                disabled={!interactive}
              />
            </div>
          </div>

          {/* 5. MIN COLLATERAL */}
          <div>
            <Label>Min Collateral</Label>
            <Value>{formatK(minCollateral)} USDC</Value>
            <Slider
              min={1_000}
              max={500_000}
              step={1_000}
              value={minCollateral}
              onChange={setMinCollateral}
              disabled={!interactive}
            />
          </div>
        </div>

        {/* ======================== RIGHT COLUMN ======================== */}
        <div className="flex flex-col gap-6">
          {/* 1. PRINCIPAL TYPE */}
          <div>
            <Label>Principal Type</Label>
            <Select<PrincipalOption>
              value={principal}
              options={["USDC", "USDT", "DAI"]}
              onChange={setPrincipal}
              disabled={!interactive}
            />
          </div>

          {/* 2. LOAN LTV + LIQUIDATION LTV */}
          <div>
            <Label>Loan LTV + Liquidation LTV</Label>
            <Value>{loanLtv}% / {liquidationLtv}%</Value>
            <DualSlider
              min={0}
              max={100}
              step={1}
              valueLow={loanLtv}
              valueHigh={liquidationLtv}
              onChangeLow={setLoanLtv}
              onChangeHigh={setLiquidationLtv}
              disabled={!interactive}
            />
          </div>

          {/* 3. MATURITY PERIOD */}
          <div>
            <Label>Maturity Period</Label>
            <Value>{maturity} days</Value>
            <Slider
              min={7}
              max={365}
              step={1}
              value={maturity}
              onChange={setMaturity}
              disabled={!interactive}
            />
          </div>

          {/* 4. OFFER DURATION */}
          <div>
            <Label>Offer Duration</Label>
            <Value>{offerDuration} days</Value>
            <Slider
              min={1}
              max={30}
              step={1}
              value={offerDuration}
              onChange={setOfferDuration}
              disabled={!interactive}
            />
          </div>

          {/* 5. CHAIN SUPPORT */}
          <div>
            <Label>Chain Support</Label>
            <Select<ChainOption>
              value={chain}
              options={["Ethereum Mainnet", "Arbitrum", "Base"]}
              onChange={setChain}
              disabled={!interactive}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
