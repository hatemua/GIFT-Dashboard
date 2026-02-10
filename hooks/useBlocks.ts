import { useBlocksStore } from "@/store/blocksStore";
import { useEffect } from "react";

export const useBlocks = () => {
  const {
    blocks,
    count,
    page,
    limit,
    loading,
    error,
    filters,
    fetchBlocks,
    setFilters,
    resetFilters,
    setPage,
    setLimit,
  } = useBlocksStore((state) => state);

  return {
    blocks,
    count,
    page,
    limit,
    loading,
    error,
    filters,
    resetFilters,
    fetchBlocks,
    setFilters,
    setPage,
    setLimit,
  };
};
