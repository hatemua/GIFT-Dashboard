import { useTransactionStore } from "@/store/transactionStore";
import { Transaction, TransactionItem, TransactionOrdersFilters } from "@/types/transaction";

interface UseTransactionReturn {
  transactions: TransactionItem[];
  count: number;
  page: number;
  limit: number;
  loading: boolean;
  error?: string;
  filters: TransactionOrdersFilters;

  fetchTransactions: () => Promise<void>;

  createTransaction: (
    transaction: Transaction,
  ) => Promise<Transaction | undefined>;
  setFilters: (filters: TransactionOrdersFilters) => void;
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
    count,
    page,
    limit,
    loading,
    error,
    filters,
    fetchTransactions,
    createTransaction,
    setFilters,
    setPage,
    setLimit,
  } = useTransactionStore((state) => state);

  return {
    transactions,
    count,
    page,
    limit,
    loading,
    error,
    filters,
    fetchTransactions,
    createTransaction,
    setFilters,
    setPage,
    setLimit,
  };
};
