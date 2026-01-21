import axios from "axios";
import { useAuthStore } from "@/store/authStore";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Main API instance
const api = axios.create({
  baseURL: API_URL,
});

// Refresh API instance (no interceptors)
const refreshApi = axios.create({
  baseURL: API_URL,
});

// Helper to logout user
const logoutUser = () => {
  const authStore = useAuthStore.getState();
  authStore.logout(); // or clearAuth(), depending on your store

  // Clear localStorage & cookies
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  document.cookie = "accessToken=; Max-Age=0; path=/";

  // Redirect to login
  if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
};

// Request interceptor
api.interceptors.request.use((config) => {
  if (typeof window === "undefined") return config; // skip SSR
  const token =
    useAuthStore.getState().accessToken ?? localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken =
        useAuthStore.getState().refreshToken ??
        localStorage.getItem("refreshToken");

      if (!refreshToken) {
        logoutUser();
        return Promise.reject(error); // no refresh token, logout user
      }

      try {
        const { data } = await refreshApi.post("/auth/refresh", {
          refresh_token: refreshToken,
        });

        // update token in Zustand
        useAuthStore
          .getState()
          .setTokens(data.access_token, data.refresh_token);

        // retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
        return api(originalRequest);
      } catch (refreshError) {
        logoutUser();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export { api };
