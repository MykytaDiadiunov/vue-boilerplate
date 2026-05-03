<template>
  <n-modal
    v-model:show="showModal"
    preset="card"
    :title="t('profile.theme')"
    content-scrollable
    transform-origin="center"
    :style="{ width: '400px', height: '250px' }"
  >
    <n-radio-group
      v-model:value="themeStore.mode"
      @update-value="handleThemeChange"
      name="theme-group"
      size="large"
    >
      <n-space vertical>
        <n-radio value="light" :label="t('theme.light')" />
        <n-radio value="dark" :label="t('theme.dark')" />
        <n-radio value="auto" :label="t('theme.system')" />
      </n-space>
    </n-radio-group>
  </n-modal>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores';
import { NModal, NRadioGroup, NSpace, NRadio } from 'naive-ui';
import { useI18n } from 'vue-i18n';

const themeStore = useThemeStore();
const { t } = useI18n();

const showModal = defineModel<boolean>('show', { required: true });

const handleThemeChange = (val: 'light' | 'dark' | 'auto') => {
  if (val === 'dark') themeStore.setDark();
  else if (val === 'light') themeStore.setLight();
  else themeStore.setAuto();
};
</script>
