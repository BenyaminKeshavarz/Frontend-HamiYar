import { computed, ref } from "vue";
import { toast } from "vue-sonner";

export function useFormSubmission(validateForm: () => boolean) {
  // Edit mode state
  const isEditMode = ref(true);

  // Submit state
  const isSubmitted = ref(false);
  const isSubmitting = ref(false);

  // Form validation
  const isFormValid = computed(() => validateForm());

  // Handle form submission
  async function handleSubmit() {
    if (!isFormValid.value || isSubmitting.value) return;

    isSubmitting.value = true;

    try {
      // Simulate HTTP request
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Simulate success
      isSubmitted.value = true;
      isEditMode.value = false;

      toast.success("اطلاعات با موفقیت ثبت شد.", {
        description: "اطلاعات مورد نظر با موفقیت ثبت شد و درخواست شما آماده چاپ است.",
        richColors: true,
      });
    } catch (error) {
      console.error("Error submitting form:", error);

      // Extract error message from API error
      const errorMessage =
        error instanceof Error
          ? error.message
          : typeof error === "string"
            ? error
            : "خطا در ثبت اطلاعات";

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

