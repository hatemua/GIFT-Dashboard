import { Asset, AssetsFilters, MintAssetForm } from "@/types/asset";
import { useAssetStore } from "@/store/assetStore";

interface UseAssetReturn {
  assets: Asset[];
  loading: boolean;
  error?: string;
  page: number;
  limit: number;
  count: number;
  filters: AssetsFilters;
  fetchAssets: () => Promise<void>;
  mintAsset: (asset: MintAssetForm) => Promise<Asset | undefined>;
  setFilters: (filters: AssetsFilters) => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
}

export const useAsset = (): UseAssetReturn => {
  const {
    assets,
    loading,
    error,
    page,
    limit,
    count,
    filters,
    fetchAssets,
    mintAsset,
    setPage,
    setLimit,
    setFilters,
  } = useAssetStore();

  return {
    assets,
    loading,
    error,
    page,
    limit,
    count,
    filters,
    fetchAssets,
    mintAsset,
    setFilters,
    setPage,
    setLimit,
  };
};
