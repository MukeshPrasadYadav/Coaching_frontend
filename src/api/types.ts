// src/api/types.ts
export interface ApiError {
  message: string;
  status: string;
  timeStamp: string;
  subErrors?: unknown;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
  error: ApiError | null;
  timeStamp: string;
}
