"use client";

import React, { useEffect, useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VaultSiteDetailsSkeleton } from "@/components/features/assets/vault-sites/details/VaultSiteDetailsSkeleton";
import EmptyState from "@/components/features/common/EmptyState";
import { Card } from "@/components/ui/card";

interface VaultDetailsPageProps {
  params: Promise<{ vaultSiteId: string }>;
}

export default function VaultDetailsPage({ params }: VaultDetailsPageProps) {
  const { vaultSiteId } = React.use(params);
  const { vaultSiteDetails, loading, fetchVaultSiteById } = useVaultSite();
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (vaultSiteId) {
      fetchVaultSiteById(vaultSiteId);
      setHasFetched(true);
    }
  }, [vaultSiteId, fetchVaultSiteById]);

  return (
    <DashboardShell>
      <PageHeader
        className="mb-3"
        title=""
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Vault Sites", href: "/assets/vault-sites" },
        ]}
      />
      {loading || !hasFetched ? (
        <VaultSiteDetailsSkeleton />
      ) : vaultSiteDetails ? (
        <Card className="p-4 rounded-2xl border-0 shadow-lg bg-gradient-to-br from-white to-slate-50/50 overflow-hidden">
          <VaultSiteHeader vault={vaultSiteDetails} />

          <Tabs defaultValue="overview" className="space-y-4 mt-4">
            <TabsList className="bg-slate-100/50 p-1 rounded-xl w-fit gap-1">
              <TabsTrigger
                value="overview"
                className="rounded-lg px-4 data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="vaults"
                className="rounded-lg px-4 data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                Vaults
              </TabsTrigger>
              <TabsTrigger
                value="inventory"
                className="rounded-lg px-4 data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                Inventory
              </TabsTrigger>
              <TabsTrigger
                value="stats"
                className="rounded-lg px-4 data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                Compliance & Insurance
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2">
                  <SiteInformationCard vault={vaultSiteDetails} />
                </div>
                <div className="lg:col-span-1">
                  <StorageOverviewCard vault={vaultSiteDetails} />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="vaults" className="space-y-4">
              <VaultsListCard />
            </TabsContent>

            <TabsContent value="inventory" className="space-y-4">
              <InventoryOverview />
            </TabsContent>

            <TabsContent value="stats" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <InsuranceCard vault={vaultSiteDetails} />
                <AuditStatusCard vault={vaultSiteDetails} />
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      ) : (
        <EmptyState type="vaultsite" />
      )}
    </DashboardShell>
  );
}
