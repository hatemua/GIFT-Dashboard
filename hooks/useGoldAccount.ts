import { useEffect } from "react";
import { useGoldAccountStore } from "@/store/goldAccountStore";
import {
  GoldAccount,
  GoldAccountDetails,
  GoldAccountBalance,
  GoldAccountAssetsResponse,
  GoldAccountAssetsSearchResponse,
  GoldAccountMovementsResponse,
  CreateGoldAccountResponse,
  CreateGoldAccountPayload,
  AccountsFilters,
} from "@/types/goldAccount";

interface UseGoldAccountReturn {
  accounts: GoldAccount[];
  createdAccount?: CreateGoldAccountResponse;
  selectedAccount?: GoldAccountDetails;
  accountBalance?: GoldAccountBalance;
  accountAssets?: GoldAccountAssetsResponse;
  searchedAssets?: GoldAccountAssetsSearchResponse;
  accountMovements?: GoldAccountMovementsResponse;

  // Global states
  loading: boolean;
  error?: string;
  page: number;
  limit: number;
  totalCount: number;
  filters: AccountsFilters;

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
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setFilters: (filters: AccountsFilters) => void;
  resetFilters: () => void;
  resetSelectedAccount: () => void;
  createAccount: (payload: CreateGoldAccountPayload) => Promise<void>;
  fetchAccounts: () => Promise<void>;
  fetchAccountByIgan: (igan: string) => Promise<void>;
  fetchAccountBalance: (igan: string, currency?: string) => Promise<void>;
  fetchAccountAssets: (igan: string, params?: any) => Promise<void>;
  searchAccountAssets: (igan: string, params?: any) => Promise<void>;
  fetchAccountMovements: (igan: string, params?: any) => Promise<void>;
}

export const useGoldAccount = (): UseGoldAccountReturn => {
  const store = useGoldAccountStore();

  return {
    // Data
    accounts: store.accounts,
    createdAccount: store.createdAccount,
    selectedAccount: store.selectedAccount,
    accountBalance: store.accountBalance,
    accountAssets: store.accountAssets,
    searchedAssets: store.searchedAssets,
    accountMovements: store.accountMovements,

    // Global states
    loading: store.loading,
    error: store.error,
    page: store.page,
    limit: store.limit,
    totalCount: store.totalCount,
    filters: store.filters,

    // Per-function loading/error
    balanceLoading: store.balanceLoading,
    balanceError: store.balanceError,

    assetsLoading: store.assetsLoading,
    assetsError: store.assetsError,

    searchAssetsLoading: store.searchAssetsLoading,
    searchAssetsError: store.searchAssetsError,

    movementsLoading: store.movementsLoading,
    movementsError: store.movementsError,

    // Actions
    setPage: store.setPage,
    setLimit: store.setLimit,
    setFilters: store.setFilters,
    resetFilters: store.resetFilters,
    resetSelectedAccount: store.resetSelectedAccount,
    createAccount: store.createAccount,
    fetchAccounts: store.fetchAccounts,
    fetchAccountByIgan: store.fetchAccountByIgan,
    fetchAccountBalance: store.fetchAccountBalance,
    fetchAccountAssets: store.fetchAccountAssets,
    searchAccountAssets: store.searchAccountAssets,
    fetchAccountMovements: store.fetchAccountMovements,
  };
};
