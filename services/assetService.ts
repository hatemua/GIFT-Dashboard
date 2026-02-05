import { api } from "@/lib/axios";
import { AssetsResponse, GetAssetsParams, MintAssetForm } from "@/types/asset";

export const assetService = {
  mintAsset: async (data: MintAssetForm) => {
    const response = await api.post("/assets/register", data);
    return response.data;
  },

  getAssets: async ({
    page,
    limit,
    filters = {},
  }: GetAssetsParams): Promise<AssetsResponse> => {
    const response = await api.get<AssetsResponse>("/dashboard/assets", {
      params: {
        page,
        limit,
        search: filters.search,
        from_date: filters.from_date,
        to_date: filters.to_date,
        status: filters.status,
      },
    });

    return response.data;
  },
};
