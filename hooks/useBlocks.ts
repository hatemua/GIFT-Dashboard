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
    setPage,
    setLimit,
  } = useBlocksStore((state) => state);

  useEffect(() => {
    if (blocks.length === 0) fetchBlocks();
  }, []);

  return {
    blocks,
    count,
    page,
    limit,
    loading,
    error,
    filters,
    fetchBlocks,
    setFilters,
    setPage,
    setLimit,
  };
};
