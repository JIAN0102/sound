import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useModalStore = defineStore('modal', () => {
  const isModalOpen = ref(false);
  const authType = ref('login');

  function toggleModal() {
    isModalOpen.value = !isModalOpen.value;
    document.body.classList.toggle('overflow:hidden');
  }

  return {
    isModalOpen,
    authType,
    toggleModal,
  };
});
