<template>
  <div class="p-2 navbar">
    <ul
      class="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0">
      <router-link class="px-2 py-1" :to="{ name: 'dashboard' }">Dashboard</router-link>
      <router-link class="px-2 py-1" :to="{ name: 'user.index' }">Users</router-link>
      <router-link class="px-2 py-1" :to="{ name: 'profile' }">Profile</router-link>
      <button @click="onLogout" class="btn">Log out</button>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { logout } from '@/services/auth.service';
import { useRouter } from 'vue-router';
const router = useRouter();

async function onLogout() {
  await logout();
  localStorage.removeItem('token');
  router.push('/');
}
</script>

<style scoped>
form {
  width: 100%;
}

.navbar {
  background: linear-gradient(90deg, #d64734, #314295);
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
}

ul {
  color: inherit;
}
</style>
