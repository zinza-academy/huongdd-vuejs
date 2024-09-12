<template>
  <div class="dropdown-container" v-click-outside="onCloseDropdown">
    <button @click="onToggleDropdown" type="button">
      <slot name="trigger"> Action </slot>
    </button>
    <div
      v-if="isShown"
      class="dropdown-content z-10 bg-white rounded-lg shadow w-44 absolute"
      @click="onCloseDropdown">
      <ul class="py-1 px-2 text-sm text-gray-700">
        <slot name="content" />
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const isShown = ref<Boolean>(false);
const onToggleDropdown = () => {
  isShown.value = !isShown.value;
};
const onCloseDropdown = () => {
  isShown.value = false;
};

const vClickOutside = {
  mounted(el: any, binding: any) {
    el.__ClickOutSide__ = (event: Event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event);
      }
    };
    document.body.addEventListener('click', el.__ClickOutSide__);
  },
  onUnmounted(el: any) {
    document.body.removeEventListener('click', el.__ClickOutSide__);
  }
};
</script>

<style scoped>
.dropdown-container {
  position: relative;
}

.dropdown-content {
  top: 150%;
}
</style>
