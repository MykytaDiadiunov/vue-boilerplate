<template>
  <n-collapse-item name="1">
    <template #header>
      <div class="flex items-center gap-2 text-xl">
        <n-icon>
          <adjustments />
        </n-icon>
        <span>
          {{ t('profile.interface') }}
        </span>
      </div>
    </template>
    <n-menu :options="interfaceMenuOptions" @update-value="handleMenuOptionSelect" />
  </n-collapse-item>
  <app-lang-change-modal v-model:show="isLangChangeModalOpen" />
  <app-theme-change-modal v-model:show="isThemeChangeModalOpen" />
</template>

<script setup lang="ts">
import { NCollapseItem, NIcon, NMenu, type MenuOption } from 'naive-ui';
import { useI18n } from 'vue-i18n';
import { renderIcon } from '@/utils';
import { message } from '@/plugins';
import { Adjustments, Palette, Language } from '@vicons/tabler';
import AppLangChangeModal from '@/components/profile/settings/modals/AppLangChangeModal.vue';
import AppThemeChangeModal from '@/components/profile/settings/modals/AppThemeChangeModal.vue';
import { ref } from 'vue';

const { t } = useI18n();

const isLangChangeModalOpen = ref<boolean>(false);
const isThemeChangeModalOpen = ref<boolean>(false);

const interfaceMenuOptionsFunctionsMap: Record<string, () => void> = {
  change_lang: () => (isLangChangeModalOpen.value = true),
  change_theme: () => (isThemeChangeModalOpen.value = true)
};

const interfaceMenuOptions: MenuOption[] = [
  {
    label: t('profile.change_lang'),
    key: 'change_lang',
    icon: renderIcon(Language)
  },
  {
    label: t('profile.change_theme'),
    key: 'change_theme',
    icon: renderIcon(Palette)
  }
];

function handleMenuOptionSelect(key: string): void {
  const action = interfaceMenuOptionsFunctionsMap[key];

  if (action) {
    action();
  } else {
    message.error(`Action for key "${key}" not found`);
  }
}
</script>
