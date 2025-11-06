export interface ApiResponse<T> {
  success: boolean;
  message: string;
  metaData: T;
}

export type SortOrder = "asc" | "desc";

export interface ApiErrorResponse {
  success: false;
  statusCode: number;
  message: string;
  path: string;
  timestamp: string;
}

export interface ApiResponseDeleted {
  success: boolean;
  message: string;
}
