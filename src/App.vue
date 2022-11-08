<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { auth } from '@/plugins/firebase';
import TheBackground from '@/components/TheBackground.vue';
import TheHeader from '@/components/TheHeader.vue';
import SongPlayer from '@/components/SongPlayer.vue';
import AuthModal from '@/components/AuthModal.vue';

const userStore = useUserStore();
const { toggleAuth } = userStore;

onMounted(() => {
  if (auth.currentUser) {
    toggleAuth();
  }
});
</script>

<template>
  <TheBackground />

  <TheHeader />

  <main class="rel">
    <RouterView />
  </main>

  <SongPlayer />

  <AuthModal />
</template>
