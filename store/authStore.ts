import { create } from "zustand";
import { persist } from "zustand/middleware";

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
    clientType?: ClientType
  ) => void;

  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
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
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        clientType: state.clientType,
        isAdmin: state.isAdmin,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
