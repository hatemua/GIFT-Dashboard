import { api } from "@/lib/axios";
import { DashboardKPIs, GoldPriceResponse } from "@/types/kpi";

export const kpiService = {
  getDashboardKPIs: async (): Promise<DashboardKPIs> => {
    const { data } = await api.get<DashboardKPIs>("/dashboard/kpis");
    return data;
  },
  getGoldPrice: async (): Promise<GoldPriceResponse> => {
    const { data } = await api.get<GoldPriceResponse>("/dashboard/gold-price");
    return data;
  },
};
