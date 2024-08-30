import AxiosInstance from '@/plugins/axios.plugin';

export async function login(email: string, password: string) {
  const data = await AxiosInstance.post('login', {
    email: email,
    password: password
  });
  return data;
}

export async function profile() {
  const data = await AxiosInstance.get('profile');
  return data;
}

export async function resetPassword(email: string) {
  const data = await AxiosInstance.post('reset', {
    email: email
  });
  return data;
}

export async function logout() {
  const response = await AxiosInstance.post('logout');
  return response;
}

export async function updateProfile(data: any) {
  const response = await AxiosInstance.patch('update-profile', data);
  return response;
}
