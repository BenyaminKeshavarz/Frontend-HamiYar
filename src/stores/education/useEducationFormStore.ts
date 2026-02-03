import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { siteConfig } from "@/config";
import type {
  EducationCertificateResponse,
  EducationFormData,
  EducationCertificateRequestModel,
} from "@/types/requests/education";

import { useDate } from "@/composables/useDate";

const { getToday, formatIsoToJalali } = useDate();

/**
 * Get default form data structure
 */
function getDefaultFormData(): EducationFormData {
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
      fatherName: "",
      idNumber: "",
      birthPlace: "",
      birthDate: "",
      birthDateIso: "",
      photoUrl: "",
    },
    education: {
      field: "",
      degreeType: "",
      method: "",
      entrySemester: "",
      entryAcademicYear: "",
      currentSemester: "",
      currentAcademicYear: "",
    },
    certificate: {
      recipient: "",
      validityDate: "",
    },
    description: "",
    signature: {
      title: "معاون آموزشی و مهارتی واحد دانشگاهی", //TODO: Get from api later
      name: "دکتر فاطمه برناکی", //TODO: Get from api later
      imageUrl: "", //TODO: Get from api later
    },
  };
}

/**
 * Transform API response to form data structure
 */
function transformApiResponseToFormData(
  apiResponse: EducationCertificateResponse,
): EducationFormData {
  const { student, academic_term, academic_year, expiration_date, signer } = apiResponse;

  // Format academic year (assuming format like "1402-1403")
  const formattedAcademicYear = academic_year || "";

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
      fatherName: student.father_name || "",
      idNumber: student.certificate_number || student.national_id || "",
      birthPlace: student.issued_by || "",
      birthDate: formatIsoToJalali(student.birth_date), // Jalali for display
      birthDateIso: student.birth_date || "", // Keep original ISO date for API
      photoUrl: "", // TODO: Get from API if available
    },
    education: {
      field: student.field_of_study || "",
      degreeType: student.education_level || "",
      method: student.education_system || "",
      entrySemester: student.entry_term || academic_term || "",
      entryAcademicYear: formattedAcademicYear,
      currentSemester: academic_term || "",
      currentAcademicYear: formattedAcademicYear,
    },
    certificate: {
      recipient: "", // TODO: Get from API or leave empty for user input
      validityDate: formatIsoToJalali(expiration_date) || "", // Keep ISO format from DatePicker
    },
    description: "",
    signature: {
      title: signer?.title || "",
      name: signer?.full_name || "",
      imageUrl: signer?.signature_image || "",
    },
  };
}

export const useEducationFormStore = defineStore("educationForm", () => {
  // Private state
  const _formData = ref<EducationFormData | null>(null);
  const _rawApiResponse = ref<EducationCertificateResponse | null>(null);

  // Public getters - return ref directly for reactivity
  const formData = computed(() => _formData.value);
  const rawApiResponse = computed(() => _rawApiResponse.value);
  const hasData = computed(() => _formData.value !== null);

  /**
   * Set form data from API response
   */
  function setFormDataFromApi(apiResponse: EducationCertificateResponse): void {
    _rawApiResponse.value = apiResponse;
    _formData.value = transformApiResponseToFormData(apiResponse);
  }

  /**
   * Transform form data to API request format
   */
  function transformFormDataToRequest(
    formData: EducationFormData,
  ): EducationCertificateRequestModel {
    // TODO: fullname directly from api response
    const fullNameParts = (formData.student.fullName || "").split(" ").filter(Boolean);
    const firstName = fullNameParts[0] || "";
    const lastName = fullNameParts.slice(1).join(" ") || ""

    return {
      first_name: firstName,
      last_name: lastName,
      father_name: formData.student.fatherName || "",
      national_id: formData.student.idNumber || "",
      birth_date: formData.student.birthDateIso || "",
      field_of_study: formData.education.field || "",
      student_number: formData.student.code || "",
      academic_term: formData.education.currentSemester || "",
      academic_year: formData.education.currentAcademicYear || "",
      education_level: formData.education.degreeType || "",
      education_system: formData.education.method || "",
      issued_by: formData.student.birthPlace || "",
      expiration_date: formData.certificate.validityDate || "",
      university: 1, // TODO: Get from store or config (university id)
      faculty: 1, // TODO: Get from store or config (faculty id)
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
