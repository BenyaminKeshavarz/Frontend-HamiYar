<script setup lang="ts">
import 'vue-sonner/style.css'
import { Toaster } from '@/components/ui/sonner'
</script>

<template>
  <div class="relative">
    <main class="pb-16 print:p-0">
      <RouterView />
    </main>

    <footer class="text-center fixed bottom-0 w-full bg-background print:hidden">
      <hr
        class="border-none h-px bg-linear-to-r from-transparent via-brand-primary-700/30 to-transparent"
      />

      <section>
        <p class="max-sm:text-sm py-4 px-4 sm:px-6">
          ساخته شده با
          <span class="inline-block animate-heartbeat">💜</span> توسط
          <a
            href="https://kaic.karaj.iau.ir/"
            target="_blank"
            class="text-brand-primary-700 font-semibold"
            >انجمن علمی هوش مصنوعی</a
          >
        </p>
      </section>
    </footer>

    <Toaster />
  </div>
</template>

<style scoped></style>
