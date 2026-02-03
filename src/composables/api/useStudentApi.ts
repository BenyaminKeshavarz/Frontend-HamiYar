import $api from "@/utils/api";
import { useApiConfig } from "@/composables/api/useApiConfig";
import type { CheckStudentResponse } from "@/types/requests/student";

export const useStudentApi = () => {
  const { apiEndpoints } = useApiConfig();

  /**
   * Check if student exists by identifier (student number or national ID)
   * @param identifier - Student number or national ID
   * @param type - Type of identifier: "student" or "national"
   * @returns CheckStudentResponse
   */
  async function checkStudent(
    identifier: string,
    type: "student" | "national",
  ): Promise<CheckStudentResponse> {
    // TODO: API endpoint needs to support national ID lookup
    // For now, only student number is supported
    if (type === "national") {
      throw new Error("National ID lookup not yet implemented in API");
    }

    // Validate that identifier is not empty
    if (!identifier || identifier.trim().length === 0) {
      throw new Error("Invalid student number");
    }

    const url = apiEndpoints.requests.checkStudent(identifier.trim());

    const response = await $api.get<CheckStudentResponse>(url);

    if (!response.data) {
      throw new Error("No data received from API");
    }

    return response.data;
  }

  return {
    checkStudent,
  };
};

