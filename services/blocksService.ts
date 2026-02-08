import { api } from "@/lib/axios";
import { GetBlocksParams } from "@/types/block";

export const blocksService = {
  getBlocks: async ({ page = 1, limit = 6, filters = {} }: GetBlocksParams) => {
    const res = await api.get(`/dashboard/blocks`, {
      params: {
        page,
        limit,
        search: filters.search,
        from_date: filters.from_date,
        to_date: filters.to_date,
      },
    });
    return res.data;
  },
};
