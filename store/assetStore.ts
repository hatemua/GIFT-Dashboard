import { create } from "zustand";
import { assetService } from "@/services/assetService";
import { Asset } from "@/types/asset";

interface AssetState {
  assets: Asset[];
  loading: boolean;
  error?: string;
  fetchAssets: () => Promise<void>;
  mintAsset: (asset: Asset) => Promise<Asset | undefined>;
}

export const useAssetStore = create<AssetState>((set, get) => ({
  assets: [],
  loading: false,
  error: undefined,

  fetchAssets: async () => {
    set({ loading: true, error: undefined });
    try {
      const data = await assetService.getAssets();
      set({ assets: data });
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
}));
