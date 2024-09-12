const accountCompany = [
  {
    path: '/account-company',
    component: () => import('@/layouts/CompanyAccountLayout.vue'),
    meta: {
      requiresAuth: true,
      permissions: ['company-account'],
      layout: 'main-layout'
    },
    children: [
      {
        path: 'users',
        name: 'account-company.user',
        component: () => import('@/pages/admin/user/UserIndex.vue')
      },
      {
        path: 'companies',
        name: 'account-company.company',
        component: () => import('@/pages/admin/user/CompanyUpdate.vue')
      }
    ]
  }
];
