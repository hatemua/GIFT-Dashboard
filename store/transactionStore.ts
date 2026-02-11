import { create } from "zustand";
import { transactionService } from "@/services/transactionService";
import {
  Transaction,
  TransactionItem,
  TransactionOrdersFilters,
  TransactionOrdersResponse,
  TransactionDetails,
  TransactionEventsResponse,
  CreateTransactionInput,
} from "@/types/transaction";

interface TransactionState {
  transactions: TransactionItem[];
  transactionDetails?: TransactionDetails;
  transactionEvents?: TransactionEventsResponse;
  count: number;
  page: number;
  limit: number;
  loading: boolean;
  loadingEvents: boolean; // separate loading for events
  error?: string;
  filters: TransactionOrdersFilters;

  fetchTransactions: () => Promise<void>;
  createTransaction: (transaction: CreateTransactionInput) => Promise<Transaction | undefined>;
  fetchTransactionByReference: (reference: string) => Promise<void>;
  fetchTransactionEvents: (reference: string) => Promise<void>;
  setFilters: (filters: TransactionOrdersFilters) => void;
  resetFilters: () => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
}

export const useTransactionStore = create<TransactionState>((set, get) => ({
  transactions: [],
  transactionDetails: undefined,
  transactionEvents: undefined,
  count: 0,
  page: 1,
  limit: 6,
  loading: false,
  loadingEvents: false, // initialize
  error: undefined,
  filters: {},

  fetchTransactions: async () => {
    set({ loading: true, error: undefined });
    try {
      const { page, limit, filters } = get();
      const data: TransactionOrdersResponse =
        await transactionService.getTransactions({ page, limit, filters });
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

  createTransaction: async (transaction: CreateTransactionInput) => {
    set({ loading: true, error: undefined });
    try {
      const data = await transactionService.createTransaction(transaction);
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

  fetchTransactionByReference: async (reference: string) => {
    set({ loading: true, error: undefined, transactionDetails: undefined });
    try {
      const data: TransactionDetails =
        await transactionService.getTransactionByReference(reference);
      set({ transactionDetails: data });
    } catch (err: any) {
      const message =
        err?.response?.data?.error_description ||
        err?.message ||
        "Failed to fetch transaction";
      set({ error: message });
    } finally {
      set({ loading: false });
    }
  },

  fetchTransactionEvents: async (reference: string) => {
    set({ loadingEvents: true, error: undefined, transactionEvents: undefined });
    try {
      const data: TransactionEventsResponse =
        await transactionService.getTransactionEventsByReference(reference);
      set({ transactionEvents: data });
    } catch (err: any) {
      const message =
        err?.response?.data?.error_description ||
        err?.message ||
        "Failed to fetch transaction events";
      set({ error: message });
    } finally {
      set({ loadingEvents: false });
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
