import $api from "@/utils/api";
import { useApiConfig } from "@/composables/api/useApiConfig";
import type {
  EducationCertificateResponse,
  EducationCertificateRequestModel,
} from "@/types/requests/education";

export const useEducationApi = () => {
  const { apiEndpoints } = useApiConfig();

  /**
   * Get education certificate data by student number or national ID
   * @param identifier - Student number or national ID
   * @param type - Type of identifier: "student" or "national"
   * @returns Education certificate response
   */
  async function getEducationCertificate(
    identifier: string,
    type: "student" | "national",
  ): Promise<EducationCertificateResponse> {
    // TODO: API endpoint needs to support national ID lookup
    // For now, only student number is supported
    if (type === "national") {
      throw new Error("National ID lookup not yet implemented in API");
    }

    // Validate that identifier is not empty
    if (!identifier || identifier.trim().length === 0) {
      throw new Error("Invalid student number");
    }

    const url = apiEndpoints.requests.education.get(identifier);

    // TODO: Complete API implementation when backend is ready
    // This is a placeholder that will be completed later
    const response = await $api.get<EducationCertificateResponse>(url);

    if (!response.data) {
      throw new Error("No data received from API");
    }

    return response.data;
  }

  /**
   * Submit education certificate request
   * @param requestData - Education certificate request data
   * @returns Education certificate response
   */
  async function submitEducationCertificate(
    requestData: EducationCertificateRequestModel,
  ): Promise<EducationCertificateResponse> {
    const url = apiEndpoints.requests.education.submit;

    // TODO: Complete API implementation when backend is ready
    // This is a placeholder that will be completed later
    const response = await $api.post<EducationCertificateResponse>(url, requestData);

    if (!response.data) {
      throw new Error("No data received from API");
    }

    return response.data;
  }

  return {
    getEducationCertificate,
    submitEducationCertificate,
  };
};
