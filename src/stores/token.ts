import { useCookies } from '@vueuse/integrations/useCookies';
import { defineStore } from 'pinia';
import { ref } from 'vue';

const TOKEN_COOKIE_KEY = 'auth-token';
const TOKEN_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

export const useTokenStore = defineStore('token', () => {
  const cookies = useCookies([TOKEN_COOKIE_KEY]);

  const token = ref<string | null>(cookies.get(TOKEN_COOKIE_KEY) || null);

  const setToken = (newToken: string) => {
    token.value = newToken;

    cookies.set(TOKEN_COOKIE_KEY, newToken, {
      maxAge: TOKEN_COOKIE_MAX_AGE,
      secure: true,
      sameSite: 'strict',
      path: '/'
    });
  };

  const removeToken = () => {
    token.value = null;
    cookies.remove(TOKEN_COOKIE_KEY);
  };

  return {
    token,
    setToken,
    removeToken
  };
});
