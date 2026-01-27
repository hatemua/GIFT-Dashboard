import { useVaultSiteStore } from "@/store/vaultSiteStore";

export const useVaultSite = () => {
  const {
    vaultSites,
    vaultSiteDetails,
    totalCount,
    offset,
    limit,
    country,
    loading,
    error,
    fetchVaultSites,
    fetchVaultSiteById,
    createVaultSite,
    setCountry,
    setOffset,
    setLimit,
    resetVaultSiteDetails,
  } = useVaultSiteStore();

  return {
    vaultSites,
    vaultSiteDetails,
    totalCount,
    offset,
    limit,
    country,
    loading,
    error,
    fetchVaultSites,
    fetchVaultSiteById,
    createVaultSite,
    setCountry,
    setOffset,
    setLimit,
    resetVaultSiteDetails,
  };
};
