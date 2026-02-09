import { useTransactionStore } from "@/store/transactionStore";
import {
  Transaction,
  TransactionItem,
  TransactionOrdersFilters,
  TransactionDetails,
  TransactionEventsResponse,
} from "@/types/transaction";

interface UseTransactionReturn {
  transactions: TransactionItem[];
  transactionDetails?: TransactionDetails;
  transactionEvents?: TransactionEventsResponse;

  count: number;
  page: number;
  limit: number;
  loading: boolean;
  loadingEvents: boolean;
  error?: string;
  filters: TransactionOrdersFilters;

  fetchTransactions: () => Promise<void>;
  createTransaction: (transaction: Transaction) => Promise<Transaction | undefined>;
  fetchTransactionByReference: (reference: string) => Promise<void>;
  fetchTransactionEvents: (reference: string) => Promise<void>;
  setFilters: (filters: TransactionOrdersFilters) => void;
  resetFilters: () => void;
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
    transactionDetails,
    transactionEvents,
    count,
    page,
    limit,
    loading,
    error,
    filters,
    loadingEvents,
    fetchTransactions,
    createTransaction,
    fetchTransactionByReference,
    fetchTransactionEvents,
    setFilters,
    resetFilters,
    setPage,
    setLimit,
  } = useTransactionStore((state) => state);

  return {
    transactions,
    transactionDetails,
    transactionEvents,
    count,
    page,
    limit,
    loading,
    loadingEvents,
    error,
    filters,
    fetchTransactions,
    createTransaction,
    fetchTransactionByReference,
    fetchTransactionEvents,
    setFilters,
    resetFilters,
    setPage,
    setLimit,
  };
};
