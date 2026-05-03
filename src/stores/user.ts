import type { TokenedUser, User } from '@/temp/types/auth';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useTokenStore } from '@/stores/token';
import type { LoginForm } from '@/composables/forms/auth/login';
import { useRouting, type RegisterForm } from '@/composables';
import { useTempAuthApi } from '@/temp/api/auth';
import { message } from '@/plugins';

export const useUserStore = defineStore('user', () => {
  const { login: loginRequest, register: registerRequest, me } = useTempAuthApi();
  const { toHome, toAuth } = useRouting();

  const tokenStore = useTokenStore();

  const user = ref<User | null>(null);

  const isAuthorized = computed(() => !!tokenStore.token);

  function setUser(newUser: User): void {
    user.value = newUser;
  }

  function removeUserData(): void {
    user.value = null;
    tokenStore.removeToken();

    toAuth();
  }

  async function populateUser(): Promise<void> {
    try {
      const response = await me();
      setUser(response);
    } catch (e: unknown) {
      if (tokenStore.token) {
        message.error(String(e));
      }

      removeUserData();
    }
  }

  async function login(loginBody: LoginForm): Promise<void> {
    const response = await loginRequest(loginBody);
    _setUserResponse(response);

    toHome();
  }

  async function register(registerForm: RegisterForm): Promise<void> {
    const response = await registerRequest(registerForm);
    _setUserResponse(response);

    toHome();
  }

  async function logout(): Promise<void> {
    removeUserData();
  }

  function _setUserResponse(authResponse: TokenedUser): void {
    const { token, ...user } = authResponse;

    tokenStore.setToken(token);
    setUser(user);
  }

  return {
    user,
    isAuthorized,
    login,
    logout,
    register,
    populateUser
  };
});
