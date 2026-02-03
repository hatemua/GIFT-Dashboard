import { useEffect } from "react";
import { useMemberStore } from "@/store/memberStore";
import { Member, CreateMemberInput } from "@/types/member";
import { BlacklistedMember } from "@/types/member";

interface UseMemberReturn {
  members: Member[];
  blacklistedMembers: BlacklistedMember[];
  loading: boolean;
  error?: string;
  page: number;
  limit: number;
  totalCount: number;
  fetchMembers: () => Promise<void>;
  createMember: (member: CreateMemberInput) => Promise<Member | undefined>;
  fetchBlacklistedMembers: (page?: number, limit?: number) => Promise<void>;
  addToBlacklist: (
    member_gic: string,
    reason: string,
  ) => Promise<BlacklistedMember | undefined>;
  removeFromBlacklist: (member_gic: string) => Promise<void>;
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
    totalCount,
    fetchMembers,
    createMember,
    fetchBlacklistedMembers,
    addToBlacklist,
    removeFromBlacklist,
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
    totalCount,
    fetchMembers,
    createMember,
    fetchBlacklistedMembers,
    addToBlacklist,
    removeFromBlacklist,
    setPage,
    setLimit,
  };
};
