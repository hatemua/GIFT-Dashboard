import { create } from "zustand";
import { CreateUserForm, User, UserItem, UsersFilters, UsersResponse } from "@/types/user";
import { userService } from "@/services/userService";

interface UserState {
  users: UserItem[];
  loading: boolean;
  error?: string;

  page: number;
  limit: number;
  count: number;
  filters: UsersFilters;

  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setFilters: (filters: UsersFilters) => void;

  fetchUsers: () => Promise<void>;
  createUser: (user: CreateUserForm) => Promise<User | undefined>;
}

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  loading: false,
  error: undefined,

  page: 1,
  limit: 6,
  count: 0,
  filters: {},

  fetchUsers: async () => {
    set({ loading: true, error: undefined });

    try {
      const { page, limit, filters } = get();

      const data: UsersResponse = await userService.getUsers({
        page,
        limit,
        filters,
      });

      set({
        users: data.users,
        page,
        limit,
        count: data.count,
        loading: false,
      });
    } catch (err: any) {
      set({ error: err?.message || "Failed to fetch users" });
    } finally {
      set({ loading: false });
    }
  },

  createUser: async (user: CreateUserForm) => {
    set({ loading: true, error: undefined });

    try {
      const data = await userService.createUser(user);
      await get().fetchUsers();
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

  setFilters: (filters: UsersFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
      page: 1,
    })),

  resetFilters: () =>
    set({
      filters: {},
      page: 1,
    }),

  // Pagination setters
  setPage: (page: number) => {
    set({ page });
  },

  setLimit: (limit: number) => {
    set({ limit });
  },
}));
