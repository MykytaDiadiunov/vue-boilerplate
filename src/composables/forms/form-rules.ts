import type { FormItemRule, FormRules } from 'naive-ui';
import { computed, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';

export const useFormRules = (model: Ref<{ [key: string]: unknown }>) => {
  const { t } = useI18n();

  const baseAuthFieldRules: FormRules = {
    username: {
      required: true,
      message: t('validation.required'),
      trigger: 'blur'
    },
    password: {
      required: true,
      message: t('validation.required'),
      trigger: 'blur'
    }
  };

  const registerFormRules = computed<FormRules>(() => {
    return {
      ...baseAuthFieldRules,
      reenteredPassword: [
        {
          required: true,
          message: t('validation.required'),
          trigger: ['input', 'blur']
        },
        {
          validator: _validatePasswordSame,
          message: t('validation.passwords_mismatch'),
          trigger: ['blur', 'password-input']
        }
      ]
    };
  });

  const loginFormRules = computed<FormRules>(() => {
    return {
      ...baseAuthFieldRules
    };
  });

  function _validatePasswordSame(_rule: FormItemRule, value: string): boolean {
    return value === model.value.password;
  }

  return {
    registerFormRules,
    loginFormRules
  };
};
