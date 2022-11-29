<script setup>
import SongPlayerButton from '@/components/SongPlayerButton.vue';
import SongPlayerTimeline from '@/components/SongPlayerTimeline.vue';
import SongPlayerVolume from '@/components/SongPlayerVolume.vue';
</script>

<template>
  <div
    class="fixed bottom:0 left:0 right:0 z:997 flex overflow:hidden bg:#333 rt:40 {left:80;right:80;rt:60}@md"
  >
    <SongPlayerButton />

    <SongPlayerTimeline />

    <SongPlayerVolume />
  </div>
</template>
