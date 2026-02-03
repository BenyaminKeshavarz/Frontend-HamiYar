<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import "vue-sonner/style.css";
import { Toaster } from "@/components/ui/sonner";
import FooterSection from "@/components/FooterSection.vue";

const route = useRoute();
const isLoginPage = computed(() => route.name === "login");

// Detect public (QR) mode via route meta
const isPublicView = computed(() => route.meta.mode === "public");
</script>

<template>
  <div class="relative flex flex-col min-h-screen">
    <main class="flex-1 print:p-0">
      <RouterView />
    </main>

    <FooterSection v-if="!isLoginPage && !isPublicView" class="mt-20" />

    <Toaster />
  </div>
</template>

<style scoped></style>
