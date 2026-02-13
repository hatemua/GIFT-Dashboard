"use client";

import EmptyState from "@/components/features/common/EmptyState";
import MembersFilters from "@/components/features/members/list/MembersFilters";
import MembersGrid from "@/components/features/members/list/MembersGrid";
import { MembersSkeleton } from "@/components/features/members/list/MembersSkeleton";
import MembersTable from "@/components/features/members/list/MembersTable";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
import { useMember } from "@/hooks/useMember";
import { useToast } from "@/providers/toast-provider";
import { ViewMode } from "@/types";
import { Grid3x3, List } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

export default function BlacklistPage() {
  const { showToast } = useToast();

  const {
    blacklistedMembers,
    count,
    page,
    limit,
    loading,
    filters,
    fetchBlacklistedMembers,
    removeFromBlacklist,
    setPage,
    resetFilters,
  } = useMember();
  const [view, setView] = useState<ViewMode>("grid");

  const onViewChange = (newView: "grid" | "table") => setView(newView);

  const handleRemove = useCallback(async (member_gic: string) => {
    try {
      await removeFromBlacklist(member_gic);

      showToast({
        title: "Success",
        message: "Member blacklisted successfully",
        variant: "success",
      });
    } catch (err: any) {
      showToast({
        title: "Error",
        message: err?.message || "Failed to blacklist member",
        variant: "error",
      });
    }
  }, []);

  useEffect(() => {
    fetchBlacklistedMembers();
  }, [page, limit, filters]);

  useEffect(() => {
    return () => resetFilters();
  }, []);

  return (
    <DashboardShell>
      <PageHeader
        title="Blacklisted Members"
        description="Members restricted from accessing the platform or performing transactions"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Blacklist" },
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
      <MembersFilters />

      {loading && <MembersSkeleton view={view} />}

      {!loading && blacklistedMembers.length === 0 && (
        <EmptyState type={filters ? "noResults" : "blacklist"} />
      )}

      {view === "table" && !loading && (
        <MembersTable members={blacklistedMembers} onRemove={handleRemove} />
      )}

      {view === "grid" && !loading && (
        <MembersGrid members={blacklistedMembers} onRemove={handleRemove} />
      )}

      {/* Pagination */}
      <Pagination page={page} limit={limit} total={count} setPage={setPage} />
    </DashboardShell>
  );
}
