import { api } from "@/lib/axios";
import { GetUsersParams, User, UsersResponse } from "@/types/user";

export const userService = {
  createUser: async (data: User) => {
    const response = await api.post("/users/create", data);
    return response.data as User;
  },

  getUsers: async ({
    page = 1,
    limit = 6,
    filters = {},
  }: GetUsersParams): Promise<UsersResponse> => {
    const response = await api.get<UsersResponse>("/dashboard/users", {
      params: {
        page,
        limit,
        search: filters.search,
        from_date: filters.from_date,
        to_date: filters.to_date,
        status: filters.status,
      },
    });

    return response.data;
  },
};
