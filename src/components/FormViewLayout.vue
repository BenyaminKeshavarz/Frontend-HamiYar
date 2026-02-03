<script setup lang="ts">
import { computed } from "vue";
import AlertDialog from "@/components/AlertDialog.vue";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Icon } from "@iconify/vue";
import { useRoute } from "vue-router";

interface Props {
  isSubmitted?: boolean;
  isSubmitting?: boolean;
  isFormValid?: boolean;
  showEditModeToggle?: boolean;
  showEditButton?: boolean;
  qrImageSrc?: string;
}

const {
  isSubmitted = false,
  isSubmitting = false,
  isFormValid = false,
  showEditModeToggle = false,
  showEditButton = true,
  qrImageSrc = "@/assets/images/qr-test.jpg",
} = defineProps<Props>();

const emit = defineEmits<{
  submit: [];
  edit: [];
  print: [];
}>();

const isEditMode = defineModel<boolean>("isEditMode", {
  default: false,
});

const route = useRoute();

const isBlankLayout = computed(() => route.meta.layout === "blank");

</script>

<template>
  <div class="relative">
    <AlertDialog v-if="!isBlankLayout"/>

    <div class="flex justify-center items-center py-16 print:p-0 ">
      <div
        class="w-[210mm] bg-white mx-auto p-[4mm] relative shadow-[0_0_10px_rgba(0,0,0,0.1)] flex flex-col print:m-0 print:shadow-none print:w-full print:h-dvh print:p-0"
        :class="isSubmitted ? 'h-[297mm]' : 'min-h-[297mm]'">
        <div class="border-2 border-black w-full h-full flex flex-col p-6 relative grow">
          <!-- Header Slot -->
          <slot name="header" />

          <!-- Edit Mode Toggle -->
          <div v-if="showEditModeToggle && !isSubmitted" class="flex mb-6 -mt-10 relative z-10">
            <div dir="ltr" class="flex items-center space-x-2 bg-muted border p-2 rounded-md">
              <Switch id="airplane-mode" v-model="isEditMode" />
              <Label for="airplane-mode">فعال کردن حالت قابل ویرایش</Label>
            </div>
          </div>

          <!-- Body Content Slot -->
          <slot name="body" />

          <!-- Footer Signature Slot -->
          <slot name="footer" />

          <!-- Action Buttons -->
          <div class="mt-auto flex gap-3 justify-end print-hidden">
            <!-- Submit Button -->
            <template v-if="!isSubmitted">
              <Button variant="default" size="lg" class="text-base" :disabled="!isFormValid || isSubmitting"
                @click="emit('submit')">
                <Icon v-if="!isSubmitting" icon="mynaui:save-solid" class="size-6" />
                <Icon v-else icon="gg:spinner" class="size-6 animate-spin" />
                {{ isSubmitting ? "در حال ثبت..." : "ثبت اطلاعات" }}
              </Button>
            </template>

            <template v-else>
              <!-- Edit Button -->
              <Button v-if="showEditButton" variant="secondary" size="lg" class="text-base border-2"
                @click="emit('edit')">
                <Icon icon="mdi:pencil" class="size-6" />
                ویرایش
              </Button>

              <!-- Print Button -->
              <Button variant="default" size="lg" class="text-base" @click="emit('print')">
                <Icon icon="mdi:printer" class="size-6" />
                چاپ
              </Button>
            </template>
          </div>

          <!-- QR Code -->
          <figure v-if="qrImageSrc" class="absolute bottom-5 start-5">
            <img width="150" :src="qrImageSrc" alt="qr code" />
          </figure>

          <!-- Corner Decorations -->
          <div class="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-black opacity-30"></div>
          <div class="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-black opacity-30"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/css/main.css";

@media print {
  body {
    background: none;
  }

  button {
    display: none !important;
  }

  .print-hidden {
    display: none !important;
  }
}
</style>
