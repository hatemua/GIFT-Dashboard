import { Asset } from "@/types/asset";
import { useAssetStore } from "@/store/assetStore";

interface UseAssetReturn {
  assets: Asset[];
  loading: boolean;
  error?: string;
  page: number;
  limit: number;
  totalCount: number;
  fetchAssets: (page?: number, limit?: number) => Promise<void>;
  mintAsset: (asset: Asset) => Promise<Asset | undefined>;
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
    totalCount,
    fetchAssets,
    mintAsset,
    setPage,
    setLimit,
  } = useAssetStore();

  return {
    assets,
    loading,
    error,
    page,
    limit,
    totalCount,
    fetchAssets,
    mintAsset,
    setPage,
    setLimit,
  };
};
