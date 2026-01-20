import axios from "axios";
import { useAuthStore } from "@/store/authSlice";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

// Request interceptor
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor — refresh token logic remains the same
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refToken = useAuthStore.getState().refreshToken;

      // call your local proxy route for refresh
      const { data } = await axios.post("/api/auth/token/refresh", {
        refresh_token: refToken,
      });

      useAuthStore.getState().setTokens(data.access_token, data.refresh_token);
      originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
      return api(originalRequest);
    }
    return Promise.reject(error);
  },
);

export { api };
