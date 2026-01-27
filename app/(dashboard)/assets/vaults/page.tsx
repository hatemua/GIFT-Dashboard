"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useVaultSite } from "@/hooks/useVaultSite";
import { Pagination } from "@/components/ui/pagination";
import EmptyVaultSites from "@/components/features/assets/vault-sites/EmptyVaultSites";
import { VaultSitesGrid } from "@/components/features/assets/vault-sites/VaultSitesGrid";
import { ErrorCard } from "@/components/ui/error-card";
import VaultSitesFilters from "@/components/features/assets/vault-sites/VaultSitesFilters";
import VaultSitesSkeleton from "@/components/features/assets/vault-sites/VaultSitesSkeleton";
import { VaultSitesTable } from "@/components/features/assets/vault-sites/VaultSitesTable";

export default function VaultSitesPage() {
  const {
    vaultSites,
    totalCount,
    offset,
    limit,
    loading,
    error,
    fetchVaultSites,
    setOffset,
  } = useVaultSite();

  const [view, setView] = useState<"grid" | "table">("grid");

  const handleViewChange = (newView: "grid" | "table") => setView(newView);

  const handleNextPage = () => {
    if (offset + limit < totalCount) {
      setOffset(offset + limit);
    }
  };

  const handlePrevPage = () => {
    if (offset - limit >= 0) {
      setOffset(offset - limit);
    }
  };

  useEffect(() => {
    fetchVaultSites(limit, offset);
  }, [limit, offset]);

  // Conditional content rendering
  let content;
  if (loading) {
    content = <VaultSitesSkeleton view={view} />;
  } else if (error) {
    content = <ErrorCard error={error} />;
  } else if (vaultSites.length === 0) {
    content = <EmptyVaultSites />;
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
          <Link href="/vault-sites/new">
            <Button
              variant="gold"
              className="flex items-center gap-2 transition-transform hover:scale-105"
            >
              <Plus className="h-4 w-4" />
              Add Vault Site
            </Button>
          </Link>
        }
      />

      {/* Filters */}
      <VaultSitesFilters view={view} onViewChange={handleViewChange} />

      {/* Main content */}
      {content}

      {/* Pagination */}
      {!loading && !error && vaultSites.length > 0 && (
        <div className="mt-6 flex justify-center">
          <Pagination
            offset={offset}
            limit={limit}
            total={totalCount}
            onPrev={handlePrevPage}
            onNext={handleNextPage}
          />
        </div>
      )}
    </DashboardShell>
  );
}
