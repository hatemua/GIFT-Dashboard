"use client";

import React, { useEffect, useState } from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import EmptyState from "@/components/features/common/EmptyState";
import { useTransaction } from "@/hooks/useTransaction";
import { TransactionHeader } from "@/components/features/transactions/details/TransactionHeader";
import { TransactionAssets } from "@/components/features/transactions/details/TransactionAssets";
import { TransactionValuation } from "@/components/features/transactions/details/TransactionValuation";
import { TransactionSignatures } from "@/components/features/transactions/details/TransactionSignatures";
import { TransactionParties } from "@/components/features/transactions/details/TransactionParties";
import { TransactionEvents } from "@/components/features/transactions/details/TransactionEvents";
import { LoadingSkeleton } from "@/components/features/assets/gold-assets/details/LoadingSkeleton";
import { Wallet, Users, FileText, Activity, Gem, LayoutDashboard } from "lucide-react";
import { Card } from "@/components/ui/card";

interface TransactionOrderDetailsPageProps {
  params: Promise<{ transactionReference: string }>;
}

export default function TransactionOrderDetailsPage({
  params,
}: TransactionOrderDetailsPageProps) {
  const { transactionReference } = React.use(params);
  const { transactionDetails, fetchTransactionByReference, loading } =
    useTransaction();
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (transactionReference) {
      setHasFetched(true);
      fetchTransactionByReference(transactionReference);
    }
  }, [transactionReference, fetchTransactionByReference]);

  return (
    <DashboardShell>
      <PageHeader
        className="mb-6"
        title=""
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Transaction Orders", href: "/transactions/orders" },
          { label: `${transactionReference} (Reference)` },
        ]}
      />

      {loading || !hasFetched ? (
        <LoadingSkeleton />
      ) : transactionDetails ? (
        <Card className="p-4 rounded-2xl border-0 shadow-lg bg-gradient-to-br from-white to-slate-50/50">
          <TransactionHeader transaction={transactionDetails} />

          <Tabs defaultValue="overview" className="space-y-4 mt-3">
            <TabsList className="bg-slate-100 p-1 rounded-xl w-fit gap-1">
              <TabsTrigger
                value="overview"
                className="rounded-lg px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm flex items-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4" />
                Overview
              </TabsTrigger>

              <TabsTrigger
                value="assets"
                className="rounded-lg px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm flex items-center gap-2"
              >
                <Gem className="w-4 h-4" />
                Assets
              </TabsTrigger>

              <TabsTrigger
                value="events"
                className="rounded-lg px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm flex items-center gap-2"
              >
                <Activity className="w-4 h-4" />
                History
              </TabsTrigger>
            </TabsList>

            {/* OVERVIEW TAB */}
            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <TransactionParties transaction={transactionDetails} />
                <TransactionValuation transaction={transactionDetails} />
                <TransactionSignatures transaction={transactionDetails} />
              </div>
            </TabsContent>

            {/* ASSETS TAB */}
            <TabsContent value="assets" className="space-y-4">
              <TransactionAssets transaction={transactionDetails} />
            </TabsContent>

            {/* EVENTS TAB */}
            <TabsContent value="events" className="space-y-4">
              <TransactionEvents transactionReference={transactionReference} />
            </TabsContent>
          </Tabs>
        </Card>
      ) : (
        <EmptyState type="transaction" />
      )}
    </DashboardShell>
  );
}
