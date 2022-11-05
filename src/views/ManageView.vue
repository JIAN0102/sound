<script setup>
import { onMounted } from 'vue';
import { query, where, getDocs } from 'firebase/firestore';
import { auth, songsCollection } from '@/includes/firebase';
import SongUpload from '@/components/song/SongUpload.vue';

onMounted(async () => {
  const q = query(songsCollection, where('uid', '==', auth.currentUser.uid));
  const snapshots = await getDocs(q);

  console.log(snapshots);
});
</script>

<template>
  <div
    class="grid-cols:1 gap-x:40 gap-y:30 p:80|0|120 {grid-cols:2;p:180|80|210}@md"
  >
    <div>
      <div class="bg:black r:40 r:60@md">
        <div class="p:40|20|20 p:60|60|20@md">
          <h1 class="f:24 fg:white f:28@md">上傳音樂</h1>
        </div>
        <div class="p:20 bg:#333 r:40 {p:40;b:10|solid|black;r:60}@md">
          <SongUpload />
        </div>
      </div>
    </div>

    <div>
      <div class="bg:black r:40 r:60@md">
        <div class="p:40|20|20 p:60|60|20@md">
          <h2 class="f:24 fg:white f:28@md">我的歌曲</h2>
        </div>
        <div class="p:20 bg:#333 r:40 {p:40;b:10|solid|black;r:60}@md"></div>
      </div>
    </div>
  </div>
</template>
