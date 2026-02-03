"use client";

import { Asset } from "@/types/asset";
import AssetCard from "./AssetCard";

interface AssetsGridProps {
  assets: Asset[];
}

export default function AssetsGrid({ assets }: AssetsGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {assets.map((asset) => (
        <AssetCard asset={asset} key={asset.token_id} />
      ))}
    </div>
  );
}
