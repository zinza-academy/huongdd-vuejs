import AxiosInstance from '@/plugins/axios.plugin';

export async function index(page = 1) {
  const data = await AxiosInstance.get(`user?page=${page}`);
  return data;
}

export async function deleteMany(ids: String[]) {
  const response = await AxiosInstance.post('user/delete-many', {
    ids: ids
  });
  return response;
}

export async function show(id) {
  const response = await AxiosInstance.get(`user/${id}`);
  return response;
}

export async function update(id, data) {
  const response = await AxiosInstance.patch(`user/${id}`, data);
  return response;
}
export async function updateUserAvatar(id, data) {
  console.log(data);

  const response = await AxiosInstance.post(`user/upload-avatar/${id}`, data);
  return response;
}
