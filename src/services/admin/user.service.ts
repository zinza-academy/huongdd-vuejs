import AxiosInstance from '@/plugins/axios.plugin';

export async function index(page: Number | String) {
  const data = await AxiosInstance.get(`user?page=${page}`);
  return data;
}

export async function deleteManyUser(ids: String[]) {
  const response = await AxiosInstance.post('user/delete-many', {
    ids: ids
  });
  return response;
}

export async function showOneUser(id: Number | String) {
  const response = await AxiosInstance.get(`user/${id}`);
  return response;
}

export async function updateUser(id: Number | String, data: any) {
  const response = await AxiosInstance.patch(`user/${id}`, data);
  return response;
}

export async function updateUserAvatar(id: Number | String, data: any) {
  const response = await AxiosInstance.post(`user/upload-avatar/${id}`, data);
  return response;
}

export async function createUser() {
  const response = await AxiosInstance.get('user/create');
  return response;
}

export async function storeUser(data: any) {
  const response = await AxiosInstance.post('user', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response;
}
