import { useEffect } from "react";
import { useGoldAccountStore } from "@/store/goldAccountStore";
import { GoldAccount } from "@/types/goldAccount";

interface UseGoldAccountReturn {
  accounts: GoldAccount[];
  loading: boolean;
  page: number;
  totalCount: number;
  limit: number;
  error?: string;
  setPage: (page: number) => void;
  fetchAccounts: (limit?: number, page?: number) => Promise<void>;
}

export const useGoldAccount = (): UseGoldAccountReturn => {
  const accounts = useGoldAccountStore((state) => state.accounts);
  const loading = useGoldAccountStore((state) => state.loading);
  const error = useGoldAccountStore((state) => state.error);

  const totalCount = useGoldAccountStore((state) => state.totalCount);
  const page = useGoldAccountStore((state) => state.page);
  const limit = useGoldAccountStore((state) => state.limit);

  const fetchAccounts = useGoldAccountStore((state) => state.fetchAccounts);
  const setPage = useGoldAccountStore((state) => state.setPage);

  // Auto-fetch on mount if empty
  useEffect(() => {
    if (accounts.length === 0) fetchAccounts();
  }, []);

  return {
    accounts,
    limit,
    page,
    totalCount,
    loading,
    error,
    fetchAccounts,
    setPage,
  };
};
