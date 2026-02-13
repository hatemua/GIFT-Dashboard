"use client";

import React, { useEffect, useState } from "react";
import { useAsset } from "@/hooks/useAsset";
import { Asset } from "@/types/asset";
import AssetsFilters from "../assets/gold-assets/list/AssetsFilters";
import { useFormContext, Controller } from "react-hook-form";
import { CreateTransactionInput, Transaction } from "@/types/transaction";
import { Pagination } from "@/components/ui/pagination";
import MiniAssetCard from "../assets/gold-assets/list/MiniAssetCard";

interface MultiSelectAssetsProps {
  name?: keyof CreateTransactionInput;
  onSelectionChange?: (selected: Asset[]) => void;
}

const MultiSelectAssets: React.FC<MultiSelectAssetsProps> = ({
  name = "requested_assets",
  onSelectionChange,
}) => {
  const {
    assets,
    loading,
    count,
    filters,
    page,
    limit,
    setFilters,
    fetchAssets,
    setPage,
  } = useAsset();
  const { control } = useFormContext<Transaction>();

  const [isFiltersInitailized, setIsFiltersInitailized] =
    useState<boolean>(false);

  useEffect(() => {
    setFilters({ status: "stationary" });
    setIsFiltersInitailized(true);
  }, []);
  
  useEffect(() => {
    if (isFiltersInitailized) {
      fetchAssets();
    }
  }, [page, limit, filters, isFiltersInitailized]);

  return (
    <div>
      {/* Filters */}
      <div className="mb-4">
        <AssetsFilters filterByStatus={false} />
      </div>

      {/* Assets List */}
      <Controller
        control={control}
        name={name as any}
        defaultValue={[]}
        render={({ field }) => {
          const selectedTokenIds: string[] = field.value || [];

          const toggleAsset = (asset: Asset) => {
            let updated: string[];
            if (selectedTokenIds.includes(asset.token_id)) {
              updated = selectedTokenIds.filter((id) => id !== asset.token_id);
            } else {
              updated = [...selectedTokenIds, asset.token_id];
            }
            field.onChange(updated);
            onSelectionChange?.(
              assets.filter((a) => updated.includes(a.token_id)),
            );
          };

          return loading ? (
            <div className="text-center py-10 text-gray-500">
              Loading assets...
            </div>
          ) : assets.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No assets found
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {assets.map((asset) => {
                const isSelected = selectedTokenIds.includes(asset.token_id);
                return (
                  <MiniAssetCard
                    key={asset.token_id}
                    asset={asset}
                    isSelected={isSelected}
                    toggleAsset={toggleAsset}
                  />
                );
              })}
            </div>
          );
        }}
      />

      {/* Pagination */}
      {count > limit && (
        <Pagination page={page} limit={limit} total={count} setPage={setPage} />
      )}
    </div>
  );
};

export default MultiSelectAssets;
