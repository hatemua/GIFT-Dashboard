"use client";

import { useEffect, useState } from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Grid3x3, List, Plus } from "lucide-react";

import UsersFilters from "@/components/features/admin/users/list/UsersFilters";
import UsersGrid from "@/components/features/admin/users/list/UsersGrid";
import UsersTable from "@/components/features/admin/users/list/UsersTable";
import UsersSkeleton from "@/components/features/admin/users/list/UsersSkeleton";
import { Pagination } from "@/components/ui/pagination";
import { useUser } from "@/hooks/useUser";
import EmptyState from "@/components/features/common/EmptyState";
import { ViewMode } from "@/types";
import CreateUserModal from "@/components/features/admin/users/new/NewUserModal";
import { useAuthStore } from "@/store/authStore";

export default function UsersPage() {
  const { isAdmin } = useAuthStore();
  const {
    users,
    count,
    filters,
    page,
    limit,
    loading,
    resetFilters,
    fetchUsers,
    setPage,
  } = useUser();

  const [view, setView] = useState<ViewMode>("grid");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onViewChange = (newView: "grid" | "table") => setView(newView);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  useEffect(() => {
    fetchUsers();
  }, [page, limit, filters]);

  useEffect(() => {
    return () => resetFilters();
  }, []);

  return (
    <DashboardShell>
      <PageHeader
        title="Users"
        description="All registered users and their current account status."
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Users" },
        ]}
        action={
          <div className="flex gap-2">
            {isAdmin && (
              <Button variant="gold" onClick={handleOpenModal}>
                <Plus className="h-4 w-4" />
                Add User
              </Button>
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

      {/* Filters */}
      <UsersFilters />

      {/* Content */}
      {loading && <UsersSkeleton />}

      {!loading && users.length === 0 && (
        <EmptyState type={filters ? "noResults" : "users"} />
      )}

      {!loading && users.length > 0 && (
        <>
          {view === "grid" && <UsersGrid users={users} />}
          {view === "table" && <UsersTable users={users} />}
        </>
      )}
      {/* Pagination */}
      <Pagination page={page} limit={limit} total={count} setPage={setPage} />
      <CreateUserModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </DashboardShell>
  );
}
