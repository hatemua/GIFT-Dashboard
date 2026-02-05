import { create } from "zustand";
import { assetService } from "@/services/assetService";
import {
  Asset,
  AssetsFilters,
  AssetsResponse,
  MintAssetForm,
} from "@/types/asset";

interface AssetState {
  assets: Asset[];
  loading: boolean;
  error?: string;
  page: number;
  limit: number;
  count: number;
  filters: AssetsFilters;
  fetchAssets: (page?: number, limit?: number) => Promise<void>;
  mintAsset: (asset: MintAssetForm) => Promise<Asset | undefined>;
  setFilters: (filters: Partial<AssetsFilters>) => void;
  resetFilters: () => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
}

export const useAssetStore = create<AssetState>((set, get) => ({
  assets: [],
  loading: false,
  error: undefined,
  page: 1,
  limit: 6,
  count: 0,
  filters: {},

  fetchAssets: async () => {
    set({ loading: true, error: undefined });
    try {
      const { page, limit, filters } = get();

      const data: AssetsResponse = await assetService.getAssets({
        page,
        limit,
        filters,
      });
      set({ assets: data.assets, count: data.count, loading: false });
    } catch (err: any) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  mintAsset: async (asset: MintAssetForm) => {
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

  setPage: (page: number) => {
    set({ page });
  },

  setLimit: (limit: number) => {
    set({ limit });
  },
}));
