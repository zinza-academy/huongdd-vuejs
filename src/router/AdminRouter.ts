const admin = [
  {
    path: '/admin',
    component: () => import('../layouts/AdminLayout.vue'),
    children: [
      {
        path: 'users',
        name: 'admin-user',
        component: () => import('../pages/admin/user/UserIndex.vue')
      }
    ]
  }
];

export default admin;
