"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Gem, Search } from "lucide-react";
import { useGoldAccount } from "@/hooks/useGoldAccount";
import { useEffect } from "react";
import AssetCard from "../../gold-assets/AssetCard";

interface GoldAccountAssetsProps {
  igan: string;
}

export const GoldAccountAssets: React.FC<GoldAccountAssetsProps> = ({
  igan,
}) => {
  const { accountAssets, loading, fetchAccountAssets } = useGoldAccount();

  useEffect(() => {
    if (igan) {
      fetchAccountAssets(igan);
    }
  }, [igan]);

  // Filter assets based on search and filter
  const assets = accountAssets?.assets ?? [];

  if (loading) {
    return <AssetLoadingSkeleton />;
  }

  return (
    <Card className="space-y-6 mt-3">
      <CardHeader className="mb-0">
        <CardTitle className="text-base">
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-md bg-amber-50 flex items-center justify-center">
              <Gem className="h-3.5 w-3.5 text-amber-600" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                Gold Assets
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                {assets.length} items in portfolio
              </p>
            </div>
          </div>
        </CardTitle>
      </CardHeader>

      {assets.length === 0 ? (
        <CardContent className="space-y-2 text-center">
          <div className="rounded-full bg-gray-100 p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Search className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No assets found
          </h3>
          <p className="text-gray-500 max-w-sm mx-auto">
            Try adjusting your search or filter to find what you're looking for.
          </p>
        </CardContent>
      ) : (
        <CardContent className="space-y-2">
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-6">
            {assets.map((asset) => (
              <AssetCard key={asset.token_id} asset={asset} />
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
};

// ───────────────── REUSABLE COMPONENTS ─────────────────

const AssetLoadingSkeleton: React.FC = () => {
  return <div className="space-y-6"></div>;
};
