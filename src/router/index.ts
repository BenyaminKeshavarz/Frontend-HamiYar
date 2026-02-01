import { createRouter, createWebHistory } from "vue-router";
import { siteConfig } from "@/config";
import { useAuthJwtStore } from "@/stores/account/useAuthJwtStore";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";

const appName = siteConfig.app.name;

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, _from, savedPosition) {
    // If there's a saved position (back/forward navigation), use it
    if (savedPosition) return savedPosition;

    // If there's a hash (anchor link), scroll to that element
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    }

    // Otherwise, scroll to top
    return { top: 0 };
  },
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
      meta: { title: `صفحه اصلی | ${appName}`, requiresAuth: true },
    },
    {
      path: "/login",
      name: "Login",
      component: LoginView,
      meta: { title: `ورود | ${appName}`, guestOnly: true },
    },
    {
      path: "/education",
      name: "Education",
      component: () => import("@/views/EducationFormView.vue"),
      meta: { title: `گواهی اشتغال به تحصیل | ${appName}`, requiresAuth: true },
    },
    {
      path: "/internship",
      name: "Internship",
      component: () => import("@/views/InternshipFormView.vue"),
      meta: { title: `نامه کارآموزی | ${appName}`, requiresAuth: true },
    },
  ],
});

// Global Navigation Guard
router.beforeEach((to, _, next) => {
  const authStore = useAuthJwtStore();
  const isAuthenticated = authStore.isAuthenticated;

  // Set document title
  if (to.meta.title) {
    document.title = to.meta.title as string;
  }

  // Check access permissions
  if (to.meta.requiresAuth && !isAuthenticated) {
    // Redirect to login and save the intended path
    next({ name: "Login", query: { redirect: to.fullPath } });
  } else if (to.meta.guestOnly && isAuthenticated) {
    // Prevent authenticated users from accessing guest pages
    next({ name: "Home" });
  } else {
    next();
  }
});

export default router;
