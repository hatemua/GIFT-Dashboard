"use client";

import React, { useEffect, useState } from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageHeader } from "@/components/layout/page-header";
import { LoadingSkeleton } from "@/components/features/assets/gold-assets/details/LoadingSkeleton";
import EmptyState from "@/components/features/common/EmptyState";
import { useTransaction } from "@/hooks/useTransaction";
import { TransactionHeader } from "@/components/features/transactions/details/TransactionHeader";
import { TransactionAssets } from "@/components/features/transactions/details/TransactionAssets";
import { TransactionValuation } from "@/components/features/transactions/details/TransactionValuation";
import { TransactionSignatures } from "@/components/features/transactions/details/TransactionSignatures";
import { TransactionParties } from "@/components/features/transactions/details/TransactionParties";
import { TransactionEvents } from "@/components/features/transactions/details/TransactionEvents";

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

      <div className="space-y-4">
        {loading || !hasFetched ? (
          <LoadingSkeleton />
        ) : transactionDetails ? (
          <>
            <TransactionHeader transaction={transactionDetails} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <TransactionParties transaction={transactionDetails} />
              <TransactionValuation transaction={transactionDetails} />
            </div>
            <TransactionSignatures transaction={transactionDetails} />
            <TransactionAssets transaction={transactionDetails} />
            <TransactionEvents transactionReference={transactionReference} />
          </>
        ) : (
          <EmptyState type="transactions" />
        )}
      </div>
    </DashboardShell>
  );
}
