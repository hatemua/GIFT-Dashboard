import { useEffect } from "react";
import { useBlockchainTransactionStore } from "@/store/blockchainTransactionStore";
import { BlockchainTransaction } from "@/types/blockchainTransaction";

interface UseBlockchainTransactionsReturn {
  transactions: BlockchainTransaction[];
  totalCount: number;
  page: number;
  limit: number;
  loading: boolean;
  error?: string;

  fetchTransactions: (
    page?: number,
    limit?: number,
  ) => Promise<void>;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
}

export const useBlockchainTransactions =
  (): UseBlockchainTransactionsReturn => {
    const {
      transactions,
      loading,
      error,
      fetchTransactions,
      setPage,
      setLimit,
    } = useBlockchainTransactionStore((state) => state);

    // Auto-fetch on mount if transactions list is empty
    useEffect(() => {
      if (transactions.items.length === 0) fetchTransactions();
    }, []);

    return {
      transactions: transactions.items,
      totalCount: transactions.totalCount,
      page: transactions.page,
      limit: transactions.limit,
      loading,
      error,
      fetchTransactions,
      setPage,
      setLimit,
    };
  };
