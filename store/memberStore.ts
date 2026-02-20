import { create } from "zustand";
import {
  CreateMemberInput,
  CreateMemberResponse,
  Member,
  MembersFilters,
  MembersResponse,
  GetMemberResponse,
  GetMemberAccountsResponse,
  MemberRole,
} from "@/types/member";
import { memberService } from "@/services/memberService";

interface MemberState {
  // All members
  members: Member[];
  blacklistedMembers: Member[];
  count: number;

  // Single member details & accounts
  selectedMember?: GetMemberResponse;
  memberAccounts?: GetMemberAccountsResponse;

  // Pagination
  page: number;
  limit: number;
  filters: MembersFilters;

  // Loading / errors
  loading: boolean;
  error?: string;
  actionLoading: boolean;
  actionError?: string;

  accountsLoading: boolean;
  accountsError?: string;

  // Member actions
  fetchMembers: () => Promise<MembersResponse | undefined>;
  createMember: (
    member: CreateMemberInput,
  ) => Promise<CreateMemberResponse | undefined>;

  fetchBlacklistedMembers: () => Promise<void>;
  addToBlacklist: (member_gic: string) => Promise<Member | undefined>;
  removeFromBlacklist: (member_gic: string) => Promise<void>;

  fetchMemberByGic: (member_gic: string) => Promise<void>;
  fetchMemberAccounts: (member_gic: string) => Promise<void>;
  changeMemberRole: (
    member_gic: string,
    member_role: MemberRole,
    action: "assign" | "revoke",
  ) => Promise<Member | undefined>;

  setFilters: (filters: MembersFilters) => void;
  resetFilters: () => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  reset: () => void;
}

export const useMemberStore = create<MemberState>((set, get) => ({
  members: [],
  blacklistedMembers: [],
  count: 0,
  selectedMember: undefined,
  memberAccounts: undefined,
  page: 1,
  limit: 6,
  filters: {},
  loading: false,
  error: undefined,
  actionLoading: false,
  actionError: undefined,

  accountsLoading: false,
  accountsError: undefined,

  fetchMembers: async () => {
    set({ loading: true, error: undefined });
    try {
      const { page, limit, filters } = get();
      const data: MembersResponse = await memberService.getMembers({
        page,
        limit,
        filters,
      });
      set({ members: data.members, count: data.count });
      return data;
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
      set({ page: 1, filters: {} });
      await get().fetchMembers();
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
      set({ blacklistedMembers: data.members, count: data.count });
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
      const message =
        err?.response?.data?.error_description ||
        err?.message ||
        "Failed to blacklist member";
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
        const member = state.blacklistedMembers.find(
          (m) => m.member_gic === member_gic,
        );
        if (!member) return state;
        return {
          blacklistedMembers: state.blacklistedMembers.filter(
            (m) => m.member_gic !== member_gic,
          ),
          members: [member, ...state.members],
          count: Math.max(state.count - 1, 0),
        };
      });
      return data;
    } catch (err: any) {
      const message =
        err?.response?.data?.error_description ||
        err?.message ||
        "Failed to remove from blacklist";
      set({ actionError: message });
      throw new Error(message);
    } finally {
      set({ actionLoading: false });
    }
  },

  fetchMemberByGic: async (member_gic: string) => {
    set({ loading: true, error: undefined, selectedMember: undefined });
    try {
      const data: GetMemberResponse =
        await memberService.getMemberByGic(member_gic);
      set({ selectedMember: data });
    } catch (err: any) {
      const message =
        err?.response?.data?.error_description ||
        err?.message ||
        "Failed to fetch member";
      set({ error: message });
    } finally {
      set({ loading: false });
    }
  },

  fetchMemberAccounts: async (member_gic: string) => {
    set({
      accountsLoading: true,
      accountsError: undefined,
      memberAccounts: undefined,
    });
    try {
      const data: GetMemberAccountsResponse =
        await memberService.getMemberAccounts(member_gic);
      set({ memberAccounts: data });
    } catch (err: any) {
      const message =
        err?.response?.data?.error_description ||
        err?.message ||
        "Failed to fetch member accounts";
      set({ accountsError: message });
    } finally {
      set({ accountsLoading: false });
    }
  },
  changeMemberRole: async (
    member_gic: string,
    member_role: MemberRole,
    action: "assign" | "revoke",
  ) => {
    set({ actionLoading: true, actionError: undefined });
    try {
      const updatedMember = await memberService.changeMemberRole(
        member_gic,
        member_role,
        action,
      );

      await get().fetchMembers();
      return updatedMember;
    } catch (err: any) {
      const message =
        err?.response?.data?.error_description ||
        err?.message ||
        "Failed to change member role";
      set({ actionError: message });
      throw new Error(message);
    } finally {
      set({ actionLoading: false });
    }
  },

  setFilters: (filters: MembersFilters) =>
    set((state) => ({ filters: { ...state.filters, ...filters }, page: 1 })),
  resetFilters: () =>
    set({
      filters: {},
      page: 1,
    }),

  setPage: (page: number) => set({ page }),
  setLimit: (limit: number) => set({ limit }),
  reset: () => {},
}));
