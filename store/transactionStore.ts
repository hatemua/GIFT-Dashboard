import { create } from "zustand";
import { transactionService } from "@/services/transactionService";
import { Transaction } from "@/types/transaction";

interface TransactionState {
  transactions: Transaction[];
  loading: boolean;
  error?: string;
  fetchTransactions: () => Promise<void>;
  createTransaction: (
    transaction: Transaction,
  ) => Promise<Transaction | undefined>;
}

export const useTransactionStore = create<TransactionState>((set, get) => ({
  transactions: [],
  loading: false,
  error: undefined,

  fetchTransactions: async () => {
    set({ loading: true, error: undefined });
    try {
      const data = await transactionService.getTransactions();
      set({ transactions: data });
    } catch (err: any) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  createTransaction: async (transaction: Transaction) => {
    set({ loading: true, error: undefined });
    try {
      const data = await transactionService.createTransaction(transaction);
      set({ transactions: [...get().transactions, data] });
      return data;
    } catch (err: any) {
const message =
    err?.response?.data?.error_description ||
    err?.message ||
    "Failed to create transaction";

  set({ error: message });
  throw new Error(message);
    } finally {
      set({ loading: false });
    }
  },
}));
