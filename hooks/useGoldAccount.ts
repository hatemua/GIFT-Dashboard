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

  loading: boolean;
  page: number;
  limit: number;
  totalCount: number;
  error?: string;

  // Actions
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  fetchAccounts: (limit?: number, page?: number) => Promise<void>;
  fetchAccountByIgan: (igan: string) => Promise<void>;
  fetchAccountBalance: (igan: string, currency?: string) => Promise<void>;
  fetchAccountAssets: (igan: string, params?: any) => Promise<void>;
  searchAccountAssets: (igan: string, params?: any) => Promise<void>;
  fetchAccountMovements: (igan: string, params?: any) => Promise<void>;
}

export const useGoldAccount = (): UseGoldAccountReturn => {
  // State
  const accounts = useGoldAccountStore((state) => state.accounts);
  const selectedAccount = useGoldAccountStore((state) => state.selectedAccount);
  const accountBalance = useGoldAccountStore((state) => state.accountBalance);
  const accountAssets = useGoldAccountStore((state) => state.accountAssets);
  const searchedAssets = useGoldAccountStore((state) => state.searchedAssets);
  const accountMovements = useGoldAccountStore((state) => state.accountMovements);

  const loading = useGoldAccountStore((state) => state.loading);
  const error = useGoldAccountStore((state) => state.error);
  const totalCount = useGoldAccountStore((state) => state.totalCount);
  const page = useGoldAccountStore((state) => state.page);
  const limit = useGoldAccountStore((state) => state.limit);

  // Actions
  const fetchAccounts = useGoldAccountStore((state) => state.fetchAccounts);
  const fetchAccountByIgan = useGoldAccountStore((state) => state.fetchAccountByIgan);
  const fetchAccountBalance = useGoldAccountStore((state) => state.fetchAccountBalance);
  const fetchAccountAssets = useGoldAccountStore((state) => state.fetchAccountAssets);
  const searchAccountAssets = useGoldAccountStore((state) => state.searchAccountAssets);
  const fetchAccountMovements = useGoldAccountStore((state) => state.fetchAccountMovements);
  const setPage = useGoldAccountStore((state) => state.setPage);
  const setLimit = useGoldAccountStore((state) => state.setLimit);

  // Auto-fetch accounts on mount if empty
  useEffect(() => {
    if (accounts.length === 0) fetchAccounts();
  }, []);

  return {
    accounts,
    selectedAccount,
    accountBalance,
    accountAssets,
    searchedAssets,
    accountMovements,
    loading,
    page,
    limit,
    totalCount,
    error,
    fetchAccounts,
    fetchAccountByIgan,
    fetchAccountBalance,
    fetchAccountAssets,
    searchAccountAssets,
    fetchAccountMovements,
    setPage,
    setLimit,
  };
};
