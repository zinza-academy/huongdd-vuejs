<template>
  <div class="container">
    <form action="#" @submit.prevent="onSubmit">
      <div class="content">
        <div class="flex justify-center">
          <img src="../../assets/logo.png" alt="vue-logo" />
        </div>
        <p class="h1">Forgot password</p>
        <p class="mt-2">Enter your email to receive link to reset your password</p>
        <div class="form-control">
          <input
            class="form-input-text shadow"
            type="text"
            name="email"
            id=""
            v-model="email"
            v-bind="emailAttrs"
            placeholder="Email" />
          <div class="form-error">{{ errors.email }}</div>
        </div>
        <div class="form-control">
          <a-typography-text type="success">{{ response.value.status }}</a-typography-text>
        </div>
        <div class="form-control">
          <button :disabled="!meta.valid || isSubmitting" class="btn" @click.prevent="onSubmit">
            {{ isSubmitting ? 'Sending email...' : 'Reset password' }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { resetPassword } from '@/services/auth.service';

const response = reactive({
  value: {}
});

const { defineField, errors, meta, handleSubmit, isSubmitting } = useForm({
  validationSchema: yup.object({
    email: yup.string().email('This email is not valid').required('Email is required')
  })
});
const onSubmit = handleSubmit(async (values) => {
  await resetPassword(values.email).then((data) => {
    response.value = data.data;
    console.log(response.value);
  });
});
const [email, emailAttrs] = defineField('email');
</script>
