import AxiosInstance from '@/plugins/axios.plugin';

export async function profile() {
  const data = await AxiosInstance.get('profile');
  return data;
}

export async function updateProfile(data: any) {
  const response = await AxiosInstance.patch('update-profile', data);
  return response;
}

export async function uploadAvatar(data: any) {
  const response = await AxiosInstance.post('upload-avatar', data);
  return response;
}
