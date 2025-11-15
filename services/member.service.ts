import {
  MemberCreatePayload,
  MemberCreateResponse,
  MemberGetListParams,
  MemberGetListResponse,
  MemberUpdatePayload,
  MemberUpdateResponse,
} from "@/types/member.type";
import { privateClient } from "./apiClient";
import { ApiResponse } from "@/types/api.type";

const API_URL = "/members";

export const memberService = {
  delete: async (id: number) => {
    await privateClient.delete(`${API_URL}/${id}`);
  },

  update: async (
    id: number,
    payload: MemberUpdatePayload
  ): Promise<MemberUpdateResponse> => {
    const { data } = await privateClient.patch<
      ApiResponse<MemberUpdateResponse>
    >(`${API_URL}/${id}`, payload);
    return data.metaData;
  },

  create: async (
    payload: MemberCreatePayload
  ): Promise<MemberCreateResponse> => {
    const { data } = await privateClient.post<
      ApiResponse<MemberCreateResponse>
    >(`${API_URL}`, payload);
    return data.metaData;
  },

  getList: async (
    params: MemberGetListParams
  ): Promise<MemberGetListResponse> => {
    const { data } = await privateClient.get<
      ApiResponse<MemberGetListResponse>
    >(API_URL, { params });
    return data.metaData;
  },
};
