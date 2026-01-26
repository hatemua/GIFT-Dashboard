import { api } from "@/lib/axios";
import { Asset } from "@/types/asset";

export const assetService = {
  mintAsset: async (data: Asset) => {
    const response = await api.post("/assets/register", data);
    return response.data;
  },

  getAssets: async () => {
    const response = await api.get("/assets");
    return response.data as Asset[];
  },
};
