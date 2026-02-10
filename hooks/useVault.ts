import { useVaultStore } from "@/store/vaultStore";

export function useVault() {
  const {
    vault,
    loading,
    error,
    fetchVault,
    createVault,
    updateVaultStatus,
    reset,
  } = useVaultStore();

  return {
    vault,
    loading,
    error,

    fetchVault,
    createVault,
    updateVaultStatus,
  };
}
