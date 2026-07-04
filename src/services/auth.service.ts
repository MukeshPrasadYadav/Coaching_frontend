// src/services/auth.service.ts
import api from "../api/axios";
import type { ApiResponse } from "../api/types";
import type { User } from "../app/types/user";

export interface SignupRequest {
  password: string;
  name: string;
  contactNumber: string;
}

export interface SignupResponse {
  userId: string;
  name: string;
  roles: string | string[];
}

export interface LoginRequest {
  contactNumber: string;
  password: string;
}

export interface LoginResponse {
  accessToken?: string;
  refreshToken?: string;
}

class AuthService {
  async signup(payload: SignupRequest): Promise<ApiResponse<SignupResponse>> {
    const { data } = await api.post<ApiResponse<SignupResponse>>("/auth/signup", payload);
    return data;
  }

  async login(payload: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    const { data } = await api.post<ApiResponse<LoginResponse>>("/auth/signin", payload);
    return data;
  }

  async getMe(): Promise<ApiResponse<User>> {
    const { data } = await api.get<ApiResponse<User>>("/auth/get/me");
    return data;
  }

  async logout(): Promise<ApiResponse<null>> {
    const { data } = await api.post<ApiResponse<null>>("/auth/signout");
    return data;
  }
}

export const authService = new AuthService();
export default authService;
