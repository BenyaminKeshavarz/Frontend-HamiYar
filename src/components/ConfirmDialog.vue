<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import router from "@/router";

interface Props {
  title: string;
  description: string;
  confirmText: string;
  cancelText: string;
  /** Route path to redirect on confirm. Pass null to handle only via @confirm */
  redirectTo?: string | null;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  confirm: [];
}>();

function handleConfirm() {
  emit("confirm");
  if (props.redirectTo) {
    router.push(props.redirectTo);
  }
}
</script>

<template>
  <AlertDialog>
    <AlertDialogTrigger as-child>
      <slot name="trigger"></slot>
    </AlertDialogTrigger>

    <AlertDialogContent>
      <AlertDialogHeader class="items-start text-start">
        <AlertDialogTitle>
          <slot name="title">{{ props.title }}</slot>
        </AlertDialogTitle>
        <AlertDialogDescription class="items-start text-start">
          <slot name="description">{{ props.description }}</slot>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>{{ props.cancelText }}</AlertDialogCancel>
        <AlertDialogAction @click="handleConfirm">{{ props.confirmText }}</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
