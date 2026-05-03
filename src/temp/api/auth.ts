import type { RegisterForm } from '@/composables';
import type { LoginForm } from '@/composables/forms/auth/login';
import { useTokenStore } from '@/stores';
import type { TokenedUser, User } from '@/temp/types/auth';
import { delay } from '@/temp/utils';
import { storeToRefs } from 'pinia';

const TEMP_TOKEN = '----TEMP_TOKEN----';
const TEMP_PASSWORD = 'password';

const TEMP_BASE_USER = {
  username: 'user',
  email: 'user@example.com',
  first_name: 'Userfirstname',
  last_name: 'Userfastname'
};

const TEMP_USER = {
  ...TEMP_BASE_USER,
  token: TEMP_TOKEN
};

export const useTempAuthApi = () => {
  const { token } = storeToRefs(useTokenStore());

  async function login(loginBody: LoginForm): Promise<TokenedUser> {
    console.log('Login input data: ', loginBody);

    await delay(300);

    if (loginBody.username === TEMP_BASE_USER.username && loginBody.password === TEMP_PASSWORD) {
      return TEMP_USER;
    }

    throw new Error('validation.wrong_password_or_username');
  }

  async function register(registerBody: RegisterForm): Promise<TokenedUser> {
    console.log('Register input data: ', registerBody);

    await delay(300);

    return TEMP_USER;
  }

  async function me(): Promise<User> {
    await delay(300);

    if (!token.value) {
      console.log('Me Request Success: ', false);
      throw new Error('No token');
    }

    if (token.value !== TEMP_TOKEN) {
      console.log('Me Request Success: ', false);
      throw new Error('Token Expired');
    }

    console.log('Me Request Success: ', true);
    return TEMP_BASE_USER;
  }

  return {
    login,
    register,
    me
  };
};
