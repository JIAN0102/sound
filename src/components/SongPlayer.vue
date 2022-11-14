<script setup>
import { storeToRefs } from 'pinia';
import { usePlayerStore } from '@/stores/player';
import SongPlayerSeek from '@/components/SongPlayerSeek.vue';
import SongPlayerVolume from '@/components/SongPlayerVolume.vue';

const playerStore = usePlayerStore();
const { isSoundPlaying } = storeToRefs(playerStore);
const { pauseAudio, playAudio, toggleAudio, updateSeek, updateVolume } =
  playerStore;
</script>

<template>
  <div
    class="fixed bottom:0 left:0 right:0 z:997 flex overflow:hidden bg:black b:1|solid|#333 bb:0 rt:40 {left:80;right:80;rt:60}@md"
  >
    <button
      class="w:80 h:60 bg:linear-gradient(to|right,primary,secondary) w:120@md"
      type="button"
      @click.prevent="toggleAudio"
    >
      <div v-show="!isSoundPlaying">播放</div>
      <div v-show="isSoundPlaying">暫停</div>
    </button>
    <SongPlayerSeek
      @on-drag-start="pauseAudio"
      @update-position="updateSeek"
      @on-drag-end="playAudio"
    />
    <SongPlayerVolume @update-position="updateVolume" />
  </div>
</template>
