import { create } from "zustand";
import {
  Vault,
  CreateVaultPayload,
  UpdateVaultStatusPayload,
  VaultsResponse,
  VaultItem,
  VaultFilters,
} from "@/types/vault";
import { vaultService } from "@/services/vaultService";

interface VaultState {
  vaults: VaultItem[];
  vault: Vault | null;
  loading: boolean;
  error: string | null;
  page: number;
  limit: number;
  count: number;
  filters: VaultFilters;

  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setFilters: (filters: VaultFilters) => void;
  resetFilters: () => void;
  fetchVaultsByVaultSiteId: (vaultSiteId: string) => Promise<void>;
  fetchVault: (vaultId: string) => Promise<void>;
  createVault: (payload: CreateVaultPayload) => Promise<void>;
  updateVaultStatus: (
    vaultId: string,
    payload: UpdateVaultStatusPayload,
  ) => Promise<void>;

  reset: () => void;
}

export const useVaultStore = create<VaultState>((set, get) => ({
  vaults: [],
  vault: null,
  loading: false,
  error: null,
  page: 1,
  limit: 6,
  count: 0,
  filters: {},

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

  fetchVaultsByVaultSiteId: async (vaultSiteId: string) => {
    set({ loading: true, error: undefined });

    try {
      const { page, limit, filters } = get();

      const data = await vaultService.fetchVaultsByVaultSiteApi(
        {
          vaultSiteId,
          page,
          limit,
          filters,
        },
      );

      set({
        vaults: data.vaults,
        page,
        limit,
        count: data.total_count,
        loading: false,
      });
    } catch (err: any) {
      set({ error: err?.message || "Failed to fetch users" });
    } finally {
      set({ loading: false });
    }
  },

  reset: () => set({ vault: null, loading: false, error: null }),
  setFilters: (filters: VaultFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
      page: 1,
    })),

  resetFilters: () =>
    set({
      filters: {},
      page: 1,
    }),

  // Pagination setters
  setPage: (page: number) => {
    set({ page });
  },

  setLimit: (limit: number) => {
    set({ limit });
  },
}));
