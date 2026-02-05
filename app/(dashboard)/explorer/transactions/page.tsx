"use client";

import { useState, useEffect } from "react";

import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageHeader } from "@/components/layout/page-header";
import TransactionsFilters from "@/components/features/explorer/transactions/TransactionsFilters";
import TransactionsSkeleton from "@/components/features/explorer/transactions/TransactionsSkeleton";
import TransactionsGrid from "@/components/features/explorer/transactions/TransactionsGrid";
import TransactionsTable from "@/components/features/explorer/transactions/TransactionsTable";
import { useBlockchainTransactions } from "@/hooks/useBlockchainTransaction";
import { Pagination } from "@/components/ui/pagination";
import EmptyState from "@/components/features/common/EmptyState";
import { Button } from "@/components/ui/button";
import { Grid3x3, List } from "lucide-react";

export default function BlockchainTransactionsPage() {
  const [view, setView] = useState<"grid" | "table">("grid");

  const {
    transactions,
    loading,
    page,
    limit,
    count,
    filters,
    setPage,
    fetchTransactions,
  } = useBlockchainTransactions();

  const hasTransactions = transactions.length > 0;

  const onViewChange = (view: "table" | "grid") => {
    setView(view);
  };

  useEffect(() => {
    fetchTransactions();
  }, [page, limit, filters]);

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
        action={
          <div className="flex rounded-lg border border-border bg-muted/50 p-1 gap-1">
            <Button
              size="icon"
              variant={view === "table" ? "default" : "ghost"}
              onClick={() => onViewChange("table")}
              className="h-8 w-8"
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant={view === "grid" ? "default" : "ghost"}
              onClick={() => onViewChange("grid")}
              className="h-8 w-8"
            >
              <Grid3x3 className="h-4 w-4" />
            </Button>
          </div>
        }
      />

      {/* Filters / View Switch */}
      <TransactionsFilters />

      {/* Loading */}
      {loading && <TransactionsSkeleton view={view} />}

      {/* Empty */}
      {!loading && !hasTransactions && (
        <EmptyState type="blockchainTransactions" />
      )}

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
      <Pagination page={page} limit={limit} total={count} setPage={setPage} />
    </DashboardShell>
  );
}
