<script setup>
import SongGallery from '@/components/SongGallery.vue';
</script>

<template>
  <div
    class="p:50|20|140 mt:100vh bg:#030303 rt:40 {p:80|40|140;rt:60}@md px:80@lg"
  >
    <div class="max-w:1500 mx:auto">
      <h1 class="f:bold f:24 fg:white f:32@sm f:40@md">探索歌曲</h1>
      <SongGallery />
    </div>
  </div>
</template>
