<template>
  <n-collapse-item :title="t('profile.account')" name="account">
    <template #header>
      <div class="flex items-center gap-2 text-xl">
        <n-icon>
          <User />
        </n-icon>
        <span>
          {{ t('profile.account') }}
        </span>
      </div>
    </template>
    <n-menu :options="menuOptions" @update-value="handleMenuOptionSelect" />
  </n-collapse-item>
</template>

<script setup lang="ts">
import { NCollapseItem, NIcon, NMenu, type MenuOption } from 'naive-ui';
import { User } from '@vicons/tabler';
import { useI18n } from 'vue-i18n';
import { message } from '@/plugins';
import { renderIcon } from '@/utils';
import { Logout } from '@vicons/tabler';
import { useUserStore } from '@/stores';

const { t } = useI18n();
const { logout } = useUserStore();

const menuOptionsFunctionsMap: Record<string, () => Promise<void> | void> = {
  logout: () => logout()
};

const menuOptions: MenuOption[] = [
  {
    label: t('auth.labels.logout'),
    key: 'logout',
    icon: renderIcon(Logout)
  }
];

async function handleMenuOptionSelect(key: string): Promise<void> {
  const action = menuOptionsFunctionsMap[key];

  if (action) {
    await action();
  } else {
    message.error(`Action for key "${key}" not found`);
  }
}
</script>
