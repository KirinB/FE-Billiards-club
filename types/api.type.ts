export interface ApiResponse<T> {
  success: boolean;
  message: string;
  metaData: T;
}

export type SortOrder = "asc" | "desc";

// export interface ErrorResponse {
//   error: string;
//   errorCode: string;
//   statusCode: number;
//   success: boolean;
// }
