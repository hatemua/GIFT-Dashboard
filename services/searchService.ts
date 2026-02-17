import { api } from "@/lib/axios";
import { SearchResponse } from "@/types/search";

export const searchService = {
  searchAll: async (
    query: string,
    page: number = 1,
    limit: number = 3,
  ): Promise<SearchResponse> => {
    if (!query.trim()) {
      return {
        page,
        limit,
        count: 0,
        data: [],
      };
    }

    const { data } = await api.get<SearchResponse>("/dashboard/search", {
      params: { search: query.toString(), page, limit },
    });

    return data;
  },
};
