import { useTransactionStore } from "@/store/transactionStore";
import {
  Transaction,
  TransactionItem,
  TransactionOrdersFilters,
  TransactionDetails,
  TransactionEventsResponse,
  CreateTransactionInput,
  SignTransactionResponse,
  UpdateTransactionStatusResponse,
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
  signing: boolean;
  lastSignedTransaction?: SignTransactionResponse;
  error?: string;
  filters: TransactionOrdersFilters;

  fetchTransactions: () => Promise<void>;
  createTransaction: (
    transaction: CreateTransactionInput,
  ) => Promise<Transaction | undefined>;
  fetchTransactionByReference: (reference: string) => Promise<void>;
  fetchTransactionEvents: (reference: string) => Promise<void>;
  signTransaction: (
    reference: string,
    signature: string,
    role: "counterparty" | "initiator",
  ) => Promise<SignTransactionResponse | undefined>;
  updateTransactionStatus: (
    reference: string,
    new_status: string,
    reason?: string | null,
  ) => Promise<UpdateTransactionStatusResponse | undefined>;

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
    loadingEvents,
    signing,
    lastSignedTransaction,
    error,
    filters,
    fetchTransactions,
    createTransaction,
    fetchTransactionByReference,
    fetchTransactionEvents,
    signTransaction,
    updateTransactionStatus,
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
    signing,
    lastSignedTransaction,
    error,
    filters,
    fetchTransactions,
    createTransaction,
    fetchTransactionByReference,
    fetchTransactionEvents,
    signTransaction,
    updateTransactionStatus,
    setFilters,
    resetFilters,
    setPage,
    setLimit,
  };
};
