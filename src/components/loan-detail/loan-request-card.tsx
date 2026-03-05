import { AssetBadge } from "@/components/shared/asset-badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPercent, formatDate, formatDaysRemaining } from "@/lib/utils";
import { Pencil } from "lucide-react";
import type { LoanRequest } from "@/types";

interface LoanRequestCardProps {
  loan: LoanRequest;
}

function getDaysRemainingColor(expiresAt: string): string {
  const diff = new Date(expiresAt).getTime() - Date.now();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  if (days < 0) return "text-red-400";
  if (days < 3) return "text-red-400";
  if (days <= 7) return "text-amber-400";
  return "text-emerald-400";
}

export function LoanRequestCard({ loan }: LoanRequestCardProps) {
  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="font-[family-name:var(--font-display)]">
            Loan Request Details
          </CardTitle>
          <Badge variant="outline" className="font-[family-name:var(--font-mono)] text-xs">
            {loan.id}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
          {/* Collateral */}
          <div>
            <p className="text-xs text-[var(--foreground-muted)] mb-1">Collateral</p>
            <div className="flex items-center gap-2">
              <span className="font-[family-name:var(--font-mono)] text-sm text-[var(--foreground)]">
                {loan.collateralAmount.toLocaleString()}
              </span>
              <AssetBadge asset={loan.collateralAsset} size="sm" />
            </div>
          </div>

          {/* Principal */}
          <div>
            <p className="text-xs text-[var(--foreground-muted)] mb-1">Principal</p>
            <div className="flex items-center gap-2">
              <span className="font-[family-name:var(--font-mono)] text-sm text-[var(--foreground)]">
                {loan.principalAmount.toLocaleString()}
              </span>
              <AssetBadge asset={loan.principalAsset} size="sm" />
            </div>
          </div>

          {/* APR */}
          <div>
            <p className="text-xs text-[var(--foreground-muted)] mb-1">APR</p>
            <span className="font-[family-name:var(--font-mono)] text-sm text-[var(--color-primary)]">
              {formatPercent(loan.apr)}
            </span>
          </div>

          {/* Max LTV */}
          <div>
            <p className="text-xs text-[var(--foreground-muted)] mb-1">Max LTV</p>
            <span className="font-[family-name:var(--font-mono)] text-sm text-[var(--foreground)]">
              {formatPercent(loan.maxLtv, 0)}
            </span>
          </div>

          {/* Maturity */}
          <div>
            <p className="text-xs text-[var(--foreground-muted)] mb-1">Maturity</p>
            <span className="font-[family-name:var(--font-mono)] text-sm text-[var(--foreground)]">
              {formatDate(loan.maturityDate)}
            </span>
          </div>

          {/* Expires */}
          <div>
            <p className="text-xs text-[var(--foreground-muted)] mb-1">Expires</p>
            <span
              className={`font-[family-name:var(--font-mono)] text-sm ${getDaysRemainingColor(loan.expiresAt)}`}
            >
              {formatDaysRemaining(loan.expiresAt)}
            </span>
          </div>

          {/* Callable */}
          <div>
            <p className="text-xs text-[var(--foreground-muted)] mb-1">Callable</p>
            <Badge variant={loan.callable ? "warning" : "secondary"}>
              {loan.callable ? "Yes" : "No"}
            </Badge>
          </div>

          {/* Partial Liquidation */}
          <div>
            <p className="text-xs text-[var(--foreground-muted)] mb-1">Partial Liquidation</p>
            <Badge variant={loan.liquidationType === "partial" ? "success" : "secondary"}>
              {loan.liquidationType === "partial" ? "Yes" : "No"}
            </Badge>
          </div>
        </div>

        {/* Edit button */}
        <div className="mt-6 pt-5 border-t border-[var(--border)]">
          <Button variant="outline" className="w-full sm:w-auto">
            <Pencil className="w-4 h-4" />
            Edit Loan Request
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
