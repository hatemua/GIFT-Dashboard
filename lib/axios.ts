import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "@/store/authStore";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/* ---------------------------------- */
/* Axios Instances */
/* ---------------------------------- */

const api = axios.create({
  baseURL: API_URL,
});

const refreshApi = axios.create({
  baseURL: API_URL,
});

/* ---------------------------------- */
/* Logout Helper */
/* ---------------------------------- */

const logoutUser = () => {
  const authStore = useAuthStore.getState();

  authStore.logout();

  if (typeof window !== "undefined") {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("clientType");

    document.cookie = "accessToken=; Max-Age=0; path=/";
    document.cookie = "clientType=; Max-Age=0; path=/";

    window.location.href = "/login";
  }
};

/* ---------------------------------- */
/* Request Interceptor */
/* ---------------------------------- */

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window === "undefined") return config;

    const token =
      useAuthStore.getState().accessToken ??
      localStorage.getItem("accessToken");

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  }
);

/* ---------------------------------- */
/* Response Interceptor */
/* ---------------------------------- */

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest: any = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest?._retry
    ) {
      originalRequest._retry = true;

      const refreshToken =
        useAuthStore.getState().refreshToken ??
        localStorage.getItem("refreshToken");

      if (!refreshToken) {
        logoutUser();
        return Promise.reject(error);
      }

      try {
        const { data } = await refreshApi.post("/auth/refresh", {
          refresh_token: refreshToken,
        });

        const currentClientType =
          useAuthStore.getState().clientType ??
          localStorage.getItem("clientType");

        // ✅ Update Zustand
        useAuthStore.getState().setAuth(
          data.access_token,
          data.refresh_token,
          currentClientType as any
        );

        // ✅ Update localStorage
        localStorage.setItem("accessToken", data.access_token);

        if (data.refresh_token) {
          localStorage.setItem("refreshToken", data.refresh_token);
        }

        // ✅ Retry original request
        originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
        return api(originalRequest);
      } catch (refreshError) {
        logoutUser();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export { api };
