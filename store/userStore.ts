import { create } from "zustand";
import { User } from "@/types/user";
import { userService } from "@/services/userService";

interface UserState {
  users: User[];
  loading: boolean;
  error?: string;

  page: number;
  limit: number;
  totalCount: number;

  setPage: (page: number) => void;

  fetchUsers: (page?: number, limit?: number) => Promise<void>;
  createUser: (user: User) => Promise<User | undefined>;
}

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  loading: false,
  error: undefined,

  page: 1,
  limit: 10,
  totalCount: 0,

  setPage: (page) => set({ page }),

  fetchUsers: async (pageParam, limitParam) => {
    const page = pageParam ?? get().page;
    const limit = limitParam ?? get().limit;

    set({ loading: true, error: undefined });

    try {
      const { data, totalCount } = await userService.getUsers({
        page,
        limit,
      });

      set({
        users: data,
        page,
        limit,
        totalCount,
      });
    } catch (err: any) {
      set({ error: err?.message || "Failed to fetch users" });
    } finally {
      set({ loading: false });
    }
  },

  createUser: async (user: User) => {
    set({ loading: true, error: undefined });

    try {
      const data = await userService.createUser(user);

      set({
        users: [data, ...get().users],
        totalCount: get().totalCount + 1,
      });

      return data;
    } catch (err: any) {
      const message =
        err?.response?.data?.error_description ||
        err?.message ||
        "Failed to create user";

      set({ error: message });
      throw new Error(message);
    } finally {
      set({ loading: false });
    }
  },
}));
