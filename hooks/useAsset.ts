import { Asset } from "@/types/asset";
import { useAssetStore } from "@/store/assetStore";

interface UseAssetReturn {
  assets: Asset[];
  loading: boolean;
  error?: string;
  fetchAssets: () => Promise<void>;
  mintAsset: (asset: Asset) => Promise<Asset | undefined>;
}

export const useAsset = (): UseAssetReturn => {
  const { assets, loading, error, fetchAssets, mintAsset } = useAssetStore();

  return {
    assets,
    loading,
    error,
    fetchAssets,
    mintAsset,
  };
};
