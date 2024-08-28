import { createRouter, createWebHistory } from 'vue-router';
import admin from './AdminRouter';
import auth from './AuthRouter';

const routes = [...admin, ...auth];
const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
