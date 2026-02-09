import { api } from "@/lib/axios";
import {
  CreateMemberInput,
  CreateMemberResponse,
  GetMemberAccountsResponse,
  GetMemberResponse,
  GetMembersParams,
  Member,
  MembersResponse,
} from "@/types/member";

export const memberService = {
  createMember: async (data: CreateMemberInput) => {
    const response = await api.post("/members/create", data);
    return response.data as CreateMemberResponse;
  },

  getMembers: async ({
    page = 1,
    limit = 6,
    filters = {},
  }: GetMembersParams): Promise<MembersResponse> => {
    const response = await api.get<MembersResponse>("/dashboard/members", {
      params: {
        page,
        limit,
        search: filters.search,
        from_date: filters.from_date,
        to_date: filters.to_date,
        roles: filters.roles,
        status: 'active'
      },
    });

    return response.data;
  },

    // Get single member by GIC
  getMemberByGic: async (member_gic: string): Promise<GetMemberResponse> => {
    const response = await api.get<GetMemberResponse>(`/members/${member_gic}`);
    return response.data;
  },

  // Get member accounts
  getMemberAccounts: async (member_gic: string): Promise<GetMemberAccountsResponse> => {
    const response = await api.get<GetMemberAccountsResponse>(`/members/${member_gic}/accounts`);
    return response.data;
  },

  // Blacklist endpoints
  addToBlacklist: async (member_gic: string) => {
    const response = await api.post(`/members/blacklist/${member_gic}`);
    return response.data as Member;
  },

  removeFromBlacklist: async (member_gic: string) => {
    const response = await api.delete(`/members/blacklist/${member_gic}`);
    return response.data;
  },

  getBlacklistedMembers: async ({
    page = 1,
    limit = 6,
    filters = {},
  }: GetMembersParams): Promise<MembersResponse> => {
    const response = await api.get<MembersResponse>("/dashboard/members", {
      params: {
        page,
        limit,
        search: filters.search,
        from_date: filters.from_date,
        to_date: filters.to_date,
        status: "blacklisted",
        roles: filters.roles,
      },
    });

    return response.data;
  },
};
