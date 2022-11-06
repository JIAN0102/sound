<script setup>
import { onMounted } from 'vue';
import { query, where, getDocs } from 'firebase/firestore';
import { auth, songsCollection } from '@/plugins/firebase';
import BaseCard from '@/components/base/BaseCard.vue';
import SongUpload from '@/components/song/SongUpload.vue';
import SongModify from '@/components/song/SongModify.vue';

onMounted(async () => {
  const q = query(songsCollection, where('uid', '==', auth.currentUser.uid));
  const snapshots = await getDocs(q);

  console.log(snapshots);
});
</script>

<template>
  <div class="grid-cols:1 gap:30|40 p:80|0|210 p:180|80|210@md grid-cols:2@lg">
    <div>
      <BaseCard>
        <template #header>
          <h1 class="f:bold f:24 fg:white t:center {f:28;t:left}@md">
            上傳音樂
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
