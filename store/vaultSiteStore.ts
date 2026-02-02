import { create } from "zustand";
import {
  fetchVaultSitesApi,
  fetchVaultSiteByIdApi,
  createVaultSiteApi,
  fetchVaultsByVaultSiteApi, // ✅ import the new endpoint
} from "@/services/vaultSiteService";
import type {
  VaultSiteStore,
  CreateVaultSitePayload,
} from "@/types/vault-site";

export const useVaultSiteStore = create<VaultSiteStore>((set, get) => ({
  // state
  vaultSites: [],
  vaultSiteDetails: null,
  vaults: [],
  totalCount: 0,
  limit: 6,
  offset: 0,
  country: undefined,
  loading: false,
  error: null,

  // actions
  fetchVaultSites: async (
    limit = get().limit,
    offset = get().offset,
    country = get().country,
  ) => {
    set({ loading: true, error: null });

    try {
      const data = await fetchVaultSitesApi(limit, offset, country);

      set({
        vaultSites: data.vault_sites ?? [],
        totalCount: data.total_count ?? 0,
        limit: data.limit ?? limit,
        offset: data.offset ?? offset,
        loading: false,
      });
    } catch (err: any) {
      set({
        error:
          err?.response?.data?.message ||
          err?.message ||
          "Failed to fetch vault sites",
        loading: false,
      });
    }
  },

  fetchVaultSiteById: async (id: string) => {
    set({ loading: true, error: null });

    try {
      const data = await fetchVaultSiteByIdApi(id);
      set({ vaultSiteDetails: data, loading: false });
    } catch (err: any) {
      set({
        error:
          err?.response?.data?.message ||
          err?.message ||
          "Failed to fetch vault site details",
        loading: false,
      });
    }
  },

  createVaultSite: async (payload: CreateVaultSitePayload) => {
    set({ loading: true, error: null });

    try {
      const data = await createVaultSiteApi(payload);

      // optional: optimistic update
      set({
        vaultSites: [data, ...get().vaultSites],
        loading: false,
      });

      return data;
    } catch (err: any) {
      set({
        error:
          err?.response?.data?.message ||
          err?.message ||
          "Failed to create vault site",
        loading: false,
      });
      throw err;
    }
  },

  fetchVaultsByVaultSiteId: async (vaultSiteId: string) => {
    set({ loading: true, error: null });

    try {
      const data = await fetchVaultsByVaultSiteApi(vaultSiteId);
      set({ vaults: data?.vaults ?? [], loading: false });
    } catch (err: any) {
      set({
        error:
          err?.response?.data?.message ||
          err?.message ||
          "Failed to fetch vaults for this site",
        loading: false,
      });
    }
  },

  // setters
  setCountry: (country) => set({ country }),
  setOffset: (offset) => set({ offset }),
  setLimit: (limit) => set({ limit }),

  // optional helper
  resetVaultSiteDetails: () => set({ vaultSiteDetails: null }),
}));
