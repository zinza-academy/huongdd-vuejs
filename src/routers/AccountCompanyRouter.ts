const accountCompany = [
  {
    path: '/account-company',
    component: () => import('@/layouts/CompanyAccountLayout.vue'),
    children: [
      {
        path: '/user',
        name: 'account-company.user',
        component: () => import('@/pages/admin/user/UserIndex.vue'),
        meta: {
          requiresAuth: true,
          permissions: ['company-account']
        }
      },
      {
        path: '/company',
        name: 'account-company.company',
        component: () => import('@/pages/admin/user/CompanyUpdate.vue'),
        meta: {
          requiresAuth: true,
          permissions: ['company-account']
        }
      }
    ]
  }
];
