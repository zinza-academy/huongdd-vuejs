<template>
  <div class="">
    <div class="mx-auto">
      <div class="bg-white overflow-hidden shadow-sm">
        <div class="p-6 text-gray-900">
          <Form @submit="onSubmit" :validation-schema="schema">
            <div class="mt-5 flex flex-col w-96">
              <label for="">Name</label>
              <Field name="name" type="text" class="border p-1 focus:border-green-500" />
              <ErrorMessage class="form-error" name="name" />
            </div>
            <div class="mt-5">
              <button class="btn">Save</button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { useToastr } from '@/plugins/toastr.plugin';
import { createTopic } from '@/services/admin/topic.service';
import { useRouter } from 'vue-router';

const toastr = useToastr();
const router = useRouter();

const onSubmit = async (values) => {
  await createTopic(values)
    .then(() => {
      toastr.success('Topic created');
      router.push({ name: 'topic.index' });
    })
    .catch((e) => {
      toastr.error('An error occurred: ' + e);
    });
};

const schema = yup.object({
  name: yup.string().min(3, 'Name must have at least 3 characters').required()
});
</script>
