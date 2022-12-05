<script setup>
import SongUpload from '@/components/SongUpload.vue';
import SongModify from '@/components/SongModify.vue';
</script>

<template>
  <div class="pt:100 pt:140@md">
    <div
      class="min-h:calc(100vh-100px) p:50|20|140 bg:#030303 rt:40 {min-h:calc(100vh-140px);p:80|80|140;rt:60}@md"
    >
      <div class="max-w:1500 mx:auto">
        <div class="grid-cols:1 gap:60|40 grid-cols:2@lg">
          <div>
            <h2 class="f:bold f:24 fg:white f:32@sm f:40@md">上傳歌曲</h2>
            <div class="mt:30">
              <SongUpload />
            </div>
          </div>
          <div c>
            <h2 class="f:bold f:24 fg:white f:32@sm f:40@md">我的歌曲</h2>
            <div class="mt:30">
              <SongModify />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
