<template>
  <header
    class="fixed left-0 right-0 z-50 h-15 backdrop-blur-xl border-b transition-all duration-300 shadow-lg"
    :style="{
      backgroundColor: `${themeVars.bodyColor}CC`,
      borderColor: themeVars.borderColor
    }"
  >
    <div class="px-6 max-w-7xl mx-auto h-full">
      <nav class="h-full flex justify-between items-center">
        <div
          class="text-xl font-bold tracking-tight cursor-pointer transition-colors"
          :style="{ color: themeVars.textColor1 }"
          @click="routing.toHome()"
          @mouseenter="(e) => ((e.target as HTMLElement).style.color = themeVars.primaryColor)"
          @mouseleave="(e) => ((e.target as HTMLElement).style.color = themeVars.textColor1)"
        >
          LOGO<span :style="{ color: themeVars.primaryColor }">.</span>
        </div>

        <ul class="flex items-center gap-2">
          <li v-for="item in actionList" :key="item.title">
            <n-button quaternary round @click="item.routing()">
              {{ item.title }}
            </n-button>
          </li>
        </ul>

        <div v-if="!isAuthorized">
          <n-button type="primary" @click="routing.toAuth">
            {{ t('header.auth') }}
          </n-button>
        </div>

        <div v-else>
          <n-button circle @click="routing.toProfile">
            <template #icon>
              <n-icon><User /></n-icon>
            </template>
          </n-button>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { User } from '@vicons/tabler';
import { NButton, NIcon, useThemeVars } from 'naive-ui';
import { useI18n } from 'vue-i18n';
import { useRouting } from '@/composables';
import type { HeaderActionItem } from '@/types';
import { useUserStore } from '@/stores';
import { storeToRefs } from 'pinia';

const { t } = useI18n();
const { isAuthorized } = storeToRefs(useUserStore());
const routing = useRouting();

const themeVars = useThemeVars();

const actionList: HeaderActionItem[] = [
  { title: t('header.home'), routing: () => routing.toHome() }
];
</script>
