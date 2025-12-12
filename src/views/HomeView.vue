<script setup lang="ts">
import { ref, computed, reactive } from "vue";
import PersonModal from "@/components/PersonModal.vue";
import { Icon } from "@iconify/vue";
import { toast } from "vue-sonner";
import router from "@/router";

type RequestType = "education" | "internship";

const submittingType = ref<RequestType | null>(null);

const identifiers = reactive({
  education: "",
  internship: "",
});

const isSubmittingByType = computed(() => (type: RequestType) => submittingType.value === type);

async function onSubmit(requestType: RequestType, identifier: number): Promise<void> {
  if (submittingType.value) return;

  submittingType.value = requestType;
  try {
    // fake http request to simulate latency
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("request ok", { requestType, identifier });

    toast.success("موفقیت آمیز!", {
      description: "اطلاعات مورد نظر یافت شد، درحال انتقال...",
      richColors: true,
    });

    identifiers[requestType] = "";

    if (requestType === "education") router.push("/education");
    else if (requestType === "internship") console.log("internship");
  } catch (error) {
    console.error("submit failed", error);
    toast.error("خطا!", {
      description: error instanceof Error ? error.message : String(error),
      richColors: true,
    });
  } finally {
    submittingType.value = null;
  }
}
</script>

<template>
  <div>
    <header class="flex-col-center mt-5">
      <img width="160" src="@/assets/images/logo.png" alt="logo" />
    </header>

    <section class="flex-1 flex flex-col justify-center items-center p-8 text-center mt-16">
      <div class="welcome-text">
        <h1 class="text-3xl font-bold mb-4 text-brand-primary-900">به سامانه حامی یار خوش آمدید</h1>
        <p class="mb-12 text-lg text-brand-primary-700">
          لطفاً جهت انجام امور اداری یکی از گزینه‌های زیر را انتخاب کنید.
        </p>
      </div>

      <div class="gap-8 md:gap-4 grid grid-cols-2 max-w-2xl w-full">
        <PersonModal
          v-model="identifiers.education"
          :is-submitting="isSubmittingByType('education')"
          @submit="(identifier) => onSubmit('education', identifier)"
        >
          <template #trigger-content>
            <Icon icon="mdi:school" class="size-10" />
            <span class="text-xl">گواهی اشتغال به تحصیل</span>
          </template>
        </PersonModal>

        <PersonModal
          v-model="identifiers.internship"
          :is-submitting="isSubmittingByType('internship')"
          @submit="(identifier) => onSubmit('internship', identifier)"
        >
          <template #trigger-content>
            <Icon icon="mdi:briefcase" class="size-10" />
            <span class="text-xl">نامه کارآموزی</span>
          </template>
        </PersonModal>
      </div>
    </section>
  </div>
</template>
