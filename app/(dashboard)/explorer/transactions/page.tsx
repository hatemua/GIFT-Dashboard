"use client";

import React, { useState } from "react";

import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageHeader } from "@/components/layout/page-header";
import TransactionsFilters from "@/components/features/explorer/transactions/TransactionsFilters";
import TransactionsSkeleton from "@/components/features/explorer/transactions/TransactionsSkeleton";
import EmptyTransactions from "@/components/features/explorer/transactions/EmptyTransactions";
import TransactionsGrid from "@/components/features/explorer/transactions/TransactionsGrid";
import TransactionsTable from "@/components/features/explorer/transactions/TransactionsTable";

// UI-only mock data (replace later with real API)
const MOCK_TRANSACTIONS = [
  {
    hash: "0x8fa2...d91c",
    block: 1823401,
    type: "Mint",
    asset: "Gold Bar #A-1021",
    from: "Treasury",
    to: "Vault GIC-001",
    status: "Confirmed",
    timestamp: "2025-01-22 14:32",
  },
  {
    hash: "0x2c91...a3ff",
    block: 1823398,
    type: "Transfer",
    asset: "Gold Bar #A-0994",
    from: "Vault GIC-002",
    to: "Vault GIC-004",
    status: "Confirmed",
    timestamp: "2025-01-22 14:10",
  },
];

export default function BlockchainTransactionsPage() {
  const [view, setView] = useState<"grid" | "table">("grid");
  const [loading] = useState(false);

  const hasTransactions = MOCK_TRANSACTIONS.length > 0;

  return (
    <DashboardShell>
      <PageHeader
        title="Blockchain Transactions"
        description="All on-chain transactions related to gold assets"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Explorer", href: "/explorer" },
          { label: "Transactions" },
        ]}
      />

      {/* Filters / View Switch */}
      <TransactionsFilters view={view} onViewChange={setView} />

      {/* Loading */}
      {loading && <TransactionsSkeleton />}

      {/* Empty */}
      {!loading && !hasTransactions && <EmptyTransactions />}

      {/* Content */}
      {!loading && hasTransactions && (
        <>
          {view === "grid" && (
            <TransactionsGrid transactions={MOCK_TRANSACTIONS} />
          )}

          {view === "table" && (
            <TransactionsTable transactions={MOCK_TRANSACTIONS} />
          )}
        </>
      )}
    </DashboardShell>
  );
}
