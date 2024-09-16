<template>
  <select :name="name" :multiple="isMultiple">
    <option value="" disabled selected>Select {{ name }}</option>
    <option
      v-for="(item, index) in options"
      :key="index"
      :value="item[valueBy]"
      :selected="isSelected(item[valueBy])">
      {{ item[label] }}
    </option>
  </select>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  options: [],
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

const isSelected = (val: Number) => {
  if (typeof props.selected === 'number') {
    return val === props.selected;
  } else if (Array.isArray(props.selected)) {
    return props.selected.indexOf(val) > -1 ? true : false;
  }
};
</script>
