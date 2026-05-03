import { useUserStore } from '@/stores';

export interface RegisterForm {
  username: string;
  password: string;
  reenteredPassword: string;
}

export const useRegistrationForm = () => {
  const { register } = useUserStore();

  const defaultValues: RegisterForm = {
    username: '',
    password: '',
    reenteredPassword: ''
  };

  async function submitRegisterForm(formValues: RegisterForm): Promise<void> {
    await register(formValues);
  }

  return {
    defaultValues,
    submitRegisterForm
  };
};
