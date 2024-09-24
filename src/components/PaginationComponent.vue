<template>
  <div v-if="props.links?.length">
    <ul class="flex">
      <li class="mx-1" v-for="(link, index) in links" :key="index">
        <button
          class="text-sm border rounded leading-4 px-4 py-3 hover:text-green-800 hover:bg-green-200"
          :class="{ 'bg-green-300': link.active }"
          :disabled="!link.url"
          @click="fetchPage(takePage(link.url))"
          v-html="link.label"></button>
      </li>
    </ul>
  </div>
  <div v-else>Only page</div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
const props = defineProps({
  links: Array,
  onSwitchPage: Function
});

const fetchPage = (page) => {
  if (page) {
    props.onSwitchPage(page);
  }
};

// for previous and next page
const takePage = (url: String) => {
  if (url) {
    const arr = url.split('=');
    return arr[arr.length - 1];
  }
};
</script>
