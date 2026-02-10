"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Grid3x3, List, Plus } from "lucide-react";
import { useVaultSite } from "@/hooks/useVaultSite";
import { Pagination } from "@/components/ui/pagination";
import { VaultSitesGrid } from "@/components/features/assets/vault-sites/list/VaultSitesGrid";
import { ErrorCard } from "@/components/ui/error-card";
import VaultSitesFilters from "@/components/features/assets/vault-sites/list/VaultSitesFilters";
import VaultSitesSkeleton from "@/components/features/assets/vault-sites/list/VaultSitesSkeleton";
import { VaultSitesTable } from "@/components/features/assets/vault-sites/list/VaultSitesTable";
import EmptyState from "@/components/features/common/EmptyState";

export default function VaultSitesPage() {
  const {
    vaultSites,
    totalCount,
    offset,
    limit,
    filters,
    loading,
    error,
    fetchVaultSites,
    setOffset,
    resetFilters,
  } = useVaultSite();

  const [view, setView] = useState<"grid" | "table">("grid");

  const onViewChange = (newView: "grid" | "table") => setView(newView);

  useEffect(() => {
    fetchVaultSites();
  }, [limit, offset, filters]);

  useEffect(() => {
    return () => resetFilters();
  }, []);

  // Conditional content rendering
  let content;
  if (loading) {
    content = <VaultSitesSkeleton view={view} />;
  } else if (error) {
    content = <ErrorCard error={error} />;
  } else if (vaultSites.length === 0) {
    content = <EmptyState type="vaultSites" />;
  } else {
    content =
      view === "grid" ? (
        <VaultSitesGrid vaultSites={vaultSites} />
      ) : (
        <VaultSitesTable vaultSites={vaultSites} />
      );
  }

  return (
    <DashboardShell>
      {/* Page header with title, description, and action button */}
      <PageHeader
        title="Vault Sites"
        description="Secure physical locations storing gold assets across the network"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Vault Sites" },
        ]}
        action={
          <div className="flex gap-2">
            <Link href="/assets/vault-sites/new">
              <Button
                variant="gold"
                className="flex items-center gap-2 transition-transform hover:scale-105"
              >
                <Plus className="h-4 w-4" />
                Add Vault Site
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
            </div>{" "}
          </div>
        }
      />

      {/* Filters */}
      <VaultSitesFilters />

      {/* Main content */}
      {content}

      {/* Pagination */}
      {!loading && !error && vaultSites.length > 0 && (
        <div className="mt-6 flex justify-center">
          <Pagination
            offset={offset}
            limit={limit}
            total={totalCount}
            setOffset={setOffset}
          />
        </div>
      )}
    </DashboardShell>
  );
}
