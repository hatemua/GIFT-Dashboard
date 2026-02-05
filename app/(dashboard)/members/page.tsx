"use client";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import {  Plus, Grid3x3, List } from "lucide-react";
import {  useEffect, useState } from "react";
import CreateMemberModal from "@/components/features/members/new/CreateMemberModal";
import MembersFilters from "@/components/features/members/list/MembersFilters";
import { useMember } from "@/hooks/useMember";
import { MembersSkeleton } from "@/components/features/members/list/MembersSkeleton";
import EmptyState from "@/components/features/common/EmptyState";
import MembersGrid from "@/components/features/members/list/MembersGrid";
import MembersTable from "@/components/features/members/list/MembersTable";
import { Pagination } from "@/components/ui/pagination";

export default function MembersPage() {
  const [view, setView] = useState<"grid" | "table">("grid");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const {
    members,
    loading,
    page,
    limit,
    count,
    filters,
    setPage,
    fetchMembers,
  } = useMember();

  const hasMembers = members.length > 0;

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const onViewChange = (view: "table" | "grid") => {
    setView(view);
  };

  useEffect(() => {
    fetchMembers();
  }, [page, limit, filters]);

  return (
    <DashboardShell>
      <PageHeader
        title="GIFT Members"
        description="Network of gold ecosystem participants"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Members" },
        ]}
        action={
          <div className="flex gap-2">
            <Button variant="gold" onClick={handleOpenModal}>
              <Plus className="h-4 w-4" />
              Add Member
            </Button>
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

      <MembersFilters />
      {loading && <MembersSkeleton view={view} />}
      {!loading && !hasMembers && <EmptyState type="members" />}
      {!loading && hasMembers && (
        <>
          {view === "grid" && <MembersGrid members={members} />}

          {view === "table" && <MembersTable members={members} />}
        </>
      )}
      <Pagination page={page} limit={limit} total={count} setPage={setPage} />
      {/* Create Member Modal */}
      <CreateMemberModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </DashboardShell>
  );
}
