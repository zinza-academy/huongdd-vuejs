<template>
  <div class="container">
    <form action="#" @submit.prevent="onSubmit">
      <div class="content">
        <div class="flex justify-content-center">
          <img src="../assets/logo.png" alt="vue-logo" />
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
          <a href="#">Forgot password?</a>
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

<script>
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const error = ref('');
    const axios = require('axios');

    const token = localStorage.getItem('token');
    if (token) {
      router.push('/profile');
    }

    const { meta, errors, handleSubmit, defineField, isSubmitting } = useForm({
      validationSchema: yup.object({
        email: yup.string().email('Invalid Email address').required('Email is required'),
        password: yup
          .string()
          .min(8, 'Password must have at least 8 characters')
          .matches(/^\S*$/, 'Password cannot contain spaces')
          .required('Password is required')
      })
    });

    const onSubmit = handleSubmit((values) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          axios
            .post('http://127.0.0.1:8000/api/login', {
              email: values['email'],
              password: values['password']
            })
            .then((response) => {
              if (response.data['error']) {
                error.value = response.data['error'];
              } else {
                // console.log(response.data['access_token']);
                localStorage.setItem('token', response.data['access_token']);
                router.push('/profile');
              }
            })
            .catch((error) => {
              console.log(error);
            });
          resolve();
        }, 1000);
      });
    });

    const [email, emailAttrs] = defineField('email');
    const [password, passwordAttrs] = defineField('password');
    return {
      email,
      emailAttrs,
      password,
      passwordAttrs,
      onSubmit,
      meta,
      errors,
      isSubmitting,
      error
    };
  }
};
</script>
<style>
.form-error {
  text-align: left;
  color: red;
  font-size: 14px;
  padding: 5px 0;
}

button:disabled,
button[disabled],
button:disabled:hover,
button[disabled]:hover {
  border: 1px solid #999999;
  background-color: #cccccc;
  color: #666666;
}
</style>
