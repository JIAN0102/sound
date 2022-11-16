import { createRouter, createWebHistory } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/manage',
    name: 'manage',
    component: () => import('@/views/ManageView.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/song/:id',
    name: 'song',
    component: () => import('@/views/SongView.vue'),
  },
  {
    path: '/:catchAll(.*)*',
    redirect: {
      name: 'home',
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to) => {
  const userStore = useUserStore();
  const { isLoggedIn } = storeToRefs(userStore);

  if (to.meta.requiresAuth && !isLoggedIn.value) {
    return {
      name: 'home',
    };
  }
});

export default router;
