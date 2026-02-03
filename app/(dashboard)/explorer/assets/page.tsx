"use client";

import React, { useEffect } from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Pagination } from "@/components/ui/pagination";

import { useAsset } from "@/hooks/useAsset";
import AssetsFilters from "@/components/features/assets/gold-assets/AssetsFilters";
import AssetsGrid from "@/components/features/assets/gold-assets/AssetsGrid";
import AssetsSkeleton from "@/components/features/assets/gold-assets/AssetsSkeleton";
import AssetsTable from "@/components/features/assets/gold-assets/AssetsTable";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import EmptyState from "@/components/features/common/EmptyState";

export default function ExplorerAssetsPage() {
  const { assets, loading, totalCount, page, limit, fetchAssets, setPage } =
    useAsset();
  const [view, setView] = React.useState<"grid" | "table">("grid");

  const handleViewChange = (newView: "grid" | "table") => setView(newView);

  useEffect(() => {
    fetchAssets(page, limit);
  }, [page, limit]);

  return (
    <DashboardShell>
      <PageHeader
        title="Asset Explorer"
        description="All gold assets minted on the blockchain"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Explorer", href: "/explorer" },
          { label: "Assets" },
        ]}
        action={
          <Link href="/assets/mint">
            <Button variant="outline">
              <Plus className="h-4 w-4" />
              Mint Asset
            </Button>
          </Link>
        }
      />

      {/* Filters + View toggle */}
      <AssetsFilters view={view} onViewChange={handleViewChange} />

      {/* Content */}
      {loading ? (
        <AssetsSkeleton view={view} />
      ) : assets.length === 0 ? (
        <EmptyState type="assets" />
      ) : view === "grid" ? (
        <AssetsGrid assets={assets} />
      ) : (
        <AssetsTable assets={assets} />
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
