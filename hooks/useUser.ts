import { User, UserItem, UsersFilters } from "@/types/user";
import { useUserStore } from "@/store/userStore";

interface UseUserReturn {
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
  createUser: (user: User) => Promise<User | undefined>;
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
    setPage,
    setLimit,
    setFilters,
    fetchUsers,
    createUser,
  } = useUserStore();

  return {
    users,
    loading,
    error,
    page,
    limit,
    count,
    filters,
    setPage,
    setLimit,
    setFilters,
    fetchUsers,
    createUser,
  };
};
