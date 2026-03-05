"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, FileX } from "lucide-react";
import { AppNav } from "@/components/layout/app-nav";
import { PageTransition } from "@/components/shared/page-transition";
import { LoanSidebar } from "@/components/loan-detail/loan-sidebar";
import { LoanRequestCard } from "@/components/loan-detail/loan-request-card";
import { OffersTable } from "@/components/loan-detail/offers-table";
import { ActiveLoansTab } from "@/components/loan-detail/active-loans-tab";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { loanRequests, activeLoans } from "@/data/loans";
import { offers } from "@/data/offers";

export default function LoanDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  // Look up the loan request, fallback to first if not found
  const loan = loanRequests.find((l) => l.id === id) ?? loanRequests[0];

  // Filter offers for this loan request; fallback to all offers if none match
  const loanOffers = offers.filter((o) => o.loanRequestId === loan.id);
  const displayOffers = loanOffers.length > 0 ? loanOffers : offers;

  // Filter active loans by matching the owner (borrower) address
  const relatedLoans = activeLoans.filter(
    (al) => al.borrower === loan.owner
  );

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <AppNav />

      <main className="mx-auto max-w-[1440px] px-6 lg:px-8 py-6">
        <PageTransition>
          {/* Back button */}
          <div className="mb-6">
            <Button variant="ghost" asChild className="gap-1.5 -ml-3 text-[var(--foreground-muted)] hover:text-[var(--foreground)]">
              <Link href="/lend">
                <ArrowLeft className="w-4 h-4" />
                Back to Lend
              </Link>
            </Button>
          </div>

          {/* Page header */}
          <div className="flex items-center gap-3 mb-6">
            <h1 className="text-2xl font-[family-name:var(--font-display)] font-bold text-[var(--foreground)]">
              Loan Request
            </h1>
            <span className="font-[family-name:var(--font-mono)] text-sm text-[var(--foreground-muted)]">
              {loan.id}
            </span>
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left sidebar */}
            <div className="lg:col-span-3">
              <div className="lg:sticky lg:top-20">
                <LoanSidebar
                  collateralAsset={loan.collateralAsset}
                  owner={loan.owner}
                />
              </div>
            </div>

            {/* Main content */}
            <div className="lg:col-span-9 flex flex-col gap-6">
              {/* Loan request card */}
              <LoanRequestCard loan={loan} />

              {/* Tabs */}
              <Tabs defaultValue="offers">
                <TabsList>
                  <TabsTrigger value="offers">
                    Offers
                    {displayOffers.length > 0 && (
                      <span className="ml-1.5 inline-flex items-center justify-center rounded-full bg-[var(--color-primary)]/20 text-[var(--color-primary)] text-[10px] font-[family-name:var(--font-mono)] font-semibold w-5 h-5">
                        {displayOffers.length}
                      </span>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="active-loans">
                    Active Loans
                    {relatedLoans.length > 0 && (
                      <span className="ml-1.5 inline-flex items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-[family-name:var(--font-mono)] font-semibold w-5 h-5">
                        {relatedLoans.length}
                      </span>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="past-loans">Past Loans</TabsTrigger>
                </TabsList>

                <TabsContent value="offers" className="mt-4">
                  <OffersTable offers={displayOffers} />
                </TabsContent>

                <TabsContent value="active-loans" className="mt-4">
                  <ActiveLoansTab loans={relatedLoans} />
                </TabsContent>

                <TabsContent value="past-loans" className="mt-4">
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="mb-4 rounded-[3px] bg-[var(--background-secondary)] p-3">
                      <FileX className="w-8 h-8 text-[var(--foreground-muted)]" />
                    </div>
                    <p className="text-sm text-[var(--foreground-muted)]">
                      No past loans
                    </p>
                    <p className="text-xs text-[var(--foreground-muted)] mt-1">
                      Past loans will appear here once completed
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </PageTransition>
      </main>
    </div>
  );
}
