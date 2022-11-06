import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useModalStore = defineStore('modal', () => {
  const isOpen = ref(false);
  const type = ref('login');

  function toggleModal() {
    isOpen.value = !isOpen.value;
    document.body.classList.toggle('overflow:hidden');
  }

  return {
    isOpen,
    type,
    toggleModal,
  };
});
