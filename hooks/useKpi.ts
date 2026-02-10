import { useKPIStore } from "@/store/kpiStore";

export const useKPIs = () => {
  const {
    kpis,
    goldPrice,
    loading,
    error,
    goldPriceLoading,
    goldPriceError,
    fetchKPIs,
    fetchGoldPrice,
    clearError,
  } = useKPIStore();

  return {
    kpis,
    goldPrice,
    loading,
    error,
    goldPriceLoading,
    goldPriceError,
    fetchKPIs,
    fetchGoldPrice,
    clearError,
  };
};
