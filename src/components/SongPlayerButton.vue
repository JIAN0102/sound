<script setup>
import { storeToRefs } from 'pinia';
import { usePlayerStore } from '@/stores/player';

const playerStore = usePlayerStore();
const { isSoundPlaying } = storeToRefs(playerStore);
const { toggleAudio } = playerStore;
</script>

<template>
  <button
    class="flex center-content w:80 h:60 bg:linear-gradient(to|right,primary,secondary) w:120@md"
    type="button"
    @click.prevent="toggleAudio"
  >
    <div v-show="!isSoundPlaying" class="translate(3,2)">
      <img class="w:28" src="/assets/img/icon-play-black.svg" alt="" />
    </div>
    <div v-show="isSoundPlaying" class="translate(3,2)">
      <img class="w:28" src="/assets/img/icon-pause-black.svg" alt="" />
    </div>
  </button>
</template>
