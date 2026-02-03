<template>
  <div class="flex flex-col items-center justify-center min-h-dvh text-center px-4">
    <h1 class="text-9xl font-bold text-muted-foreground">404</h1>
    <h2 class="text-2xl font-semibold mt-4">صفحه مورد نظر پیدا نشد</h2>
    <p class="text-muted-foreground mt-2">
      متاسفانه صفحه‌ای که دنبال آن هستید وجود ندارد یا جابجا شده است.
    </p>
    <Button v-if="isAuthenticated" as-child class="mt-8">
      <router-link to="/">بازگشت به صفحه اصلی</router-link>
    </Button>
  </div>
</template>

<script setup lang="ts">
import { useAuthJwtStore } from "@/stores/account/useAuthJwtStore";
import { Button } from "@/components/ui/button";

const authStore = useAuthJwtStore();
const isAuthenticated = authStore.isAuthenticated;
</script>
