"use client";

import React, { useEffect } from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Pagination } from "@/components/ui/pagination";

import { useAsset } from "@/hooks/useAsset";
import AssetsFilters from "@/components/features/assets/gold-assets/list/AssetsFilters";
import AssetsGrid from "@/components/features/assets/gold-assets/list/AssetsGrid";
import AssetsSkeleton from "@/components/features/assets/gold-assets/list/AssetsSkeleton";
import AssetsTable from "@/components/features/assets/gold-assets/list/AssetsTable";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Grid3x3, List, Plus } from "lucide-react";
import EmptyState from "@/components/features/common/EmptyState";

export default function GoldAssetsPage() {
  const {
    assets,
    loading,
    count,
    filters,
    page,
    limit,
    resetFilters,
    fetchAssets,
    setPage,
  } = useAsset();
  const [view, setView] = React.useState<"grid" | "table">("grid");

  const onViewChange = (view: "table" | "grid") => {
    setView(view);
  };

  useEffect(() => {
    fetchAssets();
  }, [page, limit, filters]);

  useEffect(() => {
    return () => resetFilters();
  }, []);

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
          <div className="flex gap-2">
            <Link href="/assets/mint">
              <Button variant="outline">
                <Plus className="h-4 w-4" />
                Mint Asset
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
            </div>
          </div>
        }
      />

      {/* Filters */}
      <AssetsFilters />

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
      <Pagination page={page} limit={limit} total={count} setPage={setPage} />
    </DashboardShell>
  );
}
