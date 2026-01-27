import { api } from "@/lib/axios";
import { Asset } from "@/types/asset";

export const assetService = {
  mintAsset: async (data: Asset) => {
    const response = await api.post("/assets/register", data);
    return response.data;
  },

  getAssets: async (page: number = 1, limit: number = 10) => {
    const response = await api.get(`/assets?page=${page}&limit=${limit}`);
    return response.data as {
      data: Asset[];
      totalCount: number;
    };
  },
};
