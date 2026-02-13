import { create } from "zustand";
import { SearchResult } from "@/types/search";
import { searchService, SearchResponse } from "@/services/searchService";

interface SearchState {
  open: boolean;
  query: string;
  results: SearchResult[];
  loading: boolean;
  page: number;
  limit: number;
  total: number;
  setOpen: (val: boolean) => void;
  setQuery: (val: string) => void;
  setPage: (val: number) => void;
  setLimit: (val: number) => void;
  search: (val?: string) => Promise<void>;
  reset: () => void;
}

export const useSearchStore = create<SearchState>((set, get) => ({
  open: false,
  query: "",
  results: [],
  loading: false,
  page: 1,
  limit: 10,
  total: 0,

  // open/close modal
  setOpen: (val) => set({ open: val }),

  // set query and reset page
  setQuery: (val) => {
    set({ query: val, page: 1 });
    get().search(val);
  },

  // set page
  setPage: (val) => {
    set({ page: val });
    get().search();
  },

  // set limit
  setLimit: (val) => {
    set({ limit: val, page: 1 });
    get().search();
  },

  // call the endpoint
  search: async (val?: string) => {
    const query = val ?? get().query;
    const { page, limit } = get();

    if (!query.trim()) {
      set({ results: [], loading: false, total: 0 });
      return;
    }

    set({ loading: true });

    try {
      const data: SearchResponse = await searchService.searchAll(query, page, limit);
      set({ results: data.results, total: data.total });
    } catch (err) {
      console.error(err);
      set({ results: [], total: 0 });
    } finally {
      set({ loading: false });
    }
  },

  // reset modal state
  reset: () => set({ query: "", results: [], loading: false, page: 1, limit: 10, total: 0 }),
}));
