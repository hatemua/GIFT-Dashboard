// src/stores/vaultStore.ts

import { create } from "zustand";
import { Vault, CreateVaultPayload, UpdateVaultStatusPayload } from "@/types/vault";
import { vaultService } from "@/services/vaultService";

interface VaultState {
  vault: Vault | null;
  loading: boolean;
  error: string | null;

  fetchVault: (vaultId: string) => Promise<void>;
  createVault: (payload: CreateVaultPayload) => Promise<void>;
  updateVaultStatus: (
    vaultId: string,
    payload: UpdateVaultStatusPayload
  ) => Promise<void>;

  reset: () => void;
}

export const useVaultStore = create<VaultState>((set) => ({
  vault: null,
  loading: false,
  error: null,

  fetchVault: async (vaultId) => {
    set({ loading: true, error: null });
    try {
      const vault = await vaultService.getVault(vaultId);
      set({ vault });
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch vault" });
    } finally {
      set({ loading: false });
    }
  },

  createVault: async (payload) => {
    set({ loading: true, error: null });
    try {
      const vault = await vaultService.createVault(payload);
      set({ vault });
    } catch (err: any) {
      set({ error: err.message || "Failed to create vault" });
    } finally {
      set({ loading: false });
    }
  },

  updateVaultStatus: async (vaultId, payload) => {
    set({ loading: true, error: null });
    try {
      const vault = await vaultService.updateVaultStatus(vaultId, payload);
      set({ vault });
    } catch (err: any) {
      set({ error: err.message || "Failed to update vault status" });
    } finally {
      set({ loading: false });
    }
  },

  reset: () => set({ vault: null, loading: false, error: null }),
}));
