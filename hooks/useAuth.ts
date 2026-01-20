import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { login, refreshToken, revokeToken } from "@/services/authService";
import { useAuthStore } from "@/store/authSlice";

// -------------------- LOGIN --------------------
export const useLogin = () => {
  const setTokens = useAuthStore((state) => state.setTokens);
  const router = useRouter();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      // Save tokens
      setTokens(data.access_token, data.refresh_token);
      localStorage.setItem("accessToken", data.access_token);
      document.cookie = `accessToken=${data.access_token}; path=/`;
      if (data.refresh_token) localStorage.setItem("refreshToken", data.refresh_token);

      router.push("/dashboard");
    },
  });
};

// -------------------- REFRESH TOKEN --------------------
export const useRefreshToken = () => {
  const refresh = useAuthStore((state) => state.refreshToken);
  const setTokens = useAuthStore((state) => state.setTokens);

  return useMutation({
    mutationFn: () => {
      if (!refresh) throw new Error("No refresh token found");
      return refreshToken(refresh);
    },
    onSuccess: (data) => {
      // Update tokens in Zustand
      setTokens(data.access_token, data.refresh_token);

      // Update tokens in localStorage
      localStorage.setItem("accessToken", data.access_token);
      if (data.refresh_token) {
        localStorage.setItem("refreshToken", data.refresh_token);
      }
    },
  });
};

// -------------------- LOGOUT / REVOKE --------------------
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
      // Clear auth state
      logout();

      // Clear localStorage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      document.cookie = "accessToken=; Max-Age=0; path=/";

      // Optional: clear React Query cache
      queryClient.clear();

      // Redirect to login page
      router.push("/login");
    },
  });
};
