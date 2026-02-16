import {
  Asset,
  AssetDetails,
  AssetsFilters,
  AssetTrackingResponse,
  MintAssetForm,
  BurnAssetRequest,
  UpdateCustodyRequest,
  UpdateStatusRequest,
} from "@/types/asset";
import { useAssetStore } from "@/store/assetStore";

interface UseAssetReturn {
  /* State */
  assets: Asset[];
  assetDetails?: AssetDetails;
  assetTracking?: AssetTrackingResponse;
  loading: boolean;
  error?: string;
  loadingTracking: boolean;
  errorTracking?: string;
  page: number;
  limit: number;
  count: number;
  filters: AssetsFilters;
  loadingAction: boolean;
  errorAction?: string;

  /* Actions */
  fetchAssets: () => Promise<void>;
  mintAsset: (asset: MintAssetForm) => Promise<Asset | undefined>;
  burnAsset: (tokenId: string, data: BurnAssetRequest) => Promise<void>;
  updateCustody: (
    tokenId: string,
    data: UpdateCustodyRequest,
  ) => Promise<void>;
  updateStatus: (
    tokenId: string,
    data: UpdateStatusRequest,
  ) => Promise<void>;

  fetchAssetByTokenId: (tokenId: string) => Promise<void>;
  fetchAssetTracking: (tokenId: string) => Promise<void>;
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
    loadingTracking,
    errorTracking,
    loadingAction,
    errorAction,

    fetchAssets,
    mintAsset,
    burnAsset,
    updateCustody,
    updateStatus,

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
    /* State */
    assets,
    assetDetails,
    assetTracking,
    loading,
    error,
    page,
    limit,
    count,
    filters,
    loadingTracking,
    errorTracking,
    loadingAction,
    errorAction,

    /* Actions */
    fetchAssets,
    mintAsset,
    burnAsset,
    updateCustody,
    updateStatus,

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
