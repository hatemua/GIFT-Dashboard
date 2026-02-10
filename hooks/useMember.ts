import { useMemberStore } from "@/store/memberStore";
import {
  Member,
  CreateMemberInput,
  MembersFilters,
  CreateMemberResponse,
  GetMemberResponse,
  GetMemberAccountsResponse,
} from "@/types/member";

interface UseMemberReturn {
  // Lists
  members: Member[];
  blacklistedMembers: Member[];

  // Pagination & filters
  page: number;
  limit: number;
  filters: MembersFilters;
  count: number;

  // Loading / errors
  loading: boolean; // fetch members / selected member
  error?: string;
  actionLoading: boolean; // create / blacklist / remove
  actionError?: string;

  accountsLoading: boolean; // fetching accounts
  accountsError?: string;

  // Selected member & accounts
  selectedMember?: GetMemberResponse;
  memberAccounts?: GetMemberAccountsResponse;

  // Actions
  fetchMembers: () => Promise<void>;
  createMember: (
    member: CreateMemberInput,
  ) => Promise<CreateMemberResponse | undefined>;
  fetchBlacklistedMembers: () => Promise<void>;
  addToBlacklist: (member_gic: string) => Promise<Member | undefined>;
  removeFromBlacklist: (member_gic: string) => Promise<void>;
  fetchMemberByGic: (member_gic: string) => Promise<void>;
  fetchMemberAccounts: (member_gic: string) => Promise<void>;

  // Setters
  setFilters: (filters: MembersFilters) => void;
  resetFilters: () => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  reset: () => void;
}

/**
 * Custom hook to use members, selected member and their accounts.
 * Automatically fetches members on mount if empty.
 */
export const useMember = (): UseMemberReturn => {
  const {
    members,
    blacklistedMembers,
    page,
    limit,
    filters,
    count,
    loading,
    error,
    actionLoading,
    actionError,
    accountsLoading,
    accountsError,
    selectedMember,
    memberAccounts,
    fetchMembers,
    createMember,
    fetchBlacklistedMembers,
    addToBlacklist,
    removeFromBlacklist,
    fetchMemberByGic,
    fetchMemberAccounts,
    setFilters,
    resetFilters,
    setPage,
    setLimit,
    reset,
  } = useMemberStore();

  return {
    members,
    blacklistedMembers,
    page,
    limit,
    filters,
    count,
    loading,
    error,
    actionLoading,
    actionError,
    accountsLoading,
    accountsError,
    selectedMember,
    memberAccounts,
    fetchMembers,
    createMember,
    fetchBlacklistedMembers,
    addToBlacklist,
    removeFromBlacklist,
    fetchMemberByGic,
    fetchMemberAccounts,
    setFilters,
    resetFilters,
    setPage,
    setLimit,
    reset,
  };
};
