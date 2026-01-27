import { create } from "zustand";
import { goldAccountService } from "@/services/goldAccountService";
import { GoldAccount } from "@/types/goldAccount";

interface GoldAccountStore {
  accounts: GoldAccount[];
  totalCount: number;
  limit: number;
  page: number;
  loading: boolean;
  error?: string;

  fetchAccounts: (
    limit?: number,
    page?: number,
  ) => Promise<void>;

  setLimit: (limit: number) => void;
  setPage: (page: number) => void;
}

export const useGoldAccountStore = create<GoldAccountStore>((set, get) => ({
  accounts: [],
  totalCount: 0,
  limit: 6,
  page: 1,
  loading: false,
  error: undefined,

  fetchAccounts: async (limit = get().limit, page = get().page) => {
    set({ loading: true, error: undefined });
    try {
      const data = await goldAccountService.getAllAccounts({
        limit,
        page,
      });

      set({
        accounts: data.accounts,
        totalCount: data.total_count,
        limit: data.limit,
        page: data.page,
      });
    } catch (err: any) {
      set({ error: err?.message || "Failed to fetch gold accounts" });
    } finally {
      set({ loading: false });
    }
  },

  setLimit: (limit: number) => set({ limit }),
  setPage: (page: number) => set({ page }),
}));
