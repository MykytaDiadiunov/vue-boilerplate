<template>
  <n-card class="h-fit">
    <n-collapse>
      <app-interface-settings />
      <app-account-settings />
    </n-collapse>
  </n-card>
</template>

<script setup lang="ts">
import { NCard, NCollapse } from 'naive-ui';
import AppInterfaceSettings from '@/components/profile/settings/blocks/AppInterfaceSettings.vue';
import AppAccountSettings from '@/components/profile/settings/blocks/AppAccountSettings.vue';
</script>
