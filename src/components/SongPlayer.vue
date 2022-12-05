<script setup>
import SongPlayerButton from '@/components/SongPlayerButton.vue';
import SongPlayerTimeline from '@/components/SongPlayerTimeline.vue';
import SongPlayerVolume from '@/components/SongPlayerVolume.vue';
</script>

<template>
  <div
    class="fixed bottom:0 left:0 right:0 z:997 flex overflow:hidden bg:#212121 rt:40 {left:40;right:40;rt:60}@md {left:80;right:80}@lg"
  >
    <SongPlayerButton />

    <SongPlayerTimeline />

    <SongPlayerVolume />
  </div>
</template>
