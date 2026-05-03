<template>
  <n-modal
    v-model:show="showModal"
    preset="card"
    :title="t('profile.localisation')"
    content-scrollable
    transform-origin="center"
    :style="{ width: '400px', height: '200px' }"
  >
    <n-radio-group
      v-model:value="currentLocale"
      @update-value="(val) => setLocale(val)"
      name="radiogroup"
      size="large"
    >
      <n-space vertical>
        <n-radio v-for="song in availableLocales" :key="song" :value="song" :label="song" />
      </n-space>
    </n-radio-group>
  </n-modal>
</template>

<script setup lang="ts">
import { useLocaleStore } from '@/stores';
import { NModal, NRadioGroup, NSpace, NRadio } from 'naive-ui';
import { useI18n } from 'vue-i18n';

const { currentLocale, setLocale } = useLocaleStore();
const { availableLocales, t } = useI18n();

const showModal = defineModel<boolean>('show', { required: true });
</script>
