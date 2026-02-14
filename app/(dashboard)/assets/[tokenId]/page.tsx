"use client";

import React, { useEffect, useState } from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageHeader } from "@/components/layout/page-header";
import { useAsset } from "@/hooks/useAsset";
import { LoadingSkeleton } from "@/components/features/assets/gold-assets/details/LoadingSkeleton";
import { AssetHeader } from "@/components/features/assets/gold-assets/details/AssetHeader";
import EmptyState from "@/components/features/common/EmptyState";
import { AssetTabs } from "@/components/features/assets/gold-assets/details/AssetTabs";

interface AssetDetailsPageProps {
  params: Promise<{ tokenId: string }>;
}

export default function AssetDetailsPage({ params }: AssetDetailsPageProps) {
  const { tokenId } = React.use(params);
  const {
    assetDetails,
    assetTracking,
    fetchAssetByTokenId,
    fetchAssetTracking,
    loadingTracking,
    loading,
  } = useAsset();
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (tokenId) {
      setHasFetched(true);
      fetchAssetByTokenId(tokenId);
      fetchAssetTracking(tokenId);
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
        {loading || loadingTracking || !hasFetched ? (
          <LoadingSkeleton />
        ) : assetDetails ? (
          <>
            <AssetHeader asset={assetDetails} />
            {assetTracking && assetDetails && (
              <AssetTabs data={assetTracking} />
            )}
          </>
        ) : (
          <EmptyState type="asset" />
        )}
      </div>
    </DashboardShell>
  );
}
