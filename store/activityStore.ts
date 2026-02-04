// store/activityStore.ts
import { create } from "zustand";
import { ActivityItem, ActivitiesResponse } from "@/types/activity";
import { activityService } from "@/services/activityService";

interface ActivityState {
  activities: ActivityItem[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  loading: boolean;
  error: string | null;

  fetchActivities: (page?: number, limit?: number) => Promise<void>;
  clearError: () => void;
}

export const useActivityStore = create<ActivityState>((set) => ({
  activities: [],
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 0,
  loading: false,
  error: null,

  fetchActivities: async (page = 1, limit = 10) => {
    set({ loading: true, error: null });
    try {
      const data: ActivitiesResponse =
        await activityService.getActivities(page, limit);

      set({
        activities: data.data,
        page: data.page,
        limit: data.limit,
        total: data.total,
        totalPages: data.total_pages,
        loading: false,
      });
    } catch (err: any) {
      set({
        loading: false,
        error: err?.response?.data?.message ?? "Failed to load activity feed",
      });
    }
  },

  clearError: () => set({ error: null }),
}));
