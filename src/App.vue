<template>
  <n-config-provider :theme="theme">
    <n-global-style />
    <n-message-provider>
      <router-view />
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import { NConfigProvider, NMessageProvider, NGlobalStyle } from 'naive-ui';
import { onBeforeMount } from 'vue';
import { useThemeStore, useUserStore } from '@/stores';
import { storeToRefs } from 'pinia';

const { populateUser } = useUserStore();
const { theme } = storeToRefs(useThemeStore());

onBeforeMount(async () => {
  await populateUser();
});
</script>
