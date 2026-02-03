<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { computed } from "vue";
import { cn } from "@/lib/utils";

const props = defineProps<{
  class?: HTMLAttributes["class"];
  required?: boolean;
  highlight?: boolean;
  numeric?: boolean;
}>();

const model = defineModel<string | number>({
  default: '',
})

const isEmpty = computed(() => {
  const value = model.value;
  return value === null || value === undefined || String(value).trim() === "";
});

const inputClasses = computed(() =>
  cn(
    "file:text-foreground placeholder:text-muted-foreground placeholder:opacity-60 selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-70 md:text-sm",
    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
    props.required && props.highlight && isEmpty.value && "border-brand-primary-500",
    props.class,
  )
);

function handleBeforeInput(e: InputEvent) {
  if (!props.numeric) return

  if (e.inputType === "insertFromPaste") {
    const pasted = e.data ?? ""
    if (!/^\d+$/.test(pasted)) {
      e.preventDefault()
    }
    return
  }

  if (e.data && !/^\d$/.test(e.data)) {
    e.preventDefault()
  }
}

</script>

<template>
  <input v-model="model" @beforeinput="handleBeforeInput" data-slot="input" :class="inputClasses"
    :inputmode="props.numeric ? 'numeric' : undefined" :required="props.required"/>
</template>
