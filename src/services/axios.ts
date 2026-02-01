import axios from "axios";
import router from "@/router";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { apiConfig } from "@/config";
import { useAuthJwtStore } from "@/stores/account/useAuthJwtStore";

import type { AxiosError } from "axios";
import type { RefreshResponse } from "@/types/account/auth";

declare module "axios" {
  interface CreateAxiosDefaults {
    backBaseURL?: string;
  }
  interface AxiosError {
    messages?: string[];
  }
}

const { apiBaseUrl, baseUrl } = apiConfig;

const axiosInstance = axios.create({
  baseURL: baseUrl,
  backBaseURL: apiBaseUrl,
});

// Request Interceptor: Inject Access Token
axiosInstance.interceptors.request.use((config) => {
  const authStore = useAuthJwtStore();
  const token = authStore.accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Logic to refresh token on 401
const refreshAuthLogic = async (failedRequest: AxiosError) => {
  const authStore = useAuthJwtStore();
  const currentRefreshToken = authStore.refreshToken;

  try {
    // Use plain axios to avoid loops
    const response = await axios.post<RefreshResponse>(`${baseUrl}/token/refresh`, {
      refresh: currentRefreshToken,
    });

    if (response?.data) {
      // const { token, refreshToken } = response.data;
      // authStore.setTokens(token, refreshToken);

      const token = response.data.access;
      authStore.setTokens(token, currentRefreshToken as string);

      // Update the failed request header with new token
      if (failedRequest.response?.config) {
        failedRequest.response.config.headers.Authorization = `Bearer ${token}`;
      }

      return Promise.resolve();
    }

    throw new Error("Invalid token response");
  } catch (error) {
    authStore.clearTokens();
    router.push("/login");

    return Promise.reject(error);
  }
};

// Bind refresh logic to axios instance
createAuthRefreshInterceptor(axiosInstance, refreshAuthLogic);

// Response Interceptor: Error Formatting
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.data) {
      const { messages, message } = error.response.data;

      if (messages?.length > 0) {
        error.messages = messages;
      } else if (message) {
        error.messages = [message];
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
