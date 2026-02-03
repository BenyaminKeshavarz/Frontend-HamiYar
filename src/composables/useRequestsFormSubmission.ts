import { computed, ref } from "vue";
import { toast } from "vue-sonner";
import { useEducationApi } from "@/composables/api/useEducationApi";
import { useInternshipApi } from "@/composables/api/useInternshipApi";
import { useEducationFormStore } from "@/stores/education/useEducationFormStore";
import { useInternshipFormStore } from "@/stores/internship/useInternshipFormStore";
import type { EducationFormData } from "@/types/requests/education";
import type { InternshipFormData } from "@/types/requests/internship";

export function useRequestsFormSubmission(
  validateForm: () => boolean,
  requestType: "education" | "internship"
) {
  // Edit mode state
  const isEditMode = ref(true);

  // Submit state
  const isSubmitted = ref(false);
  const isSubmitting = ref(false);

  // Form validation
  const isFormValid = computed(() => validateForm());

  // API and stores
  const { submitEducationCertificate } = useEducationApi();
  const { submitInternshipLetter } = useInternshipApi();
  const educationFormStore = useEducationFormStore();
  const internshipFormStore = useInternshipFormStore();

  // Handle form submission
  async function handleSubmit(formData?: EducationFormData | InternshipFormData | Record<string, any>) {
    if (!isFormValid.value || isSubmitting.value) return;

    isSubmitting.value = true;

    try {
      if (requestType === "education") {
        if (!formData) {
          throw new Error("Form data is required for education request");
        }

        // Transform form data to API request format using store method
        const requestData = educationFormStore.transformFormDataToRequest(formData as EducationFormData);

        // Submit education certificate request
        await submitEducationCertificate(requestData);

        // Update store with response
        // educationFormStore.setFormDataFromApi(response);
      } else if (requestType === "internship") {
        if (!formData) {
          throw new Error("Form data is required for internship request");
        }

        // Transform form data to API request format using store method
        const requestData = internshipFormStore.transformFormDataToRequest(formData as InternshipFormData);

        // Submit internship letter request
        await submitInternshipLetter(requestData);
      }

      // Success
      isSubmitted.value = true;
      isEditMode.value = false;

      toast.success("اطلاعات با موفقیت ثبت شد.", {
        description: "اطلاعات مورد نظر با موفقیت ثبت شد و درخواست شما آماده چاپ است.",
        richColors: true,
      });
    } catch (error: any) {
      console.error("Error submitting requests form:", error);

  // Use the pre-extracted message from our interceptor
  const errorMessage = error.extractedMessage || "خطا در ارتباط با سرور";

      toast.error("خطا در ثبت اطلاعات", {
        description: errorMessage,
        richColors: true,
      });
    } finally {
      isSubmitting.value = false;
    }
  }

  function printPage() {
    window.print();
  }

  function resetForm() {
    isSubmitted.value = false;
    isEditMode.value = true;
  }

  return {
    isEditMode,
    isSubmitted,
    isSubmitting,
    isFormValid,
    handleSubmit,
    printPage,
    resetForm,
  };
}
