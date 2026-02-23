import { useMemberStore } from "@/store/memberStore";
import {
  Member,
  CreateMemberInput,
  MembersFilters,
  CreateMemberResponse,
  GetMemberResponse,
  GetMemberAccountsResponse,
  MembersResponse,
  MemberRole,
  ChangeMemberRoleResponse,
} from "@/types/member";

interface UseMemberReturn {
  members: Member[];
  blacklistedMembers: Member[];

  page: number;
  limit: number;
  filters: MembersFilters;
  count: number;

  loading: boolean;
  error?: string;
  actionLoading: boolean;
  actionError?: string;

  accountsLoading: boolean;
  accountsError?: string;

  selectedMember?: GetMemberResponse;
  memberAccounts?: GetMemberAccountsResponse;

  // Actions
  fetchMembers: () => Promise<MembersResponse | undefined>;
  createMember: (
    member: CreateMemberInput,
  ) => Promise<CreateMemberResponse | undefined>;
  fetchBlacklistedMembers: () => Promise<void>;
  addToBlacklist: (member_gic: string) => Promise<Member | undefined>;
  removeFromBlacklist: (member_gic: string) => Promise<void>;
  fetchMemberByGic: (member_gic: string) => Promise<void>;
  fetchMemberAccounts: (member_gic: string) => Promise<void>;
  changeMemberRole: (
      member_gic: string,
      member_role: MemberRole,
      action: "assign" | "revoke",
    ) => Promise<ChangeMemberRoleResponse | undefined>;

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
    changeMemberRole,
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
    changeMemberRole,
    setFilters,
    resetFilters,
    setPage,
    setLimit,
    reset,
  };
};
