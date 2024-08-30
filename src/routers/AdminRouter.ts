const admin = [
  {
    path: '/admin',
    children: [
      {
        path: 'users',
        name: 'user.index',
        component: () => import('../pages/admin/user/UserIndex.vue'),
        meta: {
          requiresAuth: true,
          permissions: ['admin']
        }
      },
      {
        path: 'tags',
        name: 'tag.index',
        component: () => import('../pages/admin/tag/TagIndex.vue'),
        meta: {
          requiresAuth: true,
          permissions: ['admin']
        }
      },
      {
        path: 'companies',
        name: 'company.index',
        component: () => import('../pages/admin/company/CompanyIndex.vue'),
        meta: {
          requiresAuth: true,
          permissions: ['admin']
        }
      },
      {
        path: 'topics',
        name: 'topic.index',
        component: () => import('../pages/admin/topic/TopicIndex.vue'),
        meta: {
          requiresAuth: true,
          permissions: ['admin']
        }
      }
    ]
  }
];

export default admin;
