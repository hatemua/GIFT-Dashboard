import { useEffect } from "react";
import { useTransactionStore } from "@/store/transactionStore";
import { Transaction } from "@/types/transaction";

interface UseTransactionReturn {
  transactions: Transaction[];
  loading: boolean;
  error?: string;
  fetchTransactions: () => Promise<void>;
  createTransaction: (
    transaction: Transaction,
  ) => Promise<Transaction | undefined>;
}

/**
 * Custom hook to use transactions.
 * Automatically fetches transactions on mount if empty.
 */
export const useTransaction = (): UseTransactionReturn => {
  const { transactions, loading, error, fetchTransactions, createTransaction } =
    useTransactionStore();

  return {
    transactions,
    loading,
    error,
    fetchTransactions,
    createTransaction,
  };
};
