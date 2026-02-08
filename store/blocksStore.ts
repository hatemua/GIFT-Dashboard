import { blocksService } from "@/services/blocksService";
import { BlockItem, BlocksFilters } from "@/types/block";
import { create } from "zustand";

interface BlocksStore {
  blocks: BlockItem[];
  count: number;
  page: number;
  limit: number;
  filters: BlocksFilters;
  loading: boolean;
  error?: string;
  fetchBlocks: () => Promise<void>;
  setFilters: (filters: BlocksFilters) => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
}

export const useBlocksStore = create<BlocksStore>((set, get) => ({
  blocks: [],
  count: 0,
  page: 1,
  limit: 6,
  loading: false,
  error: undefined,
  filters: {},

  fetchBlocks: async (page = get().page, limit = get().limit) => {
    set({ loading: true, error: undefined });
    try {
      const { page, limit, filters } = get();
      const data = await blocksService.getBlocks({
        page,
        limit,
        filters,
      });
      set({
        blocks: data.transactions,
        count: data.count,
        page,
        limit,
      });
    } catch (err: any) {
      set({ error: err?.message || "Failed to fetch blocks" });
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
  setPage: (page) => set({ page }),
  setLimit: (limit) => set({ limit }),
}));
