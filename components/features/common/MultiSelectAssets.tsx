"use client";

import React, { useEffect, useState } from "react";
import { useAsset } from "@/hooks/useAsset";
import { Asset } from "@/types/asset";
import AssetsFilters from "../assets/gold-assets/list/AssetsFilters";

interface MultiSelectAssetsProps {
  onSelectionChange?: (selected: Asset[]) => void;
}

const MultiSelectAssets: React.FC<MultiSelectAssetsProps> = ({ onSelectionChange }) => {
  const {
    assets,
    loading,
    count,
    filters,
    page,
    limit,
    resetFilters,
    fetchAssets,
    setPage,
  } = useAsset();

  const [selectedAssets, setSelectedAssets] = useState<Asset[]>([]);

  useEffect(() => {
    fetchAssets();
  }, [page, limit, filters]);

  const toggleAssetSelection = (asset: Asset) => {
    let updated: Asset[];
    if (selectedAssets.find(a => a.token_id === asset.token_id)) {
      updated = selectedAssets.filter(a => a.token_id !== asset.token_id);
    } else {
      updated = [...selectedAssets, asset];
    }
    setSelectedAssets(updated);
    onSelectionChange?.(updated);
  };

  return (
    <div className="p-4 space-y-4">
      {/* Filters */}
      <AssetsFilters />

      {/* Assets List */}
      {loading ? (
        <div className="text-center py-10">Loading assets...</div>
      ) : assets.length === 0 ? (
        <div className="text-center py-10">No assets found</div>
      ) : (
        <div className="space-y-4">
          {assets.map(asset => (
            <div
              key={asset.token_id}
              className={`flex items-center justify-between p-4 border rounded shadow-sm hover:shadow-md transition cursor-pointer ${
                selectedAssets.find(a => a.token_id === asset.token_id)
                  ? "border-gold-500 bg-yellow-50"
                  : "border-gray-200 bg-white"
              }`}
              onClick={() => toggleAssetSelection(asset)}
            >
              <div className="flex items-center space-x-4">
                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={!!selectedAssets.find(a => a.token_id === asset.token_id)}
                  onChange={() => toggleAssetSelection(asset)}
                  className="w-5 h-5 text-gold-500 border-gray-300 rounded"
                  onClick={e => e.stopPropagation()} // prevent card click toggling twice
                />

                {/* Asset Info */}
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-800">
                    Token ID: {asset.token_id}
                  </span>
                  <span className="text-gray-600 text-sm">
                    Serial: {asset.serial_number} | Weight: {asset.weight_grams} g | Value: ${asset.assetValueInDollar}
                  </span>
                  <span className="text-gray-500 text-sm">
                    Status: {asset.status} | Certified: {asset.certified ? "Yes" : "No"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {count > limit && (
        <div className="flex justify-between items-center mt-4">
          <span>Total Assets: {count}</span>
          <div className="flex gap-2">
            <button
              className="px-4 py-2 border rounded disabled:opacity-50"
              disabled={page <= 1 || loading}
              onClick={() => setPage(page - 1)}
            >
              Prev
            </button>
            <button
              className="px-4 py-2 border rounded disabled:opacity-50"
              disabled={page * limit >= count || loading}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Reset Filters */}
      <div>
        <button
          className="px-4 py-2 border rounded bg-gray-100 hover:bg-gray-200"
          onClick={resetFilters}
          disabled={loading}
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default MultiSelectAssets;
