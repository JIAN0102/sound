<script setup>
import { usePlayerStore } from '@/stores/player';
import SongPlayerButton from '@/components/SongPlayerButton.vue';
import SongPlayerTimeline from '@/components/SongPlayerTimeline.vue';
import SongPlayerVolume from '@/components/SongPlayerVolume.vue';

const playerStore = usePlayerStore();
const {
  checkAudioStatusByDragStart,
  checkAudioStatusByDragEnd,
  updateSeek,
  updateVolume,
} = playerStore;
</script>

<template>
  <div
    class="fixed bottom:0 left:0 right:0 z:997 flex overflow:hidden bg:#111 bb:0 rt:40 {left:80;right:80;rt:60}@md"
  >
    <SongPlayerButton />
    <SongPlayerTimeline
      @drag-start="checkAudioStatusByDragStart"
      @update="updateSeek"
      @drag-end="checkAudioStatusByDragEnd"
    />
    <SongPlayerVolume @update="updateVolume" />
  </div>
</template>
