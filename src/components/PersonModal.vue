<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { Icon } from "@iconify/vue";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

interface Props {
  isSubmitting?: boolean;
}

const emit = defineEmits<{
  submit: [number];
}>();

const props = withDefaults(defineProps<Props>(), {
  isSubmitting: false,
});

const identifier = defineModel<string | number>({
  default: "",
});

const isOpen = ref(false);

// Clear identifier when dialog closes
watch(isOpen, (newValue) => {
  if (!newValue) identifier.value = "";
});

const isSubmitDisabled = computed(() => {
  if (props.isSubmitting) return true;
  const value = identifier.value?.toString().trim() ?? "";
  return value.length === 0;
});

function onKeyPress(e: KeyboardEvent) {
  if (!/[0-9]/.test(e.key) && e.key !== "Enter") {
    e.preventDefault();
  }
}

function onSubmit(e: Event) {
  e.preventDefault();
  if (isSubmitDisabled.value) return;
  const value = identifier.value?.toString().trim() ?? "";
  emit("submit", Number(value));
}
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogTrigger as-child>
      <Button
        variant="default"
        size="lg"
        class="transition-all duration-300 ease-in-out hover:-translate-y-1 w-full py-12"
      >
        <slot name="trigger-content"></slot>
      </Button>
    </DialogTrigger>

    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader class="items-start">
        <DialogTitle>دریافت اطلاعات</DialogTitle>
        <DialogDescription>کد ملی یا شماره دانشجویی مد نظر را وارد کنید.</DialogDescription>
      </DialogHeader>

      <form id="dialogForm" @submit="onSubmit">
        <FieldGroup>
          <Field>
            <Input
              id="identifier"
              type="text"
              inputmode="numeric"
              pattern="[0-9]*"
              placeholder="کد ملی یا شماره دانشجویی"
              v-model="identifier"
              @keypress="onKeyPress"
            />
          </Field>
        </FieldGroup>
      </form>

      <DialogFooter class="flex-row-reverse">
        <Button
          type="submit"
          form="dialogForm"
          :disabled="isSubmitDisabled"
          :aria-busy="props.isSubmitting"
        >
          {{ props.isSubmitting ? "درحال بررسی" : "بررسی" }}
          <Icon v-if="props.isSubmitting" icon="gg:spinner" class="size-5 animate-spin" />
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
