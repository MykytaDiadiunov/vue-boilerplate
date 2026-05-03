import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import { i18n } from '@/plugins';

export type Lang = 'en';

export const useLocaleStore = defineStore('locale', () => {
  const currentLocale = useStorage<Lang>('app_locale', 'en');

  const setLocale = (lang: Lang) => {
    currentLocale.value = lang;
    i18n.global.locale.value = lang;
  };

  i18n.global.locale.value = currentLocale.value;

  return { currentLocale, setLocale };
});
