import { blocksService } from "@/services/blocksService";
import { Block } from "@/types/block";
import { create } from "zustand";

interface BlocksStore {
  blocks: Block[];
  totalCount: number;
  page: number;
  limit: number;
  loading: boolean;
  error?: string;
  fetchBlocks: (page?: number, limit?: number) => Promise<void>;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
}

export const useBlocksStore = create<BlocksStore>((set, get) => ({
  blocks: [],
  totalCount: 0,
  page: 1,
  limit: 10,
  loading: false,
  error: undefined,

  fetchBlocks: async (page = get().page, limit = get().limit) => {
    set({ loading: true, error: undefined });
    try {
      const { data, totalCount }= await blocksService.getBlocks(page, limit);
      set({
        blocks: data,
        totalCount,
        page,
        limit,
      });
    } catch (err: any) {
      set({ error: err?.message || "Failed to fetch blocks" });
    } finally {
      set({ loading: false });
    }
  },

  setPage: (page) => set({ page }),
  setLimit: (limit) => set({ limit }),
}));
