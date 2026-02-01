<script setup lang="ts">
import PersonModal from "@/components/PersonModal.vue";
import ServiceCard from "@/components/ServiceCard.vue";

import { ref } from "vue";
import { toast } from "vue-sonner";
import router from "@/router";


type ServiceType = "education" | "internship";

interface UserIdentifier {
  type: "national" | "student";
  value: string;
}

const currentServiceType = ref<ServiceType | null>(null);
const isModalOpen = ref(false);
const identifier = ref("");
const isSubmitting = ref(false);

function openServiceModal(type: ServiceType) {
  currentServiceType.value = type;
  isModalOpen.value = true;
}

async function handleServiceRequest(identifier: UserIdentifier): Promise<void> {
  if (!currentServiceType.value || isSubmitting.value) return;

  const serviceType = currentServiceType.value;
  isSubmitting.value = true;

  try {
    // fake http request to simulate latency
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("request ok", { 
      serviceType, 
      type: identifier.type, 
      value: identifier.value 
    });

    toast.success("موفقیت آمیز!", {
      description: "اطلاعات مورد نظر یافت شد، درحال انتقال...",
      richColors: true,
    });

    identifier.value = "";
    isModalOpen.value = false;

    if (serviceType === "education") router.push("/education");
    else if (serviceType === "internship") router.push("/internship");
  } catch (error) {
    console.error("submit failed", error);
    toast.error("خطا!", {
      description: error instanceof Error ? error.message : String(error),
      richColors: true,
    });
  } finally {
    isSubmitting.value = false;
    currentServiceType.value = null;
  }
}
</script>

<template>
  <section id="services" class="flex flex-col justify-center items-center px-8 text-center scroll-mt-24">
    <section class="w-max mb-18 flex-col-center gap-4">
      <h2 class="text-3xl font-bold text-foreground">خدمات قابل دسترس</h2>
      <hr class="w-3/5 h-1 bg-brand-primary-500 border-none rounded-full" />
    </section>

    <div class="gap-6 flex flex-col md:flex-row w-full max-w-6xl">
      <div class="flex-1 w-full md:w-1/2">
        <ServiceCard icon="solar:diploma-verified-outline" title="گواهی اشتغال به تحصیل"
          description="صدور گواهی اشتغال به تحصیل با وارد کردن کد ملی یا شماره دانشجویی"
          @start-service="openServiceModal('education')" />
      </div>
      <div class="flex-1 w-full md:w-1/2">
        <ServiceCard icon="solar:case-outline" title="نامه کارآموزی"
          description="صدور نامه کارآموزی با وارد کردن کد ملی یا شماره دانشجویی"
          @start-service="openServiceModal('internship')" />
      </div>
    </div>

    <PersonModal v-model:identifier="identifier" v-model:is-open="isModalOpen" :is-submitting="isSubmitting"
      @submit="handleServiceRequest" />
  </section>
</template>
