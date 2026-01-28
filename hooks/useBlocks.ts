import { useBlocksStore } from "@/store/blocksStore";
import { useEffect } from "react";

export const useBlocks = () => {
  const {
    blocks,
    totalCount,
    page,
    limit,
    loading,
    error,
    fetchBlocks,
    setPage,
    setLimit,
  } = useBlocksStore((state) => state);

  useEffect(() => {
    if (blocks.length === 0) fetchBlocks();
  }, []);

  return {
    blocks,
    totalCount,
    page,
    limit,
    loading,
    error,
    fetchBlocks,
    setPage,
    setLimit,
  };
};
