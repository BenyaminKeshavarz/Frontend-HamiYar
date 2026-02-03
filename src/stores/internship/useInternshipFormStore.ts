import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { siteConfig } from "@/config";
import type {
  InternshipResponse,
  InternshipFormData,
  InternshipRequestModel,
} from "@/types/requests/internship";

import { useDate } from "@/composables/useDate";

const { getToday } = useDate();

/**
 * Get default form data structure
 */
function getDefaultFormData(): InternshipFormData {
  return {
    header: {
      university: siteConfig.university.name, //TODO: Get from api later
      city: siteConfig.university.city, //TODO: Get from api later
      date: getToday() || "-", // TODO: Get from API or generate dynamically
      number: "-", // TODO: Get from API if available
      attachment: "-",
    },
    student: {
      code: "",
      fullName: "",
    },
    education: {
      field: "",
      entryAcademicYear: "",
      degreeType: "",
      system: "",
    },
    internship: {
      course: "",
      duration: "",
      instructor: "",
      companyName: "",
      address: "",
      postalCode: "",
      workplace: "",
      disciplinarian: false,
    },
    signature: {
      title: "معاون فناوری", //TODO: Get from api later
      name: "دکتر احمدرضا عزیز سلطانی", //TODO: Get from api later
      imageUrl: "", //TODO: Get from api later
    },
  };
}

/**
 * Transform API response to form data structure
 */
function transformApiResponseToFormData(apiResponse: InternshipResponse): InternshipFormData {
  const { student, company, time, teacher, signer } = apiResponse;

  return {
    header: {
      university: student.university.name || siteConfig.university.name || "",
      city: student.university.city || siteConfig.university.city || "",
      date: getToday() || "-", // TODO: Get from API or generate dynamically
      number: "-", // TODO: Get from API if available
      attachment: "-",
    },
    student: {
      code: student.student_number || "",
      fullName: `${student.first_name || ""} ${student.last_name || ""}`.trim(),
    },
    education: {
      field: "", // TODO: Get from API if available
      entryAcademicYear: student.entry_year || "",
      degreeType: student.education_level || "",
      system: student.education_system || "",
    },
    internship: {
      course: "", // TODO: Get from API if available
      duration: time || "",
      instructor: teacher || "",
      companyName: "", // TODO: Get from API if available
      address: company?.address || "",
      postalCode: company?.postal_code || "",
      workplace: "", // TODO: Get from API if available
      disciplinarian: apiResponse.disciplinarian || false,
    },
    signature: {
      title: signer?.title || "",
      name: signer?.full_name || "",
      imageUrl: signer?.signature_image || "",
    },
  };
}

export const useInternshipFormStore = defineStore("internshipForm", () => {
  // Private state
  const _formData = ref<InternshipFormData | null>(null);
  const _rawApiResponse = ref<InternshipResponse | null>(null);

  // Public getters - return ref directly for reactivity
  const formData = computed(() => _formData.value);
  const rawApiResponse = computed(() => _rawApiResponse.value);
  const hasData = computed(() => _formData.value !== null);

  /**
   * Set form data from API response
   */
  function setFormDataFromApi(apiResponse: InternshipResponse): void {
    _rawApiResponse.value = apiResponse;
    _formData.value = transformApiResponseToFormData(apiResponse);
  }

  /**
   * Transform form data to API request format
   */
  function transformFormDataToRequest(formData: InternshipFormData): InternshipRequestModel {
      // TODO: fullname directly from api response
    const fullNameParts = (formData.student.fullName || "").split(" ").filter(Boolean);
    const firstName = fullNameParts[0] || "";
    const lastName = fullNameParts.slice(1).join(" ") || "";

    return {
      first_name: firstName,
      last_name: lastName,
      student_number: formData.student.code || "",
      national_id: "-", // TODO: Get from student store when wired
      academic_term: "-", // TODO: Add academic term to form and map it here
      academic_year: formData.education.entryAcademicYear || "",
      education_level: formData.education.degreeType || "",
      education_system: formData.education.system || "",
      field_of_study: formData.education.field || "",
      company_name: formData.internship.companyName || "",
      company_postal_code: formData.internship.postalCode || "",
      company_address: formData.internship.address || "",
      time: formData.internship.duration || "",
      description: "", // TODO: Add description field to form and map it here
      teacher: formData.internship.instructor || "",
      disciplinarian: formData.internship.disciplinarian || false,
      signer: 1, // TODO: Get signer id from config or separate store
    };
  }

  /**
   * Clear all stored data
   */
  function clearFormData(): void {
    _formData.value = null;
    _rawApiResponse.value = null;
  }

  return {
    formData,
    rawApiResponse,
    hasData,
    getDefaultFormData,
    setFormDataFromApi,
    transformFormDataToRequest,
    clearFormData,
  };
});
