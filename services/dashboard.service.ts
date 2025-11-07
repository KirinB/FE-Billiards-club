import { ApiResponse } from "@/types/api.type";
import { privateClient } from "./apiClient";
import {
  DashboardChartResponse,
  DashboardSummaryResponse,
} from "@/types/dashboard.type";

const API_URL = "/dashboard";

export const DashboardService = {
  getSummary: async (): Promise<DashboardSummaryResponse> => {
    const { data } = await privateClient.get<
      ApiResponse<DashboardSummaryResponse>
    >(`${API_URL}/summary`);
    return data.metaData;
  },
  getChart: async (): Promise<DashboardChartResponse[]> => {
    const { data } = await privateClient.get<
      ApiResponse<DashboardChartResponse[]>
    >(`${API_URL}/chart`);

    return data.metaData;
  },
};
