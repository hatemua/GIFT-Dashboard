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

export default function ExplorerAssetsPage() {
  const { assets, loading, count, filters, page, limit, fetchAssets, setPage } =
    useAsset();
  const [view, setView] = React.useState<"grid" | "table">("grid");

  const onViewChange = (newView: "grid" | "table") => setView(newView);

  useEffect(() => {
    fetchAssets();
  }, [page, limit, filters]);

  return (
    <DashboardShell>
      <PageHeader
        title="Asset Explorer"
        description="All gold assets minted on the blockchain"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Explorer" },
          { label: "Assets" },
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

      {/* Filters + View toggle */}
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
