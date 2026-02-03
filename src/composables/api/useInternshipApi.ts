import $api from "@/utils/api";
import { useApiConfig } from "@/composables/api/useApiConfig";
import type {
  InternshipResponse,
  InternshipRequestModel,
} from "@/types/requests/internship";

export const useInternshipApi = () => {
  const { apiEndpoints } = useApiConfig();

  /**
   * Get internship letter data by student number or national ID
   * @param identifier - Student number or national ID
   * @param type - Type of identifier: "student" or "national"
   * @returns Internship letter response
   */
  async function getInternshipLetter(
    identifier: string,
    type: "student" | "national",
  ): Promise<InternshipResponse> {
    // TODO: API endpoint needs to support national ID lookup
    // For now, only student number is supported
    if (type === "national") {
      throw new Error("National ID lookup not yet implemented in API");
    }

    // Validate that identifier is not empty
    if (!identifier || identifier.trim().length === 0) {
      throw new Error("Invalid student number");
    }

    const url = apiEndpoints.requests.internship.get(identifier);

    // TODO: Complete API implementation when backend is ready
    // This is a placeholder that will be completed later
    const response = await $api.get<InternshipResponse>(url);

    if (!response.data) {
      throw new Error("No data received from API");
    }

    return response.data;
  }

  /**
   * Submit internship letter request
   * @param requestData - Internship letter request data
   * @returns Internship letter response
   */
  async function submitInternshipLetter(
    requestData: InternshipRequestModel,
  ): Promise<InternshipResponse> {
    const url = apiEndpoints.requests.internship.submit;

    // TODO: Complete API implementation when backend is ready
    // This is a placeholder that will be completed later
    const response = await $api.post<InternshipResponse>(url, requestData);

    if (!response.data) {
      throw new Error("No data received from API");
    }

    return response.data;
  }

  return {
    getInternshipLetter,
    submitInternshipLetter,
  };
};
