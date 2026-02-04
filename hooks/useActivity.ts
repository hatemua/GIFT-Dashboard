import { useEffect } from "react";
import { useActivityStore } from "@/store/activityStore";

export const useActivity = (page = 1, limit = 10) => {
  const {
    activities,
    loading,
    error,
    total,
    totalPages,
    fetchActivities,
    clearError,
  } = useActivityStore();

  useEffect(() => {
    fetchActivities(page, limit);
  }, [page, limit]);

  return {
    activities,
    loading,
    error,
    total,
    totalPages,
    refresh: () => fetchActivities(page, limit),
    clearError,
  };
};
