import { create } from "zustand";
import { assetService } from "@/services/assetService";
import {
  Asset,
  AssetDetails,
  AssetsFilters,
  AssetsResponse,
  AssetTrackingResponse,
  MintAssetForm,
  BurnAssetRequest,
  UpdateCustodyRequest,
  UpdateStatusRequest,
  AssetTransferRequest,
  AssetTransferResponse,
} from "@/types/asset";

interface AssetState {
  /* List */
  assets: Asset[];
  loading: boolean;
  error?: string;
  page: number;
  limit: number;
  count: number;
  filters: AssetsFilters;

  /* Single asset */
  assetDetails?: AssetDetails;

  /* Tracking */
  assetTracking?: AssetTrackingResponse;
  loadingTracking: boolean;
  errorTracking?: string;

  loadingAction: boolean;
  errorAction?: string;

  /* Actions */
  fetchAssets: () => Promise<void>;
  fetchAssetByTokenId: (tokenId: string) => Promise<void>;
  clearAssetDetails: () => void;

  fetchAssetTracking: (tokenId: string) => Promise<void>;
  clearAssetTracking: () => void;

  mintAsset: (asset: MintAssetForm) => Promise<Asset | undefined>;
  burnAsset: (tokenId: string, data: BurnAssetRequest) => Promise<void>;
  updateCustody: (
    tokenId: string,
    data: UpdateCustodyRequest
  ) => Promise<void>;
  updateStatus: (
    tokenId: string,
    data: UpdateStatusRequest
  ) => Promise<void>;
  transferAsset: (
    data: AssetTransferRequest
  ) => Promise<AssetTransferResponse>;

  setFilters: (filters: Partial<AssetsFilters>) => void;
  resetFilters: () => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
}

export const useAssetStore = create<AssetState>((set, get) => ({
  /* ------------------------
     State
  -------------------------*/
  assets: [],
  assetDetails: undefined,
  assetTracking: undefined,
  loading: false,
  loadingTracking: false,
  error: undefined,
  errorTracking: undefined,
  page: 1,
  limit: 6,
  count: 0,
  filters: {},
  loadingAction: false,
  errorAction: undefined,

  /* ------------------------
     Fetch assets list
  -------------------------*/
  fetchAssets: async () => {
    set({ loading: true, error: undefined });
    try {
      const { page, limit, filters } = get();
      const data: AssetsResponse = await assetService.getAssets({
        page,
        limit,
        filters,
      });
      set({
        assets: data.assets,
        count: data.count,
        loading: false,
      });
    } catch (err: any) {
      set({
        error: err?.message || "Failed to fetch assets",
        loading: false,
      });
    }
  },

  /* ------------------------
     Fetch single asset
  -------------------------*/
  fetchAssetByTokenId: async (tokenId: string) => {
    set({ loading: true, error: undefined });
    try {
      const asset = await assetService.getAssetByTokenId(tokenId);
      set({ assetDetails: asset, loading: false });
    } catch (err: any) {
      set({
        error: err?.response?.data?.message || "Failed to load asset",
        loading: false,
      });
    }
  },

  clearAssetDetails: () => set({ assetDetails: undefined }),

  /* ------------------------
     Fetch asset tracking
  -------------------------*/
  fetchAssetTracking: async (tokenId: string) => {
    set({ loadingTracking: true, errorTracking: undefined });
    try {
      const data = await assetService.getAssetTracking(tokenId);
      set({ assetTracking: data, loadingTracking: false });
    } catch (err: any) {
      set({
        errorTracking:
          err?.response?.data?.message || "Failed to fetch tracking data",
        loadingTracking: false,
      });
    }
  },

  clearAssetTracking: () =>
    set({ assetTracking: undefined, errorTracking: undefined }),

  /* ------------------------
     Mint asset
  -------------------------*/
  mintAsset: async (asset: MintAssetForm) => {
    set({ loading: true, error: undefined });
    try {
      const data = await assetService.mintAsset(asset);
      return data;
    } catch (err: any) {
      const message =
        err?.response?.data?.message || err?.message || "Failed to mint asset";
      set({ error: message });
      throw new Error(message);
    } finally {
      set({ loading: false });
    }
  },

  /* ------------------------
     Burn asset
  -------------------------*/
  burnAsset: async (tokenId: string, data: BurnAssetRequest) => {
    set({ loadingAction: true, errorAction: undefined });
    try {
      await assetService.burnAsset(tokenId, data);
      await get().fetchAssetByTokenId(tokenId);
      await get().fetchAssetTracking(tokenId);
    } catch (err: any) {
      set({
        errorAction:
          err?.response?.data?.error_description || "Failed to burn asset",
      });
      throw err;
    } finally {
      set({ loadingAction: false });
    }
  },

  /* ------------------------
     Update custody
  -------------------------*/
  updateCustody: async (tokenId: string, data: UpdateCustodyRequest) => {
    set({ loadingAction: true, errorAction: undefined });
    try {
      await assetService.updateCustody(tokenId, data);
      await get().fetchAssetByTokenId(tokenId);
      await get().fetchAssetTracking(tokenId);
    } catch (err: any) {
      set({
        errorAction:
          err?.response?.data?.error_description || "Failed to update custody",
      });
      throw err;
    } finally {
      set({ loadingAction: false });
    }
  },

  /* ------------------------
     Update status
  -------------------------*/
  updateStatus: async (tokenId: string, data: UpdateStatusRequest) => {
    set({ loadingAction: true, errorAction: undefined });
    try {
      await assetService.updateStatus(tokenId, data);
      await get().fetchAssetByTokenId(tokenId);
      await get().fetchAssetTracking(tokenId);
    } catch (err: any) {
      const message =
        err?.response?.data?.error_description || "Failed to update status";
      set({ errorAction: message });
      throw err;
    } finally {
      set({ loadingAction: false });
    }
  },

  /* ------------------------
     Transfer asset
  -------------------------*/
  transferAsset: async (data: AssetTransferRequest) => {
    set({ loadingAction: true, errorAction: undefined });
    try {
      const response: AssetTransferResponse =
        await assetService.transferAsset(data);

      return response;
    } catch (err: any) {
      const message =
        err?.response?.data?.error_description ||
        err?.response?.data?.message ||
        "Failed to transfer asset";
      set({ errorAction: message });
      throw new Error(message);
    } finally {
      set({ loadingAction: false });
    }
  },

  /* ------------------------
     Filters & pagination
  -------------------------*/
  setFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
      page: 1,
    })),

  resetFilters: () =>
    set({
      filters: {},
      page: 1,
    }),

  setPage: (page: number) => set({ page }),
  setLimit: (limit: number) => set({ limit }),
}));
