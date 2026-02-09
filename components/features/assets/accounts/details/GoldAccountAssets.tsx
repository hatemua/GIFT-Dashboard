"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Gem } from "lucide-react";
import { useGoldAccount } from "@/hooks/useGoldAccount";
import { useEffect } from "react";
import AssetCard from "../../gold-assets/list/AssetCard";

interface GoldAccountAssetsProps {
  igan: string;
}

export const GoldAccountAssets: React.FC<GoldAccountAssetsProps> = ({
  igan,
}) => {
  const { accountAssets, fetchAccountAssets } = useGoldAccount();

  useEffect(() => {
    if (igan) {
      fetchAccountAssets(igan);
    }
  }, [igan]);

  const assets = accountAssets?.assets ?? [];
  if (assets.length === 0) return null;

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
      <CardContent className="space-y-2">
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-6">
          {assets.map((asset) => (
            <AssetCard key={asset.token_id} asset={asset} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
