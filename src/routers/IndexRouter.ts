import { createRouter, createWebHistory } from 'vue-router';
import admin from './AdminRouter';
import auth from './AuthRouter';
import common from './CommonRouter';
import error from './ErrorRouter';
import { jwtDecode } from 'jwt-decode';
import { useToastr } from '@/plugins/toastr.plugin';
import test from './TestRouter';
import { customPayload } from '@/utils/token';

const toastr = useToastr();
const routes = [...admin, ...auth, ...common, ...test, ...error];
const router = createRouter({
  linkActiveClass: 'text-black',
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode<customPayload>(token);
      const isExpired = decodedToken?.exp && decodedToken.exp * 1000 <= Date.now();
      if (isExpired) {
        localStorage.removeItem('token');
        next({ name: 'login' });
        toastr.info('Your session is expired, please login again');
      } else {
        next();
      }
    } else {
      next({ name: 'login' });
    }
  } else {
    next();
  }
});

export default router;
