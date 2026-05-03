<template>
  <BaseLayout>
    <div class="flex gap-4">
      <app-user-details-card />
      <app-settings-card />
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import AppSettingsCard from '@/components/profile/settings/AppSettingsCard.vue';
import AppUserDetailsCard from '@/components/profile/details/AppUserDetailsCard.vue';
</script>
