import { create } from "zustand";
import { assetService } from "@/services/assetService";
import { Asset } from "@/types/asset";

interface AssetState {
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

export const useAssetStore = create<AssetState>((set, get) => ({
  assets: [],
  loading: false,
  error: undefined,
  page: 1,
  limit: 10,
  totalCount: 0,

  fetchAssets: async (page = get().page, limit = get().limit) => {
    set({ loading: true, error: undefined });
    try {
      const { data, totalCount } = await assetService.getAssets(page, limit);
      set({ assets: data, totalCount, page, limit });
    } catch (err: any) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  mintAsset: async (asset: Asset) => {
    set({ loading: true, error: undefined });
    try {
      const data = await assetService.mintAsset(asset);
      set({ assets: [...get().assets, data] });
      return data;
    } catch (err: any) {
      const message =
        err?.response?.data?.error_description ||
        err?.message ||
        "Failed to mint asset";
      set({ error: message });
      throw new Error(message);
    } finally {
      set({ loading: false });
    }
  },

  setPage: (page: number) => {
    set({ page });
  },

  setLimit: (limit: number) => {
    set({ limit });
  },
}));
