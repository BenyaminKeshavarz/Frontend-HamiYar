import { apiConfig } from "@/config";

export const useApiConfig = () => {
  const { baseUrl } = apiConfig;

  const apiEndpoints = {
    // * Account related Endpoints
    account: {
      auth: {
        login: `${baseUrl}/token/`,
        logout: `${baseUrl}/logout/`,
        refreshToken: `${baseUrl}/token/refresh/`,
      },
    },

    // * Requests related Endpoints
    requests: {
      education: {
        get: (studentNumber: number) => `${baseUrl}/education/student/${studentNumber}`,
        send: `${baseUrl}/education/`,
      },
      internship: {
        get: (studentNumber: number) => `${baseUrl}/intern/student/${studentNumber}`,
        send: `${baseUrl}/intern/`,
      },
    },
  };

  return {
    baseUrl,
    apiEndpoints,
  };
};
