import { createRouter, createWebHistory } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';
import HomeView from '@/views/HomeView.vue';
import ManageView from '@/views/ManageView.vue';
import SongView from '@/views/SongView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/manage',
    name: 'manage',
    component: ManageView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/song/:id',
    name: 'song',
    component: SongView,
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
  linkExactActiveClass: 'is-active',
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
