import { create } from "zustand";
import { transactionService } from "@/services/transactionService";
import {
  Transaction,
  TransactionItem,
  TransactionOrdersFilters,
  TransactionOrdersResponse,
} from "@/types/transaction";

interface TransactionState {
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

export const useTransactionStore = create<TransactionState>((set, get) => ({
  transactions: [],
  count: 0,
  page: 1,
  limit: 6,
  loading: false,
  error: undefined,
  filters: {},

  fetchTransactions: async () => {
    set({ loading: true, error: undefined });
    try {
      const { page, limit, filters } = get();

      const data: TransactionOrdersResponse =
        await transactionService.getTransactions({
          page,
          limit,
          filters,
        });
      set({
        transactions: data.transactions,
        count: data.count,
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

  setFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
      page: 1,
    })),

  resetFilters: () =>
    set({
      filters: {},
      page: 1,
    }),
  setPage: (page: number) => set({ page }),
  setLimit: (limit: number) => set({ limit }),
}));
