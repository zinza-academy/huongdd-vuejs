import AxiosInstance from '@/plugins/axios.plugin';

export async function index(page: Number | String) {
  const data = await AxiosInstance.get(`user?page=${page}`);
  return data;
}

export async function deleteMany(ids: String[]) {
  const response = await AxiosInstance.post('user/delete-many', {
    ids: ids
  });
  return response;
}

export async function show(id: Number | String) {
  const response = await AxiosInstance.get(`user/${id}`);
  return response;
}

export async function update(id: Number | String, data: any) {
  const response = await AxiosInstance.patch(`user/${id}`, data);
  return response;
}

export async function updateUserAvatar(id: Number | String, data: any) {
  const response = await AxiosInstance.post(`user/upload-avatar/${id}`, data);
  return response;
}

export async function create() {
  const response = await AxiosInstance.get('user/create');
  return response;
}

export async function store(data: any) {
  const response = await AxiosInstance.post('user', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response;
}
