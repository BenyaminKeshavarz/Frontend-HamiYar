<script setup lang="ts">
import { computed, reactive, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import InternshipFormContent from "@/components/InternshipFormContent.vue";
import { useRequestsFormSubmission } from "@/composables/useRequestsFormSubmission";
import { useInternshipFormStore } from "@/stores/internship/useInternshipFormStore";
import { useStudentStore } from "@/stores/student/useStudentStore";
import { useInternshipApi } from "@/composables/api/useInternshipApi";

const route = useRoute();
const router = useRouter();
const internshipFormStore = useInternshipFormStore();
const studentStore = useStudentStore();
const { getInternshipLetter } = useInternshipApi();

// Detect public (QR) mode via route meta
const isPublicView = computed(() => route.meta.mode === "public");

const qrImageSrc = computed(() => internshipFormStore.rawApiResponse?.qr_code_image || undefined);

// Form data - use reactive wrapper for v-model support
const formData = reactive(internshipFormStore.getDefaultFormData());

// Prefill form from student store for internal mode
function prefillFromStudentStore() {
  const student = studentStore.student;
  if (!student) return;

  formData.student.code = student.student_number || "";
  formData.student.fullName =
    student.full_name || `${student.first_name || ""} ${student.last_name || ""}`.trim();
    formData.education.field = student.field_of_study || "";

  formData.education.entryAcademicYear = student.entry_year || "";
  formData.education.degreeType = student.education_level || "";
  formData.education.system = student.education_system || "";
}

// Load data for public (QR) view using API
async function loadPublicData() {
  const identifier = (route.params.identifier as string | undefined) || "";
  const type = (route.query.type as "student" | "national" | undefined) || "student";

  if (!identifier) {
    router.replace({ name: 'NotFound' });
    return;
  }

  const apiResponse = await getInternshipLetter(identifier, type);
  internshipFormStore.setFormDataFromApi(apiResponse);

  if (internshipFormStore.formData) {
    Object.assign(formData, internshipFormStore.formData);
  }
}

// Check mode and prepare data
onMounted(async () => {
  if (isPublicView.value) {
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

// Sync formData with store when store data changes
watch(
  () => internshipFormStore.formData,
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
    formData.education.field,
    formData.education.entryAcademicYear,
    formData.education.degreeType,
    formData.education.system,
    formData.internship.course,
    formData.internship.duration,
    formData.internship.instructor,
    formData.internship.companyName,
    formData.internship.address,
    formData.internship.postalCode,
    formData.internship.workplace,
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
} = useRequestsFormSubmission(validateForm, "internship");

// Wrapper for handleSubmit to pass formData
function handleSubmit() {
  submitForm(formData);
}
</script>

<template>
  <InternshipFormContent
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
