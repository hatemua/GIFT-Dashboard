
import { fetchVaultSitesApi } from "@/services/vaultSiteService";
import { VaultSiteStore } from "@/types/vault-site";
import { create } from "zustand";

export const useVaultSiteStore = create<VaultSiteStore>((set, get) => ({
  vaultSites: [],
  totalCount: 0,
  limit: 50,
  offset: 0,
  country: null,
  loading: false,
  error: null,
  vaultSiteDetails: null,

  fetchVaultSites: async (
    limit = get().limit,
    offset = get().offset,
    country = get().country || undefined,
  ) => {
    set({ loading: true, error: null });
    try {
      const data = await fetchVaultSitesApi(
        limit,
        offset,
        country || undefined,
      );
      set({
        vaultSites: data.vault_sites,
        totalCount: data.total_count,
        limit: data.limit,
        offset: data.offset,
        loading: false,
      });
    } catch (error: any) {
      set({
        error: error.message || "Failed to fetch vault sites",
        loading: false,
      });
    }
  },
  setCountry: (country) => set({ country }),
  setOffset: (offset) => set({ offset }),
}));
