import type { Alert } from "@/types";

export const alerts: Alert[] = [
  {
    id: "ALT-001",
    type: "callable",
    severity: "warning",
    title: "Loan callable window open",
    description:
      "Loan AL-004 (ACRED/USDC) has entered its callable window. The lender may call the loan at any time. Ensure sufficient funds are available for early repayment.",
    loanId: "AL-004",
    timestamp: "2026-03-01T09:00:00Z",
  },
  {
    id: "ALT-002",
    type: "maturity",
    severity: "info",
    title: "Loan approaching maturity",
    description:
      "Loan AL-008 (WETH/DAI) matures on April 30, 2026. You have 56 days remaining to arrange repayment or refinancing.",
    loanId: "AL-008",
    timestamp: "2026-03-05T08:00:00Z",
  },
  {
    id: "ALT-003",
    type: "ltv-warning",
    severity: "warning",
    title: "LTV approaching liquidation threshold",
    description:
      "Loan AL-004 (ACRED/USDC) current LTV is 71.8%, which is within 15% of the liquidation threshold at 85%. Consider adding collateral to reduce risk.",
    loanId: "AL-004",
    timestamp: "2026-03-04T16:30:00Z",
  },
  {
    id: "ALT-004",
    type: "liquidation",
    severity: "critical",
    title: "Liquidation risk: high LTV",
    description:
      "Loan AL-012 (WETH/USDC) LTV has risen to 68.5% with a liquidation threshold of 78%. A 14% collateral price decline would trigger liquidation. Immediate action recommended.",
    loanId: "AL-012",
    timestamp: "2026-03-05T06:15:00Z",
  },
  {
    id: "ALT-005",
    type: "callable",
    severity: "warning",
    title: "Loan callable window open",
    description:
      "Loan AL-012 (WETH/USDC) has entered its callable window as of March 1, 2026. The lender may exercise the call option. Prepare for potential early repayment.",
    loanId: "AL-012",
    timestamp: "2026-03-01T09:00:00Z",
  },
  {
    id: "ALT-006",
    type: "payment",
    severity: "info",
    title: "Interest payment accrued",
    description:
      "Loan AL-001 (WBTC/USDC) has accrued $4,875 in interest since origination on January 15, 2026. Current outstanding debt stands at $183,240.",
    loanId: "AL-001",
    timestamp: "2026-03-05T00:00:00Z",
  },
];
