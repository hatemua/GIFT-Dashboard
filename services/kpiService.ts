import { api } from "@/lib/axios";
import { DashboardKPIs } from "@/types/kpi";

export const kpiService = {
  getDashboardKPIs: async (): Promise<DashboardKPIs> => {
    const { data } = await api.get<DashboardKPIs>("/dashboard/kpis");
    return data;
  },
};
