import { Asset, AssetDetails, AssetsFilters, AssetTrackingResponse, MintAssetForm } from "@/types/asset";
import { useAssetStore } from "@/store/assetStore";

interface UseAssetReturn {
  assets: Asset[];
  assetDetails?: AssetDetails;
  assetTracking?: AssetTrackingResponse;
  loading: boolean;
  error?: string;
  page: number;
  limit: number;
  count: number;
  filters: AssetsFilters;

  fetchAssets: () => Promise<void>;
  mintAsset: (asset: MintAssetForm) => Promise<Asset | undefined>;
  fetchAssetByTokenId: (token_id: string) => Promise<void>;
  fetchAssetTracking: (token_id: string) => Promise<void>;
  clearAssetDetails: () => void;
  clearAssetTracking: () => void;
  setFilters: (filters: Partial<AssetsFilters>) => void;
  resetFilters: () => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
}

export const useAsset = (): UseAssetReturn => {
  const {
    assets,
    assetDetails,
    assetTracking,
    loading,
    error,
    page,
    limit,
    count,
    filters,
    fetchAssets,
    mintAsset,
    fetchAssetByTokenId,
    fetchAssetTracking,
    clearAssetDetails,
    clearAssetTracking,
    setFilters,
    resetFilters,
    setPage,
    setLimit,
  } = useAssetStore();

  return {
    assets,
    assetDetails,
    assetTracking,
    loading,
    error,
    page,
    limit,
    count,
    filters,
    fetchAssets,
    mintAsset,
    fetchAssetByTokenId,
    fetchAssetTracking,
    clearAssetDetails,
    clearAssetTracking,
    setFilters,
    resetFilters,
    setPage,
    setLimit,
  };
};
