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
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/vue";
import router from "@/router";

interface Props {
  confirmText?: string;
  cancelText?: string;
  defaultBackButton?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  confirmText: "تأیید خروج",
  cancelText: "انصراف",
  defaultBackButton: true,
});

const emit = defineEmits<{
  confirm: [];
}>();

function handleConfirm() {
  emit("confirm");
  if (props.defaultBackButton) {
    router.push("/");
  }
}
</script>

<template>
  <AlertDialog>
    <AlertDialogTrigger as-child>
      <slot name="trigger">
        <Button variant="default" aria-label="Back" class="fixed left-3 top-3">
          <Icon icon="icon-park-solid:back" width="48" height="48" />
          بازگشت
        </Button>
      </slot>
    </AlertDialogTrigger>

    <AlertDialogContent>
      <AlertDialogHeader class="items-start text-start">
        <AlertDialogTitle>
          <slot name="title">تأیید خروج از صفحه</slot>
        </AlertDialogTitle>
        <AlertDialogDescription class="items-start text-start">
          <slot name="description">
            با خروج از این صفحه، اطلاعات واردشده ذخیره نخواهد شد. آیا از خروج از صفحه اطمینان دارید؟
          </slot>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>{{ cancelText }}</AlertDialogCancel>
        <AlertDialogAction @click="handleConfirm">{{ confirmText }}</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
