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
      checkStudent: (studentNumber: string) => `${baseUrl}/check-student/${studentNumber}/`,
      education: {
        get: (studentNumber: string) => `${baseUrl}/education/student/${studentNumber}/`,
        submit: `${baseUrl}/education/`,
      },
      internship: {
        get: (studentNumber: string) => `${baseUrl}/intern/student/${studentNumber}/`,
        submit: `${baseUrl}/intern/`,
      },
    },
  };

  return {
    baseUrl,
    apiEndpoints,
  };
};
