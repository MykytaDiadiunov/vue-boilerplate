<template>
  <div
    class="flex flex-col min-h-screen transition-colors duration-300"
    :style="{
      backgroundColor: themeVars.bodyColor,
      color: themeVars.textColor2
    }"
  >
    <AppHeader />

    <main class="flex-1 pt-22 pb-6 px-4 w-full max-w-7xl mx-auto">
      <slot />
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { useThemeVars } from 'naive-ui';
import AppHeader from '@/components/layouts/base-layout/AppHeader.vue';
import AppFooter from '@/components/layouts/base-layout/AppFooter.vue';

const themeVars = useThemeVars();
</script>
