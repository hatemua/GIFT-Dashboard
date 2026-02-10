"use client";

import React, { useEffect } from "react";
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
import { Grid3x3, List, Plus } from "lucide-react";

export default function GoldAccountsPage() {
  const {
    accounts,
    totalCount,
    page,
    limit,
    loading,
    filters,
    setPage,
    fetchAccounts,
  } = useGoldAccount();

  const [view, setView] = React.useState<"grid" | "table">("grid");

  const onViewChange = (newView: "grid" | "table") => setView(newView);

  useEffect(() => {
    fetchAccounts();
  }, [page, limit, filters]);

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
          <div className="flex gap-2">
            <Link href="/assets/accounts/new">
              <Button variant="gold">
                <Plus className="h-4 w-4" />
                New Account
              </Button>
            </Link>
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
            </div>{" "}
          </div>
        }
      />

      {/* Filters / View Toggle */}
      <AccountsFilters />

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
