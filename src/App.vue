<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import { auth } from '@/plugins/firebase';
import { useUserStore } from '@/stores/user';
import TheBackground from '@/components/TheBackground.vue';
import TheHeader from '@/components/TheHeader.vue';
import TheLoading from '@/components/TheLoading.vue';
import SongPlayer from '@/components/SongPlayer.vue';
import AuthModal from '@/components/AuthModal.vue';

const userStore = useUserStore();
const { toggleAuth } = userStore;

function beforeEnter() {
  document.body.scrollTop = 0;
}

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
    <RouterView v-slot="{ Component, route }">
      <transition name="page" mode="out-in" @before-enter="beforeEnter">
        <component :is="Component" :key="route.path" />
      </transition>
    </RouterView>
  </main>

  <SongPlayer />

  <AuthModal />

  <TheLoading />
</template>
