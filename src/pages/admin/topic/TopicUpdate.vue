<template>
  <div class="">
    <div class="mx-auto">
      <div class="bg-white overflow-hidden shadow-sm">
        <div class="p-6 text-gray-900">
          <Form @submit="onSubmit" :validation-schema="schema">
            <div class="mt-5 flex flex-col w-96">
              <label for="">Name</label>
              <Field
                name="name"
                type="text"
                class="border p-1 focus:border-green-500"
                v-model="formValue.Topic.name" />
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
import { ref, onMounted } from 'vue';
import * as yup from 'yup';
import { useToastr } from '@/plugins/toastr.plugin';
import { useRoute } from 'vue-router';
import { editTopic, updateTopic } from '@/services/admin/topic.service';

const formValue = ref({
  Topic: {
    name: ''
  }
});
const toastr = useToastr();
const route = useRoute();

const onSubmit = async (values) => {
  await updateTopic(route.params.id, values)
    .then(() => {
      toastr.success('Topic updated');
    })
    .catch((e) => {
      toastr.error('An error occurred: ' + e);
    });
};

const schema = yup.object({
  name: yup.string().min(3, 'Name must have at least 3 characters').required()
});

onMounted(async () => {
  await editTopic(route.params.id).then((resp) => {
    formValue.value = resp.data;
  });
  console.log(formValue.value);
});
</script>
