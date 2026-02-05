import { useBlockchainTransactionStore } from "@/store/blockchainTransactionStore";

export const useBlockchainTransactions = () => {
  const {
    transactions,
    count,

    // pagination
    page,
    limit,
    setPage,
    setLimit,

    // ui state
    loading,
    error,

    // filters
    filters,
    setFilters,
    resetFilters,

    // actions
    fetchTransactions,
  } = useBlockchainTransactionStore();

  return {
    transactions,
    count,

    // pagination
    page,
    limit,
    setPage,
    setLimit,

    // ui state
    loading,
    error,

    // filters
    filters,
    setFilters,
    resetFilters,

    // actions
    fetchTransactions,
  };
};
