import { createRouter, createWebHistory } from 'vue-router';
import admin from './AdminRouter';
import auth from './AuthRouter';
import common from './CommonRouter';

const routes = [...admin, ...auth, ...common];
const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('token');
    if (token) {
      next();
    } else {
      next({ name: 'login' });
    }
  } else {
    next();
  }
});

export default router;
