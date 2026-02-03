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

export default function BlocksPage() {
  const [view, setView] = useState<"grid" | "table">("grid");

  const { blocks, loading, page, limit, totalCount, fetchBlocks, setPage } =
    useBlocks();

  const hasBlocks = blocks.length > 0;

  useEffect(() => {
    fetchBlocks(page, limit);
  }, [page, limit]);

  return (
    <DashboardShell>
      <PageHeader
        title="Blockchain Blocks"
        description="All blocks produced on the blockchain"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Explorer", href: "/explorer" },
          { label: "Blocks" },
        ]}
      />

      {/* Filters / View Switch */}
      <BlocksFilters view={view} onViewChange={setView} />

      {/* Loading */}
      {loading && <BlocksSkeleton view={view} />}

      {/* Empty */}
      {!loading && !hasBlocks && <EmptyState type="blocks" />}

      {/* Content */}
      {!loading && hasBlocks && (
        <>
          {view === "grid" && <BlocksGrid blocks={blocks} />}
          {view === "table" && <BlocksTable blocks={blocks} />}
        </>
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
