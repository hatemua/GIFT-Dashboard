import { create } from "zustand";
import { DashboardKPIs } from "@/types/kpi";
import { kpiService } from "@/services/kpiService";

interface KPIState {
  kpis: DashboardKPIs | null;
  loading: boolean;
  error: string | null;
  fetchKPIs: () => Promise<void>;
  clearError: () => void;
}

export const useKPIStore = create<KPIState>((set) => ({
  kpis: null,
  loading: false,
  error: null,

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

  clearError: () => set({ error: null }),
}));
