import { useVaultSiteStore } from "@/store/vaultSiteStore";

export const useVaultSite = () => {
  const vaultSites = useVaultSiteStore((state) => state.vaultSites);
  const totalCount = useVaultSiteStore((state) => state.totalCount);
  const offset = useVaultSiteStore((state) => state.offset);
  const limit = useVaultSiteStore((state) => state.limit);
  const country = useVaultSiteStore((state) => state.country);
  const loading = useVaultSiteStore((state) => state.loading);
  const error = useVaultSiteStore((state) => state.error);

  const fetchVaultSites = useVaultSiteStore((state) => state.fetchVaultSites);
  const setCountry = useVaultSiteStore((state) => state.setCountry);
  const setOffset = useVaultSiteStore((state) => state.setOffset);

  return {
    vaultSites,
    totalCount,
    offset,
    limit,
    country,
    loading,
    error,
    fetchVaultSites,
    setCountry,
    setOffset,
  };
};
