<template>
  <UserHeader />
  <RouterView />
</template>
<script>
import UserHeader from '@/components/header/UserHeader.vue';

export default {
  components: {
    UserHeader
  }
};
</script>
