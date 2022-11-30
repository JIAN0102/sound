<script setup>
import { storeToRefs } from 'pinia';
import { usePlayerStore } from '@/stores/player';
import IconPlay from '@/components/icons/IconPlay.vue';
import IconPause from '@/components/icons/IconPause.vue';

const playerStore = usePlayerStore();
const { isSoundPlaying } = storeToRefs(playerStore);
const { toggleAudio } = playerStore;
</script>

<template>
  <button
    class="group rel flex center-content w:80 h:60 overflow:hidden bg:primary w:120@md"
    type="button"
    @click.prevent="toggleAudio"
  >
    <div
      class="abs inset:0 opacity:0 @backgroundGradient|2s|linear|infinite ~opacity|.3s .group:hover_{opacity:1}"
    ></div>
    <div class="rel translate(4,3)">
      <IconPause v-if="isSoundPlaying" />
      <IconPlay v-else />
    </div>
  </button>
</template>
