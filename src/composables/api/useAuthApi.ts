import { useRouter } from "vue-router";
import $api from "@/utils/api"; // Import the custom axios instance
import { useApiConfig } from "@/composables/api/useApiConfig";
import { useAuthJwtStore } from "@/stores/account/useAuthJwtStore"; // Correct store name
// import { useUserRoleStore } from "@/stores/account/useUserRoleStore";

import type { LoginResponse, AuthRequestModal } from "@/types/account/auth";
// import type { UserRole } from "@/types/account/role";

export const useAuthApi = () => {
  const { apiEndpoints } = useApiConfig();
  const router = useRouter();
  const authStore = useAuthJwtStore();
  // const userRoleStore = useUserRoleStore();

  const authEndpoints = apiEndpoints.account.auth;

  /**
   * Handle successful login by setting tokens and user data
   * @param loginResponse - The login response model
   */
  function handleSuccessfulLogin(loginResponse: LoginResponse): void {
    authStore.setTokens(loginResponse.access, loginResponse.refresh);
    // userRoleStore.setUserRole(loginResponse.role as UserRole);
  }

  /**
   * Login user
   * @param loginRequestModel - The login request model
   */
  async function loginAsync(loginRequestModel: AuthRequestModal): Promise<void> {
    const url = authEndpoints.login;

    // Using generic type for strict type safety
    const response = await $api.post<LoginResponse>(url, loginRequestModel);

    // In axios, data is directly accessible (no .value needed)
    const loginResponse = response.data;

    if (!loginResponse) return;

    // Check for Admin access before logging in
    // const role = loginResponse.role as UserRole;
    // if (!userRoleStore.checkAdminAccess(role)) {
    //   // Create a custom error compatible with your axios interceptor structure
    // }

    handleSuccessfulLogin(loginResponse);
  }

  /**
   * Logout user
   * @param shouldNavigate - flag to check navigation into the login page
   */
  async function logoutAsync(shouldNavigate: boolean = true): Promise<void> {
    // Ensure the endpoint exists in your config
    const url = authEndpoints.logout;

    try {
      console.log(`logout - complete this later: ${url}`);
      // await $api.delete(url);
    } catch (error) {
      console.error("Logout API call failed:", error);
    } finally {
      // Always clear local state, even if the API call fails
      authStore.clearTokens();
      // userRoleStore.clearUserRole();

      if (shouldNavigate) {
        router.push("/login");
      }
    }
  }

  return {
    loginAsync,
    logoutAsync,
  };
};
