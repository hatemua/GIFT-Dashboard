import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const login = async (data: {
  client_id: string;
  client_secret: string;
  grant_type: string;
  scope?: string;
}) => {
  const response = await axios.post(`${API_URL}/auth/token`, data);
  return response.data; // { access_token, refresh_token, expires_in }
};

export const refreshToken = async (token: string) => {
  const response = await axios.post(`${API_URL}/auth/refresh`, {
    refresh_token: token,
  });
  return response.data;
};

export const revokeToken = async (token: string) => {
  await axios.post(`${API_URL}/auth/revoke`, {
    token,
  });
};
