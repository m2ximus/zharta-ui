export type LoanStatus = "active" | "pending" | "matured" | "liquidated" | "defaulted" | "callable";

export type CollateralType = "WBTC" | "WETH" | "cbBTC" | "ACRED" | "wstETH" | "rETH";

export type PrincipalType = "USDC" | "USDT" | "DAI";

export interface Asset {
  symbol: CollateralType | PrincipalType;
  name: string;
  icon: string;
  color: string;
  decimals: number;
}

export interface LoanRequest {
  id: string;
  collateralAsset: CollateralType;
  collateralAmount: number;
  principalAsset: PrincipalType;
  principalAmount: number;
  apr: number;
  maxLtv: number;
  maturityDate: string;
  expiresAt: string;
  callable: boolean;
  liquidationType: "full" | "partial";
  owner: string;
  lastUpdated: string;
  totalOffers: number;
}

export interface ActiveLoan {
  id: string;
  status: LoanStatus;
  collateralAsset: CollateralType;
  collateralAmount: number;
  principalAsset: PrincipalType;
  principalAmount: number;
  outstandingDebt: number;
  originFee: number;
  currentLtv: number;
  liquidationLtv: number;
  apr: number;
  effectiveApr: number;
  maturityDate: string;
  callable: boolean;
  callableDate?: string;
  lender: string;
  borrower: string;
  startDate: string;
}

export interface Market {
  id: string;
  collateralAsset: CollateralType;
  principalAsset: PrincipalType;
  oracle: string;
  availableLiquidity: number;
  totalDebt: number;
  totalCollateral: number;
  avgLtv: number;
  activeLoans: number;
  loanRequests: number;
}

export interface Offer {
  id: string;
  loanRequestId: string;
  principalAmount: number;
  minCollateral: number;
  maxLtv: number;
  originFee: number;
  apr: number;
  effectiveApr: number;
  maturityDays: number;
  callable: boolean;
  callWindow: number;
  oracle: string;
  liquidationLtv: number;
  lender: string;
  expiresAt: string;
}

export interface Alert {
  id: string;
  type: "callable" | "maturity" | "ltv-warning" | "liquidation" | "payment";
  severity: "info" | "warning" | "critical";
  title: string;
  description: string;
  loanId: string;
  timestamp: string;
}

export interface PortfolioStats {
  totalDeployed: number;
  activeLoans: number;
  avgApr: number;
  accruedInterest: number;
}

export interface PortfolioLoan {
  id: string;
  collateralAsset: CollateralType;
  principalAsset: PrincipalType;
  principalAmount: number;
  apr: number;
  maturityDate: string;
  status: LoanStatus;
  currentLtv: number;
  accruedInterest: number;
}

export interface HistoricalDataPoint {
  date: string;
  value: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
}
