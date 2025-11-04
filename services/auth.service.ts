import { PayloadLogin, ResponseLogin } from "@/types/auth.type";
import { privateClient, publicClient } from "./apiClient";
import { ApiResponse } from "@/types/api.type";

const BASE_URL = "/auth";

export const authService = {
  login: async (payload: PayloadLogin): Promise<ApiResponse<ResponseLogin>> => {
    const { data } = await publicClient.post<ApiResponse<ResponseLogin>>(
      `${BASE_URL}/signin`,
      payload
    );
    return data;
  },

  signOut: async () => {
    const { data } = await privateClient.get(`${BASE_URL}/signout`);
    return data;
  },
};
