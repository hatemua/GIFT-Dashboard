import { useKPIStore } from "@/store/kpiStore";

export const useKPIs = () => {
  const {
    kpis,
    loading,
    error,
    fetchKPIs,
    clearError,
  } = useKPIStore();

  return {
    kpis,
    loading,
    error,
    fetchKPIs,
    clearError,
  };
};
