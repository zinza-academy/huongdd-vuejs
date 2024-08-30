import type { App } from 'vue';
import { defineAsyncComponent } from 'vue';

export default function registerGlobalComponent(app: App) {
  app.component(
    'main-layout',
    defineAsyncComponent(() => import('@/layouts/MainLayout.vue'))
  );

  app.component(
    'auth-layout',
    defineAsyncComponent(() => import('@/layouts/AuthLayout.vue'))
  );
}
