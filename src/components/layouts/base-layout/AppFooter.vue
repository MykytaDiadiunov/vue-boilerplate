<template>
  <footer
    class="w-full p-4 mt-auto border-t transition-colors duration-300"
    :style="{
      backgroundColor: themeVars.cardColor,
      borderColor: themeVars.borderColor
    }"
  >
    <div class="max-w-7xl mx-auto p-6 flex flex-col md:flex-row justify-between items-center gap-4">
      <div class="flex flex-col">
        <span
          class="font-medium text-lg transition-colors"
          :style="{ color: themeVars.textColor1 }"
        >
          Boilerplate
        </span>
        <span class="text-sm transition-colors" :style="{ color: themeVars.textColor3 }">
          © {{ new Date().getFullYear() }} All rights reserved.
        </span>
      </div>

      <div class="flex gap-6 text-sm">
        <a
          v-for="item in ['privacy', 'terms', 'contact']"
          :key="item"
          href="#"
          class="transition-colors duration-300"
          :style="{
            color: themeVars.textColor2,
            '--hover-color': themeVars.primaryColor
          }"
          onmouseover="this.style.color = this.style.getPropertyValue('--hover-color')"
          onmouseout="this.style.color = this.getAttribute('data-orig-color')"
          @mouseenter="(e) => ((e.target as HTMLElement).style.color = themeVars.primaryColor)"
          @mouseleave="(e) => ((e.target as HTMLElement).style.color = themeVars.textColor2)"
        >
          {{ t(`footer.${item}`) }}
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useThemeVars } from 'naive-ui';

const { t } = useI18n();
const themeVars = useThemeVars();
</script>
