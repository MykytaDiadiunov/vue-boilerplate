<template>
  <n-form ref="formRef" :label-width="80" :model="formValues" :rules="registerFormRules">
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
    <n-form-item :label="t('auth.inputs.reentered_password')" path="reenteredPassword">
      <n-input
        v-model:value="formValues.reenteredPassword"
        type="password"
        show-password-on="click"
        :disabled="!formValues.password"
        :placeholder="t('auth.inputs.reentered_password').toLowerCase()"
      />
    </n-form-item>
    <div class="flex justify-end">
      <n-button size="large" type="primary" :loading="isRegisterPending" @click="submitFormWrapper">
        {{ t('auth.labels.register') }}
      </n-button>
    </div>
  </n-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { NForm, NFormItem, NInput, NButton, type FormInst } from 'naive-ui';
import { useRegistrationForm, useFormRules, type RegisterForm } from '@/composables';
import { message } from '@/plugins';
import { useMutation } from '@tanstack/vue-query';

const { t } = useI18n();
const { defaultValues, submitRegisterForm } = useRegistrationForm();

const formValues = ref<RegisterForm>({ ...defaultValues });
const { registerFormRules } = useFormRules(formValues);

const formRef = ref<FormInst | null>(null);

const { mutateAsync: registerMutate, isPending: isRegisterPending } = useMutation({
  mutationFn: (formValues: RegisterForm) => submitRegisterForm(formValues),
  onError: (e: unknown) => message.error(String(e)),
  onSuccess: () => message.success(t('validation.success'))
});

async function submitFormWrapper(): Promise<void> {
  if (formRef.value) {
    try {
      await formRef.value.validate();

      await registerMutate(formValues.value);
    } catch {
      message.error(t('validation.form_incorrectly'));
    }
  }
}
</script>
