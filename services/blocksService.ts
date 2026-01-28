import { api } from "@/lib/axios";
import { Block } from "@/types/block";

export const blocksService = {
  getBlocks: async (page: number = 1, limit: number = 10) => {
    const res = await api.get(`/blocks`, { params: { page, limit } });
    return res.data as {
      data: Block[];
      totalCount: number;
    };
  },
};
