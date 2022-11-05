<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { auth } from '@/includes/firebase';
import AppBackground from '@/components/layout/AppBackground.vue';
import AppHeader from '@/components/layout/AppHeader.vue';
import SongPlayer from '@/components/song/SongPlayer.vue';
import AuthModal from '@/components/auth/AuthModal.vue';

const userStore = useUserStore();
const { toggleAuth } = userStore;

onMounted(() => {
  if (auth.currentUser) {
    toggleAuth();
  }
});
</script>

<template>
  <AppBackground />

  <AppHeader />

  <main class="rel">
    <RouterView />
  </main>

  <SongPlayer />

  <AuthModal />
</template>
