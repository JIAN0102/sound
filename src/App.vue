<script setup>
import { ref, onMounted } from 'vue';
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

const isTransitionPage = ref(true);

function onBeforeEnter() {
  window.scrollTo(0, 0);
  isTransitionPage.value = false;
}

function onBeforeLeave() {
  isTransitionPage.value = true;
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
      <transition
        name="page"
        mode="out-in"
        :duration="1000"
        @before-enter="onBeforeEnter"
        @before-leave="onBeforeLeave"
      >
        <component :is="Component" :key="route.path" />
      </transition>
    </RouterView>
  </main>

  <SongPlayer />

  <AuthModal />

  <TheLoading :is-transition-page="isTransitionPage" />
</template>
