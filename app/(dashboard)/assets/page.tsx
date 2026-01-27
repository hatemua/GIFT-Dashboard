"use client";

import React from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Pagination } from "@/components/ui/pagination";

import { useAsset } from "@/hooks/useAsset";
import EmptyAssets from "@/components/features/assets/gold-assets/EmptyAssets";
import AssetsFilters from "@/components/features/assets/gold-assets/AssetsFilters";
import { AssetsGrid } from "@/components/features/assets/gold-assets/AssetsGrid";
import { AssetsSkeleton } from "@/components/features/assets/gold-assets/AssetsSkeleton";
import { AssetsTable } from "@/components/features/assets/gold-assets/AssetsTable";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Asset } from "@/types/asset";

export default function GoldAssetsPage() {
  const { totalCount, page, limit, loading, fetchAssets, setPage } =
    useAsset();
const assets: Asset[] = [
  {
    serial_number: "SN-1001",
    refiner_name: "GoldRefine Inc.",
    weight_grams: 100,
    fineness: 999,
    gold_product_type_id: "bar",
    traceability_gic: "GIC-001",
    initial_owner_igan: "IGAN-001",
    auto_verify_hash: true,
    manufacture_date: "2025-01-10",
    certification_framework: "ISO 9001",
    certified: true,
  },
  {
    serial_number: "SN-1002",
    refiner_name: "Shiny Gold Co.",
    weight_grams: 50,
    fineness: 995,
    gold_product_type_id: "coin",
    traceability_gic: "GIC-002",
    initial_owner_igan: "IGAN-002",
    auto_verify_hash: false,
    manufacture_date: "2025-01-12",
    certification_framework: "ISO 14001",
    certified: false,
  },
  {
    serial_number: "SN-1003",
    refiner_name: "Auric Metals",
    weight_grams: 150,
    fineness: 999,
    gold_product_type_id: "ingot",
    traceability_gic: "GIC-003",
    initial_owner_igan: "IGAN-003",

    auto_verify_hash: true,
    manufacture_date: "2025-01-15",
    certification_framework: "ISO 9001",
    certified: true,
  },
  {
    serial_number: "SN-1004",
    refiner_name: "GoldRefine Inc.",
    weight_grams: 200,
    fineness: 999,
    gold_product_type_id: "bar",
    traceability_gic: "GIC-004",
    initial_owner_igan: "IGAN-004",

    auto_verify_hash: true,
    manufacture_date: "2025-01-18",
    certification_framework: "ISO 9001",
    certified: true,
  },
  {
    serial_number: "SN-1005",
    refiner_name: "Shiny Gold Co.",
    weight_grams: 75,
    fineness: 997,
    gold_product_type_id: "coin",
    traceability_gic: "GIC-005",
    initial_owner_igan: "IGAN-005",

    auto_verify_hash: false,
    manufacture_date: "2025-01-20",
    certification_framework: "ISO 14001",
    certified: false,
  },
];

  const [view, setView] = React.useState<"grid" | "table">("grid");

  const handleViewChange = (newView: "grid" | "table") => setView(newView);

  /* Pagination handlers */
  const totalPages = Math.ceil(totalCount / limit);

  const handleNextPage = () => {
    if (page < totalPages) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchAssets(limit, nextPage);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      const prevPage = page - 1;
      setPage(prevPage);
      fetchAssets(limit, prevPage);
    }
  };

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
        <AssetsSkeleton />
      ) : assets.length === 0 ? (
        <EmptyAssets />
      ) : view === "grid" ? (
        <AssetsGrid assets={assets} />
      ) : (
        <Card className="transition-shadow hover:shadow-md">
          <CardContent className="p-0">
            <AssetsTable assets={assets} />
          </CardContent>
        </Card>
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
