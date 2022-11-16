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
    <div class="translate(4,3)">
      <img
        v-show="!isSoundPlaying"
        class="w:28"
        src="/assets/img/icon-play-black.svg"
        alt=""
      />
      <img
        v-show="isSoundPlaying"
        class="w:28"
        src="/assets/img/icon-pause-black.svg"
        alt=""
      />
    </div>
  </button>
</template>
