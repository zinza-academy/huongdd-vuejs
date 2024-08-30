<template>
  <component :is="layout">
    <router-view />
  </component>
  <!-- <footer>this is footer</footer> -->
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { DEFAULT_LAYOUT } from './constants';
const route = useRoute();
console.log(route);

const layout = computed(() => route.meta.layout ?? DEFAULT_LAYOUT);
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
