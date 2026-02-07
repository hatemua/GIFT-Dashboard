import { CreateUserForm, UpdateUserStatusPayload, User, UserItem, UsersFilters } from "@/types/user";
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

  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setFilters: (filters: UsersFilters) => void;
  fetchUsers: () => Promise<void>;
  createUser: (user: CreateUserForm) => Promise<User | undefined>;
  updateUserStatus: (payload: UpdateUserStatusPayload) => Promise<void>;
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
    setPage,
    setLimit,
    setFilters,
    fetchUsers,
    createUser,
    updateUserStatus
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
    setPage,
    setLimit,
    setFilters,
    fetchUsers,
    createUser,
    updateUserStatus
  };
};
