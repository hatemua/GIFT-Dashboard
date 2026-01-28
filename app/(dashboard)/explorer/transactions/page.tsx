"use client";

import React, { useState, useEffect } from "react";

import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageHeader } from "@/components/layout/page-header";
import TransactionsFilters from "@/components/features/explorer/transactions/TransactionsFilters";
import TransactionsSkeleton from "@/components/features/explorer/transactions/TransactionsSkeleton";
import TransactionsGrid from "@/components/features/explorer/transactions/TransactionsGrid";
import TransactionsTable from "@/components/features/explorer/transactions/TransactionsTable";
import { useBlockchainTransactions } from "@/hooks/useBlockchainTransaction";
import { Pagination } from "@/components/ui/pagination";
import EmptyState from "@/components/features/common/EmptyState";

export default function BlockchainTransactionsPage() {
  const [view, setView] = useState<"grid" | "table">("grid");

  const {
    transactions,
    loading,
    page,
    limit,
    totalCount,
    fetchTransactions,
    setPage,
  } = useBlockchainTransactions();

  const hasTransactions = transactions.length > 0;

  // Page-based pagination
  const handleNextPage = () => {
    if (page < Math.ceil(totalCount / limit)) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  // Optional: refetch when pagination changes
  useEffect(() => {
    fetchTransactions(page, limit);
  }, [page, limit]);

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
      {!loading && !hasTransactions && <EmptyState type="blockchainTransactions" />}

      {/* Content */}
      {!loading && hasTransactions && (
        <>
          {view === "grid" && <TransactionsGrid transactions={transactions} />}

          {view === "table" && (
            <TransactionsTable transactions={transactions} />
          )}
        </>
      )}
      {/* Pagination */}
      <Pagination
        page={page}
        limit={limit}
        total={totalCount}
        onPrev={handlePrevPage}
        onNext={handleNextPage}
      />
    </DashboardShell>
  );
}
