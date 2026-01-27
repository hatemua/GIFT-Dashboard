import { api } from "@/lib/axios";
import { CreateMemberInput, Member } from "@/types/member";

export const memberService = {
  createMember: async (data: CreateMemberInput) => {
    const response = await api.post("/members/create", data);
    return response.data as Member;
  },

  getMembers: async () => {
    const response = await api.get("/members");
    return response.data as Member[];
  },
};
