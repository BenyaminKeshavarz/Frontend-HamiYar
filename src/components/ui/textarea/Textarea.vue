<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { computed } from "vue";
import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"];
    required?: boolean;
    highlight?: boolean;
    rows?: number;
  }>(),
  {
    rows: undefined,
  },
);

const model = defineModel<string | number>({
  default: '',
})

const isEmpty = computed(() => {
  const value = model.value;
  return value === null || value === undefined || String(value).trim() === "";
});

const textareaClasses = computed(() =>
  cn(
    'border-input placeholder:text-muted-foreground placeholder:opacity-60 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
    !props.rows && 'field-sizing-content min-h-16',
    props.required && props.highlight && isEmpty.value && "border-brand-primary-500",
    props.class,
  )
);
</script>

<template>
  <textarea v-model="model" data-slot="textarea" :rows="props.rows" :class="textareaClasses" />
</template>
