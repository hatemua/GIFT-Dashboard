import { api } from "@/lib/axios";
import {
  BlacklistedMember,
  CreateMemberInput,
  CreateMemberResponse,
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
      },
    });

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
