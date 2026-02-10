import { create } from "zustand";
import {
  fetchVaultSitesApi,
  fetchVaultSiteByIdApi,
  createVaultSiteApi,
  fetchVaultsByVaultSiteApi,
  fetchVaultSiteInventoryApi,
} from "@/services/vaultSiteService";
import type {
  VaultSiteStore,
  CreateVaultSitePayload,
  VaultSiteFilters,
} from "@/types/vault-site";

export const useVaultSiteStore = create<VaultSiteStore>((set, get) => ({
  // state
  vaultSites: [],
  vaultSiteDetails: null,
  vaults: [],
  inventorySummary: null,
  inventoryByOwner: [],
  inventoryByProductType: [],
  inventoryByVault: [],
  totalCount: 0,
  limit: 6,
  offset: 0,
  country: undefined,
  loading: false,
  error: null,
  filters: {},

  // actions
  fetchVaultSites: async (
    limit = get().limit,
    offset = get().offset,
    country = get().country,
  ) => {
    set({ loading: true, error: null });

    try {
      const { offset, limit, filters } = get();

      const data = await fetchVaultSitesApi({ offset, limit, filters });

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

  fetchVaultSiteInventory: async (vaultSiteId, groupBy) => {
    set({ loading: true, error: null });

    try {
      const data = await fetchVaultSiteInventoryApi(
        vaultSiteId,
        groupBy || undefined,
      );

      // If no group_by provided, treat as summary
      if (!groupBy) {
        set({
          inventorySummary: {
            vault_site_id: data.vault_site_id,
            vault_site_name: data.vault_site_name,
            inventory_date: data.inventory_date,
            total_assets: data.total_assets,
            total_weight_grams: data.total_weight_grams,
            total_fine_weight_grams: data.total_fine_weight_grams,
            total_valuation: data.total_valuation,
          },
          loading: false,
        });
        return;
      }

      // Handle grouped data
      switch (groupBy) {
        case "owner":
          set({ inventoryByOwner: data.by_owner, loading: false });
          break;
        case "product_type":
          set({ inventoryByProductType: data.product_type, loading: false });
          break;
        case "vault_id":
          set({ inventoryByVault: data.vault_id, loading: false });
          break;
      }
    } catch (err: any) {
      set({
        error:
          err?.response?.data?.message ||
          err?.message ||
          "Failed to fetch inventory",
        loading: false,
      });
    }
  },

  // setters
  setVaultSiteSummary: (summary) => set({ inventorySummary: summary }),
  setCountry: (country) => set({ country }),
  setOffset: (offset) => set({ offset }),
  setLimit: (limit) => set({ limit }),
  setFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
      offset: 1,
    })),

  resetFilters: () =>
    set({
      filters: {},
      offset: 1,
    }),
  resetVaultSiteDetails: () => set({ vaultSiteDetails: null }),
}));
