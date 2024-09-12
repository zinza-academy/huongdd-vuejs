import axiosInstance from '@/plugins/axios.plugin';

export async function index(page) {
  const response = axiosInstance.get(`topic?page=${page}`);
  return response;
}

export async function editTopic(id) {
  const response = axiosInstance.get(`topic/${id}`);
  return response;
}

export async function updateTopic(id, data) {
  const response = axiosInstance.patch(`topic/${id}`, data);
  return response;
}

export async function createTopic(data) {
  const response = axiosInstance.post('topic', data);
  return response;
}

export async function deleteManyTopic(ids: String[]) {
  const response = axiosInstance.post('topic/delete-many', {
    ids: ids
  });
  return response;
}

export async function deleteOneTopic(id) {
  const response = axiosInstance.delete(`topic/${id}`);
  return response;
}
