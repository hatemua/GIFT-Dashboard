import { useVaultStore } from "@/store/vaultStore";

export function useVault() {
  const {
    vaults,
    vault,
    loading,
    error,
    page,
    limit,
    count,
    filters,
    setPage,
    setLimit,
    setFilters,
    resetFilters,
    fetchVaultsByVaultSiteId,
    fetchVault,
    createVault,
    updateVaultStatus,
    reset,
  } = useVaultStore();

  return {
    vaults,
    vault,
    loading,
    error,
    page,
    limit,
    count,
    filters,
    setPage,
    setLimit,
    setFilters,
    resetFilters,
    fetchVaultsByVaultSiteId,
    fetchVault,
    createVault,
    updateVaultStatus,
  };
}
