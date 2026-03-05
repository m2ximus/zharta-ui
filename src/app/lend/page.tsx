"use client";

import { AppNav } from "@/components/layout/app-nav";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LoanRequestsTable } from "@/components/lend/loan-requests-table";
import { ActiveLoansTable } from "@/components/lend/active-loans-table";
import { MarketsTable } from "@/components/lend/markets-table";
import { Plus } from "lucide-react";

export default function LendPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <AppNav />

      <main className="mx-auto max-w-[1440px] px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-[family-name:var(--font-display)] text-3xl text-[var(--foreground)]">
            Lend
          </h1>
          <Button className="rounded-full gap-2">
            <Plus className="w-4 h-4" />
            Add Open Offer
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="loan-requests">
          <TabsList>
            <TabsTrigger value="loan-requests">Loan Requests</TabsTrigger>
            <TabsTrigger value="active-loans">Active Loans</TabsTrigger>
            <TabsTrigger value="markets">Markets</TabsTrigger>
          </TabsList>

          <TabsContent value="loan-requests" className="mt-6">
            <LoanRequestsTable />
          </TabsContent>

          <TabsContent value="active-loans" className="mt-6">
            <ActiveLoansTable />
          </TabsContent>

          <TabsContent value="markets" className="mt-6">
            <MarketsTable />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
