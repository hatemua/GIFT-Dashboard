"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import TransactionOrdersFilters from "@/components/features/transactions/orders/TransactionOrdersFilters";
import TransactionOrdersSkeleton from "@/components/features/transactions/orders/TransactionOrdersSkeleton";
import EmptyTransactionOrders from "@/components/features/transactions/orders/EmptyTransactionOrders";
import TransactionOrdersGrid from "@/components/features/transactions/orders/TransactionOrdersGrid";
import TransactionOrdersTable from "@/components/features/transactions/orders/TransactionOrdersTable";
import { useTransaction } from "@/hooks/useTransaction";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function TransactionOrdersPage() {
  const [view, setView] = useState<"grid" | "table">("grid");
  const { transactions, loading } = useTransaction();

  const handleViewChange = (newView: "grid" | "table") => setView(newView);

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
          <Link href="/transactions/new">
            <Button variant="gold">
              <Plus className="h-4 w-4" />
              New Transaction
            </Button>
          </Link>
        }
      />

      {/* Filters + search + actions */}
      <TransactionOrdersFilters view={view} onViewChange={handleViewChange} />

      {/* Content */}
      {loading ? (
        <TransactionOrdersSkeleton />
      ) : transactions.length === 0 ? (
        <EmptyTransactionOrders />
      ) : view === "grid" ? (
        <TransactionOrdersGrid transactions={transactions} />
      ) : (
        <TransactionOrdersTable transactions={transactions} />
      )}
    </DashboardShell>
  );
}
