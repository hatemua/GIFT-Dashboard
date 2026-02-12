import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { login, refreshToken, revokeToken } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";

/* -------------------- LOGIN -------------------- */
export const useLogin = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const router = useRouter();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setAuth(
        data.access_token,
        data.refresh_token,
        data.client_type
      );

      // Persist tokens
      localStorage.setItem("accessToken", data.access_token);
      document.cookie = `accessToken=${data.access_token}; path=/`;

      localStorage.setItem("clientType", data.client_type);
      document.cookie = `clientType=${data.client_type}; path=/`;

      if (data.refresh_token) {
        localStorage.setItem("refreshToken", data.refresh_token);
      }

      router.push("/dashboard");
    },
  });
};

/* -------------------- REFRESH TOKEN -------------------- */
export const useRefreshToken = () => {
  const refresh = useAuthStore((state) => state.refreshToken);
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: () => {
      if (!refresh) throw new Error("No refresh token found");
      return refreshToken(refresh);
    },
    onSuccess: (data) => {
      // Preserve existing role
      const currentRole = useAuthStore.getState().clientType;

      setAuth(
        data.access_token,
        data.refresh_token,
        currentRole
      );

      localStorage.setItem("accessToken", data.access_token);
      localStorage.setItem("clientType", data.client_type);

      if (data.refresh_token) {
        localStorage.setItem("refreshToken", data.refresh_token);
      }
    },
  });
};

/* -------------------- LOGOUT -------------------- */
export const useLogout = () => {
  const logout = useAuthStore((state) => state.logout);
  const refresh = useAuthStore((state) => state.refreshToken);
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: () => {
      if (!refresh) return Promise.resolve();
      return revokeToken(refresh);
    },
    onSuccess: () => {
      logout();

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("clientType");
      document.cookie = "accessToken=; Max-Age=0; path=/";
      document.cookie = "clientType=; Max-Age=0; path=/";

      queryClient.clear();

      router.push("/login");
    },
  });
};
