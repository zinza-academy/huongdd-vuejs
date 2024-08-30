<template>
  <div class="p-5">
    <div v-if="form">
      <form action="#" @submit.prevent="onSubmit">
        <div>
          <img
            class="rounded w-36 h-36 border"
            src="https://www.vectorstock.com/royalty-free-vector/default-avatar-photo-placeholder-icon-grey-vector-38594401"
            alt="avatar" />
          <input type="file" />
        </div>
        <div class="mt-5 flex">
          <div>
            <label for="">Username</label>
            <input
              type="text"
              class="border rounded border-gray-300 w-80 text-gray-900 text-sm focus:ring-green-500 focus:border-green-500 block p-2.5"
              placeholder="Username"
              v-model="form.name" />
            <div class="form-error"></div>
          </div>
          <div class="ml-5">
            <label for="">Email</label>
            <input
              type="text"
              class="border rounded border-gray-300 w-80 text-gray-900 text-sm focus:ring-green-500 focus:border-green-500 block p-2.5"
              placeholder="Email"
              v-model="form.email" />
            <div class="form-error"></div>
          </div>
        </div>
        <div class="mt-5 flex">
          <div>
            <label for="">Old password</label>
            <input
              type="password"
              class="border rounded border-gray-300 w-80 text-gray-900 text-sm focus:ring-green-500 focus:border-green-500 block p-2.5"
              placeholder="Old Password"
              v-model="oldPassword" />
            <div class="form-error"></div>
          </div>
          <div class="ml-5">
            <label for="">Password</label>
            <input
              type="password"
              class="border rounded border-gray-300 w-80 text-gray-900 text-sm focus:ring-green-500 focus:border-green-500 block p-2.5"
              placeholder="Password"
              v-model="password" />
            <div class="form-error"></div>
          </div>
          <div class="ml-5">
            <label for="">Confirm Password</label>
            <input
              type="password"
              class="border rounded border-gray-300 w-80 text-gray-900 text-sm focus:ring-green-500 focus:border-green-500 block p-2.5"
              placeholder="Confirm Password"
              v-model="passwordConfirm" />
            <div class="form-error"></div>
          </div>
        </div>
        <div class="mt-5 w-80">
          <label for="">Date of birth</label>
          <vue-date-picker v-model="form.dob" :hide-navigation="['time']" :format="formatDate" />
        </div>
        <div class="mt-5">
          <button class="btn">Save</button>
        </div>
      </form>
    </div>
    <div v-else>Loading user ....</div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { profile } from '@/services/auth.service';
import VueDatePicker from '@vuepic/vue-datepicker';
import { updateProfile } from '@/services/auth.service';

const form = ref({
  name: '',
  email: '',
  dob: ''
});

const response = ref();
const oldPassword = ref();
const password = ref();
const passwordConfirm = ref();
const data = ref();

const formatDate = (date: Date) => {
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};

const onSubmit = async () => {
  data.value = {
    name: form.value.name,
    email: form.value.email,
    dob: form.value.dob,
    oldPassword: oldPassword.value,
    password: password.value,
    passwordConfirm: passwordConfirm.value
  };
  response.value = await updateProfile(data.value);
};

onMounted(async () => {
  const data = await profile();
  form.value = data.data;
});
</script>
