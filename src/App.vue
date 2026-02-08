<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import "vue-sonner/style.css";
import { Toaster } from "@/components/ui/sonner";
import FooterSection from "@/components/FooterSection.vue";
import GlobalLoadingOverlay from "@/components/GlobalLoadingOverlay.vue";

const route = useRoute();
const isBlankLayout = computed(() => route.meta.layout === "blank");
</script>

<template>
  <div class="relative flex flex-col min-h-screen">
    <main class="flex-1 print:p-0">
      <RouterView />
    </main>

    <FooterSection v-if="!isBlankLayout" class="mt-12 sm:mt-16 md:mt-20" />

    <GlobalLoadingOverlay />
    <Toaster />
  </div>
</template>

<style scoped></style>
