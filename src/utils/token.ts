import { jwtDecode, JwtPayload } from 'jwt-decode';
import { ref } from 'vue';

export interface customPayload extends JwtPayload {
  is_admin: Number | null;
  role: Number | null;
}

export default function getRoleFromToken() {
  const isAdmin = ref<Number | null>(0);
  const isCompanyAccount = ref<Number | null>(0);
  const token = localStorage.getItem('token');
  if (token) {
    const decodedToken = jwtDecode<customPayload>(token);
    isAdmin.value = decodedToken.is_admin;
    isCompanyAccount.value = decodedToken.role;
  }
  return { isAdmin, isCompanyAccount };
}
