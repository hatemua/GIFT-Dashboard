import { create } from "zustand";
import { transactionService } from "@/services/transactionService";
import { Transaction } from "@/types/transaction";

interface TransactionState {
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

export const useTransactionStore = create<TransactionState>((set, get) => ({
  transactions: [],
  totalCount: 0,
  page: 1,
  limit: 10,
  loading: false,
  error: undefined,

  fetchTransactions: async (
    page = get().page,
    limit = get().limit,
    filters
  ) => {
    set({ loading: true, error: undefined });
    try {
      const data = await transactionService.getTransactions(page, limit, filters);
      set({
        transactions: data.data,
        totalCount: data.totalCount,
        page,
        limit,
      });
    } catch (err: any) {
      set({ error: err?.message || "Failed to fetch transactions" });
    } finally {
      set({ loading: false });
    }
  },

  createTransaction: async (transaction: Transaction) => {
    set({ loading: true, error: undefined });
    try {
      const data = await transactionService.createTransaction(transaction);
      set({ transactions: [data, ...get().transactions] });
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

  setPage: (page: number) => set({ page }),
  setLimit: (limit: number) => set({ limit }),
}));
