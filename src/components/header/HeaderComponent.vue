<template>
  <div class="px-8 py-4 navbar">
    <ul
      class="text-sm flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0">
      <router-link class="px-2 py-1" :to="{ name: 'dashboard' }">Dashboard</router-link>
      <router-link v-if="isAdmin" class="px-2 py-1" :to="{ name: 'user.index' }">Users</router-link>
      <router-link v-if="isCompanyAccount" class="px-2 py-1" :to="{ name: 'account-company.user' }"
        >Users</router-link
      >
      <router-link v-if="isAdmin" class="px-2 py-1" :to="{ name: 'company.index' }"
        >Companies</router-link
      >
      <router-link v-if="isAdmin" class="px-2 py-1" :to="{ name: 'post.index' }">Posts</router-link>
      <router-link v-if="isAdmin" class="px-2 py-1" :to="{ name: 'topic.index' }"
        >Topics</router-link
      >
      <router-link v-if="isAdmin" class="px-2 py-1" :to="{ name: 'tag.index' }">Tags</router-link>
      <router-link
        v-if="isCompanyAccount"
        class="px-2 py-1"
        :to="{ name: 'account-company.company' }"
        >Your Company</router-link
      >
      <div class="flex items-center">
        <drop-down>
          <template v-slot:trigger>
            <span class="px-2 py-1 text-white">Avatar</span>
          </template>
          <template v-slot:content>
            <li class="p-1">
              <router-link class="px-2 py-1" :to="{ name: 'profile' }">Profile</router-link>
            </li>
            <li class="p-1">
              <button @click="onLogout" class="px-2 py-1 hover:text-green-500">Log out</button>
            </li>
          </template>
        </drop-down>
      </div>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { logout } from '@/services/auth.service';
import { useRouter } from 'vue-router';
import getRoleFromToken from '@/utils/token';
import DropDown from '@/components/DropDown.vue';
const router = useRouter();

const { isAdmin, isCompanyAccount } = getRoleFromToken();

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
