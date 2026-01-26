import { useEffect } from "react";
import { useMemberStore } from "@/store/memberStore";
import { Member } from "@/types/member";

interface UseMemberReturn {
  members: Member[];
  loading: boolean;
  error?: string;
  fetchMembers: () => Promise<void>;
  createMember: (member: Member) => Promise<Member | undefined>;
}

/**
 * Custom hook to use members.
 * Automatically fetches members on mount if empty.
 */
export const useMember = (): UseMemberReturn => {
  const { members, loading, error, fetchMembers, createMember } =
    useMemberStore();

  useEffect(() => {
    if (!members.length) {
      fetchMembers();
    }
  }, [members.length, fetchMembers]);

  return {
    members,
    loading,
    error,
    fetchMembers,
    createMember,
  };
};
