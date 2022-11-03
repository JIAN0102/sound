<script setup>
import AppHeader from '@/components/AppHeader.vue';
import SongPlayer from '@/components/SongPlayer.vue';
import AuthModal from '@/components/AuthModal.vue';
</script>

<template>
  <div class="fixed inset:0 bg:linear-gradient(#282828,black)"></div>

  <div
    class="fixed inset:0 bg:repeating-linear-gradient(40deg,#19191e,#19191e|3px,transparent|3px,transparent|8px)"
  ></div>

  <div class="fixed top:160 bottom:-280 left:1/2 translateX(-50%)">
    <img
      class="h:full @rotate|1s|linear|infinite"
      src="assets/img/cd-character.svg"
      alt="貓 CD"
    />
  </div>

  <AppHeader />

  <SongPlayer />

  <AuthModal />
</template>
