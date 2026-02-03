"use client";

import BlacklistFilters from "@/components/features/admin/blacklist/BlacklistFilters";
import BlacklistGrid from "@/components/features/admin/blacklist/BlacklistGrid";
import BlacklistSkeleton from "@/components/features/admin/blacklist/BlacklistSkeleton";
import BlacklistTable from "@/components/features/admin/blacklist/BlacklistTable";
import EmptyState from "@/components/features/common/EmptyState";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Pagination } from "@/components/ui/pagination";
import { useMember } from "@/hooks/useMember";
import { ViewMode } from "@/types";
import { useCallback, useEffect, useState } from "react";

export default function BlacklistPage() {
  const {
    blacklistedMembers,
    totalCount,
    page,
    limit,
    loading,
    fetchBlacklistedMembers,
    removeFromBlacklist,
    setPage,
  } = useMember();
  const [view, setView] = useState<ViewMode>("grid");

  const handleViewChange = (newView: "grid" | "table") => setView(newView);

  const handleRemove = useCallback((member_gic: string) => {
    removeFromBlacklist(member_gic);
  }, []);

  useEffect(() => {
    fetchBlacklistedMembers(page, limit);
  }, [page, limit]);

  return (
    <DashboardShell>
      <PageHeader
        title="Blacklisted Members"
        description="Members restricted from accessing the platform or performing transactions"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Blacklist" },
        ]}
      />
      <BlacklistFilters view={view} onViewChange={handleViewChange} />

      {loading && <BlacklistSkeleton view={view} />}

      {!loading && blacklistedMembers.length === 0 && (
        <EmptyState type="blacklist" />
      )}

      {view === "table" && (
        <BlacklistTable members={blacklistedMembers} onRemove={handleRemove} />
      )}

      {view === "grid" && (
        <BlacklistGrid members={blacklistedMembers} onRemove={handleRemove} />
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