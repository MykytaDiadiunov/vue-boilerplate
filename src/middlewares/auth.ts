import { useUserStore } from '@/stores';
import { storeToRefs } from 'pinia';
import type { RouteLocationNormalized } from 'vue-router';

export const authMiddleware = (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
  const { isAuthorized } = storeToRefs(useUserStore());
  const requiresAuth = to.meta.auth;

  if (isAuthorized.value && to.name === 'auth') {
    return from.fullPath !== to.fullPath ? from.fullPath : '/';
  }

  if (requiresAuth && !isAuthorized.value) {
    if (from.name) return false;

    return { name: 'auth' };
  }

  return true;
};
