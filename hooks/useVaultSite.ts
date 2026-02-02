import { useVaultSiteStore } from "@/store/vaultSiteStore";

export const useVaultSite = () => {
  const {
    vaultSites,
    vaultSiteDetails,
    vaults,
    totalCount,
    offset,
    limit,
    country,
    loading,
    error,
    fetchVaultSites,
    fetchVaultSiteById,
    createVaultSite,
    fetchVaultsByVaultSiteId,
    setCountry,
    setOffset,
    setLimit,
    resetVaultSiteDetails,
  } = useVaultSiteStore();

  return {
    vaultSites,
    vaultSiteDetails,
    vaults,
    totalCount,
    offset,
    limit,
    country,
    loading,
    error,
    fetchVaultSites,
    fetchVaultSiteById,
    createVaultSite,
    fetchVaultsByVaultSiteId,
    setCountry,
    setOffset,
    setLimit,
    resetVaultSiteDetails,
  };
};
