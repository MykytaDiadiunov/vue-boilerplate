import { useUserStore } from '@/stores';

export interface LoginForm {
  username: string;
  password: string;
}

export const useLoginForm = () => {
  const { login } = useUserStore();
  const defaultValues: LoginForm = {
    username: '',
    password: ''
  };

  async function submitLoginForm(formValues: LoginForm): Promise<void> {
    await login(formValues);
  }

  return {
    defaultValues,
    submitLoginForm
  };
};
