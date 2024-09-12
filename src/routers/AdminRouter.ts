const admin = [
  {
    path: '/admin',
    meta: {
      requiresAuth: true,
      permissions: ['admin'],
      layout: 'main-layout'
    },
    children: [
      {
        path: 'users',
        name: 'user.index',
        component: () => import('../pages/admin/user/UserIndex.vue')
      },
      {
        path: 'users/update/:id',
        name: 'user.update',
        component: () => import('../pages/admin/user/UserUpdate.vue')
      },
      {
        path: 'tags',
        name: 'tag.index',
        component: () => import('../pages/admin/tag/TagIndex.vue')
      },
      {
        path: 'tags/create',
        name: 'tag.create',
        component: () => import('../pages/admin/tag/TagCreate.vue')
      },
      {
        path: 'tags/update/:id',
        name: 'tag.update',
        component: () => import('../pages/admin/tag/TagUpdate.vue')
      },
      {
        path: 'companies',
        name: 'company.index',
        component: () => import('../pages/admin/company/CompanyIndex.vue')
      },
      {
        path: 'companies/update/:id',
        name: 'company.update',
        component: () => import('../pages/admin/company/CompanyUpdate.vue')
      },
      {
        path: 'topics',
        name: 'topic.index',
        component: () => import('../pages/admin/topic/TopicIndex.vue')
      },
      {
        path: 'topics/update/:id',
        name: 'topic.update',
        component: () => import('../pages/admin/topic/TopicUpdate.vue')
      },
      {
        path: 'topics/create/',
        name: 'topic.create',
        component: () => import('../pages/admin/topic/TopicCreate.vue')
      }
    ]
  }
];

export default admin;
