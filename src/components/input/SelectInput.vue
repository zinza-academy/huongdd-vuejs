<template>
  <select
    :name="name"
    :multiple="isMultiple"
    class="border p-1 focus:border-green-500"
    v-bind="$attrs">
    <option value="" disabled>Select {{ displayName }}</option>
    <option v-for="(item, index) in options" :key="index" :value="item[valueBy]">
      {{ item[label] }}
    </option>
  </select>
</template>

<script lang="ts" setup>
import { computed, defineProps, ref } from 'vue';
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  options: {
    type: Array,
    required: true,
    default: () => []
  },
  isMultiple: {
    type: Boolean,
    default: () => false
  },
  label: {
    type: String,
    required: true
  },
  valueBy: {
    type: String,
    required: true
  },
  selected: {
    type: [Array, Number]
  }
});
const displayName = ref();
displayName.value = computed(() => {
  return props.name.split('_')[0];
});
</script>
