<template>
  <AdminHeader />
  <RouterView />
</template>

<script>
import AdminHeader from '@/components/header/AdminHeader.vue';
export default {
  components: {
    AdminHeader
  }
};
</script>
