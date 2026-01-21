"use client";

import { useEffect } from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useVaultSite } from "@/hooks/useVaultSite";
import { Pagination } from "@/components/ui/pagination";
import EmptyVaultSites from "@/components/features/assets/vault-sites/EmptyVaultSites";
import { VaultSitesFilters } from "@/components/features/assets/vault-sites/VaultSitesFilters";
import { VaultSitesGrid } from "@/components/features/assets/vault-sites/VaultSitesGrid";
import { ErrorCard } from "@/components/ui/error-card";
import VaultSiteCardSkeleton from "@/components/features/assets/vault-sites/VaultSiteCardSkeleton";

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

  useEffect(() => {
    fetchVaultSites();
  }, []);

  const handleNextPage = () => {
    if (offset + limit < totalCount) {
      setOffset(offset + limit);
      fetchVaultSites(offset + limit);
    }
  };

  const handlePrevPage = () => {
    if (offset - limit >= 0) {
      setOffset(offset - limit);
      fetchVaultSites(offset - limit);
    }
  };

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
            <Button variant="gold">
              <Plus className="h-4 w-4" />
              Add Vault Site
            </Button>
          </Link>
        }
      />

      {/* Display an error card if an error occurs */}
      {error && <ErrorCard error={error} />}

      {/* Filters component for selecting countries or other criteria */}
      {!error && <VaultSitesFilters />}

      {/* Show skeleton loading cards while data is being fetched */}
      {loading && !error && <VaultSiteCardSkeleton />}

      {/* Show empty state if there are no vault sites */}
      {!error && !loading && vaultSites.length === 0 && <EmptyVaultSites />}

      {/* Show the grid of vault cards if vault sites exist */}
      {!error && !loading && vaultSites.length > 0 && <VaultSitesGrid />}

      {/* Pagination component */}
      <Pagination
        offset={offset}
        limit={limit}
        total={totalCount}
        onPrev={handlePrevPage}
        onNext={handleNextPage}
      />
    </DashboardShell>
  );
}
