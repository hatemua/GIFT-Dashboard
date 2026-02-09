"use client";

import React, { useEffect, useState } from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageHeader } from "@/components/layout/page-header";
import { useAsset } from "@/hooks/useAsset";
import { LoadingSkeleton } from "@/components/features/assets/gold-assets/details/LoadingSkeleton";
import { AssetHeader } from "@/components/features/assets/gold-assets/details/AssetHeader";
import { AssetOverviewCard } from "@/components/features/assets/gold-assets/details/AssetOverview";
import { OwnershipLocationCard } from "@/components/features/assets/gold-assets/details/OwnershipLocationCard";
import { ValuationCard } from "@/components/features/assets/gold-assets/details/ValuationCard";
import { ComplianceCard } from "@/components/features/assets/gold-assets/details/ComplianceCard";
import { AssetActions } from "@/components/features/assets/gold-assets/details/AssetActions";
import EmptyState from "@/components/features/common/EmptyState";

interface AssetDetailsPageProps {
  params: Promise<{ tokenId: string }>;
}

export default function AssetDetailsPage({ params }: AssetDetailsPageProps) {
  const { tokenId } = React.use(params);
  const { assetDetails, fetchAssetByTokenId, loading } = useAsset();
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (tokenId) {
      setHasFetched(true);
      fetchAssetByTokenId(tokenId);
    }
  }, [tokenId, fetchAssetByTokenId]);

  return (
    <DashboardShell>
      <PageHeader
        className="mb-6"
        title=""
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Assets", href: "/assets" },
          { label: `${tokenId} (Token ID)` },
        ]}
      />

      <div className="space-y-6">
        {loading || !hasFetched ? (
          <LoadingSkeleton />
        ) : assetDetails ? (
          <>
            <AssetHeader asset={assetDetails} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-4">
                <AssetOverviewCard asset={assetDetails} />
                <OwnershipLocationCard asset={assetDetails} />
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <ValuationCard asset={assetDetails} />
                <ComplianceCard asset={assetDetails} />
              </div>
            </div>

            <AssetActions tokenId={assetDetails.token_id} />
          </>
        ) : (
          <EmptyState type="asset" />
        )}
      </div>
    </DashboardShell>
  );
}
