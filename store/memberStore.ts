import { create } from "zustand";
import {
  BlacklistedMember,
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

  // Member actions
  fetchMembers: () => Promise<void>;
  createMember: (
    member: CreateMemberInput,
  ) => Promise<CreateMemberResponse | undefined>;

  // Blacklist actions
  fetchBlacklistedMembers: (page?: number, limit?: number) => Promise<void>;
  addToBlacklist: (
    member_gic: string,
    reason: string,
  ) => Promise<Member | undefined>;
  removeFromBlacklist: (member_gic: string) => Promise<void>;
  setFilters: (filters: MembersFilters) => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
}

export const useMemberStore = create<MemberState>((set, get) => ({
  // State
  members: [],
  blacklistedMembers: [],
  count: 0,
  page: 1,
  limit: 6,
  filters: {},
  loading: false,
  error: undefined,

  // Members
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
    set({ loading: true, error: undefined });
    try {
      const data = await memberService.createMember(member);
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

  // Blacklist
  fetchBlacklistedMembers: async (page = get().page, limit = get().limit) => {
    set({ loading: true, error: undefined });
    try {
            const { page, limit, filters } = get();
      const data: MembersResponse = await memberService.getBlacklistedMembers({
        page,
        limit,
        filters,
      });
      set({ blacklistedMembers: data.members, count: data.count, loading: false });
    } catch (err: any) {
      set({ error: err?.message || "Failed to fetch blacklisted members" });
    } finally {
      set({ loading: false });
    }
  },

  addToBlacklist: async (member_gic: string, reason: string) => {
    set({ loading: true, error: undefined });
    try {
      const data = await memberService.addToBlacklist(member_gic, reason);
      return data;
    } catch (err: any) {
      const message =
        err?.response?.data?.error_description ||
        err?.message ||
        "Failed to blacklist member";
      set({ error: message });
      throw new Error(message);
    } finally {
      set({ loading: false });
    }
  },

  removeFromBlacklist: async (member_gic: string) => {
    set({ loading: true, error: undefined });
    try {
      await memberService.removeFromBlacklist(member_gic);
    } catch (err: any) {
      const message =
        err?.response?.data?.error_description ||
        err?.message ||
        "Failed to remove from blacklist";
      set({ error: message });
      throw new Error(message);
    } finally {
      set({ loading: false });
    }
  },

  setFilters: (filters: MembersFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
      page: 1,
    })),

  resetFilters: () =>
    set({
      filters: {},
      page: 1,
    }),

  // Pagination setters
  setPage: (page: number) => {
    set({ page });
  },

  setLimit: (limit: number) => {
    set({ limit });
  },
}));
