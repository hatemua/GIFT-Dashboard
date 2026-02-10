import { create } from "zustand";
import { DashboardKPIs, GoldPriceResponse } from "@/types/kpi";
import { kpiService } from "@/services/kpiService";

interface KPIState {
  kpis: DashboardKPIs;
  goldPrice: GoldPriceResponse | null;
  loading: boolean;
  goldPriceLoading: boolean;
  error: string | null;
  goldPriceError: string | null;
  fetchKPIs: () => Promise<void>;
  fetchGoldPrice: () => Promise<void>;
  clearError: () => void;
}

export const useKPIStore = create<KPIState>((set) => ({
  kpis: {
    gold_weight: 0,
    number_of_gold_accounts: 0,
    number_of_members: 0,
    number_of_transactions: 0,
    value_in_dollars: 0,
  },
  goldPrice: null,
  goldPriceLoading: false,
  loading: false,
  error: null,
  goldPriceError: null,

  fetchKPIs: async () => {
    set({ loading: true, error: null });
    try {
      const data = await kpiService.getDashboardKPIs();
      set({ kpis: data, loading: false });
    } catch (err: any) {
      set({
        loading: false,
        error: err?.response?.data?.message ?? "Failed to load KPIs",
      });
    }
  },
  fetchGoldPrice: async () => {
    set({ goldPriceLoading: true, goldPriceError: null });
    try {
      const data = await kpiService.getGoldPrice();
      set({ goldPrice: data, goldPriceLoading: false });
    } catch (err: any) {
      set({
        goldPriceLoading: false,
        goldPriceError: err?.response?.data?.message ?? "Failed to load gold price",
      });
    }
  },

  clearError: () => set({ error: null }),
}));
