"use client";

import React from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";

import AccountsFilters from "@/components/features/assets/accounts/AccountsFilters";
import AccountsSkeleton from "@/components/features/assets/accounts/AccountsSkeleton";
import AccountsGrid from "@/components/features/assets/accounts/AccountsGrid";
import AccountsTable from "@/components/features/assets/accounts/AccountsTable";

import { useGoldAccount } from "@/hooks/useGoldAccount";
import { Pagination } from "@/components/ui/pagination";
import EmptyState from "@/components/features/common/EmptyState";

export default function GoldAccountsPage() {
  const {
    accounts,
    totalCount,
    page,
    limit,
    loading,
    fetchAccounts,
    setPage,
  } = useGoldAccount();

  const [view, setView] = React.useState<"grid" | "table">("grid");

  const handleViewChange = (newView: "grid" | "table") => setView(newView);

  // Page-based pagination
  const handleNextPage = () => {
    if (page < Math.ceil(totalCount / limit)) {
      setPage(page + 1);
      fetchAccounts(limit, page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      fetchAccounts(limit, page - 1);
    }
  };

  return (
    <DashboardShell>
      <PageHeader
        title="Gold Accounts"
        description="List of all gold accounts in the system"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Gold Accounts", href: "/gold-accounts" },
        ]}
      />

      {/* Filters / View Toggle */}
      <AccountsFilters view={view} onViewChange={handleViewChange} />

      {/* Content */}
      {loading ? (
        <AccountsSkeleton count={6} />
      ) : accounts.length === 0 ? (
        <EmptyState type="goldAccounts" />
      ) : view === "grid" ? (
        <AccountsGrid accounts={accounts} />
      ) : (
        <Card className="shadow-sm hover:shadow-md transition">
          <CardContent className="p-0">
            <AccountsTable accounts={accounts} />
          </CardContent>
        </Card>
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
