<script setup>
import BaseCard from '@/components/BaseCard.vue';
import SongUpload from '@/components/SongUpload.vue';
import SongModify from '@/components/SongModify.vue';
</script>

<template>
  <div
    class="grid-cols:1 gap:30|40 p:0|0|140 mt:140 bg:black rt:40 {p:0|80|140;rt:60}@md grid-cols:2@lg"
  >
    <div>
      <BaseCard>
        <template #header>
          <h1 class="f:bold f:24 fg:white t:center {f:28;t:left}@md">
            上傳歌曲
          </h1>
        </template>

        <template #main>
          <SongUpload />
        </template>
      </BaseCard>
    </div>

    <div>
      <BaseCard>
        <template #header>
          <h2 class="f:bold f:24 fg:white t:center {f:28;t:left}@md">
            我的歌曲
          </h2>
        </template>

        <template #main>
          <SongModify />
        </template>
      </BaseCard>
    </div>
  </div>
</template>
