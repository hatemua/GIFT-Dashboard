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

export default function GoldAssetsPage() {
  const { assets, loading, totalCount, page, limit, fetchAssets, setPage } =
    useAsset();
  const [view, setView] = React.useState<"grid" | "table">("grid");

  const handleViewChange = (newView: "grid" | "table") => setView(newView);

  const handleNextPage = () => {
    if (page < Math.ceil(totalCount / limit)) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  useEffect(() => {
    fetchAssets(page, limit);
  }, [page, limit]);

  return (
    <DashboardShell>
      <PageHeader
        title="Gold Assets"
        description="Overview of all gold-backed assets in the system"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Gold Assets", href: "/gold-assets" },
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
        onPrev={handlePrevPage}
        onNext={handleNextPage}
      />
    </DashboardShell>
  );
}
