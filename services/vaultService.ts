import { api } from "@/lib/axios";
import {
  Vault,
  CreateVaultPayload,
  UpdateVaultStatusPayload,
  GetVaultsParams,
} from "@/types/vault";

export const vaultService = {
  async getVault(vaultId: string): Promise<Vault> {
    const { data } = await api.get(`/vaults/${vaultId}`);
    return data;
  },

  async createVault(payload: CreateVaultPayload): Promise<Vault> {
    const { data } = await api.post(`/vaults/create`, payload);
    return data;
  },

  async updateVaultStatus(
    vaultId: string,
    payload: UpdateVaultStatusPayload,
  ): Promise<Vault> {
    const { data } = await api.put(`/vaults/${vaultId}/status`, payload);
    return data;
  },

  // Get vaults for a specific vault site
  async fetchVaultsByVaultSiteApi(params: GetVaultsParams) {
    const { vaultSiteId, page, limit, filters } = params;

    const response = await api.get(`/dashboard/${vaultSiteId}/vaults`, {
      params: {
        page,
        limit,
        search: filters.search,
        from_date: filters.from_date,
        to_date: filters.to_date,
        ...(filters.status ? { status: filters.status } : {}),
      },
    });

    return response.data;
  },
};
