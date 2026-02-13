"use client";

import React, { useState, useEffect } from "react";

import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageHeader } from "@/components/layout/page-header";

import { Pagination } from "@/components/ui/pagination";
import EmptyState from "@/components/features/common/EmptyState";
import { useBlocks } from "@/hooks/useBlocks";
import BlocksFilters from "@/components/features/explorer/blocks/BlocksFilters";
import BlocksGrid from "@/components/features/explorer/blocks/BlocksGrid";
import BlocksTable from "@/components/features/explorer/blocks/BlocksTable";
import BlocksSkeleton from "@/components/features/explorer/blocks/BlocksSkeleton";
import { Button } from "@/components/ui/button";
import { Grid3x3, List } from "lucide-react";

export default function BlocksPage() {
  const [view, setView] = useState<"grid" | "table">("grid");

  const {
    blocks,
    loading,
    page,
    limit,
    count,
    filters,
    resetFilters,
    fetchBlocks,
    setPage,
  } = useBlocks();

  const hasBlocks = blocks.length > 0;

  const onViewChange = (view: "table" | "grid") => {
    setView(view);
  };
  useEffect(() => {
    fetchBlocks();
  }, [page, limit, filters]);

  useEffect(() => {
    return () => resetFilters();
  }, []);

  return (
    <DashboardShell>
      <PageHeader
        title="Blockchain Blocks"
        description="All blocks produced on the blockchain"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Explorer" },
          { label: "Blocks" },
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

      {/* Filters / View Switch */}
      <BlocksFilters />

      {/* Loading */}
      {loading && <BlocksSkeleton view={view} />}

      {/* Empty */}
      {!loading && !hasBlocks && (
        <EmptyState
          type={filters ? "noResults" : "blocks"}
        />
      )}

      {/* Content */}
      {!loading && hasBlocks && (
        <>
          {view === "grid" && <BlocksGrid blocks={blocks} />}
          {view === "table" && <BlocksTable blocks={blocks} />}
        </>
      )}

      {/* Pagination */}
      <Pagination page={page} limit={limit} total={count} setPage={setPage} />
    </DashboardShell>
  );
}
