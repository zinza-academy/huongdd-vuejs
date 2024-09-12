<template>
  <div class="container">
    <form action="#" @submit.prevent="onSubmit">
      <div class="content">
        <div class="flex justify-center">
          <img src="../../assets/logo.png" alt="vue-logo" />
        </div>
        <p class="h1">Login</p>
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
          <input
            class="form-input-text shadow"
            type="password"
            name="password"
            v-model="password"
            v-bind="passwordAttrs"
            placeholder="Password" />
          <div class="form-error">{{ errors.password }}</div>
        </div>
        <div class="form-control">
          <router-link :to="{ name: 'forgotpassword' }">Forgot your password?</router-link>
        </div>
        <div class="form-control">
          <button :disabled="isSubmitting || !meta.valid" class="btn btn-full">
            {{ isSubmitting ? 'Logging in...' : 'Login' }}
          </button>
          <div class="form-error">{{ error }}</div>
        </div>
        <div class="form-control">
          <p class="text-decoration-line">
            <span class="text-decoration-line-content">Or</span>
          </p>
        </div>
        <div class="flex horizontal">
          <a class="third-party" href="#"> <i class="fa-brands fa-google"></i>Login with Google </a>
          <a class="third-party" href="#">
            <i class="fa-brands fa-facebook"></i>Login with Facebook
          </a>
          <a class="third-party" href="#"> <i class="fa-brands fa-apple"></i>Login with Apple </a>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '@/services/auth.service';

const router = useRouter();
const error = ref('');

const token = localStorage.getItem('token');
if (token) {
  router.push('/profile');
}

const { meta, errors, defineField, isSubmitting, handleSubmit } = useForm({
  validationSchema: yup.object({
    email: yup.string().email('Invalid Email address').required('Email is required'),
    password: yup
      .string()
      .min(8, 'Password must have at least 8 characters')
      .matches(/^\S*$/, 'Password cannot contain spaces')
      .required('Password is required')
  })
});

const onSubmit = handleSubmit(async (values) => {
  await login(values.email, values.password).then((response) => {
    if (response.data['error']) {
      error.value = response.data['error'];
    } else {
      localStorage.setItem('token', response.data['access_token']);
      router.push('/dashboard');
    }
  });
});

const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');
</script>
