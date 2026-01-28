import { useEffect } from "react";
import { useTransactionStore } from "@/store/transactionStore";
import { Transaction } from "@/types/transaction";

interface UseTransactionReturn {
  transactions: Transaction[];
  totalCount: number;
  page: number;
  limit: number;
  loading: boolean;
  error?: string;

  fetchTransactions: (
    page?: number,
    limit?: number,
    filters?: { transaction_reference?: string; transaction_type?: string }
  ) => Promise<void>;

  createTransaction: (transaction: Transaction) => Promise<Transaction | undefined>;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
}

/**
 * Custom hook to use transactions with pagination.
 * Automatically fetches transactions on mount if empty.
 */
export const useTransaction = (): UseTransactionReturn => {
  const {
    transactions,
    totalCount,
    page,
    limit,
    loading,
    error,
    fetchTransactions,
    createTransaction,
    setPage,
    setLimit,
  } = useTransactionStore((state) => state);

  useEffect(() => {
    if (transactions.length === 0) fetchTransactions();
  }, []);

  return {
    transactions,
    totalCount,
    page,
    limit,
    loading,
    error,
    fetchTransactions,
    createTransaction,
    setPage,
    setLimit,
  };
};
