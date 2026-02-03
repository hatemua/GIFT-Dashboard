import { api } from "@/lib/axios";
import { BlacklistedMember, CreateMemberInput, Member } from "@/types/member";

export const memberService = {
  // Existing
  createMember: async (data: CreateMemberInput) => {
    const response = await api.post("/members/create", data);
    return response.data as Member;
  },

  getMembers: async (page = 1, limit = 10) => {
    const response = await api.get(`/members`, {
      params: { page, limit },
    });
    return response.data as {
      totalCount: number;
      members: Member[];
    };
  },

  // Blacklist endpoints
  addToBlacklist: async (member_gic: string, reason: string) => {
    const response = await api.post(`/members/blacklist/${member_gic}`, {
      reason,
    });
    return response.data as BlacklistedMember;
  },

  removeFromBlacklist: async (member_gic: string) => {
    const response = await api.delete(`/members/blacklist/${member_gic}`);
    return response.data;
  },

  getBlacklistedMembers: async (page = 1, limit = 10) => {
    const response = await api.get(`/members/blacklist`, {
      params: { page, limit },
    });
    return response.data as {
      totalCount: number;
      members: BlacklistedMember[];
    };
  },
};
