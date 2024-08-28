<template>
  <CompanyAccount />
  <RouterView />
</template>

<script>
import CompanyAccount from '@/components/header/CompanyAccount.vue';

export default {
  components: {
    CompanyAccount
  }
};
</script>
