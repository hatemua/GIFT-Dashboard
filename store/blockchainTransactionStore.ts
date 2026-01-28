import { create } from "zustand";
import { blockchainTransactionService } from "@/services/blockchainTransactionService";
import { PaginatedTransactions } from "@/types/blockchainTransaction";

interface BlockchainTransactionStore {
  transactions: PaginatedTransactions;
  loading: boolean;
  error?: string;

  fetchTransactions: (page?: number, limit?: number) => Promise<void>;

  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
}

export const useBlockchainTransactionStore = create<BlockchainTransactionStore>(
  (set, get) => ({
    transactions: { items: [], totalCount: 0, page: 1, limit: 10 },
    transaction: undefined,
    loading: false,
    error: undefined,

    fetchTransactions: async (
      page = get().transactions.page,
      limit = get().transactions.limit,
    ) => {
      set({ loading: true, error: undefined });
      try {
        const { data, totalCount } =
          await blockchainTransactionService.getTransactions(page, limit);
        set({
          transactions: {
            items: data,
            totalCount,
            page,
            limit,
          },
        });
      } catch (err: any) {
        set({ error: err?.message || "Failed to fetch transactions" });
      } finally {
        set({ loading: false });
      }
    },

    setPage: (page) =>
      set((state) => ({
        transactions: { ...state.transactions, page },
      })),

    setLimit: (limit) =>
      set((state) => ({
        transactions: { ...state.transactions, limit },
      })),
  }),
);
