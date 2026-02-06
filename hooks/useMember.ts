import { useMemberStore } from "@/store/memberStore";
import { Member, CreateMemberInput, MembersFilters, CreateMemberResponse } from "@/types/member";
import { BlacklistedMember } from "@/types/member";

interface UseMemberReturn {
  members: Member[];
  blacklistedMembers: Member[];
  loading: boolean;
  error?: string;
  page: number;
  limit: number;
  filters: MembersFilters;
  count: number;
  fetchMembers: () => Promise<void>;
  createMember: (member: CreateMemberInput) => Promise<CreateMemberResponse | undefined>;
  fetchBlacklistedMembers: () => Promise<void>;
  addToBlacklist: (
    member_gic: string,
    reason: string,
  ) => Promise<Member | undefined>;
  removeFromBlacklist: (member_gic: string) => Promise<void>;
  setFilters: (filters: MembersFilters) => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
}

/**
 * Custom hook to use members and blacklist.
 * Automatically fetches members on mount if empty.
 */
export const useMember = (): UseMemberReturn => {
  const {
    members,
    blacklistedMembers,
    loading,
    error,
    page,
    limit,
    filters,
    count,
    fetchMembers,
    createMember,
    fetchBlacklistedMembers,
    addToBlacklist,
    removeFromBlacklist,
    setFilters,
    setPage,
    setLimit,
  } = useMemberStore();

  return {
    members,
    blacklistedMembers,
    loading,
    error,
    page,
    limit,
    filters,
    count,
    fetchMembers,
    createMember,
    fetchBlacklistedMembers,
    addToBlacklist,
    removeFromBlacklist,
    setFilters,
    setPage,
    setLimit,
  };
};
