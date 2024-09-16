<template>
  <div class="mt-8 p-5">
    <Form @submit="onSubmit" :validation-schema="schema">
      <div class="flex flex-col w-96">
        <img
          class="rounded-full w-36 h-36 border-2 hover:border-green-400"
          :src="preview ? preview : ''"
          alt="avatar" />
        <Field name="avatar" type="file" @change="onPreview" />
        <ErrorMessage class="form-error" name="avatar" />
      </div>
      <div class="flex flex-wrap gap-x-4 mt-5">
        <div class="flex flex-col w-96">
          <label for="">Full name</label>
          <Field name="name" type="text" class="border p-1 focus:border-green-500" />
          <ErrorMessage class="form-error" name="name" />
        </div>
        <div class="flex flex-col w-96">
          <label for="">Email</label>
          <Field name="email" type="text" class="border p-1 focus:border-green-500" />
          <ErrorMessage class="form-error" name="email" />
        </div>
      </div>
      <div class="flex flex-wrap mt-5 gap-x-4">
        <div class="flex flex-col w-96">
          <label for=""> Password</label>
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
          <!-- <Field name="role" v-model="roleOptions" v-slot="{ field }">
            <select-input
              v-bind="field"
              :options="options"
              v-model="roleOptions"
              value-by="value"
              label="label" />
          </Field> -->
          <Field as="select" name="role">
            <option value="" disabled>Select user's role</option>
            <option :value="role.value" v-for="(role, index) in roleOptions" :key="index">
              {{ role.label }}
            </option>
          </Field>
          <ErrorMessage class="form-error" name="role" />
        </div>
        <div class="flex flex-col w-96">
          <label for="">Company</label>
          <Field name="company_id" as="select">
            <option value="" disabled>Select company</option>
            <option
              :value="company.id"
              v-for="(company, index) in formValue.companies"
              :key="index">
              {{ company.name }}
            </option>
          </Field>
          <ErrorMessage class="form-error" name="company_id" />
        </div>
      </div>
      <div class="flex flex-col mt-5 w-96">
        <label for="">Date of birth</label>
        <Field name="dob" type="date" class="border p-1 focus:border-green-500" />
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
import { createUser, storeUser } from '@/services/admin/user.service';
import { useRouter } from 'vue-router';

const formValue = ref({
  companies: Array
});

const preview = ref('');
const apiResp = ref();
const toastr = useToastr();
const router = useRouter();

const roleOptions = ref([
  { value: 2, label: 'Account Company' },
  { value: 1, label: 'Member' }
]);

const schema = yup.object({
  name: yup.string().min(5, 'Name must have at least 5 characters').required(),
  email: yup.string().email('Invalid email').required(),
  password: yup
    .string()
    .transform((value, originalValue) => {
      return originalValue === '' ? null : value;
    })
    .min(8, 'Password must have at least 8 characters')
    .matches(/^\S*$/, 'Password cannot contain spaces')
    .required(),

  passwordConfirm: yup
    .string()
    .transform((value, originalValue) => {
      return originalValue === '' ? null : value;
    })
    .oneOf([yup.ref('password')], 'Password confirm must match')
    .required(),

  dob: yup.string().required(),
  company_id: yup.number().required('Please select company'),
  role: yup.number().required('Please select role'),
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

const onPreview = (e) => {
  preview.value = URL.createObjectURL(e.target.files[0]);
};

const onSubmit = async (values) => {
  await storeUser(values)
    .then((response) => {
      if (response.data['error']) {
        apiResp.value = response.data['error'];
      } else {
        toastr.success('User created');
        router.push({ name: 'user.index' });
      }
    })
    .catch((e) => {
      toastr.error('An error occur: ' + e);
    });
};

onMounted(async () => {
  await createUser().then((response) => {
    formValue.value = response.data;
  });
});
</script>
