import { useEffect } from "react";
import { User } from "@/types/user";
import { useUserStore } from "@/store/userStore";

interface UseUserReturn {
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

export const useUser = (): UseUserReturn => {
  const {
    users,
    loading,
    error,
    page,
    limit,
    totalCount,
    setPage,
    fetchUsers,
    createUser,
  } = useUserStore();

  useEffect(() => {
    fetchUsers(page, limit);
  }, [page, limit]);

  return {
    users,
    loading,
    error,
    page,
    limit,
    totalCount,
    setPage,
    fetchUsers,
    createUser,
  };
};
