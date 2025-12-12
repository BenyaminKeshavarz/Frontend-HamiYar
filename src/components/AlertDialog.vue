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

function handleBackButton() {
  router.push("/");
}
</script>

<template>
  <AlertDialog>
    <AlertDialogTrigger as-child>
      <Button variant="default" size="icon" aria-label="Back" class="fixed left-3 top-3">
        <Icon icon="icon-park-solid:back" width="48" height="48" />
      </Button>
    </AlertDialogTrigger>

    <AlertDialogContent>
      <AlertDialogHeader class="items-start text-start">
        <AlertDialogTitle>تأیید خروج از صفحه</AlertDialogTitle>
        <AlertDialogDescription class="items-start text-start">
          با خروج از این صفحه، اطلاعات واردشده ذخیره نخواهد شد. آیا از خروج از صفحه اطمینان دارید؟
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>انصراف</AlertDialogCancel>
        <AlertDialogAction @click="handleBackButton">تأیید خروج</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
