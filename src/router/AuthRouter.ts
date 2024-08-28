const auth = [
  {
    path: '/login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/profile',
    component: () => import('../pages/ProfilePage.vue')
  }
];

export default auth;
