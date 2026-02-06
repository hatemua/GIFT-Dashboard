import { create } from "zustand";
import {
  CreateMemberInput,
  CreateMemberResponse,
  Member,
  MembersFilters,
  MembersResponse,
} from "@/types/member";
import { memberService } from "@/services/memberService";

interface MemberState {
  // All members
  members: Member[];
  blacklistedMembers: Member[];
  count: number;

  // Pagination
  page: number;
  limit: number;
  filters: MembersFilters;

  loading: boolean;
  error?: string;

  
  actionLoading: boolean;
  actionError?: string;

  // Member actions
  fetchMembers: () => Promise<void>;
  createMember: (
    member: CreateMemberInput,
  ) => Promise<CreateMemberResponse | undefined>;

  // Blacklist actions
  fetchBlacklistedMembers: () => Promise<void>;
  addToBlacklist: (member_gic: string) => Promise<Member | undefined>;
  removeFromBlacklist: (member_gic: string) => Promise<void>;
  setFilters: (filters: MembersFilters) => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  reset: () => void;
}

export const useMemberStore = create<MemberState>((set, get) => {
  const initialState = {
    members: [] as Member[],
    blacklistedMembers: [] as Member[],
    count: 0,
    page: 1,
    limit: 6,
    filters: {} as MembersFilters,
    loading: false, // for fetch actions
    error: undefined as string | undefined, // for fetch actions

    // New states for POST/DELETE actions
    actionLoading: false,
    actionError: undefined as string | undefined,
  };

  return {
    ...initialState,

    fetchMembers: async () => {
      set({ loading: true, error: undefined });
      try {
        const { page, limit, filters } = get();
        const data: MembersResponse = await memberService.getMembers({
          page,
          limit,
          filters,
        });
        set({ members: data.members, count: data.count, loading: false });
      } catch (err: any) {
        set({ error: err?.message || "Failed to fetch members" });
      } finally {
        set({ loading: false });
      }
    },

    createMember: async (member: CreateMemberInput) => {
      set({ actionLoading: true, actionError: undefined });
      try {
        const data = await memberService.createMember(member);
        return data;
      } catch (err: any) {
        const message =
          err?.response?.data?.error_description ||
          err?.message ||
          "Failed to create member";
        set({ actionError: message });
        throw new Error(message);
      } finally {
        set({ actionLoading: false });
      }
    },

    fetchBlacklistedMembers: async () => {
      set({ loading: true, error: undefined });
      try {
        const { page, limit, filters } = get();
        const data: MembersResponse = await memberService.getBlacklistedMembers({
          page,
          limit,
          filters,
        });
        set({
          blacklistedMembers: data.members,
          count: data.count,
          loading: false,
        });
      } catch (err: any) {
        set({ error: err?.message || "Failed to fetch blacklisted members" });
      } finally {
        set({ loading: false });
      }
    },
    addToBlacklist: async (member_gic: string) => {
      set({ actionLoading: true, actionError: undefined });
      try {
        const data = await memberService.addToBlacklist(member_gic);
        set((state) => {
          const member = state.members.find((m) => m.member_gic === member_gic);
          if (!member) return state;
          return {
            members: state.members.filter((m) => m.member_gic !== member_gic),
            blacklistedMembers: [member, ...state.blacklistedMembers],
            count: state.count + 1,
          };
        });
        return data;
      } catch (err: any) {
        const message = err?.response?.data?.error_description || err?.message || "Failed to blacklist member";
        set({ actionError: message });
        throw new Error(message);
      } finally {
        set({ actionLoading: false });
      }
    },




     removeFromBlacklist: async (member_gic: string) => {
      set({ actionLoading: true, actionError: undefined });
      try {
        const data = await memberService.removeFromBlacklist(member_gic);

        set((state) => {
          const member = state.blacklistedMembers.find((m) => m.member_gic === member_gic);
          if (!member) return state;
          return {
            blacklistedMembers: state.blacklistedMembers.filter((m) => m.member_gic !== member_gic),
            members: [member, ...state.members],
            count: Math.max(state.count - 1, 0),
          };
        });
        return data;
      } catch (err: any) {
        const message = err?.response?.data?.error_description || err?.message || "Failed to remove from blacklist";
        set({ actionError: message });
        throw new Error(message);
      } finally {
        set({ actionLoading: false });
      }
    },
    setFilters: (filters: MembersFilters) =>
      set((state) => ({ filters: { ...state.filters, ...filters }, page: 1 })),

    resetFilters: () => set({ filters: {}, page: 1 }),

    setPage: (page: number) => set({ page }),
    setLimit: (limit: number) => set({ limit }),

    reset: () => set({ ...initialState }),
  };
});

