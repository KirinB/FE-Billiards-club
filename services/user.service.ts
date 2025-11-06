import {
  IPayloadUpdateUser,
  IResponseUpdateUser,
  ParamsGetListUser,
  ResponseGetListUser,
  UserCreatePayload,
  UserCreateResponse,
} from "@/types/user.type";
import { privateClient } from "./apiClient";
import { ApiResponse, ApiResponseDeleted } from "@/types/api.type";

const API_URL = "/users";

export const userService = {
  getList: async (params: ParamsGetListUser): Promise<ResponseGetListUser> => {
    const { data } = await privateClient.get<ApiResponse<ResponseGetListUser>>(
      API_URL,
      {
        params,
      }
    );
    return data.metaData;
  },

  update: async (
    id: number,
    payload: IPayloadUpdateUser
  ): Promise<IResponseUpdateUser> => {
    const { data } = await privateClient.patch<
      ApiResponse<IResponseUpdateUser>
    >(`${API_URL}/${id}`, payload);

    return data.metaData;
  },

  delete: async (id: number): Promise<ApiResponseDeleted> => {
    const { data } = await privateClient.delete<ApiResponseDeleted>(
      `${API_URL}/${id}`
    );
    return data;
  },

  create: async (payload: UserCreatePayload): Promise<UserCreateResponse> => {
    const { data } = await privateClient.post<ApiResponse<UserCreateResponse>>(
      API_URL,
      payload
    );
    return data.metaData;
  },
};
