import { create } from "zustand";
import { blockchainTransactionService } from "@/services/blockchainTransactionService";
import {
  BlockchainTransaction,
  BlockchainTransactionFilters,
  BlockchainTransactionResponse,
} from "@/types/blockchainTransaction";

interface BlockchainTransactionState {
  transactions: BlockchainTransaction[];
  count: number;

  page: number;
  limit: number;

  loading: boolean;
  error?: string;

  filters: BlockchainTransactionFilters;

  fetchTransactions: () => Promise<void>;
  setFilters: (filters: Partial<BlockchainTransactionFilters>) => void;
  resetFilters: () => void;

  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
}

export const useBlockchainTransactionStore = create<BlockchainTransactionState>(
  (set, get) => ({
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

        const data: BlockchainTransactionResponse =
          await blockchainTransactionService.getTransactions({
            page,
            limit,
            filters,
          });

        set({
          transactions: data.transactions,
          count: data.count,
          loading: false,
        });
      } catch (err: any) {
        set({
          error: err?.message || "Failed to fetch transactions",
          loading: false,
        });
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

    setPage: (page) => set({ page }),
    setLimit: (limit) => set({ limit, page: 1 }),
  }),
);
