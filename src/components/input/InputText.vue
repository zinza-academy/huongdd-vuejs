<template>
  <input
    class="border rounded border-gray-300 w-80 text-gray-900 text-sm focus:ring-green-500 focus:border-green-500 block p-2.5"
    v-model="value"
    :type="type || 'text'" />
  <div class="form-error">
    {{ errorMessage }}
  </div>
</template>

<script setup>
import { useField } from 'vee-validate';
import { defineProps } from 'vue';

const props = defineProps({
  name: String,
  type: String
});

const { value, errorMessage } = useField(() => props.name);
</script>
