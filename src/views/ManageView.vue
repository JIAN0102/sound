<script setup>
import SongUpload from '@/components/SongUpload.vue';
import SongModify from '@/components/SongModify.vue';
</script>

<template>
  <div
    class="min-h:calc(100vh-100px) p:50|20|140 mt:100 bg:#030303 rt:40 {min-h:calc(100vh-140px);p:80|40|140;mt:140;rt:60}@md px:80@lg"
  >
    <div class="max-w:1500 mx:auto">
      <div class="grid-cols:1 gap:60|40 grid-cols:2@md">
        <div>
          <h1 class="f:bold f:24 fg:white f:28@sm f:32@md">上傳歌曲</h1>
          <SongUpload />
        </div>
        <div>
          <h2 class="f:bold f:24 fg:white f:28@sm f:32@md">我的歌曲</h2>
          <SongModify />
        </div>
      </div>
    </div>
  </div>
</template>
