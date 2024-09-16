<template>
  <div class="px-8 mt-8">
    <div class="flex justify-start mb-5 gap-x-4">
      <router-link
        :to="{ name: 'user.create' }"
        class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-700">
        Create new user
      </router-link>
      <button
        id="delete_selected_users"
        class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-700">
        Delete selected users
      </button>
    </div>
    <table class="mb-3 w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-300">
        <tr>
          <th scope="col" class="px-6 py-3">
            <input type="checkbox" name="ids" id="select_all_users" />
          </th>
          <th scope="col" class="px-6 py-3">Id</th>
          <th scope="col" class="px-6 py-3">Name</th>
          <th scope="col" class="px-6 py-3">DOB</th>
          <th scope="col" class="px-6 py-3">Status</th>
          <th scope="col" class="px-6 py-3">Role</th>
          <th scope="col" class="px-6 py-3">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="odd:bg-white even:bg-gray-50 border-b"
          v-for="user in paginateData.data"
          :key="user.id"
          :id="user.id ? `users_${user.id}` : ''">
          <td class="px-6 py-4">
            <input type="checkbox" v-if="!user.is_admin" class="checkbox_ids" :value="user.id" />
          </td>
          <td class="px-6 py-4">{{ user.id }}</td>
          <td class="px-6 py-4">{{ user.name }}</td>
          <td class="px-6 py-4">{{ user.dob }}</td>
          <td class="px-6 py-4">
            <span class="text-white bg-green-500 px-2 py-1">Active</span>
          </td>
          <td class="px-6 py-4">
            <span v-if="user.is_admin" class="text-white rounded bg-fuchsia-700 px-2 py-1"
              >Admin</span
            >
            <span v-if="user.role" class="text-white rounded bg-cyan-700 px-2 py-1"
              >Company account</span
            >
            <span
              v-if="!user.is_admin && !user.role"
              class="text-white rounded bg-indigo-700 px-2 py-1"
              >Member</span
            >
          </td>
          <td class="px-6 py-4">
            <drop-down v-if="!user.is_admin">
              <template v-slot:trigger>
                <span
                  class="text-white bg-blue-300 hover:bg-blue-800 rounded text-sm px-2 py-1 text-center inline-flex items-center"
                  >Action</span
                >
              </template>
              <template v-slot:content>
                <li class="py-1">
                  <router-link
                    class="p-1 inline-block w-full hover:bg-green-100"
                    :to="{ name: 'user.update', params: { id: user.id } }"
                    >Update</router-link
                  >
                </li>
                <li class="py-1">
                  <a class="p-1 inline-block w-full hover:text-red-500 hover:bg-red-100" href="#"
                    >Delete</a
                  >
                </li>
              </template>
            </drop-down>
          </td>
        </tr>
      </tbody>
    </table>
    <PaginationComponent :links="paginateData.links" :onSwitchPage="getUsers" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { index, deleteMany } from '@/services/admin/user.service';
import DropDown from '@/components/DropDown.vue';
import PaginationComponent from '@/components/PaginationComponent.vue';
import { selectMany, deleteManyRecords } from '@/utils/functions';

const target = 'users';

const paginateData = ref({
  data: {},
  links: {}
});

const getUsers = async (page = 1) => {
  const data = await index(page);
  paginateData.value = data.data;
};

onMounted(() => {
  getUsers();
  selectMany(target);
  deleteManyRecords(target, deleteMany);
});
</script>
