import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', name: 'MainPage', component: () => import('@/pages/MainPage.vue') },
  {
    path: '/todo/create',
    name: 'TodoCreatePage',
    component: () => import('@/pages/TodoCreatePage.vue'),
  },
  {
    path: '/todo/update/:id',
    name: 'TodoUpdatePage',
    component: () => import('@/pages/TodoUpdatePage.vue'),
  },
];
export const router = createRouter({
  history: createWebHistory(),
  routes,
});
