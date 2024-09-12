<template>
  <div class="mt-8 p-5">
    <Form
      @submit="onSubmitAvatar"
      v-slot="{ meta }"
      :validation-schema="avatarSchema"
      enctype="multipart/form-data">
      <div>
        <img
          class="rounded-full w-36 h-36 border-2 hover:border-green-400"
          :src="formValue.user.avatar ? formValue.user.avatar : formValue.avatar"
          alt="avatar" />
        <Field type="file" @change="onChangeAvatar" name="avatar" />
        <ErrorMessage class="form-error" name="avatar" />
        <div class="mt-5">
          <button class="btn" :disabled="!meta.valid">Upload image</button>
        </div>
      </div>
    </Form>
    <Form @submit="onSubmit" :validation-schema="schema">
      <div class="flex flex-wrap gap-x-4 mt-5">
        <div class="flex flex-col w-96">
          <label for="">Full name</label>
          <Field
            name="name"
            type="text"
            class="border p-1 focus:border-green-500"
            v-model="formValue.user.name" />
          <ErrorMessage class="form-error" name="name" />
        </div>
        <div class="flex flex-col w-96">
          <label for="">Email</label>
          <Field
            name="email"
            type="text"
            class="border p-1 focus:border-green-500"
            v-model="formValue.user.email" />
          <ErrorMessage class="form-error" name="text" />
        </div>
      </div>
      <div class="flex flex-wrap mt-5 gap-x-4">
        <div class="flex flex-col w-96">
          <label for="">Current Password</label>
          <Field name="oldPassword" type="password" class="border p-1 focus:border-green-500" />
          <ErrorMessage class="form-error" name="oldPassword" />
        </div>
        <div class="flex flex-col w-96">
          <label for="">New password</label>
          <Field name="password" type="password" class="border p-1 focus:border-green-500" />
          <ErrorMessage class="form-error" name="password" />
        </div>
        <div class="flex flex-col w-96">
          <label for="">Password Confirm</label>
          <Field name="passwordConfirm" type="password" class="border p-1 focus:border-green-500" />
          <ErrorMessage class="form-error" name="passwordConfirm" />
        </div>
      </div>
      <div class="flex flex-wrap mt-5 gap-x-4">
        <div class="flex flex-col w-96">
          <label for="">Role</label>
          <Field
            name="role"
            as="select"
            class="border p-1 focus:border-green-500"
            v-model="formValue.user.role">
            <option :value="1" :selected="formValue.user.role === 1">Company Account</option>
            <option :value="0" :selected="formValue.user.role === 0">Member</option>
          </Field>
          <ErrorMessage class="form-error" name="role" />
        </div>
        <div class="flex flex-col w-96">
          <label for="">Company</label>
          <Field
            name="company_id"
            as="select"
            v-model="formValue.user.company_id"
            class="border p-1 focus:border-green-500">
            <option
              v-for="company in formValue.companies"
              :value="company.id"
              :key="company.id"
              :selected="company.id === formValue.user.company_id">
              {{ company.name }}
            </option>
          </Field>
          <ErrorMessage class="form-error" name="company_id" />
        </div>
      </div>
      <div class="flex flex-col mt-5 w-96">
        <label for="">Date of birth</label>
        <Field
          name="dob"
          type="date"
          class="border p-1 focus:border-green-500"
          v-model="formValue.user.dob" />
        <ErrorMessage class="form-error" name="dob" />
      </div>
      <div class="mt-5">
        <button class="btn">Submit</button>
      </div>
      <div class="form-error">{{ apiResp }}</div>
    </Form>
  </div>
</template>

<script lang="ts" setup>
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { onMounted, ref } from 'vue';
import { useToastr } from '@/plugins/toastr.plugin';
import { useRoute } from 'vue-router';
import { show, update, updateUserAvatar } from '@/services/admin/user.service';

const formValue = ref({
  user: {},
  companies: {},
  avatar: ''
});
const apiResp = ref();
const toastr = useToastr();
const route = useRoute();

const avatarSchema = yup.object({
  avatar: yup
    .mixed()
    .test('fileSize', 'This file must be less than 2 MB', (value) => {
      return value ? value.size <= 2000000 : true;
    })
    .test('fileType', 'Accept image only', (value) => {
      return value ? ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type) : true;
    })
    .required()
});

const schema = yup.object({
  name: yup.string().min(5, 'Name must have at least 5 characters').required(),
  password: yup
    // password is string
    .string()
    // for empty case and user delete input case, set '' to null
    .transform((value, originalValue) => {
      return originalValue === '' ? null : value;
    })
    // if user input old password, this field is required
    .when('oldPassword', ([oldPassword], sch) => {
      return oldPassword ? sch.required() : sch.nullable();
    })
    // must have 8 characters
    .min(8, 'Password must have at least 8 characters')
    // does not contain spaces
    .matches(/^\S*$/, 'Password cannot contain spaces'),

  oldPassword: yup
    .string()
    .nullable()
    .transform((value, originalValue) => {
      return originalValue === '' ? null : value;
    })
    .min(8, 'Password must have at least 8 characters')
    .matches(/^\S*$/, 'Password cannot contain spaces'),

  passwordConfirm: yup
    .string()
    .when('password', ([password], sch) => {
      return password ? sch.required('Password confirm is required') : sch.nullable();
    })
    .transform((value, originalValue) => {
      return originalValue === '' ? null : value;
    })
    .oneOf([yup.ref('password')], 'Password confirm must match'),

  dob: yup.string().required()
});

const onSubmitAvatar = async (values) => {
  const formData = new FormData();
  formData.append('avatar', values.avatar);
  await updateUserAvatar(route.params.id, formData)
    .then((res) => {
      toastr.success('Uploaded');
      console.log(res);
    })
    .catch((error) => {
      toastr.error(error);
    });
};

const onSubmit = async (values) => {
  await update(route.params.id, values)
    .then((response) => {
      if (response.data['error']) {
        apiResp.value = response.data['error'];
      } else {
        toastr.success('Profile updated successfully');
      }
    })
    .catch((e) => {
      toastr.error('An error occur: ' + e);
    });
};

const onChangeAvatar = (e) => {
  const file = e.target.files[0];
  formValue.value.avatar = URL.createObjectURL(file);
};

onMounted(async () => {
  await show(route.params.id).then((resp) => {
    formValue.value = resp.data;
  });
  console.log(formValue);
});
</script>
