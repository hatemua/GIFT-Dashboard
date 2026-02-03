import { create } from "zustand";
import { goldAccountService } from "@/services/goldAccountService";
import {
  GoldAccount,
  GoldAccountDetails,
  GoldAccountBalance,
  GoldAccountAssetsResponse,
  GoldAccountAssetsSearchResponse,
  GoldAccountMovementsResponse,
} from "@/types/goldAccount";

interface GoldAccountStore {
  // Main data
  accounts: GoldAccount[];
  totalCount: number;
  limit: number;
  page: number;

  // Global loading/error for fetchAccounts and fetchAccountByIgan
  loading: boolean;
  error?: string;

  // Selected account details
  selectedAccount?: GoldAccountDetails;
  accountBalance?: GoldAccountBalance;
  accountAssets?: GoldAccountAssetsResponse;
  searchedAssets?: GoldAccountAssetsSearchResponse;
  accountMovements?: GoldAccountMovementsResponse;

  // Per-function loading/error states
  balanceLoading: boolean;
  balanceError?: string;

  assetsLoading: boolean;
  assetsError?: string;

  searchAssetsLoading: boolean;
  searchAssetsError?: string;

  movementsLoading: boolean;
  movementsError?: string;

  // Actions
  fetchAccounts: (limit?: number, page?: number) => Promise<void>;
  fetchAccountByIgan: (igan: string) => Promise<void>;
  fetchAccountBalance: (igan: string, currency?: string) => Promise<void>;
  fetchAccountAssets: (igan: string, params?: any) => Promise<void>;
  searchAccountAssets: (igan: string, params?: any) => Promise<void>;
  fetchAccountMovements: (igan: string, params?: any) => Promise<void>;
  
  resetSelectedAccount: () => void;
  setLimit: (limit: number) => void;
  setPage: (page: number) => void;
}

export const useGoldAccountStore = create<GoldAccountStore>((set, get) => ({
  accounts: [],
  totalCount: 0,
  limit: 6,
  page: 1,

  // Global loading/error for fetching accounts
  loading: false,
  error: undefined,

  // Individual states
  selectedAccount: undefined,
  accountBalance: undefined,
  accountAssets: undefined,
  searchedAssets: undefined,
  accountMovements: undefined,

  // Individual loading/errors
  balanceLoading: false,
  balanceError: undefined,

  assetsLoading: false,
  assetsError: undefined,

  searchAssetsLoading: false,
  searchAssetsError: undefined,

  movementsLoading: false,
  movementsError: undefined,

  fetchAccounts: async (limit = get().limit, page = get().page) => {
    set({ loading: true, error: undefined });
    try {
      const data = await goldAccountService.getAllAccounts({ limit, page });
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

  fetchAccountByIgan: async (igan: string) => {
    set({ loading: true, error: undefined });
    try {
      const data = await goldAccountService.getAccountByIgan(igan);
      set({ selectedAccount: data });
    } catch (err: any) {
      set({ error: err?.message || "Failed to fetch account details" });
    } finally {
      set({ loading: false });
    }
  },

  fetchAccountBalance: async (igan: string, currency?: string) => {
    set({ balanceLoading: true, balanceError: undefined });
    try {
      const data = await goldAccountService.getAccountBalance(igan, currency);
      set({ accountBalance: data });
    } catch (err: any) {
      set({ balanceError: err?.message || "Failed to fetch account balance" });
    } finally {
      set({ balanceLoading: false });
    }
  },

  fetchAccountAssets: async (igan: string, params?: any) => {
    set({ assetsLoading: true, assetsError: undefined });
    try {
      const data = await goldAccountService.getAccountAssets(igan, params);
      set({ accountAssets: data });
    } catch (err: any) {
      set({ assetsError: err?.message || "Failed to fetch account assets" });
    } finally {
      set({ assetsLoading: false });
    }
  },

  searchAccountAssets: async (igan: string, params?: any) => {
    set({ searchAssetsLoading: true, searchAssetsError: undefined });
    try {
      const data = await goldAccountService.searchAccountAssets(igan, params);
      set({ searchedAssets: data });
    } catch (err: any) {
      set({
        searchAssetsError: err?.message || "Failed to search account assets",
      });
    } finally {
      set({ searchAssetsLoading: false });
    }
  },

  fetchAccountMovements: async (igan: string, params?: any) => {
    set({ movementsLoading: true, movementsError: undefined });
    try {
      const data = await goldAccountService.getAccountMovements(igan, params);
      set({ accountMovements: data });
    } catch (err: any) {
      set({
        movementsError: err?.message || "Failed to fetch account movements",
      });
    } finally {
      set({ movementsLoading: false });
    }
  },

  resetSelectedAccount: () =>
    set({
      selectedAccount: undefined,
      accountBalance: undefined,
      accountAssets: undefined,
      searchedAssets: undefined,
      accountMovements: undefined,
      balanceLoading: false,
      balanceError: undefined,
      assetsLoading: false,
      assetsError: undefined,
      searchAssetsLoading: false,
      searchAssetsError: undefined,
      movementsLoading: false,
      movementsError: undefined,
    }),

  setLimit: (limit: number) => set({ limit }),
  setPage: (page: number) => set({ page }),
}));
