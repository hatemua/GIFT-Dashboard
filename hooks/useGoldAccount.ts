import { useEffect } from "react";
import { useGoldAccountStore } from "@/store/goldAccountStore";
import {
  GoldAccount,
  GoldAccountDetails,
  GoldAccountBalance,
  GoldAccountAssetsResponse,
  GoldAccountAssetsSearchResponse,
  GoldAccountMovementsResponse,
} from "@/types/goldAccount";

interface UseGoldAccountReturn {
  accounts: GoldAccount[];
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
  resetSelectedAccount: () => void;
  fetchAccounts: (limit?: number, page?: number) => Promise<void>;
  fetchAccountByIgan: (igan: string) => Promise<void>;
  fetchAccountBalance: (igan: string, currency?: string) => Promise<void>;
  fetchAccountAssets: (igan: string, params?: any) => Promise<void>;
  searchAccountAssets: (igan: string, params?: any) => Promise<void>;
  fetchAccountMovements: (igan: string, params?: any) => Promise<void>;
}

export const useGoldAccount = (): UseGoldAccountReturn => {
  const store = useGoldAccountStore();

  // Auto-fetch accounts on mount if empty
  useEffect(() => {
     store.fetchAccounts(store.limit, store.page);
  }, [store.page, store.limit]);

  return {
    // Data
    accounts: store.accounts,
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
    resetSelectedAccount: store.resetSelectedAccount,
    fetchAccounts: store.fetchAccounts,
    fetchAccountByIgan: store.fetchAccountByIgan,
    fetchAccountBalance: store.fetchAccountBalance,
    fetchAccountAssets: store.fetchAccountAssets,
    searchAccountAssets: store.searchAccountAssets,
    fetchAccountMovements: store.fetchAccountMovements,
  };
};
