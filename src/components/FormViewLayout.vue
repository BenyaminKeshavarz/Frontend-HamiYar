<script setup lang="ts">
import { computed } from "vue";
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/vue";
import { useRoute } from "vue-router";
import type { FormState, FormConfig } from "@/types/forms";

interface Props extends FormState, FormConfig {}

const props = withDefaults(defineProps<Props>(), {
  isSubmitted: false,
  isSubmitting: false,
  isFormValid: false,
  isPrintView: false,
  showEditButton: true,
});

const emit = defineEmits<{
  submit: [];
  edit: [];
  issuance: [];
}>();

// Used for v-model binding with parent; slot content from parent uses its own isEditMode
defineModel<boolean>("isEditMode", { default: false });

const route = useRoute();

const isBlankLayout = computed(() => route.meta.layout === "blank");

function handlePrint() {
  window.print();
}
</script>

<template>
  <div class="relative form-print-root">
    <ConfirmDialog
      v-if="!isBlankLayout"
      title="تأیید خروج از صفحه"
      description="با خروج از این صفحه، اطلاعات واردشده ذخیره نخواهد شد. آیا از خروج از صفحه اطمینان دارید؟"
      confirm-text="تأیید خروج"
      cancel-text="انصراف"
      redirect-to="/"
    >
      <template #trigger>
        <Button variant="default" aria-label="Back" class="fixed left-3 top-3">
          <Icon icon="icon-park-solid:back" width="48" height="48" />
          بازگشت
        </Button>
      </template>
    </ConfirmDialog>

    <div class="form-print-wrapper flex justify-center items-center py-16 print:p-0">
      <div
        class="form-print-sheet w-[210mm] bg-white mx-auto p-[4mm] relative shadow-[0_0_10px_rgba(0,0,0,0.1)] flex flex-col print:m-0 print:shadow-none"
        :class="props.isSubmitted ? 'h-[297mm]' : 'min-h-[297mm]'"
      >
        <div class="border-2 border-black w-full h-full flex flex-col p-6 relative grow">
          <!-- Header Slot -->
          <slot name="header" />

          <!-- Body Content Slot -->
          <slot name="body" />

          <!-- Footer Signature -->
          <footer v-if="props.signature && props.isPrintView" class="w-full flex justify-end my-12">
            <div class="text-center">
              <p class="font-medium mb-2 text-sm">{{ props.signature.title }}</p>
              <p class="font-bold mb-4">{{ props.signature.name }}</p>

              <!-- Signature and seal -->
              <div class="relative">
                <p
                  class="text-neutral-400 text-xs border-t border-dashed border-neutral-300 pt-2 w-40 mx-auto"
                >
                  (محل امضا و مهر)
                </p>

                <img
                  :src="props.signature.imageUrl"
                  alt="digital signature"
                  width="150"
                  class="absolute -top-3 right-1/2 translate-x-1/2 print:grayscale"
                />
              </div>
            </div>
          </footer>

          <!-- Footer Slot (for custom footer if needed) -->
          <slot name="footer" />

          <!-- Action Buttons -->
          <div class="mt-auto flex gap-3 justify-end print-hidden">
            <!-- Submit Button -->
            <template v-if="!props.isSubmitted">
              <Button
                variant="default"
                size="lg"
                class="text-base"
                :disabled="!props.isFormValid || props.isSubmitting"
                @click="emit('submit')"
              >
                <Icon v-if="!props.isSubmitting" icon="mynaui:save-solid" class="size-6" />
                <Icon v-else icon="gg:spinner" class="size-6 animate-spin" />
                {{ props.isSubmitting ? "در حال ثبت..." : "ثبت اطلاعات" }}
              </Button>
            </template>

            <template v-else>
              <!-- Edit Button -->
              <!-- TODO: add this later -->
              <template v-if="false">
                <Button
                  v-if="props.showEditButton"
                  variant="secondary"
                  size="lg"
                  class="text-base border-2"
                  @click="emit('edit')"
                >
                  <Icon icon="mdi:pencil" class="size-6" />
                  ویرایش
                </Button>
              </template>

              <Button
                v-if="props.isPrintView"
                variant="default"
                size="lg"
                class="text-base"
                @click="handlePrint"
              >
                <Icon icon="mdi:printer" class="size-6" />
                چاپ
              </Button>

              <Button
                v-else
                variant="default"
                size="lg"
                class="text-base"
                @click="emit('issuance')"
              >
                <Icon icon="mdi:file-document-check" class="size-6" />
                صدور گواهی
              </Button>
            </template>
          </div>

          <!-- QR Code -->
          <figure v-if="props.qrImageSrc && props.isPrintView" class="absolute bottom-5 start-5">
            <img width="150" :src="props.qrImageSrc" alt="qr code" class="print:grayscale" />
          </figure>

          <!-- Corner Decorations -->
          <div
            class="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-black opacity-30"
          ></div>
          <div
            class="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-black opacity-30"
          ></div>
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

  .form-print-root {
    position: fixed !important;
    inset: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
    overflow: hidden !important;
  }

  .form-print-wrapper {
    position: absolute !important;
    left: 50% !important;
    top: 50% !important;
    transform: translate(-50%, -50%) !important;
    width: 210mm !important;
    height: 297mm !important;
    margin: 0 !important;
    padding: 0 !important;
    max-width: 100vw;
    max-height: 100vh;
  }

  .form-print-sheet {
    width: 100% !important;
    height: 100% !important;
    min-height: 0 !important;
    max-width: 210mm !important;
    max-height: 297mm !important;
    padding: 4mm !important;
  }
}
</style>
