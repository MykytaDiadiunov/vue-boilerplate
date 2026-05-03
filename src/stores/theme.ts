import { defineStore } from 'pinia';
import { ref } from 'vue';
import { darkTheme, type GlobalTheme } from 'naive-ui';
import { useStorage } from '@vueuse/core';

type ThemeMode = 'light' | 'dark' | 'auto';

export const useThemeStore = defineStore('theme', () => {
  const mode = useStorage<ThemeMode>('user-theme-mode', 'auto');

  const theme = ref<GlobalTheme | null>(null);

  const getSystemTheme = () =>
    window.matchMedia('(prefers-color-scheme: dark)').matches ? darkTheme : null;

  const updateTheme = () => {
    if (mode.value === 'auto') {
      theme.value = getSystemTheme();
    } else {
      theme.value = mode.value === 'dark' ? darkTheme : null;
    }
  };

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const handleSystemChange = () => {
    if (mode.value === 'auto') updateTheme();
  };
  mediaQuery.addEventListener('change', handleSystemChange);

  const setDark = () => {
    mode.value = 'dark';
    updateTheme();
  };
  const setLight = () => {
    mode.value = 'light';
    updateTheme();
  };
  const setAuto = () => {
    mode.value = 'auto';
    updateTheme();
  };

  updateTheme();

  return {
    theme,
    mode,
    setDark,
    setLight,
    setAuto
  };
});
