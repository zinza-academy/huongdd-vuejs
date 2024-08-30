const common = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/pages/DashboardPage.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/topic/:id',
    name: 'topic.detail',
    component: () => import('@/pages/TopicDetailPage.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/post/:id',
    name: 'post.detail',
    component: () => import('@/pages/PostDetailPage.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/post',
    name: 'post.index',
    component: () => import('@/pages/PostIndexPage.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/create-post',
    name: 'post.create',
    component: () => import('@/pages/PostCreatePage.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/pages/ProfilePage.vue'),
    meta: {
      requiresAuth: true
    }
  }
];

export default common;
