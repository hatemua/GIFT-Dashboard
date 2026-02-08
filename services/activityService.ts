import { api } from "@/lib/axios";
import { ActivitiesResponse } from "@/types/activity";

export const activityService = {
  getActivities: async (
    page: number = 1,
    limit: number = 10,
  ): Promise<ActivitiesResponse> => {
    const res = await api.get("/dashboard/activity", {
      params: { page, limit },
    });
    return {
      data: res.data,
      count: res.data.length,
      page,
      limit
    };
  },
};
