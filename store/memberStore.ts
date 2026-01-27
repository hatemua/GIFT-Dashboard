import { create } from "zustand";
import { CreateMemberInput, Member } from "@/types/member";
import { memberService } from "@/services/memberService";

interface MemberState {
  members: Member[];
  loading: boolean;
  error?: string;

  fetchMembers: () => Promise<void>;
  createMember: (member: CreateMemberInput) => Promise<Member | undefined>;
}

export const useMemberStore = create<MemberState>((set, get) => ({
  members: [],
  loading: false,
  error: undefined,

  fetchMembers: async () => {
    set({ loading: true, error: undefined });
    try {
      const data = await memberService.getMembers();
      set({ members: data });
    } catch (err: any) {
      set({ error: err?.message || "Failed to fetch members" });
    } finally {
      set({ loading: false });
    }
  },

  createMember: async (member: CreateMemberInput) => {
    set({ loading: true, error: undefined });
    try {
      const data = await memberService.createMember(member);
      set({ members: [...get().members, data] });
      return data;
    } catch (err: any) {
      const message =
        err?.response?.data?.error_description ||
        err?.message ||
        "Failed to create member";

      set({ error: message });
      throw new Error(message);
    } finally {
      set({ loading: false });
    }
  },
}));
