import { useEffect } from "react";
import { useKPIStore } from "@/store/kpiStore";

export const useKPIs = () => {
  const {
    kpis,
    loading,
    error,
    fetchKPIs,
    clearError,
  } = useKPIStore();

  useEffect(() => {
    fetchKPIs();
  }, [fetchKPIs]);

  return {
    kpis,
    loading,
    error,
    refresh: fetchKPIs,
    clearError,
  };
};
