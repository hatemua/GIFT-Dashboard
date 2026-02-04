"use client";

import React from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";

import AccountsFilters from "@/components/features/assets/accounts/list/AccountsFilters";
import AccountsSkeleton from "@/components/features/assets/accounts/list/AccountsSkeleton";
import AccountsGrid from "@/components/features/assets/accounts/list/AccountsGrid";
import AccountsTable from "@/components/features/assets/accounts/list/AccountsTable";

import { useGoldAccount } from "@/hooks/useGoldAccount";
import { Pagination } from "@/components/ui/pagination";
import EmptyState from "@/components/features/common/EmptyState";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function GoldAccountsPage() {
  const { accounts, totalCount, page, limit, loading, setPage } =
    useGoldAccount();

  const [view, setView] = React.useState<"grid" | "table">("grid");

  const handleViewChange = (newView: "grid" | "table") => setView(newView);

  return (
    <DashboardShell>
      <PageHeader
        title="Gold Accounts"
        description="List of all gold accounts in the system"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Gold Accounts", href: "/gold-accounts" },
        ]}
        action={
          <Link href="/assets/accounts/new">
            <Button variant="gold">
              <Plus className="h-4 w-4" />
              New Account
            </Button>
          </Link>
        }
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
        setPage={setPage}
      />
    </DashboardShell>
  );
}
