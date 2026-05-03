<template>
  <n-card class="max-w-130 h-fit" content-class="flex items-center justify-center flex-col gap-4">
    <n-image height="120" width="120" class="rounded-full" :src="USER_NO_AVATAR_IMAGE" />
    <div class="text-2xl">{{ user?.first_name }} {{ user?.last_name }}</div>
  </n-card>
</template>

<script setup lang="ts">
import { NCard, NImage } from 'naive-ui';
import { storeToRefs } from 'pinia';
import { USER_NO_AVATAR_IMAGE } from '@/constants';
import { useUserStore } from '@/stores';

const { user } = storeToRefs(useUserStore());
</script>
