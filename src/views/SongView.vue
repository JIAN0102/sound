<script setup>
import BaseCard from '@/components/BaseCard.vue';
import SongInformation from '@/components/SongInformation.vue';
import CommentPost from '@/components/CommentPost.vue';
</script>

<template>
  <div
    class="grid-cols:1 gap:30|40 min-h:calc(100vh-140px) p:0|0|140 mt:140 bg:black rt:40 {p:0|80|140;rt:60}@md grid-cols:2@lg"
  >
    <div>
      <BaseCard>
        <template #header>
          <h2 class="f:bold f:24 fg:white t:center {f:28;t:left}@md">
            歌曲資訊
          </h2>
        </template>

        <template #main>
          <SongInformation />
        </template>
      </BaseCard>
    </div>

    <div>
      <BaseCard>
        <template #header>
          <h2 class="f:bold f:24 fg:white t:center {f:28;t:left}@md">
            發表留言
          </h2>
        </template>

        <template #main>
          <CommentPost />
        </template>
      </BaseCard>
    </div>
  </div>
</template>
