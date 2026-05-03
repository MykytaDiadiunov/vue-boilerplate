<template>
  <n-form ref="formRef" :label-width="80" :model="formValues" :rules="loginFormRules">
    <n-form-item :label="t('auth.inputs.username')" path="username">
      <n-input
        v-model:value="formValues.username"
        :placeholder="t('auth.inputs.username').toLowerCase()"
      />
    </n-form-item>
    <n-form-item :label="t('auth.inputs.password')" path="password">
      <n-input
        v-model:value="formValues.password"
        type="password"
        show-password-on="click"
        :placeholder="t('auth.inputs.password').toLowerCase()"
      />
    </n-form-item>
    <div class="flex justify-end">
      <n-button size="large" type="primary" :loading="isLoginPending" @click="submitFormWrapper">
        {{ t('auth.labels.login') }}
      </n-button>
    </div>
  </n-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { NForm, NFormItem, NInput, NButton, type FormInst } from 'naive-ui';
import { useLoginForm, type LoginForm } from '@/composables/forms/auth/login';
import { useFormRules } from '@/composables';
import { message } from '@/plugins';
import { useMutation } from '@tanstack/vue-query';

const { t } = useI18n();

const formRef = ref<FormInst | null>(null);

const { defaultValues, submitLoginForm } = useLoginForm();

const formValues = ref<LoginForm>({ ...defaultValues });
const { loginFormRules } = useFormRules(formValues);

const { mutateAsync: loginMutate, isPending: isLoginPending } = useMutation({
  mutationFn: (formValues: LoginForm) => submitLoginForm(formValues),
  onError: (e: unknown) => message.error(String(e)),
  onSuccess: () => message.success(t('validation.success'))
});

async function submitFormWrapper(): Promise<void> {
  if (formRef.value) {
    try {
      await formRef.value.validate();

      await loginMutate(formValues.value);
    } catch {
      message.error(t('validation.form_incorrectly'));
    }
  }
}
</script>
