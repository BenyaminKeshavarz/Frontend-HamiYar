<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/vue";
import { useRoute } from "vue-router";
import { siteConfig } from "@/config";

interface NavigationItem {
  label: string;
  to: string;
}

const route = useRoute();

const navigationItems: NavigationItem[] = [
  { label: "صفحه اصلی", to: "/" },
  { label: "خدمات", to: "/#services" },
  { label: "پشتیبانی", to: "/#support" },
];

function handleHashClick(to: string, event: Event) {
  if (!to.includes("#")) return;

  const [path, hash] = to.split("#");

  if (route.path === path && hash) {
    event.preventDefault();
    document.querySelector(`#${hash}`)?.scrollIntoView({ behavior: "smooth" });
  }
}
</script>

<template>
  <header
    class="relative px-6 sm:px-10 rounded-b-[4rem] border-b-3 border-brand-primary-200 overflow-hidden bg-brand-primary-100/75"
    style="
      background: linear-gradient(
        135deg,
        rgba(240, 235, 249, 0.95) 0%,
        rgba(226, 217, 244, 0.9) 50%,
        rgba(197, 179, 233, 0.85) 100%
      );
    ">
    <!-- Modern Persian-Inspired Geometric Pattern -->
    <svg class="absolute inset-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="modern-persian-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          <!-- Minimal geometric grid inspired by Persian tiles -->
          <!-- Subtle grid lines -->
          <line x1="0" y1="40" x2="80" y2="40" stroke="#5321b4" stroke-width="0.5" stroke-opacity="0.5" />
          <line x1="40" y1="0" x2="40" y2="80" stroke="#5321b4" stroke-width="0.5" stroke-opacity="0.5" />

          <!-- Central minimal hexagon (tech-inspired, Persian-rooted) -->
          <g transform="translate(40, 40)">
            <polygon points="0,-12 10.4,-6 10.4,6 0,12 -10.4,6 -10.4,-6" fill="none" stroke="#5321b4" stroke-width="1"
              stroke-opacity="0.5" />
            <!-- Inner subtle shape -->
            <polygon points="0,-6 5.2,-3 5.2,3 0,6 -5.2,3 -5.2,-3" fill="none" stroke="#6a32d9" stroke-width="0.6"
              stroke-opacity="0.5" />
            <!-- Center point -->
            <circle cx="0" cy="0" r="1.5" fill="#5321b4" fill-opacity="0.5" />
          </g>

          <!-- Corner subtle geometric accents -->
          <g transform="translate(20, 20)">
            <circle cx="0" cy="0" r="2" fill="#5321b4" fill-opacity="0.5" />
            <polygon points="0,-3 2.6,-1.5 2.6,1.5 0,3 -2.6,1.5 -2.6,-1.5" fill="none" stroke="#6a32d9"
              stroke-width="0.4" stroke-opacity="0.5" />
          </g>

          <g transform="translate(60, 20)">
            <circle cx="0" cy="0" r="2" fill="#5321b4" fill-opacity="0.5" />
            <polygon points="0,-3 2.6,-1.5 2.6,1.5 0,3 -2.6,1.5 -2.6,-1.5" fill="none" stroke="#6a32d9"
              stroke-width="0.4" stroke-opacity="0.5" />
          </g>

          <g transform="translate(20, 60)">
            <circle cx="0" cy="0" r="2" fill="#5321b4" fill-opacity="0.5" />
            <polygon points="0,-3 2.6,-1.5 2.6,1.5 0,3 -2.6,1.5 -2.6,-1.5" fill="none" stroke="#6a32d9"
              stroke-width="0.4" stroke-opacity="0.5" />
          </g>

          <g transform="translate(60, 60)">
            <circle cx="0" cy="0" r="2" fill="#5321b4" fill-opacity="0.5" />
            <polygon points="0,-3 2.6,-1.5 2.6,1.5 0,3 -2.6,1.5 -2.6,-1.5" fill="none" stroke="#6a32d9"
              stroke-width="0.4" stroke-opacity="0.5" />
          </g>

          <!-- Subtle diagonal accents (minimal Persian influence) -->
          <line x1="0" y1="0" x2="40" y2="40" stroke="#5321b4" stroke-width="0.3" stroke-opacity="0.08" />
          <line x1="80" y1="0" x2="40" y2="40" stroke="#5321b4" stroke-width="0.3" stroke-opacity="0.08" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#modern-persian-pattern)" />
    </svg>

    <!-- Gradient Blob Decorations -->
    <div class="absolute top-0 right-0 w-100 h-100 rounded-full opacity-40 blur-3xl pointer-events-none" style="
        background: radial-gradient(
          circle,
          rgba(106, 50, 217, 0.6) 0%,
          rgba(83, 33, 180, 0.4) 40%,
          rgba(83, 33, 180, 0.2) 60%,
          transparent 80%
        );
        transform: translate(30%, -30%);
      "></div>
    <div class="absolute bottom-0 left-0 w-150 h-150 rounded-full opacity-35 blur-3xl pointer-events-none" style="
        background: radial-gradient(
          circle,
          rgba(136, 91, 225, 0.5) 0%,
          rgba(106, 50, 217, 0.3) 40%,
          rgba(106, 50, 217, 0.15) 60%,
          transparent 80%
        );
        transform: translate(-25%, 25%);
      "></div>

    <!-- Content Container with relative positioning -->
    <div class="relative z-10">
      <nav class="flex-row-between py-3 border-b border-primary/30">
        <figure class="flex justify-start flex-1">
          <img width="65" src="@/assets/images/logo.svg" alt="logo" />
        </figure>

        <ul class="flex-center justify-between gap-x-8 w-full max-w-xs">
          <li v-for="item in navigationItems" :key="item.label"
            class="font-medium hover:text-primary transition-colors duration-300">
            <RouterLink :to="item.to" @click="handleHashClick(item.to, $event)">
              {{ item.label }}
            </RouterLink>
          </li>
        </ul>

        <div class="flex flex-1 justify-end">
          <Button variant="default" size="lg" aria-label="Logout">
            خروج از حساب
            <Icon icon="solar:logout-3-line-duotone" class="size-6" />
          </Button>
        </div>
      </nav>

      <section class="flex-col-center py-20">
        <section class="text-center">
          <section class="w-fit mx-auto mb-10">
            <h1 class="text-5xl font-bold text-brand-primary-900">{{ siteConfig.app.name }}</h1>
          </section>
          <p class="text-brand-primary-800 max-w-2xl text-lg">
            به سامانه یکپارچه خدماتی حامی یار {{ siteConfig.university.name }}
            <span class="whitespace-nowrap font-medium">({{ siteConfig.university.city }})</span> خوش
            آمدید. از طریق این سامانه میتوانید به خدمات اداری حامی دسترسی داشته باشید.
          </p>
        </section>
      </section>
    </div>
  </header>
</template>
