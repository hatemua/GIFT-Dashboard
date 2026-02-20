import { create } from "zustand";
import {
  fetchVaultSitesApi,
  fetchVaultSiteByIdApi,
  createVaultSiteApi,
  fetchVaultSiteInventoryApi,
} from "@/services/vaultSiteService";
import type {
  VaultSiteStore,
  CreateVaultSitePayload,
} from "@/types/vault-site";

export const useVaultSiteStore = create<VaultSiteStore>((set, get) => ({
  // state
  vaultSites: [],
  vaultSiteDetails: null,
  inventorySummary: null,
  inventoryByOwner: [],
  inventoryByProductType: [],
  inventoryByVault: [],
  totalCount: 0,
  limit: 6,
  page: 1,
  country: undefined,
  loading: false,
  error: null,
  vaultsLoading: false,
  vaultsError: null,
  inventoryLoading: false,
  inventoryError: null,
  filters: {},

  // actions
  fetchVaultSites: async () => {
    set({ loading: true, error: null });

    try {
      const { page, limit, filters } = get();

      const data = await fetchVaultSitesApi({ page, limit, filters });

      set({
        vaultSites: data.vault_sites ?? [],
        totalCount: data.total_count ?? 0,
        limit: Number(data.limit) ?? limit,
        page: Number(data.page) ?? page,
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

  fetchVaultSiteInventory: async (vaultSiteId, groupBy) => {
    set({ inventoryLoading: true, inventoryError: null });

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
          inventoryLoading: false,
        });
        return;
      }

      // Handle grouped data
      switch (groupBy) {
        case "owner":
          set({ inventoryByOwner: data.owner, inventoryLoading: false });
          break;
        case "product_type":
          set({
            inventoryByProductType: data.product_type,
            inventoryLoading: false,
          });
          break;
        case "vault_id":
          set({ inventoryByVault: data.vault_id, inventoryLoading: false });
          break;
      }
    } catch (err: any) {
      set({
        inventoryError:
          err?.response?.data?.message ||
          err?.message ||
          "Failed to fetch inventory",
        inventoryLoading: false,
      });
    }
  },

  // setters
  setVaultSiteSummary: (summary) => set({ inventorySummary: summary }),
  setCountry: (country) => set({ country }),
  setPage: (page: number) => set({ page }),
  setLimit: (limit) => set({ limit }),
  setFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
      page: 1,
    })),

  resetFilters: () =>
    set({
      filters: {},
      page: 1,
    }),
  resetVaultSiteDetails: () => set({ vaultSiteDetails: null }),
}));
