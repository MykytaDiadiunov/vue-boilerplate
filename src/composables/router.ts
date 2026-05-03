import { useRouter } from 'vue-router';

export const useRouting = () => {
  const router = useRouter();

  function back(): void {
    router.back();
  }

  function toHome(): void {
    router.push({ name: 'home' });
  }

  function toAuth(): void {
    router.push({ name: 'auth' });
  }

  function toProfile(): void {
    router.push({ name: 'profile' });
  }

  return {
    back,
    toHome,
    toAuth,
    toProfile
  };
};
