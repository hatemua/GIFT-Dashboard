"use client";

import { useState } from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import UsersFilters from "@/components/features/admin/users/UsersFilters";
import UsersGrid from "@/components/features/admin/users/UsersGrid";
import UsersTable from "@/components/features/admin/users/UsersTable";
import UsersSkeleton from "@/components/features/admin/users/UsersSkeleton";
import { Pagination } from "@/components/ui/pagination";
import { useUser } from "@/hooks/useUser";
import EmptyState from "@/components/features/common/EmptyState";

type ViewMode = "grid" | "table";

export default function UsersPage() {

  const { users, totalCount, page, limit, loading, fetchUsers, setPage } =
    useUser();

  const [view, setView] = useState<ViewMode>("grid");

  const handleViewChange = (newView: "grid" | "table") => setView(newView);
  
  const handleNextPage = () => {
    if (page < Math.ceil(totalCount / limit)) {
      setPage(page + 1);
      fetchUsers(limit, page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      fetchUsers(limit, page - 1);
    }
  };

  return (
    <DashboardShell>
      <PageHeader
        title="Users"
        description="Registered users and account status"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Users" },
        ]}
        action={
          <Button variant="gold">
            <Plus className="h-4 w-4" />
            Add User
          </Button>
        }
      />

      {/* Filters */}
      <UsersFilters view={view} onViewChange={handleViewChange} />

      {/* Content */}
      {loading && <UsersSkeleton />}

      {!loading && users.length === 0 && <EmptyState type="users" />}

      {!loading && users.length > 0 && (
        <>
          {view === "grid" && <UsersGrid users={users} />}
          {view === "table" && <UsersTable users={users} />}
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