"use client";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { useVaultSite } from "@/hooks/useVaultSite";
import { Plus } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect } from "react";

interface VaultDetailsPageProps {
  params: {
    vaultId: string;
  };
}

export default async function VaultDetailsPage({
  params,
}: VaultDetailsPageProps) {
  const { vaultId } = params;
  const { vaultSiteDetails, fetchVaultSiteById } = useVaultSite();

  useEffect(() => {
    fetchVaultSiteById(vaultId);
  }, [vaultId]);

  useEffect(() => {
    console.log("Vault Site Details:", vaultSiteDetails);
    if (!vaultSiteDetails) {
      notFound();
    }
  }, [vaultSiteDetails]);

  return (
    <DashboardShell>
      {/* Page header with title, description, and action button */}
      <PageHeader
        title="Vault Sites"
        description="Secure physical locations storing gold assets across the network"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Vault Sites", href: "/assets/vaults" },
          { label: vaultId },
        ]}
        action={
          <Link href="/vault-sites/new">
            <Button
              variant="gold"
              className="flex items-center gap-2 transition-transform hover:scale-105"
            >
              <Plus className="h-4 w-4" />
              Add Vault
            </Button>
          </Link>
        }
      />
    </DashboardShell>
  );
}
