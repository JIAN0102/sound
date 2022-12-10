<script setup>
import SongInformation from '@/components/SongInformation.vue';
import SongBadge from '@/components/SongBadge.vue';
import CommentPost from '@/components/CommentPost.vue';
</script>

<template>
  <div
    class="min-h:calc(100vh-100px) p:50|20|140 mt:100 bg:#030303 rt:40 {min-h:calc(100vh-140px);p:80|40|140;mt:140;rt:60}@md px:80@lg"
  >
    <div class="max-w:1500 mx:auto">
      <div class="grid-cols:1 gap:60|40 grid-cols:5@md">
        <div class="grid-col-span:3@md">
          <SongInformation />
          <CommentPost />
        </div>
        <div class="grid-col-span:2@md">
          <h2 class="f:bold f:24 fg:white f:28@sm f:32@md">更多歌曲</h2>
          <SongBadge />
        </div>
      </div>
    </div>
  </div>
</template>
