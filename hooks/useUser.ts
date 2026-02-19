import {
  CreateUserForm,
  UpdateUserStatusPayload,
  User,
  UserItem,
  UsersFilters,
  MeResponse,
} from "@/types/user";
import { useUserStore } from "@/store/userStore";

interface UseUserReturn {
  users: UserItem[];
  loading: boolean;
  error?: string;
  actionLoading: boolean;
  actionError?: string;

  page: number;
  limit: number;
  count: number;
  filters: UsersFilters;

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

export const useUser = (): UseUserReturn => {
  const {
    users,
    loading,
    error,
    page,
    limit,
    count,
    filters,
    actionLoading,
    actionError,
    me,
    meLoading,
    meError,
    setPage,
    setLimit,
    setFilters,
    resetFilters,
    fetchUsers,
    createUser,
    updateUserStatus,
    fetchMe
  } = useUserStore();

  return {
    users,
    loading,
    error,
    actionLoading,
    actionError,
    page,
    limit,
    count,
    filters,
    me,
    meLoading,
    meError,
    setPage,
    setLimit,
    setFilters,
    resetFilters,
    fetchUsers,
    createUser,
    updateUserStatus,
    fetchMe
  };
};