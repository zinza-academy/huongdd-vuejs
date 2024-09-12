const auth = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/auth/LoginView.vue'),
    meta: {
      layout: 'auth-layout'
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../pages/ProfilePage.vue'),
    meta: {
      requiresAuth: true,
      layout: 'main-layout'
    }
  },
  {
    path: '/forgot-password',
    name: 'forgotpassword',
    component: () => import('../views/auth/ForgotPassword.vue'),
    meta: {
      layout: 'auth-layout'
    }
  }
];

export default auth;
