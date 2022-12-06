import { ref } from 'vue';
import { defineStore } from 'pinia';
import { auth } from '@/plugins/firebase';

export const useUserStore = defineStore('user', () => {
  const isLoggedIn = ref(!!auth.currentUser);

  return {
    isLoggedIn,
  };
});
