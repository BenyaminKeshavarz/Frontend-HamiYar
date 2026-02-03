<script setup lang="ts">
import { computed, reactive, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import EducationFormContent from "@/components/EducationFormContent.vue";
import { useRequestsFormSubmission } from "@/composables/useRequestsFormSubmission";
import { useEducationFormStore } from "@/stores/education/useEducationFormStore";
import { useStudentStore } from "@/stores/student/useStudentStore";
import { useEducationApi } from "@/composables/api/useEducationApi";

import { useDate } from "@/composables/useDate";

const { formatIsoToJalali } = useDate();

const route = useRoute();
const router = useRouter();
const educationFormStore = useEducationFormStore();
const studentStore = useStudentStore();
const { getEducationCertificate } = useEducationApi();

// Detect public (QR) mode via route meta
const isPublicView = computed(() => route.meta.mode === "public");

const qrImageSrc = computed(() => educationFormStore.rawApiResponse?.qr_code_image || undefined); //TODO: Get from api later

// Form data - base structure
const formData = reactive(educationFormStore.getDefaultFormData());

// Prefill form from student store for internal mode
function prefillFromStudentStore() {
  const student = studentStore.student;
  if (!student) return;

  formData.student.code = student.student_number || "";
  formData.student.fullName =
    student.full_name || `${student.first_name || ""} ${student.last_name || ""}`.trim();
  formData.student.fatherName = student.father_name || "";
  formData.student.idNumber = student.certificate_number || student.national_id || "";
  formData.student.birthPlace = student.issued_by || "";
  // Store both Jalali (for display) and ISO (for API)
  formData.student.birthDate = formatIsoToJalali(student.birth_date);
  formData.student.birthDateIso = student.birth_date || "";

  formData.education.field = student.field_of_study || "";
  formData.education.degreeType = student.education_level || "";
  formData.education.method = student.education_system || "";
  formData.education.entrySemester = student.entry_term || "";
  formData.education.entryAcademicYear = student.entry_year || "";
}

// Load data for public (QR) view using API
async function loadPublicData() {
  const identifier = (route.params.identifier as string | undefined) || "";
  const type = (route.query.type as "student" | "national" | undefined) || "student";

  if (!identifier) {
    router.replace({ name: 'NotFound' });
    return;
  }

  const apiResponse = await getEducationCertificate(identifier, type);
  educationFormStore.setFormDataFromApi(apiResponse);

  // Sync local formData with store-transformed data
  if (educationFormStore.formData) {
    Object.assign(formData, educationFormStore.formData);
  }
}

onMounted(async () => {
  if (isPublicView.value) {
    // Public QR mode - load data from API and show read-only submitted view
    try {
      await loadPublicData();
      isSubmitted.value = true;
      isEditMode.value = false;
    } catch {
      router.replace({ name: 'NotFound' });
    }
    return;
  }

  // Internal mode - require student info in store
  if (!studentStore.exists) {
    router.replace("/");
    return;
  }

  prefillFromStudentStore();
});

// Sync formData with store when store data changes (e.g. after submit)
watch(
  () => educationFormStore.formData,
  (storeData) => {
    if (storeData) {
      Object.assign(formData, storeData);
    }
  },
  { immediate: false },
);

// Form validation function
function validateForm() {
  const requiredFields = [
    formData.student.fullName,
    formData.student.fatherName,
    formData.student.idNumber,
    formData.student.birthPlace,
    formData.student.birthDate,
    formData.education.field,
    formData.education.degreeType,
    formData.education.method,
    formData.education.entrySemester,
    formData.education.entryAcademicYear,
    formData.education.currentSemester,
    formData.education.currentAcademicYear,
    formData.certificate.recipient,
    formData.certificate.validityDate,
  ];

  return requiredFields.every((field) => {
    const value = String(field || "").trim();
    return value.length > 0;
  });
}

// Use form submission composable
const {
  isEditMode,
  isSubmitted,
  isSubmitting,
  isFormValid,
  handleSubmit: submitForm,
  printPage,
  resetForm,
} = useRequestsFormSubmission(validateForm, "education");

// Wrapper for handleSubmit to pass formData
function handleSubmit() {
  submitForm(formData);
}
</script>

<template>
  <EducationFormContent
    v-model:is-edit-mode="isEditMode"
    v-model:form-data="formData"
    :is-submitted="isSubmitted"
    :is-submitting="isSubmitting"
    :is-form-valid="isFormValid"
    :is-public-view="isPublicView"
    :qr-image-src="qrImageSrc"
    @submit="handleSubmit"
    @edit="resetForm"
    @print="printPage"
  />
</template>
