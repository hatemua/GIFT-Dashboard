import { api } from "@/lib/axios";
import { SearchResult } from "@/types/search";

export interface SearchResponse {
  results: SearchResult[];
  total: number;
}

export const searchService = {
  searchAll: async (
    query: string,
    page: number = 1,
    limit: number = 10
  ): Promise<SearchResponse> => {
    if (!query.trim()) {
      return { results: [], total: 0 };
    }

    const { data } = await api.get<SearchResponse>("/search", {
      params: { q: query, page, limit },
    });

    return data;
  },
};
