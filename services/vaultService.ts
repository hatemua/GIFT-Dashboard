// src/services/vaultService.ts

import { api } from "@/lib/axios";
import { Vault, CreateVaultPayload, UpdateVaultStatusPayload } from "@/types/vault";

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
    payload: UpdateVaultStatusPayload
  ): Promise<Vault> {
    const { data } = await api.put(
      `/vaults/${vaultId}/status`,
      payload
    );
    return data;
  },
};
