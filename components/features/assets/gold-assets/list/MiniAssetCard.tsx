"use client";

import { Card } from "@/components/ui/card";
import { Package, DollarSign, Scale, Hash } from "lucide-react";
import { getAssetStatusLabel } from "@/lib/assets";
import { AddressDisplay } from "@/components/blockchain/address-display";
import { formatWeight, formatCurrency } from "@/lib/utils";
import { Asset } from "@/types/asset";
import { StatusBadge } from "@/components/data-display/status-badge";

interface MiniAssetCardProps {
  asset: Asset;
  isSelected: boolean;
  toggleAsset: (asset: Asset) => void;
}

export default function MiniAssetCard({
  asset,
  isSelected,
  toggleAsset,
}: MiniAssetCardProps) {
  return (
    <Card
      className={`group cursor-pointer rounded-lg border transition-shadow duration-300 hover:shadow-lg p-3 flex items-center justify-between gap-3 w-full
        ${isSelected ? "border-gold-500 bg-yellow-50" : "border-gray-200 bg-white"}`}
      onClick={() => toggleAsset(asset)}
    >
      {/* Left: Token + Serial + Key Stats */}
      <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        {/* Token & Serial */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 truncate">
          <Hash className="w-4 h-4 text-gold-500 flex-shrink-0" />
          <AddressDisplay
            address={asset.token_id}
            truncate
            startChars={2}
            endChars={2}
            className="font-medium text-sm"
          />
          <span className="hidden sm:inline text-gray-500 text-xs ml-2">
            <Package className="w-3 h-3 inline-block mr-1" />
            {asset.serial_number}
          </span>
        </div>

        {/* Key stats */}
        <div className="flex gap-3 items-center flex-wrap text-xs text-gray-600 mt-1 sm:mt-0">
          <div className="flex items-center gap-1">
            <Scale className="w-3 h-3" /> {formatWeight(asset.weight_grams)}
          </div>
          {asset.assetValueInDollar !== undefined && (
            <div className="flex items-center gap-1">
              <DollarSign className="w-3 h-3 text-gold-600" />{" "}
              {formatCurrency(asset.assetValueInDollar)}
            </div>
          )}
          <div className="flex items-center gap-1">
            <span className="text-gray-500">Fineness:</span> {asset.fineness}‰
          </div>
          <div className="flex items-center gap-1">
            <StatusBadge status={getAssetStatusLabel(asset.status)} />
          </div>
        </div>
      </div>

      {/* Right: Checkbox + Arrow */}
      <div className="flex flex-col items-center justify-between ml-2">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => toggleAsset(asset)}
          className="w-4 h-4 text-gold-500 border-gray-300 rounded focus:ring-2 focus:ring-gold-300"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </Card>
  );
}
