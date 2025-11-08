import { PayloadLogin, ResponseLogin } from "@/types/auth.type";
import { privateClient, publicClient } from "./apiClient";
import { ApiResponse } from "@/types/api.type";
import { metadata } from "@/app/layout";

const API_URL = "/auth";

export const authService = {
  login: async (payload: PayloadLogin): Promise<ApiResponse<ResponseLogin>> => {
    const { data } = await publicClient.post<ApiResponse<ResponseLogin>>(
      `${API_URL}/signin`,
      payload
    );
    return data;
  },

  signOut: async () => {
    const { data } = await privateClient.post(`${API_URL}/signout`);
    return data;
  },

  forgot: async (payload: { email: string }) => {
    const { data } = await publicClient.post(
      `${API_URL}/forgot-password`,
      payload
    );

    return data.metaData;
  },

  resetPassword: async (payload: { password: string; token: string }) => {
    const { data } = await publicClient.post(
      `${API_URL}/reset-password`,
      payload
    );

    return data.metaData;
  },
};
