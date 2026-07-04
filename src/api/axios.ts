// src/api/axios.ts
import axios, { type InternalAxiosRequestConfig } from "axios";
import { ApiException, isApiResponse } from "./response";

const baseURL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080/api/v1";

if (!baseURL) {
  console.warn("VITE_API_BASE_URL is not configured. API requests will use the current origin.");
}

const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
  timeout: 15_000,
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => config,
  (error: unknown) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => {
    if (isApiResponse(response.data) && !response.data.success) {
      throw new ApiException(
        response.data.error?.message ?? response.data.message,
        {
          status: response.status,
          apiError: response.data.error,
          response: response.data,
        },
      );
    }

    // Keep AxiosResponse intact. Services explicitly return response.data,
    // which is the complete ApiResponse<T>, never its nested data property.
    return response;
  },
  (error: unknown) => {
    if (error instanceof ApiException) {
      return Promise.reject(error);
    }

    if (!axios.isAxiosError(error)) {
      return Promise.reject(new ApiException("An unexpected error occurred.", { cause: error }));
    }

    const payload = error.response?.data;
    const apiResponse = isApiResponse(payload) ? payload : null;
    const message =
      apiResponse?.error?.message ??
      apiResponse?.message ??
      (error.code === "ECONNABORTED"
        ? "The request timed out. Please try again."
        : error.message === "Network Error"
          ? "Unable to reach the server. Check your connection and try again."
          : "Your request could not be completed.");

    return Promise.reject(
      new ApiException(message, {
        status: error.response?.status,
        apiError: apiResponse?.error,
        response: apiResponse,
        cause: error,
      }),
    );
  },
);

export default api;
