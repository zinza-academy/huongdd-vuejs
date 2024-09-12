<template>
  <div class="">
    <div class="mx-auto">
      <div class="p-8">
        <div class="flex justify-start mb-5 gap-x-4">
          <router-link
            class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-700"
            :to="{ name: 'topic.create' }"
            >Create new topic</router-link
          >
          <button
            id="delete_selected_topics"
            class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-700">
            Delete selected topics
          </button>
        </div>
        <div class="text-gray-900">
          <div class="relative">
            <table class="mb-3 w-full text-left text-gray-500">
              <thead class="text-xs text-gray-700 uppercase bg-gray-200">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    <input type="checkbox" id="select_all_topics" />
                  </th>
                  <th scope="col" class="px-6 py-3">Id</th>
                  <th scope="col" class="px-6 py-3">Name</th>
                  <th scope="col" class="px-6 py-3">Date created</th>
                  <th scope="col" class="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="topic in paginateData.data"
                  :key="topic.id"
                  :id="topic.id ? `topics_${topic.id}` : ''"
                  class="odd:bg-white even:bg-gray-50 border-b">
                  <th class="px-6 py-4">
                    <input type="checkbox" class="checkbox_ids" :value="topic.id" />
                  </th>
                  <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {{ topic.id }}
                  </th>
                  <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    <span class="inline-block text-black px-3 py-1">{{ topic.name }}</span>
                  </th>
                  <td class="px-6 py-4">
                    {{ new Date(topic.created_at).toLocaleDateString() }}
                  </td>

                  <td class="px-6 py-4">
                    <drop-down>
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
                            :to="{ name: 'topic.update', params: { id: topic.id } }"
                            >Update</router-link
                          >
                        </li>
                        <li class="py-1">
                          <button
                            :value="topic.id"
                            @click="onDeleteTopic"
                            class="p-1 inline-block text-left w-full hover:text-red-500 hover:bg-red-100">
                            Delete
                          </button>
                        </li>
                      </template>
                    </drop-down>
                  </td>
                </tr>
              </tbody>
            </table>
            <pagination-component :links="paginateData.links" :onSwitchPage="getTopics" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { index, deleteManyTopic, deleteOneTopic } from '@/services/admin/topic.service';
import DropDown from '@/components/DropDown.vue';
import PaginationComponent from '@/components/PaginationComponent.vue';
import { selectMany, deleteManyRecords } from '@/utils/functions';
import { useToastr } from '@/plugins/toastr.plugin';

const target = 'topics';
const toastr = useToastr();

const paginateData = ref({
  data: [],
  links: []
});

const getTopics = async (page = 1) => {
  const data = await index(page);
  paginateData.value = data.data;
};

const onDeleteTopic = async (e) => {
  await deleteOneTopic(e.target.value)
    .then(() => {
      document.querySelector(`#${target}_${e.target.value}`)?.remove();
      toastr.success('topic deleted');
    })
    .catch((e) => {
      toastr.error('An error occurred: ' + e);
    });
};

onMounted(() => {
  getTopics();
  selectMany(target);
  deleteManyRecords(target, deleteManyTopic);
});
</script>
