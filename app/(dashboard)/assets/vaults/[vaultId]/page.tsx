"use client";

import React, { useEffect } from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageHeader } from "@/components/layout/page-header";
import { useVaultSite } from "@/hooks/useVaultSite";
import { VaultSiteHeader } from "@/components/features/assets/vault-sites/details/VaultSiteHeader";
import { SiteInformationCard } from "@/components/features/assets/vault-sites/details/SiteInformationCard";
import { VaultsListCard } from "@/components/features/assets/vault-sites/details/VaultsListCard";
import { StorageOverviewCard } from "@/components/features/assets/vault-sites/details/StorageOverviewCard";
import { InsuranceCard } from "@/components/features/assets/vault-sites/details/InsuranceCard";
import { AuditStatusCard } from "@/components/features/assets/vault-sites/details/AuditStatusCard";
import { InventoryOverview } from "@/components/features/assets/vault-sites/details/InventoryOverview";

interface VaultDetailsPageProps {
  params: Promise<{ vaultId: string }>;
}

export default function VaultDetailsPage({ params }: VaultDetailsPageProps) {
  const { vaultId } = React.use(params);
  const { vaultSiteDetails, fetchVaultSiteById } = useVaultSite();

  useEffect(() => {
    if (vaultId) {
      fetchVaultSiteById(vaultId);
    }
  }, [vaultId, fetchVaultSiteById]);

  if (!vaultSiteDetails) {
    return (
      <DashboardShell>
        <div className="flex justify-center items-center h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-600 mx-auto"></div>
            <p className="mt-4 text-gray-400">Loading vault details...</p>
          </div>
        </div>
      </DashboardShell>
    );
  }

  const vault = vaultSiteDetails;

  return (
    <DashboardShell>
      {/* Page header with title, description, and action button */}
      <PageHeader
        className="mb-3"
        title=""
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Vault Sites" },
        ]}
      />
      <VaultSiteHeader vault={vault} />

      {/* Main Grid - More Compact */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column - Site Details */}
        <div className="lg:col-span-2 space-y-4">
          {/* Compact Location & Info Card */}
          <SiteInformationCard vault={vault} />
          <InventoryOverview />
          <VaultsListCard />
        </div>

        {/* Right Column - Stats & Details */}
        <div className="space-y-4">
          {/* Storage Stats Card */}

          <StorageOverviewCard vault={vault} />

          {/* Insurance Card */}
          <InsuranceCard vault={vault} />

          {/* Audit Card */}
          <AuditStatusCard vault={vault} />
        </div>
      </div>
    </DashboardShell>
  );
}
