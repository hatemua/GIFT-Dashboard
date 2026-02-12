import { create } from "zustand";

type ClientType = "ADMIN" | "AUDITOR" | null;

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  clientType: ClientType;
  isAdmin: boolean;

  setAuth: (
    accessToken: string,
    refreshToken?: string,
    clientType?: ClientType,
  ) => void;

  logout: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  clientType: null,
  isAdmin: false,

  setAuth: (accessToken, refreshToken, clientType) =>
    set({
      accessToken,
      refreshToken: refreshToken ?? null,
      isAuthenticated: true,
      clientType: clientType ?? null,
      isAdmin: clientType === "ADMIN",
    }),

  logout: () =>
    set({
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      clientType: null,
      isAdmin: false,
    }),
}));
