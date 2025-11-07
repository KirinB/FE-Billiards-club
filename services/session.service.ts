import { ApiResponse } from "@/types/api.type";
import { privateClient } from "./apiClient";
import {
  CreateSessionPayload,
  CreateSessionResponse,
} from "@/types/session.type";

const API_URL = "/sessions";

export const sessionService = {
  create: async (
    payload: CreateSessionPayload
  ): Promise<CreateSessionResponse> => {
    const { data } = await privateClient.post<
      ApiResponse<CreateSessionResponse>
    >(API_URL, payload);
    return data.metaData;
  },
};
