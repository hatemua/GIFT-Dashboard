import { api } from "@/lib/axios";
import {
  AssetDetails,
  AssetsResponse,
  AssetTrackingResponse,
  BurnAssetRequest,
  BurnAssetResponse,
  GetAssetsParams,
  MintAssetForm,
  UpdateCustodyRequest,
  UpdateCustodyResponse,
  UpdateStatusRequest,
  UpdateStatusResponse,
} from "@/types/asset";

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

  getAssetByTokenId: async (token_id: string): Promise<AssetDetails> => {
    const response = await api.get<AssetDetails>(`/assets/${token_id}`);
    return response.data;
  },

  getAssetTracking: async (tokenId: string): Promise<AssetTrackingResponse> => {
    const response = await api.get<AssetTrackingResponse>(
      `/assets/${tokenId}/track`,
    );
    return response.data;
  },
  burnAsset: async (
    token_id: string,
    data: BurnAssetRequest,
  ): Promise<BurnAssetResponse> => {
    const response = await api.post<BurnAssetResponse>(
      `/assets/${token_id}/burn`,
      data,
    );
    return response.data;
  },
  updateCustody: async (
    token_id: string,
    data: UpdateCustodyRequest,
  ): Promise<UpdateCustodyResponse> => {
    const response = await api.put<UpdateCustodyResponse>(
      `/assets/${token_id}/custody`,
      data,
    );
    return response.data;
  },
  updateStatus: async (
    token_id: string,
    data: UpdateStatusRequest,
  ): Promise<UpdateStatusResponse> => {
    const response = await api.put<UpdateStatusResponse>(
      `/assets/${token_id}/status`,
      data,
    );
    return response.data;
  },
};
