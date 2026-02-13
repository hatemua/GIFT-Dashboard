"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import TransactionOrdersFilters from "@/components/features/transactions/orders/TransactionOrdersFilters";
import TransactionOrdersSkeleton from "@/components/features/transactions/orders/TransactionOrdersSkeleton";
import TransactionOrdersGrid from "@/components/features/transactions/orders/TransactionOrdersGrid";
import TransactionOrdersTable from "@/components/features/transactions/orders/TransactionOrdersTable";
import { useTransaction } from "@/hooks/useTransaction";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Grid3x3, List, Plus } from "lucide-react";
import EmptyState from "@/components/features/common/EmptyState";
import { Pagination } from "@/components/ui/pagination";
import { useAuthStore } from "@/store/authStore";

export default function TransactionOrdersPage() {
  const { isAdmin } = useAuthStore();

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
    resetFilters,
  } = useTransaction();

  const onViewChange = (newView: "grid" | "table") => setView(newView);

  useEffect(() => {
    fetchTransactions();
  }, [page, limit, filters]);

  useEffect(() => {
    return () => resetFilters();
  }, []);

  return (
    <DashboardShell>
      <PageHeader
        title="Transaction Orders"
        description="Manage all asset transaction orders"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Transactions", href: "/transactions/orders" },
        ]}
        action={
          <div className="flex gap-2">
            {isAdmin && (
              <Link href="/transactions/new">
                <Button variant="gold">
                  <Plus className="h-4 w-4" />
                  New Transaction
                </Button>
              </Link>
            )}
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
          </div>
        }
      />

      {/* Filters + search + actions */}
      <TransactionOrdersFilters />

      {/* Content */}
      {loading ? (
        <TransactionOrdersSkeleton view={view} />
      ) : transactions.length === 0 ? (
        <EmptyState type={filters ? "noResults" : "transactions"} />
      ) : view === "grid" ? (
        <TransactionOrdersGrid transactions={transactions} />
      ) : (
        <TransactionOrdersTable transactions={transactions} />
      )}

      {/* Pagination */}
      {!loading && count > limit && (
        <Pagination page={page} limit={limit} total={count} setPage={setPage} />
      )}
    </DashboardShell>
  );
}
