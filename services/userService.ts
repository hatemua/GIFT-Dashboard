import { api } from "@/lib/axios";
import { User } from "@/types/user";

interface GetUsersParams {
  page: number;
  limit: number;
}

export const userService = {
  createUser: async (data: User) => {
    const response = await api.post("/users/create", data);
    return response.data as User;
  },

  getUsers: async ({ page, limit }: GetUsersParams) => {
    const response = await api.get("/users", {
      params: { page, limit },
    });

    return {
      data: response.data.data as User[],
      totalCount: response.data.totalCount as number,
    };
  },
};
