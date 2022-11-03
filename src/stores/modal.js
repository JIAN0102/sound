import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useModalStore = defineStore('modal', () => {
  const isOpen = ref(false);

  function toggleAuthModal() {
    isOpen.value = !isOpen.value;
    document.body.classList.toggle('overflow:hidden');
  }

  return {
    isOpen,
    toggleAuthModal,
  };
});
