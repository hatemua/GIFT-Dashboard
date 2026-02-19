import { create } from "zustand";
import {
  CreateUserForm,
  UpdateUserStatusPayload,
  User,
  UserItem,
  UsersFilters,
  UsersResponse,
  UserStatus,
  MeResponse,
} from "@/types/user";
import { userService } from "@/services/userService";

interface UserState {
  users: UserItem[];
  loading: boolean;
  error?: string;

  page: number;
  limit: number;
  count: number;
  filters: UsersFilters;

  actionLoading: boolean;
  actionError?: string;

  me?: MeResponse;
  meLoading: boolean;
  meError?: string;

  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setFilters: (filters: UsersFilters) => void;
  resetFilters: () => void;

  fetchUsers: () => Promise<void>;
  createUser: (user: CreateUserForm) => Promise<User | undefined>;
  updateUserStatus: (payload: UpdateUserStatusPayload) => Promise<void>;

  fetchMe: () => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  loading: false,
  error: undefined,

  page: 1,
  limit: 6,
  count: 0,
  filters: {},

  actionLoading: false,
  actionError: undefined,

  me: undefined,
  meLoading: false,
  meError: undefined,

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

  updateUserStatus: async (payload: UpdateUserStatusPayload) => {
    set({ actionLoading: true, actionError: undefined });

    try {
      await userService.updateUserStatus(payload);

      set((state) => {
        const users = state.users.map((u) =>
          u.user_id === payload.user_id
            ? {
                ...u,
                status:
                  payload.action === "activate"
                    ? ("active" as UserStatus)
                    : ("inactive" as UserStatus),
              }
            : u,
        );
        return { users };
      });
    } catch (err: any) {
      const message =
        err?.response?.data?.error_description ||
        err?.message ||
        "Failed to update user status";
      set({ actionError: message });
      throw new Error(message);
    } finally {
      set({ actionLoading: false });
    }
  },

  fetchMe: async () => {
    set({ meLoading: true, meError: undefined });
    try {
      const data = await userService.getMe();
      set({ me: data });
    } catch (err: any) {
      set({ meError: err?.message || "Failed to fetch current user" });
    } finally {
      set({ meLoading: false });
    }
  },

  // ---------- Filters ----------
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
