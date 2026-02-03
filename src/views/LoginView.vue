<script setup lang="ts">
import LoginForm from "@/components/LoginForm.vue";
import { siteConfig } from "@/config";
</script>

<template>
  <div class="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
    <div class="w-full max-w-sm border-2 p-6 py-8 rounded-2xl ">
      <div class="flex flex-col items-center gap-2 text-center mb-6">
        <!-- Logo -->
        <figure class="mb-2">
          <img width="80" src="@/assets/images/logo.svg" alt="لوگو حامی یار" />
        </figure>

        <h1 class="text-xl font-bold">ورود به حساب کاربری</h1>
        <p class="text-muted-foreground text-sm">
          به سامانه یکپارچه خدماتی حامی یار
          <span class="font-medium">{{ siteConfig.university.name }}</span> <span class="whitespace-nowrap">({{
            siteConfig.university.city }})</span>
          خوش آمدید.
        </p>
      </div>

      <LoginForm />
    </div>
  </div>
</template>
